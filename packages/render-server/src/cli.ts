#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SERVER_TEMPLATE = `import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { renderTwickVideo } from "@twick/render-server";

const PORT = process.env.PORT || 3001;
const BASE_PATH = \`http://localhost:\${PORT}\`;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Rate limiting configuration
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 100; // Maximum requests per window
const RATE_LIMIT_CLEANUP_INTERVAL_MS = 60 * 1000; // Cleanup every minute

// In-memory store for rate limiting
interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

// Cleanup expired entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now > entry.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}, RATE_LIMIT_CLEANUP_INTERVAL_MS);

/**
 * Rate limiting middleware for API endpoints.
 * Tracks request counts per IP address and enforces rate limits
 * to prevent abuse of the render server.
 *
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 * 
 * @example
 * \`\`\`js
 * app.use('/api', rateLimitMiddleware);
 * // Applies rate limiting to all /api routes
 * \`\`\`
 */
const rateLimitMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const clientIP = req.ip || req.connection.remoteAddress || 'unknown';
  const now = Date.now();
  
  // Get or create rate limit entry for this IP
  let entry = rateLimitStore.get(clientIP);
  
  if (!entry || now > entry.resetTime) {
    // New window or expired entry
    entry = {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW_MS
    };
    rateLimitStore.set(clientIP, entry);
  } else {
    // Increment count in current window
    entry.count++;
    
    if (entry.count > RATE_LIMIT_MAX_REQUESTS) {
      // Rate limit exceeded
      const retryAfter = Math.ceil((entry.resetTime - now) / 1000);
      res.set('Retry-After', retryAfter.toString());
      res.set('X-RateLimit-Limit', RATE_LIMIT_MAX_REQUESTS.toString());
      res.set('X-RateLimit-Remaining', '0');
      res.set('X-RateLimit-Reset', new Date(entry.resetTime).toISOString());
      
      return res.status(429).json({
        success: false,
        error: 'Too many requests',
        message: \`Rate limit exceeded. Try again in \${retryAfter} seconds.\`,
        retryAfter
      });
    }
  }
  
  // Add rate limit headers
  res.set('X-RateLimit-Limit', RATE_LIMIT_MAX_REQUESTS.toString());
  res.set('X-RateLimit-Remaining', (RATE_LIMIT_MAX_REQUESTS - entry.count).toString());
  res.set('X-RateLimit-Reset', new Date(entry.resetTime).toISOString());
  
  next();
};

const app = express();

app.use(cors());
app.use(express.json());

// Serve static files from output directory
app.use("/output", express.static(path.join(__dirname, "output")));

/**
 * POST endpoint for video rendering requests.
 * Accepts project variables and settings, renders the video,
 * and returns a download URL for the completed video.
 *
 * @param req - Express request object containing variables and settings
 * @param res - Express response object
 * 
 * @example
 * \`\`\`js
 * POST /api/render-video
 * Body: { variables: {...}, settings: {...} }
 * Response: { success: true, downloadUrl: "..." }
 * \`\`\`
 */
app.post("/api/render-video", async (req, res) => {
  const { variables, settings } = req.body;

  try {
    const outputPath = await renderTwickVideo(variables, settings);
    res.json({
      success: true,
      downloadUrl: \`\${BASE_PATH}/download/\${path.basename(outputPath)}\`,
    });
  } catch (error) {
    console.error("Render error:", error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

/**
 * GET endpoint for downloading rendered videos.
 * Serves video files with rate limiting and security checks
 * to prevent path traversal attacks.
 *
 * @param req - Express request object with filename parameter
 * @param res - Express response object
 * 
 * @example
 * \`\`\`js
 * GET /download/video-123.mp4
 * // Downloads the specified video file
 * \`\`\`
 */
app.get("/download/:filename", rateLimitMiddleware, (req, res) => {
  const outputDir = path.resolve(__dirname, "output");
  const requestedPath = path.resolve(outputDir, req.params.filename);
  if (!requestedPath.startsWith(outputDir + path.sep)) {
    // Attempted path traversal or access outside output directory
    res.status(403).json({
      success: false,
      error: "Forbidden",
    });
    return;
  }
  res.download(requestedPath, (err) => {
    if (err) {
      res.status(404).json({
        success: false,
        error: "File not found",
      });
    }
  });
});

/**
 * Health check endpoint for monitoring server status.
 * Returns server status and current timestamp for health monitoring.
 *
 * @param req - Express request object
 * @param res - Express response object
 * 
 * @example
 * \`\`\`js
 * GET /health
 * Response: { status: "ok", timestamp: "2024-01-01T00:00:00.000Z" }
 * \`\`\`
 */
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(\`Render server running on port \${PORT}\`);
  console.log(\`Health check: \${BASE_PATH}/health\`);
  console.log(\`API endpoint: \${BASE_PATH}/api/render-video\`);
  console.log(\`Download endpoint rate limited: \${RATE_LIMIT_MAX_REQUESTS} requests per \${RATE_LIMIT_WINDOW_MS / 60000} minutes\`);
});
`;

const PACKAGE_JSON_TEMPLATE = `{
  "name": "twick-render-server",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "tsx watch server.ts",
    "build": "tsc",
    "start": "node dist/server.js"
  },
  "dependencies": {
    "@twick/render-server": "^0.14.11",
    "cors": "^2.8.5",
    "express": "^4.18.2"
  },
  "devDependencies": {
    "@types/cors": "^2.8.17",
    "@types/express": "^4.17.21",
    "@types/node": "^20.10.0",
    "tsx": "^4.7.0",
    "typescript": "5.4.2"
  }
}
`;

const TSCONFIG_TEMPLATE = `{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "allowJs": true,
    "strict": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist",
    "rootDir": ".",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "resolveJsonModule": true,
    "noEmit": false
  },
  "include": ["server.ts"],
  "exclude": ["node_modules", "dist"]
}
`;

const GITIGNORE_TEMPLATE = `node_modules/
dist/
output/
.env
*.log
`;

function scaffoldServer() {
  const currentDir = process.cwd();
  const serverDir = path.join(currentDir, "twick-render-server");

  // Check if directory already exists
  if (fs.existsSync(serverDir)) {
    console.error(`Error: Directory "${serverDir}" already exists.`);
    console.error("Please remove it or choose a different location.");
    process.exit(1);
  }

  // Create server directory
  fs.mkdirSync(serverDir, { recursive: true });
  fs.mkdirSync(path.join(serverDir, "output"), { recursive: true });

  // Write server.ts
  fs.writeFileSync(
    path.join(serverDir, "server.ts"),
    SERVER_TEMPLATE,
    "utf-8"
  );

  // Write package.json
  fs.writeFileSync(
    path.join(serverDir, "package.json"),
    PACKAGE_JSON_TEMPLATE,
    "utf-8"
  );

  // Write tsconfig.json
  fs.writeFileSync(
    path.join(serverDir, "tsconfig.json"),
    TSCONFIG_TEMPLATE,
    "utf-8"
  );

  // Write .gitignore
  fs.writeFileSync(
    path.join(serverDir, ".gitignore"),
    GITIGNORE_TEMPLATE,
    "utf-8"
  );

  console.log(`✅ Successfully scaffolded Twick render server!`);
  console.log(`\n📁 Server created at: ${serverDir}`);
  console.log(`\n📝 Next steps:`);
  console.log(`   1. cd ${path.basename(serverDir)}`);
  console.log(`   2. npm install`);
  console.log(`   3. npm run dev (for development)`);
  console.log(`   4. npm run build && npm start (for production)`);
}

// Parse command line arguments
const args = process.argv.slice(2);
const command = args[0];

if (command === "init") {
  scaffoldServer();
} else {
  console.log("Usage: npx twick-render-server init");
  console.log("\nThis command scaffolds a new Twick render server in the current directory.");
  process.exit(1);
}

