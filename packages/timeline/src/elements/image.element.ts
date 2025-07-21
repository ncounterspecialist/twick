import { getObjectFitSize, getImageDimensions } from "@twick/media-utils";
import { Frame, FrameEffect, ImageProps, ObjectFit, Size } from "../types";
import { BaseTimelineElement } from "./base.element";

export class ImageElement extends BaseTimelineElement {
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
}
