import { TimelineElement, Timeline } from "../../types";
import { BaseTimelineElement } from "../elements/base.element";
import { ElementDeserializer } from "../visitor/element-deserializer";
import { ElementSerializer } from "../visitor/element-serializer";

export class TimelineTrack {
  private id: string;
  private name: string;
  private type: string;
  private elements: BaseTimelineElement[];

  constructor(name: string, id: string) {
    this.name = name;
    this.id = id;
    this.type = "element";
    this.elements = [];
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getType(): string {
    return this.type;
  }

  getElements(): BaseTimelineElement[] {
    return this.elements;
  }

  addElement(element: BaseTimelineElement): void {
    this.elements.push(element);
  }

  removeElement(element: BaseTimelineElement): void {
    const index = this.elements.findIndex(e => e.getId() === element.getId());
    if (index !== -1) {
      this.elements.splice(index, 1);
    }
  }

  updateElement(element: BaseTimelineElement): void {
    const index = this.elements.findIndex(e => e.getId() === element.getId());
    if (index !== -1) {
      this.elements[index] = element;
    }
  }

  getElementById(id: string): BaseTimelineElement | undefined {
    return this.elements.find(e => e.getId() === id);
  }

  toJSON(): Timeline {
    const serializer = new ElementSerializer();
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      elements: this.elements.map(element => element.accept(serializer) as TimelineElement),
    };
  }

  static fromJSON(json: any): TimelineTrack {
    const track = new TimelineTrack(json.name, json.id);
    track.type = json.type;
    track.elements = (json.elements || []).map(ElementDeserializer.fromJSON);
    return track;
  }
} 