const { test, describe } = require('node:test');
const assert = require('node:assert/strict');

const { shouldHideSidebar } = require('../content.js');

describe('shouldHideSidebar defaults', () => {
  test('falls back to sidebar blocklist defaults for blocked areas', () => {
    const previousLocation = global.location;
    global.location = { pathname: '/downloads' };
    try {
      assert.equal(shouldHideSidebar({ hideLeftSidebar: true }), false);
    } finally {
      global.location = previousLocation;
    }
  });

  test('keeps behavior with empty settings object', () => {
    const previousLocation = global.location;
    global.location = { pathname: '/somechannel' };
    try {
      assert.equal(shouldHideSidebar({}), undefined);
    } finally {
      global.location = previousLocation;
    }
  });
});
