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
import { PlaceholderElement } from "../elements/placeholder.element";
import { TrackElement } from "../elements/base.element";
import { ArrowElement } from "../elements/arrow.element";
import { LineElement } from "../elements/line.element";

export class ElementSerializer implements ElementVisitor<ElementJSON> {
  serializeElement(element: TrackElement): ElementJSON {
    const props = structuredClone(element.getProps());
    const zIndex = props?.zIndex;
    const transition = element.getTransition?.();
    return {
      id: element.getId(),
      trackId: element.getTrackId(),
      type: element.getType(),
      name: element.getName(),
      s: element.getStart(),
      e: element.getEnd(),
      props,
      metadata: element.getMetadata?.(),
      ...(zIndex !== undefined && { zIndex }),
      ...(transition !== undefined && { transition }),
      animation: element.getAnimation()?.toJSON(),
    };
  }
  visitVideoElement(element: VideoElement): ElementJSON {
    return {
      ...this.serializeElement(element),
      frame: structuredClone(element.getFrame()),
      frameEffects: element.getFrameEffects()?.map((frameEffect) => frameEffect.toJSON()),
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
      frame: structuredClone(element.getFrame()),
      frameEffects: element.getFrameEffects()?.map((frameEffect) => frameEffect.toJSON()),
      backgroundColor: element.getBackgroundColor(),
      objectFit: element.getObjectFit(),
    };
  }

  visitTextElement(element: TextElement): ElementJSON {
    return {
      ...this.serializeElement(element),
      textEffect: element.getTextEffect()?.toJSON(),
    };
  }

  visitCaptionElement(element: CaptionElement): ElementJSON {
    return {
      ...this.serializeElement(element),
      t: structuredClone(element.getText()),
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

  visitPlaceholderElement(element: PlaceholderElement): ElementJSON {
    return this.serializeElement(element);
  }

  visitLineElement(element: LineElement): ElementJSON {
    return this.serializeElement(element);
  }

  visitArrowElement(element: ArrowElement): ElementJSON {
    return this.serializeElement(element);
  }
}
