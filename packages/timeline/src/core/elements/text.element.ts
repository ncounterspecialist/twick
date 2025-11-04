import { TextAlign, TextProps } from "../../types";
import { TrackElement } from "./base.element";
import type { ElementVisitor } from "../visitor/element-visitor";
import { TIMELINE_ELEMENT_TYPE } from "../../utils/constants";
import { ElementTextEffect } from "../addOns/text-effect";

export class TextElement extends TrackElement {
  protected textEffect?: ElementTextEffect;
  protected declare props: TextProps;

  constructor(text: string, props?: Omit<TextProps, 'text'>) {
    super(TIMELINE_ELEMENT_TYPE.TEXT);
    this.props = {
      text,
      fill: "#888888", //default-grey,
      ...(props || {})
    };
  }

  getTextEffect() {
    return this.textEffect;
  }

  getText(): string {
    return this.props.text;
  }

  getStrokeColor() {
    return this.props.stroke;
  }

  getLineWidth() {
    return this.props.lineWidth;
  }

  getProps(): TextProps {
    return this.props;
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
      return this;
  }

  setFontWeight(fontWeight: number) {
    this.props.fontWeight = fontWeight;
    return this;
  }

  setFontStyle(fontStyle: "normal" | "italic") {
    this.props.fontStyle = fontStyle;
    return this;
  }

  setTextEffect(textEffect?: ElementTextEffect) {
    this.textEffect = textEffect;
    return this;
  }

  setTextAlign(textAlign: TextAlign) {
    this.props.textAlign = textAlign;
    return this;
  }

  setStrokeColor(stroke: string) {
    this.props.stroke = stroke;
    return this;
  }

  setLineWidth(lineWidth: number) {
    this.props.lineWidth = lineWidth;
    return this;
  }

  setProps(props: TextProps) {
    this.props = structuredClone(props);
    return this;
  }

  accept<T>(visitor: ElementVisitor<T>): T {
    return visitor.visitTextElement(this);
  }
}
