/**
 * Extracts a thumbnail from a video at a specific seek time and playback rate.
 *
 * This function creates a hidden `<video>` element in the browser,
 * seeks to the specified time, and captures the frame into a canvas,
 * which is then exported as a JPEG data URL or Blob URL.
 *
 * @param videoUrl - The URL of the video to extract the thumbnail from.
 * @param seekTime - The time in seconds at which to capture the frame. Default is 0.1s.
 * @param playbackRate - Playback speed for the video. Default is 1.
 * @returns A Promise that resolves to a thumbnail image URL (either a base64 data URL or blob URL).
 */
export async function getThumbnail(
    videoUrl: string,
    seekTime = 0.1,
    playbackRate = 1
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video");
      video.crossOrigin = "anonymous";
      video.muted = true;
      video.playsInline = true;
      video.autoplay = false;
      video.preload = "auto";
      video.playbackRate = playbackRate;
      
      // Make video element hidden
      video.style.position = "absolute";
      video.style.left = "-9999px";
      video.style.top = "-9999px";
      video.style.width = "1px";
      video.style.height = "1px";
      video.style.opacity = "0";
      video.style.pointerEvents = "none";
      video.style.zIndex = "-1";
  
      let timeoutId: number | undefined;
  
      // Cleanup video element and timeout
      const cleanup = () => {
        if (video.parentNode) video.remove();
        if (timeoutId) clearTimeout(timeoutId);
      };
  
      // Handle errors during video loading
      const handleError = () => {
        cleanup();
        reject(new Error(`Failed to load video: ${video.error?.message || "Unknown error"}`));
      };
  
      // Once seeked to target frame, capture the image
      const handleSeeked = () => {
        try {
          video.pause();
  
          const canvas = document.createElement("canvas");
          const width = video.videoWidth || 640;
          const height = video.videoHeight || 360;
          canvas.width = width;
          canvas.height = height;
  
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            cleanup();
            reject(new Error("Failed to get canvas context"));
            return;
          }
  
          // Draw current video frame onto canvas
          ctx.drawImage(video, 0, 0, width, height);
  
          // Attempt to export canvas to base64 image URL
          try {
            const dataUrl = canvas.toDataURL("image/jpeg", 0.8);
            cleanup();
            resolve(dataUrl);
          } catch {
            // Fallback: convert canvas to Blob
            canvas.toBlob((blob) => {
              if (!blob) {
                cleanup();
                reject(new Error("Failed to create Blob"));
                return;
              }
              const blobUrl = URL.createObjectURL(blob);
              cleanup();
              resolve(blobUrl);
            }, "image/jpeg", 0.8);
          }
        } catch (err) {
          cleanup();
          reject(new Error(`Error creating thumbnail: ${err}`));
        }
      };
  
      video.addEventListener("error", handleError, { once: true });
      video.addEventListener("seeked", handleSeeked, { once: true });
  
      // After metadata is loaded, seek to the desired frame
      video.addEventListener("loadedmetadata", () => {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              video.currentTime = seekTime;
            })
            .catch(() => {
              video.currentTime = seekTime;
            });
        } else {
          video.currentTime = seekTime;
        }
      }, { once: true });
  
      // Timeout protection in case video loading hangs
      timeoutId = window.setTimeout(() => {
        cleanup();
        reject(new Error("Video loading timed out"));
      }, 5000);
  
      // Assign video source and add it to the DOM (helps Safari/iOS behavior)
      video.src = videoUrl;
      document.body.appendChild(video);
    });
  }