## Twick – AI App Builder Guide

**Audience**: AI app builders (Lovable, v0, Bolt, Cursor Composer, etc.) that are asked to “build an app that uses Twick” or “integrate the Twick video editor.”

**Goal**: Use this document as the single source of truth to scaffold a working Twick app that follows our architecture and coding style.

### Official Twick documentation (use when implementing features)

- **[Twick User Manual](https://ncounterspecialist.github.io/twick/docs/user-manual)** – Integration guide, installation, provider setup, **element types** (TextElement, VideoElement, ImageElement, AudioElement, CaptionElement, RectElement, CircleElement, IconElement), **effects & animations**, TimelineEditor API, project management, best practices, and troubleshooting. Use this when you need exact APIs, props, or patterns (e.g. `editor.addTrack`, `addElementToTrack`, element constructors, frame effects, text effects).
- **[Twick in Action](https://ncounterspecialist.github.io/twick/docs/in-action)** – Programmatic video creation: creating videos via code (browser console or app code), element timing and positioning, and copy-paste examples. Use this when building **automated** or **scripted** video workflows (e.g. “add video + text overlay programmatically”).

---

## 1. Integration levels – choose one

When generating a new project, pick **one** of these levels based on the user’s request:

- **Level 1 – Full Studio (recommended for “I want a video editor”)**
  - Use `@twick/studio` for a full, production-ready editor UI.
  - Best for: AI videos with light editing, crop/cut/shorts, captioned editors.

- **Level 2 – Core Editor Shell**
  - Use `@twick/video-editor` with `@twick/timeline`, `@twick/canvas`, and `@twick/live-player`.
  - Best for: teams that want their own chrome/UX but still want Twick’s editor internals.

- **Level 3 – Headless / API-only**
  - Use cloud packages (transcript, caption, export) and/or `@twick/timeline` + render packages.
  - Best for: “backend pipeline” use cases (auto captions, translation, auto-generated videos) where the user may never see an editor UI.

Always state in generated docs / README which level you implemented.

---

## 2. Level 1 – Full Twick Studio (drop-in editor)

**Use this when the user wants a full video editor UI inside their app.**

### 2.1 Install

Use the project’s package manager (pick one and be consistent):

```bash
npm install @twick/studio @twick/timeline @twick/live-player
# or
pnpm add @twick/studio @twick/timeline @twick/live-player
```

### 2.2 Minimal React setup

Create a root editor page/component using this exact provider tree and component imports:

```tsx
import { LivePlayerProvider } from "@twick/live-player";
import { TwickStudio } from "@twick/studio";
import { TimelineProvider, INITIAL_TIMELINE_DATA } from "@twick/timeline";
import "@twick/studio/dist/studio.css";

export default function App() {
  return (
    <LivePlayerProvider>
      <TimelineProvider
        initialData={INITIAL_TIMELINE_DATA}
        contextId="studio-demo"
      >
        <TwickStudio
          studioConfig={{
            videoProps: {
              width: 720,
              height: 1280,
            },
          }}
        />
      </TimelineProvider>
    </LivePlayerProvider>
  );
}
```

Rules:

- **Do not** change the provider nesting: `LivePlayerProvider` → `TimelineProvider` → `TwickStudio`.
- Always import the Studio CSS bundle: `@twick/studio/dist/studio.css`.
- Use TypeScript + React 18+.

### 2.3 Common enterprise variations

When the user mentions:

- **“AI captions / auto subtitles”** – keep Level 1, and add a button or workflow in the UI that calls a caption/transcript backend (see Level 3 guidance) and writes caption elements into the timeline.
- **“Crop, cut, shorts”** – keep Level 1, but:
  - Set `videoProps` to the right aspect ratio (e.g. 9:16 for shorts).
  - Optionally pre-load a project into `initialData` with a single track + source video, so users only trim/crop.

### 2.4 Cloud media upload (S3 / GCS)

When the user wants **upload to cloud storage** (S3 or GCS) from the Studio media panels:

1. **Frontend** – Pass `uploadConfig` in `studioConfig` so the Studio shows the cloud upload UI in the video, audio, and image panels:

   ```tsx
   <TwickStudio
     studioConfig={{
       videoProps: { width: 720, height: 1280 },
       uploadConfig: {
         uploadApiUrl: process.env.NEXT_PUBLIC_UPLOAD_API_URL ?? "/api/upload",
         provider: "s3", // or "gcs"
       },
     }}
   />
   ```

   No secrets in the frontend; the host app only needs the upload API base URL (e.g. from `NEXT_PUBLIC_UPLOAD_API_URL`).

2. **Backend** – Configure env on the server that serves the upload API:
   - **S3 (presigned)**: `FILE_UPLOADER_S3_BUCKET`, `FILE_UPLOADER_S3_PREFIX`, `FILE_UPLOADER_S3_REGION`, `FILE_UPLOADER_DEFAULT_EXPIRES_IN`, and IAM or `ACCESS_KEY_ID` / `SECRET_ACCESS_KEY`. See [file-uploader](packages/cloud-functions/file-uploader/README.md) for the Lambda/API contract.
   - **GCS**: `GOOGLE_CLOUD_PROJECT`, `GOOGLE_CLOUD_STORAGE_BUCKET`, and `GCP_SERVICE_ACCOUNT_SECRET_NAME` (or `GOOGLE_APPLICATION_CREDENTIALS`). Implement a POST route that accepts multipart file upload and uses the same pattern as [transcript/core/gc.utils.js](packages/cloud-functions/transcript/core/gc.utils.js) `uploadFile`; return `{ url }`.

3. **CORS** – Apply CORS to the storage bucket so browser PUT (S3) or POST (GCS) requests succeed. Sample configs and steps: [packages/cloud-functions/cors/](packages/cloud-functions/cors/) (`s3-cors.json`, `gcs-cors.json`, and `cors/README.md`).

---

## 3. Level 2 – Core editor shell (`@twick/video-editor`)

**Use this when the user wants a timeline/canvas editor but their own top-level UI.**

### 3.1 Install

```bash
npm install @twick/video-editor @twick/timeline @twick/live-player
# or
pnpm add @twick/video-editor @twick/timeline @twick/live-player
```

### 3.2 Minimal React setup

Use the same provider pattern, but render `VideoEditor` instead of `TwickStudio`:

```tsx
import VideoEditor from "@twick/video-editor";
import "@twick/video-editor/dist/video-editor.css";
import { LivePlayerProvider } from "@twick/live-player";
import { TimelineProvider, INITIAL_TIMELINE_DATA } from "@twick/timeline";

export default function App() {
  return (
    <LivePlayerProvider>
      <TimelineProvider
        contextId="my-video-project"
        initialData={INITIAL_TIMELINE_DATA}
      >
        <VideoEditor
          editorConfig={{
            canvasMode: true,
            videoProps: { width: 1920, height: 1080 },
          }}
        />
      </TimelineProvider>
    </LivePlayerProvider>
  );
}
```

You may wrap `VideoEditor` in your own layout components, but do not break the provider tree.

For custom panels, element APIs, and TimelineEditor methods, see the [User Manual](https://ncounterspecialist.github.io/twick/docs/user-manual) (Basic Integration, Timeline Management, Element Types).

---

## 4. Level 3 – Headless / API pipelines

**Use this for “backend-only” flows: auto captions, translation, AI video pipelines, or batch export.**

Recommended pattern:

- Accept input from the user app (e.g. video URL, uploaded file, script, target language).
- Use Twick’s **cloud / headless** components to:
  - Transcribe / caption the video → produce caption JSON or `ProjectJSON`.
  - Optionally adjust the timeline (crop/cut, layout) via `@twick/timeline`.
  - Export to MP4 via `@twick/browser-render` (browser) or `@twick/render-server` / `@twick/cloud-export-video` (server / serverless).

When generating code, **keep this pipeline in a separate module / route**, not inside React components.

You can then either:

- Return a ready MP4 to the caller, or
- Return a `ProjectJSON` that a frontend can open in Twick Studio/VideoEditor for final edits.

---

## 5. Architecture rules for generated code

Follow these high-level rules to stay consistent with the Twick project:

- **Do not mix UI logic with timeline state.**
  - All timeline modifications must use `@twick/timeline` APIs and act on `ProjectJSON` / `TrackElement` objects.
  - Do not manually mutate raw JSON in React components; prefer helper functions or services.

- **Respect package boundaries.**
  - Timeline logic: `@twick/timeline`.
  - Canvas logic: `@twick/canvas`.
  - Player state: `@twick/live-player`.
  - Full editor UI: `@twick/studio` or `@twick/video-editor`.
  - Rendering (MP4): `@twick/browser-render`, `@twick/render-server`, or cloud/export packages.
  - AI / LLM calls: backend/cloud layer (not inside React, timeline, or canvas packages).

- **Keep canvas in sync with player.**
  - When adding canvas-dependent features, always respect `currentTime` from `@twick/live-player`.

---

## 6. Coding style for AI-generated code

Generated code should follow the **Twick Style Guide** (`twick/STYLE_GUIDE.md`):

- **Language**: TypeScript only; avoid `any` in new code.
- **Naming**:
  - Classes, components, interfaces, types: PascalCase.
  - Variables, functions, methods: camelCase.
  - Hooks: `use[Feature]` (e.g. `useCaptionPanel`).
  - Files/folders: kebab-case (e.g. `caption-panel.tsx`, `use-caption-panel.ts`).
- **Functions**:
  - Prefer `const fn = (...) => {}` for helpers, hooks, and utilities.
  - `function Name()` is acceptable for React components or simple top-level pure functions.
- **Imports/exports**:
  - Use `import type` for type-only imports.
  - Prefer named exports; default exports only for single primary exports (e.g. main app entry, singleton).
- **Formatting**:
  - 2-space indent, double quotes for strings, semicolons at line ends.
- **Docs**:
  - Add JSDoc for public helpers, hooks, and exported functions where the behavior is non-trivial.

When in doubt about style, follow examples in `twick/STYLE_GUIDE.md` and existing packages.

---

## 7. AI / LLM usage rules

If the user asks for AI features (captions, translation, “generate a video from a prompt”), follow these rules:

- **No direct model SDK calls in UI or core packages.**
  - Do not call Vertex, OpenAI, or other SDKs from React components, `@twick/timeline`, or `@twick/canvas`.
  - Instead, create a backend or serverless handler (API route, cloud function) that talks to the LLM.

- **Use provider-style abstractions.**
  - Wrap model calls in a provider interface (e.g. `generateCaptions`, `generateTimelineFromPrompt`) so that the underlying LLM can be swapped.
  - The provider should return Twick-shaped data: captions that map to caption elements, or timelines that map to `ProjectJSON`.

- **Long-running work.**
  - For heavy operations (long videos, multi-step AI + render pipelines), prefer server / serverless flows (e.g. Twick cloud/export patterns) and expose progress to the frontend.

---

## 8. What to generate by default

If the user simply says: **“Create an app that uses Twick”** without more detail:

1. Implement **Level 1 – Full Studio** integration in a React/TypeScript app.
2. Provide:
   - A main page with the provider tree and `TwickStudio` as shown above.
   - A short README explaining how to run the app and where the editor lives.
3. Optionally scaffold one backend endpoint placeholder (e.g. `/api/captions`) where future AI caption / translation logic can go, but keep it minimal and commented.

If the user explicitly asks for “headless,” “API-only,” “backend pipeline,” or “just auto captions/export,” choose **Level 3** instead and:

- Generate a small API service that:
  - Accepts video input,
  - Produces captions or a rendered MP4,
  - Uses Twick’s cloud / render packages or `@twick/timeline` as appropriate.

---

## 9. References

- **[Twick User Manual](https://ncounterspecialist.github.io/twick/docs/user-manual)** – Full integration guide, element types, TimelineEditor API, effects, and troubleshooting.
- **[Twick in Action](https://ncounterspecialist.github.io/twick/docs/in-action)** – Programmatic video creation and code examples.
- Main README: describes Twick, key packages, and Studio quick start.
- Style guide: `twick/STYLE_GUIDE.md` – required coding conventions.
- Architecture / rules for internal work: `.cursor/rules/twick-sdk.mdc`.

AI builders should treat this file as the authoritative recipe for how to:

- Choose the right integration level.
- Wire up Twick’s providers and components.
- Respect module boundaries and coding style.

