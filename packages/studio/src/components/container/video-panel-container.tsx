import type { PanelProps } from "../../types";
import { VideoPanel } from "../panel/video-panel";
import { useMediaPanel } from "../../hooks/use-media-panel";
import { useMedia } from "../../context/media-context";
import { getMediaManager, CloudMediaUpload } from "../shared";

export function VideoPanelContainer(props: PanelProps) {
  const { addItem } = useMedia("video");
  const mediaManager = getMediaManager();
  const {
    items,
    handleSelection,
    handleFileUpload,
    isLoading,
    acceptFileTypes,
  } = useMediaPanel("video", {
    selectedElement: props.selectedElement ?? null,
    addElement: props.addElement!,
    updateElement: props.updateElement!,
  },
  props.videoResolution);

  const onUrlAdd = async (url: string) => {
    const nameFromUrl = (() => {
      try {
        const u = new URL(url);
        const parts = u.pathname.split("/").filter(Boolean);
        return decodeURIComponent(parts[parts.length - 1] || url);
      } catch {
        return url;
      }
    })();

    const newItem = await mediaManager.addItem({
      name: nameFromUrl,
      url,
      type: "video",
      metadata: { source: "url" },
    });
    addItem(newItem);
  };

  const onCloudUploadSuccess = async (url: string, file: File) => {
    const newItem = await mediaManager.addItem({
      name: file.name,
      url,
      type: "video",
      metadata: { source: props.uploadConfig?.provider ?? "s3" },
    });
    addItem(newItem);
  };

  return (
    <>
      {props.uploadConfig && (
        <div className="flex panel-section">
          <CloudMediaUpload
            uploadApiUrl={props.uploadConfig.uploadApiUrl}
            provider={props.uploadConfig.provider}
            accept="video/*"
            onSuccess={onCloudUploadSuccess}
            buttonText="Upload video"
            className="btn-ghost w-full"
          />
        </div>
      )}
      <VideoPanel
        items={items}
        onItemSelect={handleSelection}
        onFileUpload={handleFileUpload}
        isLoading={isLoading}
        acceptFileTypes={acceptFileTypes}
        onUrlAdd={onUrlAdd}
      />
    </>
  );
}
