import type { CanvasElementHandler } from "../types";
import { addVideoElement, addBackgroundColor } from "../components/elements";
import { convertToVideoPosition } from "../helpers/canvas.util";
import { ELEMENT_TYPES } from "../helpers/constants";

export const VideoElement: CanvasElementHandler = {
  name: ELEMENT_TYPES.VIDEO,

  async add(params) {
    const {
      element,
      index,
      canvas,
      canvasMetadata,
      seekTime = 0,
      elementFrameMapRef,
      getCurrentFrameEffect: getFrameEffect,
    } = params;
    if (!getFrameEffect || !elementFrameMapRef) return;

    const currentFrameEffect = getFrameEffect(element, seekTime);
    elementFrameMapRef.current[element.id] = currentFrameEffect;

    const snapTime =
      (seekTime - (element?.s ?? 0)) * (element?.props?.playbackRate ?? 1) +
      (element?.props?.time ?? 0);

    await addVideoElement({
      element,
      index,
      canvas,
      canvasMetadata,
      currentFrameEffect,
      snapTime,
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
  },
};
