# twitch-anxiety-mod

Chrome extension to hide viewer-pressure UI on Twitch:
- Left sidebar follows
- Viewer/follower counts
- "Watching now" style counters

## Goal
Reduce anxiety/distraction by removing social-pressure numbers across Twitch pages.

## Dev
Load unpacked extension from this folder in Chrome.


## v0.2 Features
- Popup settings UI
- Per-element toggles (viewers, followers, watching-now)
- Strict mode to hide numeric badges

## Load in Chrome
1. Open `chrome://extensions`
2. Enable Developer mode
3. Click **Load unpacked**
4. Select `~/code/twitch-anxiety-mod`

## Validation

Run the repo-native validation path from a fresh checkout:

```bash
npm ci
npm test
npm run smoke
```

`npm test` validates the manifest, required extension assets, and browser script
syntax. `npm run smoke` builds `dist/twitch-anxiety-mod.zip`, the artifact that
can be loaded manually in Chrome or uploaded for store review. The GitHub
Actions `Validate` workflow runs the same commands and uploads that ZIP.

No repository secrets are required for local validation or CI.

## v0.3 Features
- Optional hide of entire left sidebar
- Better Twitch side-nav selector coverage
