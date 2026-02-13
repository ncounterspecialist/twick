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

[helpers/types.ts:334](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/visualizer/src/helpers/types.ts#L334)

## Properties

### name

• **name**: `string`

The unique name identifier for this animation

#### Defined in

[helpers/types.ts:332](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/visualizer/src/helpers/types.ts#L332)
