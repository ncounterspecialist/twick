import { BrowserMediaManager } from "@twick/video-editor";

class MediaManagerSingleton {
    private static instance: BrowserMediaManager | null = null;

    private constructor() {}

    public static getInstance(): BrowserMediaManager {
        if (!MediaManagerSingleton.instance) {
            MediaManagerSingleton.instance = new BrowserMediaManager();
        }
        return MediaManagerSingleton.instance;
    }
}

// Export a function to get the singleton instance
export const getMediaManager = () => MediaManagerSingleton.getInstance(); 