import { TrackElement, VideoElement } from "@twick/timeline";
import { useEffect, useState, useRef } from "react";
import { hasAudio } from "@twick/media-utils";
import { Loader2, VolumeX, Volume2, CheckCircle2, XCircle } from "lucide-react";
import { ISubtitleGenerationPollingResponse } from "../../types";

export function GenerateSubtitlesPanel({
  selectedElement,
  addSubtitlesToTimeline,
  onGenerateSubtitles,
  getSubtitleStatus,
}: {
  selectedElement: TrackElement;
  addSubtitlesToTimeline: (subtitles: { s: number; e: number; t: string }[]) => void;
  onGenerateSubtitles: (videoElement: VideoElement) => Promise<string | null>;
  getSubtitleStatus: (reqId: string) => Promise<ISubtitleGenerationPollingResponse>;
}) {
  const [containsAudio, setContainsAudio] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [pollingStatus, setPollingStatus] = useState<"idle" | "polling" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const currentReqIdRef = useRef<string | null>(null);

  // Cleanup polling on unmount
  useEffect(() => {
    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, []);

  const stopPolling = () => {
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
      pollingIntervalRef.current = null;
    }
  };

  const startPolling = async (reqId: string) => {
    if (!getSubtitleStatus) {
      return;
    }
    setPollingStatus("polling");
    setIsGenerating(true);
    setErrorMessage(null);

    const poll = async () => {
      try {
        const response = await getSubtitleStatus(reqId);

        
        if (response.status === "completed") {
          stopPolling();
          setPollingStatus("success");
          setIsGenerating(false);
          
          // Add subtitles to timeline
          addSubtitlesToTimeline(response.subtitles || []);
          
          // Reset status after 3 seconds
          setTimeout(() => {
            setPollingStatus("idle");
          }, 3000);
        } else if (response.status === "pending") {
          // Continue polling - interval will call this again
        } else if (response.status === "failed") {
          stopPolling();
          setPollingStatus("error");
          setIsGenerating(false);
          setErrorMessage(response.error || "Failed to generate subtitles");
          console.error("Error generating subtitles:", response.error);
        }
      } catch (error) {
        stopPolling();
        setPollingStatus("error");
        setIsGenerating(false);
        setErrorMessage(error instanceof Error ? error.message : "Failed to get subtitle status");
        console.error("Error polling for subtitles:", error);
      }
    };

    // Poll immediately, then every 2 seconds
    await poll();
    pollingIntervalRef.current = setInterval(poll, 2000);
  };

  const handleGenerateSubtitles = async () => {
    if (!(selectedElement instanceof VideoElement)) {
      return;
    }

    const videoElement = selectedElement as VideoElement;
    

    try {
      const reqId = await onGenerateSubtitles(videoElement);
      if (!reqId) {
        setPollingStatus("error");
        setIsGenerating(false);
        setErrorMessage("Failed to start subtitle generation");
        console.error("Error generating subtitles: Failed to start subtitle generation");
        return;
      }
      currentReqIdRef.current = reqId;
      await startPolling(reqId);
    } catch (error) {
      setPollingStatus("error");
      setIsGenerating(false);
      setErrorMessage(error instanceof Error ? error.message : "Failed to start subtitle generation");
      console.error("Error generating subtitles:", error);
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
    // Reset polling state when element changes
    stopPolling();
    setPollingStatus("idle");
    setIsGenerating(false);
    setErrorMessage(null);
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
      {!isLoading && containsAudio === true && pollingStatus === "idle" && !isGenerating && (
        <div className="panel-section">
          <div className="empty-state">
            <div className="empty-state-content">
              <Volume2 className="empty-state-icon" />
              <p className="empty-state-text">Audio detected! You can now generate subtitles</p>
            </div>
          </div>
        </div>
      )}

      {/* Polling/Generating State */}
      {!isLoading && isGenerating && pollingStatus === "polling" && (
        <div className="panel-section">
          <div className="empty-state">
            <div className="empty-state-content">
              <Loader2 className="empty-state-icon animate-spin" />
              <p className="empty-state-text">Generating subtitles... Please wait</p>
            </div>
          </div>
        </div>
      )}

      {/* Success State */}
      {!isLoading && pollingStatus === "success" && (
        <div className="panel-section">
          <div className="empty-state">
            <div className="empty-state-content">
              <CheckCircle2 className="empty-state-icon" color="var(--color-green-500)" />
              <p className="empty-state-text">Subtitles generated successfully!</p>
            </div>
          </div>
        </div>
      )}

      {/* Error State */}
      {!isLoading && pollingStatus === "error" && (
        <div className="panel-section">
          <div className="empty-state">
            <div className="empty-state-content">
              <XCircle className="empty-state-icon" color="var(--color-red-500)" />
              <p className="empty-state-text">{errorMessage || "Failed to generate subtitles"}</p>
            </div>
          </div>
        </div>
      )}

      {/* Generate Button */}
      {!isLoading && (
        <div className="flex panel-section">
          <button
            onClick={handleGenerateSubtitles}
            disabled={!containsAudio || isGenerating}
            className="btn-primary w-full"
          >
            {isGenerating ? "Generating..." : "Generate Subtitles"}
          </button>
        </div>
      )}
    </div>
  );
}
