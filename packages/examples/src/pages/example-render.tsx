import { useState } from "react";
import { useBrowserRenderer } from "@twick/browser-render";
import "./example-render.css";

export default function ExampleRender() {
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const { render, progress, isRendering, videoBlob, download, error, reset } =
        useBrowserRenderer({
            width: 720,
            height: 1280,
            fps: 30,
            includeAudio: true,   // enable audio rendering + FFmpeg mux
            autoDownload: false,   // manual download
        });

    const handleRender = async () => {
        setVideoUrl(null);
        await render({
            input: {
                properties: { width: 720, height: 1280, fps: 30 },
                tracks: [
                    {
                        "id": "t-track-1",
                        "type": "element",
                        "elements": [
                            {
                                "id": "e-244f8d5a3baa",
                                "trackId": "t-track-1",
                                "type": "rect",
                                "s": 0,
                                "e": 5,
                                "props": {
                                    "width": 720,
                                    "height": 1280,
                                    "fill": "#fff000"
                                }
                            }
                        ],
                        "name": "element"
                    }
                ],
            },
        });
    };

    const handleDownload = () => {
        if (videoBlob) {
            download('test.mp4');
        }
    };

    // Update video URL when blob changes (for preview)
    if (videoBlob && !videoUrl) {
        const url = URL.createObjectURL(videoBlob);
        setVideoUrl(url);
    }

    return (
        <div className="render-container">
            <div className="controls">
                <button 
                    onClick={handleRender} 
                    disabled={isRendering}
                    className="file-button"
                >
                    {isRendering ? "Rendering..." : "Render Video"}
                </button>

                {isRendering && (
                    <div className="progress-container">
                        <div className="progress-bar">
                            <progress value={progress} max={1} />
                        </div>
                        <div className="progress-text">
                            {Math.round(progress * 100)}%
                        </div>
                    </div>
                )}

                {videoBlob && (
                    <div className="buttons">
                        <button 
                            onClick={handleDownload}
                            className="file-button"
                        >
                            Download Video
                        </button>
                    </div>
                )}

                {error && (
                    <div className="error">
                        <div className="error-message">{error.message}</div>
                        <button 
                            onClick={reset}
                            className="file-button"
                        >
                            Clear Error
                        </button>
                    </div>
                )}
            </div>

            <div className="preview-container">
                {videoUrl ? (
                    <video 
                        src={videoUrl} 
                        controls 
                        className="video-preview"
                    />
                ) : (
                    <div className="preview-placeholder">
                        {isRendering 
                            ? "Rendering video..." 
                            : "Rendered video will appear here"}
                    </div>
                )}
            </div>
        </div>
    );
}