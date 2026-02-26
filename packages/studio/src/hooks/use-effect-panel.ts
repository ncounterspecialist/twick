import { useMemo } from "react";
import { EffectElement, TrackElement, TIMELINE_ELEMENT_TYPE } from "@twick/timeline";
import type { EffectKey } from "@twick/effects";

export interface UseEffectPanelParams {
  selectedElement: TrackElement | null;
  addElement: (element: TrackElement) => void;
  updateElement: (element: TrackElement) => void;
}

export interface UseEffectPanelResult {
  selectedEffectKey: EffectKey | null;
  handleAddEffect: (key: EffectKey) => void;
  handleUpdateEffect: (key: EffectKey) => void;
}

export const useEffectPanel = ({
  selectedElement,
  addElement,
  updateElement,
}: UseEffectPanelParams): UseEffectPanelResult => {
  const selectedEffectKey = useMemo<EffectKey | null>(() => {
    if (!selectedElement) return null;
    if (selectedElement.getType() !== TIMELINE_ELEMENT_TYPE.EFFECT) return null;
    const effectElement = selectedElement as unknown as EffectElement;
    const props = effectElement.getProps?.();
    const key = props?.effectKey as EffectKey | undefined;
    return key ?? null;
  }, [selectedElement]);

  const handleAddEffect = (key: EffectKey) => {
    const effect = new EffectElement(key);
    addElement(effect);
  };

  const handleUpdateEffect = (key: EffectKey) => {
    if (!selectedElement) return;
    if (selectedElement.getType() !== TIMELINE_ELEMENT_TYPE.EFFECT) return;
    const effectElement = selectedElement as unknown as EffectElement;
    effectElement.setEffectKey(key);
    updateElement(effectElement);
  };

  return {
    selectedEffectKey,
    handleAddEffect,
    handleUpdateEffect,
  };
};

