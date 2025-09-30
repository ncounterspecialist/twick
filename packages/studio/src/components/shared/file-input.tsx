import { Upload } from "lucide-react";

const FileInput = ({
  acceptFileTypes,
  onFileLoad,
  buttonText,
  id,
  className,
  icon,
}: {
  acceptFileTypes: string[];
  onFileLoad: (content: any) => void;
  buttonText: string;
  id: string;
  className?: string;
  icon?: React.ReactNode;
}) => {
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          onFileLoad({
            content:
              file.type === "application/json"
                ? event.target?.result
                : undefined,
            type: file.type,
            name: file.name,
            file: file,
            blobUrl: URL.createObjectURL(file),
          });
        } catch (error) {
          console.error("Error parsing file:", error);
        }
      };
      console.log("file", file);

      if (file.type === "application/json") {
        reader.readAsText(file);
      } else {
        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <div className="file-input-container">
      <input
        type="file"
        accept={acceptFileTypes.join(",")}
        className="file-input-hidden"
        id={id}
        onChange={onFileChange}
      />
      <label
        htmlFor={id}
        className={className || "btn-primary file-input-label"}
      >
        {icon || <Upload className="icon-sm" />}
        {buttonText ?? "Upload"}
      </label>
    </div>
  );
};

export default FileInput;
