import type { CanvasElementHandler } from "../types";
import { addTextElement } from "../components/elements";
import { convertToVideoPosition } from "../helpers/canvas.util";
import { ELEMENT_TYPES } from "../helpers/constants";

export const TextElement: CanvasElementHandler = {
  name: ELEMENT_TYPES.TEXT,

  async add(params) {
    const { element, index, canvas, canvasMetadata } = params;
    await addTextElement({
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
          x,
          y,
        },
      },
    };
  },
};
