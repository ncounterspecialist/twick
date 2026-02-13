# Interface: Animation

## Table of contents

### Properties

- [name](Animation.md#name)
- [interval](Animation.md#interval)
- [duration](Animation.md#duration)
- [intensity](Animation.md#intensity)
- [animate](Animation.md#animate)
- [mode](Animation.md#mode)
- [direction](Animation.md#direction)
- [options](Animation.md#options)
- [getSample](Animation.md#getsample)

## Properties

### name

• **name**: `string`

#### Defined in

[packages/video-editor/src/helpers/types.ts:2](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/video-editor/src/helpers/types.ts#L2)

___

### interval

• `Optional` **interval**: `number`

#### Defined in

[packages/video-editor/src/helpers/types.ts:3](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/video-editor/src/helpers/types.ts#L3)

___

### duration

• `Optional` **duration**: `number`

#### Defined in

[packages/video-editor/src/helpers/types.ts:4](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/video-editor/src/helpers/types.ts#L4)

___

### intensity

• `Optional` **intensity**: `number`

#### Defined in

[packages/video-editor/src/helpers/types.ts:5](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/video-editor/src/helpers/types.ts#L5)

___

### animate

• `Optional` **animate**: ``"enter"`` \| ``"exit"`` \| ``"both"``

#### Defined in

[packages/video-editor/src/helpers/types.ts:6](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/video-editor/src/helpers/types.ts#L6)

___

### mode

• `Optional` **mode**: ``"in"`` \| ``"out"``

#### Defined in

[packages/video-editor/src/helpers/types.ts:7](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/video-editor/src/helpers/types.ts#L7)

___

### direction

• `Optional` **direction**: ``"down"`` \| ``"left"`` \| ``"up"`` \| ``"right"`` \| ``"center"``

#### Defined in

[packages/video-editor/src/helpers/types.ts:8](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/video-editor/src/helpers/types.ts#L8)

___

### options

• **options**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `animate?` | (``"enter"`` \| ``"exit"`` \| ``"both"``)[] |
| `mode?` | (``"in"`` \| ``"out"``)[] |
| `direction?` | (``"down"`` \| ``"left"`` \| ``"up"`` \| ``"right"`` \| ``"center"``)[] |
| `intensity?` | [`number`, `number`] |
| `interval?` | [`number`, `number`] |
| `duration?` | [`number`, `number`] |

#### Defined in

[packages/video-editor/src/helpers/types.ts:9](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/video-editor/src/helpers/types.ts#L9)

___

### getSample

• **getSample**: (`animation?`: [`Animation`](Animation.md)) => `string`

#### Type declaration

▸ (`animation?`): `string`

##### Parameters

| Name | Type |
| :------ | :------ |
| `animation?` | [`Animation`](Animation.md) |

##### Returns

`string`

#### Defined in

[packages/video-editor/src/helpers/types.ts:17](https://github.com/ncounterspecialist/twick/blob/533901386ed738b22786d2b99dbb9ae8d75eeeea/packages/video-editor/src/helpers/types.ts#L17)
