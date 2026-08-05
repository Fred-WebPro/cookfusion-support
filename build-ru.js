/**
 * Собирает ru.html из index.html по словарю.
 *
 * Отдельная страница, а не перевод на лету: поисковику нужен свой адрес
 * на каждый язык, иначе русская версия просто не попадёт в индекс.
 * Генерация из английской гарантирует, что страницы не разъедутся —
 * правится index.html, ru.html пересобирается.
 *
 *   node support-site/build-ru.js
 */
const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname);
const BASE = 'https://fred-webpro.github.io/cookfusion-support/';

// Ключ — точная английская строка из разметки. Порядок важен: длинные
// фразы заменяются раньше коротких, иначе «Support» съест «Support URL».
const RU = {
  // Заголовок страницы и описания для поисковиков
  'CookFusion — Photograph Your Fridge, Get a Recipe | Free AI Meal Planner':
    'CookFusion — сфотографируйте холодильник и получите рецепт | Бесплатный ИИ-планировщик питания',
  'Free iPhone app: photograph your fridge and get a recipe from what you already have. 13,500+ recipes, meal planning for the whole family, allergies and diets respected on every plate.':
    'Бесплатное приложение для iPhone: сфотографируйте холодильник и получите рецепт из того, что уже есть. Более 13 500 рецептов, планирование питания на всю семью, аллергии и диеты учитываются в каждой тарелке.',
  'CookFusion — Photograph Your Fridge, Get a Recipe':
    'CookFusion — сфотографируйте холодильник и получите рецепт',
  "Free iPhone app that turns what is already in your fridge into a recipe, and plans the week around your family's diets and allergies.":
    'Бесплатное приложение для iPhone: превращает содержимое холодильника в рецепт и планирует неделю с учётом диет и аллергий вашей семьи.',
  'Free iPhone app that cooks around what you already have.':
    'Бесплатное приложение, которое готовит из того, что у вас уже есть.',

  // С разметкой: голое слово порезало бы чужие строки. «Cook» без тегов
  // съел «CookFusion» в девятнадцати местах при первой сборке, включая
  // разметку для поисковиков.
  '<h3>Snap</h3>': '<h3>Снимок</h3>',
  '<h3>Generate</h3>': '<h3>Подбор</h3>',
  '<h3>Cook</h3>': '<h3>Готовка</h3>',
  '<b>14 days</b>': '<b>14 дней</b>',
  '<b>Free</b>': '<b>Бесплатно</b>',
  '<div class="sB-item">Broccoli <b>✓</b></div>': '<div class="sB-item">Брокколи <b>✓</b></div>',
  '<div class="sB-item">Eggs · 6 <b>✓</b></div>': '<div class="sB-item">Яйца · 6 <b>✓</b></div>',
  '<div class="sB-item">Cherry tomatoes <b>✓</b></div>': '<div class="sB-item">Черри <b>✓</b></div>',
  'Recipe apps show you what other people cooked. CookFusion looks at <strong>your</strong> fridge, <strong>your</strong> family and <strong>your</strong> week — and cooks around them.':
    'Приложения с рецептами показывают, что готовили другие. CookFusion смотрит на <strong>ваш</strong> холодильник, <strong>вашу</strong> семью и <strong>вашу</strong> неделю — и готовит вокруг них.',

  // Меню
  'Features': 'Возможности',
  'How it works': 'Как это работает',
  'Privacy': 'Приватность',
  'Support': 'Поддержка',
  'Get the app': 'Установить',

  // Первый экран
  'AI-powered · Out now on the App Store': 'На основе ИИ · Уже в App Store',
  'Open your fridge.': 'Откройте холодильник.',
  'Meet your': 'Познакомьтесь со своим',
  'chef.': 'поваром.',
  "CookFusion photographs what you already have, understands it with vision AI, and turns it into a chef-level recipe — tailored to your family's diets, allergies and taste.":
    'CookFusion фотографирует то, что у вас уже есть, распознаёт продукты и превращает их в рецепт ресторанного уровня — с учётом диет, аллергий и вкусов вашей семьи.',
  'DOWNLOAD ON THE': 'СКАЧАТЬ В',
  'Explore the app ↓': 'Посмотреть возможности ↓',
  'Free to download · iPhone &amp; iPad · English': 'Бесплатно · iPhone и iPad · английский интерфейс',

  // Цифры
  'recipes, every one with real steps and amounts': 'рецептов, у каждого настоящие шаги и граммовки',
  'of breakfasts, lunches and dinners planned ahead': 'завтраков, обедов и ужинов спланировано вперёд',
  'no subscription, no paywall, no ads': 'без подписки, без платного доступа, без рекламы',
  'ad networks and data brokers we share with': 'рекламных сетей и продавцов данных, с кем мы делимся',

  // Возможности
  'The Product': 'Продукт',
  'A full kitchen brain,': 'Кухонный мозг целиком,',
  'not another recipe list': 'а не ещё один список рецептов',
  'Chef AI — a chef who never sleeps': 'ИИ-повар, который не спит',
  'Fridge Scanner': 'Сканер холодильника',
  'One photo. The vision AI identifies every ingredient it sees and writes a recipe you can cook right now.':
    'Одно фото. ИИ распознаёт все продукты, которые видит, и пишет рецепт, который можно готовить прямо сейчас.',
  'Product Health Check': 'Проверка продукта',
  'Two-week Meal Planner': 'Планировщик на две недели',
  'Breakfast, lunch and dinner planned ahead — synced to your account, never lost between devices.':
    'Завтрак, обед и ужин спланированы заранее — всё в вашем аккаунте и не теряется между устройствами.',
  'Cooks for the whole family': 'Готовит на всю семью',
  'Diets, allergies and dislikes per family member. Every recipe respects every plate at the table.':
    'Диета, аллергии и нелюбимые продукты у каждого. Любой рецепт учитывает каждую тарелку за столом.',
  'Hands-free Cooking Mode': 'Режим готовки без рук',
  'Shopping list that writes itself': 'Список покупок, который пишет себя сам',

  // Как работает
  'From fridge to fork in minutes': 'От холодильника до тарелки за минуты',
  "Point the camera at your fridge, a shelf, or one product — whatever you've got on hand.":
    'Наведите камеру на холодильник, полку или один продукт — на что угодно.',
  "Vision AI recognises your ingredients; the chef model writes a recipe around your family's diets and tastes.":
    'ИИ распознаёт продукты, а модель-повар пишет рецепт под диеты и вкусы вашей семьи.',
  'Follow big, clear steps in Cooking Mode. Anything missing is already on your shopping list.':
    'Идите по крупным понятным шагам в режиме готовки. Чего не хватает — уже в списке покупок.',

  // Приватность
  'Trust &amp; Privacy': 'Доверие и приватность',
  'Your kitchen. Your data.': 'Ваша кухня. Ваши данные.',
  "We built CookFusion the way we'd want an app treating our own family's data.":
    'Мы сделали CookFusion так, как хотели бы, чтобы обращались с данными нашей собственной семьи.',
  'Photos stay yours': 'Фото остаются вашими',
  'No tracking, no ads': 'Без слежки и рекламы',
  'Delete everything, any time': 'Удалить всё в любой момент',

  // Вопросы
  'Questions': 'Вопросы',
  'Straight answers': 'Прямые ответы',
  'Is CookFusion really free?': 'CookFusion правда бесплатный?',
  'Yes. Every feature described on this page works without paying: the fridge scanner, the AI chef, the planner, the shopping list. There is no subscription, no paywall and no advertising in the app.':
    'Да. Всё, что описано на этой странице, работает без оплаты: сканер холодильника, ИИ-повар, планировщик, список покупок. Ни подписки, ни платного доступа, ни рекламы в приложении нет.',
  'Do I have to photograph my fridge to use it?': 'Обязательно фотографировать холодильник?',
  'No. The photo is one way in. You can also search 13,501 recipes, browse by cuisine, answer three questions and let the app pick, or ask the AI chef in plain words.':
    'Нет, фото — только один из путей. Можно искать среди 13 501 рецепта, смотреть по кухням, ответить на три вопроса и позволить приложению выбрать, или просто спросить ИИ-повара словами.',
  'How does it handle allergies?': 'Как учитываются аллергии?',
  'You add each person at your table with their own allergies, diet and dislikes. Anything that clashes is filtered out before you ever see it — not flagged afterwards. Portions scale to the number of people eating.':
    'Вы добавляете каждого за вашим столом с его аллергиями, диетой и нелюбимыми продуктами. Всё, что конфликтует, отсеивается до того, как вы это увидите, а не помечается потом. Порции пересчитываются под число едоков.',
  'What happens to my fridge photos?': 'Что происходит с фотографиями?',
  'They are sent for ingredient recognition and nothing else. Not used for advertising, not sold, not shared with third parties for their own purposes. You can delete your account and everything in it from inside the app.':
    'Они отправляются только для распознавания продуктов. Не используются для рекламы, не продаются, не передаются третьим лицам для их целей. Аккаунт и всё его содержимое удаляется прямо из приложения.',
  'Which devices does it work on?': 'На каких устройствах работает?',
  'iPhone and iPad running iOS 15.1 or later. An Android version is not available yet.':
    'iPhone и iPad с iOS 15.1 и новее. Версии для Android пока нет.',
  'Can I publish my own recipes?': 'Можно публиковать свои рецепты?',
  'Yes. Anyone can become an author, publish recipes under their own name and get a public page to share. Authors are paid on views.':
    'Да. Автором может стать любой: публиковать рецепты под своим именем и получить публичную страницу, которой можно делиться. Авторам платят за просмотры.',

  // Поддержка и подвал
  "Questions? We're here.": 'Есть вопросы? Мы на связи.',
  'Still need help?': 'Нужна помощь?',
  "Tonight's dinner is": 'Сегодняшний ужин уже',
  'already in your': 'лежит в вашем',
  'fridge.': 'холодильнике.',
  'Privacy Policy': 'Политика конфиденциальности',
  'Terms of Use': 'Условия использования',
  'Made with': 'Сделано с',
  'for home chefs everywhere': 'для домашних поваров по всему миру',
  // Макет приложения на первом экране
  'GPT-4o Vision identified 9 ingredients': 'GPT-4o Vision распознал 9 продуктов',
  "Fits Anna's gluten-free diet": 'Подходит Анне: без глютена',
  'Added to Tuesday dinner': 'Добавлено в ужин на вторник',
  'Good Evening,': 'Добрый вечер,',
  '✨ What to cook with nothing?': '✨ Что приготовить, когда ничего нет?',
  '📷 Photo of fridge': '📷 Фото холодильника',
  'Creamy Tuscan Pasta': 'Тосканская паста со сливками',
  'DETECTED INGREDIENTS': 'НАЙДЕННЫЕ ПРОДУКТЫ',
  'Generate recipe →': 'Подобрать рецепт →',

  // Бегущая строка
  'FRIDGE SCANNER': 'СКАНЕР ХОЛОДИЛЬНИКА',
  'MEAL PLANNER': 'ПЛАНИРОВЩИК ПИТАНИЯ',
  'HEALTH SCORES': 'ОЦЕНКА ПРОДУКТОВ',
  'FAMILY DIETS': 'ДИЕТЫ СЕМЬИ',
  'SHOPPING LIST': 'СПИСОК ПОКУПОК',
  'COOKING MODE': 'РЕЖИМ ГОТОВКИ',
  'AI RECIPES': 'ИИ-РЕЦЕПТЫ',

  // Подзаголовок раздела возможностей собран из кусков вокруг <strong>


  'Substitutions, techniques, wine pairing, "what do I do with leftover rice" — ask anything, get an answer in seconds. Powered by GPT-4o.':
    'Чем заменить, как приготовить, какое вино подать, «что делать с оставшимся рисом» — спросите что угодно и получите ответ за секунды. Работает на GPT-4o.',
  'I only have chicken, rice and a sad-looking lemon 🍋':
    'У меня только курица, рис и грустный лимон 🍋',
  "Perfect — that's a lemon-garlic chicken rice bowl. Want the 25-minute recipe with steps?":
    'Отлично — получится курица с рисом, лимоном и чесноком. Показать рецепт на 25 минут по шагам?',
  'Scan any packaged product and get an honest A–E health score with clear reasoning — sugar, additives, the lot.':
    'Отсканируйте любой упакованный продукт и получите честную оценку от A до E с объяснением — сахар, добавки, всё сразу.',
  'Big-type steps, a screen that never sleeps, and the current step waiting in your notification shade when you switch apps. Flour-covered fingers welcome.':
    'Крупные шаги, экран, который не гаснет, и текущий шаг в шторке уведомлений, когда вы переключились на другое приложение. Руки в муке — не помеха.',
  'Missing ingredients jump from any recipe into a smart list — auto-sorted by aisle, scaled to your portions, synced to the cloud.':
    'Недостающие продукты попадают из любого рецепта в умный список — разложенный по отделам магазина, пересчитанный под ваши порции и сохранённый в аккаунте.',

  // Приватность
  'Fridge photos are used only to identify ingredients — never for advertising, never sold, never shared with third parties for their own purposes.':
    'Фото холодильника используются только для распознавания продуктов — никогда для рекламы, никогда не продаются и не передаются третьим лицам для их целей.',
  'No ad networks, no cross-app tracking, no data brokers. The app does one thing: helps you cook.':
    'Ни рекламных сетей, ни слежки между приложениями, ни продавцов данных. Приложение делает одно: помогает готовить.',
  'One tap in Settings permanently deletes your account and all associated data. Full details in our':
    'Одно нажатие в настройках навсегда удаляет аккаунт и все связанные данные. Подробности в',

  // Поддержка
  "Open the app → Settings → Account → Change Password, and we'll email you a secure reset link.":
    'Откройте приложение → Настройки → Аккаунт → Сменить пароль, и мы пришлём на почту защищённую ссылку.',
  'What happens to the photos I take?': 'Что происходит со снимками, которые я делаю?',
  'Photos of your fridge or food products are processed only to identify ingredients and generate suggestions. They are never used for advertising and never shared with third parties for their own purposes. See our':
    'Снимки холодильника и продуктов обрабатываются только чтобы распознать ингредиенты и предложить рецепт. Они никогда не используются для рекламы и не передаются третьим лицам для их целей. Подробности в',
  'How does the AI recipe generation work?': 'Как работает подбор рецептов?',
  'In the app: Settings → Account → Delete Account. Your account and all associated data are permanently removed.':
    'В приложении: Настройки → Аккаунт → Удалить аккаунт. Аккаунт и все связанные данные удаляются навсегда.',
  "The app isn't working correctly. What should I do?": 'Приложение работает неправильно. Что делать?',
  'Make sure you have the latest version and an active internet connection. If the problem persists, email us — please include your device model and what happened. We usually reply within 24 hours.':
    'Убедитесь, что установлена последняя версия и есть интернет. Если не помогло — напишите нам и укажите модель устройства и что именно произошло. Обычно отвечаем в течение суток.',
  'web.pro.farid@gmail.com · we reply within 24 hours': 'web.pro.farid@gmail.com · отвечаем в течение суток',
  'Free on the App Store. iPhone and iPad, no subscription.':
    'Бесплатно в App Store. iPhone и iPad, без подписки.',
  "CookFusion analyzes the ingredients you list or photograph and generates recipes tailored to your dietary profile and your family members' preferences — including allergies and dislikes.":
    'CookFusion разбирает продукты, которые вы перечислили или сфотографировали, и составляет рецепты под ваш режим питания и предпочтения домашних — включая аллергии и нелюбимое.',
  'The AI cooking assistant that plans meals around your family and what you already have.':
    'ИИ-помощник на кухне: планирует еду под вашу семью и под то, что у вас уже есть.',
};

let html = fs.readFileSync(path.join(DIR, 'index.html'), 'utf8');

// Длинные строки первыми: иначе короткий ключ порежет длинную фразу
const keys = Object.keys(RU).sort((a, b) => b.length - a.length);
let hits = 0;
const missed = [];
for (const k of keys) {
  if (!html.includes(k)) { missed.push(k); continue; }
  html = html.split(k).join(RU[k]);
  hits++;
}

// Язык страницы, канонический адрес и подсветка выбранного языка
html = html.replace('<html lang="en">', '<html lang="ru">');
html = html.replace(`<link rel="canonical" href="${BASE}">`, `<link rel="canonical" href="${BASE}ru.html">`);
html = html.replace('<meta property="og:locale" content="en_US">', '<meta property="og:locale" content="ru_RU">');
html = html.replace('<meta property="og:locale:alternate" content="ru_RU">', '<meta property="og:locale:alternate" content="en_US">');
html = html.replace(`<meta property="og:url" content="${BASE}">`, `<meta property="og:url" content="${BASE}ru.html">`);
html = html.replace('<a href="/cookfusion-support/" class="on" hreflang="en">EN</a><a href="/cookfusion-support/ru.html" hreflang="ru">RU</a>',
                    '<a href="/cookfusion-support/" hreflang="en">EN</a><a href="/cookfusion-support/ru.html" class="on" hreflang="ru">RU</a>');

// Пометка о происхождении: чтобы никто не правил ru.html руками
html = html.replace('<head>', '<head>\n<!-- Собрано из index.html: node support-site/build-ru.js. Правки вносите в index.html и в словарь build-ru.js. -->');

// Сросшиеся слова видно сразу: русская буква вплотную к латинской.
// Проверка стоит до записи файла — испорченную страницу лучше не
// создавать вовсе, чем случайно выложить.
const splices = [...html.matchAll(/[А-Яа-я][A-Za-z]|[A-Za-z][А-Яа-я]/g)]
  .map(m => html.slice(Math.max(0, m.index - 20), m.index + 25).replace(/\s+/g, ' '));
if (splices.length) {
  console.error(`Сросшихся слов: ${splices.length} — какой-то ключ порезал чужую строку:`);
  [...new Set(splices)].slice(0, 8).forEach(x => console.error('  ' + x));
  process.exit(1);
}

fs.writeFileSync(path.join(DIR, 'ru.html'), html);

console.log(`переведено фраз: ${hits} из ${keys.length}`);
if (missed.length) {
  console.log('не найдено в разметке (возможно, текст изменился):');
  missed.forEach(k => console.log('  ' + k.slice(0, 70)));
}
console.log(`ru.html записан, ${html.split('\n').length} строк, склеек нет`);
