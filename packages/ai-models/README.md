# @twick/ai-models

Provider adapters and orchestration primitives for Twick generative AI integrations.

## What is included

1. Provider adapter interface for generation workflows (caption, voice, avatar, media)
2. Multi-provider orchestration with unified job status and fallback
3. Job store interface with in-memory implementation
4. Timeline injection helpers to normalize provider output into patch contracts
5. Caption normalization helpers for legacy cloud payloads
6. Types for `ModelInfo`, `AIModelProvider`, and patch/result DTOs (apps supply model lists via services)

## Core API

```ts
import {
  ProviderRegistry,
  GenerationOrchestrator,
  InMemoryJobStore,
  type ProviderAdapter,
  toTimelinePatch,
} from "@twick/ai-models";

const registry = new ProviderRegistry();
const voiceAdapter: ProviderAdapter = /* your implementation */;
const avatarAdapter: ProviderAdapter = /* your implementation */;

registry.registerAdapter(voiceAdapter);
registry.registerAdapter(avatarAdapter);
registry.setProviderConfig({ provider: "your-provider", apiKey: process.env.API_KEY });

const orchestrator = new GenerationOrchestrator(registry, new InMemoryJobStore());

const voiceJob = await orchestrator.createJob({
  type: "voice",
  provider: "your-provider",
  fallbackProviders: [],
  input: {
    text: "Welcome to this lesson.",
    language: "en-US",
    voiceId: "narrator-1",
  },
});

const completed = await orchestrator.dispatch(voiceJob.id);
const patch = toTimelinePatch(completed);
```

## Why this matters

This provides a provider-agnostic backend layer so Twick apps can:

1. Integrate different caption/voice/avatar/media APIs behind one contract
2. Add fallback between providers without changing app-level flow
3. Keep timeline/caption/export pipeline stable while swapping models
4. Feed normalized patch data into `@twick/workflow` for project/timeline application

## Built-in providers

### TwelveLabs (Pegasus captions)

`TwelveLabsAdapter` is an opt-in adapter that generates time-aligned captions
straight from a video URL using [TwelveLabs](https://twelvelabs.io) Pegasus
video understanding — no separate transcription step. It implements the same
`ProviderAdapter` contract and is registered like any other provider, so
defaults and existing flows are unaffected.

```ts
import {
  ProviderRegistry,
  GenerationOrchestrator,
  TwelveLabsAdapter,
  toTimelinePatch,
} from "@twick/ai-models";

const registry = new ProviderRegistry();
registry.registerAdapter(new TwelveLabsAdapter());
registry.setProviderConfig({
  provider: "twelvelabs",
  apiKey: process.env.TWELVELABS_API_KEY,
});

const orchestrator = new GenerationOrchestrator(registry);

const job = await orchestrator.createJob({
  type: "caption",
  provider: "twelvelabs",
  input: { videoUrl: "https://example.com/clip.mp4", language: "en" },
});

const completed = await orchestrator.dispatch(job.id);
const patch = toTimelinePatch(completed); // TimelineCaptionPatch
```

Captions are produced asynchronously: `startJob` creates a Pegasus analyze task
(`POST /analyze/tasks`, `time_based_metadata` mode) and the orchestrator polls
`getJobStatus` (`GET /analyze/tasks/{id}`) until the task is `ready`. Grab a free
API key at [twelvelabs.io](https://twelvelabs.io) — there is a generous free tier.

## Notes

- Implement `ProviderAdapter` for each production provider (e.g. Sora, HeyGen, ElevenLabs).
- `GenerationOrchestrator` is backend-oriented and can run in cloud functions or Node services.
