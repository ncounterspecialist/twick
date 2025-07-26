import { ElementJSON } from "../../types";
import { VideoElement } from "../elements/video.element";
import { AudioElement } from "../elements/audio.element";
import { ImageElement } from "../elements/image.element";
import { TextElement } from "../elements/text.element";
import { CaptionElement } from "../elements/caption.element";
import { IconElement } from "../elements/icon.element";
import { CircleElement } from "../elements/circle.element";
import { RectElement } from "../elements/rect.element";
import { TrackElement } from "../elements/base.element";

export class ElementDeserializer {
  private static deserializeBaseElement(element: TrackElement, json: ElementJSON): void {
    if (json.id) element.setId(json.id);
    if (json.trackId) element.setTrackId(json.trackId);
    if (json.s !== undefined) element.setStart(json.s);
    if (json.e !== undefined) element.setEnd(json.e);
    if (json.props) element.setProps(json.props);
    if (json.animation) element.setAnimation(json.animation);
  }

  static deserializeVideoElement(json: ElementJSON): VideoElement {
    const parentSize = json.frame && json.frame.size 
      ? { width: json.frame.size[0], height: json.frame.size[1] } 
      : { width: 0, height: 0 };
    
    const videoElement = new VideoElement(json.props?.src || "", parentSize);
    ElementDeserializer.deserializeBaseElement(videoElement, json);
    
    if (json.mediaDuration !== undefined) videoElement.setMediaDuration(json.mediaDuration);
    if (json.objectFit) videoElement.setObjectFit(json.objectFit);
    if (json.frame) videoElement.setFrame(json.frame);
    if (json.frameEffects) videoElement.setFrameEffects(json.frameEffects);
    if (json.backgroundColor) videoElement.setBackgroundColor(json.backgroundColor);
    
    return videoElement;
  }

  static deserializeAudioElement(json: ElementJSON): AudioElement {
    const audioElement = new AudioElement(json.props?.src || "");
    ElementDeserializer.deserializeBaseElement(audioElement, json);
    
    if (json.mediaDuration !== undefined) audioElement.setMediaDuration(json.mediaDuration);
    
    return audioElement;
  }

  static deserializeImageElement(json: ElementJSON): ImageElement {
    const parentSize = json.frame && json.frame.size 
      ? { width: json.frame.size[0], height: json.frame.size[1] } 
      : { width: 0, height: 0 };
    
    const imageElement = new ImageElement(json.props?.src || "", parentSize);
    ElementDeserializer.deserializeBaseElement(imageElement, json);
    
    if (json.objectFit) imageElement.setObjectFit(json.objectFit);
    if (json.frame) imageElement.setFrame(json.frame);
    if (json.frameEffects) imageElement.setFrameEffects(json.frameEffects);
    if (json.backgroundColor) imageElement.setBackgroundColor(json.backgroundColor);
    
    return imageElement;
  }

  static deserializeTextElement(json: ElementJSON): TextElement {
    const textElement = new TextElement(json.props?.text || "");
    ElementDeserializer.deserializeBaseElement(textElement, json);
    
    if (json.textEffect) textElement.setTextEffect(json.textEffect);
    
    return textElement;
  }

  static deserializeCaptionElement(json: ElementJSON): CaptionElement {
    const captionElement = new CaptionElement(
      json.t || "",
      json.s || 0,
      json.e || 0
    );
    ElementDeserializer.deserializeBaseElement(captionElement, json);
    
    return captionElement;
  }

  static deserializeIconElement(json: ElementJSON): IconElement {
    const size = json.props?.size 
      ? { width: json.props.size[0], height: json.props.size[1] }
      : { width: 0, height: 0 };
    
    const iconElement = new IconElement(
      json.props?.src || "",
      size
    );
    ElementDeserializer.deserializeBaseElement(iconElement, json);
    
    return iconElement;
  }

  static deserializeCircleElement(json: ElementJSON): CircleElement {
    const circleElement = new CircleElement(
      json.props?.fill || "",
      json.props?.radius || 0
    );
    ElementDeserializer.deserializeBaseElement(circleElement, json);
    
    return circleElement;
  }

  static deserializeRectElement(json: ElementJSON): RectElement {
    const rectElement = new RectElement(
      json.props?.fill || "",
      { 
        width: json.props?.width || 0, 
        height: json.props?.height || 0 
      }
    );
    ElementDeserializer.deserializeBaseElement(rectElement, json);
    
    return rectElement;
  }

  static fromJSON(json: ElementJSON): TrackElement | null{
    try {
    switch (json.type) {
      case "video":
        return ElementDeserializer.deserializeVideoElement(json);
      case "audio":
        return ElementDeserializer.deserializeAudioElement(json);
      case "image":
        return ElementDeserializer.deserializeImageElement(json);
      case "text":
        return ElementDeserializer.deserializeTextElement(json);
      case "caption":
        return ElementDeserializer.deserializeCaptionElement(json);
      case "icon":
        return ElementDeserializer.deserializeIconElement(json);
      case "circle":
        return ElementDeserializer.deserializeCircleElement(json);
      case "rect":
        return ElementDeserializer.deserializeRectElement(json);
      default:
        throw new Error(`Unknown element type: ${json.type}`);
    }
   } catch(error) {
    console.error("Error deserializing element:", error);
    return null;
   }
  }
}
