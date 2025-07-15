import React, { useState } from "react";
import "../pages/example-demo.css";
import {
  TIMELINE_OPERATION,
  useTimelineContext,
  type TimelineElement,
} from "@twick/timeline";
import DOMPurify from "dompurify";

export const OPERATIONS = {
  NONE: "NONE",
  ADD_NEW_TIMELINE: TIMELINE_OPERATION.ADD_NEW_TIMELINE,
  DELETE_ITEM: TIMELINE_OPERATION.DELETE_ITEM,
  ADD_ELEMENT: TIMELINE_OPERATION.ADD_ELEMENT,
  UPDATE_ELEMENT: TIMELINE_OPERATION.UPDATE_ELEMENT,
};


const CommandPanel: React.FC = () => {
  const { selectedItem, setTimelineOperation } = useTimelineContext();
  const [selectedCommand, setSelectedCommand] = useState<string>(
    OPERATIONS.ADD_NEW_TIMELINE
  );
  const [jsonInput, setJsonInput] = useState(JSON.stringify({}, null, 2));

  const handleCommandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const command = e.target.value as keyof typeof TIMELINE_OPERATION;
    setSelectedCommand(command);
    switch (command) {
      case OPERATIONS.ADD_NEW_TIMELINE:
        setJsonInput(JSON.stringify({}, null, 2));
        break;
      case OPERATIONS.DELETE_ITEM:
        const timelineId = selectedItem?.id.startsWith("e-")
          ? (selectedItem as TimelineElement).timelineId
          : undefined;
        setJsonInput(
          JSON.stringify(
            {
              timelineId,
              id: selectedItem?.id,
            },
            null,
            2
          )
        );
        break;
      case OPERATIONS.ADD_ELEMENT:
        setJsonInput(
          JSON.stringify(
            {
              ...(selectedItem?.id.startsWith("t-")
                ? { timelineId: selectedItem?.id, element: {} }
                : {}),
            },
            null,
            2
          )
        );
        break;
      case OPERATIONS.UPDATE_ELEMENT:
        setJsonInput(
          JSON.stringify(
            {
              ...(selectedItem?.id.startsWith("e-")
                ? {
                    elementId: selectedItem.id,
                    timelineId: (selectedItem as TimelineElement).timelineId,
                    updates: {},
                  }
                : {}),
            },
            null,
            2
          )
        );
        break;
    }
  };

  const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonInput(e.target.value);
  };

  const handleExecuteCommand = () => {
    setTimelineOperation(selectedCommand, JSON.parse(DOMPurify.sanitize(jsonInput)));
    setJsonInput(JSON.stringify({}, null, 2));
    setSelectedCommand(OPERATIONS.NONE);
  };

  return (
    <div className="command-panel">
      <label className="command-label">Command</label>
      <select
        value={selectedCommand}
        onChange={handleCommandChange}
        className="command-select"
      >
        {Object.entries(OPERATIONS).map(([key, value]) => (
          <option key={key} value={value}>
            {value}
          </option>
        ))}
      </select>

      <label className="command-label">JSON Data</label>
      <textarea
        value={jsonInput}
        onChange={handleJsonChange}
        rows={8}
        className="command-textarea"
      />
      <button onClick={handleExecuteCommand}>Execute</button>
    </div>
  );
};

export default CommandPanel;
