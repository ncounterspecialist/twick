import { TrackElement } from "./base.element";
import type { ElementVisitor } from "../visitor/element-visitor";
import { IconProps, Size } from "../../types";
import { TIMELINE_ELEMENT_TYPE } from "../../utils/constants";

export class IconElement extends TrackElement {
    protected declare props: IconProps;
  constructor(src: string, size: Size) {
    super(TIMELINE_ELEMENT_TYPE.ICON);
    this.props = {
      src,
      size,
    };
  }

  getSrc(): string {
    return this.props.src;
  } 

  setSrc(src: string) {
    this.props.src = src;
    return this;
  }

  accept<T>(visitor: ElementVisitor<T>): T {
      return visitor.visitIconElement(this);
  }
}
