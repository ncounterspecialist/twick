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
    "@twick/visualizer@${TWICK_DIST_TAG}"

RUN npx puppeteer browsers install chrome

# Copy source code
COPY . ./


# Install Puppeteer (if needed)
RUN node node_modules/puppeteer/install.mjs

ENV ROLLUP_CACHE=/tmp/rollup_cache

ENV FFMPEG_PATH=/var/task/node_modules/@ffmpeg-installer/linux-x64/ffmpeg

ENV HOME=/tmp

ENV DONT_WRITE_TO_META_FILES=true

CMD ["platform/aws/handler.handler"]
