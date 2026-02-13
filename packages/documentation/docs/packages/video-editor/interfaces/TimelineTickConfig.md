# Interface: TimelineTickConfig

Configuration for timeline tick marks at specific duration ranges.
Defines major tick interval and number of minor ticks between majors.

**`Example`**

```js
const tickConfig = {
  durationThreshold: 300, // applies when video < 5 minutes
  majorInterval: 30, // major tick every 30 seconds
  minorTicks: 6 // 6 minor ticks between majors (every 5 seconds)
};
```

## Table of contents

### Properties

- [durationThreshold](TimelineTickConfig.md#durationthreshold)
- [majorInterval](TimelineTickConfig.md#majorinterval)
- [minorTicks](TimelineTickConfig.md#minorticks)

## Properties

### durationThreshold

• **durationThreshold**: `number`

Duration threshold in seconds - this config applies when duration < threshold

#### Defined in

[packages/video-editor/src/components/video-editor.tsx:28](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/video-editor/src/components/video-editor.tsx#L28)

___

### majorInterval

• **majorInterval**: `number`

Major tick interval in seconds

#### Defined in

[packages/video-editor/src/components/video-editor.tsx:30](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/video-editor/src/components/video-editor.tsx#L30)

___

### minorTicks

• **minorTicks**: `number`

Number of minor ticks between major ticks

#### Defined in

[packages/video-editor/src/components/video-editor.tsx:32](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/video-editor/src/components/video-editor.tsx#L32)
