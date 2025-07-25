import { useState } from "react";
import { useTimelineContext } from "@twick/timeline";

const CommandPanel = () => {
  const [command, setCommand] = useState("");
  const [result] = useState("");
  const { timelineAction } = useTimelineContext();

  const executeCommand = () => {
  };

  return (
    <div className="twick-command-panel">
      <div className="twick-command-header">
        <h3>Command Panel</h3>
      </div>
      <div className="twick-command-content">
        <div className="twick-command-input">
          <label>Command (JSON):</label>
          <textarea
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            placeholder='{"operation": "addElement", "payload": {...}}'
            rows={5}
          />
        </div>
        <button onClick={executeCommand}>Execute Command</button>
        <div className="twick-command-result">
          <label>Result:</label>
          <pre>{result}</pre>
        </div>
        <div className="twick-command-status">
          <label>Timeline Action:</label>
          <pre>{JSON.stringify(timelineAction, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
};

export default CommandPanel;
