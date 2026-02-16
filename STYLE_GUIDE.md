# Twick Style Guide

This document describes the coding conventions used in the Twick monorepo. Follow these patterns so new code stays consistent with the existing codebase.

## Naming conventions

### Classes

- Use **PascalCase** for class names.
- Use **PascalCase** for file names when the file exports a single main class (e.g. `track.ts` for `Track`, `element-serializer.ts` for `ElementSerializer`).

```ts
export class Track { ... }
export class ElementController { ... }
export abstract class TrackElement { ... }
```

### Interfaces and types

- Use **PascalCase** for interfaces and type aliases.
- Prefer `interface` for object shapes; use `type` for unions, aliases, and composite props.

```ts
export interface Position {
  x: number;
  y: number;
}

export interface ElementJSON { ... }

export type TrackType = (typeof TRACK_TYPES)[keyof typeof TRACK_TYPES];

export type TextPanelProps = TextPanelState & TextPanelActions;
```

### Constants

- Use **UPPER_SNAKE_CASE** for exported constant objects and primitive constants.
- Use `as const` when you need literal types.

```ts
export const TRACK_TYPES = {
  VIDEO: "video",
  ELEMENT: "element",
} as const;

export const WORDS_PER_PHRASE = 4;
```

### Variables, functions, and methods

- Use **camelCase** for variables, function names, and method names.

```ts
const elementController = new ElementController();
const minDist = thresholdSec;

getCurrentElements(tracks);
convertToVideoPosition(x, y, metadata, size);
```

### React components

- Use **PascalCase** for component names.
- Props types: **PascalCase** with a `Props` suffix (e.g. `TextPanelProps`).

```tsx
export type TextPanelProps = TextPanelState & TextPanelActions;

export function TextPanel({ textContent, fontSize, ... }: TextPanelProps) {
  return ( ... );
}
```

### React hooks

- Use **camelCase** with a `use` prefix (e.g. `useTextPanel`, `useTwickCanvas`).

```ts
export const useTextPanel = ({ selectedElement, addElement, updateElement }) => { ... };
export const useTwickCanvas = ({ width, height, ... }) => { ... };
```

### File and folder names

- Use **kebab-case** for file and folder names.
- Use descriptive suffixes when helpful: `.element.ts`, `.controller.ts`, `.util.ts`, `use-*.ts`.

Examples:

- `use-text-panel.ts`
- `element.controller.ts`
- `canvas.util.ts`
- `element-serializer.ts`
- `text-panel.tsx`

---

## Function declarations

- Prefer **`const` arrow functions** for most functions (utils, hooks, handlers, helpers).

```ts
export const snapTime = (
  time: number,
  targets: number[],
  thresholdSec: number = 0.1
): SnapResult => { ... };

export const useTextPanel = ({ ... }): TextPanelState & TextPanelActions => { ... };

export const convertToVideoPosition = (
  x: number,
  y: number,
  canvasMetadata: CanvasMetadata,
  videoSize: Size
): Position => { ... };
```

- **`function` declarations** are acceptable for:
  - Top-level exported pure functions (e.g. in small utility modules).
  - React function components, when you prefer `function ComponentName()` over `const ComponentName = () =>`.

```ts
export function snapTime(time: number, targets: number[], thresholdSec = 0.1): SnapResult {
  ...
}

export function TextPanel(props: TextPanelProps) {
  ...
}
```

- Use **arrow functions** for inline callbacks and non-exported helpers to keep style consistent.

---

## TypeScript

### Imports

- Use **`import type`** when importing only types or interfaces.

```ts
import type { CanvasElementHandler } from "../types";
import type { ElementVisitor } from "../visitor/element-visitor";
import { Track } from "../core/track/track";
```

- Prefer **named exports** for public API. Use **default export** only for single primary exports (e.g. a singleton or the main hook/component of a file).

```ts
export { useTwickCanvas } from "./hooks/use-twick-canvas";
export { default as elementController } from "./controllers/element.controller";
```

### Typing

- Avoid `any` where possible; use `unknown` or proper types.
- Use **optional chaining** and **nullish coalescing** for safe defaults: `props?.x ?? 0`.
- Export types that are part of the public API from package `index.ts` (e.g. `export type { CanvasProps, ... } from "./types"`).

---

## Formatting

- **Indent:** 2 spaces.
- **Strings:** Double quotes `"` for consistency with the majority of the codebase.
- **Semicolons:** Use semicolons at the end of statements.
- **Line length:** Prefer readable line length; break long lines rather than exceeding ~100–120 characters when it hurts readability.

---

## Documentation

- Add **JSDoc** for public APIs: exported functions, classes, hooks, and non-obvious types.
- Include `@param`, `@returns`, and `@example` where they help (especially for utilities and shared hooks).

```ts
/**
 * Snaps a time value to the nearest target within the threshold.
 *
 * @param time - The candidate time in seconds
 * @param targets - Array of snap target times in seconds
 * @param thresholdSec - Maximum distance (in seconds) to snap. Default 0.1.
 * @returns SnapResult with time, didSnap, and optional snapTarget
 *
 * @example
 * ```ts
 * snapTime(5.07, [0, 5, 10], 0.1)  // { time: 5, didSnap: true, snapTarget: 5 }
 * ```
 */
export const snapTime = ( ... ) => { ... };
```

- React components can document props in JSDoc (see `text-panel.tsx` for an example).

---

## Code organization

### Package layout

- **`src/`** – Source code.
- **`src/index.ts`** – Public API: re-export types, constants, hooks, and main APIs. Keep implementation in other files.
- Group by concern: **`hooks/`**, **`helpers/`**, **`components/`**, **`controllers/`**, **`elements/`**, **`utils/`**, **`context/`** as needed.

### Within a file

- Put imports first (group: external, then internal; `import type` can be with other imports or grouped separately).
- Then constants and types, then main implementation, then exports (or use `export` inline).

### Handlers and elements

- Canvas/visualizer **element handlers** are often objects keyed by type with methods (e.g. `add`, `updateFromFabricObject`), exported as `const XxxElement: CanvasElementHandler = { ... }`.
- **Controllers** that act as registries (e.g. `ElementController`) are implemented as classes and may be exported as a singleton default plus the class.

---

## React-specific

- Use **function components** (either `function Name` or `const Name = () =>`).
- Keep components focused; extract logic into **custom hooks** (e.g. `useTextPanel`, `useTwickCanvas`).
- Props: define with **interfaces or types** in PascalCase (e.g. `TextPanelProps`) and use them in the component signature.
- Prefer **named exports** for components and hooks; use default export only when a file has a single primary export (e.g. a page or app root).

---

## Summary checklist

- [ ] **Classes:** PascalCase
- [ ] **Interfaces/types:** PascalCase; `interface` for objects, `type` for unions/aliases
- [ ] **Constants:** UPPER_SNAKE_CASE; `as const` where needed
- [ ] **Variables, functions, methods:** camelCase
- [ ] **React components:** PascalCase; props type with `Props` suffix
- [ ] **Hooks:** camelCase with `use` prefix
- [ ] **Files/folders:** kebab-case
- [ ] **Functions:** Prefer `const fn = (): ReturnType =>`; `function` allowed for components and some pure utils
- [ ] **Imports:** `import type` for type-only imports
- [ ] **Strings:** Double quotes; semicolons; 2-space indent
- [ ] **Public API:** JSDoc with `@param`, `@returns`, `@example` where helpful

For the contribution workflow (issues, PRs, commits), see [CONTRIBUTING.md](./CONTRIBUTING.md).
