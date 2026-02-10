import type { CanvasElementHandler } from "../types";
import { addVideoElement, addBackgroundColor } from "../components/elements";
import { convertToVideoPosition, convertToVideoDimensions, getObjectCanvasCenter, getObjectCanvasAngle } from "../helpers/canvas.util";
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
    const canvasCenter = getObjectCanvasCenter(object);
    const { x, y } = convertToVideoPosition(
      canvasCenter.x,
      canvasCenter.y,
      context.canvasMetadata,
      context.videoSize
    );
    const scaledW = (object.width ?? 0) * (object.scaleX ?? 1);
    const scaledH = (object.height ?? 0) * (object.scaleY ?? 1);
    const { width: fw, height: fh } = convertToVideoDimensions(
      scaledW,
      scaledH,
      context.canvasMetadata
    );
    const updatedFrameSize: [number, number] = [fw, fh];
    const currentFrameEffect = context.elementFrameMapRef.current[element.id];

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
          rotation: getObjectCanvasAngle(object),
          size: updatedFrameSize,
          x,
          y,
        },
      },
    };
  },
};
