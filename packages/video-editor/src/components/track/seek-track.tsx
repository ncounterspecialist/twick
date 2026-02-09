import React, { useRef, useState, useMemo } from "react";
import { useDrag } from "@use-gesture/react";
import "../../styles/timeline.css";
import { TimelineTickConfig } from "../video-editor";

export interface PlayheadState {
  positionPx: number;
  isDragging: boolean;
}

interface SeekTrackProps {
  currentTime: number;
  duration: number; // in seconds
  zoom?: number; // e.g. 1 = 100px/sec
  onSeek: (time: number) => void;
  timelineCount?: number; // number of timeline to calculate pin height
  timelineTickConfigs?: TimelineTickConfig[]; // custom tick configurations
  /** Called when playhead position or drag state changes (for auto-scroll) */
  onPlayheadUpdate?: (state: PlayheadState) => void;
}

export default function SeekTrack({
  currentTime,
  duration,
  zoom = 1,
  onSeek,
  timelineCount = 0,
  timelineTickConfigs,
  onPlayheadUpdate,
}: SeekTrackProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState<number | null>(null);

  const pixelsPerSecond = 100 * zoom;
  const totalWidth = duration * pixelsPerSecond;

  // Calculate pin height based on number of timeline
  const pinHeight = 2 + timelineCount * (2.75 + 0.5); // 2.75rem height + 0.5rem margin per timeline

  // Calculate seek position: use drag position when dragging, otherwise calculate from currentTime
  // This ensures the position always reflects the current time when not dragging
  const seekPosition = useMemo(() => {
    const position =
      isDragging && dragPosition !== null
        ? dragPosition
        : currentTime * pixelsPerSecond;
    return Math.max(0, position); // Ensure position is never negative
  }, [isDragging, dragPosition, currentTime, pixelsPerSecond]);

  // Notify parent of playhead state for auto-scroll during playback/drag
  React.useEffect(() => {
    onPlayheadUpdate?.({
      positionPx: seekPosition,
      isDragging,
    });
  }, [seekPosition, isDragging, onPlayheadUpdate]);

  // Tick config (major/minor) based on duration tiers with more density for longer videos
  const { majorIntervalSec, minorIntervalSec } = useMemo(() => {
    // Use custom tick configs if provided
    if (timelineTickConfigs && timelineTickConfigs.length > 0) {
      // Sort configs by duration threshold ascending
      const sortedConfigs = [...timelineTickConfigs].sort((a, b) => a.durationThreshold - b.durationThreshold);
      
      // Find the first config where duration < threshold
      for (const config of sortedConfigs) {
        if (duration < config.durationThreshold) {
          return {
            majorIntervalSec: config.majorInterval,
            minorIntervalSec: config.minorTicks > 0 ? config.majorInterval / (config.minorTicks + 1) : config.majorInterval,
          };
        }
      }
      
      // If no threshold matched, use the last config
      const lastConfig = sortedConfigs[sortedConfigs.length - 1];
      return {
        majorIntervalSec: lastConfig.majorInterval,
        minorIntervalSec: lastConfig.minorTicks > 0 ? lastConfig.majorInterval / (lastConfig.minorTicks + 1) : lastConfig.majorInterval,
      };
    }

    // Default tick configuration
    let major = 1;
    let minors = 5;

    if (duration < 10) {
      major = 1; // 1s major ticks
      minors = 10; // 0.1s minor ticks
    } else if (duration < 30) {
      major = 5; // 5s major ticks
      minors = 5; // 1s minor ticks
    } else if (duration < 120) {
      major = 10; // 10s major ticks
      minors = 5; // 2s minor ticks
    } else if (duration < 300) {
      // < 5 min
      major = 30; // 30s major ticks
      minors = 6; // 5s minor ticks
    } else if (duration < 900) {
      // < 15 min
      major = 60; // 1m major ticks
      minors = 6; // 10s minor ticks
    } else if (duration < 1800) {
      // < 30 min
      major = 120; // 2m major ticks
      minors = 4; // 30s minor ticks
    } else if (duration < 3600) {
      // < 1 hr
      major = 300; // 5m major ticks
      minors = 5; // 1m minor ticks
    } else if (duration < 7200) {
      // < 2 hr
      major = 600; // 10m major ticks
      minors = 10; // 1m minor ticks
    } else {
      major = 1800; // 30m major ticks
      minors = 6; // 5m minor ticks
    }
    return {
      majorIntervalSec: major,
      minorIntervalSec: minors > 0 ? major / (minors + 1) : major,
    };
  }, [duration, timelineTickConfigs]);

  // Container width not needed; tick rendering uses CSS backgrounds sized by totalWidth

  const handleSeek = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left + (containerRef.current.scrollLeft || 0);
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
    const xPos = x - rect.left + (containerRef.current.scrollLeft || 0);
    const newTime = Math.max(0, Math.min(duration, xPos / pixelsPerSecond));
    
    setDragPosition(xPos);
    onSeek(newTime);
    
    // Clear drag position when drag ends
    if (!active) {
      setDragPosition(null);
    }
  });

  return (
    <div className="twick-seek-track">
      <div
        ref={containerRef}
        className="twick-seek-track-container-no-scrollbar"
        onClick={(e) => handleSeek(e.clientX)}
        style={{
          overflowX: "auto",
          overflowY: "hidden",
          position: "relative",
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE/Edge
        }}
      >
        {/* Ruler with individual tick divs to prevent overlap */}
        {(() => {
          const ticks: React.ReactElement[] = [];
          const labels: React.ReactElement[] = [];
          const epsilon = 1e-6;
          
          // Generate all tick positions
          const tickPositions = new Set<number>();
          
          // Add minor ticks
          for (let t = 0; t <= duration + epsilon; t += minorIntervalSec) {
            tickPositions.add(Math.round(t * 1000) / 1000); // Round to avoid floating point issues
          }
          
          // Draw ticks
          tickPositions.forEach((t) => {
            const left = t * pixelsPerSecond;
            const isMajor = Math.abs((t / majorIntervalSec) - Math.round(t / majorIntervalSec)) < 0.001;
            
            ticks.push(
              <div
                key={`tick-${t}`}
                style={{
                  position: "absolute",
                  left,
                  top: 0,
                  width: "1px",
                  height: isMajor ? "12px" : "8px",
                  backgroundColor: isMajor ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.2)",
                  pointerEvents: "none",
                }}
              />
            );
            
            // Add labels only for major ticks
            if (isMajor && t > epsilon) {
              labels.push(
                <div
                  key={`lbl-${t}`}
                  style={{
                    position: "absolute",
                    left,
                    bottom: "6px",
                    transform: "translateX(-50%)",
                    color: "rgba(255,255,255,0.7)",
                    font: "bold 10px system-ui, sans-serif",
                    pointerEvents: "none",
                    textShadow: "1px 1px 2px rgba(0,0,0,0.8)",
                  }}
                >
                  {`${Math.floor(t)}s`}
                </div>
              );
            }
          });
          
          return (
            <div
              style={{
                overflow: "hidden",
                position: "relative",
                width: `${Math.max(1, Math.round(totalWidth))}px`,
                height: "32px",
                backgroundColor: "#0f0f0f",
              }}
            >
              {ticks}
              {labels}
            </div>
          );
        })()}
        
        {/* Seek tip (playhead) */}
        <div
          {...bind()}
          className="twick-seek-track-playhead"
          style={{ 
            position: "absolute",
            left: 0,
            transform: `translateX(${seekPosition}px)`,
            top: 0,
            touchAction: "none",
            transition: isDragging ? "none" : "transform 0.1s linear",
            willChange: isDragging ? "transform" : "auto",
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
