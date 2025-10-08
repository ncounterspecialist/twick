import { useState, useEffect, useRef, useMemo } from "react";
import { useDrag } from "@use-gesture/react";
import { motion, HTMLMotionProps } from "framer-motion";
import { MIN_DURATION, DRAG_TYPE } from "../../helpers/constants";
import { ELEMENT_COLORS } from "../../helpers/editor.utils";
import { FrameEffect, getDecimalNumber, TrackElement } from "@twick/timeline";
import { ElementColors } from "../../helpers/types";
import "../../styles/timeline.css";

export const TrackElementView: React.FC<{
  element: TrackElement;
  selectedItem: TrackElement | null;
  parentWidth: number;
  duration: number;
  nextStart: number | null;
  prevEnd: number;
  allowOverlap: boolean;
  onSelection: (element: TrackElement) => void;
  onDrag: ({
    element,
    dragType,
    updates,
  }: {
    element: TrackElement;
    dragType: string;
    updates: { start: number; end: number };
  }) => void;
  elementColors?: ElementColors;
}> = ({
  element,
  parentWidth,
  duration,
  nextStart,
  prevEnd,
  selectedItem,
  onSelection,
  onDrag,
  allowOverlap = false,
  elementColors,
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
  }, [element.getStart(), element.getEnd(), parentWidth, duration]);

  const bind = useDrag(({ delta: [dx] }) => {
    if (!parentWidth) return;
    if (dx == 0) return;
    setIsDragging(true);
    dragType.current = DRAG_TYPE.MOVE;
    setPosition((prev) => {
      const span = prev.end - prev.start;
      let newStart = Math.max(0, prev.start + (dx / parentWidth) * duration);
      newStart = Math.min(newStart, prev.end - MIN_DURATION);
      if (!allowOverlap) {
        if (prevEnd !== null && newStart < prevEnd) {
          newStart = prevEnd;
        } else if (
          nextStart !== null &&
          !allowOverlap &&
          newStart + span > nextStart
        ) {
          newStart = nextStart - span;
        }
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
      if(!allowOverlap) {
        if (nextStart !== null && newEnd > nextStart) {
          newEnd = nextStart;
        }
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
    if (
      lastPosRef.current?.start !== position.start ||
      lastPosRef.current?.end !== position.end
    ) {
      onDrag({
        element,
        updates: {
          start: getDecimalNumber(position.start),
          end: getDecimalNumber(position.end),
        },
        dragType: dragType.current || "",
      });
    }
  };

  const getElementColor = (elementType: string) => {
    const colors = elementColors || ELEMENT_COLORS;
    if (elementType in colors) {
      return colors[elementType as keyof typeof colors];
    }
    return ELEMENT_COLORS.element;
  };

  const isSelected = useMemo(() => {
    return selectedItem?.getId() === element.getId();
  }, [selectedItem, element]);

  const motionProps: HTMLMotionProps<"div"> = {
    ref,
    className: `twick-track-element ${
      isSelected
        ? "twick-track-element-selected"
        : "twick-track-element-default"
    } ${isDragging ? "twick-track-element-dragging" : ""}`,
    onMouseDown: (e) => {
      if (e.target === ref.current) {
        setLastPos();
      }
    },
    onTouchStart: (e) => {
      if (e.target === ref.current) {
        setLastPos();
      }
    },
    onMouseUp: sendUpdate,
    onTouchEnd: sendUpdate,
    onClick: () => {
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
            style={{ touchAction: "none" , zIndex: isSelected? 100 : 1}}
            {...bindStartHandle()}
            className="twick-track-element-handle twick-track-element-handle-start"
          />
        ) : null}
        <div className="twick-track-element-content">
          {(element as any).getText
            ? (element as any).getText()
            : element.getName() || element.getType()}
        </div>
        {isSelected ? (
          <div
            style={{ touchAction: "none", zIndex: isSelected? 100 : 1 }}
            {...bindEndHandle()}
            className="twick-track-element-handle twick-track-element-handle-end"
          />
        ) : null}
        {(element as any).getFrameEffects
          ? (element as any)
              .getFrameEffects()
              .map((frameEffect: FrameEffect) => {
                return (
                  <div
                    className="twick-track-element-frame-effect"
                    key={frameEffect.s + frameEffect.e}
                    style={{
                      backgroundColor: getElementColor("frameEffect"),
                      width: `${
                        ((frameEffect.e - frameEffect.s) /
                          element.getDuration()) *
                        100
                      }%`,
                      left: `${(frameEffect.s / element.getDuration()) * 100}%`,
                    }}
                  ></div>
                );
              })
          : null}
      </div>
    </motion.div>
  );
};

export default TrackElementView;
