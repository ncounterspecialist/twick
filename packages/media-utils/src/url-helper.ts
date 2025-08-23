/**
 * Detects the media type (image, video, or audio) of a given URL by sending a HEAD request.
 * Uses a lightweight HEAD request to fetch only the headers, avoiding download of the full file.
 * The function analyzes the Content-Type header to determine the media type category.
 *
 * @param url - The URL of the media file to analyze
 * @returns Promise resolving to the detected media type or null
 * 
 * @example
 * ```js
 * // Detect image type
 * const type = await detectMediaTypeFromUrl("https://example.com/image.jpg");
 * // type = "image"
 * 
 * // Detect video type
 * const type = await detectMediaTypeFromUrl("https://example.com/video.mp4");
 * // type = "video"
 * 
 * // Detect audio type
 * const type = await detectMediaTypeFromUrl("https://example.com/audio.mp3");
 * // type = "audio"
 * 
 * // Invalid or inaccessible URL
 * const type = await detectMediaTypeFromUrl("https://example.com/invalid");
 * // type = null
 * ```
 */
export const detectMediaTypeFromUrl = async (url: string): Promise<'image' | 'video' | 'audio' | null> => {
    try {
      // Use a HEAD request to fetch only the headers, avoiding download of the full file
      const response = await fetch(url, { method: 'HEAD' });
  
      // Extract the 'Content-Type' header from the response
      const contentType = response.headers.get('Content-Type');
  
      if (!contentType) return null;
  
      // Determine the media type from the content type
      if (contentType.startsWith('image/')) return 'image';
      if (contentType.startsWith('video/')) return 'video';
      if (contentType.startsWith('audio/')) return 'audio';
  
      // Return null if not a recognized media type
      return null;
    } catch (error) {
      console.error('Fetch failed:', error);
      return null;
    }
  };
  