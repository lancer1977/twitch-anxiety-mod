(() => {
  const DEFAULTS = {
    enabled: true,
    hideViewers: true,
    hideFollowers: true,
    hideWatchingNow: true,
    strictMode: false,
    hideLeftSidebar: true
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
    ],
    leftSidebar: [
      // your exact dump anchors
      '[data-a-target="side-nav-bar"]',
      '[data-test-selector="side-nav"]',
      '#side-nav',
      'nav[aria-label="Left Navigation"]',
      '.side-nav',
      '.side-nav__overlay-wrapper',
      '.side-nav__scrollable_content'
    ]
  };

  const TEXT_PATTERNS = {
    viewers: /\b\d+[\d,.]*\s*viewers?\b/i,
    followers: /\b\d+[\d,.]*\s*followers?\b/i,
    watchingNow: /\bwatching now\b/i,
    numericOnly: /^\d+[\d,.KMBkmb]*$/
  };

  let styleTag;

  function ensureStyleTag() {
    if (styleTag && document.contains(styleTag)) return styleTag;
    styleTag = document.createElement('style');
    styleTag.id = 'tam-style';
    document.documentElement.appendChild(styleTag);
    return styleTag;
  }

  function applySidebarCollapseCss() {
    const css = `
      /* Hard kill side nav */
      [data-a-target="side-nav-bar"],
      [data-test-selector="side-nav"],
      #side-nav,
      nav[aria-label="Left Navigation"],
      .side-nav,
      .side-nav__overlay-wrapper,
      .side-nav__scrollable_content {
        display: none !important;
        width: 0 !important;
        min-width: 0 !important;
        max-width: 0 !important;
        margin: 0 !important;
        padding: 0 !important;
        border: 0 !important;
        visibility: hidden !important;
      }

      /* Collapse common Twitch layout gutters after nav removal */
      [class*="persistent-nav"],
      [class*="side-nav"],
      main,
      .main,
      [role="main"] {
        margin-left: 0 !important;
        padding-left: 0 !important;
      }
    `;
    ensureStyleTag().textContent = css;
  }

  function clearSidebarCollapseCss() {
    if (styleTag) styleTag.textContent = '';
  }

  function hideElement(el) {
    if (!el || el.dataset.tamHidden === '1') return;
    el.dataset.tamHidden = '1';
    el.style.setProperty('display', 'none', 'important');
    el.style.setProperty('width', '0', 'important');
    el.style.setProperty('min-width', '0', 'important');
    el.style.setProperty('max-width', '0', 'important');
    el.style.setProperty('margin', '0', 'important');
    el.style.setProperty('padding', '0', 'important');
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
    if (!settings.enabled) {
      clearSidebarCollapseCss();
      return;
    }

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

    if (settings.hideLeftSidebar) {
      hideBySelectors(SELECTORS.leftSidebar);
      applySidebarCollapseCss();
    } else {
      clearSidebarCollapseCss();
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
