import { Timeline } from "../types";
import { BaseTimelineElement } from "./base.element";

export class TimelineTrack {
    protected id: string;
    protected name: string;
    protected type: string;
    protected elements: BaseTimelineElement[];

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
        this.type = "element";
        this.elements = [];
    }

    getId(): string {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getElements(): BaseTimelineElement[] {
        return this.elements;
    }

    setName(name: string) {
        this.name = name;
        return this;
    }

    addElement(element: BaseTimelineElement) {
        this.elements.push(element);
        return this;
    }

    removeElement(element: BaseTimelineElement) {
        this.elements = this.elements.filter((e) => e !== element);
        return this;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            type: this.type,
        };
    }
}