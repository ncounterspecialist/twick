import { ElasticEffect } from "../text-effects/elastic";
import { EraseEffect } from "../text-effects/erase";  
import { StreamWordEffect } from "../text-effects/stream-word";
import { TypewriterEffect } from "../text-effects/typewriter";
import { TextEffect } from "./types";

export class TextEffectManager {
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
    textEffectManager.register(TypewriterEffect);
    textEffectManager.register(StreamWordEffect);
    textEffectManager.register(EraseEffect);
    textEffectManager.register(ElasticEffect);
  }

  const textEffectManager = new TextEffectManager();  
  registerTextEffects();

  export default textEffectManager;