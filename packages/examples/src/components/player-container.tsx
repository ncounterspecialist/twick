import { LivePlayer } from "@twick/live-player";

export const PlayerContainer = ({
  playerData,
  playing,
}: {
  playerData: any;
  playing: boolean;
}) => {
  return (
    <div
      className="aspect-[9/16] w-full max-w-[360px] overflow-hidden rounded-lg
     bg-gray-100 dark:bg-gray-800"
    >
      <LivePlayer
        projectData={playerData}
        videoSize={{
          width: 720,
          height: 1280,
        }}
        playing={playing}
      />
    </div>
  );
};
