# Interface: TextEffect\<Params\>

Interface for text effect animations.
Defines the contract for text animation effects like typewriter, stream word, etc.

## Type parameters

| Name | Type |
| :------ | :------ |
| `Params` | [`TextEffectParams`](../modules.md#texteffectparams) |

## Table of contents

### Methods

- [run](TextEffect.md#run)

### Properties

- [name](TextEffect.md#name)

## Methods

### run

▸ **run**(`params`): `Generator`\<`unknown`, `any`, `any`\>

Executes the text effect animation

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Params` |

#### Returns

`Generator`\<`unknown`, `any`, `any`\>

#### Defined in

[helpers/types.ts:279](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/visualizer/src/helpers/types.ts#L279)

## Properties

### name

• **name**: `string`

The unique name identifier for this text effect

#### Defined in

[helpers/types.ts:277](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/visualizer/src/helpers/types.ts#L277)
