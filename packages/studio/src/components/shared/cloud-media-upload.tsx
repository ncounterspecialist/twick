import { useRef } from "react";
import { Upload } from "lucide-react";
import {
  useCloudMediaUpload,
  type CloudUploadProvider,
} from "../../hooks/use-cloud-media-upload";

export interface CloudMediaUploadProps {
  onSuccess: (url: string, file: File) => void;
  onError?: (error: string) => void;
  accept?: string;
  uploadApiUrl: string;
  provider: CloudUploadProvider;
  buttonText?: string;
  className?: string;
  disabled?: boolean;
  id?: string;
  icon?: React.ReactNode;
}

export const CloudMediaUpload = ({
  onSuccess,
  onError,
  accept,
  uploadApiUrl,
  provider,
  buttonText = "Upload to cloud",
  className,
  disabled = false,
  id: providedId,
  icon,
}: CloudMediaUploadProps) => {
  const id = providedId ?? `cloud-media-upload-${Math.random().toString(36).slice(2, 9)}`;
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    uploadFile,
    isUploading,
    progress,
    error,
    resetError,
  } = useCloudMediaUpload({ uploadApiUrl, provider });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const { url } = await uploadFile(file);
      onSuccess(url, file);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Upload failed";
      onError?.(message);
    }
  };

  const handleLabelClick = () => {
    if (disabled || isUploading) return;
    resetError();
  };

  return (
    <div className="file-input-container cloud-media-upload-container">
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="file-input-hidden"
        id={id}
        onChange={handleFileChange}
        disabled={disabled || isUploading}
        aria-label={buttonText}
      />
      <label
        htmlFor={id}
        className={className ?? "btn-primary file-input-label"}
        onClick={handleLabelClick}
        style={{ pointerEvents: disabled || isUploading ? "none" : undefined }}
      >
        {icon ?? <Upload className="icon-sm" />}
        {isUploading ? `${Math.round(progress)}%` : buttonText}
      </label>
      {isUploading && (
        <div className="cloud-media-upload-progress" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
          <div
            className="cloud-media-upload-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
      {error && (
        <div className="cloud-media-upload-error" role="alert">
          {error}
        </div>
      )}
    </div>
  );
};
