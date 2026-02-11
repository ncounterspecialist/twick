import type { CanvasElementHandler } from "../types";
import { addCircleElement } from "../components/elements";
import { convertToVideoPosition, getObjectCanvasCenter, getObjectCanvasAngle } from "../helpers/canvas.util";
import { ELEMENT_TYPES } from "../helpers/constants";

export const CircleElement: CanvasElementHandler = {
  name: ELEMENT_TYPES.CIRCLE,

  async add(params) {
    const { element, index, canvas, canvasMetadata, lockAspectRatio } = params;
    await addCircleElement({
      element,
      index,
      canvas,
      canvasMetadata,
      lockAspectRatio: lockAspectRatio ?? element.props?.lockAspectRatio,
    });
  },

  updateFromFabricObject(object, element, context) {
    const canvasCenter = getObjectCanvasCenter(object);
    const { x, y } = convertToVideoPosition(
      canvasCenter.x,
      canvasCenter.y,
      context.canvasMetadata,
      context.videoSize
    );
    const radius = Number(
      ((element.props?.radius ?? 0) * object.scaleX).toFixed(2)
    );
    const opacity = object.opacity != null ? object.opacity : element.props?.opacity;
    return {
      element: {
        ...element,
        props: {
          ...element.props,
          rotation: getObjectCanvasAngle(object),
          radius,
          height: radius * 2,
          width: radius * 2,
          x,
          y,
          ...(opacity != null && { opacity }),
        },
      },
    };
  },
};
