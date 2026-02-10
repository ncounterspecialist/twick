#!/usr/bin/env node

/**
 * Installation script for twick-mcp-agent Claude Desktop extension
 * This script:
 * 1. Installs npm dependencies
 * 2. Builds the TypeScript project
 * 3. Merges the MCP server config into Claude Desktop's config file
 */

import { execSync } from "child_process";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { homedir } from "os";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PROJECT_ROOT = resolve(__dirname);

// Platform-specific Claude Desktop config paths
function getClaudeConfigPath() {
  const platform = process.platform;
  if (platform === "win32") {
    // Windows: %APPDATA%\Claude\claude_desktop_config.json
    return join(process.env.APPDATA || "", "Claude", "claude_desktop_config.json");
  } else if (platform === "darwin") {
    // macOS: ~/Library/Application Support/Claude/claude_desktop_config.json
    return join(homedir(), "Library", "Application Support", "Claude", "claude_desktop_config.json");
  } else {
    // Linux: ~/.config/Claude/claude_desktop_config.json
    return join(homedir(), ".config", "Claude", "claude_desktop_config.json");
  }
}

function mergeConfig(existingConfig, newServerConfig) {
  const config = existingConfig || { mcpServers: {} };
  
  if (!config.mcpServers) {
    config.mcpServers = {};
  }

  // Merge the new server config
  Object.assign(config.mcpServers, newServerConfig.mcpServers);

  return config;
}

function main() {
  console.log("🚀 Installing twick-mcp-agent for Claude Desktop...\n");

  try {
    // Step 1: Install dependencies
    console.log("📦 Installing npm dependencies...");
    execSync("npm install", { cwd: PROJECT_ROOT, stdio: "inherit" });
    console.log("✅ Dependencies installed\n");

    // Step 2: Build the project
    console.log("🔨 Building TypeScript project...");
    execSync("npm run build", { cwd: PROJECT_ROOT, stdio: "inherit" });
    console.log("✅ Build completed\n");

    // Step 3: Read the MCP server config template
    const configTemplatePath = join(PROJECT_ROOT, "claude_desktop_config.json");
    if (!existsSync(configTemplatePath)) {
      throw new Error(`Config template not found: ${configTemplatePath}`);
    }

    const configTemplate = JSON.parse(
      readFileSync(configTemplatePath, "utf-8")
    );

    // Step 4: Update paths in config to be absolute
    const serverConfig = { ...configTemplate };
    const serverName = Object.keys(serverConfig.mcpServers)[0];
    const serverEntry = serverConfig.mcpServers[serverName];
    
    // Make the args path absolute
    if (serverEntry.args && serverEntry.args[0]) {
      serverEntry.args[0] = join(PROJECT_ROOT, "dist", "stdio-server.js");
    }

    // Make GOOGLE_APPLICATION_CREDENTIALS path absolute if it's a relative path
    if (serverEntry.env?.GOOGLE_APPLICATION_CREDENTIALS) {
      const credsPath = serverEntry.env.GOOGLE_APPLICATION_CREDENTIALS;
      if (!credsPath.startsWith("/") && !credsPath.match(/^[A-Z]:/)) {
        // Relative path, make it absolute
        serverEntry.env.GOOGLE_APPLICATION_CREDENTIALS = join(
          PROJECT_ROOT,
          credsPath
        );
      }
    }

    // Step 5: Merge into Claude Desktop config
    const claudeConfigPath = getClaudeConfigPath();
    console.log(`📝 Updating Claude Desktop config: ${claudeConfigPath}`);

    let existingConfig = null;
    if (existsSync(claudeConfigPath)) {
      try {
        existingConfig = JSON.parse(readFileSync(claudeConfigPath, "utf-8"));
        console.log("✅ Found existing Claude Desktop config");
      } catch (err) {
        console.warn(`⚠️  Could not parse existing config: ${err.message}`);
        console.log("📝 Creating new config file");
      }
    } else {
      console.log("📝 Creating new Claude Desktop config file");
      // Ensure directory exists
      mkdirSync(dirname(claudeConfigPath), { recursive: true });
    }

    const mergedConfig = mergeConfig(existingConfig, serverConfig);
    writeFileSync(
      claudeConfigPath,
      JSON.stringify(mergedConfig, null, 2) + "\n",
      "utf-8"
    );

    console.log("✅ Configuration merged successfully\n");

    // Step 6: Summary
    console.log("🎉 Installation complete!\n");
    console.log("📋 Next steps:");
    console.log("   1. Edit your Claude Desktop config to set your environment variables:");
    console.log(`      ${claudeConfigPath}`);
    console.log("   2. Update the following in the 'twick-mcp-agent' section:");
    console.log("      - GOOGLE_CLOUD_PROJECT: Your GCP project ID");
    console.log("      - GOOGLE_APPLICATION_CREDENTIALS: Path to your GCP service account key");
    console.log("      - UPLOAD_API_URL: Your upload API endpoint (optional)");
    console.log("      - TWICK_STUDIO_URL: Your Twick Studio URL (optional)");
    console.log("   3. Restart Claude Desktop to load the new MCP server");
    console.log("\n✨ The 'generate-captions' tool will be available in Claude Desktop!\n");
  } catch (error) {
    console.error("\n❌ Installation failed:");
    console.error(error.message);
    if (error.stdout) console.error(error.stdout.toString());
    if (error.stderr) console.error(error.stderr.toString());
    process.exit(1);
  }
}

main();

