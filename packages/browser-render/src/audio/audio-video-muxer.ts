'use client';

/**
 * Browser-based audio/video muxing using FFmpeg.wasm (main thread).
 * Works in CRA, Vite, and Next.js with no extra scripts.
 * FFmpeg core loads from CDN by default; same-origin /ffmpeg is tried first if available.
 */

export interface MuxerOptions {
  videoBlob: Blob;
  audioBuffer: ArrayBuffer;
}

const FFMPEG_CORE_VERSION = '0.12.10';
const CDN_BASE = `https://cdn.jsdelivr.net/npm/@ffmpeg/core@${FFMPEG_CORE_VERSION}/dist/umd`;

/** Same-origin /ffmpeg (optional; if app copied assets). */
function getSameOriginFFmpegURLs(): { coreURL: string; wasmURL: string } | null {
  if (typeof window !== 'undefined') {
    const origin = window.location.origin;
    return {
      coreURL: `${origin}/ffmpeg/ffmpeg-core.js`,
      wasmURL: `${origin}/ffmpeg/ffmpeg-core.wasm`,
    };
  }
  return null;
}

/** CDN URLs so no copy script is required. */
function getCDNFFmpegURLs(): { coreURL: string; wasmURL: string } {
  return {
    coreURL: `${CDN_BASE}/ffmpeg-core.js`,
    wasmURL: `${CDN_BASE}/ffmpeg-core.wasm`,
  };
}

export async function muxAudioVideo(
  options: MuxerOptions
): Promise<Blob> {
  const muxStartTime = Date.now();
  try {
    console.log('Starting FFmpeg muxing...');
    console.log(`  Video blob size: ${options.videoBlob.size} bytes (${(options.videoBlob.size / 1024 / 1024).toFixed(2)} MB)`);
    console.log(`  Audio buffer size: ${options.audioBuffer.byteLength} bytes (${(options.audioBuffer.byteLength / 1024 / 1024).toFixed(2)} MB)`);
    
    const { FFmpeg } = await import('@twick/ffmpeg-web');
    const { fetchFile } = await import('@ffmpeg/util');

    const ffmpeg = new FFmpeg();

    const sameOrigin = getSameOriginFFmpegURLs();
    const cdn = getCDNFFmpegURLs();
    let loadOpts: { coreURL: string; wasmURL: string };
    const loadStartTime = Date.now();
    try {
      loadOpts = sameOrigin ?? cdn;
      const base = loadOpts.coreURL.replace(/\/ffmpeg-core\.js$/, '');
      console.log(`Loading FFmpeg from ${base}`);
      await ffmpeg.load(loadOpts);
    } catch (firstErr) {
      if (sameOrigin && (firstErr instanceof TypeError || String(firstErr).includes('fetch') || String(firstErr).includes('404'))) {
        console.log('Same-origin FFmpeg not found, loading from CDN.');
        loadOpts = cdn;
        await ffmpeg.load(loadOpts);
      } else {
        throw firstErr;
      }
    }
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
    const isBlobModuleError = /Cannot find module ['"]?blob:/.test(errorMsg);
    if (isBlobModuleError) {
      console.warn(
        '[BrowserRender] Audio muxing is not supported in this build environment (e.g. Create React App). ' +
          'Video will be exported without audio. To get audio, use Vite or configure webpack to ignore blob: dynamic imports.'
      );
    } else {
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
    }
    // Re-throw the error so the caller can handle it
    throw error;
  }
}
