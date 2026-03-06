# @twick/workflow

Workflow builders and appliers that bridge normalized AI outputs with Twick timeline/project data.

## Purpose

- Keep provider and model contracts in `@twick/ai-models`
- Keep schema, serialization, and core editor behavior in `@twick/timeline`
- Use `@twick/workflow` as the integration layer that:
  - builds `ProjectJSON` from normalized results
  - applies patches to project data
  - applies patches through `TimelineEditor`

## Core API

```ts
import {
  buildCaptionProject,
  applyCaptionsToProject,
  buildProjectFromTemplateSpec,
} from "@twick/workflow";

const project = buildCaptionProject({
  videoUrl: "https://cdn.example.com/video.mp4",
  durationSec: 12,
  captions: [
    { t: "Hello world", s: 0, e: 1400 },
    { t: "This is Twick", s: 1500, e: 2900 },
  ],
});

const updated = applyCaptionsToProject(project, {
  captions: [{ t: "New caption", s: 3000, e: 4200 }],
  insertionStartSec: 3,
  insertionEndSec: 5,
});

const templated = buildProjectFromTemplateSpec({
  width: 720,
  height: 1280,
  tracks: [],
});
```

## Notes

- Legacy flows can continue to work through compatibility wrappers.
- New AI integrations should prefer `@twick/ai-models` + `@twick/workflow`.
