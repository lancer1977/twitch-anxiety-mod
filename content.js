(() => {
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
    ],
    suggestions: [
      '[data-a-target*="recommend" i]',
      '[data-a-target*="suggest" i]',
      '[data-a-target*="collab" i]',
      '[data-test-selector*="recommend" i]',
      '[data-test-selector*="suggest" i]',
      '[data-test-selector*="collab" i]',
      '[aria-label*="recommended" i]',
      '[aria-label*="suggested" i]',
      '[aria-label*="collab" i]'
    ],
    chatMessages: [
      '[data-a-target="chat-line-message"]',
      '[data-test-selector="chat-line-message"]',
      '[data-a-target="chat-line-message-body"]',
      '.chat-line__message',
      '.chat-line__message-container'
    ],
    chatUsernames: [
      'span[data-a-target="chat-message-username"]',
      'span[data-test-selector="chat-message-username"]',
      'span[data-test-selector="message-username"]',
      '.chat-author__display-name',
      '[data-a-target="chat-message-username"]',
      '[data-test-selector="chat-message-username"]',
      '[data-test-selector="message-username"]',
      '.chat-line__username',
      '.chat-line__username-container [dir="auto"]',
      '.chat-line__username-container'
    ],
    chatRoots: [
      '[data-test-selector="chat-room-component-layout"]',
      '.chat-scrollable-area__message-container',
      '[role="log"]'
    ]
  };

  const TEXT_PATTERNS = {
    viewers: /\b\d+[\d,.]*\s*viewers?\b/i,
    followers: /\b\d+[\d,.]*\s*followers?\b/i,
    watchingNow: /\bwatching now\b/i,
    numericOnly: /^\d+[\d,.KMBkmb]*$/,
    suggestions: /\b(recommended|recommendations?|suggested|suggestions?|suggested\s+collabs?|collab\s+suggestions?|channels?\s+we\s+think\s+you'?ll\s+like|because\s+you\s+watch)\b/i
  };

  let styleTag;
  let currentSettings = { ...DEFAULTS };
  let runTimer;
  const SIDEBAR_HIDE_BLOCKLIST = new Set([
    'directory',
    'downloads',
    'drops',
    'friends',
    'inventory',
    'jobs',
    'p',
    'search',
    'settings',
    'subscriptions',
    'turbo',
    'videos',
    'clips',
    'wallet'
  ]);

  function parseNameList(rawValue) {
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

  function getInlineStyleSnapshot(el) {
    return {
      display: el.style.getPropertyValue('display'),
      displayPriority: el.style.getPropertyPriority('display'),
      width: el.style.getPropertyValue('width'),
      widthPriority: el.style.getPropertyPriority('width'),
      minWidth: el.style.getPropertyValue('min-width'),
      minWidthPriority: el.style.getPropertyPriority('min-width'),
      maxWidth: el.style.getPropertyValue('max-width'),
      maxWidthPriority: el.style.getPropertyPriority('max-width'),
      margin: el.style.getPropertyValue('margin'),
      marginPriority: el.style.getPropertyPriority('margin'),
      padding: el.style.getPropertyValue('padding'),
      paddingPriority: el.style.getPropertyPriority('padding')
    };
  }

  function setStyleProperty(el, prop, value, priority) {
    if (value) {
      el.style.setProperty(prop, value, priority || '');
    } else {
      el.style.removeProperty(prop);
    }
  }

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

  function restoreElement(el) {
    if (!el || el.dataset.tamHidden !== '1') return;

    setStyleProperty(el, 'display', el.dataset.tamPrevDisplay, el.dataset.tamPrevDisplayPriority);
    setStyleProperty(el, 'width', el.dataset.tamPrevWidth, el.dataset.tamPrevWidthPriority);
    setStyleProperty(el, 'min-width', el.dataset.tamPrevMinWidth, el.dataset.tamPrevMinWidthPriority);
    setStyleProperty(el, 'max-width', el.dataset.tamPrevMaxWidth, el.dataset.tamPrevMaxWidthPriority);
    setStyleProperty(el, 'margin', el.dataset.tamPrevMargin, el.dataset.tamPrevMarginPriority);
    setStyleProperty(el, 'padding', el.dataset.tamPrevPadding, el.dataset.tamPrevPaddingPriority);

    delete el.dataset.tamHidden;
    delete el.dataset.tamPrevDisplay;
    delete el.dataset.tamPrevDisplayPriority;
    delete el.dataset.tamPrevWidth;
    delete el.dataset.tamPrevWidthPriority;
    delete el.dataset.tamPrevMinWidth;
    delete el.dataset.tamPrevMinWidthPriority;
    delete el.dataset.tamPrevMaxWidth;
    delete el.dataset.tamPrevMaxWidthPriority;
    delete el.dataset.tamPrevMargin;
    delete el.dataset.tamPrevMarginPriority;
    delete el.dataset.tamPrevPadding;
    delete el.dataset.tamPrevPaddingPriority;
  }

  function hideElement(el) {
    if (!el || el.dataset.tamHidden === '1') return;
    const snapshot = getInlineStyleSnapshot(el);
    el.dataset.tamPrevDisplay = snapshot.display;
    el.dataset.tamPrevDisplayPriority = snapshot.displayPriority;
    el.dataset.tamPrevWidth = snapshot.width;
    el.dataset.tamPrevWidthPriority = snapshot.widthPriority;
    el.dataset.tamPrevMinWidth = snapshot.minWidth;
    el.dataset.tamPrevMinWidthPriority = snapshot.minWidthPriority;
    el.dataset.tamPrevMaxWidth = snapshot.maxWidth;
    el.dataset.tamPrevMaxWidthPriority = snapshot.maxWidthPriority;
    el.dataset.tamPrevMargin = snapshot.margin;
    el.dataset.tamPrevMarginPriority = snapshot.marginPriority;
    el.dataset.tamPrevPadding = snapshot.padding;
    el.dataset.tamPrevPaddingPriority = snapshot.paddingPriority;
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

  function getChatContainer(el) {
    if (!el) return null;

    return el.closest(
      [
        '[data-a-target="chat-line-message"]',
        '[data-test-selector="chat-line-message"]',
        '[data-a-target="chat-line-message-body"]',
        '.chat-line__message',
        '.chat-line__message-container',
        '.chat-line',
        'li[data-a-target*="chat-line"]',
        'li[data-test-selector*="chat-line"]'
      ].join(', ')
    );
  }

  function restoreAllHiddenElements() {
    document.querySelectorAll('[data-tam-hidden="1"]').forEach(restoreElement);
  }

  function isChannelLikePage(pathname) {
    if (!pathname || pathname === '/') return false;

    const parts = pathname.split('/').filter(Boolean);
    if (parts.length !== 1) return false;

    return !SIDEBAR_HIDE_BLOCKLIST.has(parts[0].toLowerCase());
  }

  function shouldHideSidebar(settings) {
    return settings.hideLeftSidebar && isChannelLikePage(location.pathname);
  }

  function hideByText(testFn) {
    if (!document.body) return;
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT);
    while (walker.nextNode()) {
      const el = walker.currentNode;
      if (!el || !el.textContent) continue;
      const text = el.textContent.trim();
      if (!text || text.length > 80 || el.childElementCount > 4) continue;
      if (testFn(text)) hideElement(el);
    }
  }

  function hideSuggestionsByText() {
    if (!document.body) return;
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT);
    while (walker.nextNode()) {
      const el = walker.currentNode;
      if (!el || !el.textContent) continue;
      const text = el.textContent.trim();
      if (!text || text.length > 140 || el.childElementCount > 8) continue;
      if (!TEXT_PATTERNS.suggestions.test(text)) continue;

      const card = el.closest(
        'section, article, aside, [data-a-target], [data-test-selector], [role="complementary"]'
      );
      hideElement(card || el);
    }
  }

  function getChatUsername(messageEl) {
    const candidates = [messageEl, getChatContainer(messageEl)].filter(Boolean);

    for (const candidate of candidates) {
      for (const selector of SELECTORS.chatUsernames) {
        const usernameEl =
          candidate.matches?.(selector) ? candidate : candidate.querySelector(selector);
        if (usernameEl?.textContent) return usernameEl.textContent.trim();
      }
    }

    const ariaSources = [
      messageEl,
      getChatContainer(messageEl),
      messageEl.querySelector?.('[aria-label]'),
      getChatContainer(messageEl)?.querySelector?.('[aria-label]')
    ].filter(Boolean);

    for (const source of ariaSources) {
      const ariaLabel = source.getAttribute?.('aria-label');
      if (!ariaLabel) continue;
      const match = ariaLabel.match(/^(?:@)?([^:]+):/);
      if (match?.[1]) return match[1].trim();
    }

    const dataSources = [messageEl, getChatContainer(messageEl)].filter(Boolean);
    for (const source of dataSources) {
      const dataFrom = source.getAttribute?.('data-from');
      if (dataFrom) return dataFrom.trim();
    }

    for (const candidate of [messageEl, getChatContainer(messageEl)].filter(Boolean)) {
      const usernameNode = candidate.querySelector?.('.chat-line__username-container');
      if (usernameNode?.textContent) {
        const cleaned = usernameNode.textContent.trim().replace(/\s+/g, ' ');
        if (cleaned) return cleaned;
      }
    }

    return '';
  }

  function hideChatMessagesByUsers(hiddenUsers) {
    if (!hiddenUsers.length) return;

    const hiddenSet = new Set(hiddenUsers);
    const roots = SELECTORS.chatRoots
      .map((selector) => document.querySelector(selector))
      .filter(Boolean);
    const scope = roots[0] || document.body || document.documentElement;

    SELECTORS.chatMessages.concat(SELECTORS.chatUsernames).forEach((selector) => {
      scope.querySelectorAll(selector).forEach((messageEl) => {
        const username = getChatUsername(messageEl).toLowerCase().replace(/^@+/, '');
        if (!username || !hiddenSet.has(username)) return;

        hideElement(getChatContainer(messageEl) || messageEl);
      });
    });
  }

  function applySettings(settings) {
    currentSettings = { ...DEFAULTS, ...settings };
    clearSidebarCollapseCss();
    restoreAllHiddenElements();

    if (!settings.enabled) {
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

    if (shouldHideSidebar(settings)) {
      hideBySelectors(SELECTORS.leftSidebar);
      applySidebarCollapseCss();
    } else {
      clearSidebarCollapseCss();
    }

    if (settings.hideSuggestions) {
      hideBySelectors(SELECTORS.suggestions);
      hideSuggestionsByText();
    }

    const hiddenUsers = parseNameList(settings.hiddenChatUsers);
    if (settings.hideChatUsers || hiddenUsers.length) {
      hideChatMessagesByUsers(hiddenUsers);
    }
  }

  function run() {
    applySettings(currentSettings);
  }

  function scheduleRun() {
    if (runTimer) return;
    runTimer = window.setTimeout(() => {
      runTimer = undefined;
      run();
    }, 250);
  }

  chrome.storage.sync.get(DEFAULTS, (settings) => {
    currentSettings = { ...DEFAULTS, ...settings };
    run();
  });

  const observer = new MutationObserver(scheduleRun);
  observer.observe(document.documentElement, { childList: true, subtree: true });

  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== 'sync') return;
    Object.keys(changes).forEach((key) => {
      currentSettings[key] = changes[key].newValue;
    });
    scheduleRun();
  });
})();
