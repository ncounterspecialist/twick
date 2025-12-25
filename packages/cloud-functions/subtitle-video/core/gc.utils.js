import { Storage } from "@google-cloud/storage";
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";
import fs from "fs";

/**
 * Google Cloud Project ID. Can be set via GOOGLE_CLOUD_PROJECT environment variable.
 * @type {string}
 */
export const CLOUD_PROJECT_ID =
  process.env.GOOGLE_CLOUD_PROJECT ?? "baatcheet-prod";

/**
 * Google Cloud region for Speech-to-Text API. Currently set to "global".
 * @type {string}
 */
export const CLOUD_REGION = "global";

/**
 * Google Cloud Storage bucket name for storing audio files and project exports.
 * Can be set via GOOGLE_CLOUD_STORAGE_BUCKET environment variable.
 * @type {string}
 */
export const CLOUD_STORAGE_BUCKET =
  process.env.GOOGLE_CLOUD_STORAGE_BUCKET ?? "twick-video";

let googleCredentials = null;

/**
 * Retrieves Google Cloud service account credentials from AWS Secrets Manager.
 * 
 * If GCP_SERVICE_ACCOUNT_SECRET_NAME is set, fetches the JSON credentials from AWS Secrets Manager.
 * If not set, returns undefined (useful when credentials are provided via GOOGLE_APPLICATION_CREDENTIALS).
 * 
 * @returns {Promise<Object|undefined>} Parsed JSON credentials object or undefined
 * @throws {Error} If fetching from Secrets Manager fails
 */
export const getGoogleCredentials = async () => {
  if (googleCredentials) {
    return googleCredentials;
  }
  try {
    const secretName = process.env.GCP_SERVICE_ACCOUNT_SECRET_NAME;
    if (!secretName) {
      console.log(
        "No secret name configured, skipping Google credentials initialization"
      );
      return;
    }

    const client = new SecretsManagerClient({
      region: process.env.AWS_REGION || "ap-south-1",
    });

    const response = await client.send(
      new GetSecretValueCommand({
        SecretId: secretName,
        VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
      })
    );
    googleCredentials = response.SecretString;
    return JSON.parse(googleCredentials);
  } catch (error) {
    console.error(
      `Failed to initialize Google credentials from secret ::`,
      error
    );
    throw error;
  }
};

let storage = null;

/**
 * Gets or initializes the Google Cloud Storage client instance.
 * 
 * @returns {Promise<Storage>} Initialized Storage client
 */
const getStorage = async () => {
  if (!storage) {
    storage = new Storage({
      projectId: CLOUD_PROJECT_ID,
      credentials: await getGoogleCredentials(),
    });
  }
  return storage;
};

/**
 * Uploads a file to Google Cloud Storage.
 * 
 * @param {Object} params - Upload parameters
 * @param {Buffer|string} params.data - File data to upload (Buffer or string)
 * @param {string} [params.folder] - Optional folder path in the bucket
 * @param {string} params.fileName - Name of the file to create
 * @param {string} params.contentType - MIME type of the file
 * @param {boolean} [params.isPublic=false] - If true, returns a signed URL valid for 1 hour
 * @returns {Promise<string>} Public URL or signed URL (if isPublic=true) to the uploaded file
 */
export const uploadFile = async ({
  data,
  folder,
  fileName,
  contentType,
  isPublic = false,
}) => {
  const bucket = (await getStorage()).bucket(CLOUD_STORAGE_BUCKET);
  const bucketName = CLOUD_STORAGE_BUCKET;

  // 2. Define the path including the folder 'content'
  const destinationPath = `${folder ? `${folder}/` : ""}${fileName}`;
  const file = bucket.file(destinationPath);

  // 3. Save the file.
  await file.save(data, {
    contentType: contentType,
    resumable: false,
  });

  if (isPublic) {
    // Generate a signed URL valid for 1 hour instead of making the file public
    const expires = new Date();
    expires.setHours(expires.getHours() + 1); // 1 hour from now

    const [signedUrl] = await file.getSignedUrl({
      version: "v4",
      action: "read",
      expires: expires,
    });
    return signedUrl;
  }

  return `https://storage.googleapis.com/${bucketName}/${destinationPath}`;
};

/**
 * Converts a Google Cloud Storage URL to a gs:// URI format.
 * 
 * @param {string} URI - GCS URL (https://storage.googleapis.com/...) or gs:// URI
 * @returns {string} gs:// URI format
 * @throws {Error} If the URI format is invalid
 */
export const getGCSUri = (URI) => {
  if (URI.startsWith("https://storage.googleapis.com/")) {
    const path = URI.replace("https://storage.googleapis.com/", "");
    return `gs://${path}`;
  } else if (!URI.startsWith("gs://")) {
    throw new Error(
      `Invalid audio URI format. Expected gs://bucket/path or https://storage.googleapis.com/bucket/path, got: ${URI}`
    );
  }
  return URI;
};
