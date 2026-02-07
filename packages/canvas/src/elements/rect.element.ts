import type { CanvasElementHandler } from "../types";
import { addRectElement } from "../components/elements";
import { convertToVideoPosition } from "../helpers/canvas.util";
import { ELEMENT_TYPES } from "../helpers/constants";

export const RectElement: CanvasElementHandler = {
  name: ELEMENT_TYPES.RECT,

  async add(params) {
    const { element, index, canvas, canvasMetadata } = params;
    await addRectElement({
      element,
      index,
      canvas,
      canvasMetadata,
    });
  },

  updateFromFabricObject(object, element, context) {
    const { x, y } = convertToVideoPosition(
      object.left,
      object.top,
      context.canvasMetadata,
      context.videoSize
    );
    return {
      element: {
        ...element,
        props: {
          ...element.props,
          rotation: object.angle,
          width: (element.props?.width ?? 0) * object.scaleX,
          height: (element.props?.height ?? 0) * object.scaleY,
          x,
          y,
        },
      },
    };
  },
};
