import { CircleProps } from "../types";
import { BaseTimelineElement } from "./base.element";

export class CircleElement extends BaseTimelineElement {
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

  override toJSON() {
    return {
      ...super.toJSON(),
      props: this.props,
    };
  }
}
