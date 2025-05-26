
import React from 'react';
import { Canvas as FabricCanvas } from 'fabric';

interface CanvasContainerProps {
  fabricCanvas: FabricCanvas | null;
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

const CanvasContainer: React.FC<CanvasContainerProps> = ({ 
  fabricCanvas, 
  canvasRef 
}) => {
  return (
    <>
      <div className="flex items-center justify-center w-full h-full bg-black">
        <canvas ref={canvasRef} className="w-full h-full"></canvas>
      </div>
      
      {!fabricCanvas && (
        <div className="absolute inset-0 flex items-center justify-center text-white">
          Loading canvas...
        </div>
      )}
    
    </>
  );
};

export { CanvasContainer, type CanvasContainerProps };