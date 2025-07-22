import { CaptionElement } from "./caption.element";
import { VideoElement } from "./video.element";
import { TextElement } from "./text.element";
import { ImageElement } from "./image.element";
import { IconElement } from "./icon.element";
import { AudioElement } from "./audio.element";
import { CircleElement } from "./circle.element";
import { RectElement } from "./rect.element";

export interface ElementVisitor<T> {
  visitCaption(element: CaptionElement): T;
  visitVideo(element: VideoElement): T;
  visitText(element: TextElement): T;
  visitImage(element: ImageElement): T;
  visitIcon(element: IconElement): T;
  visitAudio(element: AudioElement): T;
  visitRect(element: RectElement): T;
  visitCircle(element: CircleElement): T;
} 