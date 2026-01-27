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
  try {
    const { FFmpeg } = await import('@ffmpeg/ffmpeg');
    const { fetchFile } = await import('@ffmpeg/util');

    const ffmpeg = new FFmpeg();

    const base = getFFmpegBaseURL();
    const coreURL = `${base}/ffmpeg-core.js`;
    const wasmURL = `${base}/ffmpeg-core.wasm`;

    // Load from same-origin public folder (twick-web/public/ffmpeg). Do NOT use toBlobURL —
    // it produces blob: URLs that can trigger "Cannot find module 'blob:...'".
    await ffmpeg.load({
      coreURL,
      wasmURL,
    });

    // Write inputs
    await ffmpeg.writeFile(
      'video.mp4',
      await fetchFile(options.videoBlob)
    );

    await ffmpeg.writeFile(
      'audio.wav',
      new Uint8Array(options.audioBuffer)
    );

    await ffmpeg.exec([
      '-i', 'video.mp4',
      '-i', 'audio.wav',
      '-c:v', 'copy',
      '-c:a', 'aac',
      '-b:a', '192k',
      '-shortest',
      'output.mp4',
    ]);

    const data = await ffmpeg.readFile('output.mp4');

    const uint8 =
      typeof data === 'string'
        ? new TextEncoder().encode(data)
        : new Uint8Array(data);

    return new Blob([uint8], { type: 'video/mp4' });

  } catch {
    return options.videoBlob;
  }
}
