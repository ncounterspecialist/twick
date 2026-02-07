/**
 * Text watermark renderer for the visualizer.
 * Renders text overlay with position, rotation, opacity, and text styling.
 */

import { Txt } from "@twick/2d";
import { createRef, waitFor } from "@twick/core";
import type { WatermarkRendererContract } from "../helpers/watermark.types";

export const TextWatermarkRenderer: WatermarkRendererContract = {
  name: "text",

  *render({ view, watermark, duration }) {
    const props = watermark.props;
    if (!props?.text) return;

    const position = watermark.position ?? { x: 0, y: 0 };
    const rotation = (watermark.rotation ?? 0) * (Math.PI / 180);
    const opacity = watermark.opacity ?? 1;

    const watermarkRef = createRef<any>();
    view.add(
      <Txt
        ref={watermarkRef}
        text={props.text}
        x={position.x}
        y={position.y}
        rotation={rotation}
        opacity={opacity}
        fontSize={props.fontSize ?? 24}
        fontFamily={props.fontFamily ?? "Arial"}
        fill={props.fill ?? "#ffffff"}
        stroke={props.stroke}
        lineWidth={props.lineWidth ?? props.strokeWidth ?? 0}
        textAlign={(props.textAlign as any) ?? "center"}
        fontWeight={props.fontWeight ?? 400}
        fontStyle={props.fontStyle ?? "normal"}
      />
    );

    yield* waitFor(duration);
  },
};
