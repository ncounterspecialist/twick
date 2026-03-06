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

## Notes

- Implement `ProviderAdapter` for each production provider (e.g. Sora, HeyGen, ElevenLabs).
- `GenerationOrchestrator` is backend-oriented and can run in cloud functions or Node services.
