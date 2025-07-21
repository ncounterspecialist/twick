import { BaseTimelineElement } from "./base.element";

export class CaptionElement extends BaseTimelineElement {
  protected t: string;

  constructor(t: string, start: number, end: number) {
    super("caption");
    this.t = t;
    this.s = start;
    this.e = end;
  }

  getCaption(): string {
    return this.t;
  }

  setCaption(t: string) {
    this.t = t;
  }
  
  override toJSON() {
    return {
      ...super.toJSON(),
      t: this.t,
    };
  }
}
