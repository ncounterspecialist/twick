import type { CanvasElementHandler } from "../types";
import { Group, Rect, Triangle } from "fabric";
import {
  convertToCanvasPosition,
  convertToVideoPosition,
  getObjectCanvasAngle,
  getObjectCanvasCenter,
} from "../helpers/canvas.util";
import { ELEMENT_TYPES } from "../helpers/constants";

export const ArrowElement: CanvasElementHandler = {
  name: ELEMENT_TYPES.ARROW,

  async add(params) {
    const { element, index, canvas, canvasMetadata, lockAspectRatio } = params;

    const baseWidth = element.props?.width ?? 220;
    const baseHeight = element.props?.height ?? 14;
    const { x, y } = convertToCanvasPosition(
      element.props?.x ?? 0,
      element.props?.y ?? 0,
      canvasMetadata
    );

    const fill = element.props?.fill || "#f59e0b";
    const radius = (element.props?.radius ?? 4) * canvasMetadata.scaleX;

    const barWidth = baseWidth * canvasMetadata.scaleX;
    const barHeight = baseHeight * canvasMetadata.scaleY;
    const headSize = barHeight * 1.8;

    // Bar: from left to just before the triangle, with overlap so no gap
    const barLength = barWidth - headSize * 0.5;
    const bar = new Rect({
      left: -barWidth / 2,
      top: -barHeight / 2,
      originX: "left",
      originY: "top",
      width: barLength,
      height: barHeight,
      rx: radius,
      ry: radius,
      fill,
    });

    // Triangle: tip points right; center overlaps the bar end for a clean join
    const arrowHead = new Triangle({
      left: barWidth / 2 - headSize * 0.25,
      top: 0,
      originX: "center",
      originY: "center",
      width: headSize,
      height: headSize,
      fill,
      angle: 90,
    });

    const opacity = element.props?.opacity ?? 1;

    const group = new Group([bar, arrowHead], {
      left: x,
      top: y,
      originX: "center",
      originY: "center",
      angle: element.props?.rotation || 0,
      opacity,
      selectable: true,
      hasControls: true,
    });

    // Keep arrow scaling uniform when resizing
    group.set(
      "lockUniScaling",
      (lockAspectRatio ?? element.props?.lockAspectRatio ?? true) as boolean
    );

    // Attach metadata for syncing back to the timeline
    group.set("id" as any, element.id as any);
    group.set("zIndex" as any, index as any);

    canvas.add(group);
  },

  updateFromFabricObject(object, element, context) {
    const canvasCenter = getObjectCanvasCenter(object);
    const { x, y } = convertToVideoPosition(
      canvasCenter.x,
      canvasCenter.y,
      context.canvasMetadata,
      context.videoSize
    );

    const baseWidth = element.props?.width ?? 220;
    const baseHeight = element.props?.height ?? 14;

    const opacity =
      (object as { opacity?: number }).opacity ?? element.props?.opacity ?? 1;

    return {
      element: {
        ...element,
        props: {
          ...element.props,
          rotation: getObjectCanvasAngle(object),
          width: baseWidth * object.scaleX,
          height: baseHeight * object.scaleY,
          x,
          y,
          opacity,
        },
      },
    };
  },
};
