import { ElementJSON } from "../../types";
import { ElementVisitor } from "./element-visitor";
import { VideoElement } from "../elements/video.element";
import { AudioElement } from "../elements/audio.element";
import { ImageElement } from "../elements/image.element";
import { TextElement } from "../elements/text.element";
import { CaptionElement } from "../elements/caption.element";
import { RectElement } from "../elements/rect.element";
import { CircleElement } from "../elements/circle.element";
import { IconElement } from "../elements/icon.element";

export class ElementSerializer implements ElementVisitor<ElementJSON> {
  visitVideoElement(element: VideoElement): ElementJSON {
    return {
      id: element.getId(),
      trackId: element.getTrackId(),
      type: element.getType(),
      name: element.getName(),
      s: element.getStart(),
      e: element.getEnd(),
      props: element.getProps(),
    };
  }

  visitAudioElement(element: AudioElement): ElementJSON {
    return {
      id: element.getId(),
      trackId: element.getTrackId(),
      type: element.getType(),
      name: element.getName(),
      s: element.getStart(),
      e: element.getEnd(),
      props: element.getProps(),
    };
  }

  visitImageElement(element: ImageElement): ElementJSON {
    return {
      id: element.getId(),
      trackId: element.getTrackId(),
      type: element.getType(),
      name: element.getName(),
      s: element.getStart(),
      e: element.getEnd(),
      props: element.getProps(),
    };
  }

  visitTextElement(element: TextElement): ElementJSON {
    return {
      id: element.getId(),
      trackId: element.getTrackId(),
      type: element.getType(),
      name: element.getName(),
      s: element.getStart(),
      e: element.getEnd(),
      props: element.getProps(),
    };
  }

  visitCaptionElement(element: CaptionElement): ElementJSON {
    return {
      id: element.getId(),
      trackId: element.getTrackId(),
      type: element.getType(),
      name: element.getName(),
      s: element.getStart(),
      e: element.getEnd(),
      props: element.getProps(),
    };
  }

visitIconElement(element: IconElement): ElementJSON {
    return {
      id: element.getId(),
      trackId: element.getTrackId(),
      type: element.getType(),
      name: element.getName(),
      s: element.getStart(),
      e: element.getEnd(),
      props: element.getProps(),
    };
  }

  visitCircleElement(element: CircleElement): ElementJSON {
    return {
      id: element.getId(),
      trackId: element.getTrackId(),
      type: element.getType(),
      name: element.getName(),
      s: element.getStart(),
      e: element.getEnd(),
      props: element.getProps(),
    };
  }

  visitRectElement(element: RectElement): ElementJSON {
    return {
      id: element.getId(),
      trackId: element.getTrackId(),
      type: element.getType(),
      name: element.getName(),
      s: element.getStart(),
      e: element.getEnd(),
      props: element.getProps(),
    };
  }
} 