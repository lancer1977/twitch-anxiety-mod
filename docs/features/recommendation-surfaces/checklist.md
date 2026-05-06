# Recommendation Surfaces Checklist

## Discovery

- [x] Confirmed existing anxiety filters live in `content.js`.
- [x] Confirmed the old implementation scanned Twitch after every DOM mutation.
- [x] Identified suggested collabs and recommendations as the next pressure surface.

## Implementation

- [x] Add `hideSuggestions` default setting.
- [x] Wire `hideSuggestions` into the popup.
- [x] Add selector-based hiding for recommendation, suggestion, and collab attributes.
- [x] Add text fallback for recommendation copy.
- [x] Cache settings in memory.
- [x] Throttle mutation observer scans.

## Testing

- [x] Run JavaScript syntax validation.
- [ ] Load unpacked extension from `~/code/twitch-anxiety-mod`.
- [ ] Visit Twitch home, channel, and browse pages.
- [ ] Confirm left sidebar remains hidden when enabled.
- [ ] Confirm suggested collab or recommendation surfaces hide when visible.
- [ ] Confirm browser responsiveness improves compared with repeated unthrottled scans.

## Release

- [x] Bump extension version.
- [x] Build release zip.
- [ ] Update Chrome Store listing if publishing the new recommendation toggle.
