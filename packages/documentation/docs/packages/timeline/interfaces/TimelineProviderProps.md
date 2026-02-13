# Interface: TimelineProviderProps

Props for the TimelineProvider component.
Defines the configuration options for timeline context initialization.

**`Example`**

```jsx
<TimelineProvider
  contextId="my-timeline"
  initialData={{ tracks: [], version: 1 }}
  undoRedoPersistenceKey="timeline-state"
  maxHistorySize={50}
>
  <YourApp />
</TimelineProvider>
```

## Table of contents

### Properties

- [children](TimelineProviderProps.md#children)
- [contextId](TimelineProviderProps.md#contextid)
- [resolution](TimelineProviderProps.md#resolution)
- [initialData](TimelineProviderProps.md#initialdata)
- [undoRedoPersistenceKey](TimelineProviderProps.md#undoredopersistencekey)
- [maxHistorySize](TimelineProviderProps.md#maxhistorysize)
- [analytics](TimelineProviderProps.md#analytics)

## Properties

### children

• **children**: `ReactNode`

React children to wrap with timeline context

#### Defined in

[context/timeline-context.tsx:99](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/context/timeline-context.tsx#L99)

___

### contextId

• **contextId**: `string`

Unique identifier for this timeline context

#### Defined in

[context/timeline-context.tsx:101](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/context/timeline-context.tsx#L101)

___

### resolution

• `Optional` **resolution**: [`Size`](Size.md)

resolution of the video

#### Defined in

[context/timeline-context.tsx:103](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/context/timeline-context.tsx#L103)

___

### initialData

• `Optional` **initialData**: `Object`

Initial timeline data to load

#### Type declaration

| Name | Type |
| :------ | :------ |
| `tracks` | [`TrackJSON`](TrackJSON.md)[] |
| `version` | `number` |

#### Defined in

[context/timeline-context.tsx:105](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/context/timeline-context.tsx#L105)

___

### undoRedoPersistenceKey

• `Optional` **undoRedoPersistenceKey**: `string`

Key for persisting undo/redo state

#### Defined in

[context/timeline-context.tsx:110](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/context/timeline-context.tsx#L110)

___

### maxHistorySize

• `Optional` **maxHistorySize**: `number`

Maximum number of history states to keep

#### Defined in

[context/timeline-context.tsx:112](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/context/timeline-context.tsx#L112)

___

### analytics

• `Optional` **analytics**: `AnalyticsConfig`

Analytics configuration.
Set to `{ enabled: false }` to disable tracking.

#### Defined in

[context/timeline-context.tsx:117](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/context/timeline-context.tsx#L117)
