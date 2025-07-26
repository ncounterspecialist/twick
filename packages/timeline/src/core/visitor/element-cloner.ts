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

export class ElementCloner implements ElementVisitor<TrackElement> {
  cloneElementProperties(srcElement: TrackElement, destElement: TrackElement) {
    return destElement
      .setId(srcElement.getId())
      .setName(srcElement.getName())
      .setType(srcElement.getType())
      .setStart(srcElement.getStart())
      .setEnd(srcElement.getEnd())
      .setProps(srcElement.getProps())
      .setAnimation(srcElement.getAnimation());
  }

  visitVideoElement(element: VideoElement): TrackElement {
    const props = element.getProps();
    const clonedElement = new VideoElement(props!.src, element.getParentSize());
    this.cloneElementProperties(element, clonedElement);
    clonedElement
      .setParentSize(element.getParentSize())
      .setMediaDuration(element.getMediaDuration())
      .setFrame(element.getFrame())
      .setFrameEffects(element.getFrameEffects() ?? [])
      .setBackgroundColor(element.getBackgroundColor())
      .setObjectFit(element.getObjectFit())
    return clonedElement;
  }

  visitAudioElement(element: AudioElement): TrackElement {
    const clonedElement = new AudioElement(element.getProps()!.src);
    this.cloneElementProperties(element, clonedElement);
    clonedElement.setMediaDuration(element.getMediaDuration());
    return clonedElement;
  }

  visitImageElement(element: ImageElement): TrackElement {
    const clonedElement = new ImageElement(
      element.getProps()!.src,
      element.getParentSize()
    );
    this.cloneElementProperties(element, clonedElement);
    clonedElement
      .setParentSize(element.getParentSize())
      .setFrame(element.getFrame())
      .setFrameEffects(element.getFrameEffects())
      .setBackgroundColor(element.getBackgroundColor())
      .setObjectFit(element.getObjectFit())

    return clonedElement;
  }

  visitTextElement(element: TextElement): TrackElement {
    const clonedElement = new TextElement(element.getProps()!.text);
    this.cloneElementProperties(element, clonedElement);
    clonedElement.setTextEffect(element.getTextEffect());
    return clonedElement;
  }

  visitCaptionElement(element: CaptionElement): TrackElement {
    const clonedElement = new CaptionElement(
      element.getProps()!.text,
      element.getStart(),
      element.getEnd()
    );
    this.cloneElementProperties(element, clonedElement);
    return clonedElement;
  }

  visitRectElement(element: RectElement): TrackElement {
    const clonedElement = new RectElement(
      element.getProps()!.fill,
      element.getProps()!.size
    );
    this.cloneElementProperties(element, clonedElement);
    return clonedElement;
  }

  visitCircleElement(element: CircleElement): TrackElement {
    const clonedElement = new CircleElement(
      element.getProps()!.fill,
      element.getProps()!.radius
    );
    this.cloneElementProperties(element, clonedElement);
    return clonedElement;
  }

  visitIconElement(element: IconElement): TrackElement {
    const clonedElement = new IconElement(
      element.getProps()!.src,
      element.getProps()!.size
    );
    this.cloneElementProperties(element, clonedElement);
    return clonedElement;
  }
}
