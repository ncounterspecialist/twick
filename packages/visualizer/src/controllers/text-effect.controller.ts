import { ElasticEffect } from "../text-effects/elastic";
import { EraseEffect } from "../text-effects/erase";  
import { StreamWordEffect } from "../text-effects/stream-word";
import { TypewriterEffect } from "../text-effects/typewriter";
import { TextEffect } from "../helpers/types";

export class TextEffectController {
    private effects: Map<string, TextEffect> = new Map();
  
    register(effect: TextEffect) {
      this.effects.set(effect.name, effect);
    }
  
    get(name: string): TextEffect | undefined {
      return this.effects.get(name);
    }
  
    list(): string[] {
      return Array.from(this.effects.keys());
    }
  }

  export const registerTextEffects = () => {
    textEffectController.register(TypewriterEffect);
    textEffectController.register(StreamWordEffect);
    textEffectController.register(EraseEffect);
    textEffectController.register(ElasticEffect);
  }

  const textEffectController = new TextEffectController();  
  registerTextEffects();

  export default textEffectController;