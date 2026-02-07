import { View2D } from "@twick/2d";
import { ThreadGenerator } from "@twick/core";
import { WatermarkInput } from "./types";

/**
 * Parameters passed to a watermark renderer.
 */
export type WatermarkRendererParams = {
  view: View2D;
  watermark: WatermarkInput;
  duration: number;
};

/**
 * Interface for watermark renderers. Register with WatermarkController
 * to support text, image, or future watermark types (e.g. svg).
 */
export interface WatermarkRendererContract {
  /** Renderer type: "text" | "image" */
  name: "text" | "image";
  /** Renders the watermark overlay for the given duration */
  render(params: WatermarkRendererParams): ThreadGenerator;
}
