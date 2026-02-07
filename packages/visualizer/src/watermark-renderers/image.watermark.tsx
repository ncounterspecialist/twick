/**
 * Image watermark renderer for the visualizer.
 * Renders image overlay with position, rotation, opacity, and dimensions.
 */

import { Img } from "@twick/2d";
import { createRef, waitFor } from "@twick/core";
import type { WatermarkRendererContract } from "../helpers/watermark.types";

export const ImageWatermarkRenderer: WatermarkRendererContract = {
  name: "image",

  *render({ view, watermark, duration }) {
    const props = watermark.props;
    if (!props?.src) return;

    const position = watermark.position ?? { x: 0, y: 0 };
    const rotation = (watermark.rotation ?? 0) * (Math.PI / 180);
    const opacity = watermark.opacity ?? 1;

    const watermarkRef = createRef<any>();
    view.add(
      <Img
        ref={watermarkRef}
        src={props.src}
        x={position.x}
        y={position.y}
        width={props.width}
        height={props.height}
        rotation={rotation}
        opacity={opacity}
      />
    );

    yield* waitFor(duration);
  },
};
