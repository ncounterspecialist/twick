import type { MediaItem } from "./types";

export type MediaType = "video" | "audio" | "image";

export interface Paginated<T> {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
}

export interface AssetListParams {
  source: "user" | "public";
  type?: MediaType;
  query?: string;
  page?: number;
  pageSize?: number;
  /** Optional concrete provider id for public assets (e.g. 'pexels'). */
  provider?: string;
}

export interface AssetProviderConfig {
  /** Stable provider id (e.g. 'pexels', 'unsplash', 'pixabay', 'twick-stock'). */
  id: string;
  /** Human readable label for UI (e.g. 'Pexels'). */
  label: string;
  /** Media types this provider can return. */
  supportedTypes: MediaType[] | "all";
  /** Whether this provider is currently enabled for the active tenant/deployment. */
  enabled: boolean;
  /** Optional URL to provider terms of use or attribution guidelines. */
  termsUrl?: string;
  /** Optional URL to provider logo/icon for UI. */
  iconUrl?: string;
  /** Optional rate-limit or quota hint for UX messaging. */
  quotaHint?: string;
}

/**
 * High-level asset library abstraction used by @twick/video-editor and
 * @twick/studio. Implementations may back this with:
 *
 * - Local IndexedDB (BrowserMediaManager)
 * - Twick Cloud asset services
 * - Host application backends (Next.js / Node / serverless)
 *
 * The interface is intentionally minimal and provider-agnostic so that
 * Studio and the editor do not need to know about individual vendors
 * like Pexels or Unsplash.
 */
export interface AssetLibrary {
  /**
   * List or search assets from the unified library.
   * - For source='user', this should return user-owned assets.
   * - For source='public', this should fan out to one or more public providers.
   */
  listAssets(params: AssetListParams): Promise<Paginated<MediaItem>>;

  /** Fetch a single asset by id, regardless of source. */
  getAsset(id: string): Promise<MediaItem | null>;

  /**
   * Upload a new user asset.
   * Implementations are free to use browser uploads, presigned URLs, or
   * any other storage strategy; the resulting MediaItem must be fully
   * usable by the editor (url + type).
   */
  uploadAsset(
    file: File,
    options?: {
      type?: MediaType;
      /**
       * Optional metadata the caller wants to persist (e.g. user-provided
       * tags or attribution notes).
       */
      metadata?: Record<string, unknown>;
    }
  ): Promise<MediaItem>;

  /** Delete a user asset. Public/provider assets are read-only. */
  deleteAsset(id: string): Promise<void>;

  /**
   * Discover which public providers are available in the current
   * environment (and their capabilities).
   */
  listPublicProviders(): Promise<AssetProviderConfig[]>;
}

