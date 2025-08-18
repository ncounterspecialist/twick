[@twick/timeline](../README.md) / [Exports](../modules.md) / ElementAdder

# Class: ElementAdder

ElementAdder visitor for adding elements to tracks
Uses the visitor pattern to handle different element types
Implements the Friend Class Pattern for explicit access control

## Implements

- [`ElementVisitor`](../interfaces/ElementVisitor.md)\<`Promise`\<`boolean`\>\>

## Table of contents

### Constructors

- [constructor](ElementAdder.md#constructor)

### Properties

- [track](ElementAdder.md#track)
- [trackFriend](ElementAdder.md#trackfriend)

### Methods

- [visitAudioElement](ElementAdder.md#visitaudioelement)
- [visitCaptionElement](ElementAdder.md#visitcaptionelement)
- [visitCircleElement](ElementAdder.md#visitcircleelement)
- [visitIconElement](ElementAdder.md#visiticonelement)
- [visitImageElement](ElementAdder.md#visitimageelement)
- [visitRectElement](ElementAdder.md#visitrectelement)
- [visitTextElement](ElementAdder.md#visittextelement)
- [visitVideoElement](ElementAdder.md#visitvideoelement)

## Constructors

### constructor

• **new ElementAdder**(`track`): [`ElementAdder`](ElementAdder.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `track` | [`Track`](Track.md) |

#### Returns

[`ElementAdder`](ElementAdder.md)

#### Defined in

[packages/timeline/src/core/visitor/element-adder.ts:22](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/visitor/element-adder.ts#L22)

## Properties

### track

• `Private` **track**: [`Track`](Track.md)

#### Defined in

[packages/timeline/src/core/visitor/element-adder.ts:19](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/visitor/element-adder.ts#L19)

___

### trackFriend

• `Private` **trackFriend**: `TrackFriend`

#### Defined in

[packages/timeline/src/core/visitor/element-adder.ts:20](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/visitor/element-adder.ts#L20)

## Methods

### visitAudioElement

▸ **visitAudioElement**(`element`): `Promise`\<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`AudioElement`](AudioElement.md) |

#### Returns

`Promise`\<`boolean`\>

#### Implementation of

[ElementVisitor](../interfaces/ElementVisitor.md).[visitAudioElement](../interfaces/ElementVisitor.md#visitaudioelement)

#### Defined in

[packages/timeline/src/core/visitor/element-adder.ts:43](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/visitor/element-adder.ts#L43)

___

### visitCaptionElement

▸ **visitCaptionElement**(`element`): `Promise`\<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`CaptionElement`](CaptionElement.md) |

#### Returns

`Promise`\<`boolean`\>

#### Implementation of

[ElementVisitor](../interfaces/ElementVisitor.md).[visitCaptionElement](../interfaces/ElementVisitor.md#visitcaptionelement)

#### Defined in

[packages/timeline/src/core/visitor/element-adder.ts:90](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/visitor/element-adder.ts#L90)

___

### visitCircleElement

▸ **visitCircleElement**(`element`): `Promise`\<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`CircleElement`](CircleElement.md) |

#### Returns

`Promise`\<`boolean`\>

#### Implementation of

[ElementVisitor](../interfaces/ElementVisitor.md).[visitCircleElement](../interfaces/ElementVisitor.md#visitcircleelement)

#### Defined in

[packages/timeline/src/core/visitor/element-adder.ts:120](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/visitor/element-adder.ts#L120)

___

### visitIconElement

▸ **visitIconElement**(`element`): `Promise`\<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`IconElement`](IconElement.md) |

#### Returns

`Promise`\<`boolean`\>

#### Implementation of

[ElementVisitor](../interfaces/ElementVisitor.md).[visitIconElement](../interfaces/ElementVisitor.md#visiticonelement)

#### Defined in

[packages/timeline/src/core/visitor/element-adder.ts:105](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/visitor/element-adder.ts#L105)

___

### visitImageElement

▸ **visitImageElement**(`element`): `Promise`\<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`ImageElement`](ImageElement.md) |

#### Returns

`Promise`\<`boolean`\>

#### Implementation of

[ElementVisitor](../interfaces/ElementVisitor.md).[visitImageElement](../interfaces/ElementVisitor.md#visitimageelement)

#### Defined in

[packages/timeline/src/core/visitor/element-adder.ts:59](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/visitor/element-adder.ts#L59)

___

### visitRectElement

▸ **visitRectElement**(`element`): `Promise`\<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`RectElement`](RectElement.md) |

#### Returns

`Promise`\<`boolean`\>

#### Implementation of

[ElementVisitor](../interfaces/ElementVisitor.md).[visitRectElement](../interfaces/ElementVisitor.md#visitrectelement)

#### Defined in

[packages/timeline/src/core/visitor/element-adder.ts:135](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/visitor/element-adder.ts#L135)

___

### visitTextElement

▸ **visitTextElement**(`element`): `Promise`\<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`TextElement`](TextElement.md) |

#### Returns

`Promise`\<`boolean`\>

#### Implementation of

[ElementVisitor](../interfaces/ElementVisitor.md).[visitTextElement](../interfaces/ElementVisitor.md#visittextelement)

#### Defined in

[packages/timeline/src/core/visitor/element-adder.ts:75](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/visitor/element-adder.ts#L75)

___

### visitVideoElement

▸ **visitVideoElement**(`element`): `Promise`\<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`VideoElement`](VideoElement.md) |

#### Returns

`Promise`\<`boolean`\>

#### Implementation of

[ElementVisitor](../interfaces/ElementVisitor.md).[visitVideoElement](../interfaces/ElementVisitor.md#visitvideoelement)

#### Defined in

[packages/timeline/src/core/visitor/element-adder.ts:27](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/visitor/element-adder.ts#L27)
