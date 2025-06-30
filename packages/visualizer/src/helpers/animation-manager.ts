import { Animation } from "./types";

export class AnimationManager {
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

  const animationManager = new AnimationManager();  
  registerAnimations();

  export default animationManager;