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
 * ElementAdder visitor for adding elements to tracks
 * Uses the visitor pattern to handle different element types
 */
export class ElementAdder implements ElementVisitor<Promise<boolean>> {
  private track: Track;

  constructor(track: Track) {
    this.track = track;
  }

  visitVideoElement(element: VideoElement): Promise<boolean> {
    return this.track.addVideo(element);
  }

  visitAudioElement(element: AudioElement): Promise<boolean> {
    return this.track.addAudio(element);
  }

  visitImageElement(element: ImageElement): Promise<boolean> {
    return this.track.addImage(element);
  }

  visitTextElement(element: TextElement): Promise<boolean> {
    return Promise.resolve(this.track.addText(element));
  }

  visitCaptionElement(element: CaptionElement): Promise<boolean> {
    return Promise.resolve(this.track.addCaption(element));
  }

  visitIconElement(element: IconElement): Promise<boolean> {
    return Promise.resolve(this.track.addIcon(element));
  }

  visitCircleElement(element: CircleElement): Promise<boolean> {
    return Promise.resolve(this.track.addCircle(element));
  }

  visitRectElement(element: RectElement): Promise<boolean> {
    return Promise.resolve(this.track.addRect(element));
  }
} 