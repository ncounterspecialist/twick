import React from 'react';
import { useBrowserRenderer } from '@twick/browser-render';

/**
 * Complete example of a React component that uses the browser renderer
 * to render Twick videos client-side.
 * 
 * The browser renderer now uses the same API as the server renderer:
 * - Uses @twick/visualizer project by default
 * - Supports custom project files via projectFile option
 * - Takes variables object with input configuration
 */
export function ExampleVideoRenderer() {
  const {
    render,
    progress,
    isRendering,
    videoBlob,
    download,
    error,
    reset,
  } = useBrowserRenderer({
    // Optional: Import and use a custom project
    // import myCustomProject from './my-custom-project';
    // projectFile: myCustomProject,
    
    // If projectFile is not specified, uses @twick/visualizer project by default
    // Note: String paths like "@twick/visualizer/dist/project.js" only work in Node.js,
    // in the browser you must import the project and pass it as an object
    
    width: 720,
    height: 1280,
    fps: 30,
    quality: 'high',
    autoDownload: false, // Manual download control
  });

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

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🎬 Browser Video Renderer</h1>
      
      {/* API Info */}
      <div style={styles.infoBox}>
        <h3 style={{ margin: '0 0 10px 0', color: '#4f46e5' }}>✨ New API Features</h3>
        <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: '1.8' }}>
          <li><strong>Same API as server renderer</strong> - Consistent interface across platforms</li>
          <li><strong>Uses @twick/visualizer project</strong> - Properly decodes scenes and elements</li>
          <li><strong>Custom project support</strong> - Optional projectFile parameter</li>
          <li><strong>Variables-based configuration</strong> - Pass input config via variables object</li>
        </ul>
      </div>

      {/* Browser Support Check */}
      {!window.VideoFrame && (
        <div style={styles.warning}>
          ⚠️ Your browser doesn't support WebCodecs. Please use Chrome, Edge, or Opera.
        </div>
      )}

      {/* Controls */}
      <div style={styles.controls}>
        <button
          onClick={handleRender}
          disabled={isRendering || !window.VideoFrame}
          style={{
            ...styles.button,
            ...(isRendering || !window.VideoFrame ? styles.buttonDisabled : {}),
          }}
        >
          {isRendering ? '⏳ Rendering...' : '🎬 Render Video'}
        </button>

        {videoBlob && (
          <>
            <button
              onClick={handleDownload}
              style={{
                ...styles.button,
                ...styles.buttonSecondary,
              }}
            >
              ⬇️ Download
            </button>
            <button
              onClick={reset}
              style={{
                ...styles.button,
                ...styles.buttonSecondary,
              }}
            >
              🔄 Reset
            </button>
          </>
        )}
      </div>

      {/* Progress Bar */}
      {isRendering && (
        <div style={styles.progressContainer}>
          <div style={styles.progressLabel}>
            Rendering: {(progress * 100).toFixed(0)}%
          </div>
          <div style={styles.progressBar}>
            <div
              style={{
                ...styles.progressFill,
                width: `${progress * 100}%`,
              }}
            />
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div style={styles.error}>
          <strong>Error:</strong> {error.message}
        </div>
      )}

      {/* Video Preview */}
      {videoBlob && (
        <div style={styles.videoContainer}>
          <h3 style={styles.subtitle}>Preview</h3>
          <video
            src={URL.createObjectURL(videoBlob)}
            controls
            style={styles.video}
          />
          <div style={styles.info}>
            Video size: {(videoBlob.size / 1024 / 1024).toFixed(2)} MB
          </div>
        </div>
      )}

      {/* Instructions */}
      <div style={styles.instructions}>
        <h3 style={styles.subtitle}>How it works:</h3>
        <ol style={styles.list}>
          <li>Click "Render Video" to start rendering in your browser</li>
          <li>Watch the progress bar as frames are encoded</li>
          <li>Preview the video once rendering is complete</li>
          <li>Download the final video file</li>
        </ol>
        <p style={styles.note}>
          <strong>Note:</strong> All rendering happens in your browser using the
          WebCodecs API. No server or upload required!
        </p>
      </div>
    </div>
  );
}

// Styles
const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '40px 20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  title: {
    fontSize: '32px',
    fontWeight: '700',
    marginBottom: '24px',
    color: '#1f2937',
  },
  subtitle: {
    fontSize: '20px',
    fontWeight: '600',
    marginBottom: '12px',
    color: '#374151',
  },
  infoBox: {
    background: '#f0f9ff',
    padding: '16px 20px',
    borderRadius: '12px',
    marginBottom: '24px',
    border: '1px solid #bae6fd',
    fontSize: '14px',
    color: '#374151',
  },
  warning: {
    background: '#fef3c7',
    color: '#92400e',
    padding: '12px 16px',
    borderRadius: '8px',
    marginBottom: '20px',
    border: '1px solid #fbbf24',
  },
  controls: {
    display: 'flex',
    gap: '12px',
    marginBottom: '24px',
    flexWrap: 'wrap',
  },
  button: {
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight: '500',
    color: 'white',
    background: '#4f46e5',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  buttonSecondary: {
    background: '#6b7280',
  },
  buttonDisabled: {
    background: '#9ca3af',
    cursor: 'not-allowed',
  },
  progressContainer: {
    marginBottom: '24px',
  },
  progressLabel: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#6b7280',
    marginBottom: '8px',
  },
  progressBar: {
    width: '100%',
    height: '8px',
    background: '#e5e7eb',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #4f46e5, #7c3aed)',
    transition: 'width 0.3s ease',
  },
  error: {
    background: '#fee2e2',
    color: '#991b1b',
    padding: '12px 16px',
    borderRadius: '8px',
    marginBottom: '20px',
    border: '1px solid #fca5a5',
  },
  videoContainer: {
    marginTop: '24px',
    padding: '20px',
    background: '#f9fafb',
    borderRadius: '12px',
  },
  video: {
    width: '100%',
    borderRadius: '8px',
    marginBottom: '12px',
  },
  info: {
    fontSize: '14px',
    color: '#6b7280',
  },
  instructions: {
    marginTop: '40px',
    padding: '20px',
    background: '#eff6ff',
    borderRadius: '12px',
    border: '1px solid #93c5fd',
  },
  list: {
    paddingLeft: '24px',
    color: '#374151',
    lineHeight: '1.8',
  },
  note: {
    marginTop: '16px',
    fontSize: '14px',
    color: '#1e40af',
  },
};

export default ExampleVideoRenderer;
