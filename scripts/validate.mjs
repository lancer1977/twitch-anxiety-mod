import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const requiredFiles = [
  'manifest.json',
  'content.js',
  'popup.html',
  'popup.css',
  'popup.js',
  'PRIVACY.md',
  'docs/CHROME_STORE_LISTING.md',
  'docs/RELEASE_CHECKLIST.md',
  'scripts/build-zip.sh',
  'store-assets/icons/icon-16.png',
  'store-assets/icons/icon-48.png',
  'store-assets/icons/icon-128.png'
];

const scriptFiles = ['content.js', 'popup.js'];

export function validateManifest(manifest) {
  assert.equal(manifest.manifest_version, 3);
  assert.equal(manifest.name, 'Twitch Anxiety Mod');
  assert.ok(manifest.description?.toLowerCase().includes('twitch'));
  assert.equal(manifest.version, '0.3.1');
  assert.ok(manifest.permissions.includes('storage'));
  assert.ok(manifest.host_permissions.includes('https://www.twitch.tv/*'));
  assert.equal(manifest.action.default_popup, 'popup.html');
  assert.ok(manifest.content_scripts.some((entry) => entry.js.includes('content.js')));
}

export function runValidation(root = process.cwd()) {
  for (const file of requiredFiles) {
    assert.ok(existsSync(path.join(root, file)), `Missing required file: ${file}`);
  }

  const manifest = JSON.parse(readFileSync(path.join(root, 'manifest.json'), 'utf8'));
  validateManifest(manifest);

  for (const file of scriptFiles) {
    const result = spawnSync(process.execPath, ['--check', path.join(root, file)], {
      encoding: 'utf8'
    });
    assert.equal(result.status, 0, result.stderr || `${file} syntax check failed`);
  }
}

const entrypoint = path.resolve(fileURLToPath(import.meta.url));
if (process.argv[1] && path.resolve(process.argv[1]) === entrypoint) {
  runValidation();
  console.log('twitch-anxiety-mod validation passed.');
}
