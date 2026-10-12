/**
 * Собирает посадочные страницы под кластеры семантического ядра.
 *
 * Один шаблон, содержимое отдельно: страниц будет больше, и повторять
 * разметку в каждой — верный способ развести их между собой.
 *
 * Русский и английский набор РАЗНЫЙ, а не перевод друг друга. По данным
 * из seo/core.json спрос устроен по-разному: по-русски спрашивают «что
 * приготовить из X», по-английски — «weekly meal planner». Зеркалить
 * страницы значило бы делать половину из них под несуществующий спрос.
 *
 *   node support-site/build-landings.js
 */
const fs = require('fs');
const path = require('path');

const DIR = __dirname;
const BASE = 'https://cookfusion.dilami.pro/';
const APP = 'https://apps.apple.com/app/id6760546998';

const UI = {
  ru: {
    home: 'Главная', back: 'На главную', install: 'Установить бесплатно',
    free: 'Бесплатно · iPhone и iPad · без подписки',
    also: 'Смотрите также', faqTitle: 'Частые вопросы', read: 'Читать разбор',
    footer: 'CookFusion — ИИ-планировщик питания',
  },
  en: {
    home: 'Home', back: 'Back to home', install: 'Get it free',
    free: 'Free · iPhone and iPad · no subscription',
    also: 'See also', faqTitle: 'Common questions', read: 'Read the guide',
    footer: 'CookFusion — AI Meal Planner',
  },
};

const PAGES = [
  // ── Русские: спрос вокруг «что приготовить из того, что есть» ──
  {
    file: 'iz-togo-chto-est.html', lang: 'ru',
    title: 'Что приготовить из того, что есть дома — подбор по продуктам',
    description: 'Перечислите или сфотографируйте продукты из холодильника, и приложение найдёт рецепты, которые можно приготовить прямо сейчас. Бесплатно, 13 501 рецепт.',
    h1: 'Что приготовить из того, что есть дома',
    lead: 'Откройте холодильник, сфотографируйте полку — CookFusion распознает продукты и покажет, что из них получится. Без похода в магазин и без «а где взять пять недостающих ингредиентов».',
    sections: [
      { h: 'Как это работает', p: [
        'Есть три пути, и все три бесплатны. Сфотографировать полку холодильника — распознавание найдёт продукты само. Перечислить их словами: «курица, рис, лимон». Или ответить на три вопроса — сколько времени есть, на скольких человек и какой приём пищи, — и получить готовую подборку.',
        'В ответ приходят не «похожие рецепты», а те, что действительно собираются из перечисленного. Если чего-то не хватает, это видно сразу, а недостающее одним нажатием уходит в список покупок.',
      ] },
      { h: 'Из фарша, курицы, творога, яиц', p: [
        'Самые частые вопросы у плиты — про конкретный продукт, который надо доесть. В каталоге 13 501 рецепт, у каждого настоящие шаги и граммовки, и поиск по продукту находит не десяток вариантов, а десятки.',
        'Фарш не обязан стать котлетами, творог — сырниками, а вчерашняя курица — салатом. Приложение показывает, что ещё из этого делают, включая кухни, до которых сами вы бы не дошли.',
      ] },
      { h: 'Остатки — это не про бедность', p: [
        'Половина овоща, полпачки сливок, кусок сыра. По отдельности они кажутся мусором, вместе — ужином. Подбор смотрит на то, что есть, а не на то, чего не хватает.',
        'Порции пересчитываются под число едоков: рецепт на шестерых превращается в рецепт на двоих с правильными граммовками, а не делением на глаз.',
      ] },
    ],
    faq: [
      ['Нужно обязательно фотографировать?', 'Нет. Продукты можно просто перечислить словами или ответить на три коротких вопроса — время, число людей, приём пищи.'],
      ['Что если из моих продуктов ничего не собирается?', 'Приложение покажет рецепты, где не хватает одного-двух ингредиентов, и честно скажет каких. Оно не притворяется, что блюдо готово, когда это не так.'],
      ['Учитываются ли аллергии?', 'Да. Вы добавляете каждого за столом с его аллергиями и диетой, и всё конфликтующее отсеивается до того, как вы это увидите.'],
    ],
    links: ['uzhin-bystro.html', 'menu-na-nedelyu.html'],
  },
  {
    file: 'uzhin-bystro.html', lang: 'ru',
    title: 'Что приготовить на ужин быстро — рецепты за 20 минут',
    description: 'Ужин, который реально успеть: рецепты до 20 минут из того, что уже есть дома. Время указано настоящее, а не «примерно».',
    h1: 'Что приготовить на ужин быстро',
    lead: 'Семь вечера, все голодные, идей нет. Отфильтруйте по времени — приложение покажет только то, что действительно успеете, и посчитает порции на всех.',
    sections: [
      { h: 'Время в рецептах настоящее', p: [
        'В большинстве каталогов время написано автором на глаз, и «15 минут» превращаются в сорок. У нас оно вычислено из самих шагов: сумма всех указанных в них длительностей. Если в рецепте написано «тушить 25 минут», рецепт не может занимать двадцать.',
        'Отдельно есть проверенное время: работники готовят блюда по-настоящему и замеряют секундомером, после чего в рецепте стоит их цифра, а не расчётная.',
      ] },
      { h: 'Быстро — не значит бедно', p: [
        'Фильтр по времени работает вместе со всем остальным: кухней, приёмом пищи, аллергиями, числом людей. «Двадцать минут, на четверых, без глютена, что-нибудь азиатское» — нормальный запрос, а не невыполнимый.',
        'Полка «Готово за 20 минут» на главной обновляется каждый день, так что одно и то же не повторяется неделями.',
      ] },
    ],
    faq: [
      ['Откуда берётся время приготовления?', 'Оно вычислено из шагов рецепта — суммой указанных в них длительностей. У части рецептов стоит замеренное время: их готовили и засекали.'],
      ['Можно фильтровать сразу по нескольким условиям?', 'Да: время, приём пищи, кухня, сложность, число порций и аллергии работают вместе.'],
    ],
    links: ['iz-togo-chto-est.html', 'menu-na-nedelyu.html'],
  },
  {
    file: 'menu-na-nedelyu.html', lang: 'ru',
    title: 'Меню на неделю для семьи — планировщик питания',
    description: 'Завтрак, обед и ужин на две недели вперёд, с учётом аллергий каждого и списком покупок, который собирается сам. Бесплатно.',
    h1: 'Меню на неделю для семьи',
    lead: 'Планировщик на четырнадцать дней: расставьте блюда по дням, а список покупок соберётся сам — по отделам магазина и в нужных количествах.',
    sections: [
      { h: 'На всех сразу, а не на среднего человека', p: [
        'Вы добавляете каждого за столом: возраст, аллергии, диету, нелюбимые продукты. Дальше меню строится так, чтобы каждое блюдо подходило всем — а не так, чтобы кто-то ел отдельно.',
        'Порции считаются по составу семьи. Взрослый, подросток и ребёнок едят по-разному, и приложение это учитывает, а не умножает одну порцию на количество голов.',
      ] },
      { h: 'Список покупок собирается сам', p: [
        'Всё, чего не хватает для запланированных блюд, попадает в один список, разложенный по отделам магазина. Одинаковые продукты складываются: лук из трёх рецептов — это одна строчка, а не три.',
        'Список живёт в вашем аккаунте, а не в конкретном телефоне, и не теряется между устройствами.',
      ] },
      { h: 'Если планировать некогда', p: [
        'Кнопка «заполнить неделю» расставит блюда на семь дней сама, соблюдая аллергии и разнообразие. Дальше можно менять что угодно — это черновик, а не приговор.',
      ] },
    ],
    faq: [
      ['На сколько дней вперёд планируется?', 'На четырнадцать. Можно смотреть по дням или всю неделю целиком.'],
      ['Что если у детей и взрослых разные ограничения?', 'Каждый человек заводится отдельно со своими аллергиями и диетой. Меню подбирается так, чтобы подходило всем сразу.'],
      ['Список покупок нужно вести вручную?', 'Нет. Он собирается из запланированных блюд, раскладывается по отделам магазина и складывает одинаковые продукты в одну строку.'],
    ],
    links: ['iz-togo-chto-est.html', 'uzhin-bystro.html'],
  },

  // ── Английские: спрос вокруг планирования ──
  {
    file: 'meal-planner.html', lang: 'en',
    title: 'Free Weekly Meal Planner App for Families — CookFusion',
    description: 'Plan two weeks of breakfasts, lunches and dinners around every diet and allergy at your table. The grocery list writes itself. Free, no subscription.',
    h1: 'A weekly meal planner that knows who is eating',
    lead: 'Fourteen days of breakfasts, lunches and dinners, planned around the actual people at your table — then a grocery list that builds itself from what you planned.',
    sections: [
      { h: 'Built around your table, not an average person', p: [
        'You add each person: their age, their allergies, their diet, the things they will not touch. Meals are then chosen so one dish works for everyone, rather than someone eating separately.',
        'Portions follow who is eating. An adult, a teenager and a small child do not eat the same amount, and the planner accounts for that instead of multiplying one serving by the number of heads.',
      ] },
      { h: 'The grocery list writes itself', p: [
        'Everything missing for the week lands in one list, sorted by supermarket aisle. Repeats merge: onion from three recipes is one line, not three.',
        'The list lives in your account rather than on one phone, so it survives switching devices.',
      ] },
      { h: 'When there is no time to plan', p: [
        'One tap fills a whole week, respecting allergies and keeping the meals varied. Everything stays editable afterwards — it is a draft, not a verdict.',
      ] },
    ],
    faq: [
      ['How far ahead can I plan?', 'Fourteen days. You can view it day by day or a whole week at once.'],
      ['Does it handle different diets in one household?', 'Yes. Each person is added separately with their own allergies and diet, and meals are chosen to work for everyone at once.'],
      ['Is the meal planner free?', 'Yes, along with everything else in the app. No subscription and no paywall.'],
    ],
    links: ['cook-with-what-you-have.html', 'dinner-tonight.html'],
  },
  {
    file: 'cook-with-what-you-have.html', lang: 'en',
    title: 'What Can I Cook With What I Have? Photograph Your Fridge',
    description: 'Photograph your fridge or list what is in it, and get recipes you can cook right now from 13,501 with real steps and amounts. Free iPhone app.',
    h1: 'What can I cook with what I have?',
    lead: 'Point the camera at a shelf. CookFusion recognises what is there and shows what it makes — no shopping trip, no hunting for five missing ingredients.',
    sections: [
      { h: 'Three ways in, all free', p: [
        'Photograph the shelf and let the vision model find the ingredients. Or type them: chicken, rice, a lemon. Or answer three questions — how long you have, how many people, which meal — and take the shortlist.',
        'What comes back is not "similar recipes" but ones that genuinely build from what you listed. Where something is missing, it says so, and one tap sends it to the shopping list.',
      ] },
      { h: 'Leftovers are not a lesser meal', p: [
        'Half a vegetable, the end of a carton of cream, a piece of cheese. Separately they read as waste; together they are dinner. The matching looks at what is there rather than what is absent.',
        'Portions rescale to the number of people eating, with proper amounts rather than dividing by eye.',
      ] },
    ],
    faq: [
      ['Do I have to take a photo?', 'No. You can type the ingredients instead, or answer three short questions about time, people and meal.'],
      ['What if nothing matches what I have?', 'It shows recipes missing one or two ingredients and names them. It does not pretend a dish is ready when it is not.'],
      ['Does it respect allergies?', 'Yes. Everyone at your table is added with their own allergies, and anything clashing is filtered out before you see it.'],
    ],
    links: ['meal-planner.html', 'dinner-tonight.html'],
  },
  {
    file: 'dinner-tonight.html', lang: 'en',
    title: 'What to Make for Dinner Tonight — Recipes in 20 Minutes',
    description: 'Dinner you can actually finish tonight: recipes under 20 minutes from what is already in your kitchen, with cooking times worked out from the steps.',
    h1: 'What to make for dinner tonight',
    lead: 'Seven in the evening, everyone hungry, no ideas. Filter by time and see only what you will genuinely finish, scaled to everyone eating.',
    sections: [
      { h: 'The times are real', p: [
        'In most catalogues cooking time is whatever the author guessed, and fifteen minutes becomes forty. Here it is worked out from the steps themselves — the durations written inside them, added up. A recipe that says "simmer for 25 minutes" cannot claim to take twenty.',
        'Some recipes carry a measured time instead: someone cooked the dish and timed it, and that number replaces the calculated one.',
      ] },
      { h: 'Quick does not mean thin', p: [
        'The time filter works alongside everything else: cuisine, meal, allergies, number of people. "Twenty minutes, four people, gluten free, something Asian" is an ordinary request here.',
        'The Ready in 20 minutes shelf refreshes daily, so the same six dishes do not follow you around for a week.',
      ] },
    ],
    faq: [
      ['Where does the cooking time come from?', 'From the recipe steps — the durations mentioned in them, added together. Some recipes carry a time measured by someone who actually cooked and timed the dish.'],
      ['Can I combine filters?', 'Yes. Time, meal, cuisine, difficulty, servings and allergies all apply together.'],
    ],
    links: ['cook-with-what-you-have.html', 'meal-planner.html'],
  },
];

// Шапка, подвал, кнопки и счетчик посещений общие для всего сайта.
// Счетчик живет в site.js: раньше его вырезали из index.html по
// комментарию, и после переделки главной подборки молча остались бы
// без статистики.
const S = require('./site-chrome');
const { I } = S;

// ── Шаблон ───────────────────────────────────────────────────
const esc = (s) => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

// Какой экран приложения показать рядом с текстом подборки
const SCREEN = {
  'iz-togo-chto-est.html': '1-scan', 'cook-with-what-you-have.html': '1-scan',
  'menu-na-nedelyu.html': '4-plan', 'meal-planner.html': '4-plan',
  'uzhin-bystro.html': '2-feed', 'dinner-tonight.html': '2-feed',
};
const LW = {
  ru: { side: 'Попробуйте на своем холодильнике', sideText: 'Бесплатно, без подписки и рекламы. Первый рецепт до регистрации.',
        final: 'Сегодняшний ужин уже в вашем холодильнике', finalLead: 'Скачайте CookFusion бесплатно и добавьте семью один раз.' },
  en: { side: 'Try it on your own fridge', sideText: 'Free, no subscription and no ads.',
        final: 'Tonight’s dinner is already in your fridge.', finalLead: 'Download CookFusion free and add your family once.' },
};

function render(page) {
  const ui = UI[page.lang];
  const lw = LW[page.lang];
  const home = page.lang === 'ru' ? 'ru.html' : './';
  const titleOf = (f) => (PAGES.find(p => p.file === f) || {}).h1 || f;
  const leadOf = (f) => (PAGES.find(p => p.file === f) || {}).lead || '';
  const screen = SCREEN[page.file] || '1-scan';

  const faqLd = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: page.faq.map(([q, a]) => ({
      '@type': 'Question', name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
  const crumbLd = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: ui.home, item: BASE + (page.lang === 'ru' ? 'ru.html' : '') },
      { '@type': 'ListItem', position: 2, name: page.h1, item: BASE + page.file },
    ],
  };

  return `<!DOCTYPE html>
<html lang="${page.lang}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(page.title)}</title>
<meta name="description" content="${esc(page.description)}">
<link rel="canonical" href="${BASE}${page.file}">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta property="og:type" content="article">
<meta property="og:url" content="${BASE}${page.file}">
<meta property="og:site_name" content="CookFusion">
<meta property="og:title" content="${esc(page.title)}">
<meta property="og:description" content="${esc(page.description)}">
<meta property="og:image" content="${BASE}img/og-${page.lang}.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="${page.lang === 'ru' ? 'ru_RU' : 'en_US'}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="${BASE}img/og-${page.lang}.jpg">
${S.headCommon(page.lang)}
<script type="application/ld+json">${JSON.stringify(faqLd)}</script>
<script type="application/ld+json">${JSON.stringify(crumbLd)}</script>
</head>
<body>

${S.header(page.lang)}

<main>
<section class="hero land-hero">
  <div class="wrap hero-grid">
    <div>
      <a class="crumb rise" href="${home}">${I.back}${esc(ui.back)}</a>
      <h1 class="h1 rise d1">${esc(page.h1)}</h1>
      <p class="lead rise d2">${esc(page.lead)}</p>
      <div class="cta-row rise d3" id="hero-cta">
        ${S.storeBtn(page.lang)}
        <span class="note">${esc(ui.free)}</span>
      </div>
    </div>
    <div class="land-phone rise d2"><div class="phone">${S.shot(screen, page.lang, '(min-width: 1024px) 300px, 60vw', page.h1, { eager: true })}</div></div>
  </div>
</section>

<section class="sec land-body" style="padding-top:24px">
  <div class="wrap land-grid">
    <article class="prose">
${page.sections.map(s => `      <h2>${esc(s.h)}</h2>\n` + s.p.map(x => `      <p>${esc(x)}</p>`).join('\n')).join('\n\n')}

      <h2>${esc(ui.faqTitle)}</h2>
      <div class="land-faq">
${page.faq.map(([q, a], i) => `        <details class="qa"${i === 0 ? ' open' : ''}><summary>${esc(q)}<i>${I.plus}</i></summary><p>${esc(a)}</p></details>`).join('\n')}
      </div>
    </article>
    <aside class="land-side">
      <div class="side-card">
        <b>${lw.side}</b><span>${lw.sideText}</span>
        ${S.storeBtn(page.lang, 'sm')}
      </div>
    </aside>
  </div>
</section>

<section class="sec" style="padding-top:0">
  <div class="wrap">
    <h2 class="h3 also-title">${esc(ui.also)}</h2>
    <div class="guides">
${page.links.map(l => `      <a class="guide" href="${l}"><div><b>${esc(titleOf(l))}</b><span>${esc(leadOf(l))}</span></div><i>${esc(ui.read)}${I.arrow}</i></a>`).join('\n')}
    </div>
  </div>
</section>

<section class="sec" style="padding-top:0" id="download">
  <div class="wrap">
    <div class="final on-dark">
      <div class="final-body">
        <h2 class="h2">${lw.final}</h2>
        <p class="lead">${lw.finalLead}</p>
        <div class="final-cta">${S.storeBtn(page.lang)}</div>
      </div>
      <div class="final-img"><img src="img/bowl-900.webp" width="900" height="600" alt="" loading="lazy" decoding="async"></div>
    </div>
  </div>
</section>
</main>

${S.footer(page.lang)}

${S.scriptTag()}
</body>
</html>
`;
}

let written = 0;
for (const page of PAGES) {
  const html = render(page);
  // Ссылка на несуществующую страницу — битая ссылка в глазах поисковика
  for (const l of page.links) {
    if (!PAGES.some(p => p.file === l)) throw new Error(`${page.file} ссылается на ${l}, которой нет`);
  }
  fs.writeFileSync(path.join(DIR, page.file), html);
  written++;
}

// Карта сайта: главные страницы плюс все посадочные
const urls = [
  { loc: BASE, alt: true, pri: '1.0' },
  { loc: BASE + 'ru.html', alt: true, pri: '1.0' },
  ...PAGES.map(p => ({ loc: BASE + p.file, pri: '0.8' })),
  // Юридические страницы на двух языках
  ...['privacy', 'terms', 'cookies'].flatMap((n) => [
    { loc: BASE + n + '.html', pri: '0.3' },
    { loc: BASE + n + '-ru.html', pri: '0.3' },
  ]),
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.map(u => `  <url>
    <loc>${u.loc}</loc>${u.alt ? `
    <xhtml:link rel="alternate" hreflang="en" href="${BASE}"/>
    <xhtml:link rel="alternate" hreflang="ru" href="${BASE}ru.html"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE}"/>` : ''}
    <changefreq>weekly</changefreq>
    <priority>${u.pri}</priority>
  </url>`).join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(DIR, 'sitemap.xml'), sitemap);

console.log(`страниц собрано: ${written} (${PAGES.filter(p => p.lang === 'ru').length} ru, ${PAGES.filter(p => p.lang === 'en').length} en)`);
console.log(`sitemap.xml: ${urls.length} адресов`);
