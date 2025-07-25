import { useState, useEffect, useRef, useMemo } from "react";
import { useDrag } from "@use-gesture/react";
import { motion, HTMLMotionProps } from "framer-motion";
import { MIN_DURATION, DRAG_TYPE } from "../../helpers/constants";
import { ELEMENT_COLORS } from "../../helpers/editor.utils";
import { FrameEffect, getDecimalNumber, TrackElement } from "@twick/timeline";
import "../../styles/timeline.css";

export const TrackElementView: React.FC<{
  element: TrackElement;
  selectedItem: TrackElement | null;
  parentWidth: number;
  duration: number;
  nextStart: number;
  prevEnd: number;
  allowOverlap: boolean;
  onSelection: (element: TrackElement) => void;
  onDeletion: (element: TrackElement) => void;
  updateTrackElement: (elementId: string, updates: any) => void;
}> = ({
  element,
  parentWidth,
  duration,
  nextStart,
  prevEnd,
  selectedItem,
  onSelection,
  updateTrackElement,
  allowOverlap = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const dragType = useRef<string | null>(null);
  const lastPosRef = useRef<{ start: number; end: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const [position, setPosition] = useState({
    start: 0,
    end: 0,
  });

  useEffect(() => {
    setPosition({
      start: element.getStart(),
      end: element.getEnd(),
    });
  }, [element, parentWidth, duration]);

  const isAudioVideo = useMemo(() => {
    const elementType = element.getType();
    return elementType === "video" || elementType === "audio";
  }, [element]);

  const bind = useDrag(({ delta: [dx] }) => {
    if (!parentWidth) return;
    if (dx == 0) return;
    setIsDragging(true);
    dragType.current = DRAG_TYPE.MOVE;
    setPosition((prev) => {
      const span = prev.end - prev.start;
      let newStart = Math.max(0, prev.start + (dx / parentWidth) * duration);
      newStart = Math.min(newStart, prev.end - MIN_DURATION);
      if (prevEnd !== null && !allowOverlap && newStart < prevEnd) {
        newStart = prevEnd;
      } else if (
        nextStart !== null &&
        !allowOverlap &&
        newStart + span > nextStart
      ) {
        newStart = nextStart - span;
      }
      return {
        start: newStart,
        end: newStart + span,
      };
    });
  });

  const bindStartHandle = useDrag(({ delta: [dx], event }) => {
    if (event) {
      event.stopPropagation();
    }
    if (dx === 0) return;
    if (isDragging) {
      setIsDragging(false);
    }
    dragType.current = DRAG_TYPE.START;
    setPosition((prev) => {
      let newStart = Math.max(0, prev.start + (dx / parentWidth) * duration);
      newStart = Math.min(newStart, prev.end - MIN_DURATION);
      if (prevEnd !== null && !allowOverlap && newStart < prevEnd) {
        newStart = prevEnd;
      }
      return {
        start: newStart,
        end: prev.end,
      };
    });
  });

  const bindEndHandle = useDrag(({ delta: [dx], event }) => {
    if (event) {
      event.stopPropagation();
    }
    if (dx === 0) return;
    if (isDragging) {
      setIsDragging(false);
    }
    dragType.current = DRAG_TYPE.END;
    setPosition((prev) => {
      let newEnd = prev.end + (dx / parentWidth) * duration;
      newEnd = Math.max(newEnd, prev.start + MIN_DURATION);
      if (nextStart !== null && !allowOverlap && newEnd > nextStart) {
        newEnd = nextStart;
      }
      return {
        start: prev.start,
        end: newEnd,
      };
    });
  });

  const setLastPos = () => {
    lastPosRef.current = position;
  };

  const sendUpdate = () => {
    setIsDragging(false);
    let updates = {};
    if (
      lastPosRef.current?.start !== position.start ||
      lastPosRef.current?.end !== position.end
    ) {
      if (isAudioVideo && dragType.current === DRAG_TYPE.START) {
        const elementProps = element.getProps();
        const delta =
          position.start -
          (lastPosRef.current?.start || 0) * (elementProps?.playbackRate || 1);
        updates = {
          s: getDecimalNumber(position.start),
          e: getDecimalNumber(position.end),
          props: {
            ...(elementProps || {}),
            time: getDecimalNumber(
              Math.max(0, (element.getProps()?.time || 0) + delta)
            ),
          },
        };
      } else {
        updates = {
          s: getDecimalNumber(position.start),
          e: getDecimalNumber(position.end),
        };
      }
      updateTrackElement(element.getId(), updates);
    }
  };

  const getElementColor = (elementType: string) => {
    if (elementType in ELEMENT_COLORS) {
      return ELEMENT_COLORS[elementType as keyof typeof ELEMENT_COLORS];
    }
    return ELEMENT_COLORS.element;
  };

  const isSelected = useMemo(() => {
    return selectedItem?.getId() === element.getId();
  }, [selectedItem, element]);  

  const motionProps: HTMLMotionProps<"div"> = {
    ref,
    className: `twick-track-element ${
      isSelected ? "twick-track-element-selected"
        : "twick-track-element-default"
    } ${isDragging ? "twick-track-element-dragging" : ""}`,
    onMouseDown: setLastPos,
    onTouchStart: setLastPos,
    onMouseUp: sendUpdate,
    onTouchEnd: sendUpdate,
    onDoubleClick: () => {
      if (onSelection) {
        onSelection(element);
      }
    },
    style: {
      backgroundColor: getElementColor(element.getType()),
      width: `${((position.end - position.start) / duration) * 100}%`,
      left: `${(position.start / duration) * 100}%`,
      touchAction: "none",
    },
  };

  return (
    <motion.div {...motionProps}>
      <div style={{ touchAction: "none", height: "100%" }} {...bind()}>
        {isSelected ? (
          <div
            style={{ touchAction: "none" }}
            {...bindStartHandle()}
            className="twick-track-element-handle twick-track-element-handle-start"
          />
        ) : null}
        <div className="twick-track-element-content">
          {(element as any).getText ? (element as any).getText() : element.getName() || element.getType()}
        </div>
        {isSelected ? (
          <div
            style={{ touchAction: "none" }}
            {...bindEndHandle()}
            className="twick-track-element-handle twick-track-element-handle-end"
          />
        ) : null}
        {(element as any).getFrameEffects ? (element as any).getFrameEffects().map((frameEffect: FrameEffect) => {
          return (
            <div
              className="twick-track-element-frame-effect"
              key={frameEffect.s + frameEffect.e}
              style={{
                backgroundColor: getElementColor("frameEffect"),
                width: `${
                  ((frameEffect.e - frameEffect.s) / (element.getDuration())) *
                  100
                }%`,
                left: `${(frameEffect.s / (element.getDuration())) * 100}%`,
              }}
            ></div>
          );
        }) : null}
      </div>
    </motion.div>
  );
};

export default TrackElementView;