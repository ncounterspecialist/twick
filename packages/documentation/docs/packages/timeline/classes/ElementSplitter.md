[@twick/timeline](../README.md) / [Exports](../modules.md) / ElementSplitter

# Class: ElementSplitter

## Implements

- [`ElementVisitor`](../interfaces/ElementVisitor.md)\<[`SplitResult`](../interfaces/SplitResult.md)\>

## Table of contents

### Constructors

- [constructor](ElementSplitter.md#constructor)

### Properties

- [elementCloner](ElementSplitter.md#elementcloner)
- [splitTime](ElementSplitter.md#splittime)

### Methods

- [visitAudioElement](ElementSplitter.md#visitaudioelement)
- [visitCaptionElement](ElementSplitter.md#visitcaptionelement)
- [visitCircleElement](ElementSplitter.md#visitcircleelement)
- [visitIconElement](ElementSplitter.md#visiticonelement)
- [visitImageElement](ElementSplitter.md#visitimageelement)
- [visitRectElement](ElementSplitter.md#visitrectelement)
- [visitTextElement](ElementSplitter.md#visittextelement)
- [visitVideoElement](ElementSplitter.md#visitvideoelement)

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

[packages/timeline/src/core/visitor/element-splitter.ts:22](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/visitor/element-splitter.ts#L22)

## Properties

### elementCloner

• `Private` **elementCloner**: [`ElementCloner`](ElementCloner.md)

#### Defined in

[packages/timeline/src/core/visitor/element-splitter.ts:21](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/visitor/element-splitter.ts#L21)

___

### splitTime

• `Private` **splitTime**: `number`

#### Defined in

[packages/timeline/src/core/visitor/element-splitter.ts:20](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/visitor/element-splitter.ts#L20)

## Methods

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

[packages/timeline/src/core/visitor/element-splitter.ts:49](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/visitor/element-splitter.ts#L49)

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

[packages/timeline/src/core/visitor/element-splitter.ts:117](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/visitor/element-splitter.ts#L117)

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

[packages/timeline/src/core/visitor/element-splitter.ts:164](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/visitor/element-splitter.ts#L164)

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

[packages/timeline/src/core/visitor/element-splitter.ts:175](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/visitor/element-splitter.ts#L175)

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

[packages/timeline/src/core/visitor/element-splitter.ts:70](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/visitor/element-splitter.ts#L70)

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

[packages/timeline/src/core/visitor/element-splitter.ts:149](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/visitor/element-splitter.ts#L149)

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

[packages/timeline/src/core/visitor/element-splitter.ts:85](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/visitor/element-splitter.ts#L85)

___

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

[packages/timeline/src/core/visitor/element-splitter.ts:27](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/visitor/element-splitter.ts#L27)
