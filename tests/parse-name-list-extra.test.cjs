const { test, describe } = require('node:test');
const assert = require('node:assert/strict');

const { parseNameList } = require('../content.js');

describe('parseNameList extra cases', () => {
  test('normalizes mixed separators and duplicates', () => {
    assert.deepEqual(parseNameList('Alice;;Bob,  alice  ;@carol'), ['alice', 'bob', 'carol']);
  });

  test('ignores empty entries', () => {
    assert.deepEqual(parseNameList('\n\n, ;'), []);
  });
});
