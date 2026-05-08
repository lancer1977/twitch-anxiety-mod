---
title: Chat user hiding
status: in-progress
owner: @DreadBreadcrumb
priority: high
complexity: 2
created: 2026-05-07
updated: 2026-05-07
tags: [feature, twitch-anxiety-mod, chat, moderation]
---

# Chat user hiding

## Summary
Hide Twitch chat messages from a locally managed list of usernames without using Twitch block controls.

## Current State

- Implemented in the popup and content script.
- Uses a stored list of usernames that are matched case-insensitively.
- Hides the message container in Twitch chat when the author name matches the local list.
- Does not block, ban, or otherwise modify the Twitch account relationship.
- Popup supports import/export of the local username list as plain text.
- Popup supports JSON import for migrated hidden-user lists.
- The list activates filtering when it contains names, even if the checkbox is missed.
- Current selector coverage includes `chat-author__display-name` and `data-test-selector="message-username"` fallback paths.
- Popup shows a live count of configured hidden chat users.

## Validation

- [x] Add popup toggle for chat-user hiding.
- [x] Add local username list input.
- [x] Parse comma-separated and newline-separated usernames.
- [x] Hide matching chat messages in the Twitch DOM.
- [x] Tighten chat selectors around current Twitch chat message and username markup.
- [x] Accept JSON imports for the hidden-user list.
- [x] Confirm the selectors match current public Twitch chat markup hints.
- [ ] Test with names that include `@` prefixes, mixed case, and repeated entries.

## Follow-up

- [ ] Add a small helper line in the popup that shows example formatting.
- [x] Add import/export controls for the hidden-user list.
- [x] Add clear-list control and status feedback in the popup.
- [ ] Consider a per-channel list if the single global list is too broad.
- [ ] Capture Twitch chat DOM samples for future selector maintenance.
