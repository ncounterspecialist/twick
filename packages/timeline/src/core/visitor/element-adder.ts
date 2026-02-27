import { ElementVisitor } from "./element-visitor";
import { VideoElement } from "../elements/video.element";
import { AudioElement } from "../elements/audio.element";
import { ImageElement } from "../elements/image.element";
import { TextElement } from "../elements/text.element";
import { CaptionElement } from "../elements/caption.element";
import { IconElement } from "../elements/icon.element";
import { CircleElement } from "../elements/circle.element";
import { RectElement } from "../elements/rect.element";
import { PlaceholderElement } from "../elements/placeholder.element";
import { ArrowElement } from "../elements/arrow.element";
import { LineElement } from "../elements/line.element";
import { EffectElement } from "../elements/effect.element";
import { Track } from "../track/track";
import { TrackFriend } from "../track/track.friend";

/**
 * ElementAdder visitor for adding elements to tracks.
 * Uses the visitor pattern to handle different element types
 * and implements the Friend Class Pattern for explicit access control.
 * Automatically calculates start and end times for elements based on
 * existing track content.
 */
export class ElementAdder implements ElementVisitor<Promise<boolean>> {
  private track: Track;
  private trackFriend: TrackFriend;

  /**
   * Creates a new ElementAdder instance for the specified track.
   *
   * @param track - The track to add elements to
   * 
   * @example
   * ```js
   * const adder = new ElementAdder(track);
   * const success = await adder.visitVideoElement(videoElement);
   * ```
   */
  constructor(track: Track) {
    this.track = track;
    this.trackFriend = track.createFriend();
  }

  /**
   * Adds a video element to the track.
   * Updates video metadata and calculates appropriate start/end times
   * based on existing track elements.
   *
   * @param element - The video element to add
   * @returns Promise resolving to true if element was added successfully
   * 
   * @example
   * ```js
   * const success = await adder.visitVideoElement(videoElement);
   * // success = true if element was added successfully
   * ```
   */
  async visitVideoElement(element: VideoElement): Promise<boolean> {
    await element.updateVideoMeta();
    const elements = this.track.getElements();
    const lastEndtime = elements?.length
      ? elements[elements.length - 1].getEnd()
      : 0;
    if (isNaN(element.getStart())) {
      element.setStart(lastEndtime);
    }
    if (isNaN(element.getEnd())) {
      element.setEnd(element.getStart() + element.getMediaDuration());
    }

    return this.trackFriend.addElement(element);
  }

  /**
   * Adds an audio element to the track.
   * Updates audio metadata and calculates appropriate start/end times
   * based on existing track elements.
   *
   * @param element - The audio element to add
   * @returns Promise resolving to true if element was added successfully
   * 
   * @example
   * ```js
   * const success = await adder.visitAudioElement(audioElement);
   * // success = true if element was added successfully
   * ```
   */
  async visitAudioElement(element: AudioElement): Promise<boolean> {
    await element.updateAudioMeta();
    const elements = this.track.getElements();
    const lastEndtime = elements?.length
      ? elements[elements.length - 1].getEnd()
      : 0;
    if (isNaN(element.getStart())) {
      element.setStart(lastEndtime);
    }
    if (isNaN(element.getEnd())) {
      element.setEnd(element.getStart() + element.getMediaDuration());
    }
    
    return this.trackFriend.addElement(element);
  }

  /**
   * Adds an image element to the track.
   * Updates image metadata and calculates appropriate start/end times
   * based on existing track elements.
   *
   * @param element - The image element to add
   * @returns Promise resolving to true if element was added successfully
   * 
   * @example
   * ```js
   * const success = await adder.visitImageElement(imageElement);
   * // success = true if element was added successfully
   * ```
   */
  async visitImageElement(element: ImageElement): Promise<boolean> {
    await element.updateImageMeta();
    const elements = this.track.getElements();
    const lastEndtime = elements?.length
      ? elements[elements.length - 1].getEnd()
      : 0;
    if (isNaN(element.getStart())) {
      element.setStart(lastEndtime);
    }
    if (isNaN(element.getEnd())) {
      element.setEnd(element.getStart() + 1);
    }
    
    return this.trackFriend.addElement(element);
  }

  /**
   * Adds a text element to the track.
   * Calculates appropriate start/end times based on existing track elements.
   *
   * @param element - The text element to add
   * @returns Promise resolving to true if element was added successfully
   * 
   * @example
   * ```js
   * const success = await adder.visitTextElement(textElement);
   * // success = true if element was added successfully
   * ```
   */
  async visitTextElement(element: TextElement): Promise<boolean> {
    const elements = this.track.getElements();
    const lastEndtime = elements?.length
      ? elements[elements.length - 1].getEnd()
      : 0;
    if (isNaN(element.getStart())) {
      element.setStart(lastEndtime);
    }
    if (isNaN(element.getEnd())) {
      element.setEnd(element.getStart() + 1);
    }
    
    return this.trackFriend.addElement(element);
  }

  /**
   * Adds a caption element to the track.
   * Calculates appropriate start/end times based on existing track elements.
   *
   * @param element - The caption element to add
   * @returns Promise resolving to true if element was added successfully
   * 
   * @example
   * ```js
   * const success = await adder.visitCaptionElement(captionElement);
   * // success = true if element was added successfully
   * ```
   */
  async visitCaptionElement(element: CaptionElement): Promise<boolean> {
    const elements = this.track.getElements();
    const lastEndtime = elements?.length
      ? elements[elements.length - 1].getEnd()
      : 0;
    if (isNaN(element.getStart())) {
      element.setStart(lastEndtime);
    }
    if (isNaN(element.getEnd())) {
      element.setEnd(element.getStart() + 1);
    }
    
    return this.trackFriend.addElement(element);
  }

  /**
   * Adds an icon element to the track.
   * Calculates appropriate start/end times based on existing track elements.
   *
   * @param element - The icon element to add
   * @returns Promise resolving to true if element was added successfully
   * 
   * @example
   * ```js
   * const success = await adder.visitIconElement(iconElement);
   * // success = true if element was added successfully
   * ```
   */
  async visitIconElement(element: IconElement): Promise<boolean> {
    const elements = this.track.getElements();
    const lastEndtime = elements?.length
      ? elements[elements.length - 1].getEnd()
      : 0;
    if (isNaN(element.getStart())) {
      element.setStart(lastEndtime);
    }
    if (isNaN(element.getEnd())) {
      element.setEnd(element.getStart() + 1);
    }
    
    return this.trackFriend.addElement(element);
  }

  /**
   * Adds a circle element to the track.
   * Calculates appropriate start/end times based on existing track elements.
   *
   * @param element - The circle element to add
   * @returns Promise resolving to true if element was added successfully
   * 
   * @example
   * ```js
   * const success = await adder.visitCircleElement(circleElement);
   * // success = true if element was added successfully
   * ```
   */
  async visitCircleElement(element: CircleElement): Promise<boolean> {
    const elements = this.track.getElements();
    const lastEndtime = elements?.length
      ? elements[elements.length - 1].getEnd()
      : 0;
    if (isNaN(element.getStart())) {
      element.setStart(lastEndtime);
    }
    if (isNaN(element.getEnd())) {
      element.setEnd(element.getStart() + 1);
    }
    
    return this.trackFriend.addElement(element);
  }

  /**
   * Adds a rectangle element to the track.
   * Calculates appropriate start/end times based on existing track elements.
   *
   * @param element - The rectangle element to add
   * @returns Promise resolving to true if element was added successfully
   * 
   * @example
   * ```js
   * const success = await adder.visitRectElement(rectElement);
   * // success = true if element was added successfully
   * ```
   */
  async visitRectElement(element: RectElement): Promise<boolean> {
    const elements = this.track.getElements();
    const lastEndtime = elements?.length
      ? elements[elements.length - 1].getEnd()
      : 0;
    if (isNaN(element.getStart())) {
      element.setStart(lastEndtime);
    }
    if (isNaN(element.getEnd())) {
      element.setEnd(element.getStart() + 1);
    }
    
    return this.trackFriend.addElement(element);
  }

  async visitPlaceholderElement(element: PlaceholderElement): Promise<boolean> {
    const elements = this.track.getElements();
    const lastEndtime = elements?.length
      ? elements[elements.length - 1].getEnd()
      : 0;
    if (isNaN(element.getStart())) {
      element.setStart(lastEndtime);
    }
    if (isNaN(element.getEnd())) {
      const duration = element.getExpectedDuration();
      element.setEnd(element.getStart() + (duration ?? 1));
    }
    return this.trackFriend.addElement(element);
  }

  /**
   * Adds a line element to the track.
   * Uses the same default duration semantics as other simple shapes.
   */
  async visitLineElement(element: LineElement): Promise<boolean> {
    const elements = this.track.getElements();
    const lastEndtime = elements?.length
      ? elements[elements.length - 1].getEnd()
      : 0;
    if (isNaN(element.getStart())) {
      element.setStart(lastEndtime);
    }
    if (isNaN(element.getEnd())) {
      element.setEnd(element.getStart() + 1);
    }
    return this.trackFriend.addElement(element);
  }

  async visitArrowElement(element: ArrowElement): Promise<boolean> {
    const elements = this.track.getElements();
    const lastEndtime = elements?.length
      ? elements[elements.length - 1].getEnd()
      : 0;
    if (isNaN(element.getStart())) {
      element.setStart(lastEndtime);
    }
    if (isNaN(element.getEnd())) {
      element.setEnd(element.getStart() + 1);
    }
    return this.trackFriend.addElement(element);
  }

  /**
   * Adds an effect element to the track.
   * For now, uses the same default duration semantics as other simple elements.
   */
  async visitEffectElement(element: EffectElement): Promise<boolean> {
    const elements = this.track.getElements();
    const lastEndtime = elements?.length
      ? elements[elements.length - 1].getEnd()
      : 0;
    if (isNaN(element.getStart())) {
      element.setStart(lastEndtime);
    }
    if (isNaN(element.getEnd())) {
      element.setEnd(element.getStart() + 1);
    }
    return this.trackFriend.addElement(element);
  }

}
