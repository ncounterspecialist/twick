/**
 * Service Worker for audio processing
 * Handles audio extraction and processing in the background
 */

const CACHE_NAME = 'twick-audio-cache-v1';
const AUDIO_CACHE = 'audio-assets';

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

/**
 * Intercept audio/video requests for processing
 */
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Check if this is a media request we should cache
  const isMedia = /\.(mp4|webm|mp3|wav|ogg|m4a)$/i.test(url.pathname);
  
  if (isMedia) {
    event.respondWith(
      caches.open(AUDIO_CACHE).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response) {
            return response;
          }
          
          return fetch(event.request).then((networkResponse) => {
            // Cache for future use
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        });
      })
    );
  }
});

/**
 * Handle messages from main thread
 */
self.addEventListener('message', async (event) => {
  const { type, data } = event.data;
  
  switch (type) {
    case 'EXTRACT_AUDIO':
      // Extract audio from video URL
      const audioData = await extractAudio(data.url);
      event.ports[0].postMessage({ type: 'AUDIO_EXTRACTED', data: audioData });
      break;
      
    case 'CLEAR_CACHE':
      await caches.delete(AUDIO_CACHE);
      event.ports[0].postMessage({ type: 'CACHE_CLEARED' });
      break;
  }
});

/**
 * Extract audio from video URL
 */
async function extractAudio(url) {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    
    // Return blob for processing in main thread
    // (Web Audio API is not available in service workers)
    return {
      url,
      blob: await blobToArrayBuffer(blob),
      size: blob.size
    };
  } catch (error) {
    throw error;
  }
}

async function blobToArrayBuffer(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsArrayBuffer(blob);
  });
}
