# Twick Examples - Create React App Version

This is a Create React App (CRA) version of the Twick examples package, created specifically to test production build compatibility with Create React App.

## Purpose

This package demonstrates that Twick works with Create React App's standard webpack-based build system without any custom configuration (no craco needed). The Twick packages support both CJS and ESM formats, making them compatible with CRA out of the box.

## Getting Started

### Installation

```bash
pnpm install
```

### Development Server

```bash
pnpm start
```

Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Build for Production

```bash
pnpm build
```

Builds the app for production to the `build` folder. This uses Create React App's webpack-based build system, which may surface different issues than Vite.

### Test Production Build Locally

After building, you can test the production build:

```bash
# Install serve globally if needed
npm install -g serve

# Serve the build folder
serve -s build
```

Then open the app in Chrome with DevTools → Sources to debug with source maps.

## Differences from Vite Version

- Uses Create React App's webpack bundler instead of Vite
- No custom webpack configuration needed (no craco)
- Works with standard react-scripts
- Different minification and optimization strategies
- Useful for cross-validating production build compatibility

## Available Routes

- `/` - Studio example
- `/player` - Video player example
- `/demo` - Video editor demo

## Debugging Production Errors

If you encounter the "Cannot set properties of undefined (setting 'name')" error:

1. Build the project: `pnpm build`
2. Serve it: `serve -s build`
3. Open Chrome DevTools → Sources
4. Enable source maps (usually enabled by default)
5. Click the error in the console to jump to the original source
6. Identify what's undefined and why

This will help pinpoint whether the issue is:
- A library bug in the production build
- A minification/optimization issue
- A missing initialization check
