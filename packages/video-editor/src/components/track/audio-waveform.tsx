import { useEffect, useMemo, useRef, useState } from "react";

const waveformCache = new Map<string, Float32Array>();

const buildCacheKey = (src: string, bucketCount: number) => `${src}::${bucketCount}`;

const getSeed = (src: string) => {
  let seed = 2166136261;
  for (let i = 0; i < src.length; i += 1) {
    seed ^= src.charCodeAt(i);
    seed = Math.imul(seed, 16777619);
  }
  return seed >>> 0;
};

const generateFallbackPeaks = (bucketCount: number, seed: number) => {
  const peaks = new Float32Array(bucketCount);
  let randomState = seed || 123456789;
  for (let i = 0; i < bucketCount; i += 1) {
    randomState = (1103515245 * randomState + 12345) >>> 0;
    const noise = (randomState % 1000) / 1000;
    const shape = 0.35 + 0.65 * Math.abs(Math.sin(i * 0.21 + noise * 2.7));
    peaks[i] = Math.max(0.08, Math.min(1, shape));
  }
  return peaks;
};

const computePeaks = (channelData: Float32Array, bucketCount: number) => {
  const peaks = new Float32Array(bucketCount);
  const step = Math.max(1, Math.floor(channelData.length / bucketCount));
  for (let i = 0; i < bucketCount; i += 1) {
    const start = i * step;
    const end = Math.min(channelData.length, start + step);
    let peak = 0;
    for (let j = start; j < end; j += 1) {
      const sample = Math.abs(channelData[j]);
      if (sample > peak) {
        peak = sample;
      }
    }
    peaks[i] = peak;
  }
  return peaks;
};

export const AudioWaveform: React.FC<{
  src?: string;
  widthPx: number;
  heightPx: number;
  label?: string;
}> = ({ src, widthPx, heightPx, label }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [peaks, setPeaks] = useState<Float32Array | null>(null);

  const bucketCount = useMemo(
    () => Math.max(32, Math.min(2048, Math.floor(widthPx / 3))),
    [widthPx]
  );

  useEffect(() => {
    let isCancelled = false;
    const controller = new AbortController();

    const loadWaveform = async () => {
      if (!src) {
        setPeaks(generateFallbackPeaks(bucketCount, 1));
        return;
      }

      const cacheKey = buildCacheKey(src, bucketCount);
      const cached = waveformCache.get(cacheKey);
      if (cached) {
        setPeaks(cached);
        return;
      }

      try {
        const response = await fetch(src, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Failed to fetch audio (${response.status})`);
        }
        const arrayBuffer = await response.arrayBuffer();
        const audioCtx = new AudioContext();
        const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer.slice(0));
        const channelData = audioBuffer.getChannelData(0);
        const computed = computePeaks(channelData, bucketCount);

        waveformCache.set(cacheKey, computed);
        if (!isCancelled) {
          setPeaks(computed);
        }
        await audioCtx.close();
      } catch {
        if (!isCancelled) {
          setPeaks(generateFallbackPeaks(bucketCount, getSeed(src)));
        }
      }
    };

    loadWaveform();
    return () => {
      isCancelled = true;
      controller.abort();
    };
  }, [src, bucketCount]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.max(1, Math.floor(widthPx * dpr));
    canvas.height = Math.max(1, Math.floor(heightPx * dpr));
    canvas.style.width = `${widthPx}px`;
    canvas.style.height = `${heightPx}px`;

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    context.clearRect(0, 0, widthPx, heightPx);

    const centerY = Math.floor(heightPx / 2) + 0.5;
    context.strokeStyle = "rgba(255, 255, 255, 0.18)";
    context.lineWidth = 1;
    context.beginPath();
    context.moveTo(0, centerY);
    context.lineTo(widthPx, centerY);
    context.stroke();

    if (!peaks || peaks.length === 0) {
      return;
    }

    const maxHeight = Math.max(6, heightPx - 10);
    let peakMax = 0.001;
    for (let i = 0; i < peaks.length; i += 1) {
      peakMax = Math.max(peakMax, peaks[i]);
    }

    const gap = 1;
    const barWidth = Math.max(1, Math.floor(widthPx / peaks.length) - gap);
    context.fillStyle = "rgba(255, 255, 255, 0.95)";

    for (let i = 0; i < peaks.length; i += 1) {
      const normalized = peaks[i] / peakMax;
      const waveHeight = Math.max(2, normalized * maxHeight);
      const x = i * (barWidth + gap);
      if (x > widthPx) {
        break;
      }
      const y = (heightPx - waveHeight) / 2;
      context.fillRect(x, y, barWidth, waveHeight);
    }
  }, [widthPx, heightPx, peaks]);

  return (
    <div className="twick-audio-waveform-root" aria-label="Audio waveform">
      <canvas ref={canvasRef} className="twick-audio-waveform-canvas" />
      {label ? <span className="twick-audio-waveform-label">{label}</span> : null}
    </div>
  );
};
