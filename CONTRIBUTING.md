# Contributing to Twick

Thank you for your interest in contributing to Twick! This guide will help you get started with the development setup and contribution process.

## Development Setup

### Prerequisites

- **Node.js** 18+ and **pnpm** 8.15.4+ (see `packageManager` in `package.json`)
- **Git** for version control
- A code editor (VS Code recommended)

### Initial Setup

1. **Fork and clone the repository:**
```bash
git clone https://github.com/ncounterspecialist/twick.git
cd twick
```

2. **Install dependencies:**
```bash
pnpm install
```

3. **Build all packages:**
```bash
pnpm build
```

4. **Run the demo to verify setup:**
```bash
pnpm preview
```

Open http://localhost:4173 in your browser to see the video editor in action.

### Development Workflow

**Run development servers:**
```bash
# Run all packages in watch mode
pnpm dev

# Run a specific package
pnpm dev:canvas
pnpm dev:timeline
pnpm dev:studio
```

**Build specific packages:**
```bash
pnpm build:canvas
pnpm build:timeline
```

**Run linting:**
```bash
pnpm lint
pnpm lint:fix  # Auto-fix issues
```

**Run tests:**
```bash
pnpm test
```

## Adding a New Package

### 1. Create Package Directory

Create a new directory under `packages/`:

```bash
mkdir packages/my-new-package
cd packages/my-new-package
```

### 2. Initialize Package

Create a `package.json` following the structure of existing packages:

```json
{
  "name": "@twick/my-new-package",
  "version": "0.14.11",
  "type": "module",
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "sideEffects": false,
  "license": "SEE LICENSE IN LICENSE.md",
  "files": ["dist"],
  "publishConfig": {
    "access": "public"
  },
  "scripts": {
    "build": "tsc --noEmit && vite build",
    "dev": "vite build --watch",
    "lint": "eslint src/",
    "clean": "rimraf .turbo node_modules dist"
  },
  "dependencies": {
    "@twick/media-utils": "0.14.11"
  },
  "devDependencies": {
    "typescript": "^5.4.2",
    "vite": "^5.4.21",
    "vite-plugin-dts": "^3.7.3"
  }
}
```

### 3. Add to Workspace

Add the package to `pnpm-workspace.yaml` (if not already covered by wildcards):

```yaml
packages:
  - 'packages/*'
  - 'packages/my-new-package'  # Only if needed
```

### 4. Add Build Scripts

Add build scripts to the root `package.json`:

```json
{
  "scripts": {
    "build:my-new-package": "turbo run build --filter=@twick/my-new-package",
    "dev:my-new-package": "turbo run dev --filter=@twick/my-new-package"
  }
}
```

### 5. Create Source Structure

Create the basic source structure:

```
packages/my-new-package/
├── src/
│   ├── index.ts          # Main entry point
│   └── ...
├── tsconfig.json
├── vite.config.ts
└── package.json
```

### 6. Follow Style Guide

Ensure your code follows the [STYLE_GUIDE.md](./STYLE_GUIDE.md) conventions:
- Use `const` arrow functions for all function declarations
- Use PascalCase for classes
- Use camelCase for methods and variables
- Follow the established patterns in existing packages

## Submitting Pull Requests

### Before You Start

1. **Check for existing issues** — Your feature might already be discussed
2. **Create an issue first** (for significant changes) — Discuss the approach before implementing
3. **Look for "good first issue" labels** — These are great starting points

### PR Process

1. **Create a feature branch:**
```bash
git checkout -b feature/my-feature-name
# or
git checkout -b fix/bug-description
```

2. **Make your changes:**
   - Write clear, focused commits
   - Follow the existing code style
   - Add tests if applicable
   - Update documentation if needed

3. **Test your changes:**
```bash
pnpm build
pnpm lint
pnpm test  # If tests exist
```

4. **Commit your changes:**
```bash
git add .
git commit -m "feat: add new feature description"
```

Follow [Conventional Commits](https://www.conventionalcommits.org/) format:
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `refactor:` for code refactoring
- `test:` for test changes

5. **Push and create PR:**
```bash
git push origin feature/my-feature-name
```

Then create a pull request on GitHub with:
- Clear title and description
- Reference related issues (e.g., "Fixes #123")
- Screenshots/videos for UI changes
- Description of what changed and why

### PR Review Process

- Maintainers will review your PR
- Address feedback promptly
- Keep PRs focused and reasonably sized
- Update your branch if the main branch changes

## Code Style

Please follow the [STYLE_GUIDE.md](./STYLE_GUIDE.md) for:
- Naming conventions
- Function declarations
- Code organization
- TypeScript patterns

## Good First Issues

Looking for a place to start? Check for issues labeled `good first issue` in the GitHub issues. These are typically:
- Small, well-defined tasks
- Good for learning the codebase
- Clearly documented

If you don't see any, feel free to:
- Fix typos in documentation
- Improve test coverage
- Add examples to the examples package
- Improve error messages

## Questions?

- **Discord**: Join our [Discord community](https://discord.gg/DQ4f9TyGW8) for real-time discussion
- **GitHub Issues**: Use issues for bug reports and feature requests
- **Documentation**: Check the [Twick API Documentation](https://ncounterspecialist.github.io/twick)

## License

By contributing to Twick, you agree that your contributions will be licensed under the same license as the project (Sustainable Use License v1.0).

