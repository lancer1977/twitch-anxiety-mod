# Distribution and Store Publishing Phases

## Phase 1 - Local sideload and download install

- [x] Add direct repo-folder **Load unpacked** instructions to the README.
- [x] Add ZIP build, unzip, and **Load unpacked** instructions to the README.
- [x] Explain that Chrome cannot load the ZIP directly.
- [x] Confirm the repo already builds a ZIP artifact.
- [x] Add a release notes template.
- [x] Add a troubleshooting guide.
- [x] Decide on the public download host.

## Phase 2 - Chrome Web Store

- [x] Keep listing copy in the repo.
- [x] Keep privacy language aligned with the extension behavior.
- [x] Draft screenshot checklist.
- [x] Draft release notes template.
- [ ] Capture screenshots.
- [ ] Submit for review.
- [ ] Record review feedback.

## Phase 3 - CI/CD

- [x] Add GitHub Actions validation on push and pull request.
- [x] Package the ZIP artifact in CI.
- [x] Attach the ZIP to GitHub Releases on tagged builds.
- [ ] Add a separate manual workflow for store-only packaging if needed.

## Phase 4 - Ongoing updates

- [ ] Define a release checklist for version bumps.
- [ ] Note any selector changes that affect support expectations.
