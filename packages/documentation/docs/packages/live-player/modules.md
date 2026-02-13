# @twick/live-player - v0.15.0

## Table of contents

### Functions

- [LivePlayer](modules.md#liveplayer)
- [LivePlayerProvider](modules.md#liveplayerprovider)
- [useLivePlayerContext](modules.md#useliveplayercontext)
- [getBaseProject](modules.md#getbaseproject)
- [generateId](modules.md#generateid)

### Variables

- [PLAYER\_STATE](modules.md#player_state)

## Functions

### LivePlayer

▸ **LivePlayer**(`props`): `Element`

LivePlayer is a React component that wraps around the @twick/player-react player.
Supports dynamic project variables, external control for playback, time seeking,
volume and quality adjustment, and lifecycle callbacks.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | `LivePlayerProps` | Props to control the player and respond to its state |

#### Returns

`Element`

A configured player UI component

**`Example`**

```jsx
<LivePlayer
  playing={true}
  projectData={{ text: "Hello World" }}
  videoSize={{ width: 720, height: 1280 }}
  onTimeUpdate={(time) => console.log('Current time:', time)}
  onPlayerReady={(player) => console.log('Player ready:', player)}
/>
```

#### Defined in

[components/live-player.tsx:74](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/live-player/src/components/live-player.tsx#L74)

___

### LivePlayerProvider

▸ **LivePlayerProvider**(`props`): `Element`

Provider component for the Live Player context.
Manages the global state for live player instances including playback state,
timing, and volume controls. Automatically handles seek time updates when
pausing to maintain playback position.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | `Object` | Component props containing children to wrap |
| `props.children` | `ReactNode` | - |

#### Returns

`Element`

Context provider with live player state management

**`Example`**

```jsx
<LivePlayerProvider>
  <YourApp />
</LivePlayerProvider>
```

#### Defined in

[context/live-player-context.tsx:61](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/live-player/src/context/live-player-context.tsx#L61)

___

### useLivePlayerContext

▸ **useLivePlayerContext**(): `LivePlayerContextType`

Hook to access the Live Player context.
Provides access to player state, timing controls, and volume management.
Must be used within a LivePlayerProvider component.

#### Returns

`LivePlayerContextType`

LivePlayerContextType object with all player state and controls

**`Throws`**

Error if used outside of LivePlayerProvider

**`Example`**

```js
const {
  playerState,
  currentTime,
  setPlayerState,
  setCurrentTime
} = useLivePlayerContext();

// Control playback
setPlayerState(PLAYER_STATE.PLAYING);

// Update current time
setCurrentTime(30.5);
```

#### Defined in

[context/live-player-context.tsx:115](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/live-player/src/context/live-player-context.tsx#L115)

___

### getBaseProject

▸ **getBaseProject**(`videoSize`, `playerId`): `Object`

Generates a base project structure for the Twick Live Player.
Creates a minimal project configuration object with the specified video dimensions.
Used as a starting point for building or loading video compositions.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `videoSize` | `Object` | Object containing the width and height of the video |
| `videoSize.width` | `number` | - |
| `videoSize.height` | `number` | - |
| `playerId` | `string` | Unique identifier for the player instance |

#### Returns

`Object`

Base project object with the specified video dimensions

| Name | Type |
| :------ | :------ |
| `playerId` | `string` |
| `input` | \{ `properties`: \{ `width`: `number` = videoSize.width; `height`: `number` = videoSize.height }  } |
| `input.properties` | \{ `width`: `number` = videoSize.width; `height`: `number` = videoSize.height } |
| `input.properties.width` | `number` |
| `input.properties.height` | `number` |

**`Example`**

```js
const project = getBaseProject({ width: 720, height: 1280 }, "player-123");
// project = { playerId: "player-123", input: { properties: { width: 720, height: 1280 } } }
```

#### Defined in

[helpers/player.utils.ts:16](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/live-player/src/helpers/player.utils.ts#L16)

___

### generateId

▸ **generateId**(): `string`

Generates a unique identifier for player instances.
Creates a random string using base36 encoding for use as
player IDs and other unique identifiers.

#### Returns

`string`

A unique identifier string

**`Example`**

```js
const id = generateId();
// id = "abc123def456"
```

#### Defined in

[helpers/player.utils.ts:47](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/live-player/src/helpers/player.utils.ts#L47)

## Variables

### PLAYER\_STATE

• `Const` **PLAYER\_STATE**: `Object`

Player state constants for the Live Player.
Defines the different states that a player can be in during playback.

**`Example`**

```js
import { PLAYER_STATE } from '@twick/live-player';

if (playerState === PLAYER_STATE.PLAYING) {
  console.log('Player is currently playing');
}
```

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `REFRESH` | ``"Refresh"`` | Player is refreshing/reloading content |
| `PLAYING` | ``"Playing"`` | Player is actively playing content |
| `PAUSED` | ``"Paused"`` | Player is paused |

#### Defined in

[helpers/constants.ts:14](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/live-player/src/helpers/constants.ts#L14)
