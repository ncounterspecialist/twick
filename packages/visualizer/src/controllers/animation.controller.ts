import { BlurAnimation } from "../animations/blur";
import { BreatheAnimation } from "../animations/breathe";
import { FadeAnimation } from "../animations/fade";
import { PhotoRiseAnimation } from "../animations/photo-rise";
import { PhotoZoomAnimation } from "../animations/photo-zoom";
import { RiseAnimation } from "../animations/rise";
import { SuccessionAnimation } from "../animations/succession";
import { Animation } from "../helpers/types";

export class AnimationController {
    private animations: Map<string, Animation> = new Map();
  
    register(animation: Animation) {
      this.animations.set(animation.name, animation);
    }
  
    get(name: string): Animation | undefined {
      return this.animations.get(name);
    }
  
    list(): string[] {
      return Array.from(this.animations.keys());
    }
  }

  export const registerAnimations = () => {
    animationController.register(FadeAnimation);
    animationController.register(RiseAnimation);
    animationController.register(BreatheAnimation);
    animationController.register(SuccessionAnimation);
    animationController.register(BlurAnimation);
    animationController.register(PhotoZoomAnimation);
    animationController.register(PhotoRiseAnimation);
  }

  const animationController = new AnimationController();  
  registerAnimations();

  export default animationController;