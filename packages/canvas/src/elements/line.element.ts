import type { CanvasElementHandler } from "../types";
import { addRectElement } from "../components/elements";
import {
  convertToVideoPosition,
  getObjectCanvasCenter,
  getObjectCanvasAngle,
} from "../helpers/canvas.util";
import { ELEMENT_TYPES } from "../helpers/constants";

/**
 * LineElement: renders a simple line/segment using the rectangular helper.
 *
 * Semantics:
 * - props.width  → visual length of the line
 * - props.height → visual thickness of the line
 * - props.fill   → line color
 * - props.radius → roundedness of the ends (handled as rect corner radius)
 */
export const LineElement: CanvasElementHandler = {
  name: ELEMENT_TYPES.LINE,

  async add(params) {
    const { element, index, canvas, canvasMetadata, lockAspectRatio } = params;

    // Ensure the visible stroke matches the logical fill color for lines.
    // By default, generic rect helpers fall back to a black stroke, which
    // makes thin lines look black even if fill is set. For LINE we want the
    // stroke (outline) either disabled or aligned with the fill color.
    const lineProps = element.props ?? {};
    const lineElement = {
      ...element,
      props: {
        ...lineProps,
        // Use fill as stroke color when a stroke is desired; otherwise rely
        // on fill-only rendering. Avoid the generic "#000000" fallback.
        stroke: lineProps.stroke ?? lineProps.fill,
        // If a specific lineWidth is provided, keep it; otherwise default to 0
        // so the stroke does not override the visual fill color.
        lineWidth: lineProps.lineWidth ?? 0,
      },
    };

    await addRectElement({
      element: lineElement,
      index,
      canvas,
      canvasMetadata,
      lockAspectRatio: lockAspectRatio ?? lineElement.props?.lockAspectRatio,
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
    return {
      element: {
        ...element,
        props: {
          ...element.props,
          rotation: getObjectCanvasAngle(object),
          width: (element.props?.width ?? 0) * object.scaleX,
          height: (element.props?.height ?? 0) * object.scaleY,
          x,
          y,
        },
      },
    };
  },
};

