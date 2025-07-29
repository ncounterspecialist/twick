/**
 * Detects the media type (image, video, or audio) of a given URL by sending a HEAD request.
 *
 * @param url - The URL of the media file.
 * @returns A promise that resolves to 'image', 'video', or 'audio' based on the Content-Type header,
 *          or `null` if the type couldn't be determined or the request fails.
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
  