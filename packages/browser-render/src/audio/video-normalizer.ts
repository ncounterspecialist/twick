'use client';

/**
 * Browser-based video normalization using FFmpeg.wasm (main thread)
 * Compatible with Next.js 15
 *
 * This helper converts "problematic" videos (e.g. WhatsApp exports) into a
 * very standard H.264 + AAC, 30fps, yuv420p MP4 that behaves well with
 * WebCodecs and <video> playback, reducing the chance of frozen-first-frame
 * issues during browser rendering.
 *
 * FFmpeg core files must be served from the app's public folder, e.g.:
 * twick-web/public/ffmpeg/ffmpeg-core.js, ffmpeg-core.wasm
 */

/** Normalization options */
export interface NormalizeVideoOptions {
  /** Target width in pixels (default: 720). Height is derived to preserve aspect ratio. */
  width?: number;
  /** Target frames per second (default: 30). */
  fps?: number;
}

/** Result of normalization */
export interface NormalizeVideoResult {
  /** Normalized video Blob (MP4, H.264 + AAC). */
  blob: Blob;
  /** Size in bytes of the normalized video. */
  size: number;
  /** Optional debug information (durations, etc.). */
  debug?: {
    loadMs: number;
    writeMs: number;
    execMs: number;
    readMs: number;
    totalMs: number;
  };
}

/** Base URL for FFmpeg assets (twick-web public/ffmpeg). */
function getFFmpegBaseURL(): string {
  if (typeof window !== 'undefined') {
    return `${window.location.origin}/ffmpeg`;
  }
  return '/ffmpeg';
}

/**
 * Normalize a video Blob into a browser- and WebCodecs-friendly MP4.
 *
 * Typical usage:
 * - Call this after file upload (e.g. from an <input type="file">)
 * - Upload the returned Blob to your storage (S3, etc.)
 * - Use that URL in your Twick project instead of the raw source
 */
export async function normalizeVideoBlob(
  input: Blob,
  options: NormalizeVideoOptions = {}
): Promise<NormalizeVideoResult> {
  const startTime = Date.now();
  const targetWidth = options.width ?? 720;
  const targetFps = options.fps ?? 30;

  try {
    console.log('[VideoNormalizer] Starting normalization...');
    console.log(`[VideoNormalizer] Input size: ${input.size} bytes (${(input.size / 1024 / 1024).toFixed(2)} MB)`);

    const { FFmpeg } = await import('@ffmpeg/ffmpeg');
    const { fetchFile } = await import('@ffmpeg/util');

    const ffmpeg = new FFmpeg();
    const base = getFFmpegBaseURL();
    const coreURL = `${base}/ffmpeg-core.js`;
    const wasmURL = `${base}/ffmpeg-core.wasm`;

    console.log(`[VideoNormalizer] Loading FFmpeg from ${base}`);
    const loadStart = Date.now();
    await ffmpeg.load({ coreURL, wasmURL });
    const loadMs = Date.now() - loadStart;
    console.log(`[VideoNormalizer] FFmpeg loaded in ${loadMs}ms`);

    // Write input file
    console.log('[VideoNormalizer] Writing input file...');
    const writeStart = Date.now();
    await ffmpeg.writeFile('in.mp4', await fetchFile(input));
    const writeMs = Date.now() - writeStart;
    console.log(`[VideoNormalizer] Input file written in ${writeMs}ms`);

    // Normalize: scale, fps, H.264, AAC, yuv420p, faststart
    console.log('[VideoNormalizer] Executing normalization command...');
    const execStart = Date.now();

    // Capture logs for debugging
    ffmpeg.on('log', ({ message }: { message: string }) => {
      console.log(`[VideoNormalizer:FFmpeg] ${message}`);
    });

    await ffmpeg.exec([
      '-i', 'in.mp4',
      // Normalize geometry & frame rate
      '-vf', `scale=${targetWidth}:-2,fps=${targetFps},format=yuv420p`,
      // Standard H.264 video
      '-c:v', 'libx264',
      '-preset', 'veryfast',
      '-crf', '20',
      '-pix_fmt', 'yuv420p',
      '-profile:v', 'main',
      '-r', String(targetFps),
      // AAC audio, stereo, 48kHz
      '-c:a', 'aac',
      '-b:a', '128k',
      '-ar', '48000',
      '-ac', '2',
      // Web-friendly MP4
      '-movflags', '+faststart',
      'out.mp4',
    ]);

    const execMs = Date.now() - execStart;
    console.log(`[VideoNormalizer] Normalization completed in ${execMs}ms`);

    // Read back normalized file
    const readStart = Date.now();
    const data = await ffmpeg.readFile('out.mp4');
    const readMs = Date.now() - readStart;
    console.log(`[VideoNormalizer] Output file read in ${readMs}ms`);

    const uint8 =
      typeof data === 'string'
        ? new TextEncoder().encode(data)
        : new Uint8Array(data);

    const blob = new Blob([uint8], { type: 'video/mp4' });
    const totalMs = Date.now() - startTime;

    console.log(`[VideoNormalizer] Normalization successful: ${blob.size} bytes (${(blob.size / 1024 / 1024).toFixed(2)} MB) in ${totalMs}ms`);

    return {
      blob,
      size: blob.size,
      debug: {
        loadMs,
        writeMs,
        execMs,
        readMs,
        totalMs,
      },
    };
  } catch (error) {
    const totalMs = Date.now() - startTime;
    const msg = error instanceof Error ? error.message : String(error);
    const stack = error instanceof Error ? error.stack : undefined;

    console.error('[VideoNormalizer] Normalization failed:', msg);
    if (stack) {
      console.error('[VideoNormalizer] Stack:', stack);
    }
    console.error('[VideoNormalizer] Duration:', `${totalMs}ms`);

    throw error;
  }
}

