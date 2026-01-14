import { VideoEditor, LivePlayerProvider, TimelineProvider } from "@twick/studio";

const videoResolution = {
  width: 720,
  height: 1280,
}
const ExampleDemo = () => {
  return (
    <LivePlayerProvider>
      <TimelineProvider
        resolution={videoResolution}
        contextId={'my-video-project'}
      >
        <VideoEditor
          editorConfig={{
            canvasMode: true,
            videoProps: {
              width: videoResolution.width,
              height: videoResolution.height,
            },
          }}
        />
      </TimelineProvider>
    </LivePlayerProvider>
  );
};

export default ExampleDemo;
