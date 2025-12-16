# Release Process

This document explains how to release new versions of the Twick packages to npm.

## Automated Release Process

The project uses GitHub Actions to automatically publish packages to npm when a release tag is pushed.

### How to Create a Release

1. **Prepare your changes**: Make sure all your changes are committed and pushed to the main branch.

2. **Create a release tag**: Create and push a tag with the version you want to release:
   ```bash
   # Create a tag (e.g., for version 0.14.0)
   git tag v0.14.0
   
   # Push the tag to trigger the release workflow
   git push origin v0.14.0
   ```

3. **Monitor the workflow**: The GitHub Action will automatically:
   - Extract the version from the tag (removes the 'v' prefix)
   - Update all package.json files to use the new version
   - Update internal dependencies between packages
   - Build all packages
   - Publish each package to npm

### Version Format

- Use semantic versioning: `MAJOR.MINOR.PATCH` (e.g., `0.14.0`)
- Tag format: `v` + version (e.g., `v0.14.0`)
- The workflow will automatically convert `v0.14.0` to `0.14.0` for npm publishing

### What Gets Published

The following packages will be published to npm:
- `@twick/media-utils`
- `@twick/canvas`
- `@twick/timeline`
- `@twick/live-player`
- `@twick/video-editor`
- `@twick/visualizer`
- `@twick/mcp-agent`

### Prerequisites

Before creating a release, ensure you have:

1. **NPM Token**: Set up an `NPM_TOKEN` secret in your GitHub repository settings
   - Go to Settings → Secrets and variables → Actions
   - Add a new repository secret named `NPM_TOKEN`
   - Use your npm access token (create one at https://www.npmjs.com/settings/tokens)

2. **NPM Access**: Make sure you have publish access to the `@twick` organization on npm

### Manual Release (Alternative)

If you prefer to release manually:

1. Update all package versions in `package.json` files
2. Update internal dependencies
3. Run `pnpm build`
4. Run `pnpm publish` in each package directory

### Troubleshooting

- **Workflow fails**: Check the GitHub Actions tab for detailed error messages
- **Package already exists**: Make sure you're incrementing the version number
- **Build errors**: Fix any build issues before creating the tag
- **Permission errors**: Verify your NPM_TOKEN has the correct permissions
- **Local test fails**: Check that jq and pnpm are installed correctly

### Rollback

If you need to rollback a release:
1. Unpublish the package from npm (if within 72 hours)
2. Delete the tag: `git push origin --delete v0.14.0`
3. Create a new tag with the correct version 