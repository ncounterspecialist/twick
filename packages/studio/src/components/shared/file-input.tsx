import { Upload } from "lucide-react";

const FileInput = ({
  acceptFileTypes,
  onFileLoad,
  buttonText,
  id,
}: {
  acceptFileTypes: string[];
  onFileLoad: (content: any) => void;
  buttonText: string;
  id: string;
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
    <div className="relative w-full">
      <input
        type="file"
        accept={acceptFileTypes.join(",")}
        className="absolute w-0.1 h-0.1 opacity-0 overflow-hidden -z-10"
        id={id}
        onChange={onFileChange}
      />
      <label
        htmlFor={id}
        className="w-full btn btn-primary flex items-center justify-center gap-2 py-2"
      >
        <Upload className="w-4 h-4" />
        {buttonText ?? "Upload"}
      </label>
    </div>
  );
};

export default FileInput;
