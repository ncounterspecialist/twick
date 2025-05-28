# Twick

This repository contains a collection of packages for video and image manipulation, built with modern web technologies.

## Packages

- **@twick/media-utils**: Core utilities for media handling and manipulation
- **@twick/canvas**: React-based canvas library for video and image editing

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/ncounterspecialist/twick.git
cd twick
```

2. Install dependencies:
```bash
npm install
```

3. Build all packages:
```bash
npm run build
```

4. Start development:
```bash
npm run dev
```

## Development

Each package can be developed independently:

```bash
# Build a specific package
npm run build --workspace=@twick/canvas

# Start development mode for a package
npm run dev --workspace=@twick/canvas
```

## How to run example

Build visualizer

```
cd packages/visualizer
npm install
npm run build
```

**Go to root folder**

```
cd ../..
```

Build all other packages

```
pnpm install
pnpm build
```
* Go-ahead even if documentation build fails

Preview examples

```
pnpm preview
```

Open http://localhost:4173/ in browser

## Demo Preview

Here's a glimpse of building a video using the SDK:

https://youtu.be/xuocqJqc9m8?si=h0wobDZlr9aj9XxW

## Discord Community

Join our Discord community to:
- Chat with other developers
- Discuss issues and feature requests
- Get help and share your experiences
- Stay updated with the latest developments

[Join our Discord Server](https://discord.gg/u7useVAY)

## 🛡 License

This project is licensed under the **Apache 2.0 License with additional terms**.

- ✅ Free for use in commercial and non-commercial apps
- ✅ Can be modified and self-hosted
- ❌ Cannot be sold, rebranded, or distributed as a standalone SDK or developer tool
- ❌ Cannot be used to offer hosted cloud functions as a paid service

👉 For resale, or SaaS redistribution please [contact us](mailto:contact@kifferai.com).

