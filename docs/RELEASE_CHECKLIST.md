# Release Checklist (Chrome Web Store)

- [x] Manifest V3
- [x] Minimal permissions (`storage`, Twitch host permission)
- [x] Privacy policy (`PRIVACY.md`)
- [x] Store listing copy (`docs/CHROME_STORE_LISTING.md`)
- [x] Support URL configured
- [x] Icons generated (16/48/128)
- [ ] Screenshots captured from extension popup + Twitch page
- [x] ZIP package generated

## Upload steps
1. Go to Chrome Web Store Developer Dashboard
2. Create new item
3. Upload `dist/twitch-anxiety-mod.zip`
4. Paste listing copy from `docs/CHROME_STORE_LISTING.md`
5. Add screenshots from `store-assets/screenshots/`
6. Set privacy answers to “No data collected”
7. Submit for review
