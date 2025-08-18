[@twick/timeline](../README.md) / [Exports](../modules.md) / ImageElement

# Class: ImageElement

## Hierarchy

- [`TrackElement`](TrackElement.md)

  ↳ **`ImageElement`**

## Table of contents

### Constructors

- [constructor](ImageElement.md#constructor)

### Properties

- [animation](ImageElement.md#animation)
- [backgroundColor](ImageElement.md#backgroundcolor)
- [e](ImageElement.md#e)
- [frame](ImageElement.md#frame)
- [frameEffects](ImageElement.md#frameeffects)
- [id](ImageElement.md#id)
- [name](ImageElement.md#name)
- [objectFit](ImageElement.md#objectfit)
- [parentSize](ImageElement.md#parentsize)
- [props](ImageElement.md#props)
- [s](ImageElement.md#s)
- [trackId](ImageElement.md#trackid)
- [type](ImageElement.md#type)

### Methods

- [accept](ImageElement.md#accept)
- [addFrameEffect](ImageElement.md#addframeeffect)
- [getAnimation](ImageElement.md#getanimation)
- [getBackgroundColor](ImageElement.md#getbackgroundcolor)
- [getDuration](ImageElement.md#getduration)
- [getEnd](ImageElement.md#getend)
- [getFrame](ImageElement.md#getframe)
- [getFrameEffects](ImageElement.md#getframeeffects)
- [getId](ImageElement.md#getid)
- [getName](ImageElement.md#getname)
- [getObjectFit](ImageElement.md#getobjectfit)
- [getParentSize](ImageElement.md#getparentsize)
- [getPosition](ImageElement.md#getposition)
- [getProps](ImageElement.md#getprops)
- [getStart](ImageElement.md#getstart)
- [getTrackId](ImageElement.md#gettrackid)
- [getType](ImageElement.md#gettype)
- [setAnimation](ImageElement.md#setanimation)
- [setBackgroundColor](ImageElement.md#setbackgroundcolor)
- [setEnd](ImageElement.md#setend)
- [setFrame](ImageElement.md#setframe)
- [setFrameEffects](ImageElement.md#setframeeffects)
- [setId](ImageElement.md#setid)
- [setMediaFilter](ImageElement.md#setmediafilter)
- [setName](ImageElement.md#setname)
- [setObjectFit](ImageElement.md#setobjectfit)
- [setParentSize](ImageElement.md#setparentsize)
- [setPosition](ImageElement.md#setposition)
- [setProps](ImageElement.md#setprops)
- [setSrc](ImageElement.md#setsrc)
- [setStart](ImageElement.md#setstart)
- [setTrackId](ImageElement.md#settrackid)
- [setType](ImageElement.md#settype)
- [updateImageMeta](ImageElement.md#updateimagemeta)

## Constructors

### constructor

• **new ImageElement**(`src`, `parentSize`): [`ImageElement`](ImageElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `src` | `string` |
| `parentSize` | [`Size`](../modules.md#size) |

#### Returns

[`ImageElement`](ImageElement.md)

#### Overrides

[TrackElement](TrackElement.md).[constructor](TrackElement.md#constructor)

#### Defined in

[packages/timeline/src/core/elements/image.element.ts:16](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/image.element.ts#L16)

## Properties

### animation

• `Protected` `Optional` **animation**: [`ElementAnimation`](ElementAnimation.md)

#### Inherited from

[TrackElement](TrackElement.md).[animation](TrackElement.md#animation)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:13](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L13)

___

### backgroundColor

• `Protected` **backgroundColor**: `string`

#### Defined in

[packages/timeline/src/core/elements/image.element.ts:9](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/image.element.ts#L9)

___

### e

• `Protected` **e**: `number`

#### Inherited from

[TrackElement](TrackElement.md).[e](TrackElement.md#e)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:10](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L10)

___

### frame

• **frame**: [`Frame`](../modules.md#frame)

#### Defined in

[packages/timeline/src/core/elements/image.element.ts:13](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/image.element.ts#L13)

___

### frameEffects

• `Optional` **frameEffects**: [`ElementFrameEffect`](ElementFrameEffect.md)[]

#### Defined in

[packages/timeline/src/core/elements/image.element.ts:12](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/image.element.ts#L12)

___

### id

• `Protected` **id**: `string`

#### Inherited from

[TrackElement](TrackElement.md).[id](TrackElement.md#id)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:7](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L7)

___

### name

• `Protected` **name**: `string`

#### Inherited from

[TrackElement](TrackElement.md).[name](TrackElement.md#name)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:12](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L12)

___

### objectFit

• `Protected` **objectFit**: [`ObjectFit`](../modules.md#objectfit)

#### Defined in

[packages/timeline/src/core/elements/image.element.ts:11](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/image.element.ts#L11)

___

### parentSize

• `Protected` **parentSize**: [`Size`](../modules.md#size)

#### Defined in

[packages/timeline/src/core/elements/image.element.ts:10](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/image.element.ts#L10)

___

### props

• `Protected` **props**: [`ImageProps`](../modules.md#imageprops)

#### Overrides

[TrackElement](TrackElement.md).[props](TrackElement.md#props)

#### Defined in

[packages/timeline/src/core/elements/image.element.ts:14](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/image.element.ts#L14)

___

### s

• `Protected` **s**: `number`

#### Inherited from

[TrackElement](TrackElement.md).[s](TrackElement.md#s)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:9](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L9)

___

### trackId

• `Protected` **trackId**: `string`

#### Inherited from

[TrackElement](TrackElement.md).[trackId](TrackElement.md#trackid)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:11](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L11)

___

### type

• `Protected` **type**: `string`

#### Inherited from

[TrackElement](TrackElement.md).[type](TrackElement.md#type)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:8](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L8)

## Methods

### accept

▸ **accept**\<`T`\>(`visitor`): `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `visitor` | [`ElementVisitor`](../interfaces/ElementVisitor.md)\<`T`\> |

#### Returns

`T`

#### Overrides

[TrackElement](TrackElement.md).[accept](TrackElement.md#accept)

#### Defined in

[packages/timeline/src/core/elements/image.element.ts:126](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/image.element.ts#L126)

___

### addFrameEffect

▸ **addFrameEffect**(`frameEffect`): [`ImageElement`](ImageElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `frameEffect` | [`ElementFrameEffect`](ElementFrameEffect.md) |

#### Returns

[`ImageElement`](ImageElement.md)

#### Defined in

[packages/timeline/src/core/elements/image.element.ts:121](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/image.element.ts#L121)

___

### getAnimation

▸ **getAnimation**(): `undefined` \| [`ElementAnimation`](ElementAnimation.md)

#### Returns

`undefined` \| [`ElementAnimation`](ElementAnimation.md)

#### Inherited from

[TrackElement](TrackElement.md).[getAnimation](TrackElement.md#getanimation)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:59](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L59)

___

### getBackgroundColor

▸ **getBackgroundColor**(): `string`

#### Returns

`string`

#### Defined in

[packages/timeline/src/core/elements/image.element.ts:43](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/image.element.ts#L43)

___

### getDuration

▸ **getDuration**(): `number`

#### Returns

`number`

#### Inherited from

[TrackElement](TrackElement.md).[getDuration](TrackElement.md#getduration)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:43](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L43)

___

### getEnd

▸ **getEnd**(): `number`

#### Returns

`number`

#### Inherited from

[TrackElement](TrackElement.md).[getEnd](TrackElement.md#getend)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:39](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L39)

___

### getFrame

▸ **getFrame**(): [`Frame`](../modules.md#frame)

#### Returns

[`Frame`](../modules.md#frame)

#### Defined in

[packages/timeline/src/core/elements/image.element.ts:35](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/image.element.ts#L35)

___

### getFrameEffects

▸ **getFrameEffects**(): `undefined` \| [`ElementFrameEffect`](ElementFrameEffect.md)[]

#### Returns

`undefined` \| [`ElementFrameEffect`](ElementFrameEffect.md)[]

#### Defined in

[packages/timeline/src/core/elements/image.element.ts:39](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/image.element.ts#L39)

___

### getId

▸ **getId**(): `string`

#### Returns

`string`

#### Inherited from

[TrackElement](TrackElement.md).[getId](TrackElement.md#getid)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:27](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L27)

___

### getName

▸ **getName**(): `string`

#### Returns

`string`

#### Inherited from

[TrackElement](TrackElement.md).[getName](TrackElement.md#getname)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:55](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L55)

___

### getObjectFit

▸ **getObjectFit**(): [`ObjectFit`](../modules.md#objectfit)

#### Returns

[`ObjectFit`](../modules.md#objectfit)

#### Defined in

[packages/timeline/src/core/elements/image.element.ts:47](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/image.element.ts#L47)

___

### getParentSize

▸ **getParentSize**(): [`Size`](../modules.md#size)

#### Returns

[`Size`](../modules.md#size)

#### Defined in

[packages/timeline/src/core/elements/image.element.ts:31](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/image.element.ts#L31)

___

### getPosition

▸ **getPosition**(): [`Position`](../modules.md#position)

#### Returns

[`Position`](../modules.md#position)

#### Overrides

[TrackElement](TrackElement.md).[getPosition](TrackElement.md#getposition)

#### Defined in

[packages/timeline/src/core/elements/image.element.ts:51](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/image.element.ts#L51)

___

### getProps

▸ **getProps**(): `Record`\<`string`, `any`\>

#### Returns

`Record`\<`string`, `any`\>

#### Inherited from

[TrackElement](TrackElement.md).[getProps](TrackElement.md#getprops)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:51](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L51)

___

### getStart

▸ **getStart**(): `number`

#### Returns

`number`

#### Inherited from

[TrackElement](TrackElement.md).[getStart](TrackElement.md#getstart)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:35](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L35)

___

### getTrackId

▸ **getTrackId**(): `string`

#### Returns

`string`

#### Inherited from

[TrackElement](TrackElement.md).[getTrackId](TrackElement.md#gettrackid)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:47](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L47)

___

### getType

▸ **getType**(): `string`

#### Returns

`string`

#### Inherited from

[TrackElement](TrackElement.md).[getType](TrackElement.md#gettype)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:31](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L31)

___

### setAnimation

▸ **setAnimation**(`animation?`): [`ImageElement`](ImageElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `animation?` | [`ElementAnimation`](ElementAnimation.md) |

#### Returns

[`ImageElement`](ImageElement.md)

#### Inherited from

[TrackElement](TrackElement.md).[setAnimation](TrackElement.md#setanimation)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:100](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L100)

___

### setBackgroundColor

▸ **setBackgroundColor**(`backgroundColor`): [`ImageElement`](ImageElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `backgroundColor` | `string` |

#### Returns

[`ImageElement`](ImageElement.md)

#### Defined in

[packages/timeline/src/core/elements/image.element.ts:106](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/image.element.ts#L106)

___

### setEnd

▸ **setEnd**(`e`): [`ImageElement`](ImageElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `number` |

#### Returns

[`ImageElement`](ImageElement.md)

#### Inherited from

[TrackElement](TrackElement.md).[setEnd](TrackElement.md#setend)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:85](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L85)

___

### setFrame

▸ **setFrame**(`frame`): [`ImageElement`](ImageElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `frame` | [`Frame`](../modules.md#frame) |

#### Returns

[`ImageElement`](ImageElement.md)

#### Defined in

[packages/timeline/src/core/elements/image.element.ts:90](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/image.element.ts#L90)

___

### setFrameEffects

▸ **setFrameEffects**(`frameEffects?`): [`ImageElement`](ImageElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `frameEffects?` | [`ElementFrameEffect`](ElementFrameEffect.md)[] |

#### Returns

[`ImageElement`](ImageElement.md)

#### Defined in

[packages/timeline/src/core/elements/image.element.ts:116](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/image.element.ts#L116)

___

### setId

▸ **setId**(`id`): [`ImageElement`](ImageElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

[`ImageElement`](ImageElement.md)

#### Inherited from

[TrackElement](TrackElement.md).[setId](TrackElement.md#setid)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:70](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L70)

___

### setMediaFilter

▸ **setMediaFilter**(`mediaFilter`): [`ImageElement`](ImageElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `mediaFilter` | `string` |

#### Returns

[`ImageElement`](ImageElement.md)

#### Defined in

[packages/timeline/src/core/elements/image.element.ts:101](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/image.element.ts#L101)

___

### setName

▸ **setName**(`name`): [`ImageElement`](ImageElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`ImageElement`](ImageElement.md)

#### Inherited from

[TrackElement](TrackElement.md).[setName](TrackElement.md#setname)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:95](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L95)

___

### setObjectFit

▸ **setObjectFit**(`objectFit`): [`ImageElement`](ImageElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `objectFit` | [`ObjectFit`](../modules.md#objectfit) |

#### Returns

[`ImageElement`](ImageElement.md)

#### Defined in

[packages/timeline/src/core/elements/image.element.ts:85](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/image.element.ts#L85)

___

### setParentSize

▸ **setParentSize**(`parentSize`): [`ImageElement`](ImageElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentSize` | [`Size`](../modules.md#size) |

#### Returns

[`ImageElement`](ImageElement.md)

#### Defined in

[packages/timeline/src/core/elements/image.element.ts:96](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/image.element.ts#L96)

___

### setPosition

▸ **setPosition**(`position`): [`ImageElement`](ImageElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `position` | [`Position`](../modules.md#position) |

#### Returns

[`ImageElement`](ImageElement.md)

#### Overrides

[TrackElement](TrackElement.md).[setPosition](TrackElement.md#setposition)

#### Defined in

[packages/timeline/src/core/elements/image.element.ts:73](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/image.element.ts#L73)

___

### setProps

▸ **setProps**(`props`): [`ImageElement`](ImageElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `Omit`\<`any`, ``"src"``\> |

#### Returns

[`ImageElement`](ImageElement.md)

#### Overrides

[TrackElement](TrackElement.md).[setProps](TrackElement.md#setprops)

#### Defined in

[packages/timeline/src/core/elements/image.element.ts:111](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/image.element.ts#L111)

___

### setSrc

▸ **setSrc**(`src`): `Promise`\<[`ImageElement`](ImageElement.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `src` | `string` |

#### Returns

`Promise`\<[`ImageElement`](ImageElement.md)\>

#### Defined in

[packages/timeline/src/core/elements/image.element.ts:79](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/image.element.ts#L79)

___

### setStart

▸ **setStart**(`s`): [`ImageElement`](ImageElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `s` | `number` |

#### Returns

[`ImageElement`](ImageElement.md)

#### Inherited from

[TrackElement](TrackElement.md).[setStart](TrackElement.md#setstart)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:80](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L80)

___

### setTrackId

▸ **setTrackId**(`trackId`): [`ImageElement`](ImageElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `trackId` | `string` |

#### Returns

[`ImageElement`](ImageElement.md)

#### Inherited from

[TrackElement](TrackElement.md).[setTrackId](TrackElement.md#settrackid)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:90](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L90)

___

### setType

▸ **setType**(`type`): [`ImageElement`](ImageElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |

#### Returns

[`ImageElement`](ImageElement.md)

#### Inherited from

[TrackElement](TrackElement.md).[setType](TrackElement.md#settype)

#### Defined in

[packages/timeline/src/core/elements/base.element.ts:75](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/base.element.ts#L75)

___

### updateImageMeta

▸ **updateImageMeta**(`updateFrame?`): `Promise`\<`void`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `updateFrame` | `boolean` | `true` |

#### Returns

`Promise`\<`void`\>

#### Defined in

[packages/timeline/src/core/elements/image.element.ts:58](https://github.com/ncounterspecialist/twick/blob/076b5b2d4006b7835e1bf4168731258cbc34771f/packages/timeline/src/core/elements/image.element.ts#L58)
