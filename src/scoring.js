export function parseKeywords(value) {
  const parts = /[,，、\n]/.test(value) ? value.split(/[,，、\n]+/) : value.split(/\s+/);
  const seen = new Set();
  return parts.map(s => s.trim()).filter(s => {
    const key = s.toLowerCase();
    if (!key || seen.has(key)) return false;
    seen.add(key); return true;
  });
}
export function tokenize(query) {
  return (query.replace(/[“”]/g, '"').match(/-?(?:[a-z]+:)?"[^"]*"|AROUND\(\d+\)|[()]|\||[^\s()]+/gi) || []).map(s => s.toLowerCase());
}
const unquote = s => s.replace(/^"|"$/g, '');
function excludedTerms(tokens) {
  const excluded = new Set();
  tokens.forEach((token, i) => {
    if (token.startsWith('-') && token.length > 1) excluded.add(unquote(token.slice(1)));
    if (token !== 'not') return;
    if (tokens[i + 1] !== '(') {
      const term = tokens[i + 1];
      if (term && !['or', 'and', '|', ')'].includes(term) && !term.startsWith('-')) excluded.add(unquote(term));
      return;
    }
    const close = tokens.indexOf(')', i + 2);
    if (close < 0) return;
    const group = tokens.slice(i + 2, close);
    if (group.length % 2 !== 1 || group.some((part, j) => j % 2 ? !['or', '|'].includes(part) : !part || ['or', 'and', '|', '('].includes(part) || part.startsWith('-'))) return;
    group.filter((_, j) => j % 2 === 0).forEach(term => excluded.add(unquote(term)));
  });
  return excluded;
}
export function toGoogleQuery(query) {
  const term = '"[^"]+"|[^\\s()]+';
  const group = new RegExp(`\\bNOT\\s*\\(\\s*(${term})(?:\\s+OR\\s+(${term}))*\\s*\\)`, 'gi');
  return query.replace(group, match => {
    const terms = match.slice(match.indexOf('(') + 1, -1).match(/"[^"]+"|[^\s()]+/g) || [];
    if (terms.some((part, i) => i % 2 ? part.toUpperCase() !== 'OR' : part.toUpperCase() === 'OR')) return match;
    return terms.filter((_, i) => i % 2 === 0).map(part => `-${part}`).join(' ');
  }).replace(/\bNOT\s+("[^"]+"|[^\s()]+)/gi, (_, value) => `-${value}`);
}
function hasOrGroup(tokens, values, requireParentheses = false) {
  const wanted = values.map(s => s.toLowerCase());
  for (let i = 0; i < tokens.length; i++) {
    const parts = [unquote(tokens[i])];
    let j = i;
    while (['or', '|'].includes(tokens[j + 1]) && tokens[j + 2]) {
      parts.push(unquote(tokens[j + 2])); j += 2;
    }
    if (parts.length > 1 && wanted.every(v => parts.includes(v)) &&
        (!requireParentheses || (tokens[i - 1] === '(' && tokens[j + 1] === ')'))) return true;
  }
  return false;
}
export function passes(check, query) {
  const tokens = tokenize(query);
  const value = check.value?.toLowerCase();
  const values = check.values?.map(s => s.toLowerCase());
  const positive = tokens.filter(t => !t.startsWith('-'));
  switch (check.type) {
    case 'phrase': return positive.includes(`"${value}"`);
    case 'include': return positive.some(t => unquote(t) === value);
    case 'exclude': return [value, ...(check.alternatives || [])].some(v => excludedTerms(tokens).has(v.toLowerCase()));
    case 'exclude_or': return values.every(v => excludedTerms(tokens).has(v));
    case 'filetype': return tokens.includes(`filetype:${value}`);
    case 'site': return tokens.includes(`site:${value}`);
    case 'filetype_or': return hasOrGroup(tokens, values);
    case 'site_or': return hasOrGroup(tokens, values);
    case 'site_any': return values.some(v => tokens.includes(v));
    case 'intitle_all': {
      if (values.every(v => tokens.includes(`intitle:${v}`) || tokens.includes(`intitle:"${v}"`))) return true;
      const start = tokens.findIndex(t => t.startsWith('allintitle:'));
      if (start < 0) return false;
      const title = [unquote(tokens[start].slice(11)), ...tokens.slice(start + 1).filter(t => !/[:()-]/.test(t)).map(unquote)];
      return values.every(v => title.includes(v));
    }
    case 'proximity': return tokens.some((t, i) => /^around\([1-9]\d*\)$/.test(t) &&
      ((unquote(tokens[i-1] || '') === values[0] && unquote(tokens[i+1] || '') === values[1]) ||
       (unquote(tokens[i-1] || '') === values[1] && unquote(tokens[i+1] || '') === values[0])));
    case 'synonym_or': return hasOrGroup(tokens, values, true);
    default: return false;
  }
}
export function grade(quest, query) {
  const checks = quest.solutionChecks.map(check => ({ ...check, passed: passes(check, query) }));
  return { score: checks.reduce((sum, check) => sum + (check.passed ? check.score : 0), 0), checks };
}
