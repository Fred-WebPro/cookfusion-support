/**
 * Общие части всех страниц сайта: шапка, подвал, кнопка App Store,
 * логотип и иконки. Главная, подборки и юридические страницы берут их
 * отсюда, поэтому выглядят одинаково и не расходятся при правках.
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const DIR = __dirname;
const ROOT = path.join(DIR, '..');
const BASE = 'https://cookfusion.dilami.pro/';
const STORE = 'https://apps.apple.com/app/id6760546998';
const EMAIL = 'web.pro.farid@gmail.com';

// ── Графика из системы бренда ────────────────────────────────
const brandIcon = (name) => fs.readFileSync(path.join(ROOT, 'assets', 'brand', 'icons', name + '.svg'), 'utf8')
  .replace(/<!--[\s\S]*?-->/g, '').replace(/\s*\n\s*/g, '').replace(/ width="24" height="24"/, '')
  .replace('<svg ', '<svg aria-hidden="true" ');

// Недостающие иконки нарисованы по правилам набора: сетка 24, линия 1.9
const own = (paths) => `<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;
const I = {
  scan: brandIcon('scan'), family: brandIcon('family'), allergy: brandIcon('allergy'),
  portions: brandIcon('portions'), plan: brandIcon('plan'), list: brandIcon('list'),
  timer: brandIcon('timer'), diet: brandIcon('diet'), recipe: brandIcon('recipe'),
  profile: brandIcon('profile'), share: brandIcon('share'),
  check: own('<path d="M5 12.5l4.2 4.2L19 7"/>'),
  arrow: own('<path d="M5 12h14"/><path d="M13 6l6 6-6 6"/>'),
  back: own('<path d="M19 12H5"/><path d="M11 6l-6 6 6 6"/>'),
  plus: own('<path d="M12 5v14"/><path d="M5 12h14"/>'),
  lock: own('<rect x="5" y="10.5" width="14" height="10" rx="3"/><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"/>'),
  trash: own('<path d="M4.5 7h15"/><path d="M9.5 7V4.8h5V7"/><path d="M6.5 7l.9 12.2a2 2 0 0 0 2 1.8h5.2a2 2 0 0 0 2-1.8L17.5 7"/>'),
  chat: own('<path d="M5 5.5h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-7l-4.5 3.5v-3.5H5a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2z"/>'),
  mail: own('<rect x="3" y="5.5" width="18" height="13" rx="3"/><path d="M4 7.5l8 5.5 8-5.5"/>'),
};

// Логотип Apple. Символ U+F8FF рисуется только на устройствах Apple, на
// остальных вместо яблока выходил пустой квадрат.
const APPLE = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"><path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/></svg>';

const logo = (() => {
  const raw = fs.readFileSync(path.join(ROOT, 'assets', 'brand', 'logo', 'logo-horizontal.svg'), 'utf8');
  return raw.replace(/<!--[\s\S]*?-->/g, '').replace(/ width="[\d.]+" height="[\d.]+"/, '')
    .replace('<svg ', '<svg role="img" aria-label="CookFusion" ');
})();

// ── Подписи общих частей ─────────────────────────────────────
const UI = {
  en: {
    home: './', nav: [['how', 'How it works'], ['family', 'For families'], ['features', 'Features'], ['faq', 'Questions']],
    navLabel: 'Sections', cta: 'Download free',
    store: { small: 'Download on the', big: 'App Store', aria: 'Download CookFusion on the App Store' },
    foot: {
      tag: 'Dinner for everyone at the table, from one photo. Free on iPhone and iPad.',
      product: 'Product', help: 'Help',
      links: [['how', 'How it works'], ['features', 'Features'], ['faq', 'Questions']],
      help2: [['mailto:' + EMAIL + '?subject=CookFusion%20Support', 'Support'], ['privacy.html', 'Privacy Policy'], ['terms.html', 'Terms of Use'], ['cookies.html', 'Cookie Policy']],
      rights: 'All rights reserved.',
    },
    sticky: ['CookFusion', 'Free on iPhone and iPad'],
  },
  ru: {
    home: 'ru.html', nav: [['how', 'Как это работает'], ['family', 'Для семьи'], ['features', 'Возможности'], ['faq', 'Вопросы']],
    navLabel: 'Разделы', cta: 'Скачать бесплатно',
    store: { small: 'Загрузите в', big: 'App Store', aria: 'Загрузить CookFusion в App Store' },
    foot: {
      tag: 'Ужин на всю семью, за одно фото. Бесплатно для iPhone и iPad.',
      product: 'Приложение', help: 'Помощь',
      links: [['how', 'Как это работает'], ['features', 'Возможности'], ['faq', 'Вопросы']],
      help2: [['mailto:' + EMAIL + '?subject=CookFusion%20%D0%9F%D0%BE%D0%B4%D0%B4%D0%B5%D1%80%D0%B6%D0%BA%D0%B0', 'Поддержка'], ['privacy-ru.html', 'Политика конфиденциальности'], ['terms-ru.html', 'Условия использования'], ['cookies-ru.html', 'Политика cookie']],
      rights: 'Все права защищены.',
    },
    sticky: ['CookFusion', 'Бесплатно для iPhone и iPad'],
  },
};

const strip = (s) => String(s).replace(/<[^>]+>/g, '');
const attr = (s) => strip(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const storeBtn = (lang, cls = '') => {
  const s = UI[lang].store;
  return `<a class="store ${cls}" href="${STORE}" aria-label="${attr(s.aria)}">${APPLE}`
    + `<span><small>${s.small}</small><b>${s.big}</b></span></a>`;
};

/**
 * Шапка. На главной якоря ведут на секции этой же страницы, на
 * внутренних страницах на секции главной нужного языка.
 * langLinks: адреса этой страницы на двух языках, если перевод есть.
 */
function header(lang, o = {}) {
  const u = UI[lang];
  const anchor = (id) => (o.isHome ? '#' + id : u.home + '#' + id);
  const ll = o.langLinks || { en: './', ru: 'ru.html' };
  return `<header class="top" id="top">
  <div class="wrap">
    <a class="logo" href="${u.home}" aria-label="CookFusion">${logo}</a>
    <nav class="nav" aria-label="${u.navLabel}">
      ${u.nav.map(([id, t]) => `<a href="${anchor(id)}">${t}</a>`).join('')}
    </nav>
    <div class="top-right">
      <div class="lang"><a href="${ll.en}" hreflang="en"${lang === 'en' ? ' class="on" aria-current="page"' : ''}>EN</a><a href="${ll.ru}" hreflang="ru"${lang === 'ru' ? ' class="on" aria-current="page"' : ''}>RU</a></div>
      <a class="btn-top" href="${STORE}">${u.cta}</a>
    </div>
  </div>
</header>`;
}

function footer(lang, o = {}) {
  const u = UI[lang], f = u.foot;
  const anchor = (id) => (o.isHome ? '#' + id : u.home + '#' + id);
  return `<footer class="foot">
  <div class="wrap">
    <div class="foot-grid">
      <div><a class="logo" href="${u.home}" aria-label="CookFusion">${logo}</a><p>${f.tag}</p></div>
      <div><h4>${f.product}</h4><ul>${f.links.map(([h, t]) => `<li><a href="${anchor(h)}">${t}</a></li>`).join('')}</ul></div>
      <div><h4>${f.help}</h4><ul>${f.help2.map(([h, t]) => `<li><a href="${h}">${t}</a></li>`).join('')}</ul></div>
    </div>
    <div class="foot-bottom"><span>&copy; <span id="yr">2026</span> CookFusion. ${f.rights}</span><span>cookfusion.dilami.pro</span></div>
  </div>
</footer>

<div class="sticky" id="sticky" aria-hidden="true">
  <div><b>${u.sticky[0]}</b><small>${u.sticky[1]}</small></div>
  ${storeBtn(lang, 'sm')}
</div>`;
}

/** Общие теги в <head>: значки, тема, стили с меткой версии */
const hash = (f) => crypto.createHash('sha1').update(fs.readFileSync(path.join(DIR, f))).digest('hex').slice(0, 8);
function headCommon(lang) {
  return `<meta name="theme-color" content="#F6F3EC">
<meta name="apple-itunes-app" content="app-id=6760546998">
<link rel="icon" href="favicon.svg" type="image/svg+xml">
<link rel="icon" href="favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="apple-touch-icon.png">
${lang === 'en' ? '<link rel="preload" href="fonts/fraunces-normal-700.woff2" as="font" type="font/woff2" crossorigin>\n' : ''}<link rel="stylesheet" href="site.css?v=${hash('site.css')}">
<script>document.documentElement.classList.add('js')</script>`;
}
const scriptTag = () => `<script src="site.js?v=${hash('site.js')}" defer></script>`;

/** Снимок экрана приложения с двумя размерами */
const shot = (name, lang, sizes, alt, o = {}) =>
  `<img src="img/${name}-${lang}-400.webp" srcset="img/${name}-${lang}-400.webp 400w, img/${name}-${lang}-800.webp 800w"`
  + ` sizes="${sizes}" width="400" height="844" alt="${attr(alt)}"`
  + (o.eager ? ' fetchpriority="high"' : ' loading="lazy"') + ' decoding="async">';

// Правила набора бренда: без длинных и средних тире, без е с двумя точками
const BAD = /[—–ёЁ]/;
function checkText(obj, where) {
  let bad = 0;
  const scan = (v, w) => {
    if (typeof v === 'string') { if (BAD.test(v)) { bad++; console.error('нарушение набора', w, v.slice(0, 90)); } }
    else if (v && typeof v === 'object') for (const [k, x] of Object.entries(v)) scan(x, w + '.' + k);
  };
  scan(obj, where);
  return bad;
}

module.exports = {
  DIR, ROOT, BASE, STORE, EMAIL, I, APPLE, logo, brandIcon, UI,
  strip, attr, esc, storeBtn, header, footer, headCommon, scriptTag, shot, checkText, hash,
};
