/* CookFusion. Поведение главной страницы. Без библиотек. */
(function () {
  // Шапка получает фон, как только страница уехала с самого верха
  var top = document.getElementById('top');
  function onScroll() { if (top) top.classList.toggle('scrolled', window.scrollY > 12); }
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Блоки появляются при прокрутке. Без поддержки IntersectionObserver
  // показываем все сразу: содержимое важнее эффекта.
  var items = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  // Липкая кнопка на телефоне: появляется, когда главная кнопка ушла
  // за экран, и прячется у финального призыва, чтобы не дублировать его
  var sticky = document.getElementById('sticky');
  var heroCta = document.getElementById('hero-cta');
  var finalCta = document.getElementById('download');
  if (sticky && heroCta && finalCta && 'IntersectionObserver' in window) {
    var heroGone = false, finalSeen = false;
    var update = function () {
      var show = heroGone && !finalSeen;
      sticky.classList.toggle('show', show);
      sticky.setAttribute('aria-hidden', show ? 'false' : 'true');
    };
    new IntersectionObserver(function (e) {
      heroGone = !e[0].isIntersecting && e[0].boundingClientRect.top < 0; update();
    }).observe(heroCta);
    new IntersectionObserver(function (e) { finalSeen = e[0].isIntersecting; update(); },
      { threshold: 0.2 }).observe(finalCta);
  }

  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();
})();

/* Свой счетчик посещений. Что именно считается и чего не считается,
   написано в политике конфиденциальности, раздел 8.

   Ни куки, ни localStorage, ни отпечатков браузера. Из-за этого
   уникальных посетителей не посчитать, и мы их не считаем, а не
   притворяемся, что можем. Сбой счетчика не должен ломать страницу,
   поэтому все внутри try и без await. */
(function () {
  var URL = 'https://vimdtngoecdhkliixgit.supabase.co/rest/v1/rpc/track_site';
  var KEY = 'sb_publishable_gPDI3LlWFukfehmKPcIYTw_nYsv5xVU';

  function device() {
    var w = window.innerWidth || 1024;
    return w < 768 ? 'mobile' : w < 1024 ? 'tablet' : 'desktop';
  }

  function send(kind) {
    try {
      fetch(URL, {
        method: 'POST',
        headers: { apikey: KEY, Authorization: 'Bearer ' + KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          p_kind: kind,
          p_path: location.pathname,
          /* Только домен источника: полный адрес чужой страницы нас не касается */
          p_ref: document.referrer || null,
          p_lang: navigator.language || null,
          p_device: device(),
        }),
        keepalive: true,
      }).catch(function () {});
    } catch (e) { /* счетчик не важнее страницы */ }
  }

  send('view');

  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href*="apps.apple.com"]');
    if (a) send('store_click');
  });
})();
