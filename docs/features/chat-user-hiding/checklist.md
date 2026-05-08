# Chat User Hiding Checklist

## Discovery

- [x] Confirmed the feature belongs in the existing popup/content-script model.
- [x] Confirmed the list should stay local to the extension.

## Implementation

- [x] Add `hideChatUsers` setting.
- [x] Add `hiddenChatUsers` setting storage.
- [x] Add popup textarea for usernames.
- [x] Add content-script matching for Twitch chat messages.
- [x] Normalize usernames before matching.
- [x] Restore hidden elements when the extension is disabled.
- [x] Add import/export controls for the hidden-user list.
- [x] Add clear-list control and status feedback.
- [x] Accept JSON imports for the hidden-user list.
- [x] Tighten selectors around current Twitch chat markup hints.
- [x] Add current public Twitch chat username fallbacks.
- [x] Add a visible hidden-user count to the popup.

## Testing

- [ ] Load unpacked extension in Chrome.
- [ ] Add a few sample usernames to the popup.
- [ ] Visit a live Twitch chat page.
- [ ] Confirm matching messages disappear.
- [ ] Confirm non-matching messages remain visible.
- [ ] Toggle the feature off and confirm the hidden messages return after the next scan or page refresh.
- [ ] Verify imported lists survive reloads and export as canonical plain text.
- [ ] Re-test with a live Twitch channel after the new selector fallbacks.

## Release

- [ ] Update store listing once the feature is verified against live Twitch chat.
- [ ] Capture a screenshot for the Chrome Web Store listing if this feature is shown there.
