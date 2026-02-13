# Class: ElementUpdater

ElementUpdater visitor for updating elements in tracks
Uses the visitor pattern to handle different element types
Implements the Friend Class Pattern for explicit access control

## Implements

- [`ElementVisitor`](../interfaces/ElementVisitor.md)\<`boolean`\>

## Table of contents

### Constructors

- [constructor](ElementUpdater.md#constructor)

### Methods

- [visitVideoElement](ElementUpdater.md#visitvideoelement)
- [visitAudioElement](ElementUpdater.md#visitaudioelement)
- [visitImageElement](ElementUpdater.md#visitimageelement)
- [visitTextElement](ElementUpdater.md#visittextelement)
- [visitCaptionElement](ElementUpdater.md#visitcaptionelement)
- [visitIconElement](ElementUpdater.md#visiticonelement)
- [visitCircleElement](ElementUpdater.md#visitcircleelement)
- [visitRectElement](ElementUpdater.md#visitrectelement)

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

[core/visitor/element-updater.ts:21](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/visitor/element-updater.ts#L21)

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

[core/visitor/element-updater.ts:25](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/visitor/element-updater.ts#L25)

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

[core/visitor/element-updater.ts:29](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/visitor/element-updater.ts#L29)

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

[core/visitor/element-updater.ts:33](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/visitor/element-updater.ts#L33)

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

[core/visitor/element-updater.ts:37](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/visitor/element-updater.ts#L37)

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

[core/visitor/element-updater.ts:41](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/visitor/element-updater.ts#L41)

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

[core/visitor/element-updater.ts:45](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/visitor/element-updater.ts#L45)

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

[core/visitor/element-updater.ts:49](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/visitor/element-updater.ts#L49)

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

[core/visitor/element-updater.ts:53](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/visitor/element-updater.ts#L53)
