import { AudioElement } from "../elements/audio.element";
import { CaptionElement } from "../elements/caption.element";
import { CircleElement } from "../elements/circle.element";
import { ImageElement } from "../elements/image.element";
import { RectElement } from "../elements/rect.element";
import { SceneElement } from "../elements/scene.element";
import { TextElement } from "../elements/text.element";
import { VideoElement } from "../elements/video.element";
import { Element } from "../helpers/types";

export class ElementController {
    private elements: Map<string, Element> = new Map();
  
    register(element: Element) {
      this.elements.set(element.name, element);
    }
  
    get(name: string): Element | undefined {
      return this.elements.get(name);
    }
  
    list(): string[] {
      return Array.from(this.elements.keys());
    }
  }

  export const registerElements = () => {
    elementController.register(VideoElement);
    elementController.register(CaptionElement);
    elementController.register(SceneElement);
    elementController.register(ImageElement);
    elementController.register(TextElement);
    elementController.register(AudioElement);
    elementController.register(CircleElement);
    elementController.register(RectElement);
  }

  const elementController = new ElementController();  
  registerElements();

  export default elementController;