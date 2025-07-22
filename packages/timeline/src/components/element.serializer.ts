import type { ElementVisitor } from "./element.visitor";
import { CaptionElement } from "./caption.element";
import { VideoElement } from "./video.element";
import { TextElement } from "./text.element";
import { ImageElement } from "./image.element";
import { IconElement } from "./icon.element";
import { AudioElement } from "./audio.element";
import { CircleElement } from "./circle.element";
import { RectElement } from "./rect.element";

function omitType(obj: any) {
  const { type, ...rest } = obj;
  return rest;
}

export class ElementSerializer implements ElementVisitor<any> {
  visitCaption(element: CaptionElement) { return { type: "caption", ...omitType(element.toJSON()) }; }
  visitVideo(element: VideoElement) { return { type: "video", ...omitType(element.toJSON()) }; }
  visitText(element: TextElement) { return { type: "text", ...omitType(element.toJSON()) }; }
  visitImage(element: ImageElement) { return { type: "image", ...omitType(element.toJSON()) }; }
  visitIcon(element: IconElement) { return { type: "icon", ...omitType(element.toJSON()) }; }
  visitAudio(element: AudioElement) { return { type: "audio", ...omitType(element.toJSON()) }; }
  visitCircle(element: CircleElement) { return { type: "circle", ...omitType(element.toJSON()) }; }
  visitRect(element: RectElement) { return { type: "rect", ...omitType(element.toJSON()) }; }
} 