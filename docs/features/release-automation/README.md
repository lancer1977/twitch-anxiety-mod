---
title: Release automation
status: in-progress
owner: @DreadBreadcrumb
priority: high
complexity: 2
created: 2026-05-10
updated: 2026-05-10
tags: [feature, twitch-anxiety-mod, ci, cd, release]
---

# Release automation

## Summary

Automate extension validation and packaging so every push and pull request is checked the same way, and tagged releases produce a shareable ZIP artifact for GitHub Releases and Chrome Web Store upload.

## Current State

- GitHub Actions validates the repo on push, pull request, and manual workflow dispatch.
- The CI workflow checks the manifest, syntax-checks the browser scripts, builds the ZIP, and verifies the archive contents.
- The release workflow builds the same ZIP on version tags and attaches it to a GitHub Release.
- Chrome Web Store submission remains a manual dashboard step until publisher credentials and verification are in place.

## Validation

- [x] Add repository validation workflow.
- [x] Add tag-based release packaging workflow.
- [x] Reuse the existing ZIP build script for release artifacts.
- [ ] Confirm the GitHub Release flow with a tagged test release.
- [ ] Upload the packaged ZIP to the Chrome Web Store developer dashboard.

## Follow-up

- [ ] Add a manual workflow for store-only packaging if the review process needs a separate artifact name or notes file.
- [ ] Add a release checklist reminder for bumping `manifest.json` before tagging.
- [ ] Revisit Chrome Web Store automation once publisher verification is completed.

