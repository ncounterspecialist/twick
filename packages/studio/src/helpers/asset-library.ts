import type {
  AssetLibrary,
  AssetListParams,
  AssetProviderConfig,
  MediaItem,
} from "@twick/video-editor";
import type { BaseMediaManager } from "@twick/video-editor";

interface Paginated<T> {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
}

const DEFAULT_PAGE_SIZE = 50;

async function listUserAssets(
  mediaManager: BaseMediaManager,
  params: AssetListParams
): Promise<Paginated<MediaItem>> {
  const all = await mediaManager.search({
    query: params.query,
    type: params.type,
  });

  const page = params.page ?? 1;
  const pageSize = params.pageSize ?? DEFAULT_PAGE_SIZE;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  return {
    items: all.slice(start, end),
    page,
    pageSize,
    total: all.length,
  };
}

async function listPublicAssets(params: AssetListParams): Promise<Paginated<MediaItem>> {
  const page = params.page ?? 1;
  const pageSize = params.pageSize ?? DEFAULT_PAGE_SIZE;

  const searchParams = new URLSearchParams();
  searchParams.set("source", "public");
  if (params.type) searchParams.set("type", params.type);
  if (params.query) searchParams.set("query", params.query);
  if (params.provider) searchParams.set("provider", params.provider);
  searchParams.set("page", String(page));
  searchParams.set("pageSize", String(pageSize));

  const res = await fetch(`/api/assets/search?${searchParams.toString()}`);
  if (!res.ok) {
    throw new Error(`Failed to search public assets (${res.status})`);
  }

  const data = (await res.json()) as Paginated<any>;

  const items: MediaItem[] = (data.items || []).map((asset: any) => ({
    id: asset.id,
    name: asset.name,
    type: asset.type,
    url: asset.url,
    previewUrl: asset.previewUrl,
    thumbnail: asset.previewUrl ?? asset.thumbnail,
    waveformUrl: asset.waveformUrl,
    duration: asset.duration,
    width: asset.width,
    height: asset.height,
    sizeBytes: asset.sizeBytes,
    source: asset.source,
    origin: asset.origin,
    provider: asset.provider,
    providerId: asset.providerId,
    providerUrl: asset.providerUrl,
    attribution: asset.attribution,
    tags: asset.tags,
    metadata: asset.metadata,
  }));

  return {
    items,
    page: data.page ?? page,
    pageSize: data.pageSize ?? pageSize,
    total: data.total ?? items.length,
  };
}

const createStudioAssetLibrary = (mediaManager: BaseMediaManager): AssetLibrary => ({
  async listAssets(params: AssetListParams): Promise<Paginated<MediaItem>> {
    if (params.source === "user") {
      return listUserAssets(mediaManager, params);
    }
    return listPublicAssets(params);
  },

  async getAsset(id: string): Promise<MediaItem | null> {
    const item = await mediaManager.getItem(id);
    return item ?? null;
  },

  async uploadAsset(
    file: File,
    options?: {
      type?: "video" | "audio" | "image";
      metadata?: Record<string, unknown>;
    }
  ): Promise<MediaItem> {
    const arrayBuffer = await file.arrayBuffer();
    const type = options?.type ?? file.type.split("/")[0];

    const item = await mediaManager.addItem({
      name: file.name,
      url: URL.createObjectURL(new Blob([arrayBuffer], { type: file.type })),
      type,
      arrayBuffer,
      metadata: {
        ...(options?.metadata ?? {}),
        name: file.name,
        size: file.size,
        type: file.type,
        source: "upload",
      },
    });

    return item;
  },

  async deleteAsset(id: string): Promise<void> {
    await mediaManager.deleteItem(id);
  },

  async listPublicProviders(): Promise<AssetProviderConfig[]> {
    const res = await fetch("/api/assets/providers/config");
    if (!res.ok) {
      throw new Error(`Failed to load asset providers (${res.status})`);
    }
    const data = (await res.json()) as { providers?: AssetProviderConfig[] };
    return data.providers ?? [];
  },
});

export const getAssetLibrary = (mediaManager: BaseMediaManager) =>
  createStudioAssetLibrary(mediaManager);

