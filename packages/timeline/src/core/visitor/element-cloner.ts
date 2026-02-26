import { ElementVisitor } from "./element-visitor";
import { VideoElement } from "../elements/video.element";
import { AudioElement } from "../elements/audio.element";
import { ImageElement } from "../elements/image.element";
import { TextElement } from "../elements/text.element";
import { CaptionElement } from "../elements/caption.element";
import { RectElement } from "../elements/rect.element";
import { CircleElement } from "../elements/circle.element";
import { IconElement } from "../elements/icon.element";
import { PlaceholderElement } from "../elements/placeholder.element";
import { TrackElement } from "../elements/base.element";
import { ArrowElement } from "../elements/arrow.element";
import { LineElement } from "../elements/line.element";
import { EffectElement } from "../elements/effect.element";

export class ElementCloner implements ElementVisitor<TrackElement> {
  cloneElementProperties(srcElement: TrackElement, destElement: TrackElement) {
    return destElement
      .setName(srcElement.getName())
      .setType(srcElement.getType())
      .setStart(srcElement.getStart())
      .setEnd(srcElement.getEnd())
      .setProps(srcElement.getProps())
      .setMetadata(srcElement.getMetadata?.())
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
      element.getProps()!.size,
      element.getProps()!.fill
    );
    this.cloneElementProperties(element, clonedElement);
    return clonedElement;
  }

  visitPlaceholderElement(element: PlaceholderElement): TrackElement {
    const clonedElement = new PlaceholderElement(
      element.getSrc(),
      element.getParentSize(),
      element.getExpectedDuration()
    );
    this.cloneElementProperties(element, clonedElement);
    return clonedElement;
  }

  visitArrowElement(element: ArrowElement): TrackElement {
    const clonedElement = new ArrowElement(
      element.getProps()!.fill,
      { width: element.getProps()!.width, height: element.getProps()!.height }
    );
    this.cloneElementProperties(element, clonedElement);
    return clonedElement;
  }

  visitLineElement(element: LineElement): TrackElement {
    const clonedElement = new LineElement(
      element.getProps()!.fill,
      { width: element.getProps()!.width, height: element.getProps()!.height }
    );
    this.cloneElementProperties(element, clonedElement);
    return clonedElement;
  }

  visitEffectElement(element: EffectElement): TrackElement {
    const clonedElement = new EffectElement(element.getEffectKey(), element.getProps());
    this.cloneElementProperties(element, clonedElement);
    return clonedElement;
  }
}
