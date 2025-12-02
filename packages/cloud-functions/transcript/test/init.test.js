import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createGenAIClient } from '../core/transcriber.js';

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

test('GoogleGenAI - direct initialization test', async () => {
  const GOOGLE_CLOUD_PROJECT = process.env.GOOGLE_CLOUD_PROJECT;
  const GOOGLE_CLOUD_LOCATION = process.env.GOOGLE_CLOUD_LOCATION || 'global';

  if (!GOOGLE_CLOUD_PROJECT) {
    console.warn('Skipping test: Missing GOOGLE_CLOUD_PROJECT');
    return;
  }

  console.log('Initializing GoogleGenAI client directly...');
  console.log('Project:', GOOGLE_CLOUD_PROJECT);
  console.log('Location:', GOOGLE_CLOUD_LOCATION);

  const client = new GoogleGenAI({
    vertexai: true,
    project: GOOGLE_CLOUD_PROJECT,
    location: GOOGLE_CLOUD_LOCATION,
  });

  assert(client, 'Client should be initialized');
  console.log('✓ Client initialized successfully');

  // Test a simple text generation
  try {
    console.log('Testing simple text generation...');
    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: 'Say hello in one word',
    });

    assert(response, 'Response should be defined');
    assert(response.text, 'Response should have text property');
    console.log('✓ Text generation successful');
    console.log('Response:', response.text);
  } catch (err) {
    console.error('✗ Text generation failed:', err.message);
    throw err;
  }
});

test('GoogleGenAI - using createGenAIClient function', async () => {
  const GOOGLE_CLOUD_PROJECT = process.env.GOOGLE_CLOUD_PROJECT;

  if (!GOOGLE_CLOUD_PROJECT) {
    console.warn('Skipping test: Missing GOOGLE_CLOUD_PROJECT');
    return;
  }

  console.log('Testing createGenAIClient function...');
  
  try {
    const client = createGenAIClient();
    assert(client, 'Client should be initialized');
    console.log('✓ createGenAIClient() successful');

    // Test a simple text generation
    console.log('Testing simple text generation with created client...');
    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: 'Say hello in one word',
    });

    assert(response, 'Response should be defined');
    assert(response.text, 'Response should have text property');
    console.log('✓ Text generation successful');
    console.log('Response:', response.text);
  } catch (err) {
    console.error('✗ Test failed:', err.message);
    throw err;
  }
});

