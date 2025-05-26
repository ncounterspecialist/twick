/**
 * Converts a Blob URL to a File object.
 *
 * @param blobUrl - The Blob URL to convert.
 * @param fileName - The name to assign to the resulting File.
 * @returns A Promise that resolves to a File object.
 */
export async function blobUrlToFile(blobUrl: string, fileName: string): Promise<File> {
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    return new File([blob], fileName, { type: blob.type });
  }
  
  /**
   * Triggers a download of a file from a string or Blob.
   *
   * @param content - The content to save, either a string or a Blob.
   * @param type - The MIME type of the content.
   * @param name - The name of the file to be saved.
   */
  export function saveAsFile(content: string | Blob, type: string, name: string): void {
    const blob = typeof content === "string" ? new Blob([content], { type }) : content;
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.click();
  
    // Clean up the URL object after download
    URL.revokeObjectURL(url);
  }
  
  /**
   * Downloads a file from a given URL and triggers a browser download.
   *
   * @param url - The URL of the file to download.
   * @param filename - The name of the file to be saved.
   * @returns A Promise that resolves when the download is initiated or rejects if there is an error.
   */
  export async function downloadFile(url: string, filename: string): Promise<void> {
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
  }
  