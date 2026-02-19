/**
 * Unit tests for image generator logic.
 * Tests validation via generateImage and via validateImageParams.
 */
import { test } from "node:test";
import { strict as assert } from "node:assert";
import { validateImageParams } from "../core/validate.js";

test("validateImageParams - missing provider returns error", () => {
  const result = validateImageParams({
    endpointId: "fal-ai/flux/dev",
    prompt: "test",
  });
  assert.strictEqual(result.valid, false);
  assert.ok(result.error?.includes("required"));
});

test("validateImageParams - missing endpointId returns error", () => {
  const result = validateImageParams({
    provider: "fal",
    prompt: "test",
  });
  assert.strictEqual(result.valid, false);
  assert.ok(result.error?.includes("required"));
});

test("validateImageParams - missing prompt returns error", () => {
  const result = validateImageParams({
    provider: "fal",
    endpointId: "fal-ai/flux/dev",
  });
  assert.strictEqual(result.valid, false);
  assert.ok(result.error?.includes("required"));
});

test("validateImageParams - runware provider returns not implemented", () => {
  const result = validateImageParams({
    provider: "runware",
    endpointId: "runware/some-model",
    prompt: "test",
  });
  assert.strictEqual(result.valid, false);
  assert.ok(
    result.error?.toLowerCase().includes("runware") || result.error?.includes("not")
  );
});

test("validateImageParams - unsupported provider returns error", () => {
  const result = validateImageParams({
    provider: "unknown",
    endpointId: "some/endpoint",
    prompt: "test",
  });
  assert.strictEqual(result.valid, false);
  assert.ok(result.error?.includes("Unsupported") || result.error?.includes("fal"));
});

test("validateImageParams - valid fal params returns valid", () => {
  const result = validateImageParams({
    provider: "fal",
    endpointId: "fal-ai/flux/dev",
    prompt: "test",
  });
  assert.strictEqual(result.valid, true);
  assert.strictEqual(result.error, undefined);
});
