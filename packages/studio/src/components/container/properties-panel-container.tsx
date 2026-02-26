import { ElementProps } from "../properties/element-props";
import { TextEffects } from "../properties/text-effects";
import { Animation } from "../properties/animation";
import {
  VideoElement,
  TextElement,
  AudioElement,
  CaptionElement,
  ArrowElement,
  LineElement,
  RectElement,
  CircleElement,
  type TrackElement,
  Size,
  useTimelineContext,
} from "@twick/timeline";
import { CaptionPropPanel } from "../properties/caption-prop";
import { PlaybackPropsPanel } from "../properties/playback-props";
import { GenerateCaptionsPanel } from "../properties/generate-captions.tsx";
import { TextPropsPanel } from "../properties/text-props";
import { AnnotationStylePanel } from "../properties/annotation-style-panel";
import { ICaptionGenerationPollingResponse, CaptionEntry } from "../../types";
import { useCallback } from "react";

const DEFAULT_CANVAS_BACKGROUND = "#000000";

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
  const { editor, present } = useTimelineContext();
  const backgroundColor =
    present?.backgroundColor ??
    editor.getBackgroundColor() ??
    DEFAULT_CANVAS_BACKGROUND;

  const handleBackgroundColorChange = useCallback(
    (value: string) => {
      editor.setBackgroundColor(value);
    },
    [editor]
  );

  const annotationTitle =
    selectedElement instanceof ArrowElement
      ? "Arrow callout"
      : selectedElement instanceof LineElement
        ? "Line"
        : selectedElement instanceof RectElement
          ? "Box"
          : selectedElement instanceof CircleElement
            ? "Circle"
            : null;
  const title = annotationTitle
    ?? (selectedElement instanceof TextElement ? selectedElement.getText() : null)
    ?? selectedElement?.getName()
    ?? selectedElement?.getType()
    ?? "Element";

  return (
    <aside className="properties-panel" aria-label="Element properties inspector">
      <div className="properties-header">
        {!selectedElement && (
          <h3 className="properties-title">Composition</h3>
        )}
        {selectedElement && selectedElement.getType() === "caption" && (
          <h3 className="properties-title">Caption</h3>
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
              <div className="color-control">
                <label className="label-small">Background Color</label>
                <div className="color-inputs">
                  <input
                    type="color"
                    value={backgroundColor}
                    onChange={(e) =>
                      handleBackgroundColorChange(e.target.value)}
                    className="color-picker"
                  />
                  <input
                    type="text"
                    value={backgroundColor}
                    onChange={(e) =>
                      handleBackgroundColorChange(e.target.value)}
                    className="color-text"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Caption inspector when caption is selected */}
        {selectedElement instanceof CaptionElement && (
            <>
              <CaptionPropPanel
                selectedElement={selectedElement}
                updateElement={updateElement}
              />
            </>
          )}

        {/* Element inspector when non-caption is selected */}
        {selectedElement && !(selectedElement instanceof CaptionElement) && (
            <>
              {(() => {
                const isText = selectedElement instanceof TextElement;
                const isVideo = selectedElement instanceof VideoElement;
                const isAudio = selectedElement instanceof AudioElement;

                const isAnnotation =
                  selectedElement instanceof ArrowElement ||
                  selectedElement instanceof LineElement ||
                  selectedElement instanceof RectElement ||
                  selectedElement instanceof CircleElement;

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

                    {/* Annotation style – color & opacity (arrow, highlight, blur) */}
                    {isAnnotation && (
                      <AnnotationStylePanel
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
