import { RectProps, Size } from "../../types";
import { BaseTimelineElement } from "./base.element";
import { ElementVisitor } from "../visitor/element-visitor";

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

    static fromJSON(json: any): RectElement {
        const element = new RectElement(json.props.fill, { width: json.props.width, height: json.props.height });
        element.props = json.props;
        if (json.id) element.id = json.id;
        if (json.timelineId) element.timelineId = json.timelineId;
        if (json.s !== undefined) element.s = json.s;
        if (json.e !== undefined) element.e = json.e;
        return element;
    }

    accept<T>(visitor: ElementVisitor<T>): T {
        return visitor.visitRectElement(this);
    }
}