import { SpeechClient } from "@google-cloud/speech/build/src/v2/index.js";
import {
  CLOUD_PROJECT_ID,
  CLOUD_REGION,
  getGCSUri,
  getGoogleCredentials,
  uploadFile,
} from "./gc.utils.js";
import { AUDIO_CONFIG } from "./audio.utils.js";

/**
 * Language code mapping for Google Speech-to-Text API.
 * @type {Object<string, string>}
 */
const LANGUAGE_CODE = {
  english: "en-US",
};

/**
 * Speech recognition model to use. "long" model is optimized for longer audio files.
 * @type {string}
 */
const MODEL = "long";

let speechClient = null;

/**
 * Gets or initializes the Google Cloud Speech-to-Text client.
 * 
 * @returns {Promise<SpeechClient>} Initialized SpeechClient instance
 */
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

/**
 * Recognizer resource path for Google Speech-to-Text API v2.
 * @type {string}
 */
const recognizer = `projects/${CLOUD_PROJECT_ID}/locations/${CLOUD_REGION}/recognizers/_`;

/**
 * Processes Speech-to-Text API response and groups words into phrases of 4 words each.
 * 
 * @param {Object} results - API response results object
 * @returns {Array<Object>} Array of phrase objects with text, start time, end time, and word timings
 */
const processResponse = (results) => {
  // Extract words from response
  const words = results?.alternatives?.[0]?.words || [];

  if (words.length === 0) {
    return [];
  }

  // Convert time offsets to milliseconds
  const convertToMs = (offset) => {
    if (!offset) return 0;
    const seconds = Number(offset.seconds || 0);
    const nanos = Number(offset.nanos || 0);
    return seconds * 1000 + nanos / 1e6;
  };

  // Process words into individual word timings
  const processedWords = words.map((w) => ({
    word: w.word,
    startMs: convertToMs(w.startOffset),
    endMs: convertToMs(w.endOffset),
  }));

  // Group words into phrases of 4 words each
  const phrases = [];
  for (let i = 0; i < processedWords.length; i += 4) {
    const group = processedWords.slice(i, i + 4);
    const text = group.map((w) => w.word).join(" ");
    const startMs = group[0].startMs;
    const endMs = group[group.length - 1].endMs;
    const wordStarts = group.map((w) => w.startMs);

    phrases.push({
      t: text,
      s: Math.round(startMs),
      e: Math.round(endMs),
      w: wordStarts.map((ms) => Math.round(ms)),
    });
  }
  return phrases;
};

/**
 * Transcribes short audio (typically under 60 seconds) using Google Speech-to-Text API.
 * Uses synchronous recognize method for faster processing.
 * 
 * @param {Object} params - Transcription parameters
 * @param {Buffer} params.audioBuffer - Audio data buffer (FLAC format)
 * @param {string} [params.language="english"] - Language code (e.g., "english")
 * @param {string} [params.format="FLAC"] - Audio format (currently only "FLAC" supported)
 * @returns {Promise<Array<Object>>} Array of phrase objects with text, timings, and word offsets
 * @throws {Error} If transcription fails
 */
export async function transcribeShort({
  audioBuffer,
  language = "english",
  format = "FLAC",
}) {
  const client = await getSpeechClient();

  const audioContent = audioBuffer.toString("base64");

  const request = {
    recognizer: recognizer,
    config: {
      explicitDecodingConfig: {
        encoding: AUDIO_CONFIG[format].encoding,
        sampleRateHertz: AUDIO_CONFIG[format].sampleRate,
        audioChannelCount: 1,
      },
      languageCodes: [LANGUAGE_CODE[language]],
      model: MODEL,
      features: {
        enableWordTimeOffsets: true,
      },
    },
    content: audioContent,
  };

  try {
    const [response] = await client.recognize(request);
    return processResponse(response.results?.[0]);
  } catch (err) {
    console.error("Transcription Error:", err.message);
    throw err;
  }
}

/**
 * Transcribes long audio (typically over 60 seconds) using Google Speech-to-Text API.
 * Uses asynchronous batchRecognize method and requires audio to be uploaded to GCS first.
 * 
 * @param {Object} params - Transcription parameters
 * @param {Buffer} [params.audioBuffer] - Audio data buffer (required if audioUrl not provided)
 * @param {string} [params.audioUrl] - GCS URI (gs://) or HTTPS URL to audio file (required if audioBuffer not provided)
 * @param {string} [params.language="english"] - Language code (e.g., "english")
 * @param {string} [params.format="FLAC"] - Audio format (currently only "FLAC" supported)
 * @returns {Promise<Array<Object>>} Array of phrase objects with text, timings, and word offsets
 * @throws {Error} If transcription fails
 */
export async function transcribeLong({
  audioBuffer,
  audioUrl,
  language = "english",
  format = "FLAC",
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

  console.log("GCS URI:", gcsUri);
  const client = await getSpeechClient();

  const request = {
    recognizer: recognizer,
    config: {
      explicitDecodingConfig: {
        encoding: AUDIO_CONFIG[format].encoding,
        sampleRateHertz: AUDIO_CONFIG[format].sampleRate,
        audioChannelCount: 1,
      },
      languageCodes: [LANGUAGE_CODE[language]],
      model: MODEL,
      features: {
        enableWordTimeOffsets: true,
      },
    },
    files: [
      {
        uri: gcsUri,
      },
    ],
    recognitionOutputConfig: {
      inlineResponseConfig: {},
    },
  };

  try {
    console.log("Waiting for operation to complete...");
    const [operation] = await client.batchRecognize(request);
    const [response] = await operation.promise();

    // Extract results for the audio URI (use the GCS URI as the key)
    const fileResult = response.results?.[gcsUri];
    if (!fileResult || !fileResult.transcript) {
      return [];
    }

    // Extract words from all results (batchRecognize can return multiple result segments)
    const allPhrases = [];
    const results = fileResult.transcript.results || [];

    console.log("Results:", fileResult.transcript);

    for (const result of results) {
      const phrases = processResponse(result);
      console.log("Phrases:", phrases);
      console.log("Transcription Result:", result);
      allPhrases.push(...phrases);
    }

    if (allPhrases.length === 0) {
      return [];
    }
    return allPhrases;
  } catch (err) {
    console.error("Transcription Error:", err.message);
    throw err;
  }
}
