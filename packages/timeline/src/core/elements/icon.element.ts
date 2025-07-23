import { IconProps, Size } from "../../types";
import { BaseTimelineElement } from "./base.element";
import type { ElementVisitor } from "../visitor/element-visitor";

export class IconElement extends BaseTimelineElement {
    protected declare props: IconProps;
  constructor(src: string, size: Size) {
    super("icon");
    this.props = {
      src,
      size,
    };
  }

  override toJSON() {
    return {
      ...super.toJSON(),
      props: this.props,
    };
  }

  static fromJSON(json: any): IconElement {
    const element = new IconElement(json.props.src, json.props.size);
    element.props = json.props;
    if (json.id) element.id = json.id;
    if (json.timelineId) element.timelineId = json.timelineId;
    if (json.s !== undefined) element.s = json.s;
    if (json.e !== undefined) element.e = json.e;
    return element;
  }

  accept<T>(visitor: ElementVisitor<T>): T {
      return visitor.visitIconElement(this);
  }
}
