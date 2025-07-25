import { getObjectFitSize, getVideoMeta } from "@twick/media-utils";
import { Frame, FrameEffect, ObjectFit, Size, VideoProps } from "../../types";
import { TrackElement } from "./base.element";
import type { ElementVisitor } from "../visitor/element-visitor";

export class VideoElement extends TrackElement {
  protected baseSize!: Size;
  protected mediaDuration!: number;
  protected parentSize: Size;
  protected backgroundColor!: string;
  protected objectFit: ObjectFit;
  protected frameEffects?: FrameEffect[];
  protected frame!: Frame;
  protected declare props: VideoProps;

  constructor(src: string, parentSize: Size) {
    super("video");
    this.objectFit = "cover";
    this.frameEffects = [];
    this.parentSize = parentSize;
    this.props = {
      src,
      play: true,
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

  async updateVideoMeta() {
    const meta = await getVideoMeta(this.props.src);
    const baseSize = getObjectFitSize(
      "contain",
      { width: meta.width, height: meta.height },
      this.parentSize
    );
    this.frame = {
        size: [baseSize.width, baseSize.height],
        ...this.frame,
    }
    this.mediaDuration = meta.duration;
  }

  setMediaDuration(mediaDuration: number) {
    this.mediaDuration = mediaDuration;
    return this;
  }

  override setStart(s: number) {
    this.s = s;
    this.e = this.s + (this.mediaDuration ?? 1);
    return this;
  }

  setParentSize(parentSize: Size) {
    this.parentSize = parentSize;
    return this;
  }

  setObjectFit(objectFit: ObjectFit) {
    this.objectFit = objectFit;
    return this;
  }

  setFrame(frame: Frame) {
    this.frame = frame;
    return this;
  }

  setPlay(play: boolean) {
    this.props.play = play;
    return this;
  }

  setPlaybackRate(playbackRate: number) {
    this.props.playbackRate = playbackRate;
    return this;
  }

  setStartAt(time: number) {
    this.props.time = time;
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

  setProps(props: Omit<any, "src">) {
    this.props = { ...this.props, ...props };
    return this;
  }

  setFrameEffects(frameEffects?: FrameEffect[]) {
    this.frameEffects = frameEffects;
    return this;
  }

  addFrameEffect(frameEffect: FrameEffect) {
    this.frameEffects?.push(frameEffect);
    return this;
  }

  accept<T>(visitor: ElementVisitor<T>): T {
    return visitor.visitVideoElement(this);
  }

}
