import { getAudioDuration } from "@twick/media-utils";
import { BaseTimelineElement } from "./base.element";
import { AudioProps } from "../types";

export class AudioElement extends BaseTimelineElement {
  protected mediaDuration!: number;
  protected declare props: AudioProps;

  constructor(src: string) {
    super("audio");
    this.props = {
      src,
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

  override toJSON() {
    return {
      ...super.toJSON(),
      props: this.props,
      mediaDuration: this.mediaDuration,
    };
  }
}
