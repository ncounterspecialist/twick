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

[helpers/types.ts:256](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/visualizer/src/helpers/types.ts#L256)

## Properties

### name

• **name**: `string`

The unique name identifier for this element type

#### Defined in

[helpers/types.ts:254](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/visualizer/src/helpers/types.ts#L254)
