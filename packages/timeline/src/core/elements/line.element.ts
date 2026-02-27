import { LineProps, Size } from "../../types";
import { TrackElement } from "./base.element";
import type { ElementVisitor } from "../visitor/element-visitor";
import { TIMELINE_ELEMENT_TYPE } from "../../utils/constants";

/**
 * LineElement represents a simple line/segment shape.
 *
 * Semantics:
 * - props.width  → visual length of the line
 * - props.height → visual thickness of the line
 * - props.fill   → line color
 * - props.radius → roundedness of the caps (handled by canvas/visualizer)
 */
export class LineElement extends TrackElement {
  protected declare props: LineProps;

  constructor(fill: string, size: Size) {
    super(TIMELINE_ELEMENT_TYPE.LINE);
    this.props = {
      fill,
      width: size.width,
      height: size.height,
      radius: 4,
      lineWidth: size.height,
    };
  }

  accept<T>(visitor: ElementVisitor<T>): T {
    return visitor.visitLineElement(this);
  }
}

