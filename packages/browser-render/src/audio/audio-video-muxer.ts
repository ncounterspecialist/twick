/**
 * Browser-based audio/video muxing using FFmpeg.wasm (main thread)
 * Loads core files from local public/ffmpeg directory
 */

export interface MuxerOptions {
  videoBlob: Blob;
  audioBuffer: ArrayBuffer;
  fps: number;
  width: number;
  height: number;
}

/**
 * Mux audio and video using FFmpeg.wasm in main thread
 * Core files loaded from /ffmpeg/ (no CDN, no CORS issues)
 */
export async function muxAudioVideo(options: MuxerOptions): Promise<Blob> {
  try {
    console.log('🎬 Starting FFmpeg.wasm muxing (main thread)...');
    
    // Import from installed packages (bundled by Vite)
    const { FFmpeg } = await import('@ffmpeg/ffmpeg');
    const { fetchFile, toBlobURL } = await import('@ffmpeg/util');
    
    const ffmpeg = new FFmpeg();
    
    ffmpeg.on('log', ({ message }) => {
      console.log('[FFmpeg]', message);
    });
    
    ffmpeg.on('progress', ({ progress }) => {
      console.log(`[FFmpeg] Progress: ${(progress * 100).toFixed(1)}%`);
    });
    
    console.log('[FFmpeg] Loading core from /ffmpeg/...');
    
    // Load from LOCAL files in public/ffmpeg (no CDN!)
    // Note: FFmpeg 0.12.x has worker embedded in core.js, no separate workerURL needed
    await ffmpeg.load({
      coreURL: await toBlobURL('/ffmpeg/ffmpeg-core.js', 'text/javascript'),
      wasmURL: await toBlobURL('/ffmpeg/ffmpeg-core.wasm', 'application/wasm'),
    });
    
    console.log('✅ FFmpeg.wasm loaded');
    
    // Write input files
    console.log('[FFmpeg] Writing input files...');
    await ffmpeg.writeFile('video.mp4', await fetchFile(options.videoBlob));
    await ffmpeg.writeFile('audio.wav', new Uint8Array(options.audioBuffer));
    
    console.log('[FFmpeg] Muxing audio and video...');
    
    // Mux video and audio
    await ffmpeg.exec([
      '-i', 'video.mp4',
      '-i', 'audio.wav',
      '-c:v', 'copy',
      '-c:a', 'aac',
      '-b:a', '192k',
      '-shortest',
      'output.mp4'
    ]);
    
    console.log('[FFmpeg] Reading output file...');
    
    // Read output
    const data = await ffmpeg.readFile('output.mp4');
    const muxedBlob = new Blob([data], { type: 'video/mp4' });
    
    console.log(`✅ Muxed video with audio: ${(muxedBlob.size / 1024 / 1024).toFixed(2)} MB`);
    
    return muxedBlob;
  } catch (error) {
    console.error('❌ FFmpeg.wasm muxing failed:', error);
    console.warn('⚠️ Returning video-only');
    return options.videoBlob;
  }
}
