import { Element } from "./types";
import { CaptionElement } from "../elements/caption.element";
import { IconElement } from "../elements/icon.element";
import { ImageElement } from "../elements/image.element";
import { VideoElement } from "../elements/video.element";
import { AudioElement } from "../elements/audio.element";
import { RectElement } from "../elements/rect.element";
import { CircleElement } from "../elements/circle.element";
import { SceneElement } from "../elements/scene.element";
import { TextElement } from "../elements/text.element";

export class ElementManager {
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
    elementManager.register(CaptionElement);
    elementManager.register(IconElement);
    elementManager.register(TextElement);
    elementManager.register(ImageElement);
    elementManager.register(VideoElement);
    elementManager.register(AudioElement);
    elementManager.register(RectElement);
    elementManager.register(CircleElement);
    elementManager.register(SceneElement);
  }

  const elementManager = new ElementManager();  
  registerElements();

  export default elementManager;