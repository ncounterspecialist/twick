# Class: ElementAdder

ElementAdder visitor for adding elements to tracks.
Uses the visitor pattern to handle different element types
and implements the Friend Class Pattern for explicit access control.
Automatically calculates start and end times for elements based on
existing track content.

## Implements

- [`ElementVisitor`](../interfaces/ElementVisitor.md)\<`Promise`\<`boolean`\>\>

## Table of contents

### Constructors

- [constructor](ElementAdder.md#constructor)

### Methods

- [visitVideoElement](ElementAdder.md#visitvideoelement)
- [visitAudioElement](ElementAdder.md#visitaudioelement)
- [visitImageElement](ElementAdder.md#visitimageelement)
- [visitTextElement](ElementAdder.md#visittextelement)
- [visitCaptionElement](ElementAdder.md#visitcaptionelement)
- [visitIconElement](ElementAdder.md#visiticonelement)
- [visitCircleElement](ElementAdder.md#visitcircleelement)
- [visitRectElement](ElementAdder.md#visitrectelement)

## Constructors

### constructor

• **new ElementAdder**(`track`): [`ElementAdder`](ElementAdder.md)

Creates a new ElementAdder instance for the specified track.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `track` | [`Track`](Track.md) | The track to add elements to |

#### Returns

[`ElementAdder`](ElementAdder.md)

**`Example`**

```js
const adder = new ElementAdder(track);
const success = await adder.visitVideoElement(videoElement);
```

#### Defined in

[core/visitor/element-adder.ts:35](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/visitor/element-adder.ts#L35)

## Methods

### visitVideoElement

▸ **visitVideoElement**(`element`): `Promise`\<`boolean`\>

Adds a video element to the track.
Updates video metadata and calculates appropriate start/end times
based on existing track elements.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `element` | [`VideoElement`](VideoElement.md) | The video element to add |

#### Returns

`Promise`\<`boolean`\>

Promise resolving to true if element was added successfully

**`Example`**

```js
const success = await adder.visitVideoElement(videoElement);
// success = true if element was added successfully
```

#### Implementation of

[ElementVisitor](../interfaces/ElementVisitor.md).[visitVideoElement](../interfaces/ElementVisitor.md#visitvideoelement)

#### Defined in

[core/visitor/element-adder.ts:54](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/visitor/element-adder.ts#L54)

___

### visitAudioElement

▸ **visitAudioElement**(`element`): `Promise`\<`boolean`\>

Adds an audio element to the track.
Updates audio metadata and calculates appropriate start/end times
based on existing track elements.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `element` | [`AudioElement`](AudioElement.md) | The audio element to add |

#### Returns

`Promise`\<`boolean`\>

Promise resolving to true if element was added successfully

**`Example`**

```js
const success = await adder.visitAudioElement(audioElement);
// success = true if element was added successfully
```

#### Implementation of

[ElementVisitor](../interfaces/ElementVisitor.md).[visitAudioElement](../interfaces/ElementVisitor.md#visitaudioelement)

#### Defined in

[core/visitor/element-adder.ts:84](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/visitor/element-adder.ts#L84)

___

### visitImageElement

▸ **visitImageElement**(`element`): `Promise`\<`boolean`\>

Adds an image element to the track.
Updates image metadata and calculates appropriate start/end times
based on existing track elements.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `element` | [`ImageElement`](ImageElement.md) | The image element to add |

#### Returns

`Promise`\<`boolean`\>

Promise resolving to true if element was added successfully

**`Example`**

```js
const success = await adder.visitImageElement(imageElement);
// success = true if element was added successfully
```

#### Implementation of

[ElementVisitor](../interfaces/ElementVisitor.md).[visitImageElement](../interfaces/ElementVisitor.md#visitimageelement)

#### Defined in

[core/visitor/element-adder.ts:114](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/visitor/element-adder.ts#L114)

___

### visitTextElement

▸ **visitTextElement**(`element`): `Promise`\<`boolean`\>

Adds a text element to the track.
Calculates appropriate start/end times based on existing track elements.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `element` | [`TextElement`](TextElement.md) | The text element to add |

#### Returns

`Promise`\<`boolean`\>

Promise resolving to true if element was added successfully

**`Example`**

```js
const success = await adder.visitTextElement(textElement);
// success = true if element was added successfully
```

#### Implementation of

[ElementVisitor](../interfaces/ElementVisitor.md).[visitTextElement](../interfaces/ElementVisitor.md#visittextelement)

#### Defined in

[core/visitor/element-adder.ts:143](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/visitor/element-adder.ts#L143)

___

### visitCaptionElement

▸ **visitCaptionElement**(`element`): `Promise`\<`boolean`\>

Adds a caption element to the track.
Calculates appropriate start/end times based on existing track elements.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `element` | [`CaptionElement`](CaptionElement.md) | The caption element to add |

#### Returns

`Promise`\<`boolean`\>

Promise resolving to true if element was added successfully

**`Example`**

```js
const success = await adder.visitCaptionElement(captionElement);
// success = true if element was added successfully
```

#### Implementation of

[ElementVisitor](../interfaces/ElementVisitor.md).[visitCaptionElement](../interfaces/ElementVisitor.md#visitcaptionelement)

#### Defined in

[core/visitor/element-adder.ts:171](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/visitor/element-adder.ts#L171)

___

### visitIconElement

▸ **visitIconElement**(`element`): `Promise`\<`boolean`\>

Adds an icon element to the track.
Calculates appropriate start/end times based on existing track elements.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `element` | [`IconElement`](IconElement.md) | The icon element to add |

#### Returns

`Promise`\<`boolean`\>

Promise resolving to true if element was added successfully

**`Example`**

```js
const success = await adder.visitIconElement(iconElement);
// success = true if element was added successfully
```

#### Implementation of

[ElementVisitor](../interfaces/ElementVisitor.md).[visitIconElement](../interfaces/ElementVisitor.md#visiticonelement)

#### Defined in

[core/visitor/element-adder.ts:199](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/visitor/element-adder.ts#L199)

___

### visitCircleElement

▸ **visitCircleElement**(`element`): `Promise`\<`boolean`\>

Adds a circle element to the track.
Calculates appropriate start/end times based on existing track elements.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `element` | [`CircleElement`](CircleElement.md) | The circle element to add |

#### Returns

`Promise`\<`boolean`\>

Promise resolving to true if element was added successfully

**`Example`**

```js
const success = await adder.visitCircleElement(circleElement);
// success = true if element was added successfully
```

#### Implementation of

[ElementVisitor](../interfaces/ElementVisitor.md).[visitCircleElement](../interfaces/ElementVisitor.md#visitcircleelement)

#### Defined in

[core/visitor/element-adder.ts:227](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/visitor/element-adder.ts#L227)

___

### visitRectElement

▸ **visitRectElement**(`element`): `Promise`\<`boolean`\>

Adds a rectangle element to the track.
Calculates appropriate start/end times based on existing track elements.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `element` | [`RectElement`](RectElement.md) | The rectangle element to add |

#### Returns

`Promise`\<`boolean`\>

Promise resolving to true if element was added successfully

**`Example`**

```js
const success = await adder.visitRectElement(rectElement);
// success = true if element was added successfully
```

#### Implementation of

[ElementVisitor](../interfaces/ElementVisitor.md).[visitRectElement](../interfaces/ElementVisitor.md#visitrectelement)

#### Defined in

[core/visitor/element-adder.ts:255](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/timeline/src/core/visitor/element-adder.ts#L255)
