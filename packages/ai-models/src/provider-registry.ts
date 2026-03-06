import type { AIModelProvider } from "./types";
import type { ProviderAdapter } from "./provider-adapter";
import type { ProviderConfig } from "./orchestration-types";
import { AdapterNotFoundError } from "./provider-adapter";

export class ProviderRegistry {
  private readonly adapters = new Map<AIModelProvider, ProviderAdapter>();
  private readonly configs = new Map<AIModelProvider, ProviderConfig>();

  registerAdapter(adapter: ProviderAdapter): void {
    this.adapters.set(adapter.provider, adapter);
  }

  setProviderConfig(config: ProviderConfig): void {
    this.configs.set(config.provider, config);
  }

  getAdapter(provider: AIModelProvider): ProviderAdapter {
    const adapter = this.adapters.get(provider);
    if (!adapter) {
      throw new AdapterNotFoundError(provider);
    }
    return adapter;
  }

  getProviderConfig(provider: AIModelProvider): ProviderConfig {
    return this.configs.get(provider) ?? { provider };
  }

  hasAdapter(provider: AIModelProvider): boolean {
    return this.adapters.has(provider);
  }

  listProviders(): AIModelProvider[] {
    return Array.from(this.adapters.keys());
  }
}
