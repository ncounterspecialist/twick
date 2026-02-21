# @twick/cloud-generate-media

Twick cloud functions for generative AI image and video via FAL and Runware. Invoked by the execute-job handler.

## Image vs Video Invocation

| Job Type         | Invocation | Flow                                                                 |
|------------------|------------|----------------------------------------------------------------------|
| `generate-image` | **Sync**   | Execute-job invokes handler-image, waits for result, logs to request-log |
| `generate-video` | **Async**  | Execute-job invokes handler-video (Event), returns immediately; video Lambda updates request-log on completion |

## Environment Variables

- `FAL_KEY` – Required for FAL provider. Use Secrets Manager or Lambda env.
- `RUNWARE_KEY` – Optional; Runware not yet implemented.
- `GRAPHQL_API_URL`, `GRAPHQL_API_KEY` – Required for video async flow. Used by video Lambda to update request-log on completion.

## Request-Log Update (Video)

When the video Lambda finishes, it calls the GraphQL API to update the request-log entry:

- **Success:** `status: "completed"`, `response.payload: { url, duration? }`
- **Failure:** `status: "failed"`, `response.payload: { error }`

The client polls `GET /api/request-log/{requestId}` and reads `data.url` or `data.error`.

## Handlers

- **platform/aws/handler-image.js** – Image generation (sync)
- **platform/aws/handler-video.js** – Video generation (async + request-log update)

## Core Exports

- `core/generator-image.js` – `generateImage(params)` → `{ url } | { error }`
- `core/generator-video.js` – `generateVideo(params)` → `{ url, duration? } | { error }`

## Input Payload (Image)

```json
{
  "provider": "fal",
  "endpointId": "fal-ai/flux/dev",
  "prompt": "a red apple",
  "image_url": "https://...",
  "width": 1024,
  "height": 1024,
  "steps": 28,
  "guidance_scale": 3.5,
  "negative_prompt": "blurry"
}
```

## Input Payload (Video)

```json
{
  "requestId": "uuid-for-polling",
  "provider": "fal",
  "endpointId": "fal-ai/veo3",
  "prompt": "a red apple rolling",
  "image_url": "https://...",
  "duration": 5,
  "fps": 24
}
```

## Tests

```bash
pnpm test
```

Runs unit tests for validation logic (no FAL/Runware API calls).
