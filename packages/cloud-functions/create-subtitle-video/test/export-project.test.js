import { test } from 'node:test';
import { strict as assert } from 'node:assert';

import {
  buildObjectKey,
  buildPublicUrl,
  sanitizeIdentifier,
} from '../core/export-project.js';

test('sanitizeIdentifier returns fallback when value is missing', () => {
  assert.equal(sanitizeIdentifier(undefined), 'twick-project');
  assert.equal(sanitizeIdentifier(null), 'twick-project');
});

test('sanitizeIdentifier normalizes odd identifiers', () => {
  const rawValue = '  !!Amazing Project$$$ Version 2.0??  ';
  const normalized = sanitizeIdentifier(rawValue);
  assert.equal(normalized, 'amazing-project-version-2-0');
});

test('buildObjectKey includes sanitized identifier and suffix', () => {
  const projectData = {
    project: {
      properties: {
        id: 'Special Project',
      },
    },
  };

  const key = buildObjectKey(projectData, 2025);
  assert.equal(key, 'special-project-2025.json');
});

test('buildObjectKey falls back to default identifier when none supplied', () => {
  const key = buildObjectKey({}, 42);
  assert(key.startsWith('twick-project-'), 'expected fallback prefix');
  assert(key.endsWith('.json'), 'expected .json suffix');
});

test('buildPublicUrl trims base URL slash and encodes key segments', () => {
  const result = buildPublicUrl({
    bucket: 'test-bucket',
    key: 'folder with spaces/file name.json',
    region: 'us-east-1',
    baseUrl: 'https://cdn.example.com/',
  });

  assert.equal(
    result,
    'https://cdn.example.com/folder%20with%20spaces/file%20name.json'
  );
});

test('buildPublicUrl falls back to standard S3 host for other regions', () => {
  const result = buildPublicUrl({
    bucket: 'my-bucket',
    key: 'folder/item.json',
    region: 'us-west-2',
  });

  assert.equal(
    result,
    'https://my-bucket.s3.us-west-2.amazonaws.com/folder/item.json'
  );
});

