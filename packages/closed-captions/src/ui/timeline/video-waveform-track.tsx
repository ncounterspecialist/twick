import { useEffect, useMemo, useRef, useState } from 'react';
import { computePeaks } from '../../utils/audio/compute-peaks';
import { loadMonoFromMediaUrl } from '../../utils/audio/load-mono-from-media-url';

export const VideoWaveformTrack = ({
  mediaUrl,
  durationMs,
  widthPx,
  heightPx,
}: {
  mediaUrl?: string;
  durationMs: number;
  widthPx: number;
  heightPx: number;
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [peaks, setPeaks] = useState<Float32Array | null>(null);

  const buckets = useMemo(() => Math.max(200, Math.min(2000, Math.floor(widthPx / 2))), [widthPx]);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      if (!mediaUrl) {
        setPeaks(null);
        return;
      }

      const loaded = await loadMonoFromMediaUrl(mediaUrl);
      if (cancelled) return;
      if (!loaded) {
        setPeaks(null);
        return;
      }
      const computed = computePeaks(loaded.samples, buckets);
      setPeaks(computed);
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [mediaUrl, buckets]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.max(1, Math.floor(widthPx * dpr));
    canvas.height = Math.max(1, Math.floor(heightPx * dpr));
    canvas.style.width = `${widthPx}px`;
    canvas.style.height = `${heightPx}px`;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.scale(dpr, dpr);

    // Background
    ctx.clearRect(0, 0, widthPx, heightPx);
    ctx.fillStyle = 'rgba(124, 92, 255, 0.06)';
    ctx.fillRect(0, 0, widthPx, heightPx);

    // Center line
    ctx.strokeStyle = 'rgba(255,255,255,0.08)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, Math.floor(heightPx / 2) + 0.5);
    ctx.lineTo(widthPx, Math.floor(heightPx / 2) + 0.5);
    ctx.stroke();

    if (!peaks || peaks.length === 0) {
      // Placeholder
      ctx.fillStyle = 'rgba(231,238,252,0.35)';
      ctx.font = '11px ui-sans-serif, system-ui';
      ctx.fillText(mediaUrl ? 'Loading waveform…' : 'No video loaded', 10, 18);
      return;
    }

    const barCount = peaks.length;
    const barW = widthPx / barCount;
    const maxH = Math.max(6, heightPx - 14);

    // Normalize with soft floor for better silence visibility
    let peakMax = 0.001;
    for (let i = 0; i < peaks.length; i += 1) peakMax = Math.max(peakMax, peaks[i]);

    ctx.fillStyle = 'rgba(231, 238, 252, 0.55)';
    for (let i = 0; i < barCount; i += 1) {
      const p = peaks[i] / peakMax;
      const h = Math.max(2, p * maxH);
      const x = i * barW;
      const y = (heightPx - h) / 2;
      ctx.fillRect(x, y, Math.max(1, barW * 0.8), h);
    }
  }, [peaks, widthPx, heightPx, mediaUrl, durationMs]);

  return (
    <div className="ccTlWaveformShell" style={{ width: widthPx, height: heightPx }}>
      <canvas ref={canvasRef} className="ccTlWaveformCanvas" />
    </div>
  );
};
