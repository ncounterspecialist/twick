import type { CanvasElementHandler } from "../types";
import { addImageElement } from "../components/elements";
import {
  convertToVideoDimensions,
  convertToVideoPosition,
  getObjectCanvasAngle,
  getObjectCanvasCenter,
} from "../helpers/canvas.util";
import { ELEMENT_TYPES } from "../helpers/constants";

export const EmojiElement: CanvasElementHandler = {
  name: ELEMENT_TYPES.EMOJI,

  async add(params) {
    const { element, index, canvas, canvasMetadata, lockAspectRatio } = params;
    await addImageElement({
      element,
      index,
      canvas,
      canvasMetadata,
      lockAspectRatio: lockAspectRatio ?? element.props?.lockAspectRatio ?? true,
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

    if (object.type === "group") {
      const scaledW = (object.width ?? 0) * (object.scaleX ?? 1);
      const scaledH = (object.height ?? 0) * (object.scaleY ?? 1);
      const { width: fw, height: fh } = convertToVideoDimensions(
        scaledW,
        scaledH,
        context.canvasMetadata
      );
      const updatedFrameSize: [number, number] = [fw, fh];
      const frame = element.frame!;
      return {
        element: {
          ...element,
          frame: {
            ...frame,
            rotation: getObjectCanvasAngle(object),
            size: updatedFrameSize,
            x,
            y,
          },
        },
      };
    }

    const scaledW = (object.width ?? 0) * (object.scaleX ?? 1);
    const scaledH = (object.height ?? 0) * (object.scaleY ?? 1);
    const { width, height } = convertToVideoDimensions(
      scaledW,
      scaledH,
      context.canvasMetadata
    );
    return {
      element: {
        ...element,
        props: {
          ...element.props,
          rotation: getObjectCanvasAngle(object),
          width,
          height,
          x,
          y,
        },
      },
    };
  },
};
