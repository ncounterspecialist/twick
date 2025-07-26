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
import { TrackElement } from "../elements/base.element";

export class ElementSerializer implements ElementVisitor<ElementJSON> {
  serializeElement(element: TrackElement): ElementJSON {
    return {
      id: element.getId(),
      trackId: element.getTrackId(),
      type: element.getType(),
      name: element.getName(),
      s: element.getStart(),
      e: element.getEnd(),
      props: element.getProps(),
      animation: element.getAnimation(),
    };
  }
  visitVideoElement(element: VideoElement): ElementJSON {
    return {
      ...this.serializeElement(element),
      frame: element.getFrame(),
      frameEffects: element.getFrameEffects(),
      backgroundColor: element.getBackgroundColor(),
      objectFit: element.getObjectFit(),
      mediaDuration: element.getMediaDuration(),
    };
  }

  visitAudioElement(element: AudioElement): ElementJSON {
    return {
      ...this.serializeElement(element),
      mediaDuration: element.getMediaDuration(),
    };
  }

  visitImageElement(element: ImageElement): ElementJSON {
    return {
      ...this.serializeElement(element),
      frame: element.getFrame(),
      frameEffects: element.getFrameEffects(),
      backgroundColor: element.getBackgroundColor(),
      objectFit: element.getObjectFit(),
    };
  }

  visitTextElement(element: TextElement): ElementJSON {
    return {
      ...this.serializeElement(element),
      textEffect: element.getTextEffect(),
    };
  }

  visitCaptionElement(element: CaptionElement): ElementJSON {
    return {
      ...this.serializeElement(element),
      t: element.getText(),
    };
  }

  visitIconElement(element: IconElement): ElementJSON {
    return {
      ...this.serializeElement(element),
    };
  }

  visitCircleElement(element: CircleElement): ElementJSON {
    return {
      ...this.serializeElement(element),
    };
  }

  visitRectElement(element: RectElement): ElementJSON {
    return {
      ...this.serializeElement(element),
    };
  }
}
