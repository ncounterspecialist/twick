import type { CaptionDoc } from './types';

const pad = (n: number, w = 2) => String(n).padStart(w, '0');

const formatSrtTime = (ms: number) => {
  const t = Math.max(0, ms);
  const hh = Math.floor(t / 3600000);
  const mm = Math.floor((t % 3600000) / 60000);
  const ss = Math.floor((t % 60000) / 1000);
  const mmm = t % 1000;
  return `${pad(hh)}:${pad(mm)}:${pad(ss)},${pad(mmm, 3)}`;
};

const formatVttTime = (ms: number) => {
  const t = Math.max(0, ms);
  const hh = Math.floor(t / 3600000);
  const mm = Math.floor((t % 3600000) / 60000);
  const ss = Math.floor((t % 60000) / 1000);
  const mmm = t % 1000;
  return `${pad(hh)}:${pad(mm)}:${pad(ss)}.${pad(mmm, 3)}`;
};

export const exportSrt = (doc: CaptionDoc) => {
  return doc.segments
    .slice()
    .sort((a, b) => a.startMs - b.startMs)
    .map((seg, idx) => {
      const start = formatSrtTime(seg.startMs);
      const end = formatSrtTime(seg.endMs);
      const speakerPrefix = seg.speaker ? `[<${seg.speaker}>] ` : '';
      return `${idx + 1}\n${start} --> ${end}\n${speakerPrefix}${seg.text}\n`;
    })
    .join('\n');
};

export const exportVtt = (doc: CaptionDoc) => {
  const body = doc.segments
    .slice()
    .sort((a, b) => a.startMs - b.startMs)
    .map((seg) => {
      const start = formatVttTime(seg.startMs);
      const end = formatVttTime(seg.endMs);
      const speakerPrefix = seg.speaker ? `[<${seg.speaker}>] ` : '';
      return `${start} --> ${end}\n${speakerPrefix}${seg.text}\n`;
    })
    .join('\n');
  return `WEBVTT\n\n${body}`;
};

