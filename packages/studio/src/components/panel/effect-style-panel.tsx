import type { TrackElement } from "@twick/timeline";
import { EFFECT_OPTIONS } from "@twick/effects";
import type { EffectKey } from "@twick/effects";
import { useEffect, useState } from "react";
import { useEffectPanel } from "../../hooks/use-effect-panel";
import { getEffectPreviewForEffect } from "../../helpers/effect-preview-manager";

interface EffectStylePanelProps {
  selectedElement: TrackElement | null;
  addElement: (element: TrackElement) => void;
  updateElement: (element: TrackElement) => void;
}

interface EffectPreviewProps {
  effectKey: EffectKey;
  label: string;
}

function EffectPreview({ effectKey, label }: EffectPreviewProps) {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    if (typeof window === "undefined") {
      return;
    }

    getEffectPreviewForEffect(effectKey).then((url) => {
      if (!cancelled && url) {
        setSrc(url);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [effectKey]);

  if (!src) {
    return (
      <div className="effect-preview-box-inner flex items-center justify-center text-xs text-neutral-400">
        {label}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={label}
      className="effect-preview-box-inner object-cover"
      loading="lazy"
    />
  );
}

export function EffectStylePanel({
  selectedElement,
  addElement,
  updateElement,
}: EffectStylePanelProps) {
  const { selectedEffectKey, handleAddEffect, handleUpdateEffect } =
    useEffectPanel({
      selectedElement,
      addElement,
      updateElement,
    });

  const handleClick = (key: EffectKey) => {
    if (selectedEffectKey) {
      handleUpdateEffect(key);
    } else {
      handleAddEffect(key);
    }
  };

  return (
    <div className="panel-container">
      <div className="panel-title">Effect Style</div>
      <div className="panel-section">
        <div className="effect-grid">
          {EFFECT_OPTIONS.map((effect) => {
            const isSelected = effect.key === selectedEffectKey;
            return (
              <button
                key={effect.key}
                type="button"
                className={`effect-preview-card${isSelected ? " effect-preview-card-selected" : ""}`}
                onClick={() => handleClick(effect.key)}
              >
                <div className="effect-preview-box">
                  <EffectPreview effectKey={effect.key} label={effect.label} />
                  <div className="effect-preview-label">{effect.label}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

