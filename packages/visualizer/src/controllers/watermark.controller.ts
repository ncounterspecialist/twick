import type { WatermarkRendererContract } from "../helpers/watermark.types";
import { TextWatermarkRenderer } from "../watermark-renderers/text.watermark";
import { ImageWatermarkRenderer } from "../watermark-renderers/image.watermark";

/**
 * Registry for watermark renderers. Enables scalable dispatch by type:
 * watermarkController.get(watermark.type)?.render({ view, watermark, duration }).
 * Add new watermark types (e.g. svg) by registering a new renderer.
 */
export class WatermarkController {
  private renderers = new Map<string, WatermarkRendererContract>();

  register(renderer: WatermarkRendererContract) {
    this.renderers.set(renderer.name, renderer);
  }

  get(name: string): WatermarkRendererContract | undefined {
    return this.renderers.get(name);
  }

  list(): string[] {
    return Array.from(this.renderers.keys());
  }
}

const watermarkController = new WatermarkController();

function registerWatermarkRenderers() {
  watermarkController.register(TextWatermarkRenderer);
  watermarkController.register(ImageWatermarkRenderer);
}

registerWatermarkRenderers();

export default watermarkController;
