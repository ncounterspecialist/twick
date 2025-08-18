[@twick/timeline](../README.md) / [Exports](../modules.md) / ElementValidator

# Class: ElementValidator

## Implements

- [`ElementVisitor`](../interfaces/ElementVisitor.md)\<`boolean`\>

## Table of contents

### Constructors

- [constructor](ElementValidator.md#constructor)

### Methods

- [validateAudioElement](ElementValidator.md#validateaudioelement)
- [validateBasicProperties](ElementValidator.md#validatebasicproperties)
- [validateCaptionElement](ElementValidator.md#validatecaptionelement)
- [validateCircleElement](ElementValidator.md#validatecircleelement)
- [validateIconElement](ElementValidator.md#validateiconelement)
- [validateImageElement](ElementValidator.md#validateimageelement)
- [validateRectElement](ElementValidator.md#validaterectelement)
- [validateTextElement](ElementValidator.md#validatetextelement)
- [validateVideoElement](ElementValidator.md#validatevideoelement)
- [visitAudioElement](ElementValidator.md#visitaudioelement)
- [visitCaptionElement](ElementValidator.md#visitcaptionelement)
- [visitCircleElement](ElementValidator.md#visitcircleelement)
- [visitIconElement](ElementValidator.md#visiticonelement)
- [visitImageElement](ElementValidator.md#visitimageelement)
- [visitRectElement](ElementValidator.md#visitrectelement)
- [visitTextElement](ElementValidator.md#visittextelement)
- [visitVideoElement](ElementValidator.md#visitvideoelement)

## Constructors

### constructor

• **new ElementValidator**(): [`ElementValidator`](ElementValidator.md)

#### Returns

[`ElementValidator`](ElementValidator.md)

## Methods

### validateAudioElement

▸ **validateAudioElement**(`element`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`AudioElement`](AudioElement.md) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `errors` | `string`[] |
| `warnings` | `string`[] |

#### Defined in

[packages/timeline/src/core/visitor/element-validator.ts:112](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/visitor/element-validator.ts#L112)

___

### validateBasicProperties

▸ **validateBasicProperties**(`element`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | `any` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `errors` | `string`[] |
| `warnings` | `string`[] |

#### Defined in

[packages/timeline/src/core/visitor/element-validator.ts:23](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/visitor/element-validator.ts#L23)

___

### validateCaptionElement

▸ **validateCaptionElement**(`element`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`CaptionElement`](CaptionElement.md) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `errors` | `string`[] |
| `warnings` | `string`[] |

#### Defined in

[packages/timeline/src/core/visitor/element-validator.ts:151](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/visitor/element-validator.ts#L151)

___

### validateCircleElement

▸ **validateCircleElement**(`element`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`CircleElement`](CircleElement.md) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `errors` | `string`[] |
| `warnings` | `string`[] |

#### Defined in

[packages/timeline/src/core/visitor/element-validator.ts:182](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/visitor/element-validator.ts#L182)

___

### validateIconElement

▸ **validateIconElement**(`element`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`IconElement`](IconElement.md) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `errors` | `string`[] |
| `warnings` | `string`[] |

#### Defined in

[packages/timeline/src/core/visitor/element-validator.ts:165](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/visitor/element-validator.ts#L165)

___

### validateImageElement

▸ **validateImageElement**(`element`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`ImageElement`](ImageElement.md) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `errors` | `string`[] |
| `warnings` | `string`[] |

#### Defined in

[packages/timeline/src/core/visitor/element-validator.ts:134](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/visitor/element-validator.ts#L134)

___

### validateRectElement

▸ **validateRectElement**(`element`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`RectElement`](RectElement.md) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `errors` | `string`[] |
| `warnings` | `string`[] |

#### Defined in

[packages/timeline/src/core/visitor/element-validator.ts:199](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/visitor/element-validator.ts#L199)

___

### validateTextElement

▸ **validateTextElement**(`element`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`TextElement`](TextElement.md) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `errors` | `string`[] |
| `warnings` | `string`[] |

#### Defined in

[packages/timeline/src/core/visitor/element-validator.ts:65](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/visitor/element-validator.ts#L65)

___

### validateVideoElement

▸ **validateVideoElement**(`element`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`VideoElement`](VideoElement.md) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `errors` | `string`[] |
| `warnings` | `string`[] |

#### Defined in

[packages/timeline/src/core/visitor/element-validator.ts:87](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/visitor/element-validator.ts#L87)

___

### visitAudioElement

▸ **visitAudioElement**(`element`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`AudioElement`](AudioElement.md) |

#### Returns

`boolean`

#### Implementation of

[ElementVisitor](../interfaces/ElementVisitor.md).[visitAudioElement](../interfaces/ElementVisitor.md#visitaudioelement)

#### Defined in

[packages/timeline/src/core/visitor/element-validator.ts:234](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/visitor/element-validator.ts#L234)

___

### visitCaptionElement

▸ **visitCaptionElement**(`element`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`CaptionElement`](CaptionElement.md) |

#### Returns

`boolean`

#### Implementation of

[ElementVisitor](../interfaces/ElementVisitor.md).[visitCaptionElement](../interfaces/ElementVisitor.md#visitcaptionelement)

#### Defined in

[packages/timeline/src/core/visitor/element-validator.ts:276](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/visitor/element-validator.ts#L276)

___

### visitCircleElement

▸ **visitCircleElement**(`element`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`CircleElement`](CircleElement.md) |

#### Returns

`boolean`

#### Implementation of

[ElementVisitor](../interfaces/ElementVisitor.md).[visitCircleElement](../interfaces/ElementVisitor.md#visitcircleelement)

#### Defined in

[packages/timeline/src/core/visitor/element-validator.ts:304](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/visitor/element-validator.ts#L304)

___

### visitIconElement

▸ **visitIconElement**(`element`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`IconElement`](IconElement.md) |

#### Returns

`boolean`

#### Implementation of

[ElementVisitor](../interfaces/ElementVisitor.md).[visitIconElement](../interfaces/ElementVisitor.md#visiticonelement)

#### Defined in

[packages/timeline/src/core/visitor/element-validator.ts:290](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/visitor/element-validator.ts#L290)

___

### visitImageElement

▸ **visitImageElement**(`element`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`ImageElement`](ImageElement.md) |

#### Returns

`boolean`

#### Implementation of

[ElementVisitor](../interfaces/ElementVisitor.md).[visitImageElement](../interfaces/ElementVisitor.md#visitimageelement)

#### Defined in

[packages/timeline/src/core/visitor/element-validator.ts:248](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/visitor/element-validator.ts#L248)

___

### visitRectElement

▸ **visitRectElement**(`element`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`RectElement`](RectElement.md) |

#### Returns

`boolean`

#### Implementation of

[ElementVisitor](../interfaces/ElementVisitor.md).[visitRectElement](../interfaces/ElementVisitor.md#visitrectelement)

#### Defined in

[packages/timeline/src/core/visitor/element-validator.ts:318](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/visitor/element-validator.ts#L318)

___

### visitTextElement

▸ **visitTextElement**(`element`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`TextElement`](TextElement.md) |

#### Returns

`boolean`

#### Implementation of

[ElementVisitor](../interfaces/ElementVisitor.md).[visitTextElement](../interfaces/ElementVisitor.md#visittextelement)

#### Defined in

[packages/timeline/src/core/visitor/element-validator.ts:262](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/visitor/element-validator.ts#L262)

___

### visitVideoElement

▸ **visitVideoElement**(`element`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`VideoElement`](VideoElement.md) |

#### Returns

`boolean`

#### Implementation of

[ElementVisitor](../interfaces/ElementVisitor.md).[visitVideoElement](../interfaces/ElementVisitor.md#visitvideoelement)

#### Defined in

[packages/timeline/src/core/visitor/element-validator.ts:220](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/visitor/element-validator.ts#L220)
