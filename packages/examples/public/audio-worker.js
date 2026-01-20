/**
 * Service Worker for audio processing
 * Handles audio extraction and processing in the background
 */

const CACHE_NAME = 'twick-audio-cache-v1';
const AUDIO_CACHE = 'audio-assets';

self.addEventListener('install', (event) => {
  console.log('[Audio Worker] Installed');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('[Audio Worker] Activated');
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  const isMedia = /\.(mp4|webm|mp3|wav|ogg|m4a)$/i.test(url.pathname);
  
  if (isMedia) {
    event.respondWith(
      caches.open(AUDIO_CACHE).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response) {
            console.log('[Audio Worker] Serving from cache:', url.pathname);
            return response;
          }
          
          return fetch(event.request).then((networkResponse) => {
            cache.put(event.request, networkResponse.clone());
            console.log('[Audio Worker] Cached:', url.pathname);
            return networkResponse;
          });
        });
      })
    );
  }
});

self.addEventListener('message', async (event) => {
  const { type, data } = event.data;
  
  switch (type) {
    case 'CLEAR_CACHE':
      await caches.delete(AUDIO_CACHE);
      event.ports[0].postMessage({ type: 'CACHE_CLEARED' });
      break;
  }
});
