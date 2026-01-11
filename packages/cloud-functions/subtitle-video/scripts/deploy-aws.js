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
const IMAGE_NAME = "twick-subtitle-video";
const DOCKERFILE_PATH = "platform/aws/Dockerfile";
const BUILD_CONTEXT = ".";

// Get version from command line argument
const version = process.argv[2];

if (!version) {
  console.error("Error: Version is required");
  console.error("Usage: npm run deploy:aws <version>");
  console.error("Example: npm run deploy:aws 0.14.16");
  console.error("\nRequired environment variables:");
  console.error("  AWS_REGION - AWS region (e.g., ap-south-1)");
  console.error("  AWS_ACCOUNT_ID - AWS account ID (12-digit number)");
  process.exit(1);
}

// Validate version format (basic check)
if (!/^\d+\.\d+\.\d+/.test(version)) {
  console.error(`Error: Invalid version format: ${version}`);
  console.error("Expected format: X.Y.Z (e.g., 0.14.16)");
  process.exit(1);
}

// Validate required environment variables
if (!AWS_REGION) {
  console.error("Error: AWS_REGION environment variable is required");
  console.error("Example: export AWS_REGION=ap-south-1");
  process.exit(1);
}

if (!AWS_ACCOUNT_ID) {
  console.error("Error: AWS_ACCOUNT_ID environment variable is required");
  console.error("Example: export AWS_ACCOUNT_ID=123456789012");
  process.exit(1);
}

const ECR_REGISTRY = `${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com`;
const imageTag = `${IMAGE_NAME}:${version}`;
const ecrImageUri = `${ECR_REGISTRY}/${imageTag}`;

console.log(`Deploying ${imageTag} to ECR (${AWS_REGION})`);
console.log("=".repeat(60));

try {
  // Step 1: Check if ECR repository exists, create if not
  console.log("\n[1/5] Checking ECR repository...");
  try {
    execSync(
      `aws ecr describe-repositories --repository-names ${IMAGE_NAME} --region ${AWS_REGION} 2>&1`,
      { stdio: "pipe", cwd: projectRoot, encoding: "utf-8" }
    );
    console.log(`✓ Repository ${IMAGE_NAME} already exists`);
  } catch (err) {
    // Check if repository doesn't exist (this is expected and fine)
    // AWS CLI sends errors to stderr, but with 2>&1 we capture it in the error
    const errorOutput = err.stdout?.toString() || err.stderr?.toString() || err.message || '';
    const errorMessage = errorOutput.toLowerCase();
    
    if (errorMessage.includes("repositorynotfoundexception") || 
        errorMessage.includes("does not exist") ||
        errorMessage.includes("repository with name")) {
      console.log(`ℹ️  Repository ${IMAGE_NAME} not found, creating...`);
      try {
        execSync(
          `aws ecr create-repository --repository-name ${IMAGE_NAME} --region ${AWS_REGION} --image-scanning-configuration scanOnPush=true --image-tag-mutability MUTABLE`,
          { stdio: "inherit", cwd: projectRoot }
        );
        console.log(`✓ Successfully created repository ${IMAGE_NAME}`);
      } catch (createError) {
        console.error(`✗ Failed to create repository: ${createError.message}`);
        throw createError;
      }
    } else {
      console.error(`✗ Error checking repository: ${errorOutput || err.message}`);
      throw err;
    }
  }

  // Step 2: Login to ECR
  console.log("\n[2/5] Logging into AWS ECR...");
  const loginCommand = `aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${ECR_REGISTRY}`;
  execSync(loginCommand, { stdio: "inherit", cwd: projectRoot });
  console.log("✓ Successfully logged into ECR");

  // Step 3: Delete ALL existing images/manifests with this tag from ECR
  console.log(`\n[3/5] Deleting all existing images/manifests with tag ${version}...`);
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

  // Step 4: Build Docker image
  console.log(`\n[4/5] Building Docker image ${imageTag}...`);
  // Use regular docker build (not buildx) to create a single image
  // The Dockerfile already specifies --platform=linux/amd64 in FROM, so we don't need it in build
  // buildx creates multi-platform manifests which CloudFormation doesn't need
  const buildCommand = `docker build -t ${imageTag} -f ${DOCKERFILE_PATH} ${BUILD_CONTEXT}`;
  execSync(buildCommand, { stdio: "inherit", cwd: projectRoot });
  console.log(`✓ Successfully built`);

  // Step 5: Tag and push to ECR
  console.log(`\n[5/5] Tagging and pushing to ECR...`);
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

