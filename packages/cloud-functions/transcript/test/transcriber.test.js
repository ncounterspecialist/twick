import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import { transcribe } from '../core/workflow.js';

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

const sampleVideoUrl = "https://firebasestorage.googleapis.com/v0/b/baatcheet-prod.firebasestorage.app/o/ME-VS-ME.mp4?alt=media&token=c53dac81-888a-41fb-a501-246c9e531c29";

test('transcribe - video URL transcription', async () => {
  console.log('Starting transcription test with sample video URL...');
  console.log('Video URL:', sampleVideoUrl.substring(0, 100) + '...');

  const result = await transcribe({
    videoUrl: sampleVideoUrl,
    language: 'english',
    languageFont: 'english',
  });

  // Assert result structure
  assert(result, 'Result should be defined');
  assert(typeof result === 'object', 'Result should be an object');
  assert(Array.isArray(result.captions), 'Result should have captions array');
  assert(typeof result.duration === 'number', 'Result should have duration number');
  assert.strictEqual(result.videoUrl, sampleVideoUrl, 'Result should include videoUrl');

  console.log('Transcription completed successfully');
  console.log(`Captions count: ${result.captions.length}`);
  console.log(`Duration: ${result.duration}s`);

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
    console.warn('No captions parsed from response');
  }
});
