import { TrackElement, VideoElement } from "@twick/timeline";
import { useEffect, useState } from "react";
import { hasAudio } from "@twick/media-utils";
import { Loader2, VolumeX, Volume2 } from "lucide-react";

export function GenerateSubtitlesPanel({
  selectedElement,
  generateSubtitles,
}: {
  selectedElement: TrackElement;
  generateSubtitles: (videoElement: VideoElement) => void;
}) {
  const [containsAudio, setContainsAudio] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const onGenerateSubtitles = () => {
    if (selectedElement instanceof VideoElement) {
      generateSubtitles(selectedElement as VideoElement);
    }
  };

  const checkAudio = async () => {
    setIsLoading(true);
    if (selectedElement instanceof VideoElement) {
      const videoElement = selectedElement as VideoElement;
      const videoUrl = videoElement.getSrc();
      if (videoUrl) {
        try {
          const hasAudioTrack = await hasAudio(videoUrl);
          setContainsAudio(hasAudioTrack);
        } catch (error) {
          console.error("Error checking audio:", error);
          setContainsAudio(false);
        }
      } else {
        setContainsAudio(false);
      }
    } else {
      setContainsAudio(false);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    checkAudio();
  }, [selectedElement]);

  return (
    <div className="panel-container">
      <div className="panel-title">Generate Subtitles Panel</div>
      
      {/* Loading State */}
      {isLoading && (
        <div className="panel-section">
          <div className="empty-state">
            <div className="empty-state-content">
              <Loader2 className="empty-state-icon animate-spin" />
              <p className="empty-state-text">Checking for audio...</p>
            </div>
          </div>
        </div>
      )}

      {/* No Audio State */}
      {!isLoading && containsAudio === false && (
        <div className="panel-section">
          <div className="empty-state">
            <div className="empty-state-content">
              <VolumeX className="empty-state-icon" />
              <p className="empty-state-text">No audio track found in this video</p>
            </div>
          </div>
        </div>
      )}

      {/* Audio Present State */}
      {!isLoading && containsAudio === true && (
        <div className="panel-section">
          <div className="empty-state">
            <div className="empty-state-content">
              <Volume2 className="empty-state-icon" />
              <p className="empty-state-text">Audio detected! You can now generate subtitles</p>
            </div>
          </div>
        </div>
      )}

      {/* Generate Button */}
      {!isLoading && (
        <div className="flex panel-section">
          <button
            onClick={onGenerateSubtitles}
            disabled={!containsAudio}
            className="btn-primary w-full"
          >
            Generate Subtitles
          </button>
        </div>
      )}
    </div>
  );
}
