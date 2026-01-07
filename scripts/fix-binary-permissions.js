#!/usr/bin/env node

/**
 * Fix permissions for ffmpeg and ffprobe binaries
 * This script ensures that the binaries have execute permissions
 */

const { chmod } = require('fs/promises');
const { execSync } = require('child_process');
const { existsSync } = require('fs');
const { join } = require('path');

const nodeModulesPath = join(process.cwd(), 'node_modules');

async function fixBinaryPermissions(binaryPath) {
  try {
    if (existsSync(binaryPath)) {
      await chmod(binaryPath, 0o755);
      console.log(`✅ Fixed permissions for: ${binaryPath}`);
    }
  } catch (error) {
    // Silently ignore errors (binary might not exist on this platform)
  }
}

async function findAndFixBinaries() {
  try {
    // Find all ffprobe and ffmpeg binaries in node_modules
    const findCommand = `find "${nodeModulesPath}/.pnpm" -name "ffprobe" -o -name "ffmpeg" 2>/dev/null`;
    const binaries = execSync(findCommand, { encoding: 'utf-8' })
      .split('\n')
      .filter(Boolean)
      .filter(path => !path.includes('.map') && !path.includes('.d.ts'));

    for (const binary of binaries) {
      await fixBinaryPermissions(binary);
    }

    if (binaries.length > 0) {
      console.log(`✅ Fixed permissions for ${binaries.length} binary(ies)`);
    }
  } catch (error) {
    // Silently ignore if find command fails (node_modules might not exist)
  }
}

findAndFixBinaries().catch(() => {
  // Silently ignore errors
});
