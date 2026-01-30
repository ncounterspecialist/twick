#!/usr/bin/env node
/**
 * Copy browser-render public assets (FFmpeg core, mp4-wasm.wasm, audio-worker.js)
 * to your app's public directory. Use this for Create React App or any non-Vite setup.
 *
 * Usage (from your app directory):
 *   node node_modules/@twick/browser-render/scripts/copy-public-assets.js
 *   # or with custom output dir:
 *   node node_modules/@twick/browser-render/scripts/copy-public-assets.js ./public
 *
 * Then add to package.json:
 *   "prestart": "node node_modules/@twick/browser-render/scripts/copy-public-assets.js",
 *   "prebuild": "node node_modules/@twick/browser-render/scripts/copy-public-assets.js"
 */
const fs = require('fs');
const path = require('path');

const targetDir = path.resolve(process.cwd(), process.argv[2] || 'public');
const appRoot = process.cwd();
const scriptDir = __dirname;
const browserRenderRoot = path.resolve(scriptDir, '..');

function copyIfNewer(src, dest) {
  if (!fs.existsSync(src)) return false;
  const destDir = path.dirname(dest);
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
  if (!fs.existsSync(dest) || fs.statSync(src).mtime > fs.statSync(dest).mtime) {
    fs.copyFileSync(src, dest);
    return true;
  }
  return false;
}

const copied = [];

// Resolve paths: when run from app (e.g. examples-cra), node_modules is app/node_modules
// When run from workspace, app might be packages/examples-cra
const nm = path.join(appRoot, 'node_modules');
const nmParent = path.join(appRoot, '..', 'node_modules');
const nmGrand = path.join(appRoot, '..', '..', 'node_modules');

// 1. FFmpeg core -> public/ffmpeg/
let ffmpegSource = null;
const ffmpegBases = [
  path.join(nm, '@ffmpeg', 'core'),
  path.join(nmGrand, '@ffmpeg', 'core'),
  path.join(nmParent, '@ffmpeg', 'core'),
  path.join(nmGrand, '..', 'node_modules', '@ffmpeg', 'core'),
];
for (const base of ffmpegBases) {
  for (const sub of ['dist/esm', 'dist']) {
    const d = path.join(base, sub);
    if (fs.existsSync(path.join(d, 'ffmpeg-core.js')) && fs.existsSync(path.join(d, 'ffmpeg-core.wasm'))) {
      ffmpegSource = d;
      break;
    }
  }
  if (ffmpegSource) break;
}
// pnpm store
if (!ffmpegSource && fs.existsSync(path.join(nmGrand, '.pnpm'))) {
  const pnpmDir = path.join(nmGrand, '.pnpm');
  try {
    const entries = fs.readdirSync(pnpmDir, { withFileTypes: true });
    for (const e of entries) {
      if (e.isDirectory() && e.name.startsWith('@ffmpeg+core@')) {
        const d = path.join(pnpmDir, e.name, 'node_modules', '@ffmpeg', 'core', 'dist', 'esm');
        if (fs.existsSync(path.join(d, 'ffmpeg-core.js')) && fs.existsSync(path.join(d, 'ffmpeg-core.wasm'))) {
          ffmpegSource = d;
          break;
        }
      }
    }
  } catch (_) {}
}
// From browser-render's own node_modules (when script runs from browser-render package)
if (!ffmpegSource) {
  const brNm = path.join(browserRenderRoot, 'node_modules', '@ffmpeg', 'core');
  for (const sub of ['dist/esm', 'dist']) {
    const d = path.join(brNm, sub);
    if (fs.existsSync(path.join(d, 'ffmpeg-core.js')) && fs.existsSync(path.join(d, 'ffmpeg-core.wasm'))) {
      ffmpegSource = d;
      break;
    }
  }
}

if (ffmpegSource) {
  const ffmpegDir = path.join(targetDir, 'ffmpeg');
  if (copyIfNewer(path.join(ffmpegSource, 'ffmpeg-core.js'), path.join(ffmpegDir, 'ffmpeg-core.js'))) copied.push('ffmpeg-core.js');
  if (copyIfNewer(path.join(ffmpegSource, 'ffmpeg-core.wasm'), path.join(ffmpegDir, 'ffmpeg-core.wasm'))) copied.push('ffmpeg-core.wasm');
}

// 2. mp4-wasm.wasm -> public/
const mp4Candidates = [
  path.join(nm, 'mp4-wasm', 'dist', 'mp4-wasm.wasm'),
  path.join(nm, 'mp4-wasm', 'build', 'mp4.wasm'),
  path.join(nm, '@twick', 'browser-render', 'public', 'mp4-wasm.wasm'),
  path.join(nmParent, '@twick', 'browser-render', 'public', 'mp4-wasm.wasm'),
  path.join(browserRenderRoot, 'public', 'mp4-wasm.wasm'),
];
for (const src of mp4Candidates) {
  if (copyIfNewer(src, path.join(targetDir, 'mp4-wasm.wasm'))) {
    copied.push('mp4-wasm.wasm');
    break;
  }
}

// 3. audio-worker.js -> public/
const audioCandidates = [
  path.join(nm, '@twick', 'browser-render', 'public', 'audio-worker.js'),
  path.join(nmParent, '@twick', 'browser-render', 'public', 'audio-worker.js'),
  path.join(browserRenderRoot, 'public', 'audio-worker.js'),
];
for (const src of audioCandidates) {
  if (copyIfNewer(src, path.join(targetDir, 'audio-worker.js'))) {
    copied.push('audio-worker.js');
    break;
  }
}

if (copied.length > 0) {
  console.log(`[twick-browser-render] Copied to ${targetDir}: ${copied.join(', ')}`);
}
