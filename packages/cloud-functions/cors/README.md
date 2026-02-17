# Storage bucket CORS configuration

Apply these CORS configs to your S3 or GCS bucket so that browser-based uploads and media playback work when using Twick's cloud media upload (file-uploader for S3, or GCS upload API).

## S3 (AWS)

**File:** `s3-cors.json`

Apply to the bucket used for `FILE_UPLOADER_S3_BUCKET` (see [file-uploader README](../file-uploader/README.md)).

1. Open **AWS S3 Console** → select your bucket → **Permissions** tab → **Cross-origin resource sharing (CORS)**.
2. Click **Edit** and paste the contents of `s3-cors.json`.
3. Replace `https://yourdomain.com` and `https://www.yourdomain.com` with your app's production origins.
4. Save. Changes may take a few seconds to propagate.

**Required env (backend):** `FILE_UPLOADER_S3_BUCKET`, and optionally `FILE_UPLOADER_S3_PREFIX`, `FILE_UPLOADER_S3_REGION`, `FILE_UPLOADER_DEFAULT_EXPIRES_IN`. See [file-uploader](../file-uploader/README.md) for credentials (Lambda IAM or `ACCESS_KEY_ID` / `SECRET_ACCESS_KEY`).

## GCS (Google Cloud Storage)

**File:** `gcs-cors.json`

Apply to the bucket used for `GOOGLE_CLOUD_STORAGE_BUCKET` (see [transcript/core/gc.utils.js](../transcript/core/gc.utils.js)).

1. Install [gsutil](https://cloud.google.com/storage/docs/gsutil_install) and authenticate.
2. Replace `https://yourdomain.com` and `https://www.yourdomain.com` in `gcs-cors.json` with your app's production origins.
3. Run:
   ```bash
   gsutil cors set gcs-cors.json gs://YOUR_BUCKET_NAME
   ```

**Required env (backend):** `GOOGLE_CLOUD_PROJECT`, `GOOGLE_CLOUD_STORAGE_BUCKET`, and either `GCP_SERVICE_ACCOUNT_SECRET_NAME` (AWS Secrets Manager) or `GOOGLE_APPLICATION_CREDENTIALS`. See [transcript](../transcript/) and gc.utils for credential setup.
