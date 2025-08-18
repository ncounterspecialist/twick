[@twick/timeline](../README.md) / [Exports](../modules.md) / ElementRemover

# Class: ElementRemover

ElementRemover visitor for removing elements from tracks
Uses the visitor pattern to handle different element types
Implements the Friend Class Pattern for explicit access control

## Implements

- [`ElementVisitor`](../interfaces/ElementVisitor.md)\<`boolean`\>

## Table of contents

### Constructors

- [constructor](ElementRemover.md#constructor)

### Properties

- [trackFriend](ElementRemover.md#trackfriend)

### Methods

- [visitAudioElement](ElementRemover.md#visitaudioelement)
- [visitCaptionElement](ElementRemover.md#visitcaptionelement)
- [visitCircleElement](ElementRemover.md#visitcircleelement)
- [visitIconElement](ElementRemover.md#visiticonelement)
- [visitImageElement](ElementRemover.md#visitimageelement)
- [visitRectElement](ElementRemover.md#visitrectelement)
- [visitTextElement](ElementRemover.md#visittextelement)
- [visitVideoElement](ElementRemover.md#visitvideoelement)

## Constructors

### constructor

• **new ElementRemover**(`track`): [`ElementRemover`](ElementRemover.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `track` | [`Track`](Track.md) |

#### Returns

[`ElementRemover`](ElementRemover.md)

#### Defined in

[packages/timeline/src/core/visitor/element-remover.ts:21](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/visitor/element-remover.ts#L21)

## Properties

### trackFriend

• `Private` **trackFriend**: `TrackFriend`

#### Defined in

[packages/timeline/src/core/visitor/element-remover.ts:19](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/visitor/element-remover.ts#L19)

## Methods

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

[packages/timeline/src/core/visitor/element-remover.ts:30](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/visitor/element-remover.ts#L30)

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

[packages/timeline/src/core/visitor/element-remover.ts:45](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/visitor/element-remover.ts#L45)

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

[packages/timeline/src/core/visitor/element-remover.ts:55](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/visitor/element-remover.ts#L55)

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

[packages/timeline/src/core/visitor/element-remover.ts:50](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/visitor/element-remover.ts#L50)

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

[packages/timeline/src/core/visitor/element-remover.ts:35](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/visitor/element-remover.ts#L35)

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

[packages/timeline/src/core/visitor/element-remover.ts:60](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/visitor/element-remover.ts#L60)

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

[packages/timeline/src/core/visitor/element-remover.ts:40](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/visitor/element-remover.ts#L40)

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

[packages/timeline/src/core/visitor/element-remover.ts:25](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/visitor/element-remover.ts#L25)
