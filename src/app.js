import { quests as sourceQuests } from './quests.js';
import { parseKeywords, grade } from './scoring.js';
import { assignedQuestIndex } from './assignment.js';
const $ = id => document.getElementById(id);
let storage;
try { storage = window.sessionStorage; } catch { storage = { getItem: () => null, setItem: () => {} }; }
const quest = sourceQuests[assignedQuestIndex(storage, values => crypto.getRandomValues(values), sourceQuests.length)];
let expansions = new Map(), lastGenerated = '';
const labels = { phrase:'片語查詢', include:'必要關鍵詞', exclude:'排除詞彙', exclude_or:'排除指定詞彙', filetype:'檔案格式', filetype_or:'多種檔案格式', site:'網站限制', site_or:'多個網站的 OR 組合', site_any:'社群網站限制', intitle_all:'標題限制', proximity:'鄰近檢索', synonym_or:'跨語系 OR 組合' };
function step(number, focus = true) {
  for (let n = 1; n <= 3; n++) $(`step-${n}`).hidden = n !== number;
  $('result-card').hidden = true;
  if (focus) (number === 1 ? $('keyword-input') : number === 2 ? $('expansion-input-container').querySelector('input') : $('search-query')).focus();
}
function loadQuest() {
  $('quest-title').textContent = quest.title;
  $('quest-description').textContent = quest.description;
  ['keyword-input','search-query'].forEach(id => $(id).value = '');
  ['keyword-feedback','expansion-feedback','search-feedback'].forEach(id => $(id).textContent = '');
  $('completion-message').hidden = true;
  $('expansion-input-container').replaceChildren();
  $('cheat-sheet').open = false;
  expansions = new Map(); lastGenerated = ''; step(1, false);
}
function saveExpansions() {
  document.querySelectorAll('.expansion-input').forEach(el => expansions.set(el.dataset.keyword, el.value));
}
$('check-keywords-btn').addEventListener('click', () => {
  const keywords = parseKeywords($('keyword-input').value);
  if (keywords.length < 3) { $('keyword-feedback').textContent = '請至少輸入 3 個不同的關鍵詞彙；英文片語請用逗號與其他詞彙隔開。'; return; }
  const matches = keywords.filter(k => quest.keywords.some(q => q.toLowerCase() === k.toLowerCase()) || (k.length >= 2 && quest.description.toLowerCase().includes(k.toLowerCase())));
  if (matches.length < 3) { $('keyword-feedback').textContent = '請再找出至少 3 個與任務相關的詞彙，可以直接使用描述中的專有名詞。'; return; }
  saveExpansions();
  $('expansion-input-container').replaceChildren();
  keywords.forEach((keyword, i) => {
    const group = document.createElement('div'), label = document.createElement('label'), input = document.createElement('input');
    label.htmlFor = `expansion-${i}`; label.textContent = keyword;
    input.id = label.htmlFor; input.className = 'expansion-input'; input.dataset.keyword = keyword; input.value = expansions.get(keyword) ?? keyword;
    group.append(label, input); $('expansion-input-container').append(group);
  });
  $('keyword-feedback').textContent = ''; step(2);
});
$('back-to-step1-btn').addEventListener('click', () => { saveExpansions(); step(1); });
$('check-expansion-btn').addEventListener('click', () => {
  saveExpansions();
  const inputs = [...document.querySelectorAll('.expansion-input')];
  if (inputs.some(el => !el.value.trim())) { $('expansion-feedback').textContent = '請保留每個核心詞彙，或填入它的擴展詞彙。'; return; }
  const generated = inputs.map(el => {
    const value = el.value.trim().replace(/\bor\b/gi, 'OR');
    return /\bOR\b|\|/.test(value) && !(value.startsWith('(') && value.endsWith(')')) ? `(${value})` : value;
  }).join(' ');
  if (generated !== lastGenerated || !$('search-query').value.trim()) $('search-query').value = generated;
  lastGenerated = generated; $('expansion-feedback').textContent = ''; step(3);
});
$('back-to-step2-btn').addEventListener('click', () => step(2));
$('check-btn').addEventListener('click', () => {
  const { score, checks } = grade(quest, $('search-query').value.trim());
  $('score-display').textContent = score;
  $('feedback-list').replaceChildren();
  checks.forEach(check => {
    const p = document.createElement('p'); p.className = check.passed ? 'success' : 'hint';
    p.textContent = check.passed ? `✓ ${labels[check.type]}：符合本題要求（${check.score} 分）` : `提示：${check.hint}`;
    $('feedback-list').append(p);
  });
  $('result-card').hidden = false;
  $('completion-message').hidden = score < 80;
  $('result-title').focus();
});
$('search-query').addEventListener('input', () => {
  $('result-card').hidden = true;
});
$('search-btn').addEventListener('click', () => {
  const query = $('search-query').value.trim();
  if (!query) { $('search-feedback').textContent = '請先輸入你的檢索句！'; $('search-query').focus(); return; }
  $('search-feedback').textContent = '';
  window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank', 'noopener,noreferrer');
});
loadQuest();
