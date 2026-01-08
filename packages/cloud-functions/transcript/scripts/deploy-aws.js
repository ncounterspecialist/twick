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

console.log(`Deploying ${imageTag} to ECR (${AWS_REGION})`);
console.log("=".repeat(60));

try {
  // Step 1: Login to ECR
  console.log("\n[1/4] Logging into AWS ECR...");
  const loginCommand = `aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${ECR_REGISTRY}`;
  execSync(loginCommand, { stdio: "inherit", cwd: projectRoot });
  console.log("✓ Successfully logged into ECR");

  // Step 2: Delete ALL existing images/manifests with this tag from ECR
  console.log(`\n[2/4] Deleting all existing images/manifests with tag ${version}...`);
  try {
    // Get all images with this tag (including manifests)
    const listCommand = `aws ecr describe-images --repository-name ${IMAGE_NAME} --image-ids imageTag=${version} --region ${AWS_REGION} --query 'imageDetails[*].imageDigest' --output text 2>/dev/null`;
    const digests = execSync(listCommand, { encoding: 'utf-8', cwd: projectRoot }).trim();
    
    if (digests) {
      // Delete by tag first
      const deleteByTag = `aws ecr batch-delete-image --repository-name ${IMAGE_NAME} --image-ids imageTag=${version} --region ${AWS_REGION} 2>&1`;
      execSync(deleteByTag, { stdio: "pipe", cwd: projectRoot });
      
      // Also delete by digest to ensure manifests are removed
      const digestList = digests.split('\t').filter(d => d);
      for (const digest of digestList) {
        try {
          execSync(`aws ecr batch-delete-image --repository-name ${IMAGE_NAME} --image-ids imageDigest=${digest} --region ${AWS_REGION} 2>&1`, { stdio: "pipe", cwd: projectRoot });
        } catch (e) {
          // Ignore individual digest deletion errors
        }
      }
      console.log(`✓ Deleted all existing images/manifests`);
      // Wait a moment for ECR to process the deletion
      console.log(`  Waiting for ECR to process deletion...`);
      execSync('sleep 2', { stdio: "pipe", cwd: projectRoot });
    } else {
      console.log(`ℹ️  No existing images to delete`);
    }
  } catch (err) {
    // No images exist - that's fine
    console.log(`ℹ️  No existing images to delete`);
  }

  // Step 3: Build Docker image
  console.log(`\n[3/4] Building Docker image ${imageTag}...`);
  // Use regular docker build (not buildx) to create a single image
  // The Dockerfile already specifies --platform=linux/amd64 in FROM, so we don't need it in build
  // buildx creates multi-platform manifests which CloudFormation doesn't need
  const buildCommand = `docker build -t ${imageTag} -f ${DOCKERFILE_PATH} ${BUILD_CONTEXT}`;
  execSync(buildCommand, { stdio: "inherit", cwd: projectRoot });
  console.log(`✓ Successfully built`);

  // Step 4: Tag and push to ECR
  console.log(`\n[4/4] Tagging and pushing to ECR...`);
  const tagCommand = `docker tag ${imageTag} ${ecrImageUri}`;
  execSync(tagCommand, { stdio: "inherit", cwd: projectRoot });
  
  // Push the image - this should create a single image since we deleted everything first
  const pushCommand = `docker push ${ecrImageUri}`;
  execSync(pushCommand, { stdio: "inherit", cwd: projectRoot });
  console.log(`✓ Successfully pushed single image`);

  console.log("\n" + "=".repeat(60));
  console.log("✓ Deployment completed successfully!");
} catch (error) {
  console.error("\n✗ Deployment failed:", error.message);
  process.exit(1);
}

