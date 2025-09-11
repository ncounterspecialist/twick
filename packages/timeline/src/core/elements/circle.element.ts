import { TrackElement } from "./base.element";
import type { ElementVisitor } from "../visitor/element-visitor";
import { CircleProps } from "../../types";
import { TIMELINE_ELEMENT_TYPE } from "../../utils/constants";

export class CircleElement extends TrackElement {
  protected declare props: CircleProps;
  constructor(fill: string, radius: number) {
    super(TIMELINE_ELEMENT_TYPE.CIRCLE);
    this.props = {
      radius,
      fill,
      strokeColor: fill,
      lineWidth: 1
    };
  }

  getFill(): string {
    return this.props.fill;
  }

  getRadius(): number {
    return this.props.radius;
  }

  getStrokeColor(): string {
    return this.props.strokeColor || this.props.fill;
  }

  getLineWidth(): number {
    return this.props.lineWidth ?? 0;
  }

  setFill(fill: string) {
    this.props.fill = fill;
    return this;
  }

  setRadius(radius: number) {
    this.props.radius = radius;
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
    return visitor.visitCircleElement(this);
  }
}
