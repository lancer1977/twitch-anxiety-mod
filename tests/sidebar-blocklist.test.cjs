const { test, describe } = require('node:test');
const assert = require('node:assert/strict');

const { isChannelLikePage } = require('../content.js');

describe('sidebar blocklist behavior', () => {
  test('channel-like page with blocked top-level segment is false', () => {
    assert.equal(isChannelLikePage('/downloads'), false);
  });

  test('channel-like page with safe segment is true', () => {
    assert.equal(isChannelLikePage('/goodchannel'), true);
  });
});
