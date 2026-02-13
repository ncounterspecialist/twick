# Interface: ElementVisitor\<T\>

## Type parameters

| Name |
| :------ |
| `T` |

## Implemented by

- [`ElementAdder`](../classes/ElementAdder.md)
- [`ElementCloner`](../classes/ElementCloner.md)
- [`ElementRemover`](../classes/ElementRemover.md)
- [`ElementSerializer`](../classes/ElementSerializer.md)
- [`ElementSplitter`](../classes/ElementSplitter.md)
- [`ElementUpdater`](../classes/ElementUpdater.md)
- [`ElementValidator`](../classes/ElementValidator.md)

## Table of contents

### Methods

- [visitVideoElement](ElementVisitor.md#visitvideoelement)
- [visitAudioElement](ElementVisitor.md#visitaudioelement)
- [visitImageElement](ElementVisitor.md#visitimageelement)
- [visitTextElement](ElementVisitor.md#visittextelement)
- [visitCaptionElement](ElementVisitor.md#visitcaptionelement)
- [visitIconElement](ElementVisitor.md#visiticonelement)
- [visitCircleElement](ElementVisitor.md#visitcircleelement)
- [visitRectElement](ElementVisitor.md#visitrectelement)

## Methods

### visitVideoElement

▸ **visitVideoElement**(`element`): `T`

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`VideoElement`](../classes/VideoElement.md) |

#### Returns

`T`

#### Defined in

[core/visitor/element-visitor.ts:11](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/visitor/element-visitor.ts#L11)

___

### visitAudioElement

▸ **visitAudioElement**(`element`): `T`

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`AudioElement`](../classes/AudioElement.md) |

#### Returns

`T`

#### Defined in

[core/visitor/element-visitor.ts:12](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/visitor/element-visitor.ts#L12)

___

### visitImageElement

▸ **visitImageElement**(`element`): `T`

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`ImageElement`](../classes/ImageElement.md) |

#### Returns

`T`

#### Defined in

[core/visitor/element-visitor.ts:13](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/visitor/element-visitor.ts#L13)

___

### visitTextElement

▸ **visitTextElement**(`element`): `T`

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`TextElement`](../classes/TextElement.md) |

#### Returns

`T`

#### Defined in

[core/visitor/element-visitor.ts:14](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/visitor/element-visitor.ts#L14)

___

### visitCaptionElement

▸ **visitCaptionElement**(`element`): `T`

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`CaptionElement`](../classes/CaptionElement.md) |

#### Returns

`T`

#### Defined in

[core/visitor/element-visitor.ts:15](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/visitor/element-visitor.ts#L15)

___

### visitIconElement

▸ **visitIconElement**(`element`): `T`

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`IconElement`](../classes/IconElement.md) |

#### Returns

`T`

#### Defined in

[core/visitor/element-visitor.ts:16](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/visitor/element-visitor.ts#L16)

___

### visitCircleElement

▸ **visitCircleElement**(`element`): `T`

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`CircleElement`](../classes/CircleElement.md) |

#### Returns

`T`

#### Defined in

[core/visitor/element-visitor.ts:17](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/visitor/element-visitor.ts#L17)

___

### visitRectElement

▸ **visitRectElement**(`element`): `T`

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`RectElement`](../classes/RectElement.md) |

#### Returns

`T`

#### Defined in

[core/visitor/element-visitor.ts:18](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/visitor/element-visitor.ts#L18)
