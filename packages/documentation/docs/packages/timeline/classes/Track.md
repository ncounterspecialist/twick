# Class: Track

Track class represents a timeline track that contains multiple elements.
A track is a container for timeline elements (video, audio, text, etc.) that
can be arranged sequentially or in parallel. Tracks provide validation,
serialization, and element management capabilities.

**`Example`**

```js
import { Track, VideoElement, TextElement } from '@twick/timeline';

// Create a new track
const videoTrack = new Track("Video Track");

// Add elements to the track
const videoElement = new VideoElement({
  src: "video.mp4",
  start: 0,
  end: 10
});

videoTrack.createFriend().addElement(videoElement);

// Serialize the track
const trackData = videoTrack.serialize();
```

## Table of contents

### Constructors

- [constructor](Track.md#constructor)

### Methods

- [createFriend](Track.md#createfriend)
- [addElementViaFriend](Track.md#addelementviafriend)
- [removeElementViaFriend](Track.md#removeelementviafriend)
- [updateElementViaFriend](Track.md#updateelementviafriend)
- [getId](Track.md#getid)
- [getName](Track.md#getname)
- [getType](Track.md#gettype)
- [getElements](Track.md#getelements)
- [getProps](Track.md#getprops)
- [setProps](Track.md#setprops)
- [validateElement](Track.md#validateelement)
- [getTrackDuration](Track.md#gettrackduration)
- [isElementColliding](Track.md#iselementcolliding)
- [getElementById](Track.md#getelementbyid)
- [validateAllElements](Track.md#validateallelements)
- [serialize](Track.md#serialize)
- [fromJSON](Track.md#fromjson)

## Constructors

### constructor

• **new Track**(`name`, `type?`, `id?`): [`Track`](Track.md)

Creates a new Track instance.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `name` | `string` | `undefined` | The display name for the track |
| `type` | `string` | `"element"` | The type of the track |
| `id?` | `string` | `undefined` | Optional unique identifier (auto-generated if not provided) |

#### Returns

[`Track`](Track.md)

**`Example`**

```js
const track = new Track("My Video Track");
const trackWithId = new Track("Audio Track", "element", "video-track-1");
```

#### Defined in

[core/track/track.ts:59](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/track/track.ts#L59)

## Methods

### createFriend

▸ **createFriend**(): `TrackFriend`

Creates a friend instance for explicit access to protected methods.
This implements the Friend Class Pattern to allow controlled access
to protected methods while maintaining encapsulation.

#### Returns

`TrackFriend`

TrackFriend instance that can access protected methods

**`Example`**

```js
const track = new Track("My Track");
const friend = track.createFriend();

// Use friend to add elements
const element = new VideoElement({ src: "video.mp4", start: 0, end: 10 });
friend.addElement(element);
```

#### Defined in

[core/track/track.ts:85](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/track/track.ts#L85)

___

### addElementViaFriend

▸ **addElementViaFriend**(`element`, `skipValidation?`): `boolean`

Friend method to add element (called by TrackFriend).
Provides controlled access to the protected addElement method.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `element` | [`TrackElement`](TrackElement.md) | `undefined` | The element to add to the track |
| `skipValidation` | `boolean` | `false` | If true, skips validation (use with caution) |

#### Returns

`boolean`

true if element was added successfully

**`Example`**

```js
const track = new Track("My Track");
const friend = track.createFriend();
const element = new VideoElement({ src: "video.mp4", start: 0, end: 10 });

const success = track.addElementViaFriend(element);
// success = true if element was added successfully
```

#### Defined in

[core/track/track.ts:107](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/track/track.ts#L107)

___

### removeElementViaFriend

▸ **removeElementViaFriend**(`element`): `void`

Friend method to remove element (called by TrackFriend).
Provides controlled access to the protected removeElement method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `element` | [`TrackElement`](TrackElement.md) | The element to remove from the track |

#### Returns

`void`

**`Example`**

```js
const track = new Track("My Track");
const element = new VideoElement({ src: "video.mp4", start: 0, end: 10 });

track.removeElementViaFriend(element);
// Element is removed from the track
```

#### Defined in

[core/track/track.ts:129](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/track/track.ts#L129)

___

### updateElementViaFriend

▸ **updateElementViaFriend**(`element`): `boolean`

Friend method to update element (called by TrackFriend).
Provides controlled access to the protected updateElement method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `element` | [`TrackElement`](TrackElement.md) | The updated element to replace the existing one |

#### Returns

`boolean`

true if element was updated successfully

**`Example`**

```js
const track = new Track("My Track");
const element = new VideoElement({ src: "video.mp4", start: 0, end: 10 });

// Update the element
element.setEnd(15);
const success = track.updateElementViaFriend(element);
// success = true if element was updated successfully
```

#### Defined in

[core/track/track.ts:151](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/track/track.ts#L151)

___

### getId

▸ **getId**(): `string`

Gets the unique identifier of the track.

#### Returns

`string`

The track's unique ID string

**`Example`**

```js
const track = new Track("My Track", "element", "track-123");
const id = track.getId(); // "track-123"
```

#### Defined in

[core/track/track.ts:166](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/track/track.ts#L166)

___

### getName

▸ **getName**(): `string`

Gets the display name of the track.

#### Returns

`string`

The track's display name

**`Example`**

```js
const track = new Track("Video Track");
const name = track.getName(); // "Video Track"
```

#### Defined in

[core/track/track.ts:181](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/track/track.ts#L181)

___

### getType

▸ **getType**(): `string`

Gets the type of the track.

#### Returns

`string`

The track's type string

**`Example`**

```js
const track = new Track("My Track");
const type = track.getType(); // "element"
```

#### Defined in

[core/track/track.ts:196](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/track/track.ts#L196)

___

### getElements

▸ **getElements**(): readonly [`TrackElement`](TrackElement.md)[]

Gets a read-only array of all elements in the track.
Returns a copy of the elements array to prevent external modification.

#### Returns

readonly [`TrackElement`](TrackElement.md)[]

Read-only array of track elements

**`Example`**

```js
const track = new Track("My Track");
const elements = track.getElements();
// elements is a read-only array of TrackElement instances

elements.forEach(element => {
  console.log(`Element: ${element.getId()}, Duration: ${element.getEnd() - element.getStart()}`);
});
```

#### Defined in

[core/track/track.ts:217](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/track/track.ts#L217)

___

### getProps

▸ **getProps**(): `Record`\<`string`, `any`\>

#### Returns

`Record`\<`string`, `any`\>

#### Defined in

[core/track/track.ts:221](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/track/track.ts#L221)

___

### setProps

▸ **setProps**(`props`): [`Track`](Track.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `Record`\<`string`, `any`\> |

#### Returns

[`Track`](Track.md)

#### Defined in

[core/track/track.ts:225](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/track/track.ts#L225)

___

### validateElement

▸ **validateElement**(`element`): `boolean`

Validates a single element using the track's validator.
Checks if the element meets all validation requirements.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `element` | [`TrackElement`](TrackElement.md) | The element to validate |

#### Returns

`boolean`

true if valid, throws ValidationError if invalid

**`Example`**

```js
const track = new Track("My Track");
const element = new VideoElement({ src: "video.mp4", start: 0, end: 10 });

try {
  const isValid = track.validateElement(element);
  console.log('Element is valid:', isValid);
} catch (error) {
  if (error instanceof ValidationError) {
    console.log('Validation failed:', error.errors);
  }
}
```

#### Defined in

[core/track/track.ts:252](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/track/track.ts#L252)

___

### getTrackDuration

▸ **getTrackDuration**(): `number`

Gets the total duration of the track.
Calculates the duration based on the end time of the last element.

#### Returns

`number`

The total duration of the track in seconds

**`Example`**

```js
const track = new Track("My Track");
const duration = track.getTrackDuration(); // 0 if no elements

// After adding elements
const element = new VideoElement({ src: "video.mp4", start: 0, end: 30 });
track.createFriend().addElement(element);
const newDuration = track.getTrackDuration(); // 30
```

#### Defined in

[core/track/track.ts:273](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/track/track.ts#L273)

___

### isElementColliding

▸ **isElementColliding**(`element`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`TrackElement`](TrackElement.md) |

#### Returns

`boolean`

#### Defined in

[core/track/track.ts:323](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/track/track.ts#L323)

___

### getElementById

▸ **getElementById**(`id`): `undefined` \| `Readonly`\<[`TrackElement`](TrackElement.md)\>

Finds an element in the track by its ID.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The unique identifier of the element to find |

#### Returns

`undefined` \| `Readonly`\<[`TrackElement`](TrackElement.md)\>

The found element or undefined if not found

**`Example`**

```js
const track = new Track("My Track");
const element = new VideoElement({ src: "video.mp4", start: 0, end: 10 });
track.createFriend().addElement(element);

const foundElement = track.getElementById(element.getId());
// foundElement is the same element instance
```

#### Defined in

[core/track/track.ts:406](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/track/track.ts#L406)

___

### validateAllElements

▸ **validateAllElements**(): `Object`

Validates all elements in the track and returns combined result and per-element status.
Provides detailed validation information for each element including errors and warnings.

#### Returns

`Object`

Object with overall isValid and array of per-element validation results

| Name | Type |
| :------ | :------ |
| `isValid` | `boolean` |
| `results` | \{ `element`: [`TrackElement`](TrackElement.md) ; `isValid`: `boolean` ; `errors?`: `string`[] ; `warnings?`: `string`[]  }[] |

**`Example`**

```js
const track = new Track("My Track");
const element1 = new VideoElement({ src: "video.mp4", start: 0, end: 10 });
const element2 = new TextElement({ text: "Hello", start: 5, end: 15 });

track.createFriend().addElement(element1);
track.createFriend().addElement(element2);

const validation = track.validateAllElements();
console.log('Overall valid:', validation.isValid);

validation.results.forEach(result => {
  console.log(`Element ${result.element.getId()}: ${result.isValid ? 'Valid' : 'Invalid'}`);
  if (result.errors) {
    console.log('Errors:', result.errors);
  }
  if (result.warnings) {
    console.log('Warnings:', result.warnings);
  }
});
```

#### Defined in

[core/track/track.ts:441](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/track/track.ts#L441)

___

### serialize

▸ **serialize**(): [`TrackJSON`](../interfaces/TrackJSON.md)

Serializes the track and all its elements to JSON format.
Converts the track structure to a format that can be stored or transmitted.

#### Returns

[`TrackJSON`](../interfaces/TrackJSON.md)

TrackJSON object representing the track and its elements

**`Example`**

```js
const track = new Track("My Track");
const element = new VideoElement({ src: "video.mp4", start: 0, end: 10 });
track.createFriend().addElement(element);

const trackData = track.serialize();
// trackData = {
//   id: "t-abc123",
//   name: "My Track",
//   type: "element",
//   elements: [{ ... }]
// }

// Save to localStorage
localStorage.setItem('track-data', JSON.stringify(trackData));
```

#### Defined in

[core/track/track.ts:502](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/track/track.ts#L502)

___

### fromJSON

▸ **fromJSON**(`json`): [`Track`](Track.md)

Creates a Track instance from JSON data.
Static factory method for deserializing track data.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `json` | `any` | JSON object containing track data |

#### Returns

[`Track`](Track.md)

New Track instance with loaded data

**`Example`**

```js
const trackData = {
  id: "t-abc123",
  name: "My Track",
  type: "element",
  elements: [
    {
      id: "e-def456",
      type: "video",
      src: "video.mp4",
      start: 0,
      end: 10
    }
  ]
};

const track = Track.fromJSON(trackData);
console.log(track.getName()); // "My Track"
console.log(track.getElements().length); // 1
```

#### Defined in

[core/track/track.ts:544](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/track/track.ts#L544)
