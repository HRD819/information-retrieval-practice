const storageKey = 'information-retrieval-practice-previous-quest-v2';

export function assignedQuestIndex(storage, randomValues, count) {
  if (!Number.isSafeInteger(count) || count < 1) throw new RangeError('題庫不得為空');
  let previous = null;
  try {
    const saved = storage.getItem(storageKey);
    if (saved !== null && /^(0|[1-9]\d*)$/.test(saved)) {
      const index = Number(saved);
      if (index < count) previous = index;
    }
  } catch { /* Some browsers disallow storage; still assign a quest. */ }

  // Draw uniformly from all quests except the one seen on the last load.
  const choices = previous === null ? count : count - 1;
  if (choices === 0) return 0;
  const range = 0x100000000;
  const limit = Math.floor(range / choices) * choices;
  let number;
  do { number = randomValues(new Uint32Array(1))[0]; } while (number >= limit);
  const pick = number % choices;
  const index = previous !== null && pick >= previous ? pick + 1 : pick;
  try { storage.setItem(storageKey, String(index)); } catch { /* Private browsing may disallow storage. */ }
  return index;
}
