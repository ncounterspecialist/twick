[@twick/timeline](../README.md) / [Exports](../modules.md) / ElementTextEffect

# Class: ElementTextEffect

## Table of contents

### Constructors

- [constructor](ElementTextEffect.md#constructor)

### Properties

- [bufferTime](ElementTextEffect.md#buffertime)
- [delay](ElementTextEffect.md#delay)
- [duration](ElementTextEffect.md#duration)
- [name](ElementTextEffect.md#name)

### Methods

- [getBufferTime](ElementTextEffect.md#getbuffertime)
- [getDelay](ElementTextEffect.md#getdelay)
- [getDuration](ElementTextEffect.md#getduration)
- [getName](ElementTextEffect.md#getname)
- [setBufferTime](ElementTextEffect.md#setbuffertime)
- [setDelay](ElementTextEffect.md#setdelay)
- [setDuration](ElementTextEffect.md#setduration)
- [toJSON](ElementTextEffect.md#tojson)
- [fromJSON](ElementTextEffect.md#fromjson)

## Constructors

### constructor

• **new ElementTextEffect**(`name`): [`ElementTextEffect`](ElementTextEffect.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`ElementTextEffect`](ElementTextEffect.md)

#### Defined in

[packages/timeline/src/core/addOns/text-effect.ts:9](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/addOns/text-effect.ts#L9)

## Properties

### bufferTime

• `Private` `Optional` **bufferTime**: `number`

#### Defined in

[packages/timeline/src/core/addOns/text-effect.ts:7](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/addOns/text-effect.ts#L7)

___

### delay

• `Private` `Optional` **delay**: `number`

#### Defined in

[packages/timeline/src/core/addOns/text-effect.ts:6](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/addOns/text-effect.ts#L6)

___

### duration

• `Private` `Optional` **duration**: `number`

#### Defined in

[packages/timeline/src/core/addOns/text-effect.ts:5](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/addOns/text-effect.ts#L5)

___

### name

• `Private` **name**: `string`

#### Defined in

[packages/timeline/src/core/addOns/text-effect.ts:4](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/addOns/text-effect.ts#L4)

## Methods

### getBufferTime

▸ **getBufferTime**(): `undefined` \| `number`

#### Returns

`undefined` \| `number`

#### Defined in

[packages/timeline/src/core/addOns/text-effect.ts:25](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/addOns/text-effect.ts#L25)

___

### getDelay

▸ **getDelay**(): `undefined` \| `number`

#### Returns

`undefined` \| `number`

#### Defined in

[packages/timeline/src/core/addOns/text-effect.ts:21](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/addOns/text-effect.ts#L21)

___

### getDuration

▸ **getDuration**(): `undefined` \| `number`

#### Returns

`undefined` \| `number`

#### Defined in

[packages/timeline/src/core/addOns/text-effect.ts:17](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/addOns/text-effect.ts#L17)

___

### getName

▸ **getName**(): `string`

#### Returns

`string`

#### Defined in

[packages/timeline/src/core/addOns/text-effect.ts:13](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/addOns/text-effect.ts#L13)

___

### setBufferTime

▸ **setBufferTime**(`bufferTime?`): [`ElementTextEffect`](ElementTextEffect.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `bufferTime?` | `number` |

#### Returns

[`ElementTextEffect`](ElementTextEffect.md)

#### Defined in

[packages/timeline/src/core/addOns/text-effect.ts:39](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/addOns/text-effect.ts#L39)

___

### setDelay

▸ **setDelay**(`delay?`): [`ElementTextEffect`](ElementTextEffect.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `delay?` | `number` |

#### Returns

[`ElementTextEffect`](ElementTextEffect.md)

#### Defined in

[packages/timeline/src/core/addOns/text-effect.ts:34](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/addOns/text-effect.ts#L34)

___

### setDuration

▸ **setDuration**(`duration?`): [`ElementTextEffect`](ElementTextEffect.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `duration?` | `number` |

#### Returns

[`ElementTextEffect`](ElementTextEffect.md)

#### Defined in

[packages/timeline/src/core/addOns/text-effect.ts:29](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/addOns/text-effect.ts#L29)

___

### toJSON

▸ **toJSON**(): [`TextEffect`](../modules.md#texteffect)

#### Returns

[`TextEffect`](../modules.md#texteffect)

#### Defined in

[packages/timeline/src/core/addOns/text-effect.ts:44](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/addOns/text-effect.ts#L44)

___

### fromJSON

▸ **fromJSON**(`json`): [`ElementTextEffect`](ElementTextEffect.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `json` | [`TextEffect`](../modules.md#texteffect) |

#### Returns

[`ElementTextEffect`](ElementTextEffect.md)

#### Defined in

[packages/timeline/src/core/addOns/text-effect.ts:53](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/addOns/text-effect.ts#L53)
