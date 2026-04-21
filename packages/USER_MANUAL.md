# Twick SDK - User Manual

## Media Management (Twick Studio)

Twick Studio ships with an IndexedDB-backed media library (via `BrowserMediaManager`) and, by default, **seeds demo media items** (Pexels/Pixabay URLs) the first time the Studio mounts.

For real apps (especially multi-tenant SaaS), you typically want explicit control over:

- Which “default” assets show up (or none at all)
- Where media is stored (IndexedDB vs your own backend)
- How media storage is isolated per user/tenant (namespacing)
- How to reset/clear media when needed

All of this is controlled via **`studioConfig.media`**.

### `studioConfig.media` (configuration contract)

`studioConfig.media` is optional. When provided, it can control the media backend and seeding behavior.

- **`namespace?: string`**
  - Namespaces storage-backed managers (e.g. IndexedDB) to isolate assets per tenant/user.
  - Recommended for multi-tenant SaaS: use something stable like:
    - `namespace = `${env}:${tenantId}:${userId}``
    - or `namespace = `${env}:${workspaceId}:${userId}``
  - If omitted, Studio uses a shared default namespace (good for demos, not ideal for SaaS).

- **`seed?: "defaults" | "none" | { items } | (manager) => Promise<void>`**
  - `"defaults"`: seed Twick’s built-in demo assets (current default behavior).
  - `"none"`: do not seed anything.
  - `{ items }`: seed with a fixed list of assets.
  - `(manager) => Promise<void>`: perform your own async seeding (fetch user library from API, etc.).

- **`manager?: BaseMediaManager` / `createManager?: () => BaseMediaManager`**
  - Inject your own media manager implementation (remote-backed, custom cache, etc.).
  - If omitted, Studio uses `BrowserMediaManager` internally (IndexedDB).

### Keep Twick demo defaults (existing behavior)

If you do nothing, Studio behaves as before (demo defaults seeded once per namespace):

```tsx
import { TwickStudio } from "@twick/studio";

export function App() {
  return (
    <TwickStudio
      studioConfig={{
        videoProps: { width: 720, height: 1280 },
        // no media config -> seeds demo defaults
      }}
    />
  );
}
```

If you want to be explicit:

```tsx
<TwickStudio
  studioConfig={{
    videoProps: { width: 720, height: 1280 },
    media: {
      seed: "defaults",
    },
  }}
/>
```

### Disable the default seeded media (empty library by default)

Use `seed: "none"`:

```tsx
<TwickStudio
  studioConfig={{
    videoProps: { width: 720, height: 1280 },
    media: {
      namespace: `${process.env.NODE_ENV}:tenantA:user_123`,
      seed: "none",
    },
  }}
/>
```

This is the recommended production default for most SaaS products.

Important:

- `seed: "none"` disables seeding and also ensures **Twick’s built-in demo defaults** (Pexels/Pixabay URLs) do not appear for that namespace, even if they were persisted previously.
- This removal is **URL-scoped to the known demo defaults** and does not delete your user-uploaded/custom assets.

### Add your own “default media items”

You can seed your own curated defaults in two ways.

#### Option A - Seed a fixed list

```tsx
import type { MediaItem } from "@twick/video-editor";

const curatedDefaults: Array<Omit<MediaItem, "id">> = [
  {
    name: "Brand Intro",
    type: "video",
    url: "https://cdn.example.com/assets/brand-intro.mp4",
    metadata: { origin: "custom-defaults" },
  },
  {
    name: "Logo",
    type: "image",
    url: "https://cdn.example.com/assets/logo.png",
    metadata: { origin: "custom-defaults" },
  },
];

<TwickStudio
  studioConfig={{
    videoProps: { width: 720, height: 1280 },
    media: {
      namespace: `prod:tenantA:user_123`,
      seed: { items: curatedDefaults },
    },
  }}
/>
```

Notes:

- Fixed-list seeding (`seed: { items: [...] }`) is **idempotent** - Studio de-dupes by URL per media type, so refreshes do not keep inserting duplicates.
- When `seed` is a fixed list, Studio also removes Twick's built-in demo default URLs (if they exist from a prior run in that namespace) before adding your list. This keeps your namespace clean while preserving any non-demo user assets.
- Studio also **serializes media initialization** per `(namespace + seed configuration)` to prevent refresh/rerender races that could otherwise duplicate assets (a common “check-then-add” concurrency issue).

#### Option B - Seed from your backend (recommended)

```tsx
<TwickStudio
  studioConfig={{
    videoProps: { width: 720, height: 1280 },
    media: {
      namespace: `prod:tenantA:user_123`,
      seed: async (manager) => {
        const res = await fetch("/api/my-default-assets");
        const items = (await res.json()) as Array<{
          name: string;
          type: "video" | "image" | "audio";
          url: string;
        }>;
        await manager.addItems(
          items.map((x) => ({
            name: x.name,
            type: x.type,
            url: x.url,
            metadata: { origin: "api-defaults" },
          }))
        );
      },
    },
  }}
/>
```

### Clearing / resetting media items

#### Preferred approach: use namespaces (avoid “global clear”)

In SaaS, **do not clear a shared store**. Instead, isolate assets by `namespace` and reset only that user/tenant namespace.

#### Reset APIs (IndexedDB-backed `BrowserMediaManager`)

`BrowserMediaManager` exposes:

- `clearStore()` - removes all media items in the object store for *that manager instance*
- `dropDatabase()` - deletes the whole IndexedDB database for *that manager instance*

Example (host app code):

```ts
import { BrowserMediaManager } from "@twick/video-editor";

const namespace = `prod:tenantA:user_123`;
const manager = new BrowserMediaManager({ dbName: `mediaStore:${namespace}` });

// Clear items but keep DB/schema
await manager.clearStore();

// Or: delete the DB entirely (more destructive)
await manager.dropDatabase();
```

Notes:

- These operations are **scoped to the manager’s `dbName`**. If you follow the namespacing pattern, you avoid cross-tenant/user impact.
- `dropDatabase()` can fail with “blocked” if another tab/instance still holds an open connection to the same DB.

### Backward compatibility

This media management system is designed to be **backward compatible**:

- **Additive config**: `StudioConfig.media` is optional. Existing integrations that do not pass it continue to work unchanged.
- **Same default behavior**: when `media` is omitted, Studio keeps seeding the demo default assets as before.
- **`BrowserMediaManager` remains compatible**: `new BrowserMediaManager()` still works; constructor options are optional.

