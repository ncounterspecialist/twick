# Class: ElementSerializer

## Implements

- [`ElementVisitor`](../interfaces/ElementVisitor.md)\<[`ElementJSON`](../interfaces/ElementJSON.md)\>

## Table of contents

### Constructors

- [constructor](ElementSerializer.md#constructor)

### Methods

- [serializeElement](ElementSerializer.md#serializeelement)
- [visitVideoElement](ElementSerializer.md#visitvideoelement)
- [visitAudioElement](ElementSerializer.md#visitaudioelement)
- [visitImageElement](ElementSerializer.md#visitimageelement)
- [visitTextElement](ElementSerializer.md#visittextelement)
- [visitCaptionElement](ElementSerializer.md#visitcaptionelement)
- [visitIconElement](ElementSerializer.md#visiticonelement)
- [visitCircleElement](ElementSerializer.md#visitcircleelement)
- [visitRectElement](ElementSerializer.md#visitrectelement)

## Constructors

### constructor

• **new ElementSerializer**(): [`ElementSerializer`](ElementSerializer.md)

#### Returns

[`ElementSerializer`](ElementSerializer.md)

## Methods

### serializeElement

▸ **serializeElement**(`element`): [`ElementJSON`](../interfaces/ElementJSON.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`TrackElement`](TrackElement.md) |

#### Returns

[`ElementJSON`](../interfaces/ElementJSON.md)

#### Defined in

[core/visitor/element-serializer.ts:14](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/visitor/element-serializer.ts#L14)

___

### visitVideoElement

▸ **visitVideoElement**(`element`): [`ElementJSON`](../interfaces/ElementJSON.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`VideoElement`](VideoElement.md) |

#### Returns

[`ElementJSON`](../interfaces/ElementJSON.md)

#### Implementation of

[ElementVisitor](../interfaces/ElementVisitor.md).[visitVideoElement](../interfaces/ElementVisitor.md#visitvideoelement)

#### Defined in

[core/visitor/element-serializer.ts:26](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/visitor/element-serializer.ts#L26)

___

### visitAudioElement

▸ **visitAudioElement**(`element`): [`ElementJSON`](../interfaces/ElementJSON.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`AudioElement`](AudioElement.md) |

#### Returns

[`ElementJSON`](../interfaces/ElementJSON.md)

#### Implementation of

[ElementVisitor](../interfaces/ElementVisitor.md).[visitAudioElement](../interfaces/ElementVisitor.md#visitaudioelement)

#### Defined in

[core/visitor/element-serializer.ts:37](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/visitor/element-serializer.ts#L37)

___

### visitImageElement

▸ **visitImageElement**(`element`): [`ElementJSON`](../interfaces/ElementJSON.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`ImageElement`](ImageElement.md) |

#### Returns

[`ElementJSON`](../interfaces/ElementJSON.md)

#### Implementation of

[ElementVisitor](../interfaces/ElementVisitor.md).[visitImageElement](../interfaces/ElementVisitor.md#visitimageelement)

#### Defined in

[core/visitor/element-serializer.ts:44](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/visitor/element-serializer.ts#L44)

___

### visitTextElement

▸ **visitTextElement**(`element`): [`ElementJSON`](../interfaces/ElementJSON.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`TextElement`](TextElement.md) |

#### Returns

[`ElementJSON`](../interfaces/ElementJSON.md)

#### Implementation of

[ElementVisitor](../interfaces/ElementVisitor.md).[visitTextElement](../interfaces/ElementVisitor.md#visittextelement)

#### Defined in

[core/visitor/element-serializer.ts:54](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/visitor/element-serializer.ts#L54)

___

### visitCaptionElement

▸ **visitCaptionElement**(`element`): [`ElementJSON`](../interfaces/ElementJSON.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`CaptionElement`](CaptionElement.md) |

#### Returns

[`ElementJSON`](../interfaces/ElementJSON.md)

#### Implementation of

[ElementVisitor](../interfaces/ElementVisitor.md).[visitCaptionElement](../interfaces/ElementVisitor.md#visitcaptionelement)

#### Defined in

[core/visitor/element-serializer.ts:61](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/visitor/element-serializer.ts#L61)

___

### visitIconElement

▸ **visitIconElement**(`element`): [`ElementJSON`](../interfaces/ElementJSON.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`IconElement`](IconElement.md) |

#### Returns

[`ElementJSON`](../interfaces/ElementJSON.md)

#### Implementation of

[ElementVisitor](../interfaces/ElementVisitor.md).[visitIconElement](../interfaces/ElementVisitor.md#visiticonelement)

#### Defined in

[core/visitor/element-serializer.ts:68](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/visitor/element-serializer.ts#L68)

___

### visitCircleElement

▸ **visitCircleElement**(`element`): [`ElementJSON`](../interfaces/ElementJSON.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`CircleElement`](CircleElement.md) |

#### Returns

[`ElementJSON`](../interfaces/ElementJSON.md)

#### Implementation of

[ElementVisitor](../interfaces/ElementVisitor.md).[visitCircleElement](../interfaces/ElementVisitor.md#visitcircleelement)

#### Defined in

[core/visitor/element-serializer.ts:74](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/visitor/element-serializer.ts#L74)

___

### visitRectElement

▸ **visitRectElement**(`element`): [`ElementJSON`](../interfaces/ElementJSON.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`RectElement`](RectElement.md) |

#### Returns

[`ElementJSON`](../interfaces/ElementJSON.md)

#### Implementation of

[ElementVisitor](../interfaces/ElementVisitor.md).[visitRectElement](../interfaces/ElementVisitor.md#visitrectelement)

#### Defined in

[core/visitor/element-serializer.ts:80](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/visitor/element-serializer.ts#L80)
