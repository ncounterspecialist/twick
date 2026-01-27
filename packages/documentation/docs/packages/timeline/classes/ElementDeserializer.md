# Class: ElementDeserializer

## Table of contents

### Constructors

- [constructor](ElementDeserializer.md#constructor)

### Methods

- [deserializeVideoElement](ElementDeserializer.md#deserializevideoelement)
- [deserializeAudioElement](ElementDeserializer.md#deserializeaudioelement)
- [deserializeImageElement](ElementDeserializer.md#deserializeimageelement)
- [deserializeTextElement](ElementDeserializer.md#deserializetextelement)
- [deserializeCaptionElement](ElementDeserializer.md#deserializecaptionelement)
- [deserializeIconElement](ElementDeserializer.md#deserializeiconelement)
- [deserializeCircleElement](ElementDeserializer.md#deserializecircleelement)
- [deserializeRectElement](ElementDeserializer.md#deserializerectelement)
- [fromJSON](ElementDeserializer.md#fromjson)

## Constructors

### constructor

• **new ElementDeserializer**(): [`ElementDeserializer`](ElementDeserializer.md)

#### Returns

[`ElementDeserializer`](ElementDeserializer.md)

## Methods

### deserializeVideoElement

▸ **deserializeVideoElement**(`json`): [`VideoElement`](VideoElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `json` | [`ElementJSON`](../interfaces/ElementJSON.md) |

#### Returns

[`VideoElement`](VideoElement.md)

#### Defined in

[core/visitor/element-deserializer.ts:26](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/visitor/element-deserializer.ts#L26)

___

### deserializeAudioElement

▸ **deserializeAudioElement**(`json`): [`AudioElement`](AudioElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `json` | [`ElementJSON`](../interfaces/ElementJSON.md) |

#### Returns

[`AudioElement`](AudioElement.md)

#### Defined in

[core/visitor/element-deserializer.ts:43](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/visitor/element-deserializer.ts#L43)

___

### deserializeImageElement

▸ **deserializeImageElement**(`json`): [`ImageElement`](ImageElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `json` | [`ElementJSON`](../interfaces/ElementJSON.md) |

#### Returns

[`ImageElement`](ImageElement.md)

#### Defined in

[core/visitor/element-deserializer.ts:52](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/visitor/element-deserializer.ts#L52)

___

### deserializeTextElement

▸ **deserializeTextElement**(`json`): [`TextElement`](TextElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `json` | [`ElementJSON`](../interfaces/ElementJSON.md) |

#### Returns

[`TextElement`](TextElement.md)

#### Defined in

[core/visitor/element-deserializer.ts:68](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/visitor/element-deserializer.ts#L68)

___

### deserializeCaptionElement

▸ **deserializeCaptionElement**(`json`): [`CaptionElement`](CaptionElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `json` | [`ElementJSON`](../interfaces/ElementJSON.md) |

#### Returns

[`CaptionElement`](CaptionElement.md)

#### Defined in

[core/visitor/element-deserializer.ts:77](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/visitor/element-deserializer.ts#L77)

___

### deserializeIconElement

▸ **deserializeIconElement**(`json`): [`IconElement`](IconElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `json` | [`ElementJSON`](../interfaces/ElementJSON.md) |

#### Returns

[`IconElement`](IconElement.md)

#### Defined in

[core/visitor/element-deserializer.ts:88](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/visitor/element-deserializer.ts#L88)

___

### deserializeCircleElement

▸ **deserializeCircleElement**(`json`): [`CircleElement`](CircleElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `json` | [`ElementJSON`](../interfaces/ElementJSON.md) |

#### Returns

[`CircleElement`](CircleElement.md)

#### Defined in

[core/visitor/element-deserializer.ts:101](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/visitor/element-deserializer.ts#L101)

___

### deserializeRectElement

▸ **deserializeRectElement**(`json`): [`RectElement`](RectElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `json` | [`ElementJSON`](../interfaces/ElementJSON.md) |

#### Returns

[`RectElement`](RectElement.md)

#### Defined in

[core/visitor/element-deserializer.ts:111](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/visitor/element-deserializer.ts#L111)

___

### fromJSON

▸ **fromJSON**(`json`): ``null`` \| [`TrackElement`](TrackElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `json` | [`ElementJSON`](../interfaces/ElementJSON.md) |

#### Returns

``null`` \| [`TrackElement`](TrackElement.md)

#### Defined in

[core/visitor/element-deserializer.ts:124](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/visitor/element-deserializer.ts#L124)
