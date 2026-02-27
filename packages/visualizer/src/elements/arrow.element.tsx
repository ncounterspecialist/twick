import { ElementParams } from "../helpers/types";
import { all, createRef, waitFor } from "@twick/core";
import { Layout, Polygon, Rect } from "@twick/2d";
import { addAnimation } from "../helpers/element.utils";
import { logger } from "../helpers/log.utils";

const HEAD_OFFSET = 2;

/**
 * Arrow element: bar + triangle (callout) for the visualizer.
 * Matches canvas arrow layout: bar from left, triangle overlapping at the tip.
 */
export const ArrowElement = {
  name: "arrow",

  *create({ containerRef, element, view }: ElementParams) {
    const elementRef = createRef<any>();
    yield* waitFor(element?.s ?? 0);
    logger(`ArrowElement: ${element?.id}`);

    const w = element?.props?.width ?? 220;
    const h = element?.props?.height ?? 14;
    const fill = element?.props?.fill ?? "#f59e0b";
    const radius = element?.props?.radius ?? 4;
    const rotation = element?.props?.rotation ?? 0;
    const opacity = element?.props?.opacity ?? 1;
    const cx = element?.props?.x ?? 0;
    const cy = element?.props?.y ?? 0;

    // Match canvas triangle size: Polygon is inscribed in its size box so appears
    // smaller than Fabric’s Triangle (which fills its box). Scale up ~1.3×.
    const HEAD_SIZE_MULT = 1.8 * 1.3;
    const headSize = h * HEAD_SIZE_MULT;
    const barLength = w - headSize * 0.5 + HEAD_OFFSET;
    const barWidth = w;

    // Single group so one ref for animations
    const arrowGroup = (
      <Layout
        ref={elementRef}
        key={element?.id}
        x={cx}
        y={cy}
        rotation={rotation}
        opacity={opacity}
      >
        <Rect
          x={-barWidth / 2 + barLength / 2}
          y={0}
          width={barLength}
          height={h}
          fill={fill}
          radius={radius}
        />
        <Polygon
          x={barWidth / 2 - headSize * 0.25}
          y={0}
          width={headSize}
          height={headSize}
          sides={3}
          fill={fill}
          rotation={90}
        />
      </Layout>
    );

    yield containerRef().add(arrowGroup);

    yield* all(
      addAnimation({ elementRef, element: element!, view }),
      waitFor(Math.max(0, (element?.e ?? 0) - (element?.s ?? 0)))
    );
    yield elementRef().remove();
  },
};
