import { TextAlign, TextEffect, TextProps } from "../types";
import { BaseTimelineElement } from "./base.element";
import type { ElementVisitor } from "./element.visitor";

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

    static fromJSON(json: any): TextElement {
        const element = new TextElement(json.props.text);
        element.props = json.props;
        element.textEffect = json.textEffect;
        if (json.id) element.id = json.id;
        if (json.timelineId) element.timelineId = json.timelineId;
        if (json.s !== undefined) element.s = json.s;
        if (json.e !== undefined) element.e = json.e;
        return element;
    }

    accept<T>(visitor: ElementVisitor<T>): T {
        return visitor.visitText(this);
    }
}