FROM public.ecr.aws/lambda/nodejs:20

# Install required tools (curl-minimal already exists, so we install tar and xz)
# Use microdnf (symlinked as dnf) - the package manager for Amazon Linux 2023 minimal
RUN microdnf install -y tar xz && \
    tar --version

# Install ffmpeg (static binary - most reliable for Lambda)
# curl-minimal is sufficient for downloads
RUN curl -L https://johnvansickle.com/ffmpeg/releases/ffmpeg-release-amd64-static.tar.xz -o /tmp/ffmpeg.tar.xz && \
    cd /tmp && \
    tar -xJf ffmpeg.tar.xz && \
    cp ffmpeg-*-amd64-static/ffmpeg /usr/local/bin/ && \
    cp ffmpeg-*-amd64-static/ffprobe /usr/local/bin/ && \
    chmod +x /usr/local/bin/ffmpeg /usr/local/bin/ffprobe && \
    rm -rf /tmp/ffmpeg* && \
    ffmpeg -version

# Install yt-dlp (standalone binary - no Python required)
# Download the standalone Linux binary which doesn't require Python 3.10+
RUN curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp_linux -o /usr/local/bin/yt-dlp && \
    chmod +x /usr/local/bin/yt-dlp && \
    yt-dlp --version

# Copy package files for better caching
COPY package.json package-lock.json* ./

RUN npm install

# Copy source code
COPY . ./

# Default Lambda handler
CMD ["platform/aws/handler.handler"]
