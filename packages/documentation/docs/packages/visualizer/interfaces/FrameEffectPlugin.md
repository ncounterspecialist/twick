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

[helpers/types.ts:356](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/visualizer/src/helpers/types.ts#L356)

## Properties

### name

• **name**: `string`

The unique name identifier for this frame effect

#### Defined in

[helpers/types.ts:354](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/visualizer/src/helpers/types.ts#L354)
