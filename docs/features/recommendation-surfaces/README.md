---
title: Recommendation surfaces
status: in-progress
owner: @DreadBreadcrumb
priority: high
complexity: 2
created: 2026-05-05
updated: 2026-05-05
tags: [feature, twitch-anxiety-mod, recommendations, performance]
---

# Recommendation surfaces

## Summary

Hide Twitch suggestion surfaces that create social pressure or distraction, including suggested collabs, recommendation blocks, and channels Twitch thinks the user may like.

## Current State

- Implemented as a browser content-script feature in `content.js`.
- Controlled by the popup toggle `hideSuggestions`.
- Enabled by default for existing and new installs through storage defaults.
- Runs alongside the existing viewer count, follower count, watching-now, strict-mode, and left-sidebar filters.

## Behavior

- Hide elements with Twitch attributes that mention recommendations, suggestions, or collabs.
- Hide compact text containers that include labels like suggested collabs, recommendations, or channels Twitch thinks the user may like.
- Prefer hiding bounded containers instead of broad page regions.

## Performance Notes

- The extension now caches settings after the first storage read.
- Twitch DOM mutation handling is throttled before rescanning the page.
- Settings changes update the cached settings and schedule one follow-up scan.

## Validation

- [x] Add popup toggle for suggestion hiding.
- [x] Add content-script selectors for recommendation and collab surfaces.
- [x] Add text-pattern fallback for labels that do not expose stable attributes.
- [x] Cache settings instead of reading Chrome storage on every DOM mutation.
- [x] Debounce mutation-triggered scans.
- [ ] Validate against a live Twitch page with visible suggested collab or recommendation UI.
- [ ] Tune selectors if Twitch uses a new label or attribute shape.

## Follow-up

- [ ] Add a lightweight debug mode that logs which selector hid an element.
- [ ] Capture current Twitch DOM samples for known recommendation surfaces.
- [ ] Consider separate toggles for side-nav recommendations versus channel-page suggestions if the single toggle is too broad.
