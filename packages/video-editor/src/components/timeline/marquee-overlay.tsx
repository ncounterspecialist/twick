interface MarqueeRect {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

interface MarqueeOverlayProps {
  marquee: MarqueeRect | null;
}

/** Renders the marquee selection rectangle. Does not capture pointer events. */
export function MarqueeOverlay({ marquee }: MarqueeOverlayProps) {
  return (
    <div
      className="twick-marquee-overlay"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 25,
        pointerEvents: "none",
      }}
    >
      {marquee && (
        <div
          className="twick-marquee-rect"
          style={{
            position: "absolute",
            left: Math.min(marquee.startX, marquee.endX),
            top: Math.min(marquee.startY, marquee.endY),
            width: Math.abs(marquee.endX - marquee.startX),
            height: Math.abs(marquee.endY - marquee.startY),
            border: "1px solid rgba(255, 255, 255, 0.7)",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            pointerEvents: "none",
          }}
        />
      )}
    </div>
  );
}
