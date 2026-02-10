import type { CanvasElementHandler } from "../types";
import { addImageElement, addBackgroundColor } from "../components/elements";
import { convertToVideoPosition, convertToVideoDimensions } from "../helpers/canvas.util";
import { ELEMENT_TYPES } from "../helpers/constants";

export const ImageElement: CanvasElementHandler = {
  name: ELEMENT_TYPES.IMAGE,

  async add(params) {
    const { element, index, canvas, canvasMetadata, lockAspectRatio } = params;
    await addImageElement({
      element,
      index,
      canvas,
      canvasMetadata,
      lockAspectRatio: lockAspectRatio ?? element.props?.lockAspectRatio,
    });
    if (element.timelineType === "scene") {
      await addBackgroundColor({
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
    const currentFrameEffect = context.elementFrameMapRef.current[element.id];

    if (object.type === "group") {
      const scaledW = (object.width ?? 0) * (object.scaleX ?? 1);
      const scaledH = (object.height ?? 0) * (object.scaleY ?? 1);
      const { width: fw, height: fh } = convertToVideoDimensions(
        scaledW,
        scaledH,
        context.canvasMetadata
      );
      const updatedFrameSize: [number, number] = [fw, fh];
      if (currentFrameEffect) {
        context.elementFrameMapRef.current[element.id] = {
          ...currentFrameEffect,
          props: {
            ...currentFrameEffect.props,
            framePosition: { x, y },
            frameSize: updatedFrameSize,
          },
        };
        return {
          element: {
            ...element,
            // Keep the base frame in sync with the active frame effect
            // so visualizer `Rect {...element.frame}` reflects the same size/position.
            frame: element.frame
              ? {
                  ...element.frame,
                  rotation: object.angle,
                  size: updatedFrameSize,
                  x,
                  y,
                }
              : element.frame,
            frameEffects: (element.frameEffects || []).map((fe: any) =>
              (fe as { id?: string }).id === (currentFrameEffect as { id?: string })?.id
                ? {
                    ...fe,
                    props: {
                      ...fe.props,
                      framePosition: { x, y },
                      frameSize: updatedFrameSize,
                    },
                  }
                : fe
            ),
          },
        };
      }
      const frame = element.frame!;
      return {
        element: {
          ...element,
          frame: {
            ...frame,
            rotation: object.angle,
            size: updatedFrameSize,
            x,
            y,
          },
        },
      };
    }

    // Use Fabric's actual displayed size so live player matches canvas after resize+move
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
          rotation: object.angle,
          width,
          height,
          x,
          y,
        },
      },
    };
  },
};
