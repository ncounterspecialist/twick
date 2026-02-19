/**
 * Unit tests for video generator logic.
 * Tests validation via validateVideoParams.
 */
import { test } from "node:test";
import { strict as assert } from "node:assert";
import { validateVideoParams } from "../core/validate.js";

test("validateVideoParams - missing provider returns error", () => {
  const result = validateVideoParams({
    endpointId: "fal-ai/veo3",
    prompt: "test",
  });
  assert.strictEqual(result.valid, false);
  assert.ok(result.error?.includes("required"));
});

test("validateVideoParams - missing endpointId returns error", () => {
  const result = validateVideoParams({
    provider: "fal",
    prompt: "test",
  });
  assert.strictEqual(result.valid, false);
  assert.ok(result.error?.includes("required"));
});

test("validateVideoParams - missing prompt returns error", () => {
  const result = validateVideoParams({
    provider: "fal",
    endpointId: "fal-ai/veo3",
  });
  assert.strictEqual(result.valid, false);
  assert.ok(result.error?.includes("required"));
});

test("validateVideoParams - runware provider returns not implemented", () => {
  const result = validateVideoParams({
    provider: "runware",
    endpointId: "runware/some-model",
    prompt: "test",
  });
  assert.strictEqual(result.valid, false);
  assert.ok(
    result.error?.toLowerCase().includes("runware") || result.error?.includes("not")
  );
});

test("validateVideoParams - unsupported provider returns error", () => {
  const result = validateVideoParams({
    provider: "unknown",
    endpointId: "some/endpoint",
    prompt: "test",
  });
  assert.strictEqual(result.valid, false);
  assert.ok(result.error?.includes("Unsupported") || result.error?.includes("fal"));
});

test("validateVideoParams - valid fal params returns valid", () => {
  const result = validateVideoParams({
    provider: "fal",
    endpointId: "fal-ai/veo3",
    prompt: "test",
  });
  assert.strictEqual(result.valid, true);
  assert.strictEqual(result.error, undefined);
});
