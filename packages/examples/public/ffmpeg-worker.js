/**
 * FFmpeg.wasm Module Worker - Loads from local files (no CDN, no CORS issues)
 */

let ffmpeg = null;
let FFmpegModule = null;
let UtilModule = null;

self.addEventListener('message', async (e) => {
  const { type, data } = e.data;

  try {
    if (type === 'load') {
      self.postMessage({ type: 'log', message: 'Loading FFmpeg.wasm...' });

      // Load FFmpeg and Util modules
      try {
        const [FFmpegImport, UtilImport] = await Promise.all([
          import('https://cdn.jsdelivr.net/npm/@ffmpeg/ffmpeg@0.12.10/dist/esm/index.js'),
          import('https://cdn.jsdelivr.net/npm/@ffmpeg/util@0.12.1/dist/esm/index.js')
        ]);

        FFmpegModule = FFmpegImport;
        UtilModule = UtilImport;

        const { FFmpeg } = FFmpegModule;
        const { toBlobURL } = UtilModule;

        ffmpeg = new FFmpeg();
        
        ffmpeg.on('log', ({ message }) => {
          self.postMessage({ type: 'log', message });
        });

        ffmpeg.on('progress', ({ progress, time }) => {
          self.postMessage({ type: 'progress', progress, time });
        });

        self.postMessage({ type: 'log', message: 'Loading FFmpeg core from local files...' });

        // Load from local public/ffmpeg directory (no CDN, no CORS issues!)
        await ffmpeg.load({
          coreURL: await toBlobURL('/ffmpeg/ffmpeg-core.js', 'text/javascript'),
          wasmURL: await toBlobURL('/ffmpeg/ffmpeg-core.wasm', 'application/wasm'),
        });

        self.postMessage({ type: 'loaded' });

      } catch (loadError) {
        throw new Error(`Failed to load FFmpeg modules: ${loadError.message}`);
      }

    } else if (type === 'mux') {
      if (!ffmpeg || !UtilModule) {
        throw new Error('FFmpeg not loaded');
      }

      const { fetchFile } = UtilModule;
      
      self.postMessage({ type: 'log', message: 'Writing input files...' });
      
      // Write input files
      await ffmpeg.writeFile('video.mp4', await fetchFile(data.videoBlob));
      await ffmpeg.writeFile('audio.wav', new Uint8Array(data.audioBuffer));

      self.postMessage({ type: 'log', message: 'Muxing audio and video...' });

      // Mux video and audio
      await ffmpeg.exec([
        '-i', 'video.mp4',
        '-i', 'audio.wav',
        '-c:v', 'copy',
        '-c:a', 'aac',
        '-shortest',
        'output.mp4'
      ]);

      self.postMessage({ type: 'log', message: 'Reading output file...' });

      // Read output
      const outputData = await ffmpeg.readFile('output.mp4');
      
      self.postMessage({ 
        type: 'complete', 
        data: outputData.buffer 
      }, [outputData.buffer]);

    } else if (type === 'terminate') {
      if (ffmpeg) {
        ffmpeg.terminate();
      }
      self.close();
    }
  } catch (error) {
    self.postMessage({ 
      type: 'error', 
      error: error.message || String(error)
    });
  }
});
