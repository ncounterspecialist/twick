import { TextEffect } from "./types";

/**
 * Collection of available text effects for video editor text elements.
 * Provides predefined text animation configurations that can be applied
 * to text elements in the timeline.
 * 
 * @example
 * ```js
 * import { TEXT_EFFECTS } from '@twick/video-editor';
 * 
 * // Get all available text effects
 * const allTextEffects = TEXT_EFFECTS;
 * 
 * // Find a specific text effect
 * const typewriterEffect = TEXT_EFFECTS.find(effect => effect.name === 'typewriter');
 * 
 * // Apply text effect to element
 * textElement.setTextEffect(typewriterEffect);
 * ```
 * 
 * @example
 * ```js
 * // Use text effect with custom settings
 * const elasticEffect = TEXT_EFFECTS.find(effect => effect.name === 'elastic');
 * const customElastic = {
 *   ...elasticEffect,
 *   delay: 0.5,
 *   bufferTime: 0.2
 * };
 * 
 * textElement.setTextEffect(customElastic);
 * ```
 */
export const TEXT_EFFECTS: TextEffect[] = [
  {
    name: "typewriter",
    delay: 0,
    duration: 1,
    bufferTime: 0.1,
    getSample: () => {
      return "";
    },
  },
  {
    name: "erase",
    delay: 0,
    duration: 1,
    bufferTime: 0.1,
    getSample: () => {
      return "";
    },
  },
  {
    name: "elastic",
    delay: 0,
    duration: 1,
    bufferTime: 0.1,
    getSample: () => {
      return "";
    },
  },
  {
    name: "stream-word",
    delay: 0,
    duration: 1,
    bufferTime: 0.1,    
    getSample: () => {
      return "";
    },
  }
];
