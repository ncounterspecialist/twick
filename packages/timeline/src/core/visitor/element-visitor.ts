import { VideoElement } from "../elements/video.element";
import { AudioElement } from "../elements/audio.element";
import { ImageElement } from "../elements/image.element";
import { TextElement } from "../elements/text.element";
import { CaptionElement } from "../elements/caption.element";
import { IconElement } from "../elements/icon.element";
import { CircleElement } from "../elements/circle.element";
import { RectElement } from "../elements/rect.element";
import { PlaceholderElement } from "../elements/placeholder.element";

export interface ElementVisitor<T> {
  visitVideoElement(element: VideoElement): T;
  visitAudioElement(element: AudioElement): T;
  visitImageElement(element: ImageElement): T;
  visitTextElement(element: TextElement): T;
  visitCaptionElement(element: CaptionElement): T;
  visitIconElement(element: IconElement): T;
  visitCircleElement(element: CircleElement): T;
  visitRectElement(element: RectElement): T;
  visitPlaceholderElement(element: PlaceholderElement): T;
} 