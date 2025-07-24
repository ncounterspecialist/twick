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

  override toJSON() {
    return {
      ...super.toJSON(),
      props: this.props,
    };
  }

  static fromJSON(json: any): CircleElement {
    const element = new CircleElement(json.props.fill, json.props.radius);
    element.props = json.props;
    if (json.id) element.id = json.id;
    if (json.trackId) element.trackId = json.trackId;
    if (json.s !== undefined) element.s = json.s;
    if (json.e !== undefined) element.e = json.e;
    return element;
  }

  accept<T>(visitor: ElementVisitor<T>): T {
    return visitor.visitCircleElement(this);
  }
}
