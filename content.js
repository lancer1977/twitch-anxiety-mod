(() => {
  const DEFAULTS = {
    enabled: true,
    hideViewers: true,
    hideFollowers: true,
    hideWatchingNow: true,
    strictMode: false
  };

  const SELECTORS = {
    viewers: [
      '[data-a-target*="viewer"]',
      '[data-a-target*="viewers"]',
      '[aria-label*="viewer" i]'
    ],
    followers: [
      '[data-a-target*="followers"]',
      '[aria-label*="followers" i]'
    ],
    watchingNow: [
      '[aria-label*="watching now" i]'
    ],
    numericBadges: [
      '[class*="badge"]',
      '[class*="count"]',
      '[data-test-selector*="count"]'
    ]
  };

  const TEXT_PATTERNS = {
    viewers: /\b\d+[\d,.]*\s*viewers?\b/i,
    followers: /\b\d+[\d,.]*\s*followers?\b/i,
    watchingNow: /\bwatching now\b/i,
    numericOnly: /^\d+[\d,.KMBkmb]*$/
  };

  function hideElement(el) {
    if (!el || el.dataset.tamHidden === '1') return;
    el.dataset.tamHidden = '1';
    el.style.setProperty('display', 'none', 'important');
  }

  function hideBySelectors(selectors) {
    selectors.forEach((sel) => {
      document.querySelectorAll(sel).forEach(hideElement);
    });
  }

  function hideByText(testFn) {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT);
    while (walker.nextNode()) {
      const el = walker.currentNode;
      if (!el || !el.textContent) continue;
      const text = el.textContent.trim();
      if (!text || text.length > 80 || el.childElementCount > 4) continue;
      if (testFn(text)) hideElement(el);
    }
  }

  function applySettings(settings) {
    if (!settings.enabled) return;

    if (settings.hideViewers) {
      hideBySelectors(SELECTORS.viewers);
      hideByText((t) => TEXT_PATTERNS.viewers.test(t));
    }

    if (settings.hideFollowers) {
      hideBySelectors(SELECTORS.followers);
      hideByText((t) => TEXT_PATTERNS.followers.test(t));
    }

    if (settings.hideWatchingNow) {
      hideBySelectors(SELECTORS.watchingNow);
      hideByText((t) => TEXT_PATTERNS.watchingNow.test(t));
    }

    if (settings.strictMode) {
      hideBySelectors(SELECTORS.numericBadges);
      hideByText((t) => TEXT_PATTERNS.numericOnly.test(t));
    }
  }

  function run() {
    chrome.storage.sync.get(DEFAULTS, applySettings);
  }

  run();
  const observer = new MutationObserver(run);
  observer.observe(document.documentElement, { childList: true, subtree: true });

  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'sync') run();
  });
})();
