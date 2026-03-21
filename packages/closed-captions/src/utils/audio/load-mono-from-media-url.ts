type MonoLoaded = {
  samples: Float32Array;
  sampleRate: number;
  durationMs: number;
};

const monoCache = new Map<string, Promise<MonoLoaded | null>>();

export async function loadMonoFromMediaUrl(url: string): Promise<MonoLoaded | null> {
  const existing = monoCache.get(url);
  if (existing) return existing;

  const promise = (async (): Promise<MonoLoaded | null> => {
    try {
      const buf = await fetch(url).then((r) => r.arrayBuffer());
      const ctx = new AudioContext();
      const audio = await ctx.decodeAudioData(buf.slice(0));
      await ctx.close();

      const ch0 = audio.getChannelData(0);
      let samples: Float32Array;
      if (audio.numberOfChannels === 1) {
        samples = ch0;
      } else {
        samples = new Float32Array(ch0.length);
        samples.set(ch0);
        for (let c = 1; c < audio.numberOfChannels; c += 1) {
          const ch = audio.getChannelData(c);
          for (let i = 0; i < samples.length; i += 1) {
            samples[i] += ch[i];
          }
        }
        const inv = 1 / audio.numberOfChannels;
        for (let i = 0; i < samples.length; i += 1) {
          samples[i] *= inv;
        }
      }

      const durationMs = (samples.length / audio.sampleRate) * 1000;
      return { samples, sampleRate: audio.sampleRate, durationMs };
    } catch {
      return null;
    }
  })();

  monoCache.set(url, promise);
  return promise;
}
