[@twick/timeline](../README.md) / [Exports](../modules.md) / ElementDeserializer

# Class: ElementDeserializer

## Table of contents

### Constructors

- [constructor](ElementDeserializer.md#constructor)

### Methods

- [deserializeAudioElement](ElementDeserializer.md#deserializeaudioelement)
- [deserializeBaseElement](ElementDeserializer.md#deserializebaseelement)
- [deserializeCaptionElement](ElementDeserializer.md#deserializecaptionelement)
- [deserializeCircleElement](ElementDeserializer.md#deserializecircleelement)
- [deserializeIconElement](ElementDeserializer.md#deserializeiconelement)
- [deserializeImageElement](ElementDeserializer.md#deserializeimageelement)
- [deserializeRectElement](ElementDeserializer.md#deserializerectelement)
- [deserializeTextElement](ElementDeserializer.md#deserializetextelement)
- [deserializeVideoElement](ElementDeserializer.md#deserializevideoelement)
- [fromJSON](ElementDeserializer.md#fromjson)

## Constructors

### constructor

• **new ElementDeserializer**(): [`ElementDeserializer`](ElementDeserializer.md)

#### Returns

[`ElementDeserializer`](ElementDeserializer.md)

## Methods

### deserializeAudioElement

▸ **deserializeAudioElement**(`json`): [`AudioElement`](AudioElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `json` | [`ElementJSON`](../modules.md#elementjson) |

#### Returns

[`AudioElement`](AudioElement.md)

#### Defined in

[packages/timeline/src/core/visitor/element-deserializer.ts:42](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/visitor/element-deserializer.ts#L42)

___

### deserializeBaseElement

▸ **deserializeBaseElement**(`element`, `json`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`TrackElement`](TrackElement.md) |
| `json` | [`ElementJSON`](../modules.md#elementjson) |

#### Returns

`void`

#### Defined in

[packages/timeline/src/core/visitor/element-deserializer.ts:16](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/visitor/element-deserializer.ts#L16)

___

### deserializeCaptionElement

▸ **deserializeCaptionElement**(`json`): [`CaptionElement`](CaptionElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `json` | [`ElementJSON`](../modules.md#elementjson) |

#### Returns

[`CaptionElement`](CaptionElement.md)

#### Defined in

[packages/timeline/src/core/visitor/element-deserializer.ts:76](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/visitor/element-deserializer.ts#L76)

___

### deserializeCircleElement

▸ **deserializeCircleElement**(`json`): [`CircleElement`](CircleElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `json` | [`ElementJSON`](../modules.md#elementjson) |

#### Returns

[`CircleElement`](CircleElement.md)

#### Defined in

[packages/timeline/src/core/visitor/element-deserializer.ts:101](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/visitor/element-deserializer.ts#L101)

___

### deserializeIconElement

▸ **deserializeIconElement**(`json`): [`IconElement`](IconElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `json` | [`ElementJSON`](../modules.md#elementjson) |

#### Returns

[`IconElement`](IconElement.md)

#### Defined in

[packages/timeline/src/core/visitor/element-deserializer.ts:87](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/visitor/element-deserializer.ts#L87)

___

### deserializeImageElement

▸ **deserializeImageElement**(`json`): [`ImageElement`](ImageElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `json` | [`ElementJSON`](../modules.md#elementjson) |

#### Returns

[`ImageElement`](ImageElement.md)

#### Defined in

[packages/timeline/src/core/visitor/element-deserializer.ts:51](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/visitor/element-deserializer.ts#L51)

___

### deserializeRectElement

▸ **deserializeRectElement**(`json`): [`RectElement`](RectElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `json` | [`ElementJSON`](../modules.md#elementjson) |

#### Returns

[`RectElement`](RectElement.md)

#### Defined in

[packages/timeline/src/core/visitor/element-deserializer.ts:111](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/visitor/element-deserializer.ts#L111)

___

### deserializeTextElement

▸ **deserializeTextElement**(`json`): [`TextElement`](TextElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `json` | [`ElementJSON`](../modules.md#elementjson) |

#### Returns

[`TextElement`](TextElement.md)

#### Defined in

[packages/timeline/src/core/visitor/element-deserializer.ts:67](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/visitor/element-deserializer.ts#L67)

___

### deserializeVideoElement

▸ **deserializeVideoElement**(`json`): [`VideoElement`](VideoElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `json` | [`ElementJSON`](../modules.md#elementjson) |

#### Returns

[`VideoElement`](VideoElement.md)

#### Defined in

[packages/timeline/src/core/visitor/element-deserializer.ts:25](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/visitor/element-deserializer.ts#L25)

___

### fromJSON

▸ **fromJSON**(`json`): ``null`` \| [`TrackElement`](TrackElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `json` | [`ElementJSON`](../modules.md#elementjson) |

#### Returns

``null`` \| [`TrackElement`](TrackElement.md)

#### Defined in

[packages/timeline/src/core/visitor/element-deserializer.ts:124](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/visitor/element-deserializer.ts#L124)
