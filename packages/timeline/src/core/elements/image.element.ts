import { getObjectFitSize, getImageDimensions } from "@twick/media-utils";
import { Frame, FrameEffect, ImageProps, ObjectFit, Size } from "../../types";
import { TrackElement } from "./base.element";
import type { ElementVisitor } from "../visitor/element-visitor";
import { TIMELINE_ELEMENT_TYPE } from "../../utils/constants";

export class ImageElement extends TrackElement {
  protected backgroundColor!: string;
  protected parentSize: Size;
  protected objectFit: ObjectFit;
  frameEffects?: FrameEffect[];
  frame!: Frame;
  protected declare props: ImageProps;

  constructor(src: string, parentSize: Size) {
    super(TIMELINE_ELEMENT_TYPE.IMAGE);
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

  async updateImageMeta(updateFrame: boolean = true) {
    const meta = await getImageDimensions(this.props.src);
    if (updateFrame) {
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
  }

  async setSrc(src: string) {
    this.props.src = src;
    await this.updateImageMeta();
    return this;
  }

  setObjectFit(objectFit: ObjectFit) {
    this.objectFit = objectFit;
    return this;
  }

  setFrame(frame: Frame) {
    this.frame = structuredClone(frame);
    return this;
  }

  setParentSize(parentSize: Size) {
    this.parentSize = structuredClone(parentSize);
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

  override setProps(props: Omit<any, "src">) {
    this.props = {...structuredClone(props), src: this.props.src};
    return this;
  }

  setFrameEffects(frameEffects? : FrameEffect[]) {
    this.frameEffects = frameEffects?.map(frameEffect => structuredClone(frameEffect));
    return this;
  }

  addFrameEffect(frameEffect: FrameEffect) {
    this.frameEffects?.push(structuredClone(frameEffect));
    return this;
  }

  accept<T>(visitor: ElementVisitor<T>): T {
    return visitor.visitImageElement(this);
  }

}
