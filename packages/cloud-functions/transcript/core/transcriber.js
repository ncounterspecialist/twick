import { SpeechClient } from "@google-cloud/speech/build/src/v2/index.js";
import {
  CLOUD_PROJECT_ID,
  CLOUD_REGION,
  getGCSUri,
  getGoogleCredentials,
  uploadFile,
} from "./gc.utils.js";
import { AUDIO_CONFIG } from "./audio.utils.js";

const LANGUAGE_CODE = {
  english: "en-US",
  italian: "it-IT",
  spanish: "es-ES",
  portuguese: "pt-PT",
  french: "fr-FR",
  german: "de-DE",
  turkish: "tr-TR",
  indonesian: "id-ID",
  hindi: "hi-IN",
};

const MODEL = "long";

const PHRASE_PRESET_CONFIG = {
  short: {
    minWords: 2,
    maxWords: 3,
    targetDurationMs: 1400,
    maxDurationMs: 2600,
    pauseBreakMs: 260,
  },
  medium: {
    minWords: 4,
    maxWords: 6,
    targetDurationMs: 2300,
    maxDurationMs: 3900,
    pauseBreakMs: 380,
  },
  long: {
    minWords: 7,
    maxWords: 12,
    targetDurationMs: 3300,
    maxDurationMs: 5600,
    pauseBreakMs: 520,
  },
};

const STRONG_PUNCTUATION_REGEX = /[.!?]$/;
const SOFT_PUNCTUATION_REGEX = /[,;:]$/;

let speechClient = null;

export const getSpeechClient = async () => {
  if (!speechClient) {
    speechClient = new SpeechClient({
      projectId: CLOUD_PROJECT_ID,
      region: CLOUD_REGION,
      credentials: await getGoogleCredentials(),
    });
  }
  return speechClient;
};

const recognizer = `projects/${CLOUD_PROJECT_ID}/locations/${CLOUD_REGION}/recognizers/_`;

const resolvePhraseLength = (phraseLength) =>
  phraseLength === "short" || phraseLength === "medium" || phraseLength === "long"
    ? phraseLength
    : "medium";

const convertToMs = (offset) => {
  if (!offset) return 0;
  const seconds = Number(offset.seconds || 0);
  const nanos = Number(offset.nanos || 0);
  return seconds * 1000 + nanos / 1e6;
};

const processWordsToPhrases = (processedWords, phraseLength = "medium") => {
  if (!processedWords.length) {
    return [];
  }

  const config = PHRASE_PRESET_CONFIG[resolvePhraseLength(phraseLength)];
  const phrases = [];
  let group = [];

  const shouldBreak = (currentGroup, nextWord) => {
    const count = currentGroup.length;
    const firstWord = currentGroup[0];
    const lastWord = currentGroup[currentGroup.length - 1];
    const durationMs = Math.max(0, lastWord.endMs - firstWord.startMs);
    const gapToNextMs = nextWord
      ? Math.max(0, nextWord.startMs - lastWord.endMs)
      : Number.POSITIVE_INFINITY;
    const token = String(lastWord.word || "");

    if (count >= config.maxWords) {
      return true;
    }

    if (durationMs >= config.maxDurationMs) {
      return true;
    }

    if (count >= config.minWords) {
      if (durationMs >= config.targetDurationMs) {
        return true;
      }

      if (gapToNextMs >= config.pauseBreakMs) {
        return true;
      }

      if (STRONG_PUNCTUATION_REGEX.test(token)) {
        return true;
      }

      if (
        SOFT_PUNCTUATION_REGEX.test(token) &&
        durationMs >= config.targetDurationMs * 0.7
      ) {
        return true;
      }
    }

    if (!nextWord) {
      return true;
    }

    return false;
  };

  for (let i = 0; i < processedWords.length; i += 1) {
    const current = processedWords[i];
    const next = processedWords[i + 1];

    group.push(current);

    if (!shouldBreak(group, next)) {
      continue;
    }

    phrases.push({
      t: group.map((w) => w.word).join(" "),
      s: Math.round(group[0].startMs),
      e: Math.round(group[group.length - 1].endMs),
      w: group.map((w) => Math.round(w.startMs)),
    });

    group = [];
  }

  return phrases;
};

const processResponseResults = (results = [], phraseLength = "medium") => {
  const processedWords = [];

  for (const result of results) {
    const words = result?.alternatives?.[0]?.words || [];

    for (const w of words) {
      processedWords.push({
        word: w.word,
        startMs: convertToMs(w.startOffset),
        endMs: convertToMs(w.endOffset),
      });
    }
  }

  return processWordsToPhrases(processedWords, phraseLength);
};

const getLanguageCodes = (language) =>
  LANGUAGE_CODE[language] ? [LANGUAGE_CODE[language]] : Object.values(LANGUAGE_CODE);

const getRequestConfig = ({ language, format }) => ({
  explicitDecodingConfig: {
    encoding: AUDIO_CONFIG[format].encoding,
    sampleRateHertz: AUDIO_CONFIG[format].sampleRate,
    audioChannelCount: 1,
  },
  languageCodes: getLanguageCodes(language),
  model: MODEL,
  features: {
    enableWordTimeOffsets: true,
    enableAutomaticPunctuation: true,
  },
});

export async function transcribeShort({
  audioBuffer,
  language = "english",
  format = "FLAC",
  phraseLength = "medium",
}) {
  const client = await getSpeechClient();

  const request = {
    recognizer,
    config: getRequestConfig({ language, format }),
    content: audioBuffer.toString("base64"),
  };

  try {
    const [response] = await client.recognize(request);
    return processResponseResults(response.results || [], phraseLength);
  } catch (err) {
    console.error("Transcription Error:", err.message);
    throw err;
  }
}

export async function transcribeLong({
  audioBuffer,
  audioUrl,
  language = "english",
  format = "FLAC",
  phraseLength = "medium",
}) {
  let gcsUri;

  if (audioUrl) {
    gcsUri = getGCSUri(audioUrl);
  } else {
    const audioUri = await uploadFile({
      data: audioBuffer,
      folder: "audio",
      fileName: `audio-${Date.now()}.${AUDIO_CONFIG[format].extension}`,
      contentType: AUDIO_CONFIG[format].contentType,
    });
    gcsUri = getGCSUri(audioUri);
  }

  const client = await getSpeechClient();

  const request = {
    recognizer,
    config: getRequestConfig({ language, format }),
    files: [{ uri: gcsUri }],
    recognitionOutputConfig: {
      inlineResponseConfig: {},
    },
  };

  try {
    const [operation] = await client.batchRecognize(request);
    const [response] = await operation.promise();

    const fileResult = response.results?.[gcsUri];
    if (!fileResult?.transcript) {
      return [];
    }

    const results = fileResult.transcript.results || [];
    return processResponseResults(results, phraseLength);
  } catch (err) {
    console.error("Transcription Error:", err.message);
    throw err;
  }
}

