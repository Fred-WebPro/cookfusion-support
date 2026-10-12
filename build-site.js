/**
 * Собирает главную страницу сайта на двух языках из одного шаблона.
 *   node support-site/build-site.js
 *
 * Раньше ru.html получалась из index.html заменой строк по словарю.
 * Это ломалось при каждой правке разметки: на русской странице
 * оставались английские фразы. Теперь разметка одна, а текст приходит
 * словарем на каждый язык, и разъехаться им не во что.
 *
 * Правила текста: каждое утверждение проверено по коду приложения, без
 * длинных тире и без буквы е с двумя точками.
 */
const fs = require('fs');
const path = require('path');
const S = require('./site-chrome');
const { DIR, BASE, STORE, EMAIL, I, brandIcon } = S;

// QR на страницу в App Store. Кодировщик берется из зависимостей
// проекта, модули квадратные: скругленные хуже читаются камерой.
const qr = (() => {
  const QRCode = require('qrcode-terminal/vendor/QRCode');
  const L = require('qrcode-terminal/vendor/QRCode/QRErrorCorrectLevel');
  const q = new QRCode(-1, L.M);
  q.addData(STORE); q.make();
  const n = q.getModuleCount(), pad = 2;
  let d = '';
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) {
    if (q.isDark(r, c)) d += `M${c + pad} ${r + pad}h1v1h-1z`;
  }
  return `<svg aria-hidden="true" viewBox="0 0 ${n + pad * 2} ${n + pad * 2}" shape-rendering="crispEdges"><path d="${d}" fill="#14261B"/></svg>`;
})();

// ── Тексты ───────────────────────────────────────────────────
const C = {
  en: {
    lang: 'en', file: 'index.html', url: BASE, other: 'ru.html', locale: 'en_US', altLocale: 'ru_RU',
    title: 'CookFusion: Photograph Your Fridge, Get a Family Dinner | Free AI Meal Planner',
    desc: 'Free iPhone and iPad app. Photograph your fridge and get a recipe from what you already have, with every diet and allergy at your table filtered out. 13,501 recipes, a 14-day planner and a shopping list that writes itself.',
    ogTitle: 'CookFusion: dinner for everyone at the table, from one photo',
    ogDesc: 'Photograph your fridge. Get a recipe that suits every diet and allergy in your family. Free on iPhone and iPad.',
    ogAlt: 'CookFusion app on iPhone: fridge scanner and family profiles',
    hero: {
      h1: 'Dinner for everyone at the table. <em>From one photo.</em>',
      lead: 'Photograph your fridge. CookFusion turns what you already have into dinner and quietly removes anything someone at your table can’t eat.',
      more: 'See how it works',
      facts: 'Free on iPhone and iPad. 13,501 recipes, no ads, no subscription.',
      f1: ['6 ingredients found', 'Eggs, spinach, parmesan, garlic'],
      f2: ['No peanuts for Alina', 'Removed before you see it'],
      f3: ['Suits all 4 at the table', 'Miso butter chicken, 55 min'],
      altMain: 'CookFusion fridge scanner recognising ingredients',
      altBack: 'CookFusion home screen with a recipe for tonight',
    },
    stats: [
      ['13,501', 'recipes, every one with steps and amounts'],
      ['14 days', 'of breakfasts, lunches and dinners planned ahead'],
      ['0', 'ads, trackers and data brokers'],
      ['2', 'languages: English and Russian'],
    ],
    table: {
      kicker: 'Made for families',
      h2: 'Four people. Three restrictions. One dinner.',
      lead: 'Most recipe apps cook for one person. CookFusion cooks for the whole table: add everyone once, and every recipe is checked against every plate before it reaches you.',
      points: [
        ['family', 'A profile for each person', 'Diet, allergies, dislikes and portion size. Set it once and it works every time.'],
        ['allergy', 'Removed, not flagged', 'A dish with a banned ingredient disappears from the results. No warnings to read, no silent substitutions.'],
        ['portions', 'Portions that fit', 'Amounts scale to the number of people eating, so the shopping list is right too.'],
      ],
      tags: ['No seafood for Timur', 'No peanuts for Alina', 'Suits everyone'],
      alt: 'CookFusion family screen with four people and their restrictions',
    },
    how: {
      kicker: 'How it works',
      h2: 'From fridge to dinner in three steps',
      steps: [
        ['1-scan', 'Snap', 'Point the camera at an open fridge or a shelf. The app recognises what is there, and you can correct the list.'],
        ['2-feed', 'Pick', 'See only dishes that suit everyone and can be made from what you have. Ingredients are shown before you start.'],
        ['6-cook', 'Cook', 'Large, clear steps with timers. The screen stays on, and anything missing is already on your list.'],
      ],
    },
    feat: {
      kicker: 'Everything in one app',
      h2: 'A whole kitchen, not another recipe list',
      lead: 'Planning, shopping and cooking live in one place, so dinner stops being a daily decision.',
      plan: ['Two weeks planned ahead', 'Breakfast, lunch and dinner for 14 days, built around your table and synced across your devices.'],
      chef: ['A chef who answers', 'Substitutions, techniques, what to do with leftover rice. Ask in plain words, get an answer in seconds.'],
      chat: ['I only have chicken, rice and a sad lemon', 'That’s a lemon garlic chicken bowl. Want the 25 minute recipe?'],
      score: ['Know what is in the package', 'Scan a packaged product and get an honest A to E score with the reasons: sugar, additives and the rest.'],
      list: ['A list that writes itself', 'Missing ingredients go straight to a list sorted by aisle and scaled to your portions.'],
      cook: ['Hands-free cooking', 'Large steps, built-in timers and a screen that never sleeps.'],
      auth: ['Recipes from real cooks', 'Anyone can become an author, publish under their own name and get a public page to share.'],
      authCard: ['Your name', 'Public author page'],
      altPlan: 'CookFusion weekly meal plan', altList: 'CookFusion shopping list sorted by aisle',
    },
    priv: {
      kicker: 'Privacy',
      h2: 'Your kitchen. Your data.',
      lead: 'We built CookFusion the way we would want an app to treat our own family’s data.',
      items: [
        ['lock', 'Photos stay yours', 'Fridge photos are used only to recognise ingredients. Never for advertising, never sold.'],
        ['allergy', 'No tracking, no ads', 'No ad networks, no cross-app tracking, no data brokers. The app does one thing: helps you cook.'],
        ['trash', 'Delete everything, any time', 'One tap in Settings permanently removes your account and all its data. Details in our <a href="privacy.html">Privacy Policy</a>.'],
      ],
    },
    guides: {
      kicker: 'Guides',
      h2: 'Answers to the usual dinner questions',
      open: 'Read the guide',
      items: [
        ['cook-with-what-you-have.html', 'What can I cook with what I have?', 'Photograph the shelf or type what is there. No shopping trip.'],
        ['meal-planner.html', 'A weekly meal planner for families', 'Fourteen days around every diet at your table, grocery list included.'],
        ['dinner-tonight.html', 'What to make for dinner tonight', 'Under twenty minutes, with cooking times that are actually true.'],
      ],
    },
    faq: {
      kicker: 'Questions',
      h2: 'Straight answers',
      lead: 'Didn’t find yours? Write to us, we reply within a day.',
      groups: [
        ['About the app', [
          ['Is CookFusion really free?', 'Yes. Every feature on this page works without paying: the fridge scanner, the AI chef, the planner and the shopping list. There is no subscription, no paywall and no advertising in the app.'],
          ['Do I have to photograph my fridge?', 'No. The photo is one way in. You can also search 13,501 recipes, browse by cuisine, answer three questions and let the app pick, or ask the AI chef in plain words.'],
          ['How does it handle allergies?', 'You add each person at your table with their own allergies, diet and dislikes. Anything that clashes is removed before you see it, not flagged afterwards. Portions scale to the number of people eating.'],
          ['What happens to my fridge photos?', 'They are sent for ingredient recognition and nothing else. Not used for advertising, not sold, not shared with third parties for their own purposes. You can delete your account and everything in it from inside the app.'],
          ['Which devices does it work on?', 'iPhone and iPad running iOS 15.1 or later. An Android version is not available yet.'],
          ['Can I publish my own recipes?', 'Yes. Anyone can become an author, publish recipes under their own name and get a public page to share.'],
        ]],
        ['Support', [
          ['How do I reset my password?', 'In the app open Settings, then Account, then Change Password, and we will email you a secure link. If you can’t sign in, tap “Forgot password?” on the login screen and you will get a 6-digit code by email.'],
          ['How do I delete my account?', 'In the app open Settings, then Account, then Delete Account. Your account and all associated data are removed permanently. You can also email us and we will delete it for you.'],
          ['The app isn’t working correctly. What should I do?', 'Make sure you have the latest version and an internet connection. If the problem persists, email us with your device model and what happened. We usually reply within 24 hours.'],
        ]],
      ],
      help: ['Still need help?', EMAIL + ' · we reply within 24 hours', 'Email support'],
    },
    final: {
      h2: 'Tonight’s dinner is already in your fridge.',
      lead: 'Download CookFusion free, add your family once and let the app take the daily question off your hands.',
      qr: 'Point your phone camera here to open the App Store',
      alt: 'A bowl of pasta on a kitchen table',
    },
    schema: {
      name: 'CookFusion: AI Meal Planner',
      desc: 'Photograph your fridge and get a recipe from what you already have. Meal planning for the whole family with every diet and allergy respected.',
      features: ['Fridge photo to recipe', '13,501 recipes', '14-day meal planner', 'Per-person allergies and diets',
                 'AI chef chat', 'Packaged product A to E score', 'Shopping list sorted by aisle', 'Hands-free cooking mode'],
    },
  },

  ru: {
    lang: 'ru', file: 'ru.html', url: BASE + 'ru.html', other: './', locale: 'ru_RU', altLocale: 'en_US',
    title: 'CookFusion: ужин на всю семью по фото холодильника | Бесплатный планировщик питания',
    desc: 'Бесплатное приложение для iPhone и iPad. Сфотографируйте холодильник и получите рецепт из того, что уже есть, с учетом диет и аллергий каждого за столом. 13 501 рецепт, план на 14 дней и список покупок, который составляется сам.',
    ogTitle: 'CookFusion: ужин на всю семью, за одно фото',
    ogDesc: 'Сфотографируйте холодильник и получите рецепт, который подойдет всем за столом. Бесплатно для iPhone и iPad.',
    ogAlt: 'Приложение CookFusion на iPhone: сканер холодильника и профили семьи',
    hero: {
      h1: 'Ужин на всю семью, <em>за одно фото</em>',
      lead: 'Сфотографируйте холодильник. CookFusion подберет блюдо из того, что уже есть дома, и уберет все, что кому-то за столом нельзя.',
      more: 'Как это работает',
      facts: 'Бесплатно для iPhone и iPad. 13 501 рецепт, без рекламы и подписки.',
      f1: ['Нашли 6 продуктов', 'Яйца, шпинат, пармезан, чеснок'],
      f2: ['Без арахиса для Алины', 'Убрано до того, как вы увидели'],
      f3: ['Подходит всем четверым', 'Курица в мисо-масле, 55 мин'],
      altMain: 'Сканер холодильника CookFusion распознает продукты',
      altBack: 'Главный экран CookFusion с рецептом на вечер',
    },
    stats: [
      ['13 501', 'рецепт, у каждого шаги и граммовки'],
      ['14 дней', 'завтраков, обедов и ужинов наперед'],
      ['0', 'рекламы, трекеров и продажи данных'],
      ['2', 'языка: русский и английский'],
    ],
    table: {
      kicker: 'Для семьи',
      h2: 'Четыре человека. Три ограничения. Один ужин.',
      lead: 'Большинство приложений с рецептами готовят для одного. CookFusion готовит для всего стола: заведите всех один раз, и каждый рецепт проверяется по каждой тарелке еще до того, как вы его увидите.',
      points: [
        ['family', 'Профиль на каждого', 'Диета, аллергии, нелюбимые продукты и размер порции. Заполняется один раз и работает всегда.'],
        ['allergy', 'Убрано, а не помечено', 'Блюдо с запрещенным продуктом исчезает из выдачи. Никаких предупреждений и тихих замен.'],
        ['portions', 'Порции по числу едоков', 'Количества пересчитываются под всех, кто сядет за стол, поэтому и список покупок точный.'],
      ],
      tags: ['Тимуру без морепродуктов', 'Алине без арахиса', 'Подходит всем'],
      alt: 'Экран семьи в CookFusion: четыре человека и их ограничения',
    },
    how: {
      kicker: 'Как это работает',
      h2: 'От холодильника до ужина за три шага',
      steps: [
        ['1-scan', 'Снимите', 'Наведите камеру на открытый холодильник или полку. Приложение распознает продукты, список можно поправить.'],
        ['2-feed', 'Выберите', 'Только блюда, которые подходят всем и готовятся из того, что есть. Состав виден до начала готовки.'],
        ['6-cook', 'Готовьте', 'Крупные понятные шаги с таймерами. Экран не гаснет, а недостающее уже в списке покупок.'],
      ],
    },
    feat: {
      kicker: 'Все в одном приложении',
      h2: 'Целая кухня, а не сборник рецептов',
      lead: 'План, покупки и готовка в одном месте, и ужин перестает быть ежедневной задачей.',
      plan: ['План на две недели', 'Завтрак, обед и ужин на 14 дней вперед с учетом всех за столом. Синхронизируется между устройствами.'],
      chef: ['Повар, который отвечает', 'Чем заменить, как приготовить, что сделать с остатками риса. Спросите своими словами, ответ через секунды.'],
      chat: ['Есть только курица, рис и грустный лимон', 'Получится курица с лимоном и чесноком на рисе. Показать рецепт на 25 минут?'],
      score: ['Что внутри упаковки', 'Отсканируйте продукт в упаковке и получите честную оценку от A до E с объяснением: сахар, добавки и остальное.'],
      list: ['Список покупок пишется сам', 'Недостающие продукты сразу попадают в список, разложенный по отделам магазина и пересчитанный под порции.'],
      cook: ['Готовка без рук', 'Крупные шаги, встроенные таймеры и экран, который не гаснет.'],
      auth: ['Рецепты настоящих поваров', 'Любой может стать автором, публиковать рецепты под своим именем и получить свою страницу.'],
      authCard: ['Ваше имя', 'Публичная страница автора'],
      altPlan: 'План питания на неделю в CookFusion', altList: 'Список покупок в CookFusion по отделам магазина',
    },
    priv: {
      kicker: 'Приватность',
      h2: 'Ваша кухня. Ваши данные.',
      lead: 'Мы сделали CookFusion так, как хотели бы, чтобы приложение обращалось с данными нашей собственной семьи.',
      items: [
        ['lock', 'Фото остаются вашими', 'Снимки холодильника нужны только чтобы распознать продукты. Не для рекламы и не на продажу.'],
        ['allergy', 'Без слежки и рекламы', 'Никаких рекламных сетей, отслеживания между приложениями и продажи данных. Приложение делает одно: помогает готовить.'],
        ['trash', 'Удалить все в любой момент', 'Одно нажатие в настройках навсегда удаляет аккаунт и все данные. Подробнее в <a href="privacy-ru.html">политике конфиденциальности</a>.'],
      ],
    },
    guides: {
      kicker: 'Разборы',
      h2: 'Ответы на обычные вопросы про ужин',
      open: 'Читать разбор',
      items: [
        ['iz-togo-chto-est.html', 'Что приготовить из того, что есть дома', 'Сфотографируйте полку или перечислите продукты. Без похода в магазин.'],
        ['menu-na-nedelyu.html', 'Меню на неделю для семьи', 'Четырнадцать дней с учетом аллергий каждого и списком покупок.'],
        ['uzhin-bystro.html', 'Что приготовить на ужин быстро', 'За двадцать минут, и время в рецептах настоящее.'],
      ],
    },
    faq: {
      kicker: 'Вопросы',
      h2: 'Прямые ответы',
      lead: 'Не нашли свой вопрос? Напишите нам, отвечаем в течение суток.',
      groups: [
        ['О приложении', [
          ['CookFusion правда бесплатный?', 'Да. Все, что описано на этой странице, работает без оплаты: сканер холодильника, ИИ-повар, планировщик и список покупок. Подписки, платного доступа и рекламы в приложении нет.'],
          ['Обязательно фотографировать холодильник?', 'Нет. Фото только один из способов. Можно искать среди 13 501 рецепта, выбирать по кухне, ответить на три вопроса и дать приложению выбрать или просто спросить ИИ-повара своими словами.'],
          ['Как учитываются аллергии?', 'Вы добавляете каждого, кто садится за стол, с его аллергиями, диетой и нелюбимыми продуктами. Все, что не подходит, убирается еще до показа, а не помечается потом. Порции пересчитываются под число едоков.'],
          ['Что происходит с фото холодильника?', 'Они отправляются только на распознавание продуктов. Не используются для рекламы, не продаются и не передаются третьим лицам для их целей. Аккаунт и все данные можно удалить прямо в приложении.'],
          ['На каких устройствах работает?', 'iPhone и iPad с iOS 15.1 и новее. Версии для Android пока нет.'],
          ['Можно публиковать свои рецепты?', 'Да. Любой может стать автором, публиковать рецепты под своим именем и получить публичную страницу, которой можно поделиться.'],
        ]],
        ['Поддержка', [
          ['Как сбросить пароль?', 'В приложении откройте Настройки, затем Аккаунт и Сменить пароль, и мы пришлем на почту защищенную ссылку. Если войти не получается, нажмите «Забыли пароль?» на экране входа, и на почту придет код из 6 цифр.'],
          ['Как удалить аккаунт?', 'В приложении откройте Настройки, затем Аккаунт и Удалить аккаунт. Аккаунт и все связанные данные удаляются навсегда. Можно также написать нам, и мы удалим его сами.'],
          ['Приложение работает неправильно. Что делать?', 'Проверьте, что установлена последняя версия и есть интернет. Если не помогло, напишите нам, укажите модель устройства и что произошло. Обычно отвечаем в течение суток.'],
        ]],
      ],
      help: ['Нужна помощь?', EMAIL + ' · отвечаем в течение суток', 'Написать в поддержку'],
    },
    final: {
      h2: 'Сегодняшний ужин уже в вашем холодильнике',
      lead: 'Скачайте CookFusion бесплатно, добавьте семью один раз, и вопрос «что приготовить» приложение возьмет на себя.',
      qr: 'Наведите камеру телефона, чтобы открыть App Store',
      alt: 'Тарелка пасты на кухонном столе',
    },
    schema: {
      name: 'CookFusion: планировщик питания',
      desc: 'Сфотографируйте холодильник и получите рецепт из того, что уже есть. Планирование питания на всю семью с учетом диет и аллергий каждого.',
      features: ['Рецепт по фото холодильника', '13 501 рецепт', 'План питания на 14 дней', 'Аллергии и диеты для каждого',
                 'Чат с ИИ-поваром', 'Оценка продуктов от A до E', 'Список покупок по отделам', 'Режим готовки без рук'],
    },
  },
};

// ── Кусочки разметки ─────────────────────────────────────────
const { strip, attr } = S;
const shot = (name, L, sizes, alt, o) => S.shot(name, L.lang, sizes, alt, o);
const storeBtn = (L, cls) => S.storeBtn(L.lang, cls);

const AV = [['Ф', '#7A9A75'], ['Т', '#5B8C5A'], ['А', '#E89D5E'], ['М', '#8E7AB5']];
const AV_EN = [['F', '#7A9A75'], ['T', '#5B8C5A'], ['A', '#E89D5E'], ['M', '#8E7AB5']];

function page(L) {
  const H = L.hero, T = L.table, F = L.feat;
  const avatars = (L.lang === 'ru' ? AV : AV_EN)
    .map(([c, bg]) => `<span style="background:${bg}">${c}</span>`).join('');

  const schemaApp = {
    '@context': 'https://schema.org', '@type': 'SoftwareApplication',
    name: L.schema.name, operatingSystem: 'iOS 15.1+', applicationCategory: 'LifestyleApplication',
    url: STORE, description: L.schema.desc, inLanguage: L.lang,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    featureList: L.schema.features, image: BASE + `img/og-${L.lang}.jpg`,
  };
  const schemaFaq = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: L.faq.groups.flatMap(([, items]) => items).map(([q, a]) => ({
      '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: strip(a) },
    })),
  };

  return `<!DOCTYPE html>
<html lang="${L.lang}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${L.title}</title>
<meta name="description" content="${attr(L.desc)}">
<link rel="canonical" href="${L.url}">
<link rel="alternate" hreflang="en" href="${BASE}">
<link rel="alternate" hreflang="ru" href="${BASE}ru.html">
<link rel="alternate" hreflang="x-default" href="${BASE}">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta property="og:type" content="website">
<meta property="og:url" content="${L.url}">
<meta property="og:site_name" content="CookFusion">
<meta property="og:title" content="${attr(L.ogTitle)}">
<meta property="og:description" content="${attr(L.ogDesc)}">
<meta property="og:image" content="${BASE}img/og-${L.lang}.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${attr(L.ogAlt)}">
<meta property="og:locale" content="${L.locale}">
<meta property="og:locale:alternate" content="${L.altLocale}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${attr(L.ogTitle)}">
<meta name="twitter:description" content="${attr(L.ogDesc)}">
<meta name="twitter:image" content="${BASE}img/og-${L.lang}.jpg">
<link rel="preload" as="image" href="img/1-scan-${L.lang}-800.webp" imagesrcset="img/1-scan-${L.lang}-400.webp 400w, img/1-scan-${L.lang}-800.webp 800w" imagesizes="(min-width: 1024px) 320px, 56vw">
${S.headCommon(L.lang)}
<script type="application/ld+json">${JSON.stringify(schemaApp)}</script>
<script type="application/ld+json">${JSON.stringify(schemaFaq)}</script>
</head>
<body>

${S.header(L.lang, { isHome: true })}

<main>
<section class="hero">
  <div class="wrap hero-grid">
    <div>
      <h1 class="h1 rise d1">${H.h1}</h1>
      <p class="lead rise d2">${H.lead}</p>
      <div class="cta-row rise d3" id="hero-cta">
        ${storeBtn(L)}
        <a class="link-arrow" href="#how">${H.more}${I.arrow}</a>
      </div>
      <p class="facts rise d3">${H.facts}</p>
    </div>
    <div class="stage rise d2">
      <div class="phone ph-back">${shot('2-feed', L, '(min-width: 1024px) 260px, 46vw', H.altBack)}</div>
      <div class="phone ph-main">${shot('1-scan', L, '(min-width: 1024px) 320px, 56vw', H.altMain, { eager: true })}</div>
      <div class="float f1"><span class="ic">${I.scan}</span><span><b>${H.f1[0]}</b><small>${H.f1[1]}</small></span></div>
      <div class="float f2"><span class="ic warm">${I.allergy}</span><span><b>${H.f2[0]}</b><small>${H.f2[1]}</small></span></div>
      <div class="float f3"><span class="avatars">${avatars}</span><span><b>${H.f3[0]}</b><small>${H.f3[1]}</small></span></div>
    </div>
  </div>
  <div class="wrap" style="margin-top:56px">
    <div class="stats rv">${L.stats.map(([n, t]) => `<div class="stat"><b>${n}</b><span>${t}</span></div>`).join('')}</div>
  </div>
</section>

<section class="sec" id="family">
  <div class="wrap split">
    <div class="table-visual rv">
      <div class="phone">${shot('3-family', L, '(min-width: 1024px) 320px, 70vw', T.alt)}</div>
      <div class="tag t1">${I.allergy}${T.tags[0]}</div>
      <div class="tag t2">${I.allergy}${T.tags[1]}</div>
      <div class="tag ok t3">${I.check}${T.tags[2]}</div>
    </div>
    <div>
      
      <h2 class="h2 rv d1">${T.h2}</h2>
      <p class="lead rv d2" style="margin-top:22px">${T.lead}</p>
      <ul class="points">${T.points.map(([ic, b, s], i) =>
        `<li class="rv d${i + 1}"><span class="ic">${I[ic]}</span><div><b>${b}</b><span>${s}</span></div></li>`).join('')}</ul>
    </div>
  </div>
</section>

<section class="sec" id="how" style="padding-top:0">
  <div class="wrap">
    <div class="sec-head center"><h2 class="h2 rv d1">${L.how.h2}</h2></div>
    <div class="steps">${L.how.steps.map(([img, t, d], i) => `
      <article class="step rv d${i + 1}">
        <div class="step-img">${shot(img, L, '(min-width: 900px) 240px, 62vw', t)}</div>
        <div class="step-body"><span class="num">${i + 1}</span><h3 class="h3">${t}</h3><p>${d}</p></div>
      </article>`).join('')}
    </div>
  </div>
</section>

<section class="sec" id="features" style="padding-top:0">
  <div class="wrap">
    <div class="sec-head"><h2 class="h2 rv d1">${F.h2}</h2><p class="lead rv d2">${F.lead}</p></div>
    <div class="bento">
      <article class="tile b-plan rv">
        <h3 class="h3">${F.plan[0]}</h3><p>${F.plan[1]}</p>
        <div class="shot">${shot('4-plan', L, '(min-width: 900px) 330px, 78vw', F.altPlan)}</div>
      </article>
      <article class="tile b-chef rv d1">
        <h3 class="h3">${F.chef[0]}</h3><p>${F.chef[1]}</p>
        <div class="chat"><div class="bubble me">${F.chat[0]}</div><div class="bubble ai">${F.chat[1]}</div></div>
      </article>
      <article class="tile b-score rv d2">
        <h3 class="h3">${F.score[0]}</h3><p>${F.score[1]}</p>
        <div class="grades" aria-hidden="true"><span style="background:#4B7349">A</span><span class="on" style="background:#7BA878">B</span><span style="background:#E89D5E">C</span><span style="background:#C06321">D</span><span style="background:#A24734">E</span></div>
      </article>
      <article class="tile b-list rv">
        <h3 class="h3">${F.list[0]}</h3><p>${F.list[1]}</p>
        <div class="shot">${shot('5-shop', L, '(min-width: 900px) 360px, 90vw', F.altList)}</div>
      </article>
      <article class="tile b-cook rv d1">
        <h3 class="h3">${F.cook[0]}</h3><p>${F.cook[1]}</p>
        <div class="timer" aria-hidden="true">08:30</div>
      </article>
      <article class="tile b-auth rv d2">
        <h3 class="h3">${F.auth[0]}</h3><p>${F.auth[1]}</p>
        <div class="author" aria-hidden="true"><span class="av">${I.profile}</span><span><b>${F.authCard[0]}</b><small>${F.authCard[1]}</small></span><span class="go">${I.share}</span></div>
      </article>
    </div>
  </div>
</section>

<section class="sec dark on-dark" id="privacy">
  <div class="wrap">
    <div class="sec-head"><h2 class="h2 rv d1">${L.priv.h2}</h2><p class="lead rv d2">${L.priv.lead}</p></div>
    <div class="trio">${L.priv.items.map(([ic, b, s], i) =>
      `<div class="rv d${i + 1}"><b>${b}</b><span>${s}</span></div>`).join('')}</div>
  </div>
</section>

<section class="sec" id="guides">
  <div class="wrap">
    <div class="sec-head"><h2 class="h2 rv d1">${L.guides.h2}</h2></div>
    <div class="guides">${L.guides.items.map(([href, b, s], i) =>
      `<a class="guide rv d${i + 1}" href="${href}"><div><b>${b}</b><span>${s}</span></div><i>${L.guides.open}${I.arrow}</i></a>`).join('')}</div>
  </div>
</section>

<section class="sec" id="faq" style="padding-top:0">
  <div class="wrap faq-grid">
    <div class="faq-side">
      <h2 class="h2 rv d1">${L.faq.h2}</h2>
      <p class="lead rv d2" style="margin-top:20px">${L.faq.lead}</p>
      <div class="help rv d3" id="support">
        <b>${L.faq.help[0]}</b><span>${L.faq.help[1]}</span>
        <a class="btn" href="mailto:${EMAIL}?subject=CookFusion%20Support">${I.mail}${L.faq.help[2]}</a>
      </div>
    </div>
    <div>${L.faq.groups.map(([title, items], gi) => `
      <div class="faq-group"><h3>${title}</h3>${items.map(([q, a], i) =>
        `<details class="qa"${gi === 0 && i === 0 ? ' open' : ''}><summary>${q}<i>${I.plus}</i></summary><p>${a}</p></details>`).join('')}</div>`).join('')}
    </div>
  </div>
</section>

<section class="sec" style="padding-top:0" id="download">
  <div class="wrap">
    <div class="final on-dark rv">
      <div class="final-body">
        <h2 class="h2">${L.final.h2}</h2>
        <p class="lead">${L.final.lead}</p>
        <div class="final-cta">${storeBtn(L)}<div class="qr">${qr}<span>${L.final.qr}</span></div></div>
      </div>
      <div class="final-img"><img src="img/pasta-900.webp" width="900" height="1350" alt="${attr(L.final.alt)}" loading="lazy" decoding="async"></div>
    </div>
  </div>
</section>
</main>

${S.footer(L.lang, { isHome: true })}

${S.scriptTag()}
</body>
</html>
`;
}

// ── Сборка ───────────────────────────────────────────────────
let bad = 0;
for (const L of Object.values(C)) bad += S.checkText(L, L.lang);
if (bad) { console.error('Длинные тире или е с двумя точками в текстах: ' + bad); process.exit(1); }

for (const L of Object.values(C)) {
  fs.writeFileSync(path.join(DIR, L.file), page(L));
  console.log('  ' + L.file);
}
console.log('главная собрана на двух языках');
