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

  async visitVideoElement(element: VideoElement): Promise<boolean> {
    await element.updateVideoMeta();
    const elements = this.track.getElements();
    const lastEndtime = elements?.length
      ? elements[elements.length - 1].getEnd()
      : 0;
    if (isNaN(element.getStart())) {
      element.setStart(lastEndtime);
    }
    return this.track.addElement(element);
  }

  async visitAudioElement(element: AudioElement): Promise<boolean> {
    await element.updateAudioMeta();
    const elements = this.track.getElements();
    const lastEndtime = elements?.length
      ? elements[elements.length - 1].getEnd()
      : 0;
    if (isNaN(element.getStart())) {
      element.setStart(lastEndtime);
    }
    return this.track.addElement(element);
  }

  async visitImageElement(element: ImageElement): Promise<boolean> {
    await element.updateImageMeta();
    const elements = this.track.getElements();
    const lastEndtime = elements?.length
      ? elements[elements.length - 1].getEnd()
      : 0;
    if (isNaN(element.getStart())) {
      element.setStart(lastEndtime);
    }
    return this.track.addElement(element);
  }

  async visitTextElement(element: TextElement): Promise<boolean> {
    const elements = this.track.getElements();
    const lastEndtime = elements?.length
      ? elements[elements.length - 1].getEnd()
      : 0;
    if (isNaN(element.getStart())) {
      element.setStart(lastEndtime);
    }
    return this.track.addElement(element);
  }

  async visitCaptionElement(element: CaptionElement): Promise<boolean> {
    const elements = this.track.getElements();
    const lastEndtime = elements?.length
      ? elements[elements.length - 1].getEnd()
      : 0;
    if (isNaN(element.getStart())) {
      element.setStart(lastEndtime);
    }
    return this.track.addElement(element);
  }

  async visitIconElement(element: IconElement): Promise<boolean> {
    const elements = this.track.getElements();
    const lastEndtime = elements?.length
      ? elements[elements.length - 1].getEnd()
      : 0;
    if (isNaN(element.getStart())) {
      element.setStart(lastEndtime);
    }
    return this.track.addElement(element);
  }

  async visitCircleElement(element: CircleElement): Promise<boolean> {
    const elements = this.track.getElements();
    const lastEndtime = elements?.length
      ? elements[elements.length - 1].getEnd()
      : 0;
    if (isNaN(element.getStart())) {
      element.setStart(lastEndtime);
    }
    return this.track.addElement(element);
  }

  async visitRectElement(element: RectElement): Promise<boolean> {
    const elements = this.track.getElements();
    const lastEndtime = elements?.length
      ? elements[elements.length - 1].getEnd()
      : 0;
    if (isNaN(element.getStart())) {
      element.setStart(lastEndtime);
    }
    return this.track.addElement(element);
  }
}
