const { test, describe } = require('node:test');
const assert = require('node:assert/strict');

const { parseNameList, isChannelLikePage, shouldHideSidebar } = require('../content.js');

describe('twitch-anxiety-mod parsing helpers', () => {
  test('parseNameList normalizes and deduplicates usernames', () => {
    const parsed = parseNameList('\nAlice, @Bob;\nalice; @carol ,BOB\n');
    assert.deepEqual(parsed, ['alice', 'bob', 'carol']);
  });

  test('isChannelLikePage behavior stays on channel pages only', () => {
    assert.equal(isChannelLikePage('/somechannel'), true);
    assert.equal(isChannelLikePage('/'), false);
    assert.equal(isChannelLikePage('/downloads/videos'), false);
  });

  test('shouldHideSidebar follows defaults and explicit settings', () => {
    const previousLocation = global.location;
    global.location = { pathname: '/nugs' };

    try {
      assert.equal(shouldHideSidebar({ hideLeftSidebar: true }), true);
      assert.equal(shouldHideSidebar({ hideLeftSidebar: false }), false);
    } finally {
      global.location = previousLocation;
    }
  });
});
