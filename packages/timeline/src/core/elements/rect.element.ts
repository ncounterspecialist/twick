import { RectProps, Size } from "../../types";
import { TrackElement } from "./base.element";
import { ElementVisitor } from "../visitor/element-visitor";
import { TIMELINE_ELEMENT_TYPE } from "../../utils/constants";

export class RectElement extends TrackElement {
  protected declare props: RectProps;

  constructor(fill: string, size: Size) {
    super(TIMELINE_ELEMENT_TYPE.RECT);
    this.props = {
      width: size.width,
      height: size.height,
      fill,
      radius: 0,
      strokeColor: fill,
      lineWidth: 1  
    };
  }

  getFill(): string {
    return this.props.fill;
  }

  setFill(fill: string) {
    this.props.fill = fill;
    return this;
  }

  getSize(): Size {
    return { width: this.props.width, height: this.props.height };
  }

  getCornerRadius(): number {
    return this.props.radius;
  }

  getStrokeColor(): string {
    return this.props.strokeColor || this.props.fill;
  }

  getLineWidth(): number {
    return this.props.lineWidth ?? 0;
  }

  setSize(size: Size) {
    this.props.width = size.width;
    this.props.height = size.height;
    return this;
  }

  setCornerRadius(cornerRadius: number) {
    this.props.radius = cornerRadius;
    return this;
  }

  setStrokeColor(strokeColor: string) {
    this.props.strokeColor = strokeColor;
    return this;
  }

  setLineWidth(lineWidth: number) {
    this.props.lineWidth = lineWidth;
    return this;
  }

  accept<T>(visitor: ElementVisitor<T>): T {
    return visitor.visitRectElement(this);
  }
}
