# Troubleshooting Guide

Common issues and solutions when using Twick packages.

## Table of Contents

- [Build Tools & Setup](#build-tools--setup)
- [Installation Issues](#installation-issues)
- [CSS & Styling](#css--styling)
- [Module Resolution](#module-resolution)
- [TypeScript Configuration](#typescript-configuration)
- [Docker & Environment](#docker--environment)
- [Browser Rendering (`@twick/browser-render`)](#browser-rendering-twickbrowser-render)
- [Runtime Errors](#runtime-errors)
- [Integration Issues](#integration-issues)
- [Performance Issues](#performance-issues)

---

## Build Tools & Setup

### Do I Need Vite for Twick?

**No, you don't need Vite in your React project.**

Twick packages are **pre-built** and work with any React build tool:
- ✅ Create React App (CRA)
- ✅ Next.js
- ✅ Vite
- ✅ Webpack
- ✅ Parcel
- ✅ Any other React build setup

**Why Vite appears in the repo:**
- Vite is only used **internally** to build Twick packages
- It's in `devDependencies` (not `dependencies`)
- The packages are already compiled and published to npm
- Your app uses the pre-built `dist/` files, not source code

**What you actually need:**
- `react` (^19.2.3) - automatically installed
- `react-dom` (^19.2.3) - automatically installed
- Your existing React build tool (no changes needed)

### Using Twick with Create React App

```bash
# Create a new CRA project
npx create-react-app my-video-app
cd my-video-app

# Install Twick
npm install @twick/studio

# Use it in your code
```

```tsx
import { LivePlayerProvider } from "@twick/live-player";
import { TwickStudio } from "@twick/studio";
import { TimelineProvider, INITIAL_TIMELINE_DATA } from "@twick/timeline";
import "@twick/studio/dist/studio.css";

function App() {
  return (
    <LivePlayerProvider>
      <TimelineProvider
        initialData={INITIAL_TIMELINE_DATA}
        contextId={"studio-demo"}
      >
        <TwickStudio 
          studioConfig={{
            videoProps: { width: 720, height: 1280 },
          }}
        />
      </TimelineProvider>
    </LivePlayerProvider>
  );
}
```

### Using Twick with Next.js

```bash
# Create Next.js project
npx create-next-app@latest my-video-app
cd my-video-app

# Install Twick
npm install @twick/studio
```

**Important for Next.js:**
- Twick uses client-side features, so components must be marked with `'use client'`
- Import CSS in your layout or page component

```tsx
'use client';

import { LivePlayerProvider } from "@twick/live-player";
import { TwickStudio } from "@twick/studio";
import { TimelineProvider, INITIAL_TIMELINE_DATA } from "@twick/timeline";
import "@twick/studio/dist/studio.css";

export default function VideoEditorPage() {
  return (
    <LivePlayerProvider>
      <TimelineProvider
        initialData={INITIAL_TIMELINE_DATA}
        contextId={"studio-demo"}
      >
        <TwickStudio 
          studioConfig={{
            videoProps: { width: 720, height: 1280 },
          }}
        />
      </TimelineProvider>
    </LivePlayerProvider>
  );
}
```

---

## Installation Issues

### Package Not Found / Installation Fails

**Error:** `npm ERR! 404 Not Found - GET https://registry.npmjs.org/@twick/studio`

**Solutions:**
1. Check package name spelling: `@twick/studio` (not `twick-studio`)
2. Ensure you're using npm/pnpm/yarn (not an outdated version)
3. Clear cache and retry:
   ```bash
   npm cache clean --force
   npm install @twick/studio
   ```

### Version Conflicts

**Error:** `peer dependency conflicts` or `unable to resolve dependency tree`

**Solutions:**
1. Install the main package - dependencies are auto-included:
   ```bash
   npm install @twick/studio
   # Don't manually install @twick/timeline, @twick/live-player, etc.
   ```

2. If you must install packages separately, ensure compatible versions:
   ```bash
   npm install @twick/studio@latest @twick/timeline@latest
   ```

3. Use `--legacy-peer-deps` if needed (not recommended):
   ```bash
   npm install @twick/studio --legacy-peer-deps
   ```

### React Version Conflict (ERESOLVE)

**Error:** `ERESOLVE could not resolve` with React version conflicts, especially:
```
peer react@"^18.0.0" from @twick/media-utils@0.14.18
Found: react@19.2.3
```

**Root Cause:**
- Older published versions of `@twick/media-utils` had a React peer dependency
- This has been fixed in the source code (no peer dependencies needed)
- The fix will be available in the next release

**Solutions:**

1. **Use `--legacy-peer-deps` (Recommended temporary fix):**
   ```bash
   npm install @twick/studio --legacy-peer-deps
   ```
   This allows npm to ignore peer dependency conflicts. Since Twick packages include React as a dependency (not peer), this is safe.

2. **Use `--force` (Alternative):**
   ```bash
   npm install @twick/studio --force
   ```

3. **Wait for next release:**
   The source code is already fixed. The next published version will not have this issue.

4. **Verify React is installed:**
   ```bash
   npm list react
   # Should show react@19.2.3 (or compatible version)
   ```

**Why this is safe:**
- `@twick/media-utils` doesn't actually use React (it's a utility package)
- All Twick packages that use React have it as a dependency (not peer dependency)
- React 19 is backward compatible with React 18 code
- Twick supports both React 18 and React 19

**Note:** This error only affects npm's dependency resolution. The packages work correctly at runtime with React 18 or 19.

### Missing Dependencies After Installation

**Issue:** Components don't work, import errors

**Solutions:**
1. Verify installation:
   ```bash
   npm list @twick/studio
   ```

2. Reinstall dependencies:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. Check that all Twick packages are installed:
   ```bash
   npm list | grep @twick
   ```

---

## CSS & Styling

### Styles Not Loading / Components Look Broken

**Error:** Components render but look unstyled

**Solution:** Import the CSS file:

```tsx
// ✅ Correct
import "@twick/studio/dist/studio.css";
import { TwickStudio } from "@twick/studio";

// ❌ Missing CSS import
import { TwickStudio } from "@twick/studio";
```

**For multiple packages:**
```tsx
import "@twick/studio/dist/studio.css";
import "@twick/video-editor/dist/video-editor.css";
```

### CSS Not Found Error

**Error:** `Cannot find module '@twick/studio/dist/studio.css'`

**Solutions:**
1. Verify the package is installed:
   ```bash
   ls node_modules/@twick/studio/dist/
   ```

2. Check package version (CSS files are in dist/):
   ```bash
   npm list @twick/studio
   ```

3. Reinstall if dist folder is missing:
   ```bash
   npm uninstall @twick/studio
   npm install @twick/studio
   ```

### CSS Conflicts with Existing Styles

**Issue:** Twick styles conflict with your app's styles

**Solutions:**
1. Import Twick CSS before your app CSS:
   ```tsx
   import "@twick/studio/dist/studio.css";
   import "./App.css"; // Your styles
   ```

2. Use CSS specificity or `!important` for overrides:
   ```css
   .your-custom-class {
     /* Override Twick styles */
     color: red !important;
   }
   ```

3. Scope Twick components in a container:
   ```tsx
   <div className="twick-container">
    <TwickStudio />
  </div>
  ```

---

## Module Resolution

### Cannot Find Module Error

**Error:** `Cannot find module '@twick/studio'` or `Module not found`

**Solutions:**
1. Verify installation:
   ```bash
   npm list @twick/studio
   ```

2. Check import path:
   ```tsx
   // ✅ Correct
   import { TwickStudio } from "@twick/studio";
   
   // ❌ Wrong
   import { TwickStudio } from "twick-studio";
   import { TwickStudio } from "@twick/studio/src";
   ```

3. Restart your dev server after installation

4. Clear build cache:
   ```bash
   # For Next.js
   rm -rf .next
   
   # For CRA
   rm -rf node_modules/.cache
   
   # For Vite
   rm -rf node_modules/.vite
   ```

### ESM vs CommonJS Issues

**Error:** `Cannot use import statement outside a module` or `require is not defined`

**Solutions:**
1. Twick supports both ESM and CommonJS. Use the appropriate syntax:

   **ES Modules (recommended):**
   ```tsx
   import { TwickStudio } from "@twick/studio";
   ```

   **CommonJS:**
   ```js
   const { TwickStudio } = require("@twick/studio");
   ```

2. Ensure your `package.json` has:
   ```json
   {
     "type": "module"  // For ESM
     // or omit for CommonJS
   }
   ```

3. For TypeScript, check `tsconfig.json`:
   ```json
   {
     "compilerOptions": {
       "module": "ESNext",  // or "CommonJS"
       "moduleResolution": "bundler"  // or "node"
     }
   }
   ```

---

## TypeScript Configuration

### Type Errors / Missing Type Definitions

**Error:** `Cannot find module '@twick/studio' or its corresponding type declarations`

**Solutions:**
1. Ensure TypeScript is installed:
   ```bash
   npm install --save-dev typescript @types/react @types/react-dom
   ```

2. Check `tsconfig.json`:
   ```json
   {
     "compilerOptions": {
       "moduleResolution": "bundler",  // or "node"
       "esModuleInterop": true,
       "allowSyntheticDefaultImports": true,
       "skipLibCheck": true,
       "types": ["react", "react-dom"]
     },
     "include": ["src/**/*"],
     "exclude": ["node_modules"]
   }
   ```

3. Restart TypeScript server in your IDE (VS Code: Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server")

### Type Definition Issues

**Error:** Type errors even though code works

**Solutions:**
1. Update to latest versions:
   ```bash
   npm update @twick/studio
   ```

2. Check TypeScript version (requires 4.5+):
   ```bash
   npx tsc --version
   ```

3. Add `skipLibCheck` to `tsconfig.json`:
   ```json
   {
     "compilerOptions": {
       "skipLibCheck": true
     }
   }
   ```

### StudioConfig TypeScript Error: videoProps Not Found

**Error:** `Property 'videoProps' does not exist on type 'StudioConfig'` or similar TypeScript errors

**Issue:** TypeScript can't find the `videoProps` property even though it works at runtime.

**Root Cause:** 
- `StudioConfig` extends `VideoEditorConfig` which includes `videoProps`
- This requires `@twick/video-editor` to be in dependencies (it's auto-included with `@twick/studio`)
- TypeScript may not resolve the extended type properly

**Solutions:**

1. **Verify `@twick/video-editor` is installed:**
   ```bash
   npm list @twick/video-editor
   # Should show it's installed as a dependency of @twick/studio
   ```

2. **Reinstall dependencies to ensure types are generated:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Restart TypeScript server:**
   - VS Code: Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server"
   - This forces TypeScript to re-read type definitions

4. **Temporary workaround (if needed):**
   ```tsx
   <TwickStudio 
     studioConfig={{
       videoProps: {
         width: 720,
         height: 1280,
       },
     } as any}  // Type assertion bypasses check
   />
   ```

5. **Proper fix - ensure types are imported correctly:**
   ```tsx
   import { TwickStudio } from "@twick/studio";
   import type { VideoEditorConfig } from "@twick/video-editor";
   
   // StudioConfig extends VideoEditorConfig, so videoProps is available
   const config: VideoEditorConfig = {
     videoProps: { width: 720, height: 1280 }
   };
   
   <TwickStudio studioConfig={config} />
   ```

6. **Check that dist folder contains type definitions:**
   ```bash
   ls node_modules/@twick/studio/dist/*.d.ts
   ls node_modules/@twick/video-editor/dist/*.d.ts
   # Both should exist
   ```

**Note:** The fix works with or without Vite. The key is having `@twick/video-editor` in dependencies (which is automatic when installing `@twick/studio`).

---

## Docker & Environment

### Docker Build Fails

**Error:** Build errors in Docker container

**Solutions:**
1. Ensure Node.js 18+ in Dockerfile:
   ```dockerfile
   FROM node:18-alpine
   # or
   FROM node:20-alpine
   ```

2. Install dependencies before building:
   ```dockerfile
   COPY package*.json ./
   RUN npm install
   COPY . .
   RUN npm run build
   ```

3. Don't exclude `node_modules` unnecessarily:
   ```dockerfile
   # ✅ Good
   COPY package*.json ./
   RUN npm install
   
   # ❌ Bad - missing dependencies
   COPY . .
   RUN npm install --production
   ```

### Environment Variables Not Working

**Issue:** Environment variables not accessible in Twick

**Solutions:**
1. Twick doesn't require special environment variables for basic usage
2. For cloud functions, check individual package READMEs
3. Use standard React environment variable patterns:
   ```tsx
   const apiUrl = process.env.REACT_APP_API_URL;
   ```

### Missing Dependencies in Production Build

**Error:** Works in dev but fails in production

**Solutions:**
1. Ensure all dependencies are in `dependencies` (not just `devDependencies`):
   ```bash
   npm install @twick/studio --save  # not --save-dev
   ```

2. Check build output includes Twick:
   ```bash
   npm run build
   # Check dist/ or build/ folder for @twick files
   ```

3. Verify production build includes CSS:
   ```bash
   # Check that CSS files are copied to build output
   ```

### Docker: Missing @twick/video-editor Dependency

**Error:** TypeScript errors or runtime errors in Docker, even though it works locally

**Cause:** `@twick/video-editor` might not be properly installed in Docker container, or dependencies aren't being copied correctly.

**Solutions:**

1. **Ensure all dependencies are installed (not just production):**
   ```dockerfile
   # ✅ Correct - installs all dependencies
   COPY package*.json ./
   RUN npm install
   
   # ❌ Wrong - only production dependencies
   COPY package*.json ./
   RUN npm install --production
   ```

2. **Verify @twick/video-editor is in package.json:**
   ```json
   {
     "dependencies": {
       "@twick/studio": "^0.14.11"
       // @twick/video-editor should be auto-included
     }
   }
   ```

3. **Check Docker build logs for missing packages:**
   ```bash
   docker build . 2>&1 | grep -i "missing\|error\|@twick"
   ```

4. **Verify in container:**
   ```bash
   docker run -it your-image sh
   ls node_modules/@twick/
   # Should see: video-editor, studio, timeline, etc.
   ```

5. **Rebuild with clean cache:**
   ```dockerfile
   FROM node:18-alpine
   COPY package*.json ./
   RUN npm install
   COPY . .
   RUN npm run build
   ```

**Note:** The key fix is ensuring `@twick/video-editor` is in your dependencies. Installing `@twick/studio` should automatically include it, but Docker builds sometimes need explicit verification.

---

## Browser Rendering (`@twick/browser-render`)

### Browser Not Supported / WebCodecs Errors

**Errors:**
- `ReferenceError: VideoEncoder is not defined`
- `TypeError: Failed to construct 'VideoEncoder'`
- Video render never starts in some browsers

**Root Cause:**
- `@twick/browser-render` relies on the WebCodecs API
- WebCodecs is only available in **Chrome 94+** and **Edge 94+**
- It is **not fully supported** in Firefox, Safari, or older Chromium-based browsers

**Solutions:**
1. Verify browser support:
   - Use latest Chrome or Edge (desktop)
   - Avoid Safari/Firefox for browser rendering
2. Add a feature check before calling renderer:
   ```ts
   const isWebCodecsSupported =
     typeof window !== "undefined" &&
     "VideoEncoder" in window &&
     "VideoDecoder" in window;

   if (!isWebCodecsSupported) {
     // Fallback: show message or route to server rendering
   }
   ```
3. For production exports on unsupported browsers, use `@twick/render-server` instead of `@twick/browser-render`.

### projectFile: Use Imported Project in Browser

**Error:** Rendering fails or project does not load when passing a path string for `projectFile`.

**Root Cause:**
- In the browser, `projectFile` must be an **imported Project object**, not a string path.
- String paths only work in Node.js (server renderer).

**Solution:**
```ts
// ✅ Correct – browser
import myProject from './my-custom-project';

const blob = await renderTwickVideoInBrowser({
  projectFile: myProject,
  variables: { input: { ... } },
  settings: { ... },
});

// ❌ Wrong – path string only works in Node
renderTwickVideoInBrowser({ projectFile: './project.js', ... });
```

### WASM / public Assets Not Found

**Errors:**
- `Could not load WASM file from any location`
- `Failed to fetch mp4-wasm.wasm`
- `404 mp4-wasm.wasm`
- `audio-worker.js` not found

**Root Cause:**
- The renderer looks for `mp4-wasm.wasm` at several paths (in order). If none return a valid WASM file, rendering fails.
- WASM and worker assets must be copied to your app's `public/` (or equivalent) so the browser can load them.

**Paths tried for mp4-wasm (first successful response wins):**
- `/@mp4-wasm`
- `/assets/mp4-wasm.wasm`
- `/assets/mp4-YBRi_559.wasm`
- `/mp4-wasm.wasm`
- `/node_modules/mp4-wasm/dist/mp4-wasm.wasm`

**Solutions:**
1. Copy the WASM file to a location your app serves, e.g.:
   ```bash
   cp node_modules/@twick/browser-render/public/mp4-wasm.wasm public/
   # or
   cp node_modules/mp4-wasm/dist/mp4-wasm.wasm public/
   ```
2. Ensure your app serves the file at one of the paths above (e.g. `/mp4-wasm.wasm` or `/assets/mp4-wasm.wasm`).
3. Copy other assets if needed:
   ```bash
   cp node_modules/@twick/browser-render/public/audio-worker.js public/
   ```
4. If using Vite (or another bundler), include WASM as an asset:
   ```ts
   // vite.config.ts
   export default defineConfig({
     assetsInclude: ["**/*.wasm"],
   });
   ```

### FFmpeg Assets Missing (Audio Muxing)

**Symptoms:**
- Video renders **without audio**
- Separate `audio.wav` is downloaded
- Console errors like `Failed to load ffmpeg-core.wasm` or `ffmpeg-core.js not found`

**Root Cause:**
- When `includeAudio` is enabled, `@twick/browser-render` uses `@ffmpeg/ffmpeg` in the browser to mux audio into the final MP4
- FFmpeg core files are not installed or not served from the expected path

**Solutions:**
1. Install FFmpeg browser packages:
   ```bash
   npm install @ffmpeg/ffmpeg @ffmpeg/util @ffmpeg/core
   ```
2. Copy FFmpeg core files to your app's `public/ffmpeg` folder:
   ```bash
   mkdir -p public/ffmpeg
   cp node_modules/@ffmpeg/core/dist/ffmpeg-core.js public/ffmpeg/
   cp node_modules/@ffmpeg/core/dist/ffmpeg-core.wasm public/ffmpeg/
   ```
3. Confirm they are served from:
   - `/ffmpeg/ffmpeg-core.js`
   - `/ffmpeg/ffmpeg-core.wasm`
4. If FFmpeg still fails to load:
   - Check network tab for 404s
   - Verify `window.location.origin/ffmpeg/ffmpeg-core.js` is accessible
   - Use `downloadAudioSeparately` and `onAudioReady` as a fallback for audio-only downloads
5. If muxing fails, the renderer returns video-only and can optionally download `audio.wav` when `settings.downloadAudioSeparately` is true.

### Video Blob Too Small / Windows Encoder Issues

**Errors:**
- `Video blob is too small (X bytes). No video frames were encoded.`
- Message: *"This often happens on Windows when the encoder does not accept the frame format from canvas."*

**Root Cause:**
- On Windows, passing canvas directly to the encoder can produce invalid or empty output.
- The renderer applies workarounds: canvas copy before creating `VideoFrame`, and on Windows it may use native `VideoEncoder` with `prefer-software` (and mediabunny) so frames are actually encoded. If that path fails, it falls back to mp4-wasm with canvas copied via `createImageBitmap`.

**Solutions:**
1. Use a different browser (e.g. latest Chrome or Edge).
2. Update graphics drivers.
3. Ensure you're on a recent browser version so WebCodecs and software encoding are available.
4. If the blob is still too small, use `@twick/render-server` for export on that machine.

### Video Has Zero Duration

**Error:** `Cannot render: Video has zero duration. Please ensure your project has valid content with non-zero duration.`

**Root Cause:**
- `totalFrames` is 0 or non-finite (e.g. no content, or playback/duration calculation failed).

**Solutions:**
1. Ensure the project has at least one track with non-zero duration.
2. Check that all video elements have valid `src` and load correctly (see video metadata timeout below).
3. Verify `variables.input.properties` (width, height, fps) and track timing are set correctly.

### Video Metadata Load Timeout

**Error:** `Timeout loading video metadata: <url>`

**Root Cause:**
- A video source failed to fire `loadedmetadata` within 30 seconds (e.g. wrong URL, CORS, or no video track).

**Solutions:**
1. Use a URL that returns a valid video (same-origin or CORS-enabled).
2. Ensure the URL is reachable from the browser and returns `Content-Type: video/...`.
3. Shorten or fix the URL if it's extremely long or invalid.

### Audio Processing Timeout

**Error:** `Timeout processing audio asset after 20s - video may have no audio track`

**Root Cause:**
- Each audio/video asset is processed with a 20-second timeout. Slow or non-audio sources can hit this.

**Solutions:**
1. Use sources that have a real audio track and load quickly.
2. If a clip has no audio, the renderer skips it and continues; you can ignore this for silent clips.
3. For long or heavy assets, consider server-side rendering.

### Render Fails or Hangs in Browser

**Issue:** Rendering never finishes, or browser tab becomes unresponsive when using `useBrowserRenderer` or `renderTwickVideoInBrowser`.

**Solutions:**
1. Keep videos short for browser rendering:
   - Recommended: **≤ 30 seconds**
   - For longer videos, use `@twick/render-server`
2. Reduce resolution and FPS in `BrowserRenderConfig`:
   ```ts
   const { render } = useBrowserRenderer({
     width: 720,
     height: 1280,
     fps: 30,
     includeAudio: true,
     autoDownload: true,
   });
   ```
3. Avoid very large timelines or huge images; test with a minimal project first.
4. Watch memory usage in DevTools; if it grows quickly, simplify your composition or move to server rendering.

**Progress reporting:** When using `settings.onProgress`, progress is reported as: 0–90% video encoding, 90–97% audio generation, 98% muxing (if audio), 100% complete. Use this to see which phase is slow or stuck.

---

## Runtime Errors

### "Cannot set properties of undefined (setting 'name')"

**Error:** `Uncaught TypeError: Cannot set properties of undefined (setting 'name')` in Create React App / Webpack builds

**Root Cause:**
- Webpack (used by CRA) may have issues with ESM module resolution
- The error occurs when webpack tries to process Twick packages
- This is a build/bundling issue, not a code issue

**Solutions:**

1. **Add webpack configuration (Recommended):**
   Create or update `config-overrides.js` in your project root:
   ```js
   const path = require('path');

   module.exports = function override(config) {
     // Ensure proper module resolution
     config.resolve = {
       ...config.resolve,
       extensions: ['.js', '.jsx', '.ts', '.tsx', '.mjs'],
       alias: {
         ...config.resolve.alias,
       },
     };

     // Handle ESM packages
     config.module.rules.push({
       test: /\.mjs$/,
       include: /node_modules/,
       type: 'javascript/auto',
     });

     return config;
   };
   ```

   Install `react-app-rewired` and `customize-cra`:
   ```bash
   npm install --save-dev react-app-rewired customize-cra
   ```

   Update `package.json` scripts:
   ```json
   {
     "scripts": {
       "start": "react-app-rewired start",
       "build": "react-app-rewired build",
       "test": "react-app-rewired test"
     }
   }
   ```

2. **Use CRACO (Alternative to react-app-rewired):**
   ```bash
   npm install --save-dev @craco/craco
   ```

   Create `craco.config.js`:
   ```js
   module.exports = {
     webpack: {
       configure: (webpackConfig) => {
         webpackConfig.module.rules.push({
           test: /\.mjs$/,
           include: /node_modules/,
           type: 'javascript/auto',
         });
         return webpackConfig;
       },
     },
   };
   ```

   Update `package.json`:
   ```json
   {
     "scripts": {
       "start": "craco start",
       "build": "craco build",
       "test": "craco test"
     }
   }
   ```

3. **Eject from CRA (Last resort):**
   ```bash
   npm run eject
   ```
   Then add the `.mjs` rule to `config/webpack.config.js`:
   ```js
   {
     test: /\.mjs$/,
     include: /node_modules/,
     type: 'javascript/auto',
   }
   ```

4. **Check package versions:**
   Ensure you're using compatible versions:
   ```bash
   npm list @twick/studio @twick/video-editor
   ```

**Note:** This error is specific to webpack/CRA. Vite, Next.js, and other modern bundlers handle ESM correctly without additional configuration.

### "Cannot read property of undefined"

**Error:** `Cannot read property 'X' of undefined`

**Solutions:**
1. Ensure providers are properly nested:
   ```tsx
   // ✅ Correct order
   <LivePlayerProvider>
     <TimelineProvider>
       <TwickStudio />
     </TimelineProvider>
   </LivePlayerProvider>
   
   // ❌ Wrong - missing providers
   <TwickStudio />
   ```

2. Check initial data format:
   ```tsx
   // ✅ Correct
   <TimelineProvider
     initialData={INITIAL_TIMELINE_DATA}
     contextId="studio-demo"
   >
   
   // ❌ Wrong - missing required props
   <TimelineProvider>
   ```

### Video Not Playing

**Issue:** Video elements don't play or show

**Solutions:**
1. Check video URL is accessible (CORS if cross-origin):
   ```tsx
   // ✅ Public URL or same origin
   videoUrl: "https://example.com/video.mp4"
   
   // ❌ May fail due to CORS
   videoUrl: "file:///path/to/video.mp4"
   ```

2. Verify video format is supported (MP4, WebM, etc.)

3. Check browser console for CORS or loading errors

4. Ensure video element has proper dimensions:
   ```tsx
   studioConfig={{
     videoProps: {
       width: 720,  // Required
       height: 1280  // Required
     }
   }}
   ```

### Timeline Not Working

**Issue:** Timeline doesn't update or elements don't appear

**Solutions:**
1. Ensure `TimelineProvider` wraps components:
   ```tsx
   <TimelineProvider
     initialData={INITIAL_TIMELINE_DATA}
     contextId="unique-id"
   >
   ```

2. Use unique `contextId` for multiple instances:
   ```tsx
   <TimelineProvider contextId="editor-1">
   <TimelineProvider contextId="editor-2">
   ```

3. Check timeline data structure matches expected format

---

## Integration Issues

### React Version Conflicts

**Error:** `Invalid hook call` or React version warnings

**Solutions:**
1. Twick requires React 18+ (or 19+):
   ```bash
   npm install react@^19.2.3 react-dom@^19.2.3
   ```

2. Check for duplicate React installations:
   ```bash
   npm list react
   # Should show single version
   ```

3. Use `npm dedupe` to fix duplicates:
   ```bash
   npm dedupe
   ```

### Context Provider Issues

**Error:** `useTimelineContext must be used within TimelineProvider`

**Solutions:**
1. Ensure component is inside provider:
   ```tsx
   // ✅ Correct
   <TimelineProvider>
     <YourComponent />  // Can use useTimelineContext
   </TimelineProvider>
   
   // ❌ Wrong
   <YourComponent />  // Outside provider
   ```

2. Check provider order (LivePlayerProvider → TimelineProvider → Components)

### Multiple Instances Not Working

**Issue:** Multiple Twick editors on same page conflict

**Solutions:**
1. Use unique `contextId` for each instance:
   ```tsx
   <TimelineProvider contextId="editor-1">
     <TwickStudio />
   </TimelineProvider>
   
   <TimelineProvider contextId="editor-2">
     <TwickStudio />
   </TimelineProvider>
   ```

2. Ensure each has its own state and doesn't share data

---

## Performance Issues

### Slow Rendering / Lag

**Issue:** Editor is slow or laggy

**Solutions:**
1. Reduce video resolution for preview:
   ```tsx
   studioConfig={{
     videoProps: {
       width: 720,   // Lower for better performance
       height: 1280
     },
     playerProps: {
       quality: 0.5,  // Lower quality for preview
       maxWidth: 720
     }
   }}
   ```

2. Limit number of elements in timeline

3. Use React.memo for custom components:
   ```tsx
   const MyComponent = React.memo(() => {
     // Component code
   });
   ```

### Memory Leaks

**Issue:** Memory usage grows over time

**Solutions:**
1. Clean up event listeners in useEffect:
   ```tsx
   useEffect(() => {
     // Setup
     return () => {
       // Cleanup
     };
   }, []);
   ```

2. Unmount components when not in use

3. Limit video file sizes for preview

---

## Getting More Help

If you're still experiencing issues:

1. **Check the error message** - Full stack trace helps identify the issue
2. **Share your setup:**
   - Build tool (CRA, Next.js, Vite, etc.)
   - Node.js version (`node --version`)
   - Package versions (`npm list @twick/studio`)
   - `package.json` dependencies
3. **Minimal reproduction** - Create a small example that reproduces the issue
4. **Check existing issues** - Search GitHub issues for similar problems
5. **Join Discord** - Get help from the community: [Discord Server](https://discord.gg/DQ4f9TyGW8)

---

## Quick Reference

### Installation
```bash
npm install @twick/studio
```

### Basic Setup
```tsx
import { LivePlayerProvider } from "@twick/live-player";
import { TwickStudio } from "@twick/studio";
import { TimelineProvider, INITIAL_TIMELINE_DATA } from "@twick/timeline";
import "@twick/studio/dist/studio.css";

function App() {
  return (
    <LivePlayerProvider>
      <TimelineProvider
        initialData={INITIAL_TIMELINE_DATA}
        contextId="studio-demo"
      >
        <TwickStudio 
          studioConfig={{
            videoProps: { width: 720, height: 1280 },
          }}
        />
      </TimelineProvider>
    </LivePlayerProvider>
  );
}
```

### Common Commands
```bash
# Check installed version
npm list @twick/studio

# Update to latest
npm update @twick/studio

# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

