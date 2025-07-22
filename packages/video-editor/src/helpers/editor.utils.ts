import { DEFAULT_ELEMENT_COLORS, ElementColors } from "@twick/timeline";

export let ELEMENT_COLORS: ElementColors = { ...DEFAULT_ELEMENT_COLORS };

export const setElementColors = (colors: Partial<ElementColors>) => {
  ELEMENT_COLORS = {
    ...DEFAULT_ELEMENT_COLORS,
    ...colors,
  };
};