#!/usr/bin/env node
/**
 * Phase 0: Validate FAL API connectivity.
 * Run with: FAL_KEY=your_key node scripts/validate-fal.mjs
 * Uses synchronous fal.run API to verify credentials and response shape.
 */
const FAL_KEY = process.env.FAL_KEY;
const FAL_ENDPOINT = "fal-ai/flux/dev";

async function validate() {
  if (!FAL_KEY || FAL_KEY === "your_fal_key") {
    console.error("Set FAL_KEY env var to validate. Example: FAL_KEY=xxx node scripts/validate-fal.mjs");
    process.exit(1);
  }

  const url = `https://fal.run/${FAL_ENDPOINT}`;
  const body = JSON.stringify({ prompt: "a red apple", num_images: 1 });

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Key ${FAL_KEY}`,
      },
      body,
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("FAL API error:", res.status, data);
      process.exit(1);
    }

    const hasUrl = data?.images?.[0]?.url ?? data?.image?.url ?? data?.url;
    if (!hasUrl) {
      console.error("FAL response missing url. Keys:", Object.keys(data));
      process.exit(1);
    }

    console.log("FAL validation OK. Response includes url.");
  } catch (err) {
    console.error("FAL validation failed:", err.message);
    process.exit(1);
  }
}

validate();
