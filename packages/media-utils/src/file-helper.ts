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
  