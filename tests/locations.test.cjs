const { test, describe } = require('node:test');
const assert = require('node:assert/strict');

const { isChannelLikePage } = require('../content.js');

describe('isChannelLikePage location shapes', () => {
  test('root path is false', () => {
    assert.equal(isChannelLikePage('/'), false);
  });

  test('single segment unknown path is true', () => {
    assert.equal(isChannelLikePage('/nugs'), true);
  });
});
