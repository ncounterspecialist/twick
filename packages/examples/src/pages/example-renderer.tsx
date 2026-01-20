import { useEffect, useState } from 'react';
import { useBrowserRenderer } from '@twick/browser-render';
import './example-renderer.css';

/**
 * Complete example of a React component that uses the browser renderer
 * to render Twick videos client-side with audio support.
 * 
 * Features demonstrated:
 * - Browser-native video rendering using WebCodecs
 * - Audio processing with Web Audio API (when enabled)
 * - Service Worker for media caching
 * - Progress tracking
 * - Video preview and download
 */
export function ExampleVideoRenderer() {
  const [includeAudio, setIncludeAudio] = useState(false);
  const [audioSupported, setAudioSupported] = useState(false);
  const [workerRegistered, setWorkerRegistered] = useState(false);
  
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  
  // FFmpeg worker state
  const [ffmpegWorker, setFfmpegWorker] = useState<Worker | null>(null);
  const [ffmpegReady, setFfmpegReady] = useState(false);
  const [isMerging, setIsMerging] = useState(false);
  const [mergeProgress, setMergeProgress] = useState(0);
  const [mergeStatus, setMergeStatus] = useState('');
  const [mergeError, setMergeError] = useState<string | null>(null);

  const {
    render,
    progress,
    isRendering,
    videoBlob,
    download,
    error,
    reset,
  } = useBrowserRenderer({
    width: 720,
    height: 1280,
    fps: 30,
    quality: 'high',
    includeAudio: includeAudio, // Pass audio option to renderer
    onAudioReady: (blob) => {
      setAudioBlob(blob);
      console.log('✅ Audio ready for download');
    },
    autoDownload: false,
  });

  // Register service worker for audio processing
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/audio-worker.js')
        .then(registration => {
          console.log('✅ Audio Service Worker registered', registration);
          setWorkerRegistered(true);
        })
        .catch(err => {
          console.error('❌ Service Worker registration failed:', err);
        });
    }

    // Check if Web Audio API is available
    const hasAudioContext = 'AudioContext' in window || 'webkitAudioContext' in window;
    setAudioSupported(hasAudioContext);

    // Initialize FFmpeg worker
    const worker = new Worker(
      new URL('../workers/ffmpeg.worker.ts', import.meta.url),
      { type: 'module' }
    );

    worker.onmessage = (e) => {
      const { type, progress, message, output, error } = e.data;

      if (type === 'progress') {
        setMergeProgress(progress);
        setMergeStatus(message);
        
        // Check if FFmpeg finished loading
        if (progress >= 100 && message.includes('loaded')) {
          setFfmpegReady(true);
          console.log('✅ FFmpeg ready for use');
        }
      } else if (type === 'complete') {
        setIsMerging(false);
        setMergeProgress(100);
        setMergeStatus('Complete!');
        
        const blob = new Blob([output], { type: 'video/mp4' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `twick-video-${Date.now()}.mp4`;
        a.click();
        URL.revokeObjectURL(url);
      } else if (type === 'error') {
        setMergeError(error);
        setIsMerging(false);
        console.error('FFmpeg error:', error);
      }
    };

    worker.onerror = (event) => {
      const errorMsg = `Worker error at ${event.filename}:${event.lineno}:${event.colno} - ${event.message || 'Unknown error'}`;
      console.error('❌ Worker error event:', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error
      });
      setMergeError(errorMsg);
      setIsMerging(false);
      setMergeStatus('❌ Worker failed');
    };

    setFfmpegWorker(worker);

    // Load FFmpeg on initialization
    worker.postMessage({ type: 'load' });

    return () => {
      worker.terminate();
    };
  }, []);

  // Sample project data - A simple video with a blue rectangle
  const projectData = {
    input: {
      properties: {
        width: 1920,
        height: 1080,
        fps: 30,
      },
      tracks: [
        {
          id: "t-background",
          type: "element",
          name: "background",
          elements: [
            {
              id: "e-bg-1",
              trackId: "t-background",
              type: "video",
              s: 0,
              e: 10,
              props: {
                src: "https://firebasestorage.googleapis.com/v0/b/baatcheet-prod.firebasestorage.app/o/ME-VS-ME.mp4?alt=media&token=c53dac81-888a-41fb-a501-246c9e531c29"
              },
              frame: {
                size: [1920, 1080],
              }
            },
          ],
        },
        {
          id: "t-text",
          type: "element",
          name: "text",
          elements: [
            {
              id: "e-text-1",
              trackId: "t-text",
              type: "text",
              s: 1,
              e: 4,
              t: "Welcome to Twick!",
              props: {
                fill: "#ffffff",
                fontSize: 72,
                fontFamily: "Arial",
                fontWeight: "bold",
                x: 0,
                y: -200,
              },
              animation: {
                name: "fade",
                animate: "enter",
                duration: 1,
              },
              textEffect: {
                name: "typewriter",
                duration: 2,
              },
            },
            {
              id: "e-text-2",
              trackId: "t-text",
              type: "text",
              s: 4,
              e: 7,
              t: "Create Amazing Videos",
              props: {
                fill: "#4ecdc4",
                fontSize: 64,
                fontFamily: "Arial",
                fontWeight: "bold",
                x: 0,
                y: 0,
              },
              animation: {
                name: "rise",
                animate: "enter",
                duration: 1,
              },
            },
            {
              id: "e-text-3",
              trackId: "t-text",
              type: "text",
              s: 7,
              e: 10,
              t: "Programmatically!",
              props: {
                fill: "#ffd700",
                fontSize: 80,
                fontFamily: "Arial",
                fontWeight: "bold",
                x: 0,
                y: 200,
              },
              animation: {
                name: "fade",
                animate: "enter",
                duration: 1,
              },
            },
          ],
        },
        {
          id: "t-shapes",
          type: "element",
          name: "shapes",
          elements: [
            {
              id: "e-circle-1",
              trackId: "t-shapes",
              type: "circle",
              s: 2,
              e: 8,
              props: {
                width: 200,
                height: 200,
                fill: "#ff6b6b",
                x: -400,
                y: 0,
              },
              animation: {
                name: "fade",
                animate: "enter",
                duration: 1,
              },
            },
            {
              id: "e-rect-1",
              trackId: "t-shapes",
              type: "rect",
              s: 5,
              e: 10,
              props: {
                width: 300,
                height: 150,
                fill: "#4ecdc4",
                x: 400,
                y: 0,
              },
              animation: {
                name: "rise",
                animate: "enter",
                duration: 1,
              },
            },
          ],
        },
      ],
      version: 1,
    },
  };

  const handleRender = async () => {
    try {
      // New API: Pass variables object with input configuration
      // This matches the server renderer API for consistency
      // The projectFile, width, height, fps are already set in useBrowserRenderer options above
      await render({
        input: projectData.input,
        // Optional: Add playerId for player integration
        // playerId: 'my-player-id',
      });
    } catch (err) {
      console.error('Failed to render video:', err);
    }
  };

  const handleDownload = () => {
    download(`twick-video-${Date.now()}.mp4`);
  };

  const handleDownloadWithAudio = async () => {
    if (!videoBlob || !audioBlob) {
      setMergeError('Missing video or audio');
      return;
    }

    if (!ffmpegWorker) {
      setMergeError('FFmpeg worker not initialized');
      return;
    }

    if (!ffmpegReady) {
      setMergeError('FFmpeg is still loading. Please wait...');
      return;
    }

    setIsMerging(true);
    setMergeError(null);
    setMergeProgress(0);
    setMergeStatus('Starting merge...');

    console.log('📤 Sending merge request to worker', {
      videoSize: videoBlob.size,
      audioSize: audioBlob.size
    });

    try {
      ffmpegWorker.postMessage({
        type: 'merge',
        video: videoBlob,
        audio: audioBlob
      });
    } catch (error) {
      console.error('Failed to post message to worker:', error);
      setMergeError(`Failed to send data to worker: ${error instanceof Error ? error.message : String(error)}`);
      setIsMerging(false);
    }
  };

  return (
    <div className="renderer-container">
      <h1 className="renderer-title">🎬 Browser Video Renderer</h1>
      
      {/* Status Info */}
      <div className="status-box">
        <div className="status-row">
          <div className="status-item">
            <strong>WebCodecs:</strong>
            <span className={window.VideoFrame ? 'status-success' : 'status-error'}>
              {window.VideoFrame ? '✅ Supported' : '❌ Not Supported'}
            </span>
          </div>
          <div className="status-item">
            <strong>Audio:</strong>
            <span className={audioSupported ? 'status-success' : 'status-error'}>
              {audioSupported ? '✅ Available' : '❌ Not Available'}
            </span>
          </div>
          <div className="status-item">
            <strong>FFmpeg:</strong>
            <span className={ffmpegReady ? 'status-success' : 'status-warning'}>
              {ffmpegReady ? '✅ Ready' : '⏳ Loading...'}
            </span>
          </div>
        </div>
      </div>

      {/* Browser Support Check */}
      {!window.VideoFrame && (
        <div className="warning-box">
          ⚠️ Your browser doesn't support WebCodecs. Please use Chrome 94+, Edge 94+, or Opera 80+
        </div>
      )}

      {/* Audio Options */}
      <div className="options-box">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={includeAudio}
            onChange={(e) => setIncludeAudio(e.target.checked)}
            disabled={!audioSupported || !workerRegistered || isRendering}
          />
          <span>
            Include audio in rendered video
            {(!audioSupported || !workerRegistered) && (
              <span style={{ fontSize: '12px', color: '#94a3b8', marginLeft: '8px' }}>
                (requires Web Audio API + Service Worker)
              </span>
            )}
          </span>
        </label>
      </div>

      {/* Controls */}
      <div className="controls">
        <button
          onClick={handleRender}
          disabled={isRendering || !window.VideoFrame}
          className={`btn btn-primary ${(isRendering || !window.VideoFrame) ? 'disabled' : ''}`}
        >
          {isRendering ? '⏳ Rendering...' : includeAudio ? '🎬 Render with Audio' : '🎬 Render Video'}
        </button>

        {videoBlob && !audioBlob && (
          <>
            <button onClick={handleDownload} className="btn btn-secondary">
              ⬇️ Download Video
            </button>
            <button onClick={reset} className="btn btn-secondary">
              🔄 Reset
            </button>
          </>
        )}

        {videoBlob && audioBlob && !isMerging && (
          <>
            <button
              onClick={handleDownloadWithAudio}
              disabled={!ffmpegReady}
              className={`btn ${ffmpegReady ? 'btn-success' : ''}`}
            >
              {ffmpegReady ? '⬇️ Download Video + Audio' : '⏳ Loading FFmpeg...'}
            </button>
            <button onClick={reset} className="btn btn-secondary">
              🔄 Reset
            </button>
          </>
        )}

        {isMerging && (
          <button disabled className="btn">
            ⏳ Processing...
          </button>
        )}
      </div>

      {/* Progress Bar */}
      {isRendering && (
        <div className="progress-container">
          <div className="progress-label">
            Rendering: {(progress * 100).toFixed(0)}%
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress * 100}%` }} />
          </div>
        </div>
      )}

      {/* Merge Progress */}
      {isMerging && (
        <div className="progress-container">
          <div className="progress-label">
            {mergeStatus} {(mergeProgress).toFixed(0)}%
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${mergeProgress}%` }} />
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="error-box">
          <strong>Error:</strong> {error.message}
        </div>
      )}

      {/* Merge Error */}
      {mergeError && (
        <div className="error-box">
          <strong>Merge Error:</strong> {mergeError}
        </div>
      )}

      {/* Video Preview */}
      {videoBlob && !isMerging && (
        <div className="video-container">
          <h3 className="section-title">Preview</h3>
          <video
            src={URL.createObjectURL(videoBlob)}
            controls
            className="video-preview"
          />
          <div className="video-info">
            Video size: {(videoBlob.size / 1024 / 1024).toFixed(2)} MB
            {audioBlob && ` • Audio: ${(audioBlob.size / 1024 / 1024).toFixed(2)} MB`}
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="instructions">
        <h3 className="section-title">How it works:</h3>
        <ol>
          <li>Enable audio option if you want sound in your video</li>
          <li>Click "Render" to start rendering in your browser</li>
          <li>Preview and download once complete</li>
        </ol>
        <p className="note">
          All rendering happens in your browser using WebCodecs API. No server required!
        </p>
      </div>
    </div>
  );
}
export default ExampleVideoRenderer;
