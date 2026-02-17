import { useCallback, useState } from "react";

export type CloudUploadProvider = "s3" | "gcs";

export interface UseCloudMediaUploadConfig {
  uploadApiUrl: string;
  provider: CloudUploadProvider;
}

/** Response from S3 presign API (e.g. file-uploader Lambda). */
export interface S3PresignResponse {
  uploadUrl: string;
  key?: string;
  bucket?: string;
  contentType?: string;
  expiresIn?: number;
}

/** Response from GCS upload API (server-side upload). */
export interface GCSUploadResponse {
  url: string;
}

export interface UseCloudMediaUploadReturn {
  uploadFile: (file: File) => Promise<{ url: string }>;
  isUploading: boolean;
  progress: number;
  error: string | null;
  resetError: () => void;
}

const putFileWithProgress = (
  uploadUrl: string,
  file: File,
  onProgress: (percent: number) => void
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener("progress", (e) => {
      if (e.lengthComputable) {
        onProgress((e.loaded / e.total) * 100);
      }
    });

    xhr.addEventListener("load", () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        onProgress(100);
        resolve();
      } else {
        reject(new Error(`Upload failed: ${xhr.status} ${xhr.statusText}`));
      }
    });

    xhr.addEventListener("error", () => reject(new Error("Upload failed")));
    xhr.addEventListener("abort", () => reject(new Error("Upload aborted")));

    xhr.open("PUT", uploadUrl);
    xhr.setRequestHeader("Content-Type", file.type || "application/octet-stream");
    xhr.send(file);
  });
};

export const useCloudMediaUpload = (
  config: UseCloudMediaUploadConfig
): UseCloudMediaUploadReturn => {
  const { uploadApiUrl, provider } = config;
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const resetError = useCallback(() => {
    setError(null);
  }, []);

  const uploadFile = useCallback(
    async (file: File): Promise<{ url: string }> => {
      setIsUploading(true);
      setProgress(0);
      setError(null);

      try {
        if (provider === "s3") {
          const presignRes = await fetch(uploadApiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              filename: file.name,
              contentType: file.type || "application/octet-stream",
            }),
          });

          if (!presignRes.ok) {
            const errBody = await presignRes.json().catch(() => ({}));
            throw new Error(
              (errBody as { error?: string }).error ??
                `Failed to get upload URL: ${presignRes.statusText}`
            );
          }

          const presignData = (await presignRes.json()) as S3PresignResponse;
          const uploadUrl = presignData.uploadUrl;

          await putFileWithProgress(uploadUrl, file, setProgress);

          const publicUrl = uploadUrl.split("?")[0];
          return { url: publicUrl };
        }

        if (provider === "gcs") {
          setProgress(10);
          const formData = new FormData();
          formData.append("file", file);

          const uploadRes = await fetch(uploadApiUrl, {
            method: "POST",
            body: formData,
          });

          if (!uploadRes.ok) {
            const errBody = await uploadRes.json().catch(() => ({}));
            throw new Error(
              (errBody as { error?: string }).error ??
                `Upload failed: ${uploadRes.statusText}`
            );
          }

          setProgress(100);
          const data = (await uploadRes.json()) as GCSUploadResponse;
          if (!data.url) {
            throw new Error("Upload response missing url");
          }
          return { url: data.url };
        }

        throw new Error(`Unknown provider: ${provider}`);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Upload failed";
        setError(message);
        throw err;
      } finally {
        setIsUploading(false);
        setProgress(0);
      }
    },
    [uploadApiUrl, provider]
  );

  return {
    uploadFile,
    isUploading,
    progress,
    error,
    resetError,
  };
};
