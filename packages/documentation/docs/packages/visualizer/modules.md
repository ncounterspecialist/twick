# @twick/visualizer - v0.15.0

@twick/visualizer - Professional Video Visualization Library

A comprehensive TypeScript library for creating dynamic video visualizations with
animations, effects, and interactive elements. Built on top of @twick/2d and @twick/core
for high-performance 2D graphics and animation.

## Table of contents

### FadeAnimation

- [FadeAnimation](modules.md#fadeanimation)

### VideoElement

- [VideoElement](modules.md#videoelement)

### Interfaces

- [Element](interfaces/Element.md)
- [TextEffect](interfaces/TextEffect.md)
- [Animation](interfaces/Animation.md)
- [FrameEffectPlugin](interfaces/FrameEffectPlugin.md)

### AudioElement
AudioElement creates and manages audio content in the visualizer scene.
Handles audio playback, timing, and synchronization for background music,
sound effects, and audio narration in video presentations.

Features:
- Audio playback with start/end timing control
- Automatic play/pause management
- Resource cleanup and memory management
- Synchronization with visual elements

- [AudioElement](modules.md#audioelement)

### BlurAnimation
BlurAnimation applies a blur effect to an element or its container during enter,
exit, or both animations. Creates smooth blur transitions for professional
visual effects that can focus attention or create depth.

Available animation modes:
- "enter": Starts blurred and gradually becomes clear
- "exit": Starts clear and gradually becomes blurred
- "both": Blurs in, clears, then blurs out

- [BlurAnimation](modules.md#bluranimation)

### BreatheAnimation
BreatheAnimation applies a smooth scale in/out effect to simulate a "breathing" motion.
Creates gentle pulsing animations that add life and movement to static elements.
Perfect for subtle background animations and attention-grabbing effects.

Available modes:
- "in": Gradually scales down (shrinks) to the target intensity
- "out": Starts scaled down, then grows back to original size

- [BreatheAnimation](modules.md#breatheanimation)

### CaptionElement
CaptionElement creates and manages styled text overlays in the visualizer scene.
Handles caption rendering, text effects, background styling, and timing
for professional video presentations and content creation.

Features:
- Styled text with custom fonts, colors, and backgrounds
- Word-by-word timing and animation
- Background highlighting and styling options
- Text effects and animations
- Automatic timing and synchronization

- [CaptionElement](modules.md#captionelement)

### CircleElement
CircleElement creates and manages circular shape elements in the visualizer scene.
Handles circle rendering, styling, and animations for UI elements and
visual design components.

Features:
- Circle rendering with custom styling
- Radius and position control
- Color and border customization
- Animation support

- [CircleElement](modules.md#circleelement)

### ElasticEffect
ElasticEffect applies a scaling animation to text elements with an elastic easing 
curve for a "pop" or "bounce" effect. Creates playful, attention-grabbing text 
animations that bounce into view with natural physics.

Behavior:
- Optionally waits for a delay
- Starts at zero scale (invisible)
- Scales up to full size with an elastic bounce

- [ElasticEffect](modules.md#elasticeffect)

### EraseEffect
EraseEffect animates text disappearing letter by letter, simulating an "erasing"
or backspace effect. Creates engaging text removal animations that mimic
real-world erasing or typing corrections.

Behavior:
- Optionally waits for a delay before starting
- Preserves the original element size
- Animates removing one character at a time from the end

- [EraseEffect](modules.md#eraseeffect)

### IconElement
IconElement creates and manages icon elements in the visualizer scene.
Handles icon rendering, styling, and animations for UI elements and
visual design components.

Features:
- Icon rendering with custom styling
- Size and position control
- Color and opacity customization
- Animation support

- [IconElement](modules.md#iconelement)

### ImageElement
ImageElement creates and manages image content in the visualizer scene.
Handles image rendering, frame effects, animations, and content fitting
for professional image presentations and content creation.

Features:
- Image rendering with start/end timing control
- Frame effects and animations
- Object fit options for content scaling
- Color filters and media effects
- Automatic cleanup and resource management

- [ImageElement](modules.md#imageelement)

### PhotoRiseAnimation
PhotoRiseAnimation applies a smooth directional movement to a photo element.
Creates elegant slide-in animations that bring photos into view from any direction.
Perfect for photo galleries, presentations, and content reveals.

Behavior:
- Starts offset in a given direction (up, down, left, or right)
- Animates back to the original position over the specified duration

Available directions:
- "up": Starts below and moves upward
- "down": Starts above and moves downward
- "left": Starts to the right and moves leftward
- "right": Starts to the left and moves rightward

- [PhotoRiseAnimation](modules.md#photoriseanimation)

### PhotoZoomAnimation
PhotoZoomAnimation applies a smooth zoom-in or zoom-out effect on a photo element.
Creates dynamic zoom effects that add depth and focus to photo content.
Perfect for highlighting details or creating cinematic photo presentations.

Available animation modes:
- "in": Starts zoomed in and smoothly scales back to the original size
- "out": Starts at normal size and smoothly scales up to the target zoom level

- [PhotoZoomAnimation](modules.md#photozoomanimation)

### RectElement
RectElement creates and manages rectangular shape elements in the visualizer scene.
Handles rectangle rendering, styling, and animations for UI elements and
visual design components.

Features:
- Rectangle rendering with custom styling
- Size and position control
- Color and border customization
- Animation support

- [RectElement](modules.md#rectelement)

### RiseAnimation
RiseAnimation combines vertical motion and opacity transitions to create a "rising"
(or "falling") appearance/disappearance effect. Moves elements vertically with
optional scaling effects for dynamic visual impact.

Available animation modes:
- "enter": Starts offset and transparent, moves into position while fading in
- "exit": Waits, then moves out of position while fading out
- "both": Enters, waits, and exits in a continuous sequence

- [RiseAnimation](modules.md#riseanimation)

### SceneElement
SceneElement creates and manages scene container elements in the visualizer.
Handles scene setup, background configuration, and container management
for organizing visual content and elements.

Features:
- Scene container creation and management
- Background and environment setup
- Element organization and grouping
- Scene-level animations and effects

- [SceneElement](modules.md#sceneelement)

### StreamWordEffect
StreamWordEffect animates text appearing word by word, creating a smooth
"typing" or "streaming" effect. Animates text word by word for natural
reading flow and storytelling content.

Behavior:
- Optionally waits for a delay before starting
- Clears the text initially and preserves the original size
- Reveals one word at a time with a consistent interval

- [StreamWordEffect](modules.md#streamwordeffect)

### SuccessionAnimation
SuccessionAnimation combines scaling and opacity transitions to create an appearing
and disappearing zoom effect. Creates dynamic zoom animations that draw attention
to content with smooth scaling and fade transitions.

Available animation modes:
- "enter": Starts scaled down and transparent, then scales up while fading in
- "exit": Waits, then scales down while fading out
- "both": Scales up and fades in, waits, then scales down and fades out

- [SuccessionAnimation](modules.md#successionanimation)

### TextElement
TextElement creates and manages text content in the visualizer scene.
Handles text rendering, animations, and text effects for dynamic
text presentations and content creation.

Features:
- Text rendering with custom styling and fonts
- Text animations and effects
- Timing control and synchronization
- Automatic cleanup and resource management

- [TextElement](modules.md#textelement)

### Type Aliases

- [VideoInput](modules.md#videoinput)
- [MediaType](modules.md#mediatype)
- [ObjectFit](modules.md#objectfit)
- [SizeVector](modules.md#sizevector)
- [Size](modules.md#size)
- [SizeArray](modules.md#sizearray)
- [Position](modules.md#position)
- [FrameEffect](modules.md#frameeffect)
- [FrameEffectProps](modules.md#frameeffectprops)
- [CaptionStyle](modules.md#captionstyle)
- [Caption](modules.md#caption)
- [CaptionProps](modules.md#captionprops)
- [CaptionColors](modules.md#captioncolors)
- [CaptionFont](modules.md#captionfont)
- [VisualizerElement](modules.md#visualizerelement)
- [VisualizerTrack](modules.md#visualizertrack)
- [ElementParams](modules.md#elementparams)
- [TextEffectParams](modules.md#texteffectparams)
- [TextEffectProps](modules.md#texteffectprops)
- [AnimationParams](modules.md#animationparams)
- [AnimationProps](modules.md#animationprops)
- [FrameEffectParams](modules.md#frameeffectparams)
- [FrameState](modules.md#framestate)

### TypewriterEffect
TypewriterEffect animates text appearing one character at a time, mimicking the
behavior of a classic typewriter. Creates a nostalgic, engaging text animation
that draws attention to important content.

Behavior:
- Optionally waits for a delay before starting
- Clears the text initially and preserves the element's original size
- Reveals one character at a time at a consistent interval

- [TypewriterEffect](modules.md#typewritereffect)

### Core Variables

- [scene](modules.md#scene)

### Other Variables

- [CircleFrameEffect](modules.md#circleframeeffect)
- [RectFrameEffect](modules.md#rectframeeffect)

## FadeAnimation

### FadeAnimation

• `Const` **FadeAnimation**: `Object`

**`Description`**

Simple fade-in and fade-out effects for smooth element transitions

FadeAnimation applies a simple fade-in and fade-out effect by adjusting opacity.
Creates smooth opacity transitions for elements entering or exiting the scene.
Perfect for subtle, professional animations that don't distract from content.

## Animation Modes

- **"enter"**: Starts transparent and fades in to fully opaque
- **"exit"**: Waits, then fades out to transparent  
- **"both"**: Fades in, waits, then fades out

## Use Cases

- **Text overlays**: Smooth introduction of captions and titles
- **Background elements**: Subtle scene transitions
- **UI components**: Professional interface animations
- **Content reveals**: Gentle disclosure of information

## Best Practices

- **Duration**: 1-3 seconds for most use cases
- **Timing**: Use "enter" for introductions, "exit" for conclusions
- **Combination**: Pair with other animations for complex effects
- **Performance**: Lightweight and efficient for multiple elements

## Integration Examples

### Basic Text Fade
```js
{
  id: "welcome-text",
  type: "text",
  s: 0, e: 5,
  t: "Welcome!",
  animation: {
    name: "fade",
    animate: "enter",
    duration: 2
  }
}
```

### Video with Fade Transition
```js
{
  id: "intro-video",
  type: "video",
  s: 0, e: 10,
  props: { src: "intro.mp4" },
  animation: {
    name: "fade",
    animate: "both",
    duration: 3,
    interval: 1
  }
}
```

### Multi-Element Fade Sequence
```js
// Fade in multiple elements with staggered timing
const elements = [
  {
    id: "title",
    type: "text",
    s: 0, e: 8,
    t: "Main Title",
    animation: { name: "fade", animate: "enter", duration: 2 }
  },
  {
    id: "subtitle", 
    type: "text",
    s: 1, e: 8,
    t: "Subtitle",
    animation: { name: "fade", animate: "enter", duration: 2 }
  },
  {
    id: "background",
    type: "rect",
    s: 0, e: 10,
    props: { fill: "#000000", opacity: 0.5 },
    animation: { name: "fade", animate: "enter", duration: 1.5 }
  }
];
```

**`Param`**

Reference to the main element to animate

**`Param`**

Optional reference to a container element

**`Param`**

Duration of the fade transition in seconds

**`Param`**

Total duration of the animation in seconds

**`Param`**

Animation phase ("enter" | "exit" | "both")

**`Example`**

```js
// Basic fade-in animation
animation: {
  name: "fade",
  animate: "enter",
  duration: 2,
  direction: "center"
}

// Fade in and out
animation: {
  name: "fade",
  animate: "both",
  duration: 3,
  interval: 1
}
```

#### Type declaration

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `run` | (`params`: [`AnimationParams`](modules.md#animationparams)) => `Generator`\<`any`, `void`, `any`\> |

#### Defined in

[animations/fade.tsx:118](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/visualizer/src/animations/fade.tsx#L118)

## VideoElement

### VideoElement

• `Const` **VideoElement**: `Object`

**`Description`**

Professional video content management with effects and animations

VideoElement creates and manages video content in the visualizer scene.
Handles video playback, frame effects, animations, and content fitting
for professional video presentations and content creation.

## Key Features

- **Video playback** with start/end timing control
- **Frame effects** and animations for visual enhancement
- **Object fit options** for content scaling (contain, cover, fill, none)
- **Color filters** and media effects for artistic styling
- **Automatic cleanup** and resource management
- **Synchronization** with other scene elements

## Use Cases

- **Main content videos**: Primary video content with effects
- **Background videos**: Ambient video backgrounds
- **Video overlays**: Picture-in-picture style content
- **Video transitions**: Smooth scene-to-scene transitions
- **Video effects**: Artistic and creative video manipulation

## Best Practices

- **Format**: Use MP4 with H.264 encoding for best compatibility
- **Resolution**: Match scene dimensions or use appropriate object-fit
- **Performance**: Optimize video files for web delivery
- **Timing**: Set precise start/end times for synchronization
- **Effects**: Combine with animations and frame effects for impact

## Integration Examples

### Basic Video Element
```js
{
  id: "main-video",
  type: "video",
  s: 0, e: 15,
  props: {
    src: "video.mp4",
    width: 1920,
    height: 1080
  },
  objectFit: "cover"
}
```

### Video with Animation
```js
{
  id: "intro-video",
  type: "video",
  s: 0, e: 10,
  props: { src: "intro.mp4" },
  animation: {
    name: "fade",
    animate: "enter",
    duration: 2
  },
  objectFit: "contain"
}
```

### Video with Frame Effect
```js
{
  id: "framed-video",
  type: "video",
  s: 2, e: 20,
  props: { src: "content.mp4" },
  frameEffects: [{
    name: "circle",
    s: 2, e: 20,
    props: {
      frameSize: [500, 500],
      frameShape: "circle",
      framePosition: { x: 960, y: 540 },
      radius: 250,
      objectFit: "cover",
      transitionDuration: 1.5
    }
  }]
}
```

### Complex Video Scene
```js
// Multi-track video scene with overlays
const videoScene = {
  backgroundColor: "#000000",
  playerId: "video-player",
  properties: { width: 1920, height: 1080 },
  tracks: [
    {
      id: "background",
      type: "video",
      elements: [{
        id: "bg-video",
        type: "video",
        s: 0, e: 30,
        props: { src: "background.mp4", opacity: 0.3 },
        objectFit: "cover"
      }]
    },
    {
      id: "main-content",
      type: "video", 
      elements: [
        {
          id: "main-video",
          type: "video",
          s: 2, e: 25,
          props: { src: "main-content.mp4" },
          animation: {
            name: "fade",
            animate: "enter",
            duration: 2
          },
          frameEffects: [{
            name: "rect",
            s: 2, e: 25,
            props: {
              frameSize: [800, 600],
              frameShape: "rect",
              framePosition: { x: 960, y: 540 },
              radius: 20,
              objectFit: "cover"
            }
          }]
        },
        {
          id: "video-caption",
          type: "caption",
          s: 5, e: 20,
          t: "Video Caption",
          props: {
            colors: { text: "#ffffff", background: "rgba(0,0,0,0.7)" },
            font: { family: "Arial", size: 36, weight: 600 }
          }
        }
      ]
    }
  ]
};
```

## 🚀 Performance Tips

- **Preload videos** for smooth playback
- **Use appropriate object-fit** to avoid unnecessary scaling
- **Optimize video files** for web delivery (compression, format)
- **Batch frame effects** for better performance
- **Monitor memory usage** with multiple video elements

**`Param`**

Reference to the container element

**`Param`**

Video element configuration and properties

**`Param`**

The main scene view for rendering

**`Example`**

```js
// Basic video element
{
  id: "main-video",
  type: "video",
  s: 0, e: 15,
  props: {
    src: "video.mp4",
    width: 1920,
    height: 1080
  },
  objectFit: "cover"
}

// Video with frame effect and animation
{
  id: "framed-video",
  type: "video",
  s: 2, e: 20,
  props: { src: "content.mp4" },
  animation: {
    name: "fade",
    animate: "enter",
    duration: 2
  },
  frameEffects: [{
    name: "circle",
    s: 2, e: 20,
    props: {
      frameSize: [500, 500],
      frameShape: "circle",
      framePosition: { x: 960, y: 540 },
      radius: 250,
      objectFit: "cover"
    }
  }]
}
```

#### Type declaration

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `create` | (`params`: [`ElementParams`](modules.md#elementparams)) => `Generator`\<`any`, `void`, `any`\> |

#### Defined in

[elements/video.element.tsx:209](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/visualizer/src/elements/video.element.tsx#L209)

## AudioElement
AudioElement creates and manages audio content in the visualizer scene.
Handles audio playback, timing, and synchronization for background music,
sound effects, and audio narration in video presentations.

Features:
- Audio playback with start/end timing control
- Automatic play/pause management
- Resource cleanup and memory management
- Synchronization with visual elements

### AudioElement

• `Const` **AudioElement**: `Object`

**`Param`**

Reference to the container element

**`Param`**

Audio element configuration and properties

**`Param`**

The main scene view for rendering

**`Example`**

```js
// Basic audio element
{
  id: "background-music",
  type: "audio",
  s: 0,
  e: 30,
  props: {
    src: "music.mp3",
    volume: 0.7
  }
}

// Sound effect with timing
{
  id: "sound-effect",
  type: "audio",
  s: 5,
  e: 8,
  props: {
    src: "effect.wav",
    volume: 1.0
  }
}
```

#### Type declaration

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `create` | (`params`: [`ElementParams`](modules.md#elementparams)) => `Generator`\<`any`, `void`, `any`\> |

#### Defined in

[elements/audio.element.tsx:50](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/visualizer/src/elements/audio.element.tsx#L50)

## BlurAnimation
BlurAnimation applies a blur effect to an element or its container during enter,
exit, or both animations. Creates smooth blur transitions for professional
visual effects that can focus attention or create depth.

Available animation modes:
- &quot;enter&quot;: Starts blurred and gradually becomes clear
- &quot;exit&quot;: Starts clear and gradually becomes blurred
- &quot;both&quot;: Blurs in, clears, then blurs out

### BlurAnimation

• `Const` **BlurAnimation**: `Object`

**`Param`**

Reference to the main element to animate

**`Param`**

Optional reference to a container element

**`Param`**

Duration of blur transitions in seconds

**`Param`**

Total duration of the animation in seconds

**`Param`**

Maximum blur strength (default: 25)

**`Param`**

Animation phase ("enter" | "exit" | "both")

**`Example`**

```js
// Basic blur-in animation
animation: {
  name: "blur",
  animate: "enter",
  duration: 2,
  intensity: 15
}

// Blur out effect
animation: {
  name: "blur",
  animate: "exit",
  duration: 1.5,
  intensity: 30
}
```

#### Type declaration

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `run` | (`params`: [`AnimationParams`](modules.md#animationparams)) => `Generator`\<`any`, `void`, `any`\> |

#### Defined in

[animations/blur.tsx:41](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/visualizer/src/animations/blur.tsx#L41)

## BreatheAnimation
BreatheAnimation applies a smooth scale in/out effect to simulate a &quot;breathing&quot; motion.
Creates gentle pulsing animations that add life and movement to static elements.
Perfect for subtle background animations and attention-grabbing effects.

Available modes:
- &quot;in&quot;: Gradually scales down (shrinks) to the target intensity
- &quot;out&quot;: Starts scaled down, then grows back to original size

### BreatheAnimation

• `Const` **BreatheAnimation**: `Object`

**`Param`**

Reference to the main element to animate

**`Param`**

Optional reference to a container element

**`Param`**

Animation phase ("in" | "out")

**`Param`**

Duration of the scaling animation in seconds

**`Param`**

Target scale factor (default: 0.5)

**`Example`**

```js
// Gentle breathing in effect
animation: {
  name: "breathe",
  mode: "in",
  duration: 2,
  intensity: 0.8
}

// Breathing out animation
animation: {
  name: "breathe",
  mode: "out",
  duration: 1.5,
  intensity: 0.6
}
```

#### Type declaration

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `run` | (`params`: [`AnimationParams`](modules.md#animationparams)) => `Generator`\<`any`, `void`, `any`\> |

#### Defined in

[animations/breathe.tsx:40](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/visualizer/src/animations/breathe.tsx#L40)

## CaptionElement
CaptionElement creates and manages styled text overlays in the visualizer scene.
Handles caption rendering, text effects, background styling, and timing
for professional video presentations and content creation.

Features:
- Styled text with custom fonts, colors, and backgrounds
- Word-by-word timing and animation
- Background highlighting and styling options
- Text effects and animations
- Automatic timing and synchronization

### CaptionElement

• `Const` **CaptionElement**: `Object`

**`Param`**

Reference to the container element

**`Param`**

Caption configuration including text, styling, and timing

**`Example`**

```js
// Basic caption
{
  id: "welcome-caption",
  type: "caption",
  s: 2,
  e: 8,
  t: "Welcome to our presentation!",
  props: {
    colors: {
      text: "#ffffff",
      background: "rgba(0,0,0,0.7)"
    },
    font: {
      family: "Arial",
      size: 48,
      weight: 600
    }
  }
}

// Caption with background highlighting
{
  id: "highlighted-caption",
  type: "caption",
  s: 3,
  e: 10,
  t: "Important information",
  capStyle: "highlight_bg",
  props: {
    colors: {
      text: "#ffffff",
      background: "rgba(255,0,0,0.8)"
    },
    font: {
      family: "Helvetica",
      size: 36,
      weight: 700
    },
    bgOpacity: 0.9,
    bgOffsetWidth: 20,
    bgOffsetHeight: 10,
    bgMargin: [10, 5],
    bgRadius: 15,
    bgPadding: [20, 15]
  }
}
```

#### Type declaration

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `create` | (`params`: [`ElementParams`](modules.md#elementparams)) => `Generator`\<`any`, `void`, `any`\> |

#### Defined in

[elements/caption.element.tsx:74](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/visualizer/src/elements/caption.element.tsx#L74)

## CircleElement
CircleElement creates and manages circular shape elements in the visualizer scene.
Handles circle rendering, styling, and animations for UI elements and
visual design components.

Features:
- Circle rendering with custom styling
- Radius and position control
- Color and border customization
- Animation support

### CircleElement

• `Const` **CircleElement**: `Object`

**`Param`**

Reference to the container element

**`Param`**

Circle element configuration and properties

**`Param`**

The main scene view for rendering

**`Example`**

```js
// Basic circle element
{
  id: "background-circle",
  type: "circle",
  s: 0,
  e: 20,
  props: {
    radius: 100,
    fill: "#000000",
    opacity: 0.5
  }
}

// Circle with animation
{
  id: "animated-circle",
  type: "circle",
  s: 2,
  e: 15,
  props: {
    radius: 50,
    fill: "#ff0000",
    stroke: "#ffffff",
    strokeWidth: 2
  },
  animation: {
    name: "fade",
    animate: "enter",
    duration: 2
  }
}
```

#### Type declaration

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `create` | (`params`: [`ElementParams`](modules.md#elementparams)) => `Generator`\<`any`, `void`, `any`\> |

#### Defined in

[elements/circle.element.tsx:57](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/visualizer/src/elements/circle.element.tsx#L57)

## ElasticEffect
ElasticEffect applies a scaling animation to text elements with an elastic easing 
curve for a &quot;pop&quot; or &quot;bounce&quot; effect. Creates playful, attention-grabbing text 
animations that bounce into view with natural physics.

Behavior:
- Optionally waits for a delay
- Starts at zero scale (invisible)
- Scales up to full size with an elastic bounce

### ElasticEffect

• `Const` **ElasticEffect**: `Object`

**`Param`**

Reference to the text element to animate

**`Param`**

Duration of the scaling animation in seconds

**`Param`**

Optional delay before the animation starts in seconds

**`Example`**

```js
// Basic elastic bounce
textEffect: {
  name: "elastic",
  duration: 1.5,
  delay: 0.5
}

// Quick elastic pop
textEffect: {
  name: "elastic",
  duration: 0.8
}
```

#### Type declaration

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `run` | (`params`: [`TextEffectParams`](modules.md#texteffectparams)) => `Generator`\<`any`, `void`, `any`\> |

#### Defined in

[text-effects/elastic.tsx:35](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/visualizer/src/text-effects/elastic.tsx#L35)

## EraseEffect
EraseEffect animates text disappearing letter by letter, simulating an &quot;erasing&quot;
or backspace effect. Creates engaging text removal animations that mimic
real-world erasing or typing corrections.

Behavior:
- Optionally waits for a delay before starting
- Preserves the original element size
- Animates removing one character at a time from the end

### EraseEffect

• `Const` **EraseEffect**: `Object`

**`Param`**

Reference to the text element to animate

**`Param`**

Total duration of the erasing animation in seconds

**`Param`**

Optional delay before starting in seconds

**`Param`**

Time reserved at the end of animation in seconds (default: 0.1)

**`Example`**

```js
// Basic erase effect
textEffect: {
  name: "erase",
  duration: 3,
  delay: 1
}

// Quick erase with buffer time
textEffect: {
  name: "erase",
  duration: 2,
  bufferTime: 0.5
}
```

#### Type declaration

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `run` | (`params`: [`TextEffectParams`](modules.md#texteffectparams)) => `Generator`\<`void` \| `ThreadGenerator` \| `Promise`\<`any`\> \| `Promisable`\<`any`\>, `void`, `any`\> |

#### Defined in

[text-effects/erase.tsx:37](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/visualizer/src/text-effects/erase.tsx#L37)

## IconElement
IconElement creates and manages icon elements in the visualizer scene.
Handles icon rendering, styling, and animations for UI elements and
visual design components.

Features:
- Icon rendering with custom styling
- Size and position control
- Color and opacity customization
- Animation support

### IconElement

• `Const` **IconElement**: `Object`

**`Param`**

Reference to the container element

**`Param`**

Icon element configuration and properties

**`Param`**

The main scene view for rendering

**`Example`**

```js
// Basic icon element
{
  id: "play-icon",
  type: "icon",
  s: 0,
  e: 20,
  props: {
    icon: "play",
    size: 64,
    fill: "#ffffff"
  }
}

// Icon with animation
{
  id: "animated-icon",
  type: "icon",
  s: 2,
  e: 15,
  props: {
    icon: "pause",
    size: 48,
    fill: "#ff0000",
    opacity: 0.8
  },
  animation: {
    name: "fade",
    animate: "enter",
    duration: 2
  }
}
```

#### Type declaration

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `create` | (`params`: [`ElementParams`](modules.md#elementparams)) => `Generator`\<`any`, `void`, `any`\> |

#### Defined in

[elements/icon.element.tsx:57](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/visualizer/src/elements/icon.element.tsx#L57)

## ImageElement
ImageElement creates and manages image content in the visualizer scene.
Handles image rendering, frame effects, animations, and content fitting
for professional image presentations and content creation.

Features:
- Image rendering with start/end timing control
- Frame effects and animations
- Object fit options for content scaling
- Color filters and media effects
- Automatic cleanup and resource management

### ImageElement

• `Const` **ImageElement**: `Object`

**`Param`**

Reference to the container element

**`Param`**

Image element configuration and properties

**`Param`**

The main scene view for rendering

**`Example`**

```js
// Basic image element
{
  id: "main-image",
  type: "image",
  s: 0,
  e: 15,
  props: {
    src: "image.jpg",
    width: 1920,
    height: 1080
  },
  objectFit: "cover"
}

// Image with frame effect and animation
{
  id: "framed-image",
  type: "image",
  s: 2,
  e: 20,
  props: { 
    src: "content.jpg",
    mediaFilter: "sepia"
  },
  animation: {
    name: "fade",
    animate: "enter",
    duration: 2
  },
  frameEffects: [{
    name: "circle",
    s: 2,
    e: 20,
    props: {
      frameSize: [500, 500],
      frameShape: "circle",
      framePosition: { x: 960, y: 540 },
      radius: 250,
      objectFit: "cover"
    }
  }]
}
```

#### Type declaration

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `create` | (`params`: [`ElementParams`](modules.md#elementparams)) => `Generator`\<`any`, `void`, `any`\> |

#### Defined in

[elements/image.element.tsx:71](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/visualizer/src/elements/image.element.tsx#L71)

## PhotoRiseAnimation
PhotoRiseAnimation applies a smooth directional movement to a photo element.
Creates elegant slide-in animations that bring photos into view from any direction.
Perfect for photo galleries, presentations, and content reveals.

Behavior:
- Starts offset in a given direction (up, down, left, or right)
- Animates back to the original position over the specified duration

Available directions:
- &quot;up&quot;: Starts below and moves upward
- &quot;down&quot;: Starts above and moves downward
- &quot;left&quot;: Starts to the right and moves leftward
- &quot;right&quot;: Starts to the left and moves rightward

### PhotoRiseAnimation

• `Const` **PhotoRiseAnimation**: `Object`

**`Param`**

Reference to the photo element to animate

**`Param`**

Optional reference to a container element (required for this animation)

**`Param`**

Direction of the movement ("up" | "down" | "left" | "right")

**`Param`**

Duration of the movement animation in seconds

**`Param`**

Offset distance in pixels (default: 200)

**`Example`**

```js
// Slide in from bottom
animation: {
  name: "photo-rise",
  direction: "up",
  duration: 1.5,
  intensity: 300
}

// Slide in from left
animation: {
  name: "photo-rise",
  direction: "left",
  duration: 2,
  intensity: 400
}
```

#### Type declaration

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `run` | (`params`: [`AnimationParams`](modules.md#animationparams)) => `Generator`\<`any`, `void`, `any`\> |

#### Defined in

[animations/photo-rise.tsx:44](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/visualizer/src/animations/photo-rise.tsx#L44)

## PhotoZoomAnimation
PhotoZoomAnimation applies a smooth zoom-in or zoom-out effect on a photo element.
Creates dynamic zoom effects that add depth and focus to photo content.
Perfect for highlighting details or creating cinematic photo presentations.

Available animation modes:
- &quot;in&quot;: Starts zoomed in and smoothly scales back to the original size
- &quot;out&quot;: Starts at normal size and smoothly scales up to the target zoom level

### PhotoZoomAnimation

• `Const` **PhotoZoomAnimation**: `Object`

**`Param`**

Reference to the photo element to animate

**`Param`**

Optional reference to a container element (required for this animation)

**`Param`**

Animation phase ("in" | "out")

**`Param`**

Duration of the zoom animation in seconds

**`Param`**

Zoom scale multiplier (default: 1.5)

**`Example`**

```js
// Zoom in effect
animation: {
  name: "photo-zoom",
  mode: "in",
  duration: 2,
  intensity: 1.8
}

// Zoom out effect
animation: {
  name: "photo-zoom",
  mode: "out",
  duration: 1.5,
  intensity: 2.0
}
```

#### Type declaration

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `run` | (`params`: [`AnimationParams`](modules.md#animationparams)) => `Generator`\<`any`, `void`, `any`\> |

#### Defined in

[animations/photo-zoom.tsx:39](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/visualizer/src/animations/photo-zoom.tsx#L39)

## RectElement
RectElement creates and manages rectangular shape elements in the visualizer scene.
Handles rectangle rendering, styling, and animations for UI elements and
visual design components.

Features:
- Rectangle rendering with custom styling
- Size and position control
- Color and border customization
- Animation support

### RectElement

• `Const` **RectElement**: `Object`

**`Param`**

Reference to the container element

**`Param`**

Rectangle element configuration and properties

**`Param`**

The main scene view for rendering

**`Example`**

```js
// Basic rectangle element
{
  id: "background-rect",
  type: "rect",
  s: 0,
  e: 20,
  props: {
    width: 800,
    height: 600,
    fill: "#000000",
    opacity: 0.5
  }
}

// Rectangle with animation
{
  id: "animated-rect",
  type: "rect",
  s: 2,
  e: 15,
  props: {
    width: 400,
    height: 300,
    fill: "#ff0000",
    stroke: "#ffffff",
    strokeWidth: 2
  },
  animation: {
    name: "fade",
    animate: "enter",
    duration: 2
  }
}
```

#### Type declaration

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `create` | (`params`: [`ElementParams`](modules.md#elementparams)) => `Generator`\<`any`, `void`, `any`\> |

#### Defined in

[elements/rect.element.tsx:60](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/visualizer/src/elements/rect.element.tsx#L60)

## RiseAnimation
RiseAnimation combines vertical motion and opacity transitions to create a &quot;rising&quot;
(or &quot;falling&quot;) appearance/disappearance effect. Moves elements vertically with
optional scaling effects for dynamic visual impact.

Available animation modes:
- &quot;enter&quot;: Starts offset and transparent, moves into position while fading in
- &quot;exit&quot;: Waits, then moves out of position while fading out
- &quot;both&quot;: Enters, waits, and exits in a continuous sequence

### RiseAnimation

• `Const` **RiseAnimation**: `Object`

**`Param`**

Reference to the main element to animate

**`Param`**

Optional reference to a container element

**`Param`**

Duration of movement and opacity transitions in seconds

**`Param`**

Total duration of the animation in seconds

**`Param`**

Animation phase ("enter" | "exit" | "both")

**`Param`**

Direction to animate ("up" or "down")

**`Param`**

Number of units to offset position vertically

**`Example`**

```js
// Rise up animation
animation: {
  name: "rise",
  animate: "enter",
  duration: 1.5,
  direction: "up",
  intensity: 0.8
}

// Fall down animation
animation: {
  name: "rise",
  animate: "exit",
  duration: 2,
  direction: "down",
  intensity: 300
}
```

#### Type declaration

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `run` | (`params`: [`AnimationParams`](modules.md#animationparams)) => `Generator`\<`void` \| `ThreadGenerator` \| `Promise`\<`any`\> \| `Promisable`\<`any`\>, `void`, `any`\> |

#### Defined in

[animations/rise.tsx:44](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/visualizer/src/animations/rise.tsx#L44)

## SceneElement
SceneElement creates and manages scene container elements in the visualizer.
Handles scene setup, background configuration, and container management
for organizing visual content and elements.

Features:
- Scene container creation and management
- Background and environment setup
- Element organization and grouping
- Scene-level animations and effects

### SceneElement

• `Const` **SceneElement**: `Object`

**`Param`**

Reference to the container element

**`Param`**

Scene element configuration and properties

**`Param`**

The main scene view for rendering

**`Example`**

```js
// Basic scene element
{
  id: "main-scene",
  type: "scene",
  s: 0,
  e: 30,
  props: {
    backgroundColor: "#000000",
    width: 1920,
    height: 1080
  }
}

// Scene with background and effects
{
  id: "animated-scene",
  type: "scene",
  s: 0,
  e: 60,
  props: {
    backgroundColor: "linear-gradient(45deg, #ff0000, #00ff00)",
    width: 1920,
    height: 1080,
    opacity: 0.9
  },
  animation: {
    name: "fade",
    animate: "enter",
    duration: 3
  }
}
```

#### Type declaration

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `create` | (`params`: [`ElementParams`](modules.md#elementparams)) => `Generator`\<`any`, `void`, `any`\> |

#### Defined in

[elements/scene.element.tsx:60](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/visualizer/src/elements/scene.element.tsx#L60)

## StreamWordEffect
StreamWordEffect animates text appearing word by word, creating a smooth
&quot;typing&quot; or &quot;streaming&quot; effect. Animates text word by word for natural
reading flow and storytelling content.

Behavior:
- Optionally waits for a delay before starting
- Clears the text initially and preserves the original size
- Reveals one word at a time with a consistent interval

### StreamWordEffect

• `Const` **StreamWordEffect**: `Object`

**`Param`**

Reference to the text element to animate

**`Param`**

Total duration of the animation in seconds

**`Param`**

Optional delay before starting in seconds

**`Param`**

Time reserved at the end of animation in seconds

**`Example`**

```js
// Basic stream word effect
textEffect: {
  name: "stream-word",
  duration: 2,
  interval: 0.3
}

// With delay for dramatic effect
textEffect: {
  name: "stream-word",
  duration: 4,
  delay: 1,
  bufferTime: 0.5
}
```

#### Type declaration

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `run` | (`params`: [`TextEffectParams`](modules.md#texteffectparams)) => `Generator`\<`void` \| `ThreadGenerator` \| `Promise`\<`any`\> \| `Promisable`\<`any`\>, `void`, `any`\> |

#### Defined in

[text-effects/stream-word.tsx:38](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/visualizer/src/text-effects/stream-word.tsx#L38)

## SuccessionAnimation
SuccessionAnimation combines scaling and opacity transitions to create an appearing
and disappearing zoom effect. Creates dynamic zoom animations that draw attention
to content with smooth scaling and fade transitions.

Available animation modes:
- &quot;enter&quot;: Starts scaled down and transparent, then scales up while fading in
- &quot;exit&quot;: Waits, then scales down while fading out
- &quot;both&quot;: Scales up and fades in, waits, then scales down and fades out

### SuccessionAnimation

• `Const` **SuccessionAnimation**: `Object`

**`Param`**

Reference to the main element to animate

**`Param`**

Optional reference to a container element

**`Param`**

Duration of scaling and opacity transitions in seconds

**`Param`**

Total duration of the animation in seconds

**`Param`**

Animation phase ("enter" | "exit" | "both")

**`Example`**

```js
// Zoom in effect
animation: {
  name: "succession",
  animate: "enter",
  duration: 2,
  interval: 0.5
}

// Zoom out effect
animation: {
  name: "succession",
  animate: "exit",
  duration: 1.5,
  interval: 0.3
}
```

#### Type declaration

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `run` | (`params`: [`AnimationParams`](modules.md#animationparams)) => `Generator`\<`void` \| `ThreadGenerator` \| `Promise`\<`any`\> \| `Promisable`\<`any`\>, `void`, `any`\> |

#### Defined in

[animations/succession.tsx:40](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/visualizer/src/animations/succession.tsx#L40)

## TextElement
TextElement creates and manages text content in the visualizer scene.
Handles text rendering, animations, and text effects for dynamic
text presentations and content creation.

Features:
- Text rendering with custom styling and fonts
- Text animations and effects
- Timing control and synchronization
- Automatic cleanup and resource management

### TextElement

• `Const` **TextElement**: `Object`

**`Param`**

Reference to the container element

**`Param`**

Text element configuration and properties

**`Param`**

The main scene view for rendering

**`Example`**

```js
// Basic text element
{
  id: "welcome-text",
  type: "text",
  s: 0,
  e: 10,
  t: "Welcome to our presentation!",
  props: {
    fill: "#ffffff",
    fontSize: 48,
    fontFamily: "Arial"
  }
}

// Text with animation and effects
{
  id: "animated-text",
  type: "text",
  s: 2,
  e: 15,
  t: "Animated text content",
  props: {
    fill: "#ff0000",
    fontSize: 36,
    fontFamily: "Helvetica"
  },
  animation: {
    name: "fade",
    animate: "enter",
    duration: 2
  },
  textEffect: {
    name: "typewriter",
    duration: 3
  }
}
```

#### Type declaration

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `create` | (`params`: [`ElementParams`](modules.md#elementparams)) => `Generator`\<`any`, `void`, `any`\> |

#### Defined in

[elements/text.element.tsx:63](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/visualizer/src/elements/text.element.tsx#L63)

## Type Aliases

### VideoInput

Ƭ **VideoInput**: `Object`

Main input configuration for video visualization.
Contains player settings, background color, dimensions, and track definitions
for creating complete video visualizations.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `playerId` | `string` |
| `backgroundColor` | `string` |
| `properties` | \{ `width`: `number` ; `height`: `number`  } |
| `properties.width` | `number` |
| `properties.height` | `number` |
| `tracks` | [`VisualizerTrack`](modules.md#visualizertrack)[] |

#### Defined in

[helpers/types.ts:9](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/visualizer/src/helpers/types.ts#L9)

___

### MediaType

Ƭ **MediaType**: ``"video"`` \| ``"image"``

Supported media types for visualizer elements.
Defines the types of media content that can be displayed.

#### Defined in

[helpers/types.ts:23](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/visualizer/src/helpers/types.ts#L23)

___

### ObjectFit

Ƭ **ObjectFit**: ``"contain"`` \| ``"cover"`` \| ``"fill"`` \| ``"none"``

Object fit options for content scaling within containers.
Controls how content is sized and positioned within its container.

#### Defined in

[helpers/types.ts:29](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/visualizer/src/helpers/types.ts#L29)

___

### SizeVector

Ƭ **SizeVector**: `Object`

Two-dimensional size vector with x and y coordinates.
Used for representing width and height dimensions.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |

#### Defined in

[helpers/types.ts:35](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/visualizer/src/helpers/types.ts#L35)

___

### Size

Ƭ **Size**: `Object`

Size object with width and height properties.
Standard size representation for elements and containers.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `width` | `number` |
| `height` | `number` |

#### Defined in

[helpers/types.ts:44](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/visualizer/src/helpers/types.ts#L44)

___

### SizeArray

Ƭ **SizeArray**: [`number`, `number`]

Size array with width and height values.
Alternative size representation as a tuple.

#### Defined in

[helpers/types.ts:53](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/visualizer/src/helpers/types.ts#L53)

___

### Position

Ƭ **Position**: `Object`

Position object with x and y coordinates.
Represents 2D positioning for elements in the scene.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |

#### Defined in

[helpers/types.ts:59](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/visualizer/src/helpers/types.ts#L59)

___

### FrameEffect

Ƭ **FrameEffect**: `Object`

Frame effect configuration for visual masking.
Defines timing and properties for frame effects like circles and rectangles.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `s` | `number` |
| `e` | `number` |
| `props` | [`FrameEffectProps`](modules.md#frameeffectprops) |

#### Defined in

[helpers/types.ts:68](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/visualizer/src/helpers/types.ts#L68)

___

### FrameEffectProps

Ƭ **FrameEffectProps**: `Object`

Properties for frame effect transformations.
Controls frame size, shape, position, and transition behavior.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `frameSize` | [`SizeArray`](modules.md#sizearray) |
| `frameShape` | ``"circle"`` \| ``"rect"`` |
| `framePosition` | [`Position`](modules.md#position) |
| `radius` | `number` |
| `objectFit` | [`ObjectFit`](modules.md#objectfit) |
| `transitionDuration` | `number` |
| `transitionEasing?` | `string` |
| `elementPosition` | [`Position`](modules.md#position) |

#### Defined in

[helpers/types.ts:79](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/visualizer/src/helpers/types.ts#L79)

___

### CaptionStyle

Ƭ **CaptionStyle**: `Object`

Styling configuration for caption elements.
Defines visual appearance of captions including layout and text styling.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `rect` | \{ `alignItems?`: `string` ; `gap?`: `number` ; `justifyContent?`: `string` ; `padding?`: [`number`, `number`] ; `radius?`: `number`  } |
| `rect.alignItems?` | `string` |
| `rect.gap?` | `number` |
| `rect.justifyContent?` | `string` |
| `rect.padding?` | [`number`, `number`] |
| `rect.radius?` | `number` |
| `word` | \{ `lineWidth`: `number` ; `stroke`: `string` ; `fontWeight`: `number` ; `shadowOffset?`: `number`[] ; `shadowColor?`: `string` ; `shadowBlur?`: `number` ; `fill`: `string` ; `fontFamily`: `string` ; `bgColor?`: `string` ; `bgOffsetWidth?`: `number` ; `bgOffsetHeight?`: `number` ; `fontSize`: `number` ; `strokeFirst?`: `boolean`  } |
| `word.lineWidth` | `number` |
| `word.stroke` | `string` |
| `word.fontWeight` | `number` |
| `word.shadowOffset?` | `number`[] |
| `word.shadowColor?` | `string` |
| `word.shadowBlur?` | `number` |
| `word.fill` | `string` |
| `word.fontFamily` | `string` |
| `word.bgColor?` | `string` |
| `word.bgOffsetWidth?` | `number` |
| `word.bgOffsetHeight?` | `number` |
| `word.fontSize` | `number` |
| `word.strokeFirst?` | `boolean` |

#### Defined in

[helpers/types.ts:94](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/visualizer/src/helpers/types.ts#L94)

___

### Caption

Ƭ **Caption**: `Object`

Caption element configuration.
Defines text content, timing, styling, and display properties for captions.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `t` | `string` |
| `s` | `number` |
| `e` | `number` |
| `capStyle?` | `string` |
| `props?` | [`CaptionProps`](modules.md#captionprops) |

#### Defined in

[helpers/types.ts:123](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/visualizer/src/helpers/types.ts#L123)

___

### CaptionProps

Ƭ **CaptionProps**: `Object`

Caption styling properties.
Controls colors, fonts, background, and positioning for caption text.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `colors` | [`CaptionColors`](modules.md#captioncolors) |
| `font` | [`CaptionFont`](modules.md#captionfont) |
| `bgOpacity?` | `number` |
| `bgOffsetWidth?` | `number` |
| `bgOffsetHeight?` | `number` |
| `bgMargin?` | [`number`, `number`] |
| `bgRadius?` | `number` |
| `bgPadding?` | [`number`, `number`] |
| `x?` | `number` |
| `y?` | `number` |

#### Defined in

[helpers/types.ts:135](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/visualizer/src/helpers/types.ts#L135)

___

### CaptionColors

Ƭ **CaptionColors**: `Object`

Color configuration for caption text and backgrounds.
Defines text color, background color, and highlight colors.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `text?` | `string` |
| `bgColor?` | `string` |
| `highlight?` | `string` |

#### Defined in

[helpers/types.ts:152](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/visualizer/src/helpers/types.ts#L152)

___

### CaptionFont

Ƭ **CaptionFont**: `Object`

Font configuration for caption text.
Controls font family, size, weight, and style.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `family?` | `string` |
| `size?` | `number` |
| `weight?` | `number` |
| `style?` | `string` |

#### Defined in

[helpers/types.ts:162](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/visualizer/src/helpers/types.ts#L162)

___

### VisualizerElement

Ƭ **VisualizerElement**: `Object`

Visualizer element configuration.
Defines the structure and properties for all visual elements in the scene
including videos, images, text, and captions with their animations and effects.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `trackId?` | `string` |
| `frame?` | `any` |
| `props?` | `any` |
| `objectFit?` | ``"contain"`` \| ``"cover"`` \| ``"fill"`` |
| `type?` | `string` |
| `s` | `number` |
| `e` | `number` |
| `backgroundColor?` | `string` |
| `animation?` | [`AnimationProps`](modules.md#animationprops) |
| `textEffect` | [`TextEffectProps`](modules.md#texteffectprops) |
| `frameEffects?` | [`FrameEffect`](modules.md#frameeffect)[] |
| `scale?` | `number` |
| `t?` | `string` |
| `hWords?` | `any` |

#### Defined in

[helpers/types.ts:174](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/visualizer/src/helpers/types.ts#L174)

___

### VisualizerTrack

Ƭ **VisualizerTrack**: `Object`

Visualizer track configuration.
Contains a collection of elements that share common properties and timing.
Tracks organize elements into logical groups for better scene management.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `type` | `string` |
| `elements` | [`VisualizerElement`](modules.md#visualizerelement)[] |
| `props?` | \{ `capStyle?`: `string` ; `bgOpacity?`: `number` ; `x?`: `number` ; `y?`: `number` ; `colors?`: \{ `text?`: `string` ; `background?`: `string` ; `highlight?`: `string`  } ; `font?`: \{ `family?`: `string` ; `size?`: `number` ; `weight?`: `number` ; `style?`: `string`  } ; `applyToAll?`: `boolean` ; `captionProps?`: [`CaptionProps`](modules.md#captionprops)  } |
| `props.capStyle?` | `string` |
| `props.bgOpacity?` | `number` |
| `props.x?` | `number` |
| `props.y?` | `number` |
| `props.colors?` | \{ `text?`: `string` ; `background?`: `string` ; `highlight?`: `string`  } |
| `props.colors.text?` | `string` |
| `props.colors.background?` | `string` |
| `props.colors.highlight?` | `string` |
| `props.font?` | \{ `family?`: `string` ; `size?`: `number` ; `weight?`: `number` ; `style?`: `string`  } |
| `props.font.family?` | `string` |
| `props.font.size?` | `number` |
| `props.font.weight?` | `number` |
| `props.font.style?` | `string` |
| `props.applyToAll?` | `boolean` |
| `props.captionProps?` | [`CaptionProps`](modules.md#captionprops) |

#### Defined in

[helpers/types.ts:197](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/visualizer/src/helpers/types.ts#L197)

___

### ElementParams

Ƭ **ElementParams**: `Object`

Parameters for creating elements in the visualizer scene.
Contains all necessary references and configuration for element creation.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `view` | `View2D` |
| `containerRef` | `Reference`\<`any`\> |
| `element?` | [`VisualizerElement`](modules.md#visualizerelement) |
| `caption?` | [`Caption`](modules.md#caption) |
| `waitOnStart?` | `boolean` |

#### Defined in

[helpers/types.ts:226](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/visualizer/src/helpers/types.ts#L226)

___

### TextEffectParams

Ƭ **TextEffectParams**: `Object`

Parameters for text effect animations.
Controls timing and behavior of text animation effects.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `elementRef` | `Reference`\<`any`\> |
| `interval?` | `number` |
| `duration?` | `number` |
| `bufferTime?` | `number` |
| `delay?` | `number` |
| `direction?` | ``"left"`` \| ``"right"`` \| ``"center"`` |

#### Defined in

[helpers/types.ts:249](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/visualizer/src/helpers/types.ts#L249)

___

### TextEffectProps

Ƭ **TextEffectProps**: `Object`

Configuration properties for text effects.
Defines how text effects should behave and appear.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `interval?` | `number` |
| `duration?` | `number` |
| `bufferTime?` | `number` |
| `delay?` | `number` |
| `direction?` | ``"left"`` \| ``"right"`` \| ``"center"`` |

#### Defined in

[helpers/types.ts:262](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/visualizer/src/helpers/types.ts#L262)

___

### AnimationParams

Ƭ **AnimationParams**: `Object`

Parameters for element animations.
Controls timing, direction, and behavior of element animations.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `elementRef` | `Reference`\<`any`\> |
| `containerRef?` | `Reference`\<`any`\> |
| `view` | `View2D` |
| `interval?` | `number` |
| `duration?` | `number` |
| `intensity?` | `number` |
| `mode?` | ``"in"`` \| ``"out"`` |
| `animate?` | ``"enter"`` \| ``"exit"`` \| ``"both"`` |
| `direction?` | ``"left"`` \| ``"right"`` \| ``"center"`` \| ``"up"`` \| ``"down"`` |

#### Defined in

[helpers/types.ts:286](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/visualizer/src/helpers/types.ts#L286)

___

### AnimationProps

Ƭ **AnimationProps**: `Object`

Configuration properties for animations.
Defines how animations should behave and appear.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `interval?` | `number` |
| `duration?` | `number` |
| `intensity?` | `number` |
| `mode?` | ``"in"`` \| ``"out"`` |
| `animate?` | ``"enter"`` \| ``"exit"`` \| ``"both"`` |
| `direction?` | ``"left"`` \| ``"right"`` \| ``"center"`` \| ``"up"`` \| ``"down"`` |

#### Defined in

[helpers/types.ts:302](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/visualizer/src/helpers/types.ts#L302)

___

### FrameEffectParams

Ƭ **FrameEffectParams**: `Object`

Parameters for frame effects.
Controls frame transformations and visual masking effects.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `elementRef` | `Reference`\<`any`\> |
| `containerRef?` | `Reference`\<`any`\> |
| `initFrameState` | [`FrameState`](modules.md#framestate) |
| `frameEffect` | [`FrameEffect`](modules.md#frameeffect) |

#### Defined in

[helpers/types.ts:327](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/visualizer/src/helpers/types.ts#L327)

___

### FrameState

Ƭ **FrameState**: `Object`

State information for frame and element transformations.
Contains size, position, and transformation data for frame effects.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `frame` | \{ `size`: `Vector2` ; `pos`: `Vector2` ; `radius`: `number` ; `scale`: `Vector2` ; `rotation`: `number`  } |
| `frame.size` | `Vector2` |
| `frame.pos` | `Vector2` |
| `frame.radius` | `number` |
| `frame.scale` | `Vector2` |
| `frame.rotation` | `number` |
| `element` | \{ `size`: `Vector2` ; `pos`: `Vector2` ; `scale`: `Vector2`  } |
| `element.size` | `Vector2` |
| `element.pos` | `Vector2` |
| `element.scale` | `Vector2` |

#### Defined in

[helpers/types.ts:349](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/visualizer/src/helpers/types.ts#L349)

## TypewriterEffect
TypewriterEffect animates text appearing one character at a time, mimicking the
behavior of a classic typewriter. Creates a nostalgic, engaging text animation
that draws attention to important content.

Behavior:
- Optionally waits for a delay before starting
- Clears the text initially and preserves the element&#x27;s original size
- Reveals one character at a time at a consistent interval

### TypewriterEffect

• `Const` **TypewriterEffect**: `Object`

**`Param`**

Reference to the text element to animate

**`Param`**

Total duration of the animation in seconds

**`Param`**

Optional delay before starting in seconds

**`Param`**

Time reserved at the end of animation in seconds

**`Example`**

```js
// Basic typewriter effect
textEffect: {
  name: "typewriter",
  duration: 3,
  interval: 0.1
}

// With delay and buffer time
textEffect: {
  name: "typewriter",
  duration: 5,
  delay: 1,
  bufferTime: 0.5
}
```

#### Type declaration

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `run` | (`params`: [`TextEffectParams`](modules.md#texteffectparams)) => `Generator`\<`void` \| `ThreadGenerator` \| `Promise`\<`any`\> \| `Promisable`\<`any`\>, `void`, `any`\> |

#### Defined in

[text-effects/typewriter.tsx:38](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/visualizer/src/text-effects/typewriter.tsx#L38)

## Core Variables

### scene

• `Const` **scene**: `SceneDescription`\<`ThreadGeneratorFactory`\<`View2D`\>\>

**`Description`**

Main scene generator for video visualization

Creates and configures the main scene for video visualization. Sets up a scene with 
background, processes track elements, and handles animation generation for video, 
audio, captions, and other visual elements.

## Scene Lifecycle

1. **Input Processing**: Retrieves video input configuration from scene variables
2. **Background Setup**: Creates background rectangle with specified color
3. **Track Processing**: Iterates through tracks and creates appropriate visualizations
4. **Animation Execution**: Runs all track animations in parallel using `all()`
5. **Event Dispatch**: Sends player update events for status tracking

## Track Types Supported

- **VIDEO**: Video content with playback and effects
- **AUDIO**: Audio content with timing and synchronization
- **CAPTION**: Text overlays with styling and animations
- **SCENE**: Scene containers for organization
- **ELEMENT**: Custom elements with animations

## 📊 Performance Features

- **Parallel Execution**: All track animations run concurrently
- **Event-Driven**: Real-time status updates via window events
- **Resource Management**: Automatic cleanup and memory optimization
- **Error Handling**: Graceful fallbacks for missing configurations

**`Param`**

Name of the scene for identification

**`Param`**

Generator function that handles scene setup and animation

**`Example`**

```js
// Basic scene setup
const scene = makeScene2D("scene", function* (view) {
  // Scene setup and animation logic
  yield* all(...trackAnimations);
});

// With video input configuration
const videoScene = makeScene2D("video-scene", function* (view) {
  // Configure scene variables
  useScene().variables.set("input", videoInput);
  useScene().variables.set("playerId", "main-player");
  
  // Scene will automatically process the input
});
```

#### Defined in

[visualizer.tsx:116](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/visualizer/src/visualizer.tsx#L116)

___

## Other Variables

### CircleFrameEffect

• `Const` **CircleFrameEffect**: `Object`

CircleFrameEffect animates a frame transitioning into a circular shape,
resizing, repositioning, and optionally fitting its content. Creates a 
circular mask around content perfect for profile pictures and artistic presentations.

Behavior:
- Waits for the specified start time
- Resizes and repositions the frame container smoothly
- Animates the corner radius to create a perfect circle
- Repositions the content element if needed
- Optionally fits the element inside the container based on object-fit

**`Param`**

Reference to the frame container element

**`Param`**

Reference to the content element inside the frame

**`Param`**

Initial size and position state of the element

**`Param`**

Frame transformation configuration and timing

**`Example`**

```js
// Basic circular frame
frameEffects: [{
  name: "circle",
  s: 0,
  e: 10,
  props: {
    frameSize: [400, 400],
    frameShape: "circle",
    framePosition: { x: 960, y: 540 },
    radius: 200,
    objectFit: "cover",
    transitionDuration: 1.5
  }
}]
```

#### Type declaration

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `run` | (`params`: [`FrameEffectParams`](modules.md#frameeffectparams)) => `Generator`\<`void` \| `ThreadGenerator` \| `Promise`\<`any`\> \| `Promisable`\<`any`\>, `void`, `any`\> |

#### Defined in

[frame-effects/circle.frame.tsx:82](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/visualizer/src/frame-effects/circle.frame.tsx#L82)

___

### RectFrameEffect

• `Const` **RectFrameEffect**: `Object`

RectFrameEffect applies frame transformations such as resizing, repositioning, 
rounding corners, and optionally fitting the element within the frame according 
to an object-fit mode. Creates rectangular masks and containers for content 
presentation with smooth transitions.

Behavior:
- Waits for the specified start time
- Resizes and repositions the container and element smoothly
- Adjusts corner radius if provided
- Optionally fits the element inside the container

**`Param`**

Reference to the frame container element

**`Param`**

Reference to the content element inside the frame

**`Param`**

Initial size and position state of the element

**`Param`**

Frame transformation configuration and timing

**`Example`**

```js
// Basic rectangular frame
frameEffects: [{
  name: "rect",
  s: 0,
  e: 10,
  props: {
    frameSize: [600, 400],
    frameShape: "rect",
    framePosition: { x: 960, y: 540 },
    radius: 20,
    objectFit: "cover",
    transitionDuration: 1.5
  }
}]

// Rounded rectangle frame
frameEffects: [{
  name: "rect",
  s: 2,
  e: 15,
  props: {
    frameSize: [800, 600],
    frameShape: "rect",
    framePosition: { x: 960, y: 540 },
    radius: 50,
    objectFit: "contain",
    transitionDuration: 2
  }
}]
```

#### Type declaration

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `run` | (`params`: [`FrameEffectParams`](modules.md#frameeffectparams)) => `Generator`\<`void` \| `ThreadGenerator` \| `Promise`\<`any`\> \| `Promisable`\<`any`\>, `void`, `any`\> |

#### Defined in

[frame-effects/rect.frame.tsx:112](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/visualizer/src/frame-effects/rect.frame.tsx#L112)
