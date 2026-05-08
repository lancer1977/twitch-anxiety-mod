# Troubleshooting

## Sideload install checklist

- Use `chrome://extensions`, not the Chrome Web Store page.
- Turn on **Developer mode** before looking for **Load unpacked**.
- Select the folder that directly contains `manifest.json`.
- If you built `dist/twitch-anxiety-mod.zip`, unzip it first. Chrome cannot load the ZIP directly as an unpacked extension.
- After loading or reloading the extension, refresh open Twitch tabs.

## Extension does not appear in Chrome

- Confirm you selected the repo folder or the unzipped build folder, not the parent directory.
- Confirm the selected folder contains `manifest.json`.
- Refresh the extensions page after installing if the popup icon does not show up immediately.

## Settings changed but Twitch did not update

- Refresh the Twitch tab after changing popup settings.
- On `chrome://extensions`, click the reload icon on the Twitch Anxiety Mod card after pulling new repo changes.
- If the extension was loaded from a ZIP copy, rebuild and unzip a fresh copy before reloading.

## Sidebar still hides on a page where it should stay visible

- Confirm you are on the Twitch root page or a non-channel browsing page like directory/search.
- If you are on a streamer/channel page, the sidebar is expected to hide.
- Refresh the Twitch tab after changing settings.

## Chat usernames do not hide

- Confirm `Hide chat messages from listed users` is enabled.
- Confirm names are entered without extra spaces or punctuation.
- Use one name per line, or separate names with commas or semicolons.
- `@username` and `username` are treated the same.
- Try the import/export buttons to make sure the list persisted correctly.
- Refresh the Twitch chat tab after changing the list.

## Import/export problems

- JSON imports should be an array or an object with one of the common hidden-user keys.
- Plain text imports can use commas, semicolons, or new lines.
- If the list looks wrong, clear it and re-import a simpler text file first.

## Store submission issues

- The Chrome Web Store submission is blocked until publisher identity verification is complete.
- Check the trader/non-trader declaration before uploading.
