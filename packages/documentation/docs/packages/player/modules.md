[@twick/player](README.md) / Exports

# @twick/player

## Table of contents

### Functions

- [LivePlayer](modules.md#liveplayer)

## Functions

### LivePlayer

▸ **LivePlayer**(`props`): `Element`

`LivePlayer` is a React component that wraps around the `@revideo/player-react` player.

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

[components/live-player.tsx:60](https://github.com/ncounterspecialist/twick/blob/322058f5130be7eb0f94cfb23a9e57764d22f682/packages/player/src/components/live-player.tsx#L60)
