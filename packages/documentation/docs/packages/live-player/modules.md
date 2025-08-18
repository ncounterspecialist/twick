[@twick/live-player](README.md) / Exports

# @twick/live-player

## Table of contents

### Variables

- [PLAYER\_STATE](modules.md#player_state)

### Functions

- [LivePlayer](modules.md#liveplayer)
- [LivePlayerProvider](modules.md#liveplayerprovider)
- [getBaseProject](modules.md#getbaseproject)
- [useLivePlayerContext](modules.md#useliveplayercontext)

## Variables

### PLAYER\_STATE

• `Const` **PLAYER\_STATE**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `PAUSED` | `string` |
| `PLAYING` | `string` |
| `REFRESH` | `string` |

#### Defined in

[helpers/constants.ts:2](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/live-player/src/helpers/constants.ts#L2)

## Functions

### LivePlayer

▸ **LivePlayer**(`props`): `Element`

`LivePlayer` is a React component that wraps around the `@twick/player-react` player.

It supports dynamic project variables, external control for playback, time seeking,
volume and quality adjustment, and lifecycle callbacks like `onPlayerReady` and `onDurationChange`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | `LivePlayerProps` | Props to control the player and respond to its state |

#### Returns

`Element`

A configured player UI component

#### Defined in

[components/live-player.tsx:63](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/live-player/src/components/live-player.tsx#L63)

___

### LivePlayerProvider

▸ **LivePlayerProvider**(`«destructured»`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `children` | `ReactNode` |

#### Returns

`Element`

#### Defined in

[context/live-player-context.tsx:17](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/live-player/src/context/live-player-context.tsx#L17)

___

### getBaseProject

▸ **getBaseProject**(`videoSize`, `playerId`): `Object`

Generates a base project structure for the Twick Live Player.

This function returns a minimal project configuration object with
the specified video dimensions. It's typically used as a starting
point for building or loading video compositions.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `videoSize` | `Object` | An object containing the width and height of the video. |
| `videoSize.height` | `number` | - |
| `videoSize.width` | `number` | - |
| `playerId` | `string` | - |

#### Returns

`Object`

A base project object with the specified video dimensions.

| Name | Type |
| :------ | :------ |
| `input` | \{ `properties`: \{ `height`: `number` = videoSize.height; `width`: `number` = videoSize.width }  } |
| `input.properties` | \{ `height`: `number` = videoSize.height; `width`: `number` = videoSize.width } |
| `input.properties.height` | `number` |
| `input.properties.width` | `number` |
| `playerId` | `string` |

#### Defined in

[helpers/player.utils.ts:11](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/live-player/src/helpers/player.utils.ts#L11)

___

### useLivePlayerContext

▸ **useLivePlayerContext**(): `LivePlayerContextType`

#### Returns

`LivePlayerContextType`

#### Defined in

[context/live-player-context.tsx:46](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/live-player/src/context/live-player-context.tsx#L46)
