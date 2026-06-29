import assert from 'node:assert/strict';
import test from 'node:test';
import { validateManifest } from './validate.mjs';

test('validateManifest accepts the checked-in Chrome extension manifest', async () => {
  const manifest = JSON.parse(await import('node:fs/promises').then((fs) => fs.readFile('manifest.json', 'utf8')));
  validateManifest(manifest);
});

test('validateManifest rejects an unexpected manifest version', () => {
  assert.throws(() => validateManifest({
    manifest_version: 2,
    name: 'Twitch Anxiety Mod',
    description: 'Twitch helper',
    version: '0.3.1',
    permissions: ['storage'],
    host_permissions: ['https://www.twitch.tv/*'],
    action: { default_popup: 'popup.html' },
    content_scripts: [{ js: ['content.js'] }]
  }));
});
