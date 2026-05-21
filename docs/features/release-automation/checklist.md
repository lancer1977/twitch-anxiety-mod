# Release Automation Checklist

## Discovery

- [x] Confirmed the extension can be packaged with a simple ZIP build script.
- [x] Confirmed the repo did not already have GitHub Actions workflows.
- [x] Confirmed Chrome Web Store submission still needs the publisher account and verification path.

## Implementation

- [x] Add CI workflow for push and pull request validation.
- [x] Add release workflow for tagged builds.
- [x] Validate the manifest JSON before packaging.
- [x] Syntax-check the browser JavaScript files.
- [x] Upload the packaged ZIP as a GitHub artifact.
- [x] Attach the packaged ZIP to GitHub Releases.

## Testing

- [ ] Let GitHub Actions run on a branch push.
- [ ] Confirm the artifact downloads correctly from the CI run.
- [ ] Confirm a tagged release creates the ZIP asset.

## Release

- [ ] Upload the ZIP to the Chrome Web Store developer dashboard.
- [ ] Confirm the store listing assets and privacy answers still match the packaged extension.

