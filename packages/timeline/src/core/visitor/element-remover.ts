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
import { Track } from "../track/track";
import { TrackFriend } from "../track/track.friend";

/**
 * ElementRemover visitor for removing elements from tracks
 * Uses the visitor pattern to handle different element types
 * Implements the Friend Class Pattern for explicit access control
 */
export class ElementRemover implements ElementVisitor<boolean> {
  private trackFriend: TrackFriend;

  constructor(track: Track) {
    this.trackFriend = track.createFriend();
  }

  visitVideoElement(element: VideoElement): boolean {
    this.trackFriend.removeElement(element);
    return true;
  }

  visitAudioElement(element: AudioElement): boolean {
    this.trackFriend.removeElement(element);
    return true;
  }

  visitImageElement(element: ImageElement): boolean {
    this.trackFriend.removeElement(element);
    return true;
  }

  visitTextElement(element: TextElement): boolean {
    this.trackFriend.removeElement(element);
    return true;
  }

  visitCaptionElement(element: CaptionElement): boolean {
    this.trackFriend.removeElement(element);
    return true;
  }

  visitIconElement(element: IconElement): boolean {
    this.trackFriend.removeElement(element);
    return true;
  }

  visitCircleElement(element: CircleElement): boolean {
    this.trackFriend.removeElement(element);
    return true;
  }

  visitRectElement(element: RectElement): boolean {
    this.trackFriend.removeElement(element);
    return true;
  }

  visitPlaceholderElement(element: PlaceholderElement): boolean {
    this.trackFriend.removeElement(element);
    return true;
  }
} 