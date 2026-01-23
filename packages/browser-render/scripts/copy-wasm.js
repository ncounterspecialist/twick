#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const dest = path.join(root, 'public', 'mp4-wasm.wasm');
const candidates = [
  path.join(root, 'node_modules', 'mp4-wasm', 'dist', 'mp4-wasm.wasm'),
  path.join(root, 'node_modules', 'mp4-wasm', 'build', 'mp4.wasm'),
  path.resolve(root, '..', 'examples', 'public', 'mp4-wasm.wasm'),
];

fs.mkdirSync(path.dirname(dest), { recursive: true });
for (const src of candidates) {
  if (fs.existsSync(src)) {
    fs.cpSync(src, dest);
    console.log('Copied mp4-wasm.wasm to public/ from', path.relative(root, src));
    process.exit(0);
  }
}
console.warn('mp4-wasm.wasm not found in any candidate path; skipping. Consumers can copy from examples public/ or node_modules/mp4-wasm.');
