import type { CanvasElementHandler } from "../types";
import { addRectElement } from "../components/elements";
import { convertToVideoPosition, getObjectCanvasCenter, getObjectCanvasAngle } from "../helpers/canvas.util";
import { ELEMENT_TYPES } from "../helpers/constants";

export const RectElement: CanvasElementHandler = {
  name: ELEMENT_TYPES.RECT,

  async add(params) {
    const { element, index, canvas, canvasMetadata, lockAspectRatio } = params;
    await addRectElement({
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
    return {
      element: {
        ...element,
        props: {
          ...element.props,
          rotation: getObjectCanvasAngle(object),
          width: (element.props?.width ?? 0) * object.scaleX,
          height: (element.props?.height ?? 0) * object.scaleY,
          x,
          y,
        },
      },
    };
  },
};
