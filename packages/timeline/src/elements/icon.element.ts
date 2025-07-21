import { IconProps, Size } from "../types";
import { BaseTimelineElement } from "./base.element";

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
}
