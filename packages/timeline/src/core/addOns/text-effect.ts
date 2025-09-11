import { TextEffect } from "../../types";

export class ElementTextEffect {
  private name: string;
  private duration?: number;
  private delay?: number;
  private bufferTime?: number;

  constructor(name: string) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  getDuration() {
    return this.duration;
  } 

  getDelay() {
    return this.delay;
  }

  getBufferTime() {
    return this.bufferTime;
  }

  setDuration(duration?: number) {
    this.duration = duration;
    return this;
  }

  setDelay(delay?: number) {
    this.delay = delay;
    return this;
  }

  setBufferTime(bufferTime?: number) {
    this.bufferTime = bufferTime;
    return this;
  }

  toJSON(): TextEffect {
    return {
      name: this.name,
      delay: this.delay,
      duration: this.duration ?? 1,
      bufferTime: this.bufferTime,
    };
  }

  static fromJSON(json: TextEffect) {
    const effect = new ElementTextEffect(json.name);
    effect.setDelay(json.delay);
    effect.setDuration(json.duration);
    effect.setBufferTime(json.bufferTime);
    return effect;
  };
}


