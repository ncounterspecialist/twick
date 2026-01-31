#!/usr/bin/env node
/**
 * Copy @ffmpeg/ffmpeg dist and patch worker.js so webpack/Next.js/CRA
 * don't try to resolve the dynamic import(coreURL) as a module.
 * Runs on prepare (after install) so dist/ exists for local dev and publish.
 */
const fs = require('fs');
const path = require('path');

const pkgRoot = path.resolve(__dirname, '..');
const distOut = path.join(pkgRoot, 'dist');

const possibleSrcRoots = [
  path.join(pkgRoot, 'node_modules', '@ffmpeg', 'ffmpeg'),
  path.join(pkgRoot, '..', '..', 'node_modules', '.pnpm', 'node_modules', '@ffmpeg', 'ffmpeg'),
  path.join(pkgRoot, '..', 'browser-render', 'node_modules', '@ffmpeg', 'ffmpeg'),
  path.join(pkgRoot, '..', '..', 'node_modules', '@ffmpeg', 'ffmpeg'),
];
let srcRoot = null;
for (const r of possibleSrcRoots) {
  if (fs.existsSync(path.join(r, 'dist'))) {
    srcRoot = r;
    break;
  }
}
if (!srcRoot) {
  console.warn('[@twick/ffmpeg-web] @ffmpeg/ffmpeg dist not found; run pnpm install first.');
  process.exit(0);
}

const distIn = path.join(srcRoot, 'dist');

function copyRecursive(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    for (const name of fs.readdirSync(src)) {
      copyRecursive(path.join(src, name), path.join(dest, name));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}

if (fs.existsSync(distOut)) fs.rmSync(distOut, { recursive: true });
copyRecursive(distIn, distOut);

const workerPath = path.join(distOut, 'esm', 'worker.js');
if (fs.existsSync(workerPath)) {
  let content = fs.readFileSync(workerPath, 'utf8');
  const bothComments = '/* webpackIgnore: true */ /* @vite-ignore */';
  let patched = false;
  // Upstream may have @vite-ignore; replace with both so webpack and Vite are happy.
  if (content.includes('/* @vite-ignore */') && !content.includes(bothComments)) {
    content = content.replace('/* @vite-ignore */', bothComments);
    patched = true;
  }
  // Already-patched (webpack only): add @vite-ignore so Vite doesn't warn.
  if (content.includes('/* webpackIgnore: true */') && !content.includes('/* @vite-ignore */')) {
    content = content.replace('/* webpackIgnore: true */ _coreURL', bothComments + ' _coreURL');
    patched = true;
  }
  if (patched) {
    fs.writeFileSync(workerPath, content);
    console.log('[@twick/ffmpeg-web] Patched dist/esm/worker.js for webpack/Next.js/CRA/Vite.');
  }
}

console.log('[@twick/ffmpeg-web] dist ready.');
