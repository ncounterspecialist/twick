import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createCaptionProject } from '../core/workflow.js';

// Load .env file from the test directory or parent directories (optional)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const testDir = __dirname;
const packageDir = join(testDir, '..');
const rootDir = join(packageDir, '../..');

try {
  const dotenv = (await import('dotenv')).default;
  const envPaths = [
    join(testDir, '.env'),
    join(testDir, '.env.local'),
    join(packageDir, '.env'),
    join(packageDir, '.env.local'),
    join(rootDir, '.env'),
    join(rootDir, '.env.local'),
  ];
  for (const envPath of envPaths) {
    try {
      dotenv.config({ path: envPath });
      console.log(`Loaded .env from: ${envPath}`);
      break;
    } catch {
      // Continue to next path
    }
  }
} catch {
  // dotenv not installed or load failed
}

const sampleVideoUrl =
  'https://firebasestorage.googleapis.com/v0/b/baatcheet-prod.firebasestorage.app/o/ME-VS-ME.mp4?alt=media&token=c53dac81-888a-41fb-a501-246c9e531c29';

test('createCaptionProject - video URL project creation', async () => {
  console.log('Starting caption project test with sample video URL...');
  console.log('Video URL:', sampleVideoUrl.substring(0, 80) + '...');

  const project = await createCaptionProject({
    videoUrl: sampleVideoUrl,
    videoSize: { width: 720, height: 1280 },
    language: 'english',
    languageFont: 'english',
  });

  // Assert project structure
  assert(project, 'Project should be defined');
  assert(typeof project === 'object', 'Project should be an object');
  assert(project.properties, 'Project should have properties');
  assert(Array.isArray(project.tracks), 'Project should have tracks array');
  assert.strictEqual(project.version, 1, 'Project should have version 1');

  const captionTrack = project.tracks?.find((t) => t.type === 'caption');
  assert(captionTrack, 'Project should have a caption track');
  assert(Array.isArray(captionTrack.elements), 'Caption track should have elements');

  const captions = captionTrack.elements;
  console.log('Caption project created successfully');
  console.log(`Captions count: ${captions.length}`);

  if (captions.length > 0) {
    const first = captions[0];
    assert(typeof first.t === 'string', 'Caption element should have text (t)');
    assert(typeof first.s === 'number', 'Caption element should have start (s)');
    assert(typeof first.e === 'number', 'Caption element should have end (e)');
    assert(first.e > first.s, 'End should be greater than start');
    console.log('First caption:', JSON.stringify(first, null, 2));
  } else {
    console.warn('No caption elements in project');
  }
});
