# Interface: FrameEffectPlugin\<Params\>

Interface for frame effect plugins.
Defines the contract for frame effects like circular and rectangular masks.

## Type parameters

| Name | Type |
| :------ | :------ |
| `Params` | [`FrameEffectParams`](../modules.md#frameeffectparams) |

## Table of contents

### Methods

- [run](FrameEffectPlugin.md#run)

### Properties

- [name](FrameEffectPlugin.md#name)

## Methods

### run

▸ **run**(`params`): `ThreadGenerator`

Executes the frame effect

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Params` |

#### Returns

`ThreadGenerator`

#### Defined in

[helpers/types.ts:342](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/visualizer/src/helpers/types.ts#L342)

## Properties

### name

• **name**: `string`

The unique name identifier for this frame effect

#### Defined in

[helpers/types.ts:340](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/visualizer/src/helpers/types.ts#L340)
