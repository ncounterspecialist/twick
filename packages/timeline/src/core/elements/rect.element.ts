import { RectProps, Size } from "../../types";
import { TrackElement } from "./base.element";
import { ElementVisitor } from "../visitor/element-visitor";

export class RectElement extends TrackElement{
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

    accept<T>(visitor: ElementVisitor<T>): T {
        return visitor.visitRectElement(this);
    }
}