import { Timeline } from "../types";
import { TimelineElement } from "../types/element.types";
import { BaseTimelineElement } from "./base.element";
import { VideoElement } from "./video.element";
import { TextElement } from "./text.element";
import { ImageElement } from "./image.element";
import { CaptionElement } from "./caption.element";
import { IconElement } from "./icon.element";
import { AudioElement } from "./audio.element";
import { CircleElement } from "./circle.element";

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

    autoAdjustTime () {
        // Sort elements by their startTime
        this.elements.sort((a, b) => a.getStart() - b.getStart());

        // Adjust elements to ensure no overlap
        for (let i = 1; i < this.elements.length; i++) {
            const prev = this.elements[i - 1];
            const curr = this.elements[i];
            if (curr.getStart() < prev.getEnd()) {
                // Move current element's startTime to the end of the previous element
                const duration = curr.getDuration();
                curr.setStart(prev.getEnd());
                curr.setEnd(curr.getStart() + duration);
            }
        }
        return this;
    }

    addVideo(video: VideoElement): VideoElement {  
        this.elements.push(video);
        return video;
     }

    addImage(image: ImageElement): ImageElement {
        this.elements.push(image);
        return image;
    }

    addText(text: TextElement): TextElement {
        this.elements.push(text);
        return text;
    }

    addCaption(caption: CaptionElement): CaptionElement {
        this.elements.push(caption);
        return caption;
    }

    addIcon(icon: IconElement): IconElement {
        this.elements.push(icon);
        return icon;
    }

    addAudio(audio: AudioElement): AudioElement {
        this.elements.push(audio);
        return audio;
    }

    addCircle(circle: CircleElement): CircleElement {
        this.elements.push(circle);
        return circle;
    }

    removeElement(element: BaseTimelineElement) {
        this.elements = this.elements.filter((e) => e !== element);
        return this;
    }

    updateElement(element: BaseTimelineElement) {
        this.elements = this.elements.map((e) => e.getId() === element.getId() ? element : e);
        return this;
    }

    getElementById(id: string): BaseTimelineElement | null {
        return this.elements.find((e) => e.getId() === id) || null;
    }

    toJSON(): Timeline {
        return {
            id: this.id,
            name: this.name,
            type: this.type,
            elements: this.elements.map((element) => element.toJSON() as TimelineElement),
        };
    }
}