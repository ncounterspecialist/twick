# @twick/ai-models

Model catalog and types for Twick generative AI integration. No UI or SDK dependencies.

## Exports

### Types

- `ModelInfo` – Endpoint metadata (provider, endpointId, label, category, dimensions, etc.)
- `ModelDimension` – `{ width, height, label, preset? }`
- `AIModelCategory` – `"image" | "video" | "music" | "voiceover"`
- `AIModelProvider` – `"fal" | "runware"`
- `IGenerationPollingResponse` – `{ status, url?, duration?, error? }`

### Catalog

- `FAL_IMAGE_ENDPOINTS`, `FAL_VIDEO_ENDPOINTS`, `FAL_ENDPOINTS`
- `RUNWARE_IMAGE_ENDPOINTS`, `RUNWARE_VIDEO_ENDPOINTS`, `RUNWARE_ENDPOINTS`
- `ALL_MODELS`

## Usage

```ts
import {
  ModelInfo,
  IGenerationPollingResponse,
  FAL_IMAGE_ENDPOINTS,
  FAL_VIDEO_ENDPOINTS,
} from "@twick/ai-models";

// Use in Studio UI for model picker
const models = FAL_IMAGE_ENDPOINTS.filter((m) => m.category === "image");
```

## Model Sync Scripts

To keep the catalog in sync with provider APIs, port and run from videosos-main:

- **FAL:** `scripts/update-fal-endpoints.ts` – fetches available endpoints from FAL API
- **Runware:** `scripts/merge-runware-models.ts` – merges Runware model list

These scripts should write updated catalog entries into `src/catalog.ts`.
