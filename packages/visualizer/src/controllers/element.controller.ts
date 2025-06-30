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
  }

  const elementController = new ElementController();  
  registerElements();

  export default elementController;