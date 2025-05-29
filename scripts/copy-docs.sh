#!/bin/bash

# Script to copy documentation files from packages to the documentation directory

# Create documentation directories
mkdir -p packages/documentation/docs/packages/canvas
mkdir -p packages/documentation/docs/packages/media-utils
mkdir -p packages/documentation/docs/packages/player
mkdir -p packages/documentation/docs/packages/visualizer
mkdir -p packages/documentation/docs/packages/examples

# Copy docs folders (if they exist)
cp -r packages/canvas/docs/* packages/documentation/docs/packages/canvas/ 2>/dev/null || true
cp -r packages/media-utils/docs/* packages/documentation/docs/packages/media-utils/ 2>/dev/null || true
cp -r packages/player/docs/* packages/documentation/docs/packages/player/ 2>/dev/null || true
cp -r packages/visualizer/docs/* packages/documentation/docs/packages/visualizer/ 2>/dev/null || true
cp -r packages/examples/docs/* packages/documentation/docs/packages/examples/ 2>/dev/null || true

# Copy README files
cp packages/canvas/README.md packages/documentation/docs/packages/canvas/ 2>/dev/null || true
cp packages/media-utils/README.md packages/documentation/docs/packages/media-utils/ 2>/dev/null || true
cp packages/player/README.md packages/documentation/docs/packages/player/ 2>/dev/null || true
cp packages/visualizer/README.md packages/documentation/docs/packages/visualizer/ 2>/dev/null || true
cp packages/examples/README.md packages/documentation/docs/packages/examples/ 2>/dev/null || true

echo "Documentation files copied successfully!" 