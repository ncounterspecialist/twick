# Class: ElementSplitter

## Implements

- [`ElementVisitor`](../interfaces/ElementVisitor.md)\<[`SplitResult`](../interfaces/SplitResult.md)\>

## Table of contents

### Constructors

- [constructor](ElementSplitter.md#constructor)

### Methods

- [visitVideoElement](ElementSplitter.md#visitvideoelement)
- [visitAudioElement](ElementSplitter.md#visitaudioelement)
- [visitImageElement](ElementSplitter.md#visitimageelement)
- [visitTextElement](ElementSplitter.md#visittextelement)
- [visitCaptionElement](ElementSplitter.md#visitcaptionelement)
- [visitRectElement](ElementSplitter.md#visitrectelement)
- [visitCircleElement](ElementSplitter.md#visitcircleelement)
- [visitIconElement](ElementSplitter.md#visiticonelement)

## Constructors

### constructor

• **new ElementSplitter**(`splitTime`): [`ElementSplitter`](ElementSplitter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `splitTime` | `number` |

#### Returns

[`ElementSplitter`](ElementSplitter.md)

#### Defined in

[core/visitor/element-splitter.ts:22](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/visitor/element-splitter.ts#L22)

## Methods

### visitVideoElement

▸ **visitVideoElement**(`element`): [`SplitResult`](../interfaces/SplitResult.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`VideoElement`](VideoElement.md) |

#### Returns

[`SplitResult`](../interfaces/SplitResult.md)

#### Implementation of

[ElementVisitor](../interfaces/ElementVisitor.md).[visitVideoElement](../interfaces/ElementVisitor.md#visitvideoelement)

#### Defined in

[core/visitor/element-splitter.ts:27](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/visitor/element-splitter.ts#L27)

___

### visitAudioElement

▸ **visitAudioElement**(`element`): [`SplitResult`](../interfaces/SplitResult.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`AudioElement`](AudioElement.md) |

#### Returns

[`SplitResult`](../interfaces/SplitResult.md)

#### Implementation of

[ElementVisitor](../interfaces/ElementVisitor.md).[visitAudioElement](../interfaces/ElementVisitor.md#visitaudioelement)

#### Defined in

[core/visitor/element-splitter.ts:49](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/visitor/element-splitter.ts#L49)

___

### visitImageElement

▸ **visitImageElement**(`element`): [`SplitResult`](../interfaces/SplitResult.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`ImageElement`](ImageElement.md) |

#### Returns

[`SplitResult`](../interfaces/SplitResult.md)

#### Implementation of

[ElementVisitor](../interfaces/ElementVisitor.md).[visitImageElement](../interfaces/ElementVisitor.md#visitimageelement)

#### Defined in

[core/visitor/element-splitter.ts:70](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/visitor/element-splitter.ts#L70)

___

### visitTextElement

▸ **visitTextElement**(`element`): [`SplitResult`](../interfaces/SplitResult.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`TextElement`](TextElement.md) |

#### Returns

[`SplitResult`](../interfaces/SplitResult.md)

#### Implementation of

[ElementVisitor](../interfaces/ElementVisitor.md).[visitTextElement](../interfaces/ElementVisitor.md#visittextelement)

#### Defined in

[core/visitor/element-splitter.ts:85](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/visitor/element-splitter.ts#L85)

___

### visitCaptionElement

▸ **visitCaptionElement**(`element`): [`SplitResult`](../interfaces/SplitResult.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`CaptionElement`](CaptionElement.md) |

#### Returns

[`SplitResult`](../interfaces/SplitResult.md)

#### Implementation of

[ElementVisitor](../interfaces/ElementVisitor.md).[visitCaptionElement](../interfaces/ElementVisitor.md#visitcaptionelement)

#### Defined in

[core/visitor/element-splitter.ts:117](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/visitor/element-splitter.ts#L117)

___

### visitRectElement

▸ **visitRectElement**(`element`): [`SplitResult`](../interfaces/SplitResult.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`RectElement`](RectElement.md) |

#### Returns

[`SplitResult`](../interfaces/SplitResult.md)

#### Implementation of

[ElementVisitor](../interfaces/ElementVisitor.md).[visitRectElement](../interfaces/ElementVisitor.md#visitrectelement)

#### Defined in

[core/visitor/element-splitter.ts:149](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/visitor/element-splitter.ts#L149)

___

### visitCircleElement

▸ **visitCircleElement**(`element`): [`SplitResult`](../interfaces/SplitResult.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`CircleElement`](CircleElement.md) |

#### Returns

[`SplitResult`](../interfaces/SplitResult.md)

#### Implementation of

[ElementVisitor](../interfaces/ElementVisitor.md).[visitCircleElement](../interfaces/ElementVisitor.md#visitcircleelement)

#### Defined in

[core/visitor/element-splitter.ts:164](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/visitor/element-splitter.ts#L164)

___

### visitIconElement

▸ **visitIconElement**(`element`): [`SplitResult`](../interfaces/SplitResult.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`IconElement`](IconElement.md) |

#### Returns

[`SplitResult`](../interfaces/SplitResult.md)

#### Implementation of

[ElementVisitor](../interfaces/ElementVisitor.md).[visitIconElement](../interfaces/ElementVisitor.md#visiticonelement)

#### Defined in

[core/visitor/element-splitter.ts:175](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/visitor/element-splitter.ts#L175)
