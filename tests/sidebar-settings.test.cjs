const { test, describe } = require('node:test');
const assert = require('node:assert/strict');

const { shouldHideSidebar } = require('../content.js');

describe('shouldHideSidebar settings behavior', () => {
  test('hides sidebar when pathname is channel page with explicit default', () => {
    const previousLocation = global.location;
    global.location = { pathname: '/somechannel' };
    try {
      assert.equal(shouldHideSidebar({ hideLeftSidebar: true }), true);
    } finally {
      global.location = previousLocation;
    }
  });

  test('does not hide sidebar when setting disabled', () => {
    const previousLocation = global.location;
    global.location = { pathname: '/somechannel' };
    try {
      assert.equal(shouldHideSidebar({ hideLeftSidebar: false }), false);
    } finally {
      global.location = previousLocation;
    }
  });
});
