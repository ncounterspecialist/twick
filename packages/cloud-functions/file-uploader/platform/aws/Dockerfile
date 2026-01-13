FROM public.ecr.aws/lambda/nodejs:20

# Copy package files for better caching
COPY package.json package-lock.json* ./

RUN npm install

# Copy source code
COPY . ./

# Default Lambda handler
CMD ["platform/aws/handler.handler"]
