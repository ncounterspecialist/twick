import type { CanvasElementHandler } from "../types";
import { VideoElement } from "../elements/video.element";
import { ImageElement } from "../elements/image.element";
import { RectElement } from "../elements/rect.element";
import { CircleElement } from "../elements/circle.element";
import { TextElement } from "../elements/text.element";
import { CaptionElement } from "../elements/caption.element";
import { WatermarkElement } from "../elements/watermark.element";
import { ArrowElement } from "../elements/arrow.element";
import { LineElement } from "../elements/line.element";
import { EffectElement } from "../elements/effect.element";

/**
 * Registry for canvas element handlers. Enables scalable dispatch by type:
 * elementController.get(element.type)?.add(params) and updateFromFabricObject(...).
 */
export class ElementController {
  private elements = new Map<string, CanvasElementHandler>();

  register(handler: CanvasElementHandler) {
    this.elements.set(handler.name, handler);
  }

  get(name: string): CanvasElementHandler | undefined {
    return this.elements.get(name);
  }

  list(): string[] {
    return Array.from(this.elements.keys());
  }
}

const elementController = new ElementController();

function registerElements() {
  elementController.register(VideoElement);
  elementController.register(ImageElement);
  elementController.register(RectElement);
  elementController.register(CircleElement);
  elementController.register(TextElement);
  elementController.register(CaptionElement);
  elementController.register(WatermarkElement);
  elementController.register(ArrowElement);
  elementController.register(LineElement);
  elementController.register(EffectElement);
}

registerElements();

export function registerCanvasHandler(handler: CanvasElementHandler): void {
  elementController.register(handler);
}

export function getCanvasHandler(name: string): CanvasElementHandler | undefined {
  return elementController.get(name);
}

export default elementController;
