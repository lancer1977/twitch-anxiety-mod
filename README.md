# twitch-anxiety-mod

Chrome extension to reduce Twitch anxiety/distraction by hiding viewer-pressure UI:

- Left sidebar follows
- Viewer/follower counts
- "Watching now" style counters
- Suggested collabs and recommendation surfaces
- Chat messages from listed users

## Tags

- twitch-anxiety-mod
- twitch
- mod
- docs
- anxiety
- chat

## Quick Sideload Install

Use this path when you want to run the extension locally without the Chrome Web Store.

### Option A: Load this repo directly

1. Open Chrome.
2. Go to `chrome://extensions`.
3. Turn on **Developer mode** in the top-right corner.
4. Click **Load unpacked**.
5. Select this repo folder:

   ```text
   /home/lancer1977/code/twitch-anxiety-mod
   ```

6. Open Twitch or refresh any Twitch tabs that were already open.
7. Pin the extension if you want quick access to the popup toggles.

### Option B: Build and load a clean ZIP copy

Use this when you want to test the same packaged files that would be shared or uploaded.

1. Build the ZIP:

   ```bash
   bash scripts/build-zip.sh
   ```

2. Unzip `dist/twitch-anxiety-mod.zip` into a temporary folder.
3. Open `chrome://extensions`.
4. Turn on **Developer mode**.
5. Click **Load unpacked**.
6. Select the unzipped folder that contains `manifest.json`.
7. Open Twitch or refresh any Twitch tabs that were already open.

Chrome cannot install this ZIP directly. The ZIP must be unzipped first, then loaded with **Load unpacked**.

## Using the Extension

1. Click the extension icon.
2. Turn features on or off in the popup.
3. Add hidden chat usernames one per line, or separated by commas or semicolons.
4. Use **Import list** or **Export list** to move the hidden-user list between installs.
5. Refresh Twitch tabs after changing settings.

## Update an Existing Sideload

When the repo changes:

1. Pull or copy the updated files.
2. Go to `chrome://extensions`.
3. Find **Twitch Anxiety Mod**.
4. Click the reload icon on the extension card.
5. Refresh open Twitch tabs.

## Chrome Web Store

Chrome Web Store publishing is a second distribution goal. See [`docs/roadmaps/distribution-and-store-publishing/README.md`](./docs/roadmaps/distribution-and-store-publishing/README.md).

Release ZIPs are published through GitHub Releases and can be used for manual unpacked installs while the store submission is in flight.

## Features

- Optional hide of the left sidebar on streamer/channel pages, but not on the Twitch home/root/browse pages
- Better Twitch side-nav selector coverage
- Cached settings and throttled DOM scanning to reduce Twitch page overhead
- Optional hide of suggested collabs and recommendations
- Optional hide of chat messages from listed users

## Documentation

- [Feature Index](./docs/features/README.md)
- [Core Capabilities](./docs/features/core-capabilities.md)
- [Troubleshooting](./docs/TROUBLESHOOTING.md)
- [Release Checklist](./docs/RELEASE_CHECKLIST.md)
