import { getAudioDuration } from "@twick/media-utils";
import { TrackElement } from "./base.element";
import type { ElementVisitor } from "../visitor/element-visitor";
import { AudioProps } from "../../types";

export class AudioElement extends TrackElement {
  protected mediaDuration!: number;
  protected declare props: AudioProps;

  constructor(src: string) {
    super("audio");
    this.props = {
      src,
      time: 0,
      play: true,
      playbackRate: 1,
      volume: 1,
      loop: false,
    };
  }

  getMediaDuration() {
    return this.mediaDuration;
  }

  getStartAt(): number {
    return this.props.time || 0;
  }

  async updateAudioMeta() {
    this.mediaDuration = await getAudioDuration(this.props.src);
  }

  async setSrc(src: string) {
    this.props.src = src;
    await this.updateAudioMeta();
    return this;
  }

  setMediaDuration(mediaDuration: number) {
    this.mediaDuration = mediaDuration;
    return this;
  }

  setVolume(volume: number) {
    this.props.volume = volume;
    return this;
  }

  setLoop(loop: boolean) {
    this.props.loop = loop;
    return this;
  }

  setStartAt(time: number) {
    this.props.time = Math.max(0, time);
    return this;
  }

  setPlaybackRate(playbackRate: number) {
    this.props.playbackRate = playbackRate;
    return this;
  }

  override setProps(props: Omit<any, "src">) {
    this.props = {
      play: this.props.play,
      ...structuredClone(props),
      src: this.props.src,
    };
    return this;
  }

  accept<T>(visitor: ElementVisitor<T>): T {
    return visitor.visitAudioElement(this);
  }
}
