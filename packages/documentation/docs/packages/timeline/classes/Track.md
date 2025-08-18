[@twick/timeline](../README.md) / [Exports](../modules.md) / Track

# Class: Track

## Table of contents

### Constructors

- [constructor](Track.md#constructor)

### Properties

- [elements](Track.md#elements)
- [id](Track.md#id)
- [name](Track.md#name)
- [type](Track.md#type)
- [validator](Track.md#validator)

### Methods

- [addElement](Track.md#addelement)
- [addElementViaFriend](Track.md#addelementviafriend)
- [createFriend](Track.md#createfriend)
- [getElementById](Track.md#getelementbyid)
- [getElements](Track.md#getelements)
- [getId](Track.md#getid)
- [getName](Track.md#getname)
- [getTrackDuration](Track.md#gettrackduration)
- [getType](Track.md#gettype)
- [removeElement](Track.md#removeelement)
- [removeElementViaFriend](Track.md#removeelementviafriend)
- [serialize](Track.md#serialize)
- [updateElement](Track.md#updateelement)
- [updateElementViaFriend](Track.md#updateelementviafriend)
- [validateAllElements](Track.md#validateallelements)
- [validateElement](Track.md#validateelement)
- [fromJSON](Track.md#fromjson)

## Constructors

### constructor

• **new Track**(`name`, `id?`): [`Track`](Track.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `id?` | `string` |

#### Returns

[`Track`](Track.md)

#### Defined in

[packages/timeline/src/core/track/track.ts:19](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/track/track.ts#L19)

## Properties

### elements

• `Private` **elements**: [`TrackElement`](TrackElement.md)[]

#### Defined in

[packages/timeline/src/core/track/track.ts:16](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/track/track.ts#L16)

___

### id

• `Private` **id**: `string`

#### Defined in

[packages/timeline/src/core/track/track.ts:13](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/track/track.ts#L13)

___

### name

• `Private` **name**: `string`

#### Defined in

[packages/timeline/src/core/track/track.ts:14](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/track/track.ts#L14)

___

### type

• `Private` **type**: `string`

#### Defined in

[packages/timeline/src/core/track/track.ts:15](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/track/track.ts#L15)

___

### validator

• `Private` **validator**: [`ElementValidator`](ElementValidator.md)

#### Defined in

[packages/timeline/src/core/track/track.ts:17](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/track/track.ts#L17)

## Methods

### addElement

▸ **addElement**(`element`, `skipValidation?`): `boolean`

Adds an element to the track with validation

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `element` | [`TrackElement`](TrackElement.md) | `undefined` | The element to add |
| `skipValidation` | `boolean` | `false` | If true, skips validation (use with caution) |

#### Returns

`boolean`

true if element was added successfully, throws ValidationError if validation fails

#### Defined in

[packages/timeline/src/core/track/track.ts:103](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/track/track.ts#L103)

___

### addElementViaFriend

▸ **addElementViaFriend**(`element`, `skipValidation?`): `boolean`

Friend method to add element (called by TrackFriend)

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `element` | [`TrackElement`](TrackElement.md) | `undefined` | The element to add |
| `skipValidation` | `boolean` | `false` | If true, skips validation |

#### Returns

`boolean`

true if element was added successfully

#### Defined in

[packages/timeline/src/core/track/track.ts:42](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/track/track.ts#L42)

___

### createFriend

▸ **createFriend**(): `TrackFriend`

Create a friend instance for explicit access to protected methods
This implements the Friend Class Pattern

#### Returns

`TrackFriend`

TrackFriend instance

#### Defined in

[packages/timeline/src/core/track/track.ts:32](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/track/track.ts#L32)

___

### getElementById

▸ **getElementById**(`id`): `undefined` \| `Readonly`\<[`TrackElement`](TrackElement.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`undefined` \| `Readonly`\<[`TrackElement`](TrackElement.md)\>

#### Defined in

[packages/timeline/src/core/track/track.ts:163](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/track/track.ts#L163)

___

### getElements

▸ **getElements**(): readonly [`TrackElement`](TrackElement.md)[]

#### Returns

readonly [`TrackElement`](TrackElement.md)[]

#### Defined in

[packages/timeline/src/core/track/track.ts:78](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/track/track.ts#L78)

___

### getId

▸ **getId**(): `string`

#### Returns

`string`

#### Defined in

[packages/timeline/src/core/track/track.ts:66](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/track/track.ts#L66)

___

### getName

▸ **getName**(): `string`

#### Returns

`string`

#### Defined in

[packages/timeline/src/core/track/track.ts:70](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/track/track.ts#L70)

___

### getTrackDuration

▸ **getTrackDuration**(): `number`

#### Returns

`number`

#### Defined in

[packages/timeline/src/core/track/track.ts:91](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/track/track.ts#L91)

___

### getType

▸ **getType**(): `string`

#### Returns

`string`

#### Defined in

[packages/timeline/src/core/track/track.ts:74](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/track/track.ts#L74)

___

### removeElement

▸ **removeElement**(`element`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`TrackElement`](TrackElement.md) |

#### Returns

`void`

#### Defined in

[packages/timeline/src/core/track/track.ts:129](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/track/track.ts#L129)

___

### removeElementViaFriend

▸ **removeElementViaFriend**(`element`): `void`

Friend method to remove element (called by TrackFriend)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `element` | [`TrackElement`](TrackElement.md) | The element to remove |

#### Returns

`void`

#### Defined in

[packages/timeline/src/core/track/track.ts:53](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/track/track.ts#L53)

___

### serialize

▸ **serialize**(): [`TrackJSON`](../modules.md#trackjson)

#### Returns

[`TrackJSON`](../modules.md#trackjson)

#### Defined in

[packages/timeline/src/core/track/track.ts:210](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/track/track.ts#L210)

___

### updateElement

▸ **updateElement**(`element`): `boolean`

Updates an element in the track with validation

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `element` | [`TrackElement`](TrackElement.md) | The element to update |

#### Returns

`boolean`

true if element was updated successfully, throws ValidationError if validation fails

#### Defined in

[packages/timeline/src/core/track/track.ts:141](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/track/track.ts#L141)

___

### updateElementViaFriend

▸ **updateElementViaFriend**(`element`): `boolean`

Friend method to update element (called by TrackFriend)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `element` | [`TrackElement`](TrackElement.md) | The element to update |

#### Returns

`boolean`

true if element was updated successfully

#### Defined in

[packages/timeline/src/core/track/track.ts:62](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/track/track.ts#L62)

___

### validateAllElements

▸ **validateAllElements**(): `Object`

Validates all elements in the track and returns combined result and per-element status

#### Returns

`Object`

Object with overall isValid and array of per-element validation results

| Name | Type |
| :------ | :------ |
| `isValid` | `boolean` |
| `results` | \{ `element`: [`TrackElement`](TrackElement.md) ; `errors?`: `string`[] ; `isValid`: `boolean` ; `warnings?`: `string`[]  }[] |

#### Defined in

[packages/timeline/src/core/track/track.ts:173](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/track/track.ts#L173)

___

### validateElement

▸ **validateElement**(`element`): `boolean`

Validates an element

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `element` | [`TrackElement`](TrackElement.md) | The element to validate |

#### Returns

`boolean`

true if valid, throws ValidationError if invalid

#### Defined in

[packages/timeline/src/core/track/track.ts:87](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/track/track.ts#L87)

___

### fromJSON

▸ **fromJSON**(`json`): [`Track`](Track.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `json` | `any` |

#### Returns

[`Track`](Track.md)

#### Defined in

[packages/timeline/src/core/track/track.ts:222](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/track/track.ts#L222)
