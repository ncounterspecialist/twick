FROM --platform=linux/amd64 public.ecr.aws/lambda/nodejs:20

COPY package.json package-lock.json* ./
RUN npm install

COPY . ./

# Image handler - override CMD when building for video
CMD ["platform/aws/handler-image.handler"]
