const { test, describe } = require('node:test');
const assert = require('node:assert/strict');

const { isChannelLikePage } = require('../content.js');

describe('isChannelLikePage edge cases', () => {
  test('multi-segment paths are not channel-like', () => {
    assert.equal(isChannelLikePage('/somechannel/videos'), false);
  });

  test('non-channel sections with two segments are false', () => {
    assert.equal(isChannelLikePage('/downloads/videos'), false);
    assert.equal(isChannelLikePage('/settings/profile'), false);
  });
});
