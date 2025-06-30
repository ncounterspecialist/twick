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
  }

  const animationController = new AnimationController();  
  registerAnimations();

  export default animationController;