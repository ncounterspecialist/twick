import { TrackElement } from "./base.element";
import type { ElementVisitor } from "../visitor/element-visitor";
import { TIMELINE_ELEMENT_TYPE } from "../../utils/constants";

export class CaptionElement extends TrackElement {
  protected t: string;

  constructor(t: string, start: number, end: number) {
    super(TIMELINE_ELEMENT_TYPE.CAPTION);
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

  accept<T>(visitor: ElementVisitor<T>): T {
    return visitor.visitCaptionElement(this);
  }

}
