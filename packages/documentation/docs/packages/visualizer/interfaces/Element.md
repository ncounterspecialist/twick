# Interface: Element\<Params\>

Interface for creating visual elements in the scene.
Defines the contract for all element types including video, image, text, and captions.

## Type parameters

| Name | Type |
| :------ | :------ |
| `Params` | [`ElementParams`](../modules.md#elementparams) |

## Table of contents

### Methods

- [create](Element.md#create)

### Properties

- [name](Element.md#name)

## Methods

### create

▸ **create**(`params`): `ThreadGenerator`

Creates and manages the element in the scene

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Params` |

#### Returns

`ThreadGenerator`

#### Defined in

[helpers/types.ts:242](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/visualizer/src/helpers/types.ts#L242)

## Properties

### name

• **name**: `string`

The unique name identifier for this element type

#### Defined in

[helpers/types.ts:240](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/visualizer/src/helpers/types.ts#L240)
