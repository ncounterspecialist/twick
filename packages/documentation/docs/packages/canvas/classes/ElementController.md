# Class: ElementController

Registry for canvas element handlers. Enables scalable dispatch by type:
elementController.get(element.type)?.add(params) and updateFromFabricObject(...).

## Table of contents

### Constructors

- [constructor](ElementController.md#constructor)

### Methods

- [register](ElementController.md#register)
- [get](ElementController.md#get)
- [list](ElementController.md#list)

## Constructors

### constructor

• **new ElementController**(): [`ElementController`](ElementController.md)

#### Returns

[`ElementController`](ElementController.md)

## Methods

### register

▸ **register**(`handler`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `handler` | [`CanvasElementHandler`](../modules.md#canvaselementhandler) |

#### Returns

`void`

#### Defined in

[controllers/element.controller.ts:17](https://github.com/ncounterspecialist/twick/blob/e704aa51eb3c92196579baf390f2a1b40f250b1e/packages/canvas/src/controllers/element.controller.ts#L17)

___

### get

▸ **get**(`name`): `undefined` \| [`CanvasElementHandler`](../modules.md#canvaselementhandler)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`undefined` \| [`CanvasElementHandler`](../modules.md#canvaselementhandler)

#### Defined in

[controllers/element.controller.ts:21](https://github.com/ncounterspecialist/twick/blob/e704aa51eb3c92196579baf390f2a1b40f250b1e/packages/canvas/src/controllers/element.controller.ts#L21)

___

### list

▸ **list**(): `string`[]

#### Returns

`string`[]

#### Defined in

[controllers/element.controller.ts:25](https://github.com/ncounterspecialist/twick/blob/e704aa51eb3c92196579baf390f2a1b40f250b1e/packages/canvas/src/controllers/element.controller.ts#L25)
