import { TrackElement } from "./base.element";
import type { ElementVisitor } from "../visitor/element-visitor";

export class CaptionElement extends TrackElement {
  protected t: string;

  constructor(t: string, start: number, end: number) {
    super("caption");
    this.t = t;
    this.s = start;
    this.e = end;
  }

  getText(): string {
    return this.t;
  }

  setText(t: string) {
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
    if (json.trackId) element.trackId = json.trackId;
    return element;
  }
}
