import { mkdir, copyFile, readFile } from 'node:fs/promises';
await mkdir('dist', { recursive: true });
for (const name of ['index.html', 'styles.css', 'app.js', 'assignment.js', 'scoring.js', 'quests.js', '.nojekyll']) {
  await copyFile(`src/${name}`, `dist/${name}`);
}
const html = await readFile('dist/index.html', 'utf8');
if (!html.includes('noindex') || /cdn.tailwindcss/.test(html)) throw new Error('Invalid production HTML');
console.log('Built static site in dist/');
