import type { CanvasElementHandler, WatermarkUpdatePayload } from "../types";
import { addTextElement, addImageElement } from "../components/elements";
import { convertToVideoPosition } from "../helpers/canvas.util";
import { ELEMENT_TYPES } from "../helpers/constants";
import { CANVAS_OPERATIONS } from "../helpers/constants";

/**
 * Watermark handler: add() supports element.type "text" | "image".
 * updateFromFabricObject() returns canonical WatermarkUpdatePayload for
 * WATERMARK_UPDATED so video-editor can persist via setWatermark().
 */
export const WatermarkElement: CanvasElementHandler = {
  name: "watermark",

  async add(params) {
    const { element, index, canvas, canvasMetadata, watermarkPropsRef } = params;
    if (element.type === ELEMENT_TYPES.TEXT) {
      if (watermarkPropsRef) watermarkPropsRef.current = element.props;
      await addTextElement({
        element,
        index,
        canvas,
        canvasMetadata,
      });
    } else if (element.type === ELEMENT_TYPES.IMAGE) {
      await addImageElement({
        element,
        index,
        canvas,
        canvasMetadata,
      });
    }
  },

  updateFromFabricObject(object, element, context) {
    const { x, y } = convertToVideoPosition(
      object.left,
      object.top,
      context.canvasMetadata,
      context.videoSize
    );
    const rotation = object.angle != null ? object.angle : undefined;
    const opacity = object.opacity != null ? object.opacity : undefined;
    // Preserve existing props; text uses watermarkPropsRef, image uses element.props + scale
    const baseProps =
      element.type === ELEMENT_TYPES.TEXT
        ? context.watermarkPropsRef.current ?? element.props ?? {}
        : { ...element.props };
    const props =
      element.type === ELEMENT_TYPES.IMAGE && (object.scaleX != null || object.scaleY != null)
        ? {
            ...baseProps,
            width: baseProps.width != null && object.scaleX != null ? baseProps.width * object.scaleX : baseProps.width,
            height: baseProps.height != null && object.scaleY != null ? baseProps.height * object.scaleY : baseProps.height,
          }
        : baseProps;

    const payload: WatermarkUpdatePayload = {
      position: { x, y },
      ...(rotation != null && { rotation }),
      ...(opacity != null && { opacity }),
      ...(Object.keys(props).length > 0 && { props }),
    };

    return {
      element: { ...element, props: { ...element.props, x, y, rotation, opacity, ...props } },
      operation: CANVAS_OPERATIONS.WATERMARK_UPDATED,
      payload,
    };
  },
};
