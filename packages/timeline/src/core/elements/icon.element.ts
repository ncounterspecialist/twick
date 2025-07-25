import { TrackElement } from "./base.element";
import type { ElementVisitor } from "../visitor/element-visitor";
import { IconProps, Size } from "../../types";

export class IconElement extends TrackElement {
    protected declare props: IconProps;
  constructor(src: string, size: Size) {
    super("icon");
    this.props = {
      src,
      size,
    };
  }

  accept<T>(visitor: ElementVisitor<T>): T {
      return visitor.visitIconElement(this);
  }
}
