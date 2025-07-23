import { TimelineElement } from "../../types";
import { ElementVisitor } from "./element-visitor";
import { VideoElement } from "../elements/video.element";
import { AudioElement } from "../elements/audio.element";
import { ImageElement } from "../elements/image.element";
import { TextElement } from "../elements/text.element";
import { CaptionElement } from "../elements/caption.element";
import { RectElement } from "../elements/rect.element";
import { CircleElement } from "../elements/circle.element";
import { IconElement } from "../elements/icon.element";

export class ElementSerializer implements ElementVisitor<TimelineElement> {
  visitVideoElement(element: VideoElement): TimelineElement {
    return {
      id: element.getId(),
      timelineId: element.getTimelineId(),
      type: element.getType(),
      name: element.getName(),
      s: element.getStart(),
      e: element.getEnd(),
      props: element.getProps(),
    };
  }

  visitAudioElement(element: AudioElement): TimelineElement {
    return {
      id: element.getId(),
      timelineId: element.getTimelineId(),
      type: element.getType(),
      name: element.getName(),
      s: element.getStart(),
      e: element.getEnd(),
      props: element.getProps(),
    };
  }

  visitImageElement(element: ImageElement): TimelineElement {
    return {
      id: element.getId(),
      timelineId: element.getTimelineId(),
      type: element.getType(),
      name: element.getName(),
      s: element.getStart(),
      e: element.getEnd(),
      props: element.getProps(),
    };
  }

  visitTextElement(element: TextElement): TimelineElement {
    return {
      id: element.getId(),
      timelineId: element.getTimelineId(),
      type: element.getType(),
      name: element.getName(),
      s: element.getStart(),
      e: element.getEnd(),
      props: element.getProps(),
    };
  }

  visitCaptionElement(element: CaptionElement): TimelineElement {
    return {
      id: element.getId(),
      timelineId: element.getTimelineId(),
      type: element.getType(),
      name: element.getName(),
      s: element.getStart(),
      e: element.getEnd(),
      props: element.getProps(),
    };
  }

visitIconElement(element: IconElement): TimelineElement {
    return {
      id: element.getId(),
      timelineId: element.getTimelineId(),
      type: element.getType(),
      name: element.getName(),
      s: element.getStart(),
      e: element.getEnd(),
      props: element.getProps(),
    };
  }

  visitCircleElement(element: CircleElement): TimelineElement {
    return {
      id: element.getId(),
      timelineId: element.getTimelineId(),
      type: element.getType(),
      name: element.getName(),
      s: element.getStart(),
      e: element.getEnd(),
      props: element.getProps(),
    };
  }

  visitRectElement(element: RectElement): TimelineElement {
    return {
      id: element.getId(),
      timelineId: element.getTimelineId(),
      type: element.getType(),
      name: element.getName(),
      s: element.getStart(),
      e: element.getEnd(),
      props: element.getProps(),
    };
  }
} 