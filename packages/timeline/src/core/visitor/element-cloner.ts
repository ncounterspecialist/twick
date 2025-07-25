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
import { generateShortUuid } from "../../utils/timeline.utils";

export class ElementCloner implements ElementVisitor<TrackElement> {
  private generateNewId: boolean;

  constructor(generateNewId: boolean = true) {
    this.generateNewId = generateNewId;
  }

  visitVideoElement(element: VideoElement): TrackElement {
    const clonedElement = VideoElement.fromJSON({...element.toJSON(), id: this.generateNewId ? `e-${generateShortUuid()}` : element.getId()});
    clonedElement.setParentSize(element.getParentSize());
    return clonedElement;
  }

  visitAudioElement(element: AudioElement): TrackElement {
    return AudioElement.fromJSON({...element.toJSON(), id: this.generateNewId ? `e-${generateShortUuid()}` : element.getId()});
  }

  visitImageElement(element: ImageElement): TrackElement {
    const clonedElement = ImageElement.fromJSON({...element.toJSON(), id: this.generateNewId ? `e-${generateShortUuid()}` : element.getId()});
    clonedElement.setParentSize(element.getParentSize());
    return clonedElement;
  }

  visitTextElement(element: TextElement): TrackElement {
    return TextElement.fromJSON({...element.toJSON(), id: this.generateNewId ? `e-${generateShortUuid()}` : element.getId()});
  }

  visitCaptionElement(element: CaptionElement): TrackElement {
    return CaptionElement.fromJSON({...element.toJSON(), id: this.generateNewId ? `e-${generateShortUuid()}` : element.getId()});
  }

  visitRectElement(element: RectElement): TrackElement {
    return RectElement.fromJSON({...element.toJSON(), id: this.generateNewId ? `e-${generateShortUuid()}` : element.getId()});
  }

  visitCircleElement(element: CircleElement): TrackElement {
    return CircleElement.fromJSON({...element.toJSON(), id: this.generateNewId ? `e-${generateShortUuid()}` : element.getId()});
  }

  visitIconElement(element: IconElement): TrackElement {
    return IconElement.fromJSON({...element.toJSON(), id: this.generateNewId ? `e-${generateShortUuid()}` : element.getId()});
  }
} 