const FileInput = ({acceptFileTypes, onFileLoad, buttonText}: {acceptFileTypes: string[], onFileLoad: (content: any) => void, buttonText: string}) => {
    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            try {
                onFileLoad(event.target?.result);
            } catch (error) {
              console.error('Error parsing JSON file:', error);
            }
          };
          reader.readAsText(file);
        }
    }
    
    return (
        <div className="relative">
              <input
                type="file"
                accept={acceptFileTypes.join(",")}
                className="absolute w-0.1 h-0.1 opacity-0 overflow-hidden -z-10"
                id="project-file"
                onChange={onFileChange}
              />
              <label 
                htmlFor="project-file" 
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer transition-colors duration-200"
              >
                {buttonText}
              </label>
            </div>
    )
}

export default FileInput;