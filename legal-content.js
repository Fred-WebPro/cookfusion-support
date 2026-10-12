/**
 * Тексты юридических страниц: политика конфиденциальности, условия
 * использования и политика cookie, на английском и русском.
 *
 * Каждое утверждение здесь сверено с кодом приложения и сайта:
 *   - аналитика приложения: supabase/analytics.sql, события привязаны к аккаунту
 *     и удаляются вместе с ним (on delete cascade);
 *   - счетчик сайта: supabase/site_analytics.sql, без IP и без идентификаторов;
 *   - вход: Sign in with Apple и Google (src/screens/WelcomeScreen.js);
 *   - уведомления: сервис Expo (supabase/functions/admin-push);
 *   - сессия входа хранится на устройстве (src/services/supabase.js);
 *   - жалобы и блокировки: supabase/ugc_safety.sql.
 *
 * Блок документа: строка это абзац, массив это маркированный список.
 * Правила набора бренда: без длинных тире и без е с двумя точками.
 */

const EMAIL = 'web.pro.farid@gmail.com';
const MAIL = `<a href="mailto:${EMAIL}">${EMAIL}</a>`;
const GH = 'https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement';
const UPDATED = { en: 'Last updated: 12 October 2026', ru: 'Последнее обновление: 12 октября 2026 года' };

const privacy = {
  en: {
    file: 'privacy.html', title: 'Privacy Policy',
    desc: 'What CookFusion collects in the app and on this website, why, and how to delete it.',
    intro: [
      'This policy explains what personal information CookFusion (“we”, “us”) collects when you use the CookFusion app (the “App”) and the website cookfusion.dilami.pro (the “Site”), why we collect it and what you can do about it.',
    ],
    sections: [
      ['1. Who is responsible', [
        `CookFusion is responsible for the information described here. For any question about your data, write to ${MAIL}.`,
      ]],
      ['2. What we collect in the App', [
        [
          '<b>Account:</b> your email address, name and profile photo, including when you sign in with Apple or Google.',
          '<b>Your table:</b> diets, allergies, intolerances, dislikes and portion sizes for you and for the people you add to your family. Some of this is information about health. You provide it so the App can remove dishes that do not suit someone.',
          '<b>Photos:</b> pictures of your fridge, shelves or packaged products that you take or choose. They are used only to recognise ingredients or assess a product.',
          '<b>What you do in the App:</b> saved recipes, meal plans, shopping lists, cooking history, ratings and likes.',
          '<b>Content you publish:</b> recipes, photos, comments and your author page. Published content is public: anyone using the App, or opening your author page on the Site, can see it.',
          '<b>Reports and blocks:</b> if you report content or block another user, we store the report and the block.',
          '<b>Usage events:</b> which screens you open, what you search for, which recipes you open, what you add to favourites and when you start cooking. These events are linked to your account.',
          '<b>Push token:</b> a device token used to deliver notifications, only if you allow notifications.',
        ],
        'We do not collect your location, your contacts, a delivery address or payment card details.',
      ]],
      ['3. Information about other people', [
        'When you add family members, you share information about them, sometimes about children and sometimes about their health. Only add people you are entitled to add, for example as their parent or guardian, or with their agreement. We use this information only to pick and plan meals for your table.',
      ]],
      ['4. How we use information', [
        [
          'To run your account and the features of the App.',
          'To pick recipes and plans that suit everyone at your table, including with the help of AI.',
          'To recognise ingredients and products in your photos.',
          'To show the content you publish and to run author pages.',
          'To review reports, remove content that breaks our rules and block abusive accounts.',
          'To send the notifications you have switched on.',
          'To answer support requests and keep the App secure.',
          'To understand which features help people, using usage events, and to improve the App.',
        ],
        'We do not sell personal information, we show no advertising and we do not build advertising profiles.',
      ]],
      ['5. Legal bases', [
        'Where data protection law asks for a legal basis, such as in the European Economic Area and the United Kingdom, we rely on the following.',
        [
          '<b>Contract:</b> running your account and the features you ask for.',
          '<b>Explicit consent:</b> information about health, such as diets and allergies, and your photos, which you choose to provide; and notifications. You can withdraw consent by removing the information, switching notifications off or deleting your account.',
          '<b>Legitimate interests:</b> security, moderation, fixing errors and improving the App with usage events.',
          '<b>Legal obligation:</b> where the law requires us to keep or disclose information.',
        ],
      ]],
      ['6. Service providers', [
        'We use these providers to run the App and the Site. They process data on our behalf and under our instructions.',
        [
          '<b>Supabase:</b> database, sign-in and file storage.',
          '<b>OpenAI:</b> processing of ingredient lists, photos and questions to the AI chef to produce recipes and answers. Under OpenAI’s API terms, data sent through the API is not used to train their models.',
          '<b>Expo:</b> delivery of push notifications.',
          '<b>Apple and Google:</b> optional sign-in.',
          '<b>GitHub:</b> hosting of the Site.',
        ],
        'These providers may store and process data outside your country, including in the United States. Such transfers rely on the safeguards in their contracts.',
      ]],
      ['7. How long we keep it and how to delete it', [
        'We keep your information for as long as your account exists. You can delete your account in the App: Settings, then Account, then Delete Account. This permanently removes your account and the data associated with it, including your usage events. You can also ask us to delete it by email.',
        'Copies that remain in our providers’ backups are removed on their normal backup cycle.',
      ]],
      ['8. Security', [
        'All data travels over encrypted connections (HTTPS and TLS) and is stored with access controls. Access rules are enforced by the database itself, so the App cannot read another person’s private data. No method of transmission or storage is completely secure, but we take reasonable measures to protect your information.',
      ]],
      ['9. Children', [
        'The App is not directed at children under 13, and we do not knowingly let children under 13 create accounts. A parent or guardian may add a child to their family so that meals suit the child. That information stays in the parent’s account and is used only to plan meals.',
        `If you believe a child under 13 has created an account, write to ${MAIL} and we will delete it.`,
      ]],
      ['10. Your rights', [
        'Depending on where you live, you may have the right to access, correct, export or delete your information, to restrict or object to its use, and to withdraw consent at any time. You may also complain to your data protection authority.',
        `To use any of these rights, write to ${MAIL}. We reply within 30 days.`,
      ]],
      ['11. This website', [
        'The Site sets no cookies and stores nothing in your browser. It has no third-party analytics, no advertising pixels and no social widgets, and its fonts are served from this domain. The details, including exactly what our own visitor counter records, are in the <a href="cookies.html">Cookie Policy</a>.',
        `The Site is hosted on GitHub Pages, which keeps standard access logs, including IP addresses, for security and abuse prevention. We do not read, export or analyse them. See <a href="${GH}">GitHub’s privacy statement</a>.`,
        'The App Store link takes you to Apple, whose own privacy policy applies from that point.',
      ]],
      ['12. Changes to this policy', [
        'We may update this policy. The current version is always on this page, with the date of the last update at the top.',
      ]],
      ['13. Contact', [`Questions about this policy or your data: ${MAIL}.`]],
    ],
  },

  ru: {
    file: 'privacy-ru.html', title: 'Политика конфиденциальности',
    desc: 'Что CookFusion собирает в приложении и на сайте, зачем и как это удалить.',
    intro: [
      'Эта политика объясняет, какие персональные данные CookFusion («мы») собирает, когда вы пользуетесь приложением CookFusion («Приложение») и сайтом cookfusion.dilami.pro («Сайт»), зачем мы это делаем и что вы можете с этим сделать.',
    ],
    sections: [
      ['1. Кто отвечает за данные', [
        `За данные, описанные здесь, отвечает CookFusion. По любому вопросу о ваших данных пишите на ${MAIL}.`,
      ]],
      ['2. Что мы собираем в Приложении', [
        [
          '<b>Аккаунт:</b> адрес почты, имя и фото профиля, в том числе при входе через Apple или Google.',
          '<b>Ваш стол:</b> диеты, аллергии, непереносимости, нелюбимые продукты и размер порций для вас и для людей, которых вы добавили в семью. Часть этих сведений относится к здоровью. Вы указываете их, чтобы Приложение убирало блюда, которые кому-то не подходят.',
          '<b>Фотографии:</b> снимки холодильника, полок или продуктов в упаковке, которые вы делаете или выбираете. Они используются только чтобы распознать продукты или оценить продукт.',
          '<b>Что вы делаете в Приложении:</b> сохраненные рецепты, планы питания, списки покупок, история готовки, оценки и отметки «нравится».',
          '<b>То, что вы публикуете:</b> рецепты, фотографии, комментарии и страница автора. Опубликованное доступно всем: его видит любой пользователь Приложения и любой, кто откроет вашу страницу автора на Сайте.',
          '<b>Жалобы и блокировки:</b> если вы пожаловались на материал или заблокировали пользователя, мы храним жалобу и блокировку.',
          '<b>События использования:</b> какие экраны вы открываете, что ищете, какие рецепты открываете, что добавляете в избранное и когда начинаете готовить. Эти события связаны с вашим аккаунтом.',
          '<b>Токен уведомлений:</b> идентификатор устройства для доставки уведомлений, только если вы их разрешили.',
        ],
        'Мы не собираем ваше местоположение, контакты, адрес доставки и данные банковских карт.',
      ]],
      ['3. Сведения о других людях', [
        'Добавляя членов семьи, вы передаете сведения о них, иногда о детях и иногда об их здоровье. Добавляйте только тех, кого вправе добавить: например, как родитель или законный представитель либо с согласия этого человека. Мы используем эти сведения только чтобы подбирать и планировать еду для вашего стола.',
      ]],
      ['4. Как мы используем данные', [
        [
          'Чтобы вести ваш аккаунт и работу функций Приложения.',
          'Чтобы подбирать рецепты и планы, которые подходят всем за столом, в том числе с помощью ИИ.',
          'Чтобы распознавать продукты на ваших фотографиях.',
          'Чтобы показывать то, что вы опубликовали, и вести страницы авторов.',
          'Чтобы рассматривать жалобы, удалять материалы, нарушающие правила, и блокировать аккаунты нарушителей.',
          'Чтобы присылать уведомления, которые вы включили.',
          'Чтобы отвечать на обращения в поддержку и защищать Приложение.',
          'Чтобы понимать по событиям использования, какие функции помогают людям, и улучшать Приложение.',
        ],
        'Мы не продаем персональные данные, не показываем рекламу и не составляем рекламные профили.',
      ]],
      ['5. Правовые основания', [
        'Там, где закон о защите данных требует правового основания, например в Европейской экономической зоне и Великобритании, мы опираемся на следующее.',
        [
          '<b>Договор:</b> работа аккаунта и функций, которые вы используете.',
          '<b>Явное согласие:</b> сведения о здоровье, такие как диеты и аллергии, и ваши фотографии, которые вы решаете указать; уведомления. Отозвать согласие можно, удалив эти сведения, выключив уведомления или удалив аккаунт.',
          '<b>Законный интерес:</b> безопасность, модерация, исправление ошибок и улучшение Приложения по событиям использования.',
          '<b>Требование закона:</b> когда закон обязывает нас хранить или раскрывать сведения.',
        ],
      ]],
      ['6. Поставщики услуг', [
        'Для работы Приложения и Сайта мы пользуемся услугами этих компаний. Они обрабатывают данные от нашего имени и по нашим указаниям.',
        [
          '<b>Supabase:</b> база данных, вход в аккаунт и хранение файлов.',
          '<b>OpenAI:</b> обработка списков продуктов, фотографий и вопросов ИИ-повару, чтобы составить рецепт или ответ. По условиям API OpenAI переданные через API данные не используются для обучения их моделей.',
          '<b>Expo:</b> доставка уведомлений.',
          '<b>Apple и Google:</b> вход в аккаунт, если вы его выбрали.',
          '<b>GitHub:</b> размещение Сайта.',
        ],
        'Эти компании могут хранить и обрабатывать данные за пределами вашей страны, в том числе в США. Такая передача опирается на гарантии в их договорах.',
      ]],
      ['7. Сколько мы храним данные и как их удалить', [
        'Мы храним данные, пока существует ваш аккаунт. Удалить аккаунт можно в Приложении: Настройки, затем Аккаунт, затем Удалить аккаунт. Это навсегда удаляет аккаунт и связанные с ним данные, включая события использования. Можно также попросить нас об удалении по почте.',
        'Копии в резервных копиях наших поставщиков удаляются в обычном порядке обновления этих копий.',
      ]],
      ['8. Безопасность', [
        'Все данные передаются по шифрованным соединениям (HTTPS и TLS) и хранятся с разграничением доступа. Правила доступа соблюдает сама база данных, поэтому Приложение не может прочитать чужие личные данные. Ни один способ передачи и хранения не дает полной защиты, но мы принимаем разумные меры, чтобы защитить ваши данные.',
      ]],
      ['9. Дети', [
        'Приложение не предназначено для детей младше 13 лет, и мы сознательно не допускаем создания ими аккаунтов. Родитель или законный представитель может добавить ребенка в свою семью, чтобы еда подходила ребенку. Эти сведения остаются в аккаунте родителя и используются только для планирования питания.',
        `Если вы считаете, что аккаунт создал ребенок младше 13 лет, напишите на ${MAIL}, и мы его удалим.`,
      ]],
      ['10. Ваши права', [
        'В зависимости от страны проживания вы можете иметь право получить, исправить, выгрузить или удалить свои данные, ограничить их обработку или возразить против нее и в любой момент отозвать согласие. Вы также можете обратиться с жалобой в орган по защите персональных данных.',
        `Чтобы воспользоваться этими правами, напишите на ${MAIL}. Мы отвечаем в течение 30 дней.`,
      ]],
      ['11. Этот сайт', [
        'Сайт не устанавливает cookie и ничего не сохраняет в вашем браузере. На нем нет сторонней аналитики, рекламных пикселей и виджетов соцсетей, а шрифты загружаются с этого же домена. Подробности, включая то, что именно записывает наш собственный счетчик посещений, приведены в <a href="cookies-ru.html">политике cookie</a>.',
        `Сайт размещен на GitHub Pages, который ведет стандартные журналы обращений, включая IP-адреса, для безопасности и защиты от злоупотреблений. Мы их не читаем, не выгружаем и не анализируем. Подробнее в <a href="${GH}">заявлении GitHub о конфиденциальности</a>.`,
        'Ссылка на App Store ведет на сайт Apple, где действует политика конфиденциальности Apple.',
      ]],
      ['12. Изменения политики', [
        'Мы можем обновлять эту политику. Действующая редакция всегда на этой странице, дата последнего обновления указана вверху.',
      ]],
      ['13. Связь', [`Вопросы об этой политике и ваших данных: ${MAIL}.`]],
    ],
  },
};

const terms = {
  en: {
    file: 'terms.html', title: 'Terms of Use',
    desc: 'The terms that apply when you use CookFusion, including the community rules for published content.',
    intro: [
      'By downloading or using the CookFusion app (the “App”), you agree to these Terms of Use. If you do not agree, please do not use the App.',
    ],
    sections: [
      ['1. The service', [
        'CookFusion picks recipes and meal plans from the ingredients you have, the photos you take and the preferences you set for each person at your table. Some recipes, ingredient recognition, product scores and answers are produced automatically with artificial intelligence.',
      ]],
      ['2. Food safety', [
        'Recipes, ingredient recognition and product assessments are information, not a guarantee. They can contain mistakes. Always use your own judgement about food safety, cooking temperatures, freshness, allergies and diets, and check the ingredients of a dish before you cook it.',
        'CookFusion is not medical or nutritional advice. If you or someone you cook for has allergies or a medical condition, rely on a qualified professional, not on the App.',
      ]],
      ['3. Your account', [
        'You must be at least 13 years old to create an account. Keep your sign-in details safe: you are responsible for what happens in your account. Give accurate information. You can delete your account at any time in Settings.',
      ]],
      ['4. Community rules', [
        'Authors publish recipes and people comment on them. We have zero tolerance for objectionable content and abusive users. Do not publish:',
        [
          'content that is hateful, harassing, threatening or discriminatory;',
          'sexual or graphically violent content;',
          'content that puts health at risk, including deliberately unsafe recipes;',
          'spam, scams or advertising without our permission;',
          'recipes, photos or texts you do not have the right to publish;',
          'personal information about other people.',
        ],
        'Every recipe, comment and author page can be reported, and any user can be blocked. We aim to review reports within 24 hours. We remove content that breaks these rules and suspend or close the accounts of people who break them.',
      ]],
      ['5. Content you publish', [
        'You keep ownership of the recipes, photos and texts you publish. By publishing them you give us a non-exclusive, worldwide, royalty-free licence to host, display, translate, resize and distribute them in the App and on cookfusion.dilami.pro, so that the service can work. The licence ends when you delete the content or your account.',
        'You confirm that you have the right to publish what you publish and that it follows the community rules.',
      ]],
      ['6. Acceptable use', [
        [
          'Do not use the App for anything unlawful.',
          'Do not try to disrupt, reverse engineer or gain unauthorised access to the App or its services.',
          'Do not use automated means to collect content or data from the App.',
        ],
      ]],
      ['7. Intellectual property', [
        'The App, its design and its content, except content published by users, belong to us or our licensors. We give you a limited, non-exclusive, non-transferable licence to use the App for personal, non-commercial purposes.',
      ]],
      ['8. If you downloaded the App from the Apple App Store', [
        [
          'These Terms are between you and us, not with Apple. Apple is not responsible for the App or its content.',
          'Apple has no obligation to provide maintenance or support for the App.',
          'If the App fails to meet an applicable warranty, you may notify Apple, and Apple may refund the purchase price, if any. Apple has no other warranty obligation for the App.',
          'Apple is not responsible for any claims relating to the App, including product liability, legal or regulatory compliance and consumer protection claims.',
          'Apple is not responsible for investigating or defending claims that the App infringes someone’s intellectual property.',
          'You confirm that you are not located in a country subject to a United States government embargo and are not listed as a prohibited or restricted party by the United States government.',
          'Apple and its subsidiaries are third-party beneficiaries of these Terms and may enforce them against you.',
        ],
      ]],
      ['9. No warranty', [
        'The App is provided “as is” and “as available”, without warranties of any kind. We do not promise that it will be uninterrupted or error-free, or that recipes and answers produced with AI will be accurate or complete.',
      ]],
      ['10. Limitation of liability', [
        'To the extent the law allows, we are not liable for indirect, incidental, special or consequential damages arising from your use of the App, including damages that result from relying on recipes or nutrition information. Nothing in these Terms limits liability that cannot be limited by law.',
      ]],
      ['11. Ending the use', [
        'We may suspend or close your access if you break these Terms. You may stop using the App and delete your account at any time.',
      ]],
      ['12. Changes to these terms', [
        'We may update these Terms. The current version is always on this page, with the date of the last update at the top. If you keep using the App after a change takes effect, the updated Terms apply.',
      ]],
      ['13. Contact', [`Questions about these Terms: ${MAIL}.`]],
    ],
  },

  ru: {
    file: 'terms-ru.html', title: 'Условия использования',
    desc: 'Условия использования CookFusion, включая правила сообщества для публикуемых материалов.',
    intro: [
      'Скачивая или используя приложение CookFusion («Приложение»), вы соглашаетесь с этими условиями. Если вы с ними не согласны, пожалуйста, не используйте Приложение.',
    ],
    sections: [
      ['1. Что это за сервис', [
        'CookFusion подбирает рецепты и планы питания по продуктам, которые у вас есть, по сделанным фотографиям и по настройкам для каждого человека за вашим столом. Часть рецептов, распознавание продуктов, оценки продуктов и ответы создаются автоматически с помощью искусственного интеллекта.',
      ]],
      ['2. Безопасность еды', [
        'Рецепты, распознавание продуктов и оценки продуктов носят информационный характер и не являются гарантией. В них возможны ошибки. Всегда сами оценивайте безопасность продуктов, температуру приготовления, свежесть, аллергии и диеты и проверяйте состав блюда перед готовкой.',
        'CookFusion не заменяет консультацию врача или диетолога. Если у вас или у тех, для кого вы готовите, есть аллергия или заболевание, полагайтесь на специалиста, а не на Приложение.',
      ]],
      ['3. Ваш аккаунт', [
        'Создать аккаунт можно с 13 лет. Берегите данные для входа: вы отвечаете за все, что происходит в вашем аккаунте. Указывайте достоверные сведения. Удалить аккаунт можно в любой момент в Настройках.',
      ]],
      ['4. Правила сообщества', [
        'Авторы публикуют рецепты, а пользователи их комментируют. Мы не терпим недопустимые материалы и оскорбительное поведение. Нельзя публиковать:',
        [
          'материалы, разжигающие ненависть, оскорбляющие, угрожающие или дискриминирующие;',
          'материалы сексуального характера и откровенное насилие;',
          'материалы, опасные для здоровья, включая заведомо небезопасные рецепты;',
          'спам, мошенничество и рекламу без нашего разрешения;',
          'рецепты, фотографии и тексты, на публикацию которых у вас нет прав;',
          'персональные данные других людей.',
        ],
        'На любой рецепт, комментарий и страницу автора можно пожаловаться, а любого пользователя можно заблокировать. Мы стараемся рассматривать жалобы в течение 24 часов. Материалы, нарушающие правила, мы удаляем, а аккаунты нарушителей приостанавливаем или закрываем.',
      ]],
      ['5. То, что вы публикуете', [
        'Рецепты, фотографии и тексты, которые вы публикуете, остаются вашими. Публикуя их, вы предоставляете нам неисключительную, безвозмездную и действующую по всему миру лицензию размещать, показывать, переводить, изменять размер и распространять их в Приложении и на сайте cookfusion.dilami.pro, чтобы сервис мог работать. Лицензия прекращается, когда вы удаляете материал или аккаунт.',
        'Вы подтверждаете, что вправе публиковать то, что публикуете, и что это соответствует правилам сообщества.',
      ]],
      ['6. Допустимое использование', [
        [
          'Не используйте Приложение в незаконных целях.',
          'Не пытайтесь нарушить работу Приложения, вскрыть его устройство или получить несанкционированный доступ к нему и его сервисам.',
          'Не собирайте материалы и данные из Приложения автоматическими средствами.',
        ],
      ]],
      ['7. Интеллектуальная собственность', [
        'Приложение, его дизайн и содержимое, кроме материалов, опубликованных пользователями, принадлежат нам или нашим лицензиарам. Мы предоставляем вам ограниченную, неисключительную и непередаваемую лицензию на использование Приложения в личных некоммерческих целях.',
      ]],
      ['8. Если вы скачали Приложение в Apple App Store', [
        [
          'Эти условия заключаются между вами и нами, а не с Apple. Apple не отвечает за Приложение и его содержимое.',
          'Apple не обязана обслуживать и поддерживать Приложение.',
          'Если Приложение не соответствует применимой гарантии, вы можете сообщить об этом Apple, и Apple может вернуть стоимость покупки, если она была. Других гарантийных обязательств по Приложению у Apple нет.',
          'Apple не отвечает по претензиям, связанным с Приложением, включая претензии об ответственности за продукт, о соответствии закону и о защите прав потребителей.',
          'Apple не отвечает за проверку и защиту от претензий о том, что Приложение нарушает чью-либо интеллектуальную собственность.',
          'Вы подтверждаете, что не находитесь в стране, на которую распространяется эмбарго правительства США, и не включены в списки лиц, сделки с которыми запрещены или ограничены правительством США.',
          'Apple и ее дочерние компании являются третьими лицами, в пользу которых заключены эти условия, и могут требовать их исполнения от вас.',
        ],
      ]],
      ['9. Отсутствие гарантий', [
        'Приложение предоставляется «как есть» и «по мере доступности», без каких-либо гарантий. Мы не обещаем, что оно будет работать без перерывов и ошибок или что рецепты и ответы, созданные с помощью ИИ, будут точными и полными.',
      ]],
      ['10. Ограничение ответственности', [
        'В пределах, допустимых законом, мы не отвечаем за косвенный, случайный, особый или последующий ущерб, возникший из-за использования Приложения, в том числе из-за того, что вы полагались на рецепты или сведения о питательной ценности. Ничто в этих условиях не ограничивает ответственность, которую по закону ограничить нельзя.',
      ]],
      ['11. Прекращение использования', [
        'Мы можем приостановить или закрыть ваш доступ, если вы нарушаете эти условия. Вы можете перестать пользоваться Приложением и удалить аккаунт в любой момент.',
      ]],
      ['12. Изменения условий', [
        'Мы можем обновлять эти условия. Действующая редакция всегда на этой странице, дата последнего обновления указана вверху. Если вы продолжаете пользоваться Приложением после вступления изменений в силу, действуют обновленные условия.',
      ]],
      ['13. Связь', [`Вопросы об этих условиях: ${MAIL}.`]],
    ],
  },
};

const cookies = {
  en: {
    file: 'cookies.html', title: 'Cookie Policy',
    desc: 'This website uses no cookies. What we count instead, and what the app stores on your device.',
    intro: [
      '<b>In short:</b> this website uses no cookies and stores nothing in your browser. That is why you have not seen a cookie banner: there is nothing to agree to.',
    ],
    sections: [
      ['1. On this website', [
        [
          'No cookies of any kind, neither ours nor anyone else’s.',
          'No local storage, session storage or any other storage in your browser.',
          'No fingerprinting and no identifier that could link one visit to another.',
          'No third-party analytics, advertising pixels or social media widgets.',
          'Fonts are served from this domain, so opening a page sends no request to a third party for them.',
        ],
      ]],
      ['2. What we count instead', [
        'We count page views with our own counter, which writes to our own database. For each page view it records:',
        [
          'which page was opened;',
          'the domain you came from, if any, for example google.com, never the full address of that page;',
          'your browser’s language, as two letters;',
          'whether the screen is phone-sized, tablet-sized or larger;',
          'whether the App Store button was pressed.',
        ],
        'It records no IP address and no identifier. Because of that we can count page views but not people, and we accept that.',
      ]],
      ['3. Hosting logs', [
        `The website is hosted on GitHub Pages, which keeps standard access logs, including IP addresses, for security and abuse prevention. These logs are kept by GitHub, not by us, and we do not read or analyse them. See <a href="${GH}">GitHub’s privacy statement</a>.`,
      ]],
      ['4. In the App', [
        'The App does not use web cookies. It keeps your sign-in session on your device so that you stay signed in between launches. This is strictly necessary for the App to work, needs no consent and is removed when you sign out or delete the App.',
      ]],
      ['5. Other websites', [
        'The App Store link takes you to Apple. Apple’s own cookie and privacy policies apply on its website.',
      ]],
      ['6. If this changes', [
        'If we ever want to use a cookie that is not strictly necessary, we will update this policy first and ask for your consent before setting it.',
      ]],
      ['7. Contact', [`Questions about this policy: ${MAIL}. More about personal data in our <a href="privacy.html">Privacy Policy</a>.`]],
    ],
  },

  ru: {
    file: 'cookies-ru.html', title: 'Политика cookie',
    desc: 'Сайт не использует cookie. Что мы считаем вместо этого и что приложение хранит на устройстве.',
    intro: [
      '<b>Коротко:</b> этот сайт не использует cookie и ничего не сохраняет в вашем браузере. Поэтому вы не видели баннера про cookie: соглашаться не на что.',
    ],
    sections: [
      ['1. На этом сайте', [
        [
          'Никаких cookie, ни наших, ни чужих.',
          'Никакого локального хранилища, хранилища сеанса и других способов хранения в браузере.',
          'Никаких цифровых отпечатков и идентификаторов, по которым можно связать одно посещение с другим.',
          'Никакой сторонней аналитики, рекламных пикселей и виджетов соцсетей.',
          'Шрифты загружаются с этого же домена, поэтому при открытии страницы за ними не идет запрос к третьим лицам.',
        ],
      ]],
      ['2. Что мы считаем вместо этого', [
        'Просмотры страниц считает наш собственный счетчик, который пишет в нашу же базу данных. О каждом просмотре он записывает:',
        [
          'какая страница открыта;',
          'домен, с которого вы пришли, если он есть, например google.com, и никогда не полный адрес той страницы;',
          'язык браузера двумя буквами;',
          'размер экрана: телефон, планшет или больше;',
          'была ли нажата кнопка App Store.',
        ],
        'IP-адрес и идентификаторы не записываются. Из-за этого мы можем посчитать просмотры, но не людей, и принимаем это.',
      ]],
      ['3. Журналы хостинга', [
        `Сайт размещен на GitHub Pages, который ведет стандартные журналы обращений, включая IP-адреса, для безопасности и защиты от злоупотреблений. Эти журналы хранит GitHub, а не мы, и мы их не читаем и не анализируем. Подробнее в <a href="${GH}">заявлении GitHub о конфиденциальности</a>.`,
      ]],
      ['4. В Приложении', [
        'Приложение не использует веб-cookie. Оно хранит сессию входа на вашем устройстве, чтобы вам не приходилось входить при каждом запуске. Это строго необходимо для работы Приложения, не требует согласия и удаляется, когда вы выходите из аккаунта или удаляете Приложение.',
      ]],
      ['5. Другие сайты', [
        'Ссылка на App Store ведет на сайт Apple. Там действуют политики cookie и конфиденциальности Apple.',
      ]],
      ['6. Если что-то изменится', [
        'Если мы когда-нибудь захотим использовать cookie, без которого сайт может обойтись, мы сначала обновим эту политику и спросим вашего согласия, прежде чем его установить.',
      ]],
      ['7. Связь', [`Вопросы об этой политике: ${MAIL}. Подробнее о персональных данных в <a href="privacy-ru.html">политике конфиденциальности</a>.`]],
    ],
  },
};

module.exports = { UPDATED, DOCS: [privacy, terms, cookies] };
