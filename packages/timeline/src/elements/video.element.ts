import { getObjectFitSize, getVideoMeta } from "@twick/media-utils";
import { Frame, FrameEffect, ObjectFit, Size, VideoProps } from "../../types";
import { BaseTimelineElement } from "./base.element";

export class VideoElement extends BaseTimelineElement {
  protected mute!: boolean;
  protected baseSize!: Size;
  protected mediaDuration!: number;
  protected backgroundColor!: string;
  protected parentSize: Size;
  protected objectFit: ObjectFit;
  protected frameEffects?: FrameEffect[];
  protected frame!: Frame;
  protected declare props: VideoProps;

  constructor(src: string, parentSize: Size) {
    super("video");
    this.parentSize = parentSize;
    this.objectFit = "cover";
    this.frameEffects = [];
    this.props = {
      src,
      play: true,
      playbackRate: 1,
      time: 0,
      mediaFilter: "none",
      volume: 1,
    };
  }

  async updateVideoMeta() {
    const meta = await getVideoMeta(this.props.src);
    this.mediaDuration = meta.duration;
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

  override setStart(s: number) {
    this.s = s;
    this.e = this.s + (this.mediaDuration ?? 1);
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
      mediaDuration: this.mediaDuration,
    };
  }
}
