import { ElementProps } from "../properties/element-props";
import { TextEffects } from "../properties/text-effects";
import { Animation } from "../properties/animation";
import { VideoElement, TextElement, AudioElement, type TrackElement, Size } from "@twick/timeline";
import { PlaybackPropsPanel } from "../properties/playback-props";
import { GenerateCaptionsPanel } from "../properties/generate-captions.tsx";
import { TextPropsPanel } from "../properties/text-props";
import { ICaptionGenerationPollingResponse, CaptionEntry } from "../../types";

interface PropertiesPanelContainerProps {
  selectedElement: TrackElement | null;
  updateElement: (element: TrackElement) => void;
  addCaptionsToTimeline: (captions: CaptionEntry[]) => void;
  onGenerateCaptions: (videoElement: VideoElement) => Promise<string | null>;
  getCaptionstatus: (reqId: string) => Promise<ICaptionGenerationPollingResponse>;
  pollingIntervalMs: number;
  videoResolution: Size;
}

export function PropertiesPanelContainer({
  selectedElement,
  updateElement,
  addCaptionsToTimeline,
  onGenerateCaptions,
  getCaptionstatus,
  pollingIntervalMs,
  videoResolution,
}: PropertiesPanelContainerProps) {

  const title = selectedElement instanceof TextElement ? selectedElement.getText() : selectedElement?.getName() || selectedElement?.getType() || "Element";

  return (
    <aside className="properties-panel" aria-label="Element properties inspector">
      <div className="properties-header">
        {!selectedElement && (
          <h3 className="properties-title">Composition</h3>
        )}
        {selectedElement && selectedElement.getType() === "caption" && (
          <h3 className="properties-title">Edit from the captions panel</h3>
        )}
        {selectedElement && selectedElement.getType() !== "caption" && (
          <h3 className="properties-title">
            {title}
          </h3>
        )}
      </div>

      <div className="prop-content">
        {/* Composition inspector when nothing selected */}
        {!selectedElement && (
          <div className="panel-container">
            <div className="panel-title">Canvas & Render</div>
            <div className="properties-group">
              <div className="property-section">
                <span className="property-label">Size</span>
                <span className="properties-size-readonly">
                  {videoResolution.width} × {videoResolution.height}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Element inspector when something is selected */}
        {selectedElement && selectedElement.getType() === "caption"
          ? null
          : selectedElement && (
            <>
              {(() => {
                const isText = selectedElement instanceof TextElement;
                const isVideo = selectedElement instanceof VideoElement;
                const isAudio = selectedElement instanceof AudioElement;

                return (
                  <>
                    {/* Typography (Text only) */}
                    {isText && (
                      <TextPropsPanel
                        selectedElement={selectedElement}
                        updateElement={updateElement}
                      />
                    )}

                    {/* Transform – visual elements only (not audio) */}
                    {!isAudio && (
                      <ElementProps
                        selectedElement={selectedElement}
                        updateElement={updateElement}
                      />
                    )}

                    {/* Playback + Volume – video and audio */}
                    {(isVideo || isAudio) && (
                      <PlaybackPropsPanel
                        selectedElement={selectedElement}
                        updateElement={updateElement}
                      />
                    )}

                    {/* Text Effects – text only */}
                    {isText && (
                      <TextEffects
                        selectedElement={selectedElement}
                        updateElement={updateElement}
                      />
                    )}

                    {/* Animations – visual elements only (not audio) */}
                    {!isAudio && (
                      <Animation
                        selectedElement={selectedElement}
                        updateElement={updateElement}
                      />
                    )}

                    {/* Generate Captions – video only */}
                    {isVideo && (
                      <GenerateCaptionsPanel
                        selectedElement={selectedElement}
                        addCaptionsToTimeline={addCaptionsToTimeline}
                        onGenerateCaptions={onGenerateCaptions}
                        getCaptionstatus={getCaptionstatus}
                        pollingIntervalMs={pollingIntervalMs}
                      />
                    )}
                  </>
                );
              })()}
            </>
          )}
      </div>
    </aside>
  );
}
