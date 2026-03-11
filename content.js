(() => {
  const HIDE_SELECTORS = [
    // common Twitch metadata/count containers (will evolve)
    '[data-a-target*="followers"]',
    '[data-a-target*="viewer"]',
    '[data-a-target*="viewers"]',
    '[aria-label*="viewer" i]',
    '[aria-label*="followers" i]'
  ];

  const TEXT_PATTERNS = [
    /\\bwatching now\\b/i,
    /\\bviewers?\\b/i,
    /\\bfollowers?\\b/i,
    /\\bsubs?\\b/i
  ];

  function hideBySelector() {
    HIDE_SELECTORS.forEach((selector) => {
      document.querySelectorAll(selector).forEach((el) => {
        el.style.display = 'none';
      });
    });
  }

  function hideByText(node = document.body) {
    const walker = document.createTreeWalker(node, NodeFilter.SHOW_ELEMENT);
    const toHide = [];

    while (walker.nextNode()) {
      const el = walker.currentNode;
      if (!el || !el.textContent) continue;
      const text = el.textContent.trim();
      if (!text) continue;

      if (TEXT_PATTERNS.some((re) => re.test(text))) {
        // keep this conservative to avoid nuking whole layout blocks
        if (el.childElementCount <= 3 && text.length < 60) {
          toHide.push(el);
        }
      }
    }

    toHide.forEach((el) => {
      el.style.visibility = 'hidden';
      el.style.width = '0';
      el.style.height = '0';
      el.style.overflow = 'hidden';
    });
  }

  function run() {
    hideBySelector();
    hideByText();
  }

  run();
  const observer = new MutationObserver(run);
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
