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
      }
    }
    this.mediaDuration = meta.duration;
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

   override setProps(props: Omit<any, "src">) {
    this.props = {...structuredClone(props), src: this.props.src};
    return this;
  }

  setFrameEffects(frameEffects?: FrameEffect[]) {
    this.frameEffects = frameEffects?.map(frameEffect => structuredClone(frameEffect));
    return this;
  }

  addFrameEffect(frameEffect: FrameEffect) {
    this.frameEffects?.push(structuredClone(frameEffect));
    return this;
  }

  accept<T>(visitor: ElementVisitor<T>): T {
    return visitor.visitVideoElement(this);
  }

}
