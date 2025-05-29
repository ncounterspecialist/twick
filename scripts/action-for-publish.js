const fs = require('fs');
const path = require('path');

function cleanWorkspaceVersions(deps) {
  if (!deps) return deps;
  const cleaned = {};
  for (const [dep, version] of Object.entries(deps)) {
    if (typeof version === 'string' && version.startsWith('workspace:')) {
      cleaned[dep] = version.replace(/^workspace:/, '');
    } else {
      cleaned[dep] = version;
    }
  }
  return cleaned;
}

function processPackageJson(pkgPath, restore = false) {
  const backupPath = pkgPath + '.bak';

  if (restore) {
    if (!fs.existsSync(backupPath)) {
      console.error(`Backup file not found for ${pkgPath}, skipping restore.`);
      return;
    }
    fs.copyFileSync(backupPath, pkgPath);
    fs.unlinkSync(backupPath);
    console.log(`Restored ${pkgPath} from backup.`);
    return;
  }

  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(pkgPath, backupPath);
    console.log(`Backup created for ${pkgPath}`);
  } else {
    console.log(`Backup already exists for ${pkgPath}, proceeding to clean.`);
  }

  const pkgJson = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));

  ['dependencies', 'devDependencies', 'peerDependencies', 'optionalDependencies'].forEach(depField => {
    if (pkgJson[depField]) {
      pkgJson[depField] = cleanWorkspaceVersions(pkgJson[depField]);
    }
  });

  fs.writeFileSync(pkgPath, JSON.stringify(pkgJson, null, 2) + '\n', 'utf-8');
  console.log(`Removed "workspace:" prefixes in ${pkgPath}`);
}

function getPackagesFolders(packagesDir) {
  if (!fs.existsSync(packagesDir)) {
    console.error(`Packages directory not found: ${packagesDir}`);
    return [];
  }
  return fs.readdirSync(packagesDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => path.join(packagesDir, dirent.name));
}

function main() {
  const args = process.argv.slice(2);
  const restore = args.includes('--restore');

  // Process root package.json
  const rootPkg = path.resolve(process.cwd(), 'package.json');
  if (fs.existsSync(rootPkg)) {
    processPackageJson(rootPkg, restore);
  } else {
    console.warn('Root package.json not found, skipping.');
  }

  // Process all packages/*/package.json
  const packagesDir = path.resolve(process.cwd(), 'packages');
  const packageFolders = getPackagesFolders(packagesDir);

  packageFolders.forEach(folder => {
    const pkgPath = path.join(folder, 'package.json');
    if (fs.existsSync(pkgPath)) {
      processPackageJson(pkgPath, restore);
    } else {
      console.warn(`No package.json found in ${folder}, skipping.`);
    }
  });
}

main();
