import type { CanvasElementHandler } from "../types";
import { addCircleElement } from "../components/elements";
import { convertToVideoPosition } from "../helpers/canvas.util";
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
    const { x, y } = convertToVideoPosition(
      object.left,
      object.top,
      context.canvasMetadata,
      context.videoSize
    );
    const radius = Number(
      ((element.props?.radius ?? 0) * object.scaleX).toFixed(2)
    );
    return {
      element: {
        ...element,
        props: {
          ...element.props,
          rotation: object.angle,
          radius,
          height: radius * 2,
          width: radius * 2,
          x,
          y,
        },
      },
    };
  },
};
