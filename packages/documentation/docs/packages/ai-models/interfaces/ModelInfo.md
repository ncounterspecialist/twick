[@twick/ai-models](../README.md) / [Exports](../modules.md) / ModelInfo

# Interface: ModelInfo

## Table of contents

### Properties

- [architecture](ModelInfo.md#architecture)
- [availableDimensions](ModelInfo.md#availabledimensions)
- [availableDurations](ModelInfo.md#availabledurations)
- [availableFps](ModelInfo.md#availablefps)
- [availableSchedulers](ModelInfo.md#availableschedulers)
- [availableSteps](ModelInfo.md#availablesteps)
- [category](ModelInfo.md#category)
- [defaultDuration](ModelInfo.md#defaultduration)
- [defaultFps](ModelInfo.md#defaultfps)
- [defaultGuidanceScale](ModelInfo.md#defaultguidancescale)
- [defaultHeight](ModelInfo.md#defaultheight)
- [defaultScheduler](ModelInfo.md#defaultscheduler)
- [defaultSteps](ModelInfo.md#defaultsteps)
- [defaultStrength](ModelInfo.md#defaultstrength)
- [defaultWidth](ModelInfo.md#defaultwidth)
- [description](ModelInfo.md#description)
- [endpointId](ModelInfo.md#endpointid)
- [hasNegativePrompt](ModelInfo.md#hasnegativeprompt)
- [hasSafetyChecker](ModelInfo.md#hassafetychecker)
- [hasSeed](ModelInfo.md#hasseed)
- [initialInput](ModelInfo.md#initialinput)
- [inputAsset](ModelInfo.md#inputasset)
- [inputMap](ModelInfo.md#inputmap)
- [label](ModelInfo.md#label)
- [maxGuidanceScale](ModelInfo.md#maxguidancescale)
- [maxSteps](ModelInfo.md#maxsteps)
- [maxStrength](ModelInfo.md#maxstrength)
- [minGuidanceScale](ModelInfo.md#minguidancescale)
- [minSteps](ModelInfo.md#minsteps)
- [minStrength](ModelInfo.md#minstrength)
- [modelType](ModelInfo.md#modeltype)
- [popularity](ModelInfo.md#popularity)
- [prompt](ModelInfo.md#prompt)
- [provider](ModelInfo.md#provider)

## Properties

### architecture

• `Optional` **architecture**: `string`

#### Defined in

[types.ts:35](https://github.com/ncounterspecialist/twick/blob/f998aaef9e75e78c849ba1b6a0aeab58f07d5887/packages/ai-models/src/types.ts#L35)

___

### availableDimensions

• `Optional` **availableDimensions**: [`ModelDimension`](ModelDimension.md)[]

#### Defined in

[types.ts:40](https://github.com/ncounterspecialist/twick/blob/f998aaef9e75e78c849ba1b6a0aeab58f07d5887/packages/ai-models/src/types.ts#L40)

___

### availableDurations

• `Optional` **availableDurations**: `number`[]

#### Defined in

[types.ts:39](https://github.com/ncounterspecialist/twick/blob/f998aaef9e75e78c849ba1b6a0aeab58f07d5887/packages/ai-models/src/types.ts#L39)

___

### availableFps

• `Optional` **availableFps**: `number`[]

#### Defined in

[types.ts:41](https://github.com/ncounterspecialist/twick/blob/f998aaef9e75e78c849ba1b6a0aeab58f07d5887/packages/ai-models/src/types.ts#L41)

___

### availableSchedulers

• `Optional` **availableSchedulers**: `string`[]

#### Defined in

[types.ts:64](https://github.com/ncounterspecialist/twick/blob/f998aaef9e75e78c849ba1b6a0aeab58f07d5887/packages/ai-models/src/types.ts#L64)

___

### availableSteps

• `Optional` **availableSteps**: `number`[]

#### Defined in

[types.ts:47](https://github.com/ncounterspecialist/twick/blob/f998aaef9e75e78c849ba1b6a0aeab58f07d5887/packages/ai-models/src/types.ts#L47)

___

### category

• **category**: [`AIModelCategory`](../modules.md#aimodelcategory)

#### Defined in

[types.ts:34](https://github.com/ncounterspecialist/twick/blob/f998aaef9e75e78c849ba1b6a0aeab58f07d5887/packages/ai-models/src/types.ts#L34)

___

### defaultDuration

• `Optional` **defaultDuration**: `number`

#### Defined in

[types.ts:42](https://github.com/ncounterspecialist/twick/blob/f998aaef9e75e78c849ba1b6a0aeab58f07d5887/packages/ai-models/src/types.ts#L42)

___

### defaultFps

• `Optional` **defaultFps**: `number`

#### Defined in

[types.ts:45](https://github.com/ncounterspecialist/twick/blob/f998aaef9e75e78c849ba1b6a0aeab58f07d5887/packages/ai-models/src/types.ts#L45)

___

### defaultGuidanceScale

• `Optional` **defaultGuidanceScale**: `number`

#### Defined in

[types.ts:54](https://github.com/ncounterspecialist/twick/blob/f998aaef9e75e78c849ba1b6a0aeab58f07d5887/packages/ai-models/src/types.ts#L54)

___

### defaultHeight

• `Optional` **defaultHeight**: `number`

#### Defined in

[types.ts:44](https://github.com/ncounterspecialist/twick/blob/f998aaef9e75e78c849ba1b6a0aeab58f07d5887/packages/ai-models/src/types.ts#L44)

___

### defaultScheduler

• `Optional` **defaultScheduler**: `string`

#### Defined in

[types.ts:65](https://github.com/ncounterspecialist/twick/blob/f998aaef9e75e78c849ba1b6a0aeab58f07d5887/packages/ai-models/src/types.ts#L65)

___

### defaultSteps

• `Optional` **defaultSteps**: `number`

#### Defined in

[types.ts:50](https://github.com/ncounterspecialist/twick/blob/f998aaef9e75e78c849ba1b6a0aeab58f07d5887/packages/ai-models/src/types.ts#L50)

___

### defaultStrength

• `Optional` **defaultStrength**: `number`

#### Defined in

[types.ts:58](https://github.com/ncounterspecialist/twick/blob/f998aaef9e75e78c849ba1b6a0aeab58f07d5887/packages/ai-models/src/types.ts#L58)

___

### defaultWidth

• `Optional` **defaultWidth**: `number`

#### Defined in

[types.ts:43](https://github.com/ncounterspecialist/twick/blob/f998aaef9e75e78c849ba1b6a0aeab58f07d5887/packages/ai-models/src/types.ts#L43)

___

### description

• `Optional` **description**: `string`

#### Defined in

[types.ts:32](https://github.com/ncounterspecialist/twick/blob/f998aaef9e75e78c849ba1b6a0aeab58f07d5887/packages/ai-models/src/types.ts#L32)

___

### endpointId

• **endpointId**: `string`

#### Defined in

[types.ts:30](https://github.com/ncounterspecialist/twick/blob/f998aaef9e75e78c849ba1b6a0aeab58f07d5887/packages/ai-models/src/types.ts#L30)

___

### hasNegativePrompt

• `Optional` **hasNegativePrompt**: `boolean`

#### Defined in

[types.ts:61](https://github.com/ncounterspecialist/twick/blob/f998aaef9e75e78c849ba1b6a0aeab58f07d5887/packages/ai-models/src/types.ts#L61)

___

### hasSafetyChecker

• `Optional` **hasSafetyChecker**: `boolean`

#### Defined in

[types.ts:62](https://github.com/ncounterspecialist/twick/blob/f998aaef9e75e78c849ba1b6a0aeab58f07d5887/packages/ai-models/src/types.ts#L62)

___

### hasSeed

• `Optional` **hasSeed**: `boolean`

#### Defined in

[types.ts:60](https://github.com/ncounterspecialist/twick/blob/f998aaef9e75e78c849ba1b6a0aeab58f07d5887/packages/ai-models/src/types.ts#L60)

___

### initialInput

• `Optional` **initialInput**: `Record`\<`string`, `unknown`\>

#### Defined in

[types.ts:67](https://github.com/ncounterspecialist/twick/blob/f998aaef9e75e78c849ba1b6a0aeab58f07d5887/packages/ai-models/src/types.ts#L67)

___

### inputAsset

• `Optional` **inputAsset**: (`string` \| \{ `key`: `string` ; `type`: `string`  })[]

#### Defined in

[types.ts:66](https://github.com/ncounterspecialist/twick/blob/f998aaef9e75e78c849ba1b6a0aeab58f07d5887/packages/ai-models/src/types.ts#L66)

___

### inputMap

• `Optional` **inputMap**: `Record`\<`string`, `string`\>

#### Defined in

[types.ts:68](https://github.com/ncounterspecialist/twick/blob/f998aaef9e75e78c849ba1b6a0aeab58f07d5887/packages/ai-models/src/types.ts#L68)

___

### label

• **label**: `string`

#### Defined in

[types.ts:31](https://github.com/ncounterspecialist/twick/blob/f998aaef9e75e78c849ba1b6a0aeab58f07d5887/packages/ai-models/src/types.ts#L31)

___

### maxGuidanceScale

• `Optional` **maxGuidanceScale**: `number`

#### Defined in

[types.ts:53](https://github.com/ncounterspecialist/twick/blob/f998aaef9e75e78c849ba1b6a0aeab58f07d5887/packages/ai-models/src/types.ts#L53)

___

### maxSteps

• `Optional` **maxSteps**: `number`

#### Defined in

[types.ts:49](https://github.com/ncounterspecialist/twick/blob/f998aaef9e75e78c849ba1b6a0aeab58f07d5887/packages/ai-models/src/types.ts#L49)

___

### maxStrength

• `Optional` **maxStrength**: `number`

#### Defined in

[types.ts:57](https://github.com/ncounterspecialist/twick/blob/f998aaef9e75e78c849ba1b6a0aeab58f07d5887/packages/ai-models/src/types.ts#L57)

___

### minGuidanceScale

• `Optional` **minGuidanceScale**: `number`

#### Defined in

[types.ts:52](https://github.com/ncounterspecialist/twick/blob/f998aaef9e75e78c849ba1b6a0aeab58f07d5887/packages/ai-models/src/types.ts#L52)

___

### minSteps

• `Optional` **minSteps**: `number`

#### Defined in

[types.ts:48](https://github.com/ncounterspecialist/twick/blob/f998aaef9e75e78c849ba1b6a0aeab58f07d5887/packages/ai-models/src/types.ts#L48)

___

### minStrength

• `Optional` **minStrength**: `number`

#### Defined in

[types.ts:56](https://github.com/ncounterspecialist/twick/blob/f998aaef9e75e78c849ba1b6a0aeab58f07d5887/packages/ai-models/src/types.ts#L56)

___

### modelType

• `Optional` **modelType**: `string`

#### Defined in

[types.ts:36](https://github.com/ncounterspecialist/twick/blob/f998aaef9e75e78c849ba1b6a0aeab58f07d5887/packages/ai-models/src/types.ts#L36)

___

### popularity

• **popularity**: `number`

#### Defined in

[types.ts:33](https://github.com/ncounterspecialist/twick/blob/f998aaef9e75e78c849ba1b6a0aeab58f07d5887/packages/ai-models/src/types.ts#L33)

___

### prompt

• `Optional` **prompt**: `boolean`

#### Defined in

[types.ts:37](https://github.com/ncounterspecialist/twick/blob/f998aaef9e75e78c849ba1b6a0aeab58f07d5887/packages/ai-models/src/types.ts#L37)

___

### provider

• **provider**: [`AIModelProvider`](../modules.md#aimodelprovider)

#### Defined in

[types.ts:29](https://github.com/ncounterspecialist/twick/blob/f998aaef9e75e78c849ba1b6a0aeab58f07d5887/packages/ai-models/src/types.ts#L29)
