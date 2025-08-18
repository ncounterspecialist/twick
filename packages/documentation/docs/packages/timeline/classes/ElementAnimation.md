[@twick/timeline](../README.md) / [Exports](../modules.md) / ElementAnimation

# Class: ElementAnimation

## Table of contents

### Constructors

- [constructor](ElementAnimation.md#constructor)

### Properties

- [animate](ElementAnimation.md#animate)
- [direction](ElementAnimation.md#direction)
- [intensity](ElementAnimation.md#intensity)
- [interval](ElementAnimation.md#interval)
- [mode](ElementAnimation.md#mode)
- [name](ElementAnimation.md#name)

### Methods

- [getAnimate](ElementAnimation.md#getanimate)
- [getDirection](ElementAnimation.md#getdirection)
- [getIntensity](ElementAnimation.md#getintensity)
- [getInterval](ElementAnimation.md#getinterval)
- [getMode](ElementAnimation.md#getmode)
- [getName](ElementAnimation.md#getname)
- [setAnimate](ElementAnimation.md#setanimate)
- [setDirection](ElementAnimation.md#setdirection)
- [setIntensity](ElementAnimation.md#setintensity)
- [setInterval](ElementAnimation.md#setinterval)
- [setMode](ElementAnimation.md#setmode)
- [toJSON](ElementAnimation.md#tojson)
- [fromJSON](ElementAnimation.md#fromjson)

## Constructors

### constructor

• **new ElementAnimation**(`name`): [`ElementAnimation`](ElementAnimation.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`ElementAnimation`](ElementAnimation.md)

#### Defined in

[packages/timeline/src/core/addOns/animation.ts:11](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/addOns/animation.ts#L11)

## Properties

### animate

• `Private` `Optional` **animate**: ``"enter"`` \| ``"exit"`` \| ``"both"``

#### Defined in

[packages/timeline/src/core/addOns/animation.ts:7](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/addOns/animation.ts#L7)

___

### direction

• `Private` `Optional` **direction**: ``"left"`` \| ``"center"`` \| ``"right"`` \| ``"up"`` \| ``"down"``

#### Defined in

[packages/timeline/src/core/addOns/animation.ts:9](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/addOns/animation.ts#L9)

___

### intensity

• `Private` `Optional` **intensity**: `number`

#### Defined in

[packages/timeline/src/core/addOns/animation.ts:6](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/addOns/animation.ts#L6)

___

### interval

• `Private` `Optional` **interval**: `number`

#### Defined in

[packages/timeline/src/core/addOns/animation.ts:5](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/addOns/animation.ts#L5)

___

### mode

• `Private` `Optional` **mode**: ``"in"`` \| ``"out"``

#### Defined in

[packages/timeline/src/core/addOns/animation.ts:8](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/addOns/animation.ts#L8)

___

### name

• `Private` **name**: `string`

#### Defined in

[packages/timeline/src/core/addOns/animation.ts:4](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/addOns/animation.ts#L4)

## Methods

### getAnimate

▸ **getAnimate**(): `undefined` \| ``"enter"`` \| ``"exit"`` \| ``"both"``

#### Returns

`undefined` \| ``"enter"`` \| ``"exit"`` \| ``"both"``

#### Defined in

[packages/timeline/src/core/addOns/animation.ts:27](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/addOns/animation.ts#L27)

___

### getDirection

▸ **getDirection**(): `undefined` \| ``"left"`` \| ``"center"`` \| ``"right"`` \| ``"up"`` \| ``"down"``

#### Returns

`undefined` \| ``"left"`` \| ``"center"`` \| ``"right"`` \| ``"up"`` \| ``"down"``

#### Defined in

[packages/timeline/src/core/addOns/animation.ts:35](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/addOns/animation.ts#L35)

___

### getIntensity

▸ **getIntensity**(): `undefined` \| `number`

#### Returns

`undefined` \| `number`

#### Defined in

[packages/timeline/src/core/addOns/animation.ts:23](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/addOns/animation.ts#L23)

___

### getInterval

▸ **getInterval**(): `undefined` \| `number`

#### Returns

`undefined` \| `number`

#### Defined in

[packages/timeline/src/core/addOns/animation.ts:19](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/addOns/animation.ts#L19)

___

### getMode

▸ **getMode**(): `undefined` \| ``"in"`` \| ``"out"``

#### Returns

`undefined` \| ``"in"`` \| ``"out"``

#### Defined in

[packages/timeline/src/core/addOns/animation.ts:31](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/addOns/animation.ts#L31)

___

### getName

▸ **getName**(): `string`

#### Returns

`string`

#### Defined in

[packages/timeline/src/core/addOns/animation.ts:15](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/addOns/animation.ts#L15)

___

### setAnimate

▸ **setAnimate**(`animate?`): [`ElementAnimation`](ElementAnimation.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `animate?` | ``"enter"`` \| ``"exit"`` \| ``"both"`` |

#### Returns

[`ElementAnimation`](ElementAnimation.md)

#### Defined in

[packages/timeline/src/core/addOns/animation.ts:49](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/addOns/animation.ts#L49)

___

### setDirection

▸ **setDirection**(`direction?`): [`ElementAnimation`](ElementAnimation.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `direction?` | ``"left"`` \| ``"center"`` \| ``"right"`` \| ``"up"`` \| ``"down"`` |

#### Returns

[`ElementAnimation`](ElementAnimation.md)

#### Defined in

[packages/timeline/src/core/addOns/animation.ts:59](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/addOns/animation.ts#L59)

___

### setIntensity

▸ **setIntensity**(`intensity?`): [`ElementAnimation`](ElementAnimation.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `intensity?` | `number` |

#### Returns

[`ElementAnimation`](ElementAnimation.md)

#### Defined in

[packages/timeline/src/core/addOns/animation.ts:44](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/addOns/animation.ts#L44)

___

### setInterval

▸ **setInterval**(`interval?`): [`ElementAnimation`](ElementAnimation.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `interval?` | `number` |

#### Returns

[`ElementAnimation`](ElementAnimation.md)

#### Defined in

[packages/timeline/src/core/addOns/animation.ts:39](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/addOns/animation.ts#L39)

___

### setMode

▸ **setMode**(`mode?`): [`ElementAnimation`](ElementAnimation.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `mode?` | ``"in"`` \| ``"out"`` |

#### Returns

[`ElementAnimation`](ElementAnimation.md)

#### Defined in

[packages/timeline/src/core/addOns/animation.ts:54](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/addOns/animation.ts#L54)

___

### toJSON

▸ **toJSON**(): [`Animation`](../modules.md#animation)

#### Returns

[`Animation`](../modules.md#animation)

#### Defined in

[packages/timeline/src/core/addOns/animation.ts:64](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/addOns/animation.ts#L64)

___

### fromJSON

▸ **fromJSON**(`json`): [`ElementAnimation`](ElementAnimation.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `json` | [`Animation`](../modules.md#animation) |

#### Returns

[`ElementAnimation`](ElementAnimation.md)

#### Defined in

[packages/timeline/src/core/addOns/animation.ts:75](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/addOns/animation.ts#L75)
