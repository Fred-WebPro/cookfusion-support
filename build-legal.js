/**
 * Собирает юридические страницы на двух языках из legal-content.js:
 * политику конфиденциальности, условия использования и политику cookie.
 *   node support-site/build-legal.js
 *
 * Текст правится в legal-content.js, страницы здесь только собираются.
 * Английская политика остается по адресу privacy.html: на него ведет
 * ссылка в App Store Connect и в самом приложении.
 */
const fs = require('fs');
const path = require('path');
const S = require('./site-chrome');
const { I, BASE } = S;
const { UPDATED, DOCS } = require('./legal-content');

const BACK = { en: 'Back to home', ru: 'На главную' };

// Блок документа: строка это абзац, массив это список
const block = (b) => Array.isArray(b)
  ? `<ul>${b.map((li) => `<li>${li}</li>`).join('')}</ul>`
  : `<p>${b}</p>`;

let bad = 0;
for (const doc of DOCS) bad += S.checkText(doc, doc.en.file);
if (bad) { console.error('Длинные тире или е с двумя точками в юридических текстах: ' + bad); process.exit(1); }

for (const doc of DOCS) {
  for (const lang of ['en', 'ru']) {
    const d = doc[lang];
    const pair = { en: doc.en.file, ru: doc.ru.file };
    const html = `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>CookFusion: ${S.esc(d.title)}</title>
<meta name="description" content="${S.attr(d.desc)}">
<link rel="canonical" href="${BASE}${d.file}">
<link rel="alternate" hreflang="en" href="${BASE}${pair.en}">
<link rel="alternate" hreflang="ru" href="${BASE}${pair.ru}">
<meta name="robots" content="index, follow">
${S.headCommon(lang)}
</head>
<body>

${S.header(lang, { langLinks: pair })}

<main class="page">
  <div class="wrap">
    <a class="crumb" href="${S.UI[lang].home}">${I.back}${BACK[lang]}</a>
    <h1 class="h1">${S.esc(d.title)}</h1>
    <div class="prose legal">
      <p class="updated">${UPDATED[lang]}</p>
      ${d.intro.map(block).join('\n      ')}
${d.sections.map(([h, blocks]) => `      <h2>${h}</h2>\n      ${blocks.map(block).join('\n      ')}`).join('\n')}
    </div>
  </div>
</main>

${S.footer(lang)}

${S.scriptTag()}
</body>
</html>
`;
    fs.writeFileSync(path.join(S.DIR, d.file), html);
    console.log('  ' + d.file + ': ' + d.title);
  }
}
