import assert from "node:assert/strict";
import { test } from "node:test";

import { parseCaptionData } from "./twelvelabs-adapter";

test("parseCaptionData converts Pegasus segments into sorted TimedTextSegments", () => {
  const data = JSON.stringify({
    caption: [
      { start_time: 2.5, end_time: 4, metadata: { text: "Second line" } },
      { start_time: 0, end_time: 2, metadata: { text: "First line" } },
    ],
  });

  const segments = parseCaptionData(data);

  assert.deepEqual(segments, [
    { text: "First line", startMs: 0, endMs: 2000 },
    { text: "Second line", startMs: 2500, endMs: 4000 },
  ]);
});

test("parseCaptionData falls back to the first string metadata field", () => {
  const data = JSON.stringify({
    caption: [{ start_time: 0, end_time: 1, metadata: { label: "Intro" } }],
  });

  assert.deepEqual(parseCaptionData(data), [
    { text: "Intro", startMs: 0, endMs: 1000 },
  ]);
});

test("parseCaptionData drops empty/textless segments and tolerates bad JSON", () => {
  assert.deepEqual(parseCaptionData("not json"), []);
  assert.deepEqual(
    parseCaptionData(JSON.stringify({ caption: [{ start_time: 0, end_time: 1 }] })),
    []
  );
});
