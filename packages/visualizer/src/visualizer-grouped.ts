/**
 * @twick/visualizer - Professional Video Visualization Library
 * 
 * A comprehensive TypeScript library for creating dynamic video visualizations with
 * animations, effects, and interactive elements. Built on top of @twick/2d and @twick/core
 * for high-performance 2D graphics and animation.
 * 
 * @packageDocumentation
 */

// Types
export * from './helpers/types';

// Core functionality
export * from './visualizer';

/**
 * @group Core
 * @description Main scene generator and core functionality
 */
export { scene } from './visualizer';

/**
 * @group Animations
 * @description Motion effects and transitions for elements
 */

// Basic animations
export { FadeAnimation } from './animations/fade';
export { RiseAnimation } from './animations/rise';

// Advanced animations
export { BlurAnimation } from './animations/blur';
export { BreatheAnimation } from './animations/breathe';
export { SuccessionAnimation } from './animations/succession';

// Photo-specific animations
export { PhotoRiseAnimation } from './animations/photo-rise';
export { PhotoZoomAnimation } from './animations/photo-zoom';

/**
 * @group Elements
 * @description Visual components for creating scenes and content
 */

// Media elements
export { VideoElement } from './elements/video.element';
export { ImageElement } from './elements/image.element';
export { AudioElement } from './elements/audio.element';

// Text and caption elements
export { TextElement } from './elements/text.element';
export { CaptionElement } from './elements/caption.element';

// Shape and UI elements
export { RectElement } from './elements/rect.element';
export { CircleElement } from './elements/circle.element';

// Special elements
export { SceneElement } from './elements/scene.element';

/**
 * @group Text Effects
 * @description Text animation and styling effects
 */

// Basic text effects
export { TypewriterEffect } from './text-effects/typewriter';
export { StreamWordEffect } from './text-effects/stream-word';

// Advanced text effects
export { ElasticEffect } from './text-effects/elastic';
export { EraseEffect } from './text-effects/erase';

/**
 * @group Frame Effects
 * @description Visual frame and masking effects
 */

// Frame effects
export { CircleFrameEffect } from './frame-effects/circle.frame';
export { RectFrameEffect } from './frame-effects/rect.frame';
