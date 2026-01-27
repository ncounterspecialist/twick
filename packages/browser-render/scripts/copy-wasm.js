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
    process.exit(0);
  }
}
