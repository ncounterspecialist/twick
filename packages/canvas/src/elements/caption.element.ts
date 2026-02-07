import type { CanvasElementHandler } from "../types";
import { addCaptionElement } from "../components/elements";
import { convertToVideoPosition } from "../helpers/canvas.util";
import { ELEMENT_TYPES } from "../helpers/constants";
import { CANVAS_OPERATIONS } from "../helpers/constants";

export const CaptionElement: CanvasElementHandler = {
  name: ELEMENT_TYPES.CAPTION,

  async add(params) {
    const { element, index, canvas, captionProps, canvasMetadata } = params;
    await addCaptionElement({
      element,
      index,
      canvas,
      captionProps: (captionProps ?? {}) as import("../types").CaptionProps,
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
    if (context.captionPropsRef.current?.applyToAll) {
      return {
        element,
        operation: CANVAS_OPERATIONS.CAPTION_PROPS_UPDATED,
        payload: {
          element,
          props: {
            ...context.captionPropsRef.current,
            x,
            y,
          },
        },
      };
    }
    return {
      element: {
        ...element,
        props: {
          ...element.props,
          x,
          y,
        },
      },
    };
  },
};
