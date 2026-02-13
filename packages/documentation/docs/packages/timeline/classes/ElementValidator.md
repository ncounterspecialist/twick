# Class: ElementValidator

## Implements

- [`ElementVisitor`](../interfaces/ElementVisitor.md)\<`boolean`\>

## Table of contents

### Constructors

- [constructor](ElementValidator.md#constructor)

### Methods

- [visitVideoElement](ElementValidator.md#visitvideoelement)
- [visitAudioElement](ElementValidator.md#visitaudioelement)
- [visitImageElement](ElementValidator.md#visitimageelement)
- [visitTextElement](ElementValidator.md#visittextelement)
- [visitCaptionElement](ElementValidator.md#visitcaptionelement)
- [visitIconElement](ElementValidator.md#visiticonelement)
- [visitCircleElement](ElementValidator.md#visitcircleelement)
- [visitRectElement](ElementValidator.md#visitrectelement)

## Constructors

### constructor

• **new ElementValidator**(): [`ElementValidator`](ElementValidator.md)

#### Returns

[`ElementValidator`](ElementValidator.md)

## Methods

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

[core/visitor/element-validator.ts:219](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/visitor/element-validator.ts#L219)

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

[core/visitor/element-validator.ts:233](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/visitor/element-validator.ts#L233)

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

[core/visitor/element-validator.ts:247](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/visitor/element-validator.ts#L247)

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

[core/visitor/element-validator.ts:261](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/visitor/element-validator.ts#L261)

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

[core/visitor/element-validator.ts:275](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/visitor/element-validator.ts#L275)

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

[core/visitor/element-validator.ts:289](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/visitor/element-validator.ts#L289)

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

[core/visitor/element-validator.ts:303](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/visitor/element-validator.ts#L303)

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

[core/visitor/element-validator.ts:317](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/visitor/element-validator.ts#L317)
