import type { TrackElement } from "@twick/timeline";
import { EFFECT_OPTIONS } from "@twick/effects";
import type { EffectKey } from "@twick/effects";
import { useEffectPanel } from "../../hooks/use-effect-panel";

import vignetteImg from "../../assets/effects/vignette.png";
import sepiaImg from "../../assets/effects/sepia.png";
import pixelateImg from "../../assets/effects/pixelate.png";
import warpImg from "../../assets/effects/warp.png";

interface EffectStylePanelProps {
  selectedElement: TrackElement | null;
  addElement: (element: TrackElement) => void;
  updateElement: (element: TrackElement) => void;
}

/** Effect preview images bundled with the studio so consumers get them automatically. */
const EFFECT_PREVIEW_IMAGES: Record<EffectKey, string> = {
  vignette: vignetteImg,
  sepia: sepiaImg,
  pixelate: pixelateImg,
  warp: warpImg,
};

const getEffectPreviewSrc = (key: EffectKey): string => EFFECT_PREVIEW_IMAGES[key] ?? "";

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
                  <img
                    src={getEffectPreviewSrc(effect.key) || undefined}
                    alt=""
                    className="effect-preview-box-inner object-cover"
                    loading="lazy"
                  />
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

