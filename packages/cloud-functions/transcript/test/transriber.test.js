import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import { transcribeAudioUrl } from '../core/transcriber.js';

// Load .env file from the test directory or parent directories
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const testDir = __dirname;
const packageDir = join(testDir, '..');
const rootDir = join(packageDir, '../..');

// Try to load .env / .env.local from multiple locations
const envPaths = [
  // Test-local env
  join(testDir, '.env'),
  join(testDir, '.env.local'),
  // Package-level env
  join(packageDir, '.env'),
  join(packageDir, '.env.local'),
  // Repo root env
  join(rootDir, '.env'),
  join(rootDir, '.env.local'),
];

for (const envPath of envPaths) {
  try {
    dotenv.config({ path: envPath });
    console.log(`Loaded .env from: ${envPath}`);
    break;
  } catch (err) {
    // Continue to next path
  }
}

const sampleAudioUrl =
  'https://storage.googleapis.com/kagglesdsdata/datasets/829978/1417968/harvard.wav?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20251201%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20251201T205743Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=3502af7d9f98d0ad7bfb9abbe6d7d029936891c1a7f930b250e6744c82792d0ceaff6cec748d7178fadc4525d84c495a8176e49c2ce63d9608fd13a56c2a7dbfd5c469da1b843607c323e292a845b2a9729bde4f991281a11cd527aac12a1ec2732033d905ee72d7f82e9179910536cbc442e7e998646afd5be752c6f6812341179f9069defa9ca624b795901e2c3f6fb79296c05afa534a279a72b497bcfc9b864891e3a65dbd57948b9625ac1e3ecd2030386af910d28124546a9a7d8f341b2094799a0e98bdc5a5a9d8e9459445a8f66ae2586d40cd410c516748c655b4a0ace60071db6a8591e7cace49e81f9c8e3cf0eaaf5e641402da42cf225525a5c9';

test('transcribeAudioUrl - basic transcription', async () => {
  console.log('Starting transcription test with sample audio URL...');
  console.log('Audio URL:', sampleAudioUrl.substring(0, 100) + '...');

  const result = await transcribeAudioUrl({
    audioUrl: sampleAudioUrl,
    language: 'english',
    languageFont: 'english',
  });

  // Assert result structure
  assert(result, 'Result should be defined');
  assert(typeof result === 'object', 'Result should be an object');
  assert(Array.isArray(result.captions), 'Result should have captions array');
  assert(typeof result.rawText === 'string', 'Result should have rawText string');

  console.log('Transcription completed successfully');
  console.log(`Captions count: ${result.captions.length}`);
  console.log(`Raw text length: ${result.rawText.length} characters`);

  // If captions were parsed successfully, validate structure
  if (result.captions.length > 0) {
    const firstCaption = result.captions[0];
    assert(
      typeof firstCaption.t === 'string',
      'Caption should have text property (t)'
    );
    assert(
      typeof firstCaption.s === 'number',
      'Caption should have start time property (s)'
    );
    assert(
      typeof firstCaption.e === 'number',
      'Caption should have end time property (e)'
    );
    assert(
      firstCaption.e > firstCaption.s,
      'End time should be greater than start time'
    );

    console.log('First caption:', JSON.stringify(firstCaption, null, 2));
  } else {
    console.warn('No captions parsed from response. Raw text:', result.rawText.substring(0, 200));
  }
});

test('transcribeAudioUrl - missing audioUrl parameter', async () => {
  try {
    await transcribeAudioUrl({});
    assert.fail('Should throw error for missing audioUrl');
  } catch (err) {
    assert(
      err.message.includes('Missing required parameter: audioUrl'),
      `Expected error about missing audioUrl, got: ${err.message}`
    );
  }
});

test('transcribeAudioUrl - invalid audio URL', async () => {
  try {
    await transcribeAudioUrl({
      audioUrl: 'https://invalid-url-that-does-not-exist.com/audio.mp3',
    });
    assert.fail('Should throw error for invalid audio URL');
  } catch (err) {
    assert(
      err.message.includes('Failed to download audio') ||
        err.message.includes('404') ||
        err.message.includes('ENOTFOUND'),
      `Expected error about failed download, got: ${err.message}`
    );
  }
});