import { TextAlign, TextEffect, TextProps } from "../types";
import { BaseTimelineElement } from "./base.element";

export class TextElement extends BaseTimelineElement{
    protected textEffect?: TextEffect;
    protected declare props: TextProps;

    constructor(text: string) {
        super("text");
        this.props = {
            text,
        };
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

    setTextEffect(textEffect: TextEffect) {
        this.textEffect = textEffect;
        return this;
    }


    setTextAlign(textAlign: TextAlign) {
        this.props.textAlign = textAlign;
        return this;
    }
  
    override toJSON() {
        return {
            ...super.toJSON(),
            props: this.props,
            textEffect: this.textEffect,
        };
    }
}