const storageKey = 'information-retrieval-practice-assignment-v1';

export function assignedQuestIndex(storage, randomValues, count) {
  if (!Number.isSafeInteger(count) || count < 1) throw new RangeError('題庫不得為空');
  try {
    const saved = storage.getItem(storageKey);
    if (saved !== null && /^(0|[1-9]\d*)$/.test(saved)) {
      const index = Number(saved);
      if (index < count) return index;
    }
  } catch { /* Some browsers disallow storage; still assign a quest. */ }

  // Reject the small remainder to give every quest the same chance.
  const range = 0x100000000;
  const limit = Math.floor(range / count) * count;
  let number;
  do { number = randomValues(new Uint32Array(1))[0]; } while (number >= limit);
  const index = number % count;
  try { storage.setItem(storageKey, String(index)); } catch { /* Private browsing may disallow storage. */ }
  return index;
}
