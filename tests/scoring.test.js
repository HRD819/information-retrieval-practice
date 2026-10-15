import test from 'node:test';
import assert from 'node:assert/strict';
import { parseKeywords, grade, passes } from '../src/scoring.js';
import { quests } from '../src/quests.js';
const answers = [
  '"麻婆豆腐" 四川 -豬絞肉 -牛肉 素食',
  '"人工智慧倫理" filetype:pdf (site:ntu.edu.tw OR site:nthu.edu.tw)',
  'intitle:台積電 intitle:美國設廠',
  '"數位典藏" AROUND(8) "博物館"',
  '(資訊素養 OR "information literacy") 大學 -國小 -中學 filetype:pdf',
  '"Pixel 9" 電池 site:x.com -新聞',
  '"著作權法" site:gov.tw (filetype:doc OR filetype:docx)',
  '"沙丘：第二部" 影評 (site:imdb.com OR site:rottentomatoes.com)',
  '台南 "獨立書店" -誠品',
  'Python Pandas "合併 DataFrame" (site:stackoverflow.com OR site:medium.com)'
];
quests.forEach((q, i) => test(`關卡 ${i + 1}：正確檢索句與空白作答`, () => {
  assert.equal(q.solutionChecks.reduce((n, c) => n + c.score, 0), 100);
  assert.equal(grade(q, answers[i]).score, 100);
  assert.equal(grade(q, '').score, 0);
}));
test('關鍵字去重並保留逗號分隔的英文片語', () => {
  assert.deepEqual(parseKeywords('Pixel 9, 電池，續航力, pixel 9'), ['Pixel 9','電池','續航力']);
  assert.equal(parseKeywords('四川 四川 四川').length, 1);
});
test('OR 必須連接兩個指定網站，不能從單字中誤認', () => {
  const c = quests[1].solutionChecks[2];
  assert.equal(passes(c, 'site:ntu.edu.tw information'), false);
  assert.equal(passes(c, 'site:ntu.edu.tw OR something'), false);
  assert.equal(passes(c, 'site:ntu.edu.tw site:nthu.edu.tw x OR y'), false);
  assert.equal(passes(c, '(site:nthu.edu.tw OR site:ntu.edu.tw)'), true);
});
test('檔案類型與網域須完整相符，排除詞不能當成包含詞', () => {
  assert.equal(passes({ type:'filetype', value:'doc' }, 'filetype:docx'), false);
  assert.equal(passes({ type:'site', value:'gov.tw' }, 'site:gov.tw.example.com'), false);
  assert.equal(passes({ type:'include', value:'素食' }, '-素食'), false);
  assert.equal(passes({ type:'filetype', value:'pdf' }, '-filetype:pdf'), false);
});
test('接受兩詞標題查詢、合理鄰近距離與提示中的報導排除', () => {
  assert.equal(grade(quests[2], 'allintitle:台積電 美國設廠').score, 100);
  assert.equal(grade(quests[3], '"博物館" AROUND(5) "數位典藏"').score, 100);
  assert.equal(grade(quests[5], '"Pixel 9" 電池 site:twitter.com -報導').score, 100);
});
test('同義詞須以 OR 連接，且保留片語引號', () => {
  const c = quests[4].solutionChecks[0];
  assert.equal(passes(c, '(資訊素養 "information literacy") x OR y'), false);
  assert.equal(passes(c, '(資訊素養 OR information literacy)'), false);
});
