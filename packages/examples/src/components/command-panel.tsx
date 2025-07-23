import { useState } from "react";
import { useTimelineContext, useTimelineEditor } from "@twick/timeline";

const CommandPanel = () => {
  const [command, setCommand] = useState("");
  const [result, setResult] = useState("");
  const { timelineAction } = useTimelineContext();
  const editor = useTimelineEditor();

  const executeCommand = () => {
    try {
      const parsedCommand = JSON.parse(command);
      const { operation, payload } = parsedCommand;

      switch (operation) {
        case "addElement":
          editor.addElement(payload).then((result) => {
            setResult(JSON.stringify(result, null, 2));
          });
          break;
        case "updateElement":
          editor.updateElement(payload);
          setResult("Element updated successfully");
          break;
        case "deleteItem":
          editor.deleteItem(payload.timelineId, payload.elementId);
          setResult("Item deleted successfully");
          break;
        case "addNewTimeline":
          const result = editor.addNewTimeline(payload);
          setResult(JSON.stringify(result, null, 2));
          break;
        case "loadProject":
          editor.setProjectData(payload.timeline, payload.version);
          setResult("Project loaded successfully");
          break;
        case "undo":
          editor.undo();
          setResult("Undo executed");
          break;
        case "redo":
          editor.redo();
          setResult("Redo executed");
          break;
        case "resetHistory":
          editor.resetHistory();
          setResult("History reset");
          break;
        default:
          setResult(`Unknown operation: ${operation}`);
      }
    } catch (error) {
      setResult(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
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
