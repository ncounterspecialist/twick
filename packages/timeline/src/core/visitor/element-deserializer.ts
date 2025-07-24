import { TrackElement } from "../elements/base.element";
import { VideoElement } from "../elements/video.element";
import { AudioElement } from "../elements/audio.element";
import { ImageElement } from "../elements/image.element";
import { TextElement } from "../elements/text.element";
import { CaptionElement } from "../elements/caption.element";
import { IconElement } from "../elements/icon.element";
import { CircleElement } from "../elements/circle.element";
import { RectElement } from "../elements/rect.element";

export class ElementDeserializer {
  static fromJSON(json: any): TrackElement {
    const { type } = json;

    switch (type) {
      case "video":
        return VideoElement.fromJSON(json);
      case "audio":
        return AudioElement.fromJSON(json);
      case "image":
        return ImageElement.fromJSON(json);
      case "text":
        return TextElement.fromJSON(json);
      case "caption":
        return CaptionElement.fromJSON(json);
      case "icon":
        return IconElement.fromJSON(json);
      case "circle":
        return CircleElement.fromJSON(json);
      case "rect":
        return RectElement.fromJSON(json);
      default:
        throw new Error(`Unknown element type: ${type}`);
    }
  }
}
