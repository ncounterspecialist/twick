import { ZoomIn, ZoomOut } from "lucide-react";

const MAX_ZOOM = 3;
const MIN_ZOOM = 0.5;
const ZOOM_STEP = 0.25;

const TimelineZoom = ({
  zoomLevel,
  setZoomLevel,
  minZoom = MIN_ZOOM,
  maxZoom = MAX_ZOOM,
  zoomStep = ZOOM_STEP,
}: {
  zoomLevel: number;
  setZoomLevel: (zoom: number) => void;
  minZoom?: number;
  maxZoom?: number;
  zoomStep?: number;
}) => {
  const handleZoomIn = () => {
    if (zoomLevel < maxZoom) {
      setZoomLevel(zoomLevel + zoomStep);
    }
  };

  const handleZoomOut = () => {
    if (zoomLevel > minZoom) {
      setZoomLevel(zoomLevel - zoomStep);
    }
  };

  return (
    <div className="twick-track-zoom-container">
      <ZoomOut size={28} onClick={handleZoomOut}/>
      <div className="twick-zoom-slider">
        <div
          className="twick-zoom-slider-track"
          style={{
            width: `${((zoomLevel - minZoom) / (maxZoom - minZoom)) * 100}%`,
          }}
        />
        <div
          className="twick-zoom-slider-thumb"
          style={{
            left: `calc(${
              ((zoomLevel - minZoom) / (maxZoom - minZoom)) * 100
            }%)`,
          }}
        />
      </div>
      <ZoomIn size={28} onClick={handleZoomIn} />
    </div>
  );
};

export default TimelineZoom;
