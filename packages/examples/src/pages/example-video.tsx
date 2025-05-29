import { useState, useRef } from "react";
import { LivePlayer } from "@twick/player";
import { sample } from "../helpers/sample-data";
import "./example-video.css";

const ExampleVideo = () => {
  const [jsonInput, setJsonInput] = useState(JSON.stringify(sample, null, 2));
  const [playerData, setPlayerData] = useState(null);
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
    <div className="json-player">
      <div className="controls">
        <div className="file-input-container">
          <input
            type="file"
            accept=".json"
            onChange={handleFileChange}
            ref={fileInputRef}
            className="file-input"
          />
          <button
            className="file-button"
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
        />

        <div className="buttons">
          <button onClick={handleLoadJson}>Load JSON</button>
          <button onClick={handlePlayPause} disabled={!videoDuration}>
            {playing ? "Pause" : "Play"}
          </button>
        </div>
        {error && <div className="error">{error}</div>}
      </div>
      <div className="player-container">
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
  );
};

export default ExampleVideo;
