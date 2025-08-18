[@twick/timeline](../README.md) / [Exports](../modules.md) / ElementSerializer

# Class: ElementSerializer

## Implements

- [`ElementVisitor`](../interfaces/ElementVisitor.md)\<[`ElementJSON`](../modules.md#elementjson)\>

## Table of contents

### Constructors

- [constructor](ElementSerializer.md#constructor)

### Methods

- [serializeElement](ElementSerializer.md#serializeelement)
- [visitAudioElement](ElementSerializer.md#visitaudioelement)
- [visitCaptionElement](ElementSerializer.md#visitcaptionelement)
- [visitCircleElement](ElementSerializer.md#visitcircleelement)
- [visitIconElement](ElementSerializer.md#visiticonelement)
- [visitImageElement](ElementSerializer.md#visitimageelement)
- [visitRectElement](ElementSerializer.md#visitrectelement)
- [visitTextElement](ElementSerializer.md#visittextelement)
- [visitVideoElement](ElementSerializer.md#visitvideoelement)

## Constructors

### constructor

• **new ElementSerializer**(): [`ElementSerializer`](ElementSerializer.md)

#### Returns

[`ElementSerializer`](ElementSerializer.md)

## Methods

### serializeElement

▸ **serializeElement**(`element`): [`ElementJSON`](../modules.md#elementjson)

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`TrackElement`](TrackElement.md) |

#### Returns

[`ElementJSON`](../modules.md#elementjson)

#### Defined in

[packages/timeline/src/core/visitor/element-serializer.ts:14](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/visitor/element-serializer.ts#L14)

___

### visitAudioElement

▸ **visitAudioElement**(`element`): [`ElementJSON`](../modules.md#elementjson)

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`AudioElement`](AudioElement.md) |

#### Returns

[`ElementJSON`](../modules.md#elementjson)

#### Implementation of

[ElementVisitor](../interfaces/ElementVisitor.md).[visitAudioElement](../interfaces/ElementVisitor.md#visitaudioelement)

#### Defined in

[packages/timeline/src/core/visitor/element-serializer.ts:37](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/visitor/element-serializer.ts#L37)

___

### visitCaptionElement

▸ **visitCaptionElement**(`element`): [`ElementJSON`](../modules.md#elementjson)

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`CaptionElement`](CaptionElement.md) |

#### Returns

[`ElementJSON`](../modules.md#elementjson)

#### Implementation of

[ElementVisitor](../interfaces/ElementVisitor.md).[visitCaptionElement](../interfaces/ElementVisitor.md#visitcaptionelement)

#### Defined in

[packages/timeline/src/core/visitor/element-serializer.ts:61](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/visitor/element-serializer.ts#L61)

___

### visitCircleElement

▸ **visitCircleElement**(`element`): [`ElementJSON`](../modules.md#elementjson)

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`CircleElement`](CircleElement.md) |

#### Returns

[`ElementJSON`](../modules.md#elementjson)

#### Implementation of

[ElementVisitor](../interfaces/ElementVisitor.md).[visitCircleElement](../interfaces/ElementVisitor.md#visitcircleelement)

#### Defined in

[packages/timeline/src/core/visitor/element-serializer.ts:74](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/visitor/element-serializer.ts#L74)

___

### visitIconElement

▸ **visitIconElement**(`element`): [`ElementJSON`](../modules.md#elementjson)

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`IconElement`](IconElement.md) |

#### Returns

[`ElementJSON`](../modules.md#elementjson)

#### Implementation of

[ElementVisitor](../interfaces/ElementVisitor.md).[visitIconElement](../interfaces/ElementVisitor.md#visiticonelement)

#### Defined in

[packages/timeline/src/core/visitor/element-serializer.ts:68](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/visitor/element-serializer.ts#L68)

___

### visitImageElement

▸ **visitImageElement**(`element`): [`ElementJSON`](../modules.md#elementjson)

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`ImageElement`](ImageElement.md) |

#### Returns

[`ElementJSON`](../modules.md#elementjson)

#### Implementation of

[ElementVisitor](../interfaces/ElementVisitor.md).[visitImageElement](../interfaces/ElementVisitor.md#visitimageelement)

#### Defined in

[packages/timeline/src/core/visitor/element-serializer.ts:44](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/visitor/element-serializer.ts#L44)

___

### visitRectElement

▸ **visitRectElement**(`element`): [`ElementJSON`](../modules.md#elementjson)

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`RectElement`](RectElement.md) |

#### Returns

[`ElementJSON`](../modules.md#elementjson)

#### Implementation of

[ElementVisitor](../interfaces/ElementVisitor.md).[visitRectElement](../interfaces/ElementVisitor.md#visitrectelement)

#### Defined in

[packages/timeline/src/core/visitor/element-serializer.ts:80](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/visitor/element-serializer.ts#L80)

___

### visitTextElement

▸ **visitTextElement**(`element`): [`ElementJSON`](../modules.md#elementjson)

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`TextElement`](TextElement.md) |

#### Returns

[`ElementJSON`](../modules.md#elementjson)

#### Implementation of

[ElementVisitor](../interfaces/ElementVisitor.md).[visitTextElement](../interfaces/ElementVisitor.md#visittextelement)

#### Defined in

[packages/timeline/src/core/visitor/element-serializer.ts:54](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/visitor/element-serializer.ts#L54)

___

### visitVideoElement

▸ **visitVideoElement**(`element`): [`ElementJSON`](../modules.md#elementjson)

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`VideoElement`](VideoElement.md) |

#### Returns

[`ElementJSON`](../modules.md#elementjson)

#### Implementation of

[ElementVisitor](../interfaces/ElementVisitor.md).[visitVideoElement](../interfaces/ElementVisitor.md#visitvideoelement)

#### Defined in

[packages/timeline/src/core/visitor/element-serializer.ts:26](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/visitor/element-serializer.ts#L26)
