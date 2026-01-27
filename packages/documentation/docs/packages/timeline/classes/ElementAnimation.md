# Class: ElementAnimation

## Table of contents

### Constructors

- [constructor](ElementAnimation.md#constructor)

### Methods

- [getName](ElementAnimation.md#getname)
- [getInterval](ElementAnimation.md#getinterval)
- [getDuration](ElementAnimation.md#getduration)
- [getIntensity](ElementAnimation.md#getintensity)
- [getAnimate](ElementAnimation.md#getanimate)
- [getMode](ElementAnimation.md#getmode)
- [getDirection](ElementAnimation.md#getdirection)
- [setInterval](ElementAnimation.md#setinterval)
- [setDuration](ElementAnimation.md#setduration)
- [setIntensity](ElementAnimation.md#setintensity)
- [setAnimate](ElementAnimation.md#setanimate)
- [setMode](ElementAnimation.md#setmode)
- [setDirection](ElementAnimation.md#setdirection)
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

[core/addOns/animation.ts:12](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/addOns/animation.ts#L12)

## Methods

### getName

▸ **getName**(): `string`

#### Returns

`string`

#### Defined in

[core/addOns/animation.ts:16](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/addOns/animation.ts#L16)

___

### getInterval

▸ **getInterval**(): `undefined` \| `number`

#### Returns

`undefined` \| `number`

#### Defined in

[core/addOns/animation.ts:20](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/addOns/animation.ts#L20)

___

### getDuration

▸ **getDuration**(): `undefined` \| `number`

#### Returns

`undefined` \| `number`

#### Defined in

[core/addOns/animation.ts:24](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/addOns/animation.ts#L24)

___

### getIntensity

▸ **getIntensity**(): `undefined` \| `number`

#### Returns

`undefined` \| `number`

#### Defined in

[core/addOns/animation.ts:28](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/addOns/animation.ts#L28)

___

### getAnimate

▸ **getAnimate**(): `undefined` \| ``"enter"`` \| ``"exit"`` \| ``"both"``

#### Returns

`undefined` \| ``"enter"`` \| ``"exit"`` \| ``"both"``

#### Defined in

[core/addOns/animation.ts:32](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/addOns/animation.ts#L32)

___

### getMode

▸ **getMode**(): `undefined` \| ``"in"`` \| ``"out"``

#### Returns

`undefined` \| ``"in"`` \| ``"out"``

#### Defined in

[core/addOns/animation.ts:36](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/addOns/animation.ts#L36)

___

### getDirection

▸ **getDirection**(): `undefined` \| ``"left"`` \| ``"center"`` \| ``"right"`` \| ``"up"`` \| ``"down"``

#### Returns

`undefined` \| ``"left"`` \| ``"center"`` \| ``"right"`` \| ``"up"`` \| ``"down"``

#### Defined in

[core/addOns/animation.ts:40](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/addOns/animation.ts#L40)

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

[core/addOns/animation.ts:44](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/addOns/animation.ts#L44)

___

### setDuration

▸ **setDuration**(`duration?`): [`ElementAnimation`](ElementAnimation.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `duration?` | `number` |

#### Returns

[`ElementAnimation`](ElementAnimation.md)

#### Defined in

[core/addOns/animation.ts:49](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/addOns/animation.ts#L49)

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

[core/addOns/animation.ts:54](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/addOns/animation.ts#L54)

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

[core/addOns/animation.ts:59](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/addOns/animation.ts#L59)

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

[core/addOns/animation.ts:64](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/addOns/animation.ts#L64)

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

[core/addOns/animation.ts:69](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/addOns/animation.ts#L69)

___

### toJSON

▸ **toJSON**(): [`Animation`](../interfaces/Animation.md)

#### Returns

[`Animation`](../interfaces/Animation.md)

#### Defined in

[core/addOns/animation.ts:74](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/addOns/animation.ts#L74)

___

### fromJSON

▸ **fromJSON**(`json`): [`ElementAnimation`](ElementAnimation.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `json` | [`Animation`](../interfaces/Animation.md) |

#### Returns

[`ElementAnimation`](ElementAnimation.md)

#### Defined in

[core/addOns/animation.ts:86](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/addOns/animation.ts#L86)
