# Interface: Animation\<Params\>

Interface for element animations.
Defines the contract for element animation effects like fade, rise, blur, etc.

## Type parameters

| Name | Type |
| :------ | :------ |
| `Params` | [`AnimationParams`](../modules.md#animationparams) |

## Table of contents

### Methods

- [run](Animation.md#run)

### Properties

- [name](Animation.md#name)

## Methods

### run

▸ **run**(`params`): `ThreadGenerator`

Executes the animation

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Params` |

#### Returns

`ThreadGenerator`

#### Defined in

[helpers/types.ts:320](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/visualizer/src/helpers/types.ts#L320)

## Properties

### name

• **name**: `string`

The unique name identifier for this animation

#### Defined in

[helpers/types.ts:318](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/visualizer/src/helpers/types.ts#L318)
