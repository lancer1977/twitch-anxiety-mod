const DEFAULTS = {
  enabled: true,
  hideViewers: true,
  hideFollowers: true,
  hideWatchingNow: true,
  strictMode: false
};

const ids = Object.keys(DEFAULTS);

function load() {
  chrome.storage.sync.get(DEFAULTS, (settings) => {
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.checked = !!settings[id];
    });
  });
}

function save() {
  const next = {};
  ids.forEach((id) => {
    const el = document.getElementById(id);
    next[id] = !!el?.checked;
  });
  chrome.storage.sync.set(next);
}

document.addEventListener('DOMContentLoaded', () => {
  load();
  ids.forEach((id) => {
    document.getElementById(id)?.addEventListener('change', save);
  });
});
