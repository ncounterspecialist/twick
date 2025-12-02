import { GoogleGenAI } from '@google/genai';

const ensureEnv = (name, optional = false) => {
  const value = process.env[name];
  if (!value && !optional) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
};

const createGenAIClient = () => {
  const project = ensureEnv('GOOGLE_CLOUD_PROJECT');
  const location = process.env.GOOGLE_CLOUD_LOCATION || 'global';

  const client = new GoogleGenAI({
    vertexai: true,
    project: project,
    location: location,
  });

  return client;
};

// Export for testing
export { createGenAIClient };

/**
 * Download audio bytes for a URL using Node 18+ global fetch.
 */
const fetchAudioBytes = async (audioUrl) => {
  const response = await fetch(audioUrl);
  if (!response.ok) {
    throw new Error(
      `Failed to download audio from URL "${audioUrl}": ${response.status} ${response.statusText}`
    );
  }
  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
};

/**
 * Build the captioning prompt, mirroring the Python version.
 */
const buildPrompt = (language, languageFont) => {
  return `
##TASKS
- Transcribe the audio into ${language}.
- Break captions into phrases with a maximum of 4 words per segment.
- Each phrase must have precise start (s) and end (e) timestamps in milliseconds, where its duration is calculated as e - s.
- Timestamps of consecutive phrases must not overlap. The end time of one phrase should be equal to or less than the start time of the next.
- End Timestamp ('e') should be less than the audio duration.
- Each phrase should have a minimum duration of 500 milliseconds.
- If the audio is in a different language, translate it into ${language} before transcription.
- The final caption text (t) should be written in ${languageFont} fonts for accurate visual representation.

Ensure precise phrase segmentation according to the word limit, accurate millisecond timestamps adhering to the duration and overlap constraints, and translation to ${language} if necessary, resulting in readable subtitles.

IMPORTANT: Return ONLY a valid JSON array with no markdown, no code fences, no explanations, no additional text. Start directly with [ and end with ].

Format:
[
  {
    "t": "Example phrase 1",
    "s": 0,
    "e": 1500
  },
  {
    "t": "Another short example",
    "s": 1500,
    "e": 2800
  }
]
`.trim();
};

/**
 * Transcribe an audio URL to JSON captions using Google GenAI (Vertex AI),
 * mirroring the Python implementation in `playground/vertex/transcript.py`.
 *
 * @param {Object} params
 * @param {string} params.audioUrl - Publicly reachable audio URL.
 * @param {string} [params.language="english"] - Target transcription language (human-readable).
 * @param {string} [params.languageFont="english"] - Target font/script for captions.
 * @returns {Promise<{ captions: Array<{t: string, s: number, e: number}>, rawText: string }>}
 */
export const transcribeAudioUrl = async (params) => {
  const {
    audioUrl,
    language = 'english',
    languageFont = 'english',
  } = params || {};

  if (!audioUrl) {
    throw new Error('Missing required parameter: audioUrl');
  }

  const audioBytes = await fetchAudioBytes(audioUrl);
  const prompt = buildPrompt(language, languageFont);

  const client = createGenAIClient();
  const modelName = process.env.GOOGLE_VERTEX_MODEL || 'gemini-2.5-flash';

  console.log('Starting Google GenAI transcription', {
    model: modelName,
    language,
    languageFont,
    audioUrl,
  });

  const response = await client.models.generateContent({
    model: modelName,
    contents: [
      {
        role: 'user',
        parts: [
          {
            inlineData: {
              data: audioBytes.toString('base64'),
              mimeType: 'audio/mpeg',
            },
          },
          { text: prompt },
        ],
      },
    ],
    generationConfig: {
      audioTimestamp: true,
    },
  });

  let textPart = response.text || '';

  // Strip markdown code fences if present (```json ... ``` or ``` ... ```)
  textPart = textPart
    .replace(/^```json\s*/i, '')  // Remove opening ```json
    .replace(/^```\s*/i, '')      // Remove opening ```
    .replace(/\s*```$/i, '')       // Remove closing ```
    .trim();

  let captions = [];
  try {
    // Try to find JSON array in the text (in case there's extra text)
    const jsonMatch = textPart.match(/\[[\s\S]*\]/);
    const jsonText = jsonMatch ? jsonMatch[0] : textPart;
    
    captions = JSON.parse(jsonText);
    if (!Array.isArray(captions)) {
      throw new Error('Parsed captions are not an array');
    }
  } catch (err) {
    console.warn('Failed to parse model output as JSON captions, returning raw text', err);
    console.warn('Raw response text:', textPart.substring(0, 500));
    captions = [];
  }

  return {
    captions,
    rawText: textPart,
  };
};

export default transcribeAudioUrl;
