export function buildNormalizedMediaResult({
  requestId,
  type,
  provider,
  endpointId,
  url,
  duration,
  thumbnailUrl,
}) {
  return {
    requestId,
    type,
    provider,
    endpointId,
    mediaUrl: url,
    durationMs:
      typeof duration === "number" ? Math.max(0, duration * 1000) : undefined,
    thumbnailUrl,
  };
}
