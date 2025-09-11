import { animationGifs } from '../assets';
import { Animation } from './types';

/**
 * Collection of available animations for video editor elements.
 * Provides predefined animation configurations with sample previews
 * that can be applied to timeline elements.
 * 
 * @example
 * ```js
 * import { ANIMATIONS } from '@twick/video-editor';
 * 
 * // Get all available animations
 * const allAnimations = ANIMATIONS;
 * 
 * // Find a specific animation
 * const fadeAnimation = ANIMATIONS.find(anim => anim.name === 'fade');
 * 
 * // Get animation sample
 * const sampleGif = fadeAnimation.getSample();
 * 
 * // Apply animation to element
 * element.setAnimation(fadeAnimation);
 * ```
 * 
 * @example
 * ```js
 * // Use animation with custom settings
 * const riseAnimation = ANIMATIONS.find(anim => anim.name === 'rise');
 * const customRise = {
 *   ...riseAnimation,
 *   direction: 'down',
 *   interval: 2
 * };
 * 
 * element.setAnimation(customRise);
 * ```
 */
export const ANIMATIONS: Animation[] = [
  {
    name: "fade",
    interval: 1,
    duration: 1,
    intensity: 1,
    animate: "enter",
    options: {
      animate: ["enter", "exit", "both"],
      interval: [0.1, 5],
      duration: [0.1, 5],
      intensity: [0.1, 2]
    },
    getSample: () => {
      return animationGifs.fade;
    }
  },
  {
    name: "rise",
    interval: 1,
    duration: 1,
    intensity: 1,
    animate: "enter",
    direction: "up",
    options: {
      animate: ["enter", "exit", "both"],
      direction: ["up", "down", "left", "right", "center"],
      interval: [0.1, 5],
      duration: [0.1, 5],
      intensity: [1, 300]
    },
    getSample: (animation?: Animation) => {
      return animation?.direction === "down" ? animationGifs['rise-down'] : animationGifs['rise-up'];
    }
  },
  {
    name: "blur",
    interval: 1,
    duration: 1,
    intensity: 1,
    animate: "enter",
    options: {
      animate: ["enter", "exit", "both"],
      interval: [0.1, 5],
      duration: [0.1, 5],
      intensity: [0.1, 100]
    },
    getSample: () => {
      return animationGifs.blur;
    }
  },
  {
    name: "breathe",
    interval: 1,
    duration: 1,
    intensity: 1,
    mode: "in",
    animate: "enter",
    options: {
      animate: ["enter", "exit", "both"],
      mode: ["in", "out"],
      interval: [0.1, 5],
      duration: [0.1, 5],
      intensity: [0.1, 2]
    },
    getSample: (animation?: Animation) => {
      return animation?.mode === "out" ? animationGifs['breathe-out'] : animationGifs['breathe-in'];
    }
  },
  {
    name: "succession",
    interval: 1,
    duration: 1,
    intensity: 1,
    animate: "enter",
    options: {
      animate: ["enter", "exit", "both"],
      interval: [0.1, 5],
      duration: [0.1, 5],
      intensity: [0.1, 2]
    },
    getSample: () => {
      return animationGifs.succession;
    }
  }
];