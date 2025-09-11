import { TrackElement } from "./base.element";
import type { ElementVisitor } from "../visitor/element-visitor";
import { TIMELINE_ELEMENT_TYPE } from "../../utils/constants";
import { Size } from "../../types";

export class IconElement extends TrackElement {
  constructor(src: string, size: Size, fill: string = "#866bbf") {
    super(TIMELINE_ELEMENT_TYPE.ICON);
    this.props = {
      src: src,
      fill: fill,
      size: size,
    };
  }

  getSrc(): string {
    return this.props.src;
  } 

  getFill(): string {
    return this.props.fill;
  }

  getSize(): Size | undefined {
    return this.props.size;
  }

  setSrc(src: string) {
    this.props.src = src;
    return this;
  }

  setFill(fill: string) {
    this.props.fill = fill;
    return this;
  }

  setSize(size: Size) {
    this.props.size = size;
    return this;
  }

  accept<T>(visitor: ElementVisitor<T>): T {
      return visitor.visitIconElement(this);
  }
}
