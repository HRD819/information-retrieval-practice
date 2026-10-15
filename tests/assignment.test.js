import test from 'node:test';
import assert from 'node:assert/strict';
import { assignedQuestIndex } from '../src/assignment.js';

function storage(initial) {
  const values = new Map(initial);
  return { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value), values };
}
const random = number => values => { values[0] = number; return values; };

test('第一次分配涵蓋十題，之後重新載入仍是同一題', () => {
  for (let expected = 0; expected < 10; expected++) {
    const browser = storage();
    assert.equal(assignedQuestIndex(browser, random(expected), 10), expected);
    assert.equal(assignedQuestIndex(browser, random((expected + 1) % 10), 10), expected);
  }
});

test('無效的舊題號會重新分配，瀏覽器拒絕儲存時仍能作答', () => {
  const browser = storage([['information-retrieval-practice-assignment-v1', '99']]);
  assert.equal(assignedQuestIndex(browser, random(3), 10), 3);
  assert.equal(assignedQuestIndex(browser, random(2), 10), 3);
  const blocked = { getItem() { throw Error('blocked'); }, setItem() { throw Error('blocked'); } };
  assert.equal(assignedQuestIndex(blocked, random(7), 10), 7);
});
