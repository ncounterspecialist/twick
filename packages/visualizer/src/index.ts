/**
 * @twick/visualizer - Professional Video Visualization Library
 * 
 * A comprehensive TypeScript library for creating dynamic video visualizations with
 * animations, effects, and interactive elements. Built on top of @twick/2d and @twick/core
 * for high-performance 2D graphics and animation.
 * 
 * ## 🚀 Quick Start
 * 
 * ```js
 * import { scene } from '@twick/visualizer';
 * import { makeScene2D } from '@twick/2d';
 * 
 * // Create a video visualization
 * const videoScene = makeScene2D("video-scene", function* (view) {
 *   yield* scene({
 *     backgroundColor: "#000000",
 *     playerId: "main-player",
 *     properties: { width: 1920, height: 1080 },
 *     tracks: [
 *       {
 *         id: "main-track",
 *         type: "video",
 *         elements: [
 *           {
 *             id: "intro-video",
 *             type: "video",
 *             s: 0,
 *             e: 10,
 *             props: { src: "intro.mp4" },
 *             animation: {
 *               name: "fade",
 *               animate: "enter",
 *               duration: 2
 *             }
 *           }
 *         ]
 *       }
 *     ]
 *   });
 * });
 * ```
 * 
 * ## 🎯 Getting Started
 * 
 * ### 1. Installation
 * ```bash
 * pnpm add @twick/visualizer @twick/2d @twick/core
 * ```
 * 
 * ### 2. Basic Usage
 * ```js
 * import { scene } from '@twick/visualizer';
 * import { makeScene2D } from '@twick/2d';
 * 
 * // Simple fade-in text
 * const simpleScene = makeScene2D("simple", function* (view) {
 *   yield* scene({
 *     backgroundColor: "#1a1a1a",
 *     playerId: "simple-player",
 *     properties: { width: 1920, height: 1080 },
 *     tracks: [{
 *       id: "text-track",
 *       type: "element",
 *       elements: [{
 *         id: "welcome-text",
 *         type: "text",
 *         s: 0, e: 5,
 *         t: "Welcome!",
 *         props: {
 *           fill: "#ffffff",
 *           fontSize: 72,
 *           fontFamily: "Arial"
 *         },
 *         animation: {
 *           name: "fade",
 *           animate: "enter",
 *           duration: 2
 *         }
 *       }]
 *     }]
 *   });
 * });
 * ```
 * 
 * ### 3. Advanced Features
 * - **Multi-track scenes** with synchronized elements
 * - **Complex animations** with enter/exit effects
 * - **Text effects** like typewriter and streaming
 * - **Frame effects** for visual masking
 * - **Media integration** for video, audio, and images
 * 
 * ## 📚 Core Concepts
 * 
 * ### Elements
 * Visual components that can be rendered in the scene:
 * - **Media Elements**: Video, Image, Audio for content display
 * - **Text Elements**: Text, Caption for information overlay
 * - **Shape Elements**: Rect, Circle, Icon for UI components
 * - **Container Elements**: Scene for organization
 * 
 * ### Animations
 * Motion effects that bring elements to life:
 * - **Basic**: Fade, Rise for simple transitions
 * - **Advanced**: Blur, Breathe, Succession for complex effects
 * - **Photo-specific**: PhotoRise, PhotoZoom for media content
 * 
 * ### Text Effects
 * Character and word-level text animations:
 * - **Typewriter**: Character-by-character reveal
 * - **Stream Word**: Word-by-word animation
 * - **Elastic**: Bounce-in effects
 * - **Erase**: Backspace-style removal
 * 
 * ### Frame Effects
 * Visual masking and container transformations:
 * - **Circle Frame**: Circular content masking
 * - **Rect Frame**: Rectangular content masking
 * 
 * ## 🎯 Use Cases
 * 
 * - **Video Presentations**: Professional slideshows with animations
 * - **Content Creation**: Social media videos with effects
 * - **Educational Content**: Interactive learning materials
 * - **Marketing Videos**: Branded content with visual effects
 * - **Live Streaming**: Real-time visual enhancements
 * 
 * ## 🔧 Integration
 * 
 * The library integrates seamlessly with:
 * - **@twick/2d**: 2D graphics and scene management
 * - **@twick/core**: Animation and timing utilities
 * - **@twick/timeline**: Timeline-based content management
 * - **@twick/video-editor**: Video editing capabilities
 * 
 * ## 📖 Documentation Structure
 * 
 * This documentation is organized into logical categories:
 * 1. **Core**: Main scene generator and core functionality
 * 2. **Animations**: Motion effects and transitions
 * 3. **Elements**: Visual components and content
 * 4. **Text Effects**: Text animation and styling
 * 5. **Frame Effects**: Visual masking and containers
 * 6. **Types**: TypeScript type definitions
 * 7. **Interfaces**: Component interfaces and contracts
 * 
 * Each component includes:
 * - Detailed description and use cases
 * - Complete parameter documentation
 * - Practical code examples
 * - Integration patterns
 * - Performance considerations
 * 
 * ## 🚀 Performance Tips
 * 
 * - **Use parallel animations** with `all()` for better performance
 * - **Optimize timing** by setting precise start/end times
 * - **Reuse elements** when possible to reduce memory usage
 * - **Batch operations** for multiple similar elements
 * - **Monitor resource usage** for large scenes
 * 
 * ## 🔍 Troubleshooting
 * 
 * **Common Issues:**
 * - **Elements not appearing**: Check start/end timing values
 * - **Animations not working**: Verify animation name and parameters
 * - **Performance issues**: Use parallel execution and optimize timing
 * - **Memory leaks**: Ensure proper cleanup of media resources
 * 
 * **Debug Tips:**
 * - Use browser dev tools to inspect scene structure
 * - Check console logs for timing and error messages
 * - Verify all required dependencies are installed
 * - Test with simple examples before complex scenes
 * 
 * @packageDocumentation
 */

// Types
export * from './helpers/types';

// Components
export * from './visualizer';

/**
 * @group Core
 * @description Main scene generator and core functionality
 */
export { scene } from './visualizer';

// Grouped exports for better organization
export * from './animations';
export * from './elements';
export * from './text-effects';
export * from './frame-effects';

// Watermark renderer registry (Option B – register custom watermark types)
export { default as watermarkController } from './controllers/watermark.controller';
export { WatermarkController } from './controllers/watermark.controller';
export type { WatermarkRendererContract, WatermarkRendererParams } from './helpers/watermark.types';

