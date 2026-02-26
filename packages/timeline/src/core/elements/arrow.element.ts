import { ArrowProps, Size } from "../../types";
import { TrackElement } from "./base.element";
import type { ElementVisitor } from "../visitor/element-visitor";
import { TIMELINE_ELEMENT_TYPE } from "../../utils/constants";

export class ArrowElement extends TrackElement {
  protected declare props: ArrowProps;

  constructor(fill: string, size: Size) {
    super(TIMELINE_ELEMENT_TYPE.ARROW);
    this.props = {
      fill,
      width: size.width,
      height: size.height,
      lineWidth: 4,
    };
  }

  accept<T>(visitor: ElementVisitor<T>): T {
    return visitor.visitArrowElement(this);
  }
}
