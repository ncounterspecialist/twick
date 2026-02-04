FROM ghcr.io/puppeteer/puppeteer:latest AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM ghcr.io/puppeteer/puppeteer:latest

WORKDIR /app

# Switch to root to install system packages (needed for ffmpeg)
USER root

RUN apt-get update && apt-get install -y ffmpeg && rm -rf /var/lib/apt/lists/*

# Drop back to the non-root Puppeteer user for runtime
USER pptruser

# Tell @twick/ffmpeg to use the system binaries
ENV FFMPEG_PATH=/usr/bin/ffmpeg
ENV FFPROBE_PATH=/usr/bin/ffprobe

COPY package*.json ./
RUN npm ci --only=production

COPY --from=builder /app/dist ./dist

EXPOSE 5000

# Start the built-in render server on port 5000
CMD ["node", "dist/server.js"]

