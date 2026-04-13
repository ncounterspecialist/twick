FROM --platform=linux/amd64 docker.io/revideo/aws-lambda-base-image:latest

ARG TWICK_DIST_TAG=latest

# Copy package files for better caching
COPY package.json package-lock.json* ./

RUN npm install

RUN npm install --no-save \
    "@twick/2d@${TWICK_DIST_TAG}" \
    "@twick/core@${TWICK_DIST_TAG}" \
    "@twick/ffmpeg@${TWICK_DIST_TAG}" \
    "@twick/renderer@${TWICK_DIST_TAG}" \
    "@twick/ui@${TWICK_DIST_TAG}" \
    "@twick/vite-plugin@${TWICK_DIST_TAG}" \
    "@twick/visualizer@${TWICK_DIST_TAG}" \
    twemoji

RUN npx puppeteer browsers install chrome

# Copy source code
COPY . ./

# Ensure local font directory exists and copy everything from visualizer's fonts
RUN mkdir -p fonts && \
    cp -r node_modules/@twick/visualizer/dist/fonts/. fonts/

# Bundle local emoji PNG assets for deterministic emoji rendering in Lambda.
# twemoji>=14 no longer includes assets in the npm package, so keep build non-fatal.
RUN mkdir -p emoji && \
    if [ -d node_modules/twemoji/assets/72x72 ]; then \
      cp -r node_modules/twemoji/assets/72x72/. emoji/; \
    else \
      echo "twemoji PNG assets not found in npm package; continuing without bundled emoji assets"; \
    fi

# Install Puppeteer (if needed)
RUN node node_modules/puppeteer/install.mjs

ENV ROLLUP_CACHE=/tmp/rollup_cache

ENV FFMPEG_PATH=/var/task/node_modules/@ffmpeg-installer/linux-x64/ffmpeg

ENV HOME=/tmp

ENV DONT_WRITE_TO_META_FILES=true
ENV TWICK_EMOJI_ASSETS_DIR=/var/task/emoji

CMD ["platform/aws/handler.handler"]
