import { useState, useRef } from "react";
import { LivePlayer } from "@twick/live-player";
import { sample } from "../helpers/sample-data";
import "./example-video.css";

const ExampleVideo = () => {
  const [jsonInput, setJsonInput] = useState(JSON.stringify(sample, null, 2));
  const [playerData, setPlayerData] = useState(sample);
  const [error, setError] = useState("");
  const [playing, setPlaying] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoDurationRef = useRef(0);

  const handleLoadJson = () => {
    try {
      const data = JSON.parse(jsonInput);
      setPlayerData(data);
      setError("");
    } catch (err) {
      setError("Invalid JSON format");
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const data = JSON.parse(content);
          setJsonInput(content);
          setPlayerData(data);
          setError("");
        } catch (err) {
          setError("Invalid JSON file format");
        }
      };
      reader.readAsText(file);
    }
  };

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleTimeUpdate = (time: number) => {
    if (videoDurationRef.current && time >= videoDurationRef.current) {
      setPlaying(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 p-6 dark:bg-gray-900">
      <div className="flex w-full flex-col gap-6 lg:flex-row">
        <div className="flex w-full flex-col gap-4 lg:w-1/2">
          <div className="flex flex-col gap-4">
            <div className="relative">
              <input
                type="file"
                accept=".json"
                onChange={handleFileChange}
                ref={fileInputRef}
                className="hidden"
              />
              <button
                className="btn btn-primary w-full"
                onClick={() => fileInputRef.current?.click()}
              >
                Choose JSON File
              </button>
            </div>

            <textarea
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder="Paste your JSON here..."
              rows={20}
              className="w-full rounded-lg border border-gray-300 bg-white p-4 font-mono text-sm dark:border-gray-600 dark:bg-gray-800"
            />

            <div className="flex gap-4">
              <button
                onClick={handleLoadJson}
                className="btn btn-primary flex-1"
              >
                Update Preview
              </button>
              <button
                onClick={handlePlayPause}
                disabled={!videoDuration}
                className="btn btn-secondary flex-1 disabled:opacity-50"
              >
                {playing ? "Pause" : "Play"}
              </button>
            </div>
            {error && (
              <div className="rounded-lg bg-red-100 p-4 text-red-700 dark:bg-red-900 dark:text-red-100">
                {error}
              </div>
            )}
          </div>
        </div>

        <div className="flex w-full items-center justify-center lg:w-1/2">
          <div className="aspect-[9/16] w-full max-w-[360px] overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
            <LivePlayer
              projectData={playerData}
              onDurationChange={(duration: number) => {
                videoDurationRef.current = duration;
                setVideoDuration(duration);
              }}
              videoSize={{
                width: 720,
                height: 1280,
              }}
              onTimeUpdate={handleTimeUpdate}
              playing={playing}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExampleVideo;
