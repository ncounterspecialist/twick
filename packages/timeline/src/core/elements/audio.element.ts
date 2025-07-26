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
      playbackRate: 1,
      volume: 1,
      loop: false,
    };
  }

  getMediaDuration() {
    return this.mediaDuration;
  }

  async updateAudioMeta() {
    const meta = await getAudioDuration(this.props.src);
    this.mediaDuration = meta.duration;
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
    this.props.time = time;
    return this;
  }

  setPlaybackRate(playbackRate: number) {
    this.props.playbackRate = playbackRate;
    return this;
  }

  accept<T>(visitor: ElementVisitor<T>): T {
    return visitor.visitAudioElement(this);
  }
  
}
