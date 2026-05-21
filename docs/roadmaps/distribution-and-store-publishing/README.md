---
title: Distribution and store publishing
status: in-progress
owner: @DreadBreadcrumb
priority: high
complexity: 2
created: 2026-05-07
updated: 2026-05-07
tags: [roadmap, twitch-anxiety-mod, distribution, chrome-web-store]
---

# Distribution and store publishing

## Summary

This roadmap tracks the two distribution paths for twitch-anxiety-mod:

- Direct local sideload from the repo folder.
- Download/install from a ZIP artifact that is unzipped and loaded locally.
- Chrome Web Store publishing as the primary store presence.

## Goals

- Make the non-store install path explicit and repeatable.
- Keep the README focused on the fastest sideload path.
- Keep the build artifact easy to package and share.
- Automate validation and release packaging through GitHub Actions.
- Submit the extension to the Chrome Web Store after the current feature set is stable.

## Blockers

- Chrome Web Store publisher verification requires your ID / legal identity details before final submission.
- Publishing work can proceed up to the point of review-ready packaging, screenshots, and listing copy.

## Phases

### Phase 1: Download install path

- [x] Document direct repo-folder sideload steps in the main README.
- [x] Document ZIP build and unzip sideload steps in the main README.
- [x] Clarify that Chrome cannot load the ZIP directly as an unpacked extension.
- [x] Keep the ZIP artifact generation script in the repo.
- [x] Add a release notes template for non-store builds.
- [x] Add a troubleshooting guide for common install and runtime mistakes.
- [x] Decide to publish the download through GitHub Releases.

### Phase 2: Chrome Web Store

- [x] Maintain store listing copy in `docs/CHROME_STORE_LISTING.md`.
- [x] Keep the privacy policy aligned with local-only storage.
- [x] Draft the screenshot checklist for store assets.
- [x] Draft the release notes template for ZIP and store updates.
- [ ] Complete trader/non-trader verification once identity details are available.
- [ ] Capture screenshots that show the popup and the Twitch page effects.
- [ ] Submit the extension to the Chrome Web Store.
- [ ] Track review feedback and rejections as checklist items.

### Phase 3: CI/CD

- [x] Add push and pull-request validation in GitHub Actions.
- [x] Build the release ZIP in CI.
- [x] Upload the ZIP as a build artifact.
- [x] Create a tagged release workflow that publishes the ZIP to GitHub Releases.
- [ ] Add an optional manual workflow for store-only packaging if the dashboard workflow needs a dedicated artifact.

### Phase 4: Maintenance

- [ ] Define the release bump cadence for new Twitch selector fixes.
- [ ] Keep the install docs synchronized with the actual download location.
