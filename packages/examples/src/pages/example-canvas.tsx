import {
  CANVAS_OPERATIONS,
  type CanvasElement,
  useTwickCanvas,
} from "@twick/canvas";
import { useEffect, useRef, useState } from "react";
import "./example-canvas.css";

export default function ExampleCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [elements, setElements] = useState<any[]>([]);
  const handleCanvasReady = (canvas: any) => {
    console.log("Canvas ready", canvas);
  };

  const handleCanvasOperation = (operation: string, data: any) => {
    switch (operation) {
      case CANVAS_OPERATIONS.ITEM_SELECTED:
        console.log("Item selected", data);
        break;
      case CANVAS_OPERATIONS.ITEM_UPDATED:
        console.log("Item updated", data);
        break;
      default:
        break;
    }
  };

  const initCanvas = () => {
    const container = containerRef.current;
    const canvasSize = {
      width: container?.clientWidth,
      height: container?.clientHeight,
    };
    buildCanvas({
      videoSize: {
        width: 720,
        height: 1280,
      },
      canvasSize,
      canvasRef: canvasRef.current,
    });
  };

  useEffect(() => {
      console.log("initCanvas");
      initCanvas();
  }, []);

  const { twickCanvas, buildCanvas, addElementToCanvas } = useTwickCanvas({
    onCanvasReady: handleCanvasReady,
    onCanvasOperation: handleCanvasOperation,
  });

  const addImage = () => {
    const image: CanvasElement = {
      type: "image",
      id: elements.length + 1,
      frame: {
        size: [400, 300],
      },
      props: {
        src: "https://picsum.photos/200/150",
      },
    };
    if (twickCanvas) {
      addElementToCanvas({ element: image, index: elements.length });
    }
    setElements([...elements, image]);
  };

  const addRect = () => {
    const rect: CanvasElement = {
      type: "rect",
      id: elements.length + 1,
      props: {
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        fill: "#" + Math.floor(Math.random() * 16777215).toString(16),
      },
    };
    if (twickCanvas) {
      addElementToCanvas({ element: rect, index: elements.length });
    }
    setElements([...elements, rect]);
  };

  const addText = () => {
    const text: CanvasElement = {
      type: "text",
      id: elements.length + 1,
      props: {
        x: 100,
        y: 100,
        text: "Hello World",
        fontSize: 64,
        fill: "#FFFFFF",
      },
    };
    if (twickCanvas) {
      addElementToCanvas({ element: text, index: elements.length });
    }
    setElements([...elements, text]);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px" }}>
      <div style={{ marginBottom: "20px" }}>
        <button onClick={addImage} style={{ marginRight: "10px" }}>
          Add Image
        </button>
        <button onClick={addRect} style={{ marginRight: "10px" }}>
          Add Rectangle
        </button>
        <button onClick={addText}>Add Text</button>
      </div>
      <div ref={containerRef} className="canvas-container">
        <canvas ref={canvasRef} className="w-full h-full"></canvas>
      </div>
    </div>
  );
}
