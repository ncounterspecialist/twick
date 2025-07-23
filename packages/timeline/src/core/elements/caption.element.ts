import { BaseTimelineElement } from "./base.element";
import type { ElementVisitor } from "../visitor/element-visitor";

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

  accept<T>(visitor: ElementVisitor<T>): T {
    return visitor.visitCaptionElement(this);
  }

  static fromJSON(json: any): CaptionElement {
    const element = new CaptionElement(json.t, json.s, json.e);
    element.props = json.props || {};
    if (json.id) element.id = json.id;
    if (json.timelineId) element.timelineId = json.timelineId;
    return element;
  }
}
