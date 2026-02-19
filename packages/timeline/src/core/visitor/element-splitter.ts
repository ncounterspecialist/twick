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
import { ElementCloner } from "./element-cloner";
import { canSplitElement } from "../../utils/timeline.utils";

export interface SplitResult {
  firstElement: any;
  secondElement: any;
  success: boolean;
}

export class ElementSplitter implements ElementVisitor<SplitResult> {
  private splitTime: number;
  private elementCloner: ElementCloner;
  constructor(splitTime: number) {
    this.splitTime = splitTime;
    this.elementCloner = new ElementCloner();
  }

  visitVideoElement(element: VideoElement): SplitResult {
    if (!canSplitElement(element, this.splitTime)) {
      return { firstElement: null, secondElement: null, success: false };
    }

    const firstElement = this.elementCloner.visitVideoElement(
      element
    ) as VideoElement;
    const secondElement = this.elementCloner.visitVideoElement(
      element
    ) as VideoElement;

    const props = element.getProps();
    const secondStartAt =
      (props!.time ?? 0) +
      (this.splitTime - element.getStart()) * (props!.playbackRate ?? 1);
    firstElement.setEnd(this.splitTime);
    secondElement.setStart(this.splitTime).setStartAt(secondStartAt);

    return { firstElement, secondElement, success: true };
  }

  visitAudioElement(element: AudioElement): SplitResult {
    if (!canSplitElement(element, this.splitTime)) {
      return { firstElement: null, secondElement: null, success: false };
    }
    const firstElement = this.elementCloner.visitAudioElement(
      element
    ) as AudioElement;
    const secondElement = this.elementCloner.visitAudioElement(
      element
    ) as AudioElement;

    const props = element.getProps();
    const secondStartAt =
      (props!.time ?? 0) +
      (this.splitTime - element.getStart()) * (props!.playbackRate ?? 1);
    firstElement.setEnd(this.splitTime);
    secondElement.setStart(this.splitTime).setStartAt(secondStartAt);

    return { firstElement, secondElement, success: true };
  }

  visitImageElement(element: ImageElement): SplitResult {
    if (!canSplitElement(element, this.splitTime)) {
      return { firstElement: null, secondElement: null, success: false };
    }
    const firstElement = this.elementCloner.visitImageElement(
      element
    ) as ImageElement;
    const secondElement = this.elementCloner.visitImageElement(
      element
    ) as ImageElement;
    firstElement.setEnd(this.splitTime);
    secondElement.setStart(this.splitTime);
    return { firstElement, secondElement, success: true };
  }

  visitTextElement(element: TextElement): SplitResult {
    if (!canSplitElement(element, this.splitTime)) {
      return { firstElement: null, secondElement: null, success: false };
    }
    const originalText = element.getText() || "";
    const originalTextArray = originalText.split(" ");
    const percentage =
      (this.splitTime - element.getStart()) / element.getDuration();
    const firstElement = this.elementCloner.visitTextElement(
      element
    ) as TextElement;
    firstElement.setText(
      originalTextArray
        .slice(0, Math.floor(originalTextArray.length * percentage))
        .join(" ")
    );
    firstElement.setEnd(this.splitTime);
    const secondElement = this.elementCloner.visitTextElement(
      element
    ) as TextElement;
    secondElement.setText(
      originalTextArray
        .slice(
          Math.floor(originalTextArray.length * percentage),
          originalTextArray.length
        )
        .join(" ")
    );
    secondElement.setStart(this.splitTime);
    return { firstElement, secondElement, success: true };
  }

  visitCaptionElement(element: CaptionElement): SplitResult {
    if (!canSplitElement(element, this.splitTime)) {
      return { firstElement: null, secondElement: null, success: false };
    }
    const originalText = element.getText() || "";
    const originalTextArray = originalText.split(" ");
    const percentage =
      (this.splitTime - element.getStart()) / element.getDuration();
    const firstElement = this.elementCloner.visitCaptionElement(
      element
    ) as CaptionElement;
    firstElement.setText(
      originalTextArray
        .slice(0, Math.floor(originalTextArray.length * percentage))
        .join(" ")
    );
    firstElement.setEnd(this.splitTime);
    const secondElement = this.elementCloner.visitCaptionElement(
      element
    ) as CaptionElement;
    secondElement.setText(
      originalTextArray
        .slice(
          Math.floor(originalTextArray.length * percentage),
          originalTextArray.length
        )
        .join(" ")
    );
    secondElement.setStart(this.splitTime);
    return { firstElement, secondElement, success: true };
  }

  visitRectElement(element: RectElement): SplitResult {
    if (!canSplitElement(element, this.splitTime)) {
      return { firstElement: null, secondElement: null, success: false };
    }
    const firstElement = this.elementCloner.visitRectElement(
      element
    ) as RectElement;
    const secondElement = this.elementCloner.visitRectElement(
      element
    ) as RectElement;
    firstElement.setEnd(this.splitTime);
    secondElement.setStart(this.splitTime);
    return { firstElement, secondElement, success: true };
  }

  visitCircleElement(element: CircleElement): SplitResult {
    if (!canSplitElement(element, this.splitTime)) {
      return { firstElement: null, secondElement: null, success: false };
    }
    const firstElement = this.elementCloner.visitCircleElement(element);
    const secondElement = this.elementCloner.visitCircleElement(element);
    firstElement.setEnd(this.splitTime);
    secondElement.setStart(this.splitTime);
    return { firstElement, secondElement, success: true };
  }

  visitIconElement(element: IconElement): SplitResult {
    if (!canSplitElement(element, this.splitTime)) {
      return { firstElement: null, secondElement: null, success: false };
    }
    const firstElement = this.elementCloner.visitIconElement(element);
    const secondElement = this.elementCloner.visitIconElement(element);
    firstElement.setEnd(this.splitTime);
    secondElement.setStart(this.splitTime);
    return { firstElement, secondElement, success: true };
  }

  visitPlaceholderElement(element: PlaceholderElement): SplitResult {
    if (!canSplitElement(element, this.splitTime)) {
      return { firstElement: null, secondElement: null, success: false };
    }
    const firstElement = this.elementCloner.visitPlaceholderElement(element);
    const secondElement = this.elementCloner.visitPlaceholderElement(element);
    firstElement.setEnd(this.splitTime);
    secondElement.setStart(this.splitTime);
    return { firstElement, secondElement, success: true };
  }
}
