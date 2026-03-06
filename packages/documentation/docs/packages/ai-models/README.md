# @twick/ai-models

Model catalog, provider adapters, and orchestration primitives for Twick generative integrations.

## What is included

1. Existing model catalog exports (`FAL_*`, `RUNWARE_*`, `ALL_MODELS`)
2. Provider adapter interface for generation workflows (caption, voice, avatar, media)
3. Multi-provider orchestration with unified job status and fallback
4. Job store interface with in-memory implementation
5. Timeline injection helpers to normalize provider output into patch contracts
6. Caption normalization helpers for legacy cloud payloads

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
registry.setProviderConfig({ provider: "fal", apiKey: process.env.FAL_KEY });
registry.setProviderConfig({ provider: "runware", apiKey: process.env.RUNWARE_KEY });

const orchestrator = new GenerationOrchestrator(registry, new InMemoryJobStore());

const voiceJob = await orchestrator.createJob({
  type: "voice",
  provider: "fal",
  fallbackProviders: ["runware"],
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

## Notes

- Implement `ProviderAdapter` for each production provider (e.g. Sora, HeyGen, ElevenLabs).
- `GenerationOrchestrator` is backend-oriented and can run in cloud functions or Node services.
