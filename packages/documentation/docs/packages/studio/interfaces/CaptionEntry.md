[@twick/studio - v0.15.0](../README.md) / [Exports](../modules.md) / CaptionEntry

# Interface: CaptionEntry

Caption entry format used for timeline integration

## Table of contents

### Properties

- [e](CaptionEntry.md#e)
- [s](CaptionEntry.md#s)
- [t](CaptionEntry.md#t)
- [w](CaptionEntry.md#w)

## Properties

### e

• **e**: `number`

#### Defined in

[studio/src/types/index.ts:49](https://github.com/ncounterspecialist/twick/blob/4f6ff1e413da0a811994ab66a7c9586f7594c61a/packages/studio/src/types/index.ts#L49)

___

### s

• **s**: `number`

#### Defined in

[studio/src/types/index.ts:48](https://github.com/ncounterspecialist/twick/blob/4f6ff1e413da0a811994ab66a7c9586f7594c61a/packages/studio/src/types/index.ts#L48)

___

### t

• **t**: `string`

#### Defined in

[studio/src/types/index.ts:50](https://github.com/ncounterspecialist/twick/blob/4f6ff1e413da0a811994ab66a7c9586f7594c61a/packages/studio/src/types/index.ts#L50)

___

### w

• `Optional` **w**: `number`[]

Optional per-word start times in seconds (relative to full media timeline).
When present, consumers can use this for precise karaoke-style word timing.

#### Defined in

[studio/src/types/index.ts:55](https://github.com/ncounterspecialist/twick/blob/4f6ff1e413da0a811994ab66a7c9586f7594c61a/packages/studio/src/types/index.ts#L55)
