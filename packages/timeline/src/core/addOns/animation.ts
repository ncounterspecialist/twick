import { Animation } from "../../types";

export class ElementAnimation {
  private name: string;
  private interval?: number;
  private intensity?: number;
  private animate?: "enter" | "exit" | "both";
  private mode?: "in" | "out";
  private direction?: "up" | "down" | "left" | "right" | "center";

  constructor(name: string) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  getInterval() {
    return this.interval;
  } 

  getIntensity() {
    return this.intensity;
  }

  getAnimate() {
    return this.animate;
  }

  getMode() {
    return this.mode;
  }

  getDirection() {
    return this.direction;
  }

  setInterval(interval?: number) {
    this.interval = interval;
  }

  setIntensity(intensity?: number) {
    this.intensity = intensity;
  }

  setAnimate(animate?: "enter" | "exit" | "both") {
    this.animate = animate;
  }

  setMode(mode?: "in" | "out") {
    this.mode = mode;
  }

  setDirection(direction?: "up" | "down" | "left" | "right" | "center") {
    this.direction = direction;
  }

  toJSON(): Animation {
    return {
      name: this.name,
      interval: this.interval,
      intensity: this.intensity,
      animate: this.animate,
      mode: this.mode,
      direction: this.direction,
    };
  }

  static fromJSON(json: Animation) {
    const animation = new ElementAnimation(json.name);
    animation.setInterval(json.interval);
    animation.setIntensity(json.intensity);
    animation.setAnimate(json.animate);
    animation.setMode(json.mode);
    animation.setDirection(json.direction);
    return animation;
  };
}


