import { getObjectFitSize, getImageDimensions } from "@twick/media-utils";
import { Frame, FrameEffect, ImageProps, ObjectFit, Size } from "../../types";
import { TrackElement } from "./base.element";
import type { ElementVisitor } from "../visitor/element-visitor";

export class ImageElement extends TrackElement {
  protected baseSize!: Size;
  protected backgroundColor!: string;
  protected parentSize: Size;
  protected objectFit: ObjectFit;
  frameEffects?: FrameEffect[];
  frame!: Frame;
  protected declare props: ImageProps;

  constructor(src: string, parentSize: Size) {
    super("video");
    this.parentSize = parentSize;
    this.objectFit = "cover";
    this.frameEffects = [];
    this.props = {
      src,
      mediaFilter: "none",
    };
  }

  async updateImageMeta() {
    const meta = await getImageDimensions(this.props.src);
    this.baseSize = getObjectFitSize(
      "contain",
      { width: meta.width, height: meta.height },
      this.parentSize
    );
    this.frame = {
        size: [this.baseSize.width, this.baseSize.height],
        ...this.frame,
    }
  }

  setObjectFit(objectFit: ObjectFit) {
    this.objectFit = objectFit;
    return this;
  }

  setFrame(frame: Frame) {
    this.frame = frame;
    return this;
  }

  setMediaFilter(mediaFilter: string) {
    this.props.mediaFilter = mediaFilter;
    return this;
  }

  setBackgroundColor(backgroundColor: string) {
    this.backgroundColor = backgroundColor;
    return this;
  }

  setProps(props: Omit<any, "src">) {
    this.props = { ...this.props, ...props };
    return this;
  }

  addFrameEffect(frameEffect: FrameEffect) {
    this.frameEffects?.push(frameEffect);
    return this;
  }

  accept<T>(visitor: ElementVisitor<T>): T {
    return visitor.visitImageElement(this);
  }

  override toJSON() {
    return {
      ...super.toJSON(),
      objectFit: this.objectFit,
      frame: this.frame,
      props: this.props,
      frameEffects: this.frameEffects,
      backgroundColor: this.backgroundColor,
    };
  }

  static fromJSON(json: any): ImageElement {
    const parentSize = json.frame && json.frame.size ? { width: json.frame.size[0], height: json.frame.size[1] } : { width: 0, height: 0 };
    const element = new ImageElement(json.props.src, parentSize);
    element.props = json.props;
    element.objectFit = json.objectFit;
    element.frame = json.frame;
    element.frameEffects = json.frameEffects;
    element.backgroundColor = json.backgroundColor;
    if (json.id) element.id = json.id;
    if (json.trackId) element.trackId = json.trackId;
    if (json.s !== undefined) element.s = json.s;
    if (json.e !== undefined) element.e = json.e;
    return element;
  }
}
