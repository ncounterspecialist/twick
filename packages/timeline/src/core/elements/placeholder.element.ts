import { Size } from "../../types";
import { TrackElement } from "./base.element";
import type { ElementVisitor } from "../visitor/element-visitor";
import { TIMELINE_ELEMENT_TYPE } from "../../utils/constants";

/**
 * Placeholder element for lazy-loaded or not-yet-available media.
 * Rendered as skipped by the visualizer until a handler is registered.
 * Use replaceElementsBySource to replace with the real element once loaded.
 */
export class PlaceholderElement extends TrackElement {
  protected parentSize: Size;

  constructor(src: string, parentSize: Size, expectedDuration?: number) {
    super(TIMELINE_ELEMENT_TYPE.PLACEHOLDER);
    this.parentSize = parentSize;
    this.props = {
      src,
      ...(expectedDuration != null && { expectedDuration }),
    };
  }

  getSrc(): string {
    return this.props?.src ?? "";
  }

  getExpectedDuration(): number | undefined {
    return this.props?.expectedDuration;
  }

  getParentSize(): Size {
    return this.parentSize;
  }

  accept<T>(visitor: ElementVisitor<T>): T {
    return visitor.visitPlaceholderElement(this);
  }
}
