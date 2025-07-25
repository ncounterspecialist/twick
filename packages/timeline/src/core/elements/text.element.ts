import { TextAlign, TextEffect, TextProps } from "../../types";
import { TrackElement } from "./base.element";
import type { ElementVisitor } from "../visitor/element-visitor";

export class TextElement extends TrackElement {
  protected textEffect?: TextEffect;
  protected declare props: TextProps;

  constructor(text: string) {
    super("text");
    this.props = {
      text,
      fill: "#888888" //default-grey
    };
  }

  getTextEffect() {
    return this.textEffect;
  }

  getText(): string {
    return this.props.text;
  }

  setText(text: string) {
    this.props.text = text;
    return this;
  }

  setFill(fill: string) {
    this.props.fill = fill;
    return this;
  }

  setRotation(rotation: number) {
    this.props.rotation = rotation;
    return this;
  }

  setFontSize(fontSize: number) {
    this.props.fontSize = fontSize;
    return this;
  }

  setFontFamily(fontFamily: string) {
    this.props.fontFamily = fontFamily;
  }

  setFontWeight(fontWeight: number) {
    this.props.fontWeight = fontWeight;
    return this;
  }

  setFontStyle(fontStyle: "normal" | "italic") {
    this.props.fontStyle = fontStyle;
  }

  setTextEffect(textEffect?: TextEffect) {
    this.textEffect = textEffect;
    return this;
  }

  setTextAlign(textAlign: TextAlign) {
    this.props.textAlign = textAlign;
    return this;
  }

  accept<T>(visitor: ElementVisitor<T>): T {
    return visitor.visitTextElement(this);
  }
}
