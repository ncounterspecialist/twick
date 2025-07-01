
import { CircleFrameEffect } from "../frame-effects/circle.frame";
import { RectFrameEffect } from "../frame-effects/rect.frame";
import {  FrameEffectPlugin } from "../helpers/types";

export class FrameEffectController {
    private frameEffects: Map<string, FrameEffectPlugin> = new Map();
  
    register(frameEffect: FrameEffectPlugin) {
      this.frameEffects.set(frameEffect.name, frameEffect);
    }
  
    get(name: string): FrameEffectPlugin | undefined {
      return this.frameEffects.get(name);
    }
  
    list(): string[] {
      return Array.from(this.frameEffects.keys());
    }
  }

  export const registerFrameEffects = () => {
    frameEffectController.register(CircleFrameEffect);
    frameEffectController.register(RectFrameEffect);
  }

  const frameEffectController = new FrameEffectController();  
  registerFrameEffects();

  export default frameEffectController;