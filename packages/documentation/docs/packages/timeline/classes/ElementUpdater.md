[@twick/timeline](../README.md) / [Exports](../modules.md) / ElementUpdater

# Class: ElementUpdater

ElementUpdater visitor for updating elements in tracks
Uses the visitor pattern to handle different element types
Implements the Friend Class Pattern for explicit access control

## Implements

- [`ElementVisitor`](../interfaces/ElementVisitor.md)\<`boolean`\>

## Table of contents

### Constructors

- [constructor](ElementUpdater.md#constructor)

### Properties

- [trackFriend](ElementUpdater.md#trackfriend)

### Methods

- [visitAudioElement](ElementUpdater.md#visitaudioelement)
- [visitCaptionElement](ElementUpdater.md#visitcaptionelement)
- [visitCircleElement](ElementUpdater.md#visitcircleelement)
- [visitIconElement](ElementUpdater.md#visiticonelement)
- [visitImageElement](ElementUpdater.md#visitimageelement)
- [visitRectElement](ElementUpdater.md#visitrectelement)
- [visitTextElement](ElementUpdater.md#visittextelement)
- [visitVideoElement](ElementUpdater.md#visitvideoelement)

## Constructors

### constructor

• **new ElementUpdater**(`track`): [`ElementUpdater`](ElementUpdater.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `track` | [`Track`](Track.md) |

#### Returns

[`ElementUpdater`](ElementUpdater.md)

#### Defined in

[packages/timeline/src/core/visitor/element-updater.ts:21](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/visitor/element-updater.ts#L21)

## Properties

### trackFriend

• `Private` **trackFriend**: `TrackFriend`

#### Defined in

[packages/timeline/src/core/visitor/element-updater.ts:19](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/visitor/element-updater.ts#L19)

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

[packages/timeline/src/core/visitor/element-updater.ts:29](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/visitor/element-updater.ts#L29)

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

[packages/timeline/src/core/visitor/element-updater.ts:41](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/visitor/element-updater.ts#L41)

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

[packages/timeline/src/core/visitor/element-updater.ts:49](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/visitor/element-updater.ts#L49)

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

[packages/timeline/src/core/visitor/element-updater.ts:45](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/visitor/element-updater.ts#L45)

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

[packages/timeline/src/core/visitor/element-updater.ts:33](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/visitor/element-updater.ts#L33)

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

[packages/timeline/src/core/visitor/element-updater.ts:53](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/visitor/element-updater.ts#L53)

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

[packages/timeline/src/core/visitor/element-updater.ts:37](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/visitor/element-updater.ts#L37)

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

[packages/timeline/src/core/visitor/element-updater.ts:25](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/visitor/element-updater.ts#L25)
