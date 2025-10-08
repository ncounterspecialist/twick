import { useState } from "react";
import { Plus } from "lucide-react";

type MediaType = "video" | "audio" | "image";

const EXTENSIONS: Record<MediaType, string[]> = {
  video: ["mp4", "webm", "ogg", "mov", "mkv", "m3u8"],
  audio: ["mp3", "wav", "ogg", "m4a", "aac", "flac"],
  image: ["jpg", "jpeg", "png", "gif", "webp", "svg"],
};

function isValidUrl(url: string) {
  try {
    // eslint-disable-next-line no-new
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

function matchesType(url: string, type: MediaType) {
  const pathname = (() => {
    try {
      return new URL(url).pathname.toLowerCase();
    } catch {
      return url.toLowerCase();
    }
  })();
  const ext = pathname.split(".").pop() || "";
  return EXTENSIONS[type].includes(ext);
}

// (name extraction removed; naming handled by caller if needed)

export default function UrlInput({
  type,
  onSubmit,
}: {
  type: MediaType;
  onSubmit: (url: string) => void;
}) {
  const [url, setUrl] = useState("");
  const [error, setError] = useState<string>("");

  const tryAdd = async () => {
    const trimmed = url.trim();
    if (!trimmed) return;

    if (!isValidUrl(trimmed)) {
      setError("Enter a valid URL");
      return;
    }

    if (!matchesType(trimmed, type)) {
      setError(`URL must be a ${type} (${EXTENSIONS[type].join(", ")})`);
      return;
    }

    setError("");

    onSubmit(trimmed);
    setUrl("");
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      void tryAdd();
    }
  };

  return (
    <div>
      <div className="flex-container">
        <input
          type="url"
          placeholder={`Paste ${type} URL...`}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={onKeyDown}
          className="input w-full"
        />
        <button
          className="btn-ghost"
          onClick={() => void tryAdd()}
          aria-label={`Add ${type} by URL`}
        >
          <Plus size={16} />
        </button>
      </div>
      {error ? <span className="text-error">{error}</span> : null}
    </div>
  );
}
