import { ElementVisitor } from "./element-visitor";
import { VideoElement } from "../elements/video.element";
import { AudioElement } from "../elements/audio.element";
import { ImageElement } from "../elements/image.element";
import { TextElement } from "../elements/text.element";
import { CaptionElement } from "../elements/caption.element";
import { IconElement } from "../elements/icon.element";
import { CircleElement } from "../elements/circle.element";
import { RectElement } from "../elements/rect.element";
import { Track } from "../track/track";

/**
 * ElementUpdater visitor for updating elements in tracks
 * Uses the visitor pattern to handle different element types
 */
export class ElementUpdater implements ElementVisitor<boolean> {
  private track: Track;

  constructor(track: Track) {
    this.track = track;
  }

  visitVideoElement(element: VideoElement): boolean {
    return this.track.updateElement(element);
  }

  visitAudioElement(element: AudioElement): boolean {
    return this.track.updateElement(element);
  }

  visitImageElement(element: ImageElement): boolean {
    return this.track.updateElement(element);
  }

  visitTextElement(element: TextElement): boolean {
    return this.track.updateElement(element);
  }

  visitCaptionElement(element: CaptionElement): boolean {
    return this.track.updateElement(element);
  }

  visitIconElement(element: IconElement): boolean {
    return this.track.updateElement(element);
  }

  visitCircleElement(element: CircleElement): boolean {
    return this.track.updateElement(element);
  }

  visitRectElement(element: RectElement): boolean {
    return this.track.updateElement(element);
  }
} 