#!/usr/bin/env node

import { execSync } from "child_process";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, "..");

// Configuration
const AWS_REGION = process.env.AWS_REGION;
const AWS_ACCOUNT_ID = process.env.AWS_ACCOUNT_ID;
const ECR_REGISTRY = `${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com`;
const IMAGE_NAME = "twick-transcript";
const DOCKERFILE_PATH = "platform/aws/Dockerfile";
const BUILD_CONTEXT = ".";

// Get version from command line argument
const version = process.argv[2];

if (!version) {
  console.error("Error: Version is required");
  console.error("Usage: npm run deploy:aws <version>");
  console.error("Example: npm run deploy:aws 0.14.16");
  process.exit(1);
}

// Validate version format (basic check)
if (!/^\d+\.\d+\.\d+/.test(version)) {
  console.error(`Error: Invalid version format: ${version}`);
  console.error("Expected format: X.Y.Z (e.g., 0.14.16)");
  process.exit(1);
}

const imageTag = `${IMAGE_NAME}:${version}`;
const ecrImageUri = `${ECR_REGISTRY}/${imageTag}`;

console.log(`Deploying ${imageTag} to ${ECR_REGISTRY}`);
console.log("=".repeat(60));

try {
  // Step 1: Login to ECR
  console.log("\n[1/4] Logging into AWS ECR...");
  const loginCommand = `aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${ECR_REGISTRY}`;
  execSync(loginCommand, { stdio: "inherit", cwd: projectRoot });
  console.log("✓ Successfully logged into ECR");

  // Step 2: Build Docker image
  console.log(`\n[2/4] Building Docker image ${imageTag}...`);
  const buildCommand = `docker buildx build --platform linux/amd64 -t ${imageTag} -f ${DOCKERFILE_PATH} ${BUILD_CONTEXT}`;
  execSync(buildCommand, { stdio: "inherit", cwd: projectRoot });
  console.log(`✓ Successfully built ${imageTag}`);

  // Step 3: Tag image for ECR
  console.log(`\n[3/4] Tagging image as ${ecrImageUri}...`);
  const tagCommand = `docker tag ${imageTag} ${ecrImageUri}`;
  execSync(tagCommand, { stdio: "inherit", cwd: projectRoot });
  console.log(`✓ Successfully tagged ${ecrImageUri}`);

  // Step 4: Push to ECR
  console.log(`\n[4/4] Pushing image to ECR...`);
  const pushCommand = `docker push ${ecrImageUri}`;
  execSync(pushCommand, { stdio: "inherit", cwd: projectRoot });
  console.log(`✓ Successfully pushed ${ecrImageUri}`);

  console.log("\n" + "=".repeat(60));
  console.log("✓ Deployment completed successfully!");
  console.log(`\nImage URI: ${ecrImageUri}`);
} catch (error) {
  console.error("\n✗ Deployment failed:", error.message);
  process.exit(1);
}

