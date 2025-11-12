import { BrowserMediaManager } from "@twick/video-editor";
import type { MediaItem } from "@twick/video-editor";

class MediaManagerSingleton {
    private static instance: BrowserMediaManager | null = null;
    private static initializationPromise: Promise<void> | null = null;
    private static isInitialized = false;

    private constructor() {}

    public static getInstance(): BrowserMediaManager {
        if (!MediaManagerSingleton.instance) {
            MediaManagerSingleton.instance = new BrowserMediaManager();
        }
        return MediaManagerSingleton.instance;
    }

    public static async initializeDefaults(): Promise<void> {
        // If already initialized, return immediately
        if (MediaManagerSingleton.isInitialized) {
            return;
        }

        // If initialization is in progress, wait for it to complete
        if (MediaManagerSingleton.initializationPromise) {
            await MediaManagerSingleton.initializationPromise;
            return;
        }

        // Create and store the promise immediately to prevent concurrent initialization
        // This must be synchronous to prevent race conditions
        let resolvePromise: () => void;
        let rejectPromise: (error: any) => void;
        
        MediaManagerSingleton.initializationPromise = new Promise<void>((resolve, reject) => {
            resolvePromise = resolve;
            rejectPromise = reject;
        });

        // Start initialization asynchronously
        (async () => {
            try {
                await MediaManagerSingleton.doInitializeDefaults();
                MediaManagerSingleton.isInitialized = true;
                resolvePromise!();
            } catch (error) {
                // Reset the promise on error so initialization can be retried
                MediaManagerSingleton.initializationPromise = null;
                console.error("Error initializing default media:", error);
                rejectPromise!(error);
            }
        })();
        
        return MediaManagerSingleton.initializationPromise;
    }

    private static async doInitializeDefaults(): Promise<void> {
        const manager = MediaManagerSingleton.getInstance();
        
        // Default video URLs
        const defaultVideos = [
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
        ] as Omit<MediaItem, "id">[];

        // Default image URLs
        const defaultImages = [
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
        ] as Omit<MediaItem, "id">[];

        // Default audio URLs
        const defaultAudios = [
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
        ] as Omit<MediaItem, "id">[];

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
                    console.log(`Added ${finalVideosToAdd.length} default video(s) to media library`);
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
                    console.log(`Added ${finalImagesToAdd.length} default image(s) to media library`);
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
                    console.log(`Added ${finalAudiosToAdd.length} default audio file(s) to media library`);
                }
            }
        } catch (error) {
            // Error is handled in initializeDefaults, just re-throw it
            throw error;
        }
    }
}

// Export a function to get the singleton instance
export const getMediaManager = () => MediaManagerSingleton.getInstance();

// Export a function to initialize default videos
export const initializeDefaultVideos = () => MediaManagerSingleton.initializeDefaults(); 