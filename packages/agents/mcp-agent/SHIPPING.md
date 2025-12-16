# Shipping Guide for MCP Twick Server

This guide covers how to distribute and ship the `@twick/mcp-agent` package.

## Monorepo Publishing (Primary Method)

`@twick/mcp-agent` is part of the Twick monorepo and is published automatically to npm along with other Twick packages when a release tag is pushed.

### How It Works

1. **Automatic Publishing**: The package is included in the automated GitHub Actions workflow that publishes all Twick packages to npm when a version tag is pushed.

2. **Version Management**: The package version is synchronized with other Twick packages. When you create a release tag (e.g., `v0.14.12`), all packages including `@twick/mcp-agent` are published with that version.

3. **Release Process**: 
   - Create and push a version tag: `git tag v0.14.12 && git push origin v0.14.12`
   - The GitHub Actions workflow automatically:
     - Updates all package.json versions
     - Builds all packages
     - Publishes to npm in dependency order

See the root [RELEASE_PROCESS.md](../../../RELEASE_PROCESS.md) for detailed release instructions.

### Package Information

- **Package Name**: `@twick/mcp-agent`
- **Published to**: npm (public)
- **Installation**: `npm install -g @twick/mcp-agent`
- **Binary**: `twick-mcp-agent` (available after installation)

### User Installation

After the package is published, users can install it via:

```bash
# Install globally
npm install -g @twick/mcp-agent

# Run the Claude Desktop installer
twick-mcp-agent --install-claude
# Or if the binary isn't in PATH:
npx @twick/mcp-agent install-claude
```

---

## Distribution Options (Alternative Methods)

For standalone distribution or testing, you can use these methods:

### Option 1: GitHub Releases (Recommended for Claude Desktop Extensions)

This is the most common way to distribute Claude Desktop MCP servers.

#### Steps:

1. **Prepare for release:**
   ```bash
   # Ensure everything is built
   npm run build
   
   # Test the installation
   npm run install-claude
   ```

2. **Create a GitHub release:**
   - Go to your GitHub repository
   - Click "Releases" → "Create a new release"
   - Tag version: `v1.0.0` (match your package.json version)
   - Release title: `v1.0.0 - Initial Release`
   - Description: Copy from CHANGELOG or describe features
   - Upload files (optional): You can attach a zip file with the project

3. **Users install via:**
   ```bash
   git clone <your-repo-url>
   cd twick
   cd packages/agents/mcp-agent
   pnpm install
   pnpm run install-claude
   ```

#### Best Practices:
- Use semantic versioning (v1.0.0, v1.1.0, v2.0.0)
- Include a CHANGELOG.md
- Tag releases in git: `git tag v1.0.0 && git push origin v1.0.0`

---

### Option 2: Manual npm Publishing (For Testing)

If you need to publish manually for testing (not recommended for production):

#### Prerequisites:
- npm account with access to `@twick` organization
- Login: `npm login`

#### Steps:

1. **Build and test:**
   ```bash
   cd packages/agents/mcp-agent
   pnpm run build
   npm pack  # Creates a .tgz file to inspect
   ```

2. **Publish:**
   ```bash
   npm publish --access public
   ```

3. **Users install via:**
   ```bash
   npm install -g @twick/mcp-agent
   npx @twick/mcp-agent install-claude
   ```

#### Note:
- Manual publishing bypasses the automated workflow
- Version should match other Twick packages for consistency
- Use this only for testing; production releases should use the automated workflow

---

### Option 3: Standalone Installer Script

Create a single script that users can run to install everything.

#### Create `install.sh` (for Unix/Mac):

```bash
#!/bin/bash
set -e

echo "Installing twick-mcp-agent..."

# Clone or download
if [ -d "twick-mcp-agent" ]; then
  cd twick-mcp-agent
  git pull
else
  git clone <your-repo-url> twick-mcp-agent
  cd twick-mcp-agent
fi

# Install and build
npm install
npm run build

# Run Claude Desktop installer
npm run install-claude

echo "Installation complete!"
```

#### Create `install.ps1` (for Windows):

```powershell
Write-Host "Installing twick-mcp-agent..."

# Clone or download
if (Test-Path "twick-mcp-agent") {
    Set-Location twick-mcp-agent
    git pull
} else {
    git clone <your-repo-url> twick-mcp-agent
    Set-Location twick-mcp-agent
}

# Install and build
npm install
npm run build

# Run Claude Desktop installer
npm run install-claude

Write-Host "Installation complete!"
```

---

## Pre-Release Checklist

Before shipping, ensure:

- [ ] **Code Quality:**
  - [ ] All TypeScript compiles without errors
  - [ ] No console.log statements (use console.error for stdio servers)
  - [ ] Error handling is robust
  - [ ] No hardcoded credentials or paths

- [ ] **Documentation:**
  - [ ] README.md is complete and accurate
  - [ ] Installation instructions work
  - [ ] Configuration examples are correct
  - [ ] Troubleshooting section is helpful

- [ ] **Configuration:**
  - [ ] `package.json` has correct metadata
  - [ ] Version number is appropriate
  - [ ] `.gitignore` excludes sensitive files
  - [ ] `claude_desktop_config.json` has placeholder values

- [ ] **Testing:**
  - [ ] Test installation on clean system
  - [ ] Test with actual video URLs
  - [ ] Test error cases (invalid URLs, missing credentials)
  - [ ] Test on different platforms (Windows/Mac/Linux)

- [ ] **Security:**
  - [ ] No credentials in code or config files
  - [ ] `.env.local` and `gcp-sa-key.json` are in `.gitignore`
  - [ ] Sensitive files are excluded from npm package

- [ ] **Distribution:**
  - [ ] Build succeeds: `npm run build`
  - [ ] Install script works: `npm run install-claude`
  - [ ] Files to ship are identified (see `files` in package.json)

---

## Version Management

Version management is handled automatically by the monorepo release process:

- **MAJOR** (0.14.0 → 1.0.0): Breaking changes
- **MINOR** (0.14.0 → 0.15.0): New features, backward compatible
- **PATCH** (0.14.0 → 0.14.1): Bug fixes, backward compatible

### Creating a Release

The package is released automatically when you create a version tag:

1. **Create and push a version tag:**
   ```bash
   # From the repository root
   git tag v0.14.12
   git push origin v0.14.12
   ```

2. **The GitHub Actions workflow automatically:**
   - Updates all package.json versions (including this package)
   - Builds all packages
   - Publishes to npm in dependency order

3. **Monitor the workflow:**
   - Check GitHub Actions for the publish workflow
   - Verify the package appears on npm: https://www.npmjs.com/package/@twick/mcp-agent

For more details, see the root [RELEASE_PROCESS.md](../../../RELEASE_PROCESS.md).

---

## Post-Release

- [ ] Announce on relevant channels (Discord, forums, etc.)
- [ ] Monitor for issues and feedback
- [ ] Update documentation based on user feedback
- [ ] Plan next version features

---

## Example Release Workflow

```bash
# 1. Ensure everything is committed (from repository root)
git status

# 2. Test the package locally
cd packages/agents/mcp-agent
pnpm run build
pnpm run install-claude  # Test locally
cd ../../..

# 3. Create and push version tag
git tag v0.14.12
git push origin v0.14.12

# 4. Monitor GitHub Actions workflow
# The workflow will automatically:
# - Update all package versions
# - Build all packages
# - Publish to npm

# 5. (Optional) Create GitHub release (via web UI)
# Or use GitHub CLI:
gh release create v0.14.12 --title "v0.14.12" --notes "Release notes"
```

---

## Distribution Files

When shipping, include:

✅ **Include:**
- `dist/` (compiled JavaScript)
- `claude_desktop_config.json`
- `install.js`
- `README.md`
- `package.json`
- `package-lock.json` (for reproducible installs)

❌ **Exclude:**
- `node_modules/` (users will `npm install`)
- `*.ts` source files (unless open source)
- `.env*` files
- `gcp-sa-key.json` or any credentials
- `.git/` directory
- IDE files (`.vscode/`, `.idea/`)

The `.npmignore` file handles this for npm packages.

---

## Quick Start for Users

After the package is published to npm, users can install it:

### Option 1: Install from npm (Recommended)

```bash
# Install globally
npm install -g @twick/mcp-agent

# Run the Claude Desktop installer
twick-mcp-agent --install-claude
# Or:
npx @twick/mcp-agent install-claude
```

### Option 2: Install from source

```bash
# Clone repository
git clone <your-repo-url>
cd twick/packages/agents/mcp-agent

# Install dependencies
pnpm install

# Build
pnpm run build

# Run Claude Desktop installer
pnpm run install-claude
```

### Configuration

After installation, users need to configure their GCP credentials in the Claude Desktop config file. The installer will provide the location and instructions.

That's it! 🚀

