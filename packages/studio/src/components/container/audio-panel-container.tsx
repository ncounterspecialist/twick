import { useMediaPanel } from "../../hooks/use-media-panel";
import { AudioPanel } from "../panel/audio-panel";
import type { PanelProps } from "../../types";
import { useMedia } from "../../context/media-context";
import { getMediaManager, CloudMediaUpload } from "../shared";

export const AudioPanelContainer = (props: PanelProps) => {
  const { addItem } = useMedia("audio");
  const mediaManager = getMediaManager();
  const {
    items,
    searchQuery,
    setSearchQuery,
    handleSelection,
    handleFileUpload,
    isLoading,
    acceptFileTypes,
  } = useMediaPanel("audio", {
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
      type: "audio",
      metadata: { source: "url" },
    });
    addItem(newItem);
  };

  const onCloudUploadSuccess = async (url: string, file: File) => {
    const newItem = await mediaManager.addItem({
      name: file.name,
      url,
      type: "audio",
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
            accept="audio/*"
            onSuccess={onCloudUploadSuccess}
            buttonText="Upload audio"
            className="btn-ghost w-full"
          />
        </div>
      )}
      <AudioPanel
        items={items}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onItemSelect={handleSelection}
        onFileUpload={handleFileUpload}
        isLoading={isLoading}
        acceptFileTypes={acceptFileTypes}
        onUrlAdd={onUrlAdd}
      />
    </>
  );
};
