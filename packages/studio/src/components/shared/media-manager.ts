import { BrowserMediaManager, BaseMediaManager } from "@twick/video-editor";
import type { MediaItem } from "@twick/video-editor";

type ManagerKey = string;

type ManagerEntry = {
    manager: BaseMediaManager;
    initializationPromise: Promise<void> | null;
    isInitialized: boolean;
};

const DEFAULT_MANAGER_KEY: ManagerKey = "default";

class MediaManagerRegistry {
    private static entries = new Map<ManagerKey, ManagerEntry>();

    private constructor() {}

    public static getInstance(options?: {
        key?: ManagerKey;
        manager?: BaseMediaManager;
        createManager?: () => BaseMediaManager;
        namespace?: string;
    }): BaseMediaManager {
        const key = options?.key ?? options?.namespace ?? DEFAULT_MANAGER_KEY;
        const existing = MediaManagerRegistry.entries.get(key);
        if (existing) return existing.manager;

        const manager =
            options?.manager ??
            options?.createManager?.() ??
            (options?.namespace
                ? new BrowserMediaManager({ dbName: `mediaStore:${options.namespace}` })
                : new BrowserMediaManager());

        MediaManagerRegistry.entries.set(key, {
            manager,
            initializationPromise: null,
            isInitialized: false,
        });

        return manager;
    }

    public static async initializeDefaults(options?: { key?: ManagerKey; namespace?: string; manager?: BaseMediaManager }): Promise<void> {
        const key = options?.key ?? options?.namespace ?? DEFAULT_MANAGER_KEY;
        const entry =
            MediaManagerRegistry.entries.get(key) ??
            (() => {
                const manager = options?.manager ?? MediaManagerRegistry.getInstance({ key });
                const newEntry: ManagerEntry = {
                    manager,
                    initializationPromise: null,
                    isInitialized: false,
                };
                MediaManagerRegistry.entries.set(key, newEntry);
                return newEntry;
            })();

        // If already initialized, return immediately
        if (entry.isInitialized) {
            return;
        }

        // If initialization is in progress, wait for it to complete
        if (entry.initializationPromise) {
            await entry.initializationPromise;
            return;
        }

        // Create and store the promise immediately to prevent concurrent initialization
        // This must be synchronous to prevent race conditions
        let resolvePromise: () => void;
        let rejectPromise: (error: any) => void;
        
        entry.initializationPromise = new Promise<void>((resolve, reject) => {
            resolvePromise = resolve;
            rejectPromise = reject;
        });

        // Start initialization asynchronously
        (async () => {
            try {
                await MediaManagerRegistry.doInitializeDefaults(entry.manager);
                entry.isInitialized = true;
                resolvePromise!();
            } catch (error) {
                entry.initializationPromise = null;
                rejectPromise!(error);
            }
        })();
        
        return entry.initializationPromise;
    }

    private static async doInitializeDefaults(manager: BaseMediaManager): Promise<void> {
        
        const defaultVideos = DEFAULT_DEMO_MEDIA_ITEMS.filter((x) => x.type === "video");
        const defaultImages = DEFAULT_DEMO_MEDIA_ITEMS.filter((x) => x.type === "image");
        const defaultAudios = DEFAULT_DEMO_MEDIA_ITEMS.filter((x) => x.type === "audio");

        try {
            // Check if default videos already exist in the database
            const existingVideos = await manager.search({
                type: "video",
                query: "",
            });

            // Check if we already have the default videos by URL
            const existingVideoUrls = new Set(existingVideos.map((v) => v.url));
            const videosToAdd = defaultVideos.filter(
                (video) => !existingVideoUrls.has(video.url)
            );

            // Add default videos if they don't exist (check again right before adding to prevent race conditions)
            if (videosToAdd.length > 0) {
                // Double-check to prevent duplicates in case of race conditions
                const finalCheck = await manager.search({
                    type: "video",
                    query: "",
                });
                const finalVideoUrls = new Set(finalCheck.map((v) => v.url));
                const finalVideosToAdd = videosToAdd.filter(
                    (video) => !finalVideoUrls.has(video.url)
                );
                
                if (finalVideosToAdd.length > 0) {
                    await manager.addItems(finalVideosToAdd);
                }
            }

            // Check if default images already exist in the database
            const existingImages = await manager.search({
                type: "image",
                query: "",
            });

            // Check if we already have the default images by URL
            const existingImageUrls = new Set(existingImages.map((img) => img.url));
            const imagesToAdd = defaultImages.filter(
                (image) => !existingImageUrls.has(image.url)
            );

            // Add default images if they don't exist (check again right before adding)
            if (imagesToAdd.length > 0) {
                // Double-check to prevent duplicates in case of race conditions
                const finalCheck = await manager.search({
                    type: "image",
                    query: "",
                });
                const finalImageUrls = new Set(finalCheck.map((img) => img.url));
                const finalImagesToAdd = imagesToAdd.filter(
                    (image) => !finalImageUrls.has(image.url)
                );
                
                if (finalImagesToAdd.length > 0) {
                    await manager.addItems(finalImagesToAdd);
                }
            }

            // Check if default audio files already exist in the database
            const existingAudios = await manager.search({
                type: "audio",
                query: "",
            });

            // Check if we already have the default audio files by URL
            const existingAudioUrls = new Set(existingAudios.map((a) => a.url));
            const audiosToAdd = defaultAudios.filter(
                (audio) => !existingAudioUrls.has(audio.url)
            );

            // Add default audio files if they don't exist (check again right before adding)
            if (audiosToAdd.length > 0) {
                // Double-check to prevent duplicates in case of race conditions
                const finalCheck = await manager.search({
                    type: "audio",
                    query: "",
                });
                const finalAudioUrls = new Set(finalCheck.map((a) => a.url));
                const finalAudiosToAdd = audiosToAdd.filter(
                    (audio) => !finalAudioUrls.has(audio.url)
                );
                
                if (finalAudiosToAdd.length > 0) {
                    await manager.addItems(finalAudiosToAdd);
                }
            }
        } catch (error) {
            // Error is handled in initializeDefaults, just re-throw it
            throw error;
        }
    }
}

/**
 * Built-in demo seed media items (Pexels/Pixabay) used when `seed: "defaults"`.
 *
 * Host apps that want to remove demo defaults can delete these items by URL
 * without impacting user-uploaded/custom assets.
 */
export const DEFAULT_DEMO_MEDIA_ITEMS = [
    {
        name: "Mountain Road",
        url: "https://videos.pexels.com/video-files/31708803/13510402_1080_1920_30fps.mp4",
        type: "video",
        metadata: {
            name: "Mountain Road",
            source: "pexels",
        },
    },
    {
        name: "Vase",
        url: "https://videos.pexels.com/video-files/4622990/4622990-uhd_1440_2560_30fps.mp4",
        type: "video",
        metadata: {
            name: "Vase",
            source: "pexels",
        },
    },
    {
        name: "Mountain Road",
        url: "https://images.pexels.com/photos/1955134/pexels-photo-1955134.jpeg",
        type: "image",
        metadata: {
            name: "Mountain Road",
            source: "pexels",
        },
    },
    {
        name: "Waterfall",
        url: "https://images.pexels.com/photos/358457/pexels-photo-358457.jpeg",
        type: "image",
        metadata: {
            name: "Waterfall",
            source: "pexels",
        },
    },
    {
        name: "Audio 1",
        url: "https://cdn.pixabay.com/audio/2022/03/14/audio_782eeb590e.mp3",
        type: "audio",
        metadata: {
            name: "Audio 1",
            source: "pixabay",
        },
    },
    {
        name: "Audio 2",
        url: "https://cdn.pixabay.com/audio/2025/01/24/audio_24048c78b6.mp3",
        type: "audio",
        metadata: {
            name: "Audio 2",
            source: "pixabay",
        },
    },
] as const satisfies ReadonlyArray<Omit<MediaItem, "id">>;

const DEFAULT_DEMO_URLS: ReadonlySet<string> = new Set(
    DEFAULT_DEMO_MEDIA_ITEMS.map((x) => x.url as string),
);

/**
 * Removes Twick's built-in demo media items (seed defaults) from the current media store.
 * This is safe to run in production when `seed: "none"` because it only deletes items
 * whose URL matches the known demo URLs.
 */
export const removeDefaultDemoMediaItems = async (manager: BaseMediaManager): Promise<void> => {
    const types = ["video", "image", "audio"] as const;
    await Promise.all(
        types.map(async (type) => {
            const items = await manager.search({ type, query: "" });
            const toDelete = items.filter((i) => DEFAULT_DEMO_URLS.has(i.url));
            await Promise.all(toDelete.map((i) => manager.deleteItem(i.id)));
        }),
    );
};

// Export a function to get the singleton instance
export const getMediaManager = (options?: {
    /** Namespace key for multi-tenant isolation (e.g. `${env}:${tenantId}:${userId}`) */
    namespace?: string;
    /** Provide a custom manager implementation */
    manager?: BaseMediaManager;
    /** Lazy creator for the manager */
    createManager?: () => BaseMediaManager;
}) => MediaManagerRegistry.getInstance(options);

// Export a function to initialize default videos
export const initializeDefaultVideos = (options?: {
    namespace?: string;
    manager?: BaseMediaManager;
}) => MediaManagerRegistry.initializeDefaults(options); 