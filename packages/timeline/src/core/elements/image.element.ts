import { getObjectFitSize, getImageDimensions } from "@twick/media-utils";
import { Frame, FrameEffect, ImageProps, ObjectFit, Size } from "../../types";
import { TrackElement } from "./base.element";
import type { ElementVisitor } from "../visitor/element-visitor";

export class ImageElement extends TrackElement {
  protected backgroundColor!: string;
  protected parentSize: Size;
  protected objectFit: ObjectFit;
  frameEffects?: FrameEffect[];
  frame!: Frame;
  protected declare props: ImageProps;

  constructor(src: string, parentSize: Size) {
    super("image");
    this.parentSize = parentSize;
    this.objectFit = "cover";
    this.frameEffects = [];
    this.props = {
      src,
      mediaFilter: "none",
    };
  }

  getParentSize() {
    return this.parentSize;
  }

  getFrame() {
    return this.frame;
  }

  getFrameEffects() {
    return this.frameEffects;
  } 

  getBackgroundColor() {
    return this.backgroundColor;
  }

  getObjectFit() {
    return this.objectFit;
  }

  async updateImageMeta() {
    const meta = await getImageDimensions(this.props.src);
    const baseSize = getObjectFitSize(
      "contain",
      { width: meta.width, height: meta.height },
      this.parentSize
    );
    this.frame = {
        size: [baseSize.width, baseSize.height],
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

  setParentSize(parentSize: Size) {
    this.parentSize = parentSize;
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

  setFrameEffects(frameEffects? : FrameEffect[]) {
    this.frameEffects = frameEffects;
    return this;
  }

  addFrameEffect(frameEffect: FrameEffect) {
    this.frameEffects?.push(frameEffect);
    return this;
  }

  accept<T>(visitor: ElementVisitor<T>): T {
    return visitor.visitImageElement(this);
  }

}
