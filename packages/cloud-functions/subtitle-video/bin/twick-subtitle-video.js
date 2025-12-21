#!/usr/bin/env node
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import { spawn } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const pkgRoot = join(__dirname, '..');

function copyTemplate(destDir) {
  const templateDir = join(pkgRoot, 'platform', 'aws');
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

  for (const name of ['Dockerfile', 'handler.js']) {
    const src = join(templateDir, name);
    const dest = join(destDir, name);
    fs.copyFileSync(src, dest);
  }

  // Minimal package.json to enable docker layer caching (npm ci)
  const pkgJsonPath = join(destDir, 'package.json');
  if (!fs.existsSync(pkgJsonPath)) {
    const pkg = {
      name: 'twick-subtitle-video-runtime',
      private: true,
      type: 'module',
      dependencies: {
        '@twick/cloud-subtitle-video': 'latest',
        'fluent-ffmpeg': '^2.1.2',
        '@ffmpeg-installer/ffmpeg': '^1.1.0',
        '@ffprobe-installer/ffprobe': '^1.1.0'
      }
    };
    fs.writeFileSync(pkgJsonPath, JSON.stringify(pkg, null, 2));
  }
}

function run(cmd, args, opts = {}) {
  return new Promise((resolve, reject) => {
    const ps = typeof cmd === 'string' && Array.isArray(args) && args.length === 0
      ? spawn(cmd, { stdio: 'inherit', shell: true, ...opts })
      : spawn(cmd, args, { stdio: 'inherit', shell: true, ...opts });
    ps.on('close', (code) => (code === 0 ? resolve() : reject(new Error(`${cmd} exited ${code}`))));
  });
}

async function main() {
  const [command, ...rest] = process.argv.slice(2);

  if (!command || ['-h', '--help', 'help'].includes(command)) {
    console.log(`
Usage: twick-subtitle-video <command> [options]

Commands:
  init [dir]             Scaffold AWS container template into [dir] (default: ./twick-subtitle-video-aws)
  build <image> [dir]    Docker build image from [dir] (default: ./twick-subtitle-video-aws)
  ecr-login <region> <accountId>  Login docker to ECR
  push <image> <region> <accountId>  Push image to ECR (repo must exist)

Examples:
  twick-subtitle-video init
  twick-subtitle-video build my-repo:latest
  twick-subtitle-video ecr-login us-east-1 123456789012
  twick-subtitle-video push my-repo:latest us-east-1 123456789012
`);
    return;
  }

  if (command === 'init') {
    const dir = rest[0] || 'twick-subtitle-video-aws';
    copyTemplate(dir);
    console.log(`✔ Scaffolded AWS runtime into ./${dir}`);
    return;
  }

  if (command === 'build') {
    const image = rest[0];
    const dir = rest[1] || 'twick-subtitle-video-aws';
    if (!image) throw new Error('Image name required. e.g., my-repo:latest');
    // Build for linux/amd64 platform to avoid creating multi-arch manifest index
    // This reduces the number of artifacts pushed to the registry
    await run('docker', ['build', '--platform', 'linux/amd64', '-t', image, dir]);
    return;
  }

  if (command === 'ecr-login') {
    const region = rest[0];
    const accountId = rest[1];
    if (!region || !accountId) throw new Error('Usage: ecr-login <region> <accountId>');
    const registry = `${accountId}.dkr.ecr.${region}.amazonaws.com`;
    await run(`aws ecr get-login-password --region ${region} | docker login --username AWS --password-stdin ${registry}`, []);
    return;
  }

  if (command === 'push') {
    const image = rest[0];
    const region = rest[1];
    const accountId = rest[2];
    if (!image || !region || !accountId) throw new Error('Usage: push <image> <region> <accountId>');
    const [repo, tag = 'latest'] = image.split(':');
    const registry = `${accountId}.dkr.ecr.${region}.amazonaws.com`;
    const remote = `${registry}/${repo}:${tag}`;
    await run('docker', ['tag', `${repo}:${tag}`, remote]);
    await run('docker', ['push', remote]);
    console.log(`✔ Pushed ${remote}`);
    return;
  }

  throw new Error(`Unknown command: ${command}`);
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
