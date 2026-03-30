import { COLOR_FILTERS } from "@twick/media-utils";
import {
  ImageElement,
  VideoElement,
  type TrackElement,
} from "@twick/timeline";
import type { PropertiesPanelProps } from "../../types";
import { AccordionItem } from "../shared/accordion-item";
import { PropertyRow } from "./property-row";
import { Filter } from "lucide-react";
import { useMemo, useState } from "react";

const NONE_VALUE = "none";

const FILTER_LABELS: Record<string, string> = {
  [NONE_VALUE]: "None",
  [COLOR_FILTERS.SATURATED]: "Saturated",
  [COLOR_FILTERS.BRIGHT]: "Bright",
  [COLOR_FILTERS.VIBRANT]: "Vibrant",
  [COLOR_FILTERS.RETRO]: "Retro",
  [COLOR_FILTERS.BLACK_WHITE]: "Black & white",
  [COLOR_FILTERS.SEPIA]: "Sepia",
  [COLOR_FILTERS.COOL]: "Cool",
  [COLOR_FILTERS.WARM]: "Warm",
  [COLOR_FILTERS.CINEMATIC]: "Cinematic",
  [COLOR_FILTERS.SOFT_GLOW]: "Soft glow",
  [COLOR_FILTERS.MOODY]: "Moody",
  [COLOR_FILTERS.DREAMY]: "Dreamy",
  [COLOR_FILTERS.INVERTED]: "Inverted",
  [COLOR_FILTERS.VINTAGE]: "Vintage",
  [COLOR_FILTERS.DRAMATIC]: "Dramatic",
  [COLOR_FILTERS.FADED]: "Faded",
};

type MediaFilterElement = VideoElement | ImageElement;

function isMediaFilterElement(
  el: TrackElement | null | undefined
): el is MediaFilterElement {
  return el instanceof VideoElement || el instanceof ImageElement;
}

export function ColorFilterPropsPanel({
  selectedElement,
  updateElement,
}: PropertiesPanelProps) {
  const mediaEl = isMediaFilterElement(selectedElement) ? selectedElement : null;

  type FilterValue = (typeof COLOR_FILTERS)[keyof typeof COLOR_FILTERS];

  const options = useMemo(() => {
    const entries = (Object.values(COLOR_FILTERS) as FilterValue[]).map(
      (value) => ({
        value,
        label: FILTER_LABELS[value] ?? value,
      })
    );
    return [{ value: NONE_VALUE, label: FILTER_LABELS[NONE_VALUE] }, ...entries];
  }, []);

  const elementProps = mediaEl?.getProps() ?? {};
  const mediaFilter = elementProps.mediaFilter ?? NONE_VALUE;

  const handleFilterChange = (value: string) => {
    if (!mediaEl || !updateElement) return;
    const allowed = Object.values(COLOR_FILTERS) as string[];
    const next =
      value === NONE_VALUE
        ? NONE_VALUE
        : allowed.includes(value)
          ? value
          : NONE_VALUE;
    updateElement(
      mediaEl.setProps({
        ...elementProps,
        mediaFilter: next,
      })
    );
  };

  const [isOpen, setIsOpen] = useState(false);

  if (!mediaEl) {
    return null;
  }

  return (
    <div className="panel-container">
      <div className="panel-title">Look</div>
      <AccordionItem
        title="Color filter"
        icon={<Filter className="icon-sm" />}
        isOpen={isOpen}
        onToggle={() => setIsOpen((open) => !open)}
      >
        <div className="properties-group">
          <div className="property-section">
            <PropertyRow label="Preset">
              <select
                value={
                  options.some((o) => o.value === mediaFilter)
                    ? mediaFilter
                    : NONE_VALUE
                }
                onChange={(e) => handleFilterChange(e.target.value)}
                className="select-dark w-full"
              >
                {options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </PropertyRow>
          </div>
        </div>
      </AccordionItem>
    </div>
  );
}
