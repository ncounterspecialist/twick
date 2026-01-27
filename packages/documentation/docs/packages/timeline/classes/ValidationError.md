# Class: ValidationError

## Hierarchy

- `Error`

  ↳ **`ValidationError`**

## Table of contents

### Constructors

- [constructor](ValidationError.md#constructor)

### Properties

- [errors](ValidationError.md#errors)
- [warnings](ValidationError.md#warnings)

## Constructors

### constructor

• **new ValidationError**(`message`, `errors`, `warnings?`): [`ValidationError`](ValidationError.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `message` | `string` | `undefined` |
| `errors` | `string`[] | `undefined` |
| `warnings` | `string`[] | `[]` |

#### Returns

[`ValidationError`](ValidationError.md)

#### Overrides

Error.constructor

#### Defined in

[core/visitor/element-validator.ts:21](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/visitor/element-validator.ts#L21)

## Properties

### errors

• **errors**: `string`[]

#### Defined in

[core/visitor/element-validator.ts:23](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/visitor/element-validator.ts#L23)

___

### warnings

• **warnings**: `string`[] = `[]`

#### Defined in

[core/visitor/element-validator.ts:24](https://github.com/ncounterspecialist/twick/blob/845e7e79a54994608c45a61c336277623e17fab5/packages/timeline/src/core/visitor/element-validator.ts#L24)
