# Release Checklist

## Local sideload readiness

- [x] README has a direct repo-folder sideload path.
- [x] README has a clean ZIP-build sideload path.
- [x] README explains that Chrome ZIPs must be unzipped before **Load unpacked**.
- [x] Troubleshooting covers common sideload mistakes.
- [ ] Manually load the repo folder in Chrome and verify the popup opens.
- [ ] Manually refresh a Twitch tab and verify the enabled filters apply.

## Store readiness

- [x] Manifest V3
- [x] Minimal permissions (`storage`, Twitch host permission)
- [x] Privacy policy (`PRIVACY.md`)
- [x] Store listing copy (`docs/CHROME_STORE_LISTING.md`)
- [x] Support URL configured
- [x] Icons generated (16/48/128)
- [x] Download install path documented
- [x] Chat-user hide list added to popup and content script
- [ ] Screenshots captured from extension popup + Twitch page
- [x] ZIP package generated

## Chrome Web Store upload steps

1. Go to Chrome Web Store Developer Dashboard
2. Create new item
3. Upload `dist/twitch-anxiety-mod.zip`
4. Paste listing copy from `docs/CHROME_STORE_LISTING.md`
5. Add screenshots from `store-assets/screenshots/`
6. Set privacy answers to “No data collected”
7. Submit for review

## Blocked Items

- [ ] Complete publisher identity verification before submission if the account requires it.
- [ ] Confirm trader or non-trader status in the Chrome Web Store publisher settings.
