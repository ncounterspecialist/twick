/**
 * Maps file MIME type or extension to timeline element type.
 * Used for drop-on-timeline to determine which element to create.
 */
export type DroppableAssetType = "video" | "audio" | "image";

const VIDEO_TYPES = [
  "video/mp4",
  "video/webm",
  "video/ogg",
  "video/quicktime",
  "video/x-msvideo",
  "video/x-matroska",
];
const AUDIO_TYPES = [
  "audio/mpeg",
  "audio/mp3",
  "audio/wav",
  "audio/ogg",
  "audio/webm",
  "audio/aac",
  "audio/mp4",
  "audio/x-wav",
];
const IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
  "image/bmp",
];

const EXT_TO_TYPE: Record<string, DroppableAssetType> = {
  mp4: "video",
  webm: "video",
  mov: "video",
  avi: "video",
  mkv: "video",
  mp3: "audio",
  wav: "audio",
  ogg: "audio",
  m4a: "audio",
  jpg: "image",
  jpeg: "image",
  png: "image",
  gif: "image",
  webp: "image",
  svg: "image",
  bmp: "image",
};

export function getAssetTypeFromFile(file: File): DroppableAssetType | null {
  const mime = (file.type || "").toLowerCase();
  const ext = (file.name?.split(".").pop() || "").toLowerCase();

  if (VIDEO_TYPES.some((t) => mime.includes(t))) return "video";
  if (AUDIO_TYPES.some((t) => mime.includes(t))) return "audio";
  if (IMAGE_TYPES.some((t) => mime.includes(t))) return "image";
  if (ext && EXT_TO_TYPE[ext]) return EXT_TO_TYPE[ext];
  return null;
}
