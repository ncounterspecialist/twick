import React from 'react';
import { TimelineProvider, useTimelineContext } from '../context/timeline-context';
import { TimelineData } from '../types';

// Test component that demonstrates undo/redo functionality
const UndoRedoTestComponent: React.FC = () => {
  const { 
    canUndo, 
    canRedo, 
    undo, 
    redo, 
    resetHistory,
    enableUndoRedo,
    timelineAction 
  } = useTimelineContext();

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
      <h3>Undo/Redo Test Component</h3>
      <p>Undo/Redo Enabled: {enableUndoRedo ? 'Yes' : 'No'}</p>
      <p>Can Undo: {canUndo ? 'Yes' : 'No'}</p>
      <p>Can Redo: {canRedo ? 'Yes' : 'No'}</p>
      <p>Last Action: {timelineAction.type}</p>
      
      <div style={{ marginTop: '10px' }}>
        <button 
          onClick={undo} 
          disabled={!canUndo}
          style={{ marginRight: '10px' }}
        >
          Undo
        </button>
        <button 
          onClick={redo} 
          disabled={!canRedo}
          style={{ marginRight: '10px' }}
        >
          Redo
        </button>
        <button onClick={resetHistory}>
          Reset History
        </button>
      </div>
    </div>
  );
};

// Test data
const testTimelineData: TimelineData = {
  timeline: [
    {
      id: 't-1',
      name: 'Test Timeline',
      type: 'video',
      elements: []
    }
  ],
  version: 1
};

// Test wrapper
export const UndoRedoTest: React.FC = () => {
  return (
    <TimelineProvider
      initialData={testTimelineData}
      enableUndoRedo={true}
      undoRedoPersistenceKey="test-project"
      maxHistorySize={10}
    >
      <UndoRedoTestComponent />
    </TimelineProvider>
  );
};

export default UndoRedoTest; 