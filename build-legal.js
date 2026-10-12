/**
 * Переводит политику конфиденциальности и условия использования на общий
 * вид сайта. Текст документов не трогается: он юридический и правится
 * руками. Скрипт только оборачивает его в общие шапку, подвал и стили.
 *   node support-site/build-legal.js
 *
 * Содержимое лежит между метками <!-- content --> и <!-- /content -->.
 * При первом запуске их еще нет, тогда берется все внутри <main>.
 * Править документ нужно между метками, а потом запускать скрипт.
 */
const fs = require('fs');
const path = require('path');
const S = require('./site-chrome');
const { I, BASE } = S;

const DOCS = [
  { file: 'privacy.html', desc: 'How CookFusion collects, uses and protects your information.' },
  { file: 'terms.html', desc: 'The terms that apply when you use the CookFusion app.' },
];

for (const d of DOCS) {
  const src = fs.readFileSync(path.join(S.DIR, d.file), 'utf8');

  let body;
  const a = src.indexOf('<!-- content -->'), z = src.indexOf('<!-- /content -->');
  if (a >= 0 && z > a) body = src.slice(a + '<!-- content -->'.length, z);
  else body = src.slice(src.indexOf('<main>') + 6, src.indexOf('</main>'));
  if (!body.trim()) throw new Error(d.file + ': не нашлось содержимого');

  const h1 = (src.match(/<h1[^>]*>([^<]+)<\/h1>/) || [])[1] || 'CookFusion';
  const title = 'CookFusion: ' + h1;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${S.esc(title)}</title>
<meta name="description" content="${S.attr(d.desc)}">
<link rel="canonical" href="${BASE}${d.file}">
<meta name="robots" content="index, follow">
${S.headCommon('en')}
</head>
<body>

${S.header('en')}

<main class="page">
  <div class="wrap">
    <a class="crumb" href="./">${I.back}Back to home</a>
    <p class="kicker" style="margin-top:26px">Legal</p>
    <h1 class="h1">${S.esc(h1)}</h1>
    <div class="prose legal">
<!-- content -->${body}<!-- /content -->
    </div>
  </div>
</main>

${S.footer('en')}

${S.scriptTag()}
</body>
</html>
`;
  fs.writeFileSync(path.join(S.DIR, d.file), html);
  console.log('  ' + d.file + ': ' + h1);
}
