/**
 * Converts a Blob URL to a File object.
 * Fetches the blob data from the URL and creates a new File object with the specified name.
 * Useful for converting blob URLs back to File objects for upload or processing.
 *
 * @param blobUrl - The Blob URL to convert
 * @param fileName - The name to assign to the resulting File object
 * @returns Promise resolving to a File object with the blob data
 * 
 * @example
 * ```js
 * const file = await blobUrlToFile("blob:http://localhost:3000/abc123", "image.jpg");
 * // file is now a File object that can be uploaded or processed
 * ```
 */
export const blobUrlToFile = async (blobUrl: string, fileName: string): Promise<File> => {
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    return new File([blob], fileName, { type: blob.type });
  };
  
  /**
   * Opens a native file picker and resolves with the selected File.
   * The accepted file types can be specified using the same format as the
   * input accept attribute (e.g. "application/json", ".png,.jpg", "image/*").
   *
   * @param accept - The accept filter string for the file input
   * @returns Promise resolving to the chosen File
   * 
   * @example
   * ```ts
   * const file = await loadFile("application/json");
   * const text = await file.text();
   * const data = JSON.parse(text);
   * ```
   */
  export const loadFile = (accept: string): Promise<File> => {
    return new Promise<File>((resolve, reject) => {
      try {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = accept;
        input.style.display = "none";
        document.body.appendChild(input);

        const cleanup = () => {
          // Clear the value so the same file can be picked again next time
          input.value = "";
          document.body.removeChild(input);
        };

        input.onchange = () => {
          const file = input.files && input.files[0];
          cleanup();
          if (!file) {
            reject(new Error("No file selected"));
            return;
          }
          resolve(file);
        };

        // Some browsers need a small timeout to ensure the element is attached
        // before programmatic click, but generally this works without it.
        input.click();
      } catch (error) {
        reject(error as Error);
      }
    });
  };
  
  /**
   * Triggers a download of a file from a string or Blob.
   * Creates a temporary download link and automatically clicks it to initiate the download.
   * The function handles both string content and Blob objects, and automatically cleans up
   * the created object URL after the download is initiated.
   *
   * @param content - The content to save, either a string or a Blob object
   * @param type - The MIME type of the content
   * @param name - The name of the file to be saved
   * 
   * @example
   * ```js
   * // Download text content
   * saveAsFile("Hello World", "text/plain", "hello.txt");
   * 
   * // Download JSON data
   * saveAsFile(JSON.stringify({data: "value"}), "application/json", "data.json");
   * 
   * // Download blob content
   * saveAsFile(imageBlob, "image/png", "screenshot.png");
   * ```
   */
  export const saveAsFile = (content: string | Blob, type: string, name: string): void => {
    const blob = typeof content === "string" ? new Blob([content], { type }) : content;
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.click();
  
    // Clean up the URL object after download
    URL.revokeObjectURL(url);
  };
  
  /**
   * Downloads a file from a given URL and triggers a browser download.
   * Fetches the file content from the provided URL and creates a download link
   * to save it locally. The function handles the entire download process including
   * fetching, blob creation, and cleanup of temporary resources.
   *
   * @param url - The URL of the file to download
   * @param filename - The name of the file to be saved locally
   * @returns Promise resolving when the download is initiated
   * 
   * @example
   * ```js
   * await downloadFile("https://example.com/image.jpg", "downloaded-image.jpg");
   * // Browser will automatically download the file with the specified name
   * ```
   */
  export const downloadFile = async (url: string, filename: string): Promise<void> => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
  
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
  
      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Error downloading file:", error);
      throw error;
    }
  };
  
  