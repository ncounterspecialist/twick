import { getObjectFitSize, getVideoMeta } from "@twick/media-utils";
import { Frame, ObjectFit, Position, Size, VideoProps } from "../../types";
import { TrackElement } from "./base.element";
import type { ElementVisitor } from "../visitor/element-visitor";
import { TIMELINE_ELEMENT_TYPE } from "../../utils/constants";
import { ElementFrameEffect } from "../addOns/frame-effect";

export class VideoElement extends TrackElement {
  protected baseSize!: Size;
  protected mediaDuration!: number;
  protected parentSize: Size;
  protected backgroundColor!: string;
  protected objectFit: ObjectFit;
  protected frameEffects?: ElementFrameEffect[];
  protected frame!: Frame;
  protected declare props: VideoProps;

  constructor(src: string, parentSize: Size) {
    super(TIMELINE_ELEMENT_TYPE.VIDEO);
    this.objectFit = "cover";
    this.frameEffects = [];
    this.parentSize = parentSize;
    this.props = {
      src,
      playbackRate: 1,
      time: 0,
      mediaFilter: "none",
      volume: 1,
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

  getMediaDuration() {
    return this.mediaDuration;
  }

  getStartAt(): number {
    return this.props.time || 0;
  }

  getEndAt(): number {
    return this.getDuration() * this.getPlaybackRate();
  }

  getSrc(): string {
    return this.props.src;
  }

  getPlaybackRate(): number {
    return this.props.playbackRate ?? 1;
  }

  override getPosition(): Position {
    return {
      x: this.frame.x ?? 0,
      y: this.frame.y ?? 0
    };
  }


  async updateVideoMeta(updateFrame: boolean = true) {
    const meta = await getVideoMeta(this.props.src);

    if (updateFrame) {
      const baseSize = getObjectFitSize(
        "contain",
        { width: meta.width, height: meta.height },
        this.parentSize
      );
      this.frame = {
        ...this.frame,
        size: [baseSize.width, baseSize.height],
      };
    }
    this.mediaDuration = meta.duration;
  }

  override setPosition(position: Position) {
    this.frame.x = position.x;
    this.frame.y = position.y;
    return this;
  }

  async setSrc(src: string) {
    this.props.src = src;
    await this.updateVideoMeta();
    return this;
  }

  setMediaDuration(mediaDuration: number) {
    this.mediaDuration = mediaDuration;
    return this;
  }

  setParentSize(parentSize: Size) {
    this.parentSize = structuredClone(parentSize);
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

  setPlaybackRate(playbackRate: number) {
    this.props.playbackRate = playbackRate;
    return this;
  }

  setStartAt(time: number) {
    this.props.time = Math.max(0, time);
    return this;
  }

  setMediaFilter(mediaFilter: string) {
    this.props.mediaFilter = mediaFilter;
    return this;
  }

  setVolume(volume: number) {
    this.props.volume = volume;
    return this;
  }

  setBackgroundColor(backgroundColor: string) {
    this.backgroundColor = backgroundColor;
    return this;
  }

  override setProps(props: Omit<any, "src">) {
    this.props = {
      ...structuredClone(props),
      src: this.props.src,
    };
    return this;
  }

  setFrameEffects(frameEffects?: ElementFrameEffect[]) {
    this.frameEffects = frameEffects;
    return this;
  }

  addFrameEffect(frameEffect: ElementFrameEffect) {
    this.frameEffects?.push(frameEffect);
    return this;
  }

  accept<T>(visitor: ElementVisitor<T>): T {
    return visitor.visitVideoElement(this);
  }
}
