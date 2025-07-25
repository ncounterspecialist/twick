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

  async updateAudioMeta() {
    const meta = await getAudioDuration(this.props.src);
    this.mediaDuration = meta.duration;
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

  override toJSON() {
    return {
      ...super.toJSON(),
      props: this.props,
      mediaDuration: this.mediaDuration,
    };
  }

  static fromJSON(json: any): AudioElement {
    const element = new AudioElement(json.props.src);
    element.mediaDuration = json.mediaDuration;
    element.props = json.props;
    return element;
  }

  accept<T>(visitor: ElementVisitor<T>): T {
    return visitor.visitAudioElement(this);
  }
  
}
