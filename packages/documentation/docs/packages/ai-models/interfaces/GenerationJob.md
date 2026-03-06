[@twick/ai-models](../README.md) / [Exports](../modules.md) / GenerationJob

# Interface: GenerationJob

## Table of contents

### Properties

- [attempts](GenerationJob.md#attempts)
- [completedAt](GenerationJob.md#completedat)
- [createdAt](GenerationJob.md#createdat)
- [error](GenerationJob.md#error)
- [fallbackProviders](GenerationJob.md#fallbackproviders)
- [id](GenerationJob.md#id)
- [input](GenerationJob.md#input)
- [modelId](GenerationJob.md#modelid)
- [output](GenerationJob.md#output)
- [provider](GenerationJob.md#provider)
- [providerJobId](GenerationJob.md#providerjobid)
- [requestId](GenerationJob.md#requestid)
- [status](GenerationJob.md#status)
- [type](GenerationJob.md#type)
- [updatedAt](GenerationJob.md#updatedat)

## Properties

### attempts

• **attempts**: `number`

#### Defined in

orchestration-types.ts:288

___

### completedAt

• `Optional` **completedAt**: `string`

#### Defined in

orchestration-types.ts:291

___

### createdAt

• **createdAt**: `string`

#### Defined in

orchestration-types.ts:289

___

### error

• `Optional` **error**: `string`

#### Defined in

orchestration-types.ts:287

___

### fallbackProviders

• **fallbackProviders**: [`AIModelProvider`](../modules.md#aimodelprovider)[]

#### Defined in

orchestration-types.ts:281

___

### id

• **id**: `string`

#### Defined in

orchestration-types.ts:277

___

### input

• **input**: [`GenerationInput`](../modules.md#generationinput)

#### Defined in

orchestration-types.ts:283

___

### modelId

• `Optional` **modelId**: `string`

#### Defined in

orchestration-types.ts:285

___

### output

• `Optional` **output**: [`ProviderGenerationOutput`](ProviderGenerationOutput.md)

#### Defined in

orchestration-types.ts:284

___

### provider

• **provider**: [`AIModelProvider`](../modules.md#aimodelprovider)

#### Defined in

orchestration-types.ts:280

___

### providerJobId

• `Optional` **providerJobId**: `string`

#### Defined in

orchestration-types.ts:282

___

### requestId

• `Optional` **requestId**: `string`

#### Defined in

orchestration-types.ts:286

___

### status

• **status**: [`JobStatus`](../modules.md#jobstatus)

#### Defined in

orchestration-types.ts:279

___

### type

• **type**: [`GenerationType`](../modules.md#generationtype)

#### Defined in

orchestration-types.ts:278

___

### updatedAt

• **updatedAt**: `string`

#### Defined in

orchestration-types.ts:290
