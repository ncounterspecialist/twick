import { CaptionElement } from "./caption.element";
import { VideoElement } from "./video.element";
import { TextElement } from "./text.element";
import { ImageElement } from "./image.element";
import { IconElement } from "./icon.element";
import { AudioElement } from "./audio.element";
import { CircleElement } from "./circle.element";
import { RectElement } from "./rect.element";
import { BaseTimelineElement } from "./base.element";

export class ElementDeserializer {
  static fromJSON(json: any): BaseTimelineElement {
    switch (json.type) {
      case "caption": return CaptionElement.fromJSON(json);
      case "video": return VideoElement.fromJSON(json);
      case "text": return TextElement.fromJSON(json);
      case "image": return ImageElement.fromJSON(json);
      case "icon": return IconElement.fromJSON(json);
      case "audio": return AudioElement.fromJSON(json);
      case "circle": return CircleElement.fromJSON(json);
      case "rect": return RectElement.fromJSON(json);
      default: throw new Error("Unknown element type: " + json.type);
    }
  }
} 