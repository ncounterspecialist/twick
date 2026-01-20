import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

const ffmpeg = new FFmpeg();

let isLoaded = false;

// Message types
interface LoadMessage {
  type: 'load';
}

interface MergeMessage {
  type: 'merge';
  video: Blob;
  audio: Blob;
}

interface ProgressMessage {
  type: 'progress';
  progress: number;
  message: string;
}

interface CompleteMessage {
  type: 'complete';
  output: ArrayBuffer;
}

interface ErrorMessage {
  type: 'error';
  error: string;
}

type WorkerMessage = LoadMessage | MergeMessage;
type WorkerResponse = ProgressMessage | CompleteMessage | ErrorMessage;

self.onmessage = async (e: MessageEvent<WorkerMessage>) => {
  try {
    console.log('[FFmpeg Worker] Received message:', e.data.type);
    
    if (e.data.type === 'load') {
      await loadFFmpeg();
      return;
    }

    if (e.data.type === 'merge') {
      const { video, audio } = e.data;
      console.log('[FFmpeg Worker] Starting merge:', {
        videoSize: video.size,
        audioSize: audio.size
      });
      await mergeVideoAudio(video, audio);
      return;
    }
  } catch (error) {
    console.error('[FFmpeg Worker] Error in message handler:', error);
    const errorMsg: ErrorMessage = {
      type: 'error',
      error: error instanceof Error 
        ? `${error.message}\n${error.stack || ''}` 
        : String(error)
    };
    self.postMessage(errorMsg);
  }
};

async function loadFFmpeg() {
  if (isLoaded) {
    const msg: ProgressMessage = {
      type: 'progress',
      progress: 100,
      message: 'FFmpeg already loaded'
    };
    self.postMessage(msg);
    return;
  }

  try {
    const msg1: ProgressMessage = {
      type: 'progress',
      progress: 10,
      message: 'Loading FFmpeg core...'
    };
    self.postMessage(msg1);

    // Use esm version for better compatibility with ES modules
    const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm';
    
    const msg2: ProgressMessage = {
      type: 'progress',
      progress: 30,
      message: 'Fetching FFmpeg files...'
    };
    self.postMessage(msg2);

    // Convert to blob URLs to avoid potential CORS issues
    const coreURL = await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript');
    const wasmURL = await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm');

    const msg3: ProgressMessage = {
      type: 'progress',
      progress: 60,
      message: 'Initializing FFmpeg...'
    };
    self.postMessage(msg3);

    await ffmpeg.load({
      coreURL,
      wasmURL,
    });

    // Set up progress logging
    ffmpeg.on('log', ({ message }) => {
      console.log('[FFmpeg]:', message);
    });

    isLoaded = true;

    const msg4: ProgressMessage = {
      type: 'progress',
      progress: 100,
      message: 'FFmpeg loaded successfully'
    };
    self.postMessage(msg4);
  } catch (error) {
    const errorDetails = error instanceof Error ? error.message : String(error);
    const stack = error instanceof Error ? error.stack : '';
    console.error('[FFmpeg] Load error:', {
      message: errorDetails,
      stack,
      error
    });
    throw new Error(`Failed to load FFmpeg: ${errorDetails}`);
  }
}

async function mergeVideoAudio(videoBlob: Blob, audioBlob: Blob) {
  if (!isLoaded) {
    await loadFFmpeg();
  }

  try {
    const msg1: ProgressMessage = {
      type: 'progress',
      progress: 10,
      message: 'Preparing files...'
    };
    self.postMessage(msg1);

    // Write video and audio files to FFmpeg virtual filesystem
    await ffmpeg.writeFile('video.mp4', await fetchFile(videoBlob));
    
    const msg2: ProgressMessage = {
      type: 'progress',
      progress: 25,
      message: 'Video file loaded'
    };
    self.postMessage(msg2);

    await ffmpeg.writeFile('audio.wav', await fetchFile(audioBlob));

    const msg3: ProgressMessage = {
      type: 'progress',
      progress: 40,
      message: 'Audio file loaded'
    };
    self.postMessage(msg3);

    const msg4: ProgressMessage = {
      type: 'progress',
      progress: 50,
      message: 'Merging video and audio...'
    };
    self.postMessage(msg4);

    // Set up progress tracking for FFmpeg execution
    ffmpeg.on('progress', ({ progress, time }) => {
      const msg: ProgressMessage = {
        type: 'progress',
        progress: 50 + (progress * 45), // 50% to 95%
        message: `Processing... ${(progress * 100).toFixed(0)}%`
      };
      self.postMessage(msg);
    });

    // Execute FFmpeg command to merge video and audio
    await ffmpeg.exec([
      '-i', 'video.mp4',
      '-i', 'audio.wav',
      '-c:v', 'copy',        // Copy video codec (no re-encoding)
      '-c:a', 'aac',         // Encode audio to AAC
      '-shortest',           // Match shortest stream duration
      'output.mp4'
    ]);

    const msg5: ProgressMessage = {
      type: 'progress',
      progress: 95,
      message: 'Reading output...'
    };
    self.postMessage(msg5);

    // Read the output file
    const output = await ffmpeg.readFile('output.mp4');

    // Clean up
    await ffmpeg.deleteFile('video.mp4');
    await ffmpeg.deleteFile('audio.wav');
    await ffmpeg.deleteFile('output.mp4');

    const completeMsg: CompleteMessage = {
      type: 'complete',
      output: (output as Uint8Array).buffer
    };

    // Transfer the buffer to avoid copying
    self.postMessage(completeMsg, [completeMsg.output]);
  } catch (error) {
    throw new Error(`Failed to merge video and audio: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
