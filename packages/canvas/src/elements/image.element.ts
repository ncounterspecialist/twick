import type { CanvasElementHandler } from "../types";
import { addImageElement, addBackgroundColor } from "../components/elements";
import { convertToVideoPosition } from "../helpers/canvas.util";
import { ELEMENT_TYPES } from "../helpers/constants";

export const ImageElement: CanvasElementHandler = {
  name: ELEMENT_TYPES.IMAGE,

  async add(params) {
    const { element, index, canvas, canvasMetadata } = params;
    await addImageElement({
      element,
      index,
      canvas,
      canvasMetadata,
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
      let updatedFrameSize: [number, number];
      if (currentFrameEffect) {
        updatedFrameSize = [
          currentFrameEffect.props.frameSize![0] * object.scaleX,
          currentFrameEffect.props.frameSize![1] * object.scaleY,
        ];
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
      updatedFrameSize = [
        (frame.size![0] ?? 0) * object.scaleX,
        (frame.size![1] ?? 0) * object.scaleY,
      ];
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
