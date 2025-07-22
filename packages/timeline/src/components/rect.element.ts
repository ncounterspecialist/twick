import { RectProps, Size } from "../types";
import { BaseTimelineElement } from "./base.element";

export class RectElement extends BaseTimelineElement{
    protected declare props: RectProps;

    constructor(fill:string, size: Size) {
        super("rect");  
        this.props = {
            width: size.width,
            height: size.height,
            fill,
        };
    }

    setFill(fill: string) {     
        this.props.fill = fill;
        return this;
    }

    setSize(size: Size) {
        this.props.width = size.width;
        this.props.height = size.height;
        return this;
    }

    override toJSON() {
        return {
            ...super.toJSON(),
            props: this.props,
        };
    }
}