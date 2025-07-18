import { useRef, useState, useEffect, useCallback } from "react";
import { useDrag } from "@use-gesture/react";
import "../../styles/timeline.css";

interface SeekTrackProps {
  currentTime: number;
  duration: number;     // in seconds
  zoom?: number;        // e.g. 1 = 100px/sec
  onSeek: (time: number) => void;
  timelineCount?: number; // number of timeline to calculate pin height
}

export default function SeekTrack({
  currentTime,
  duration,
  zoom = 1,
  onSeek,
  timelineCount = 0,
}: SeekTrackProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [seekPosition, setSeekPosition] = useState(0);

  const pixelsPerSecond = 100 * zoom;
  const totalWidth = duration * pixelsPerSecond;

  // Calculate pin height based on number of timeline
  const pinHeight = 2 + timelineCount * (2.75 + 0.5); // 2.75rem height + 0.5rem margin per timeline

  // Update seek position when currentTime changes
  useEffect(() => {
    if (!isDragging) {
      setSeekPosition(currentTime * pixelsPerSecond);
    }
  }, [currentTime, pixelsPerSecond, isDragging]);

  // Draw the timeline on canvas
  const drawTimeline = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // Set canvas dimensions with device pixel ratio for crisp text
    const dpr = window.devicePixelRatio || 1;
    const displayWidth = Math.max(totalWidth, containerWidth);
    canvas.width = displayWidth * dpr;
    canvas.height = 32 * dpr;
    canvas.style.width = `${displayWidth}px`;
    canvas.style.height = '32px';
    
    // Scale context according to device pixel ratio
    ctx.scale(dpr, dpr);

    // Clear canvas with solid background
    ctx.fillStyle = '#0f0f0f';
    ctx.fillRect(0, 0, displayWidth, 32);

    // Draw time ticks
    for (let i = 0; i <= Math.ceil(duration * 10); i++) {
      const time = i * 0.1; // 100ms per tick
      const x = Math.floor(time * pixelsPerSecond) + 0.5; // Align to pixel grid for sharpness
      const isSecond = i % 10 === 0;

      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, isSecond ? 24 : 12);
      ctx.strokeStyle = isSecond ? 'rgba(255, 255, 255, 0.7)' : 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Draw second labels
      if (isSecond) {
        ctx.font = 'bold 10px system-ui, sans-serif';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        if(time === 0) {
          // ctx.fillText(`${Math.floor(time)}s`, x, 32);
        } else {
          ctx.fillText(`${Math.floor(time)}s`, x, 32);
        }
      }
    }
  }, [duration, pixelsPerSecond, totalWidth, containerWidth]);

  // Handle window resize and initial setup
  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.clientWidth);
    }

    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Redraw canvas when dependencies change
  useEffect(() => {
    drawTimeline();
  }, [drawTimeline, duration, zoom, containerWidth]);

  const handleSeek = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const newTime = Math.max(0, Math.min(duration, x / pixelsPerSecond));
    onSeek(newTime);
  };

  const bind = useDrag(({ event, xy: [x], active }) => {
    if (event) {
      event.stopPropagation();
    }
    
    setIsDragging(active);
    
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xPos = x - rect.left;
    const newTime = Math.max(0, Math.min(duration, xPos / pixelsPerSecond));
    
    setSeekPosition(xPos);
    onSeek(newTime);
  });

  return (
    <div className="twick-seek-track">
      <div
        ref={containerRef}
        className="twick-seek-track-container"
        onClick={(e) => handleSeek(e.clientX)}
      >
        <canvas
          ref={canvasRef}
          className="twick-seek-track-canvas"
          style={{ minWidth: '100%' }}
        />
        
        {/* Seek tip (playhead) */}
        <div
          {...bind()}
          className="twick-seek-track-playhead"
          style={{ 
            left: seekPosition, 
            touchAction: "none",
            transition: isDragging ? 'none' : 'left 0.1s linear'
          }}
        >
          <div className="twick-seek-track-handle"></div>
          <div 
            className="twick-seek-track-pin"
            style={{ height: `${pinHeight}rem` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
