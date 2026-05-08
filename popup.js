const DEFAULTS = {
  enabled: true,
  hideViewers: true,
  hideFollowers: true,
  hideWatchingNow: true,
  strictMode: false,
  hideLeftSidebar: true,
  hideSuggestions: true,
  hideChatUsers: false,
  hiddenChatUsers: ''
};

const ids = Object.keys(DEFAULTS);
let saveTimer;

function getEl(id) {
  return document.getElementById(id);
}

function hiddenUsersInput() {
  return getEl('hiddenChatUsers');
}

function statusEl() {
  return getEl('chatUsersStatus');
}

function countEl() {
  return getEl('hiddenChatUsersCount');
}

function normalizeUserList(rawValue) {
  if (!rawValue) return [];

  const seen = new Set();
  const names = [];

  rawValue
    .split(/[\n,;]+/)
    .map((value) => value.trim())
    .map((value) => value.replace(/^@+/, '').toLowerCase())
    .filter(Boolean)
    .forEach((value) => {
      if (seen.has(value)) return;
      seen.add(value);
      names.push(value);
    });

  return names;
}

function parseImportedUsers(rawText, fileName = '') {
  const trimmed = String(rawText || '').trim();
  if (!trimmed) return [];

  if (fileName.toLowerCase().endsWith('.json') || trimmed.startsWith('{') || trimmed.startsWith('[')) {
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) return normalizeUserList(parsed.join('\n'));
      if (typeof parsed === 'string') return normalizeUserList(parsed);
      if (parsed && typeof parsed === 'object') {
        const candidate =
          parsed.hiddenChatUsers ??
          parsed.users ??
          parsed.usernames ??
          parsed.chatUsers ??
          parsed.names ??
          '';
        if (Array.isArray(candidate)) return normalizeUserList(candidate.join('\n'));
        return normalizeUserList(String(candidate));
      }
    } catch {
      // Fall through to plain-text parsing.
    }
  }

  return normalizeUserList(trimmed);
}

function setStatus(message) {
  const el = statusEl();
  if (!el) return;
  el.textContent = message || '';
}

function updateHiddenUsersCount() {
  const el = countEl();
  if (!el) return;

  const list = normalizeUserList(hiddenUsersInput()?.value || '');
  if (!list.length) {
    el.textContent = 'No hidden chat users configured.';
    return;
  }

  el.textContent = `${list.length} hidden chat user${list.length === 1 ? '' : 's'} configured.`;
}

function load() {
  chrome.storage.sync.get(DEFAULTS, (settings) => {
    ids.forEach((id) => {
      const el = getEl(id);
      if (!el) return;
      if (el.type === 'checkbox') {
        el.checked = !!settings[id];
      } else {
        el.value = settings[id] || '';
      }
    });
    updateHiddenUsersCount();
  });
}

function save() {
  const next = {};
  ids.forEach((id) => {
    const el = getEl(id);
    if (!el) return;
    next[id] = el.type === 'checkbox' ? !!el.checked : el.value;
  });
  chrome.storage.sync.set(next);
}

function saveHiddenUsers(value) {
  const el = hiddenUsersInput();
  if (!el) return;
  el.value = normalizeUserList(value).join('\n');
  updateHiddenUsersCount();
  save();
}

function scheduleSave() {
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    saveTimer = undefined;
    save();
  }, 150);
}

function exportHiddenUsers() {
  const value = hiddenUsersInput()?.value || '';
  const exportText = normalizeUserList(value).join('\n');
  const blob = new Blob([exportText ? `${exportText}\n` : ''], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'twitch-anxiety-mod-hidden-users.txt';
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  setStatus('Exported the hidden-user list.');
}

function importHiddenUsers(file) {
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    const current = hiddenUsersInput()?.value || '';
    const merged = normalizeUserList(`${current}\n${parseImportedUsers(reader.result, file.name).join('\n')}`);
    saveHiddenUsers(merged.join('\n'));
    setStatus(`Imported ${merged.length} hidden user${merged.length === 1 ? '' : 's'}.`);
  };
  reader.onerror = () => {
    setStatus('Import failed.');
  };
  reader.readAsText(file);
}

function clearHiddenUsers() {
  saveHiddenUsers('');
  setStatus('Cleared the hidden-user list.');
}

document.addEventListener('DOMContentLoaded', () => {
  load();
  ids.forEach((id) => {
    const el = getEl(id);
    if (!el) return;
    const eventName = el.type === 'checkbox' ? 'change' : 'input';
    el.addEventListener(eventName, el.type === 'checkbox' ? save : scheduleSave);
    if (el.type !== 'checkbox') {
      el.addEventListener('change', save);
      if (id === 'hiddenChatUsers') {
        el.addEventListener('input', updateHiddenUsersCount);
      }
    }
  });

  getEl('exportChatUsers')?.addEventListener('click', exportHiddenUsers);
  getEl('importChatUsers')?.addEventListener('click', () => {
    getEl('chatUsersFile')?.click();
  });
  getEl('clearChatUsers')?.addEventListener('click', clearHiddenUsers);
  getEl('chatUsersFile')?.addEventListener('change', (event) => {
    const file = event.target.files?.[0];
    if (file) importHiddenUsers(file);
    event.target.value = '';
  });
  updateHiddenUsersCount();
});
