FROM docker.io/revideo/aws-lambda-base-image:latest

# Copy package files for better caching
COPY package.json package-lock.json* ./

RUN npm install

RUN npx puppeteer browsers install chrome

# Copy source code
COPY . ./


# Install Puppeteer (if needed)
RUN node node_modules/puppeteer/install.mjs

ENV ROLLUP_CACHE=/tmp/rollup_cache

ENV FFMPEG_PATH=/var/task/node_modules/@ffmpeg-installer/linux-x64/ffmpeg

ENV HOME=/tmp

ENV DONT_WRITE_TO_META_FILES=true

CMD ["handler.handler"]
