/**
 * Полная сборка сайта по порядку.
 *   node support-site/build.js          страницы
 *   node support-site/build.js --assets страницы и картинки заново
 *
 * Порядок важен: стили и скрипт уже должны быть готовы, потому что
 * каждая страница ссылается на них с меткой версии по содержимому.
 */
const { execFileSync } = require('child_process');
const path = require('path');

const steps = ['build-site.js', 'build-landings.js', 'build-legal.js'];
if (process.argv.includes('--assets')) steps.unshift('build-assets.js');

for (const s of steps) {
  process.stdout.write(s + '\n');
  execFileSync(process.execPath, [path.join(__dirname, s)], { stdio: 'inherit' });
}
console.log('сайт собран');
