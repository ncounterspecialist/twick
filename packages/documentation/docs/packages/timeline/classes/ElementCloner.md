[@twick/timeline](../README.md) / [Exports](../modules.md) / ElementCloner

# Class: ElementCloner

## Implements

- [`ElementVisitor`](../interfaces/ElementVisitor.md)\<[`TrackElement`](TrackElement.md)\>

## Table of contents

### Constructors

- [constructor](ElementCloner.md#constructor)

### Methods

- [cloneElementProperties](ElementCloner.md#cloneelementproperties)
- [visitAudioElement](ElementCloner.md#visitaudioelement)
- [visitCaptionElement](ElementCloner.md#visitcaptionelement)
- [visitCircleElement](ElementCloner.md#visitcircleelement)
- [visitIconElement](ElementCloner.md#visiticonelement)
- [visitImageElement](ElementCloner.md#visitimageelement)
- [visitRectElement](ElementCloner.md#visitrectelement)
- [visitTextElement](ElementCloner.md#visittextelement)
- [visitVideoElement](ElementCloner.md#visitvideoelement)

## Constructors

### constructor

• **new ElementCloner**(): [`ElementCloner`](ElementCloner.md)

#### Returns

[`ElementCloner`](ElementCloner.md)

## Methods

### cloneElementProperties

▸ **cloneElementProperties**(`srcElement`, `destElement`): [`TrackElement`](TrackElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `srcElement` | [`TrackElement`](TrackElement.md) |
| `destElement` | [`TrackElement`](TrackElement.md) |

#### Returns

[`TrackElement`](TrackElement.md)

#### Defined in

[packages/timeline/src/core/visitor/element-cloner.ts:13](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/visitor/element-cloner.ts#L13)

___

### visitAudioElement

▸ **visitAudioElement**(`element`): [`TrackElement`](TrackElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`AudioElement`](AudioElement.md) |

#### Returns

[`TrackElement`](TrackElement.md)

#### Implementation of

[ElementVisitor](../interfaces/ElementVisitor.md).[visitAudioElement](../interfaces/ElementVisitor.md#visitaudioelement)

#### Defined in

[packages/timeline/src/core/visitor/element-cloner.ts:37](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/visitor/element-cloner.ts#L37)

___

### visitCaptionElement

▸ **visitCaptionElement**(`element`): [`TrackElement`](TrackElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`CaptionElement`](CaptionElement.md) |

#### Returns

[`TrackElement`](TrackElement.md)

#### Implementation of

[ElementVisitor](../interfaces/ElementVisitor.md).[visitCaptionElement](../interfaces/ElementVisitor.md#visitcaptionelement)

#### Defined in

[packages/timeline/src/core/visitor/element-cloner.ts:67](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/visitor/element-cloner.ts#L67)

___

### visitCircleElement

▸ **visitCircleElement**(`element`): [`TrackElement`](TrackElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`CircleElement`](CircleElement.md) |

#### Returns

[`TrackElement`](TrackElement.md)

#### Implementation of

[ElementVisitor](../interfaces/ElementVisitor.md).[visitCircleElement](../interfaces/ElementVisitor.md#visitcircleelement)

#### Defined in

[packages/timeline/src/core/visitor/element-cloner.ts:86](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/visitor/element-cloner.ts#L86)

___

### visitIconElement

▸ **visitIconElement**(`element`): [`TrackElement`](TrackElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`IconElement`](IconElement.md) |

#### Returns

[`TrackElement`](TrackElement.md)

#### Implementation of

[ElementVisitor](../interfaces/ElementVisitor.md).[visitIconElement](../interfaces/ElementVisitor.md#visiticonelement)

#### Defined in

[packages/timeline/src/core/visitor/element-cloner.ts:95](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/visitor/element-cloner.ts#L95)

___

### visitImageElement

▸ **visitImageElement**(`element`): [`TrackElement`](TrackElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`ImageElement`](ImageElement.md) |

#### Returns

[`TrackElement`](TrackElement.md)

#### Implementation of

[ElementVisitor](../interfaces/ElementVisitor.md).[visitImageElement](../interfaces/ElementVisitor.md#visitimageelement)

#### Defined in

[packages/timeline/src/core/visitor/element-cloner.ts:44](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/visitor/element-cloner.ts#L44)

___

### visitRectElement

▸ **visitRectElement**(`element`): [`TrackElement`](TrackElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`RectElement`](RectElement.md) |

#### Returns

[`TrackElement`](TrackElement.md)

#### Implementation of

[ElementVisitor](../interfaces/ElementVisitor.md).[visitRectElement](../interfaces/ElementVisitor.md#visitrectelement)

#### Defined in

[packages/timeline/src/core/visitor/element-cloner.ts:77](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/visitor/element-cloner.ts#L77)

___

### visitTextElement

▸ **visitTextElement**(`element`): [`TrackElement`](TrackElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`TextElement`](TextElement.md) |

#### Returns

[`TrackElement`](TrackElement.md)

#### Implementation of

[ElementVisitor](../interfaces/ElementVisitor.md).[visitTextElement](../interfaces/ElementVisitor.md#visittextelement)

#### Defined in

[packages/timeline/src/core/visitor/element-cloner.ts:60](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/visitor/element-cloner.ts#L60)

___

### visitVideoElement

▸ **visitVideoElement**(`element`): [`TrackElement`](TrackElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`VideoElement`](VideoElement.md) |

#### Returns

[`TrackElement`](TrackElement.md)

#### Implementation of

[ElementVisitor](../interfaces/ElementVisitor.md).[visitVideoElement](../interfaces/ElementVisitor.md#visitvideoelement)

#### Defined in

[packages/timeline/src/core/visitor/element-cloner.ts:23](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/visitor/element-cloner.ts#L23)
