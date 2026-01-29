'use client';

/**
 * Browser-based audio/video muxing using FFmpeg.wasm (main thread)
 * Compatible with Next.js 15
 *
 * FFmpeg core files must be served from the app's public folder, e.g.:
 * twick-web/public/ffmpeg/ffmpeg-core.js, ffmpeg-core.wasm
 */

export interface MuxerOptions {
  videoBlob: Blob;
  audioBuffer: ArrayBuffer;
}

/** Base URL for FFmpeg assets (twick-web public/ffmpeg). Use same-origin URLs directly; toBlobURL causes "Cannot find module 'blob:...'" in some environments. */
function getFFmpegBaseURL(): string {
  if (typeof window !== 'undefined') {
    return `${window.location.origin}/ffmpeg`;
  }
  return '/ffmpeg';
}

export async function muxAudioVideo(
  options: MuxerOptions
): Promise<Blob> {
  const muxStartTime = Date.now();
  try {
    console.log('Starting FFmpeg muxing...');
    console.log(`  Video blob size: ${options.videoBlob.size} bytes (${(options.videoBlob.size / 1024 / 1024).toFixed(2)} MB)`);
    console.log(`  Audio buffer size: ${options.audioBuffer.byteLength} bytes (${(options.audioBuffer.byteLength / 1024 / 1024).toFixed(2)} MB)`);
    
    const { FFmpeg } = await import('@ffmpeg/ffmpeg');
    const { fetchFile } = await import('@ffmpeg/util');

    const ffmpeg = new FFmpeg();

    const base = getFFmpegBaseURL();
    const coreURL = `${base}/ffmpeg-core.js`;
    const wasmURL = `${base}/ffmpeg-core.wasm`;

    console.log(`Loading FFmpeg from ${base}`);
    const loadStartTime = Date.now();
    // Load from same-origin public folder (twick-web/public/ffmpeg). Do NOT use toBlobURL —
    // it produces blob: URLs that can trigger "Cannot find module 'blob:...'".
    await ffmpeg.load({
      coreURL,
      wasmURL,
    });
    const loadDuration = Date.now() - loadStartTime;
    console.log(`FFmpeg loaded successfully in ${loadDuration}ms`);

    // Write inputs
    console.log('Writing video and audio files...');
    const writeStartTime = Date.now();
    await ffmpeg.writeFile(
      'video.mp4',
      await fetchFile(options.videoBlob)
    );
    console.log(`  Video file written: ${options.videoBlob.size} bytes`);

    await ffmpeg.writeFile(
      'audio.wav',
      new Uint8Array(options.audioBuffer)
    );
    const writeDuration = Date.now() - writeStartTime;
    console.log(`  Audio file written: ${options.audioBuffer.byteLength} bytes`);
    console.log(`Files written successfully in ${writeDuration}ms`);

    console.log('Executing FFmpeg muxing command...');
    const execStartTime = Date.now();
    
    // Capture FFmpeg logs for debugging
    const ffmpegLogs: string[] = [];
    ffmpeg.on('log', ({ message }: { message: string }) => {
      ffmpegLogs.push(message);
      console.log(`  [FFmpeg] ${message}`);
    });
    
    await ffmpeg.exec([
      // Inputs
      '-i', 'video.mp4',
      '-i', 'audio.wav',

      // Explicit stream mapping
      '-map', '0:v:0',
      '-map', '1:a:0',

      // Re-encode video to a very standard H.264 stream.
      // Copying the WebCodecs/mp4-wasm bitstream can sometimes
      // lead to timing issues where only the first second renders.
      '-c:v', 'libx264',
      '-preset', 'veryfast',
      '-crf', '20',

      // AAC audio
      '-c:a', 'aac',
      '-b:a', '192k',

      // Make MP4 more web‑friendly
      '-movflags', '+faststart',

      // Stop at the shortest of the two streams
      '-shortest',

      'output.mp4',
    ]);
    const execDuration = Date.now() - execStartTime;
    console.log(`FFmpeg muxing completed in ${execDuration}ms`);

    const readStartTime = Date.now();
    const data = await ffmpeg.readFile('output.mp4');
    const readDuration = Date.now() - readStartTime;
    console.log(`Output file read successfully in ${readDuration}ms`);

    const uint8 =
      typeof data === 'string'
        ? new TextEncoder().encode(data)
        : new Uint8Array(data);

    const result = new Blob([uint8], { type: 'video/mp4' });
    const totalDuration = Date.now() - muxStartTime;
    console.log(`Muxing successful: ${result.size} bytes (${(result.size / 1024 / 1024).toFixed(2)} MB) in ${totalDuration}ms`);
    console.log(`  Breakdown: load=${loadDuration}ms, write=${writeDuration}ms, exec=${execDuration}ms, read=${readDuration}ms`);
    return result;

  } catch (error) {
    const totalDuration = Date.now() - muxStartTime;
    const errorMsg = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : undefined;
    console.error('FFmpeg muxing failed:', errorMsg);
    if (errorStack) {
      console.error('Error stack:', errorStack);
    }
    console.error('Error details:', {
      errorType: error instanceof Error ? error.constructor.name : typeof error,
      errorMessage: errorMsg,
      duration: `${totalDuration}ms`,
      videoBlobSize: options.videoBlob.size,
      audioBufferSize: options.audioBuffer.byteLength,
    });
    // Re-throw the error so the caller can handle it
    throw error;
  }
}
