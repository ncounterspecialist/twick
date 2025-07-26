import { TrackElement } from "./base.element";
import type { ElementVisitor } from "../visitor/element-visitor";
import { CircleProps } from "../../types";

export class CircleElement extends TrackElement {
  protected declare props: CircleProps;
  constructor(fill: string, radius: number) {
    super("circle");
    this.props = {
      radius,
      fill,
    };
  }

  getFill(): string {
    return this.props.fill;
  }

  getRadius(): number {
    return this.props.radius;
  }

  setFill(fill: string) {
    this.props.fill = fill;
    return this;
  }

  setRadius(radius: number) {
    this.props.radius = radius;
    return this;
  }
  

  accept<T>(visitor: ElementVisitor<T>): T {
    return visitor.visitCircleElement(this);
  }
}
