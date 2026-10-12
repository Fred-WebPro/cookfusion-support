/**
 * Готовит картинки для сайта из исходников проекта.
 *   node support-site/build-assets.js
 *
 * Экраны берутся из pitch/screens: это настоящие снимки приложения в
 * корпусе телефона, 1809 на 3817. Углы корпуса в JPEG залиты бумажным
 * цветом, поэтому здесь они обрезаются в прозрачность: на темной секции
 * светлые уголки выглядели бы браком.
 *
 * Плюс картинки для превью ссылки (og:image). Мессенджеры и соцсети не
 * понимают SVG, нужен растр 1200 на 630.
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(__dirname, 'img');
fs.mkdirSync(OUT, { recursive: true });

const SCREENS = ['1-scan', '2-feed', '3-family', '4-plan', '5-shop', '6-cook'];
const WIDTHS = [400, 800];
const PHOTOS = { hero: [1200], pasta: [900], bowl: [900], salad: [900], chicken: [900] };

// Радиус угла корпуса измерен по снимку: рамка на диагонали начинается
// с 66-го пикселя, это окружность радиусом около 225 при ширине 1809.
const SRC_W = 1809, SRC_H = 3817, CORNER = 228;

async function screen(lang, name) {
  const src = path.join(ROOT, 'pitch', 'screens', lang, name + '.jpg');
  const mask = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${SRC_W}" height="${SRC_H}">`
    + `<rect width="${SRC_W}" height="${SRC_H}" rx="${CORNER}" fill="#fff"/></svg>`);
  const cut = await sharp(src).ensureAlpha()
    .composite([{ input: mask, blend: 'dest-in' }]).png().toBuffer();
  for (const w of WIDTHS) {
    await sharp(cut).resize({ width: w })
      .webp({ quality: 84, alphaQuality: 90 })
      .toFile(path.join(OUT, `${name}-${lang}-${w}.webp`));
  }
}

async function photo(name, widths) {
  const src = path.join(ROOT, 'store-assets', 'photos', name + '.jpg');
  for (const w of widths) {
    await sharp(src).resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 80 }).toFile(path.join(OUT, `${name}-${w}.webp`));
  }
}

// ── Картинка превью ссылки ────────────────────────────────────
const OG = {
  en: { l1: 'Dinner for everyone', l2: 'at the table.', l3: 'From one photo.',
        sub: 'Free on iPhone and iPad' },
  ru: { l1: 'Ужин на всю семью,', l2: 'за одно фото', l3: '',
        sub: 'Бесплатно для iPhone и iPad' },
};

async function og(lang) {
  const t = OG[lang];
  const mark = fs.readFileSync(path.join(ROOT, 'assets', 'brand', 'logo', 'logo-inverse.svg'), 'utf8');
  const markBody = mark.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
  const vb = mark.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/);
  const k = 44 / +vb[2];
  const serif = lang === 'ru'
    ? "'Segoe UI', 'SF Pro Display', Helvetica, Arial, sans-serif"
    : "Georgia, 'Times New Roman', serif";
  const weight = lang === 'ru' ? 700 : 700;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <defs>
      <radialGradient id="g" cx="0.78" cy="0.35" r="0.6">
        <stop offset="0" stop-color="#2C4A38"/><stop offset="1" stop-color="#14261B"/>
      </radialGradient>
      <radialGradient id="w" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stop-color="#DF7B31" stop-opacity="0.28"/>
        <stop offset="1" stop-color="#DF7B31" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#g)"/>
    <circle cx="930" cy="330" r="360" fill="url(#w)"/>
    <g transform="translate(72 64) scale(${k.toFixed(4)})">${markBody}</g>
    <text x="72" y="${t.l3 ? 270 : 300}" font-family="${serif}" font-size="62" font-weight="${weight}"
      fill="#FBFAF6" letter-spacing="-1.2">${t.l1}</text>
    <text x="72" y="${t.l3 ? 344 : 374}" font-family="${serif}" font-size="62" font-weight="${weight}"
      fill="#FBFAF6" letter-spacing="-1.2">${t.l2}</text>
    ${t.l3 ? `<text x="72" y="418" font-family="${serif}" font-size="62" font-weight="${weight}"
      fill="#E9A669" letter-spacing="-1.2">${t.l3}</text>` : ''}
    <rect x="72" y="476" width="${lang === 'ru' ? 344 : 300}" height="52" rx="26" fill="#FBFAF6" fill-opacity="0.1"/>
    <text x="96" y="510" font-family="'Segoe UI', Helvetica, Arial, sans-serif" font-size="22"
      font-weight="600" fill="#FBFAF6">${t.sub}</text>
  </svg>`;
  const phoneH = 560;
  const phone = await sharp(path.join(OUT, `1-scan-${lang}-800.webp`))
    .resize({ height: phoneH }).png().toBuffer();
  const phone2 = await sharp(path.join(OUT, `3-family-${lang}-800.webp`))
    .resize({ height: phoneH - 60 }).png().toBuffer();
  await sharp(Buffer.from(svg))
    .composite([
      { input: phone2, left: 1010, top: 95 },
      { input: phone, left: 800, top: 48 },
    ])
    .jpeg({ quality: 88 }).toFile(path.join(OUT, `og-${lang}.jpg`));
}

// Значки сайта: вкладка браузера и экран «Домой» на iPhone
async function icons() {
  const B = path.join(ROOT, 'assets', 'brand', 'logo');
  fs.copyFileSync(path.join(B, 'favicon.svg'), path.join(__dirname, 'favicon.svg'));
  await sharp(fs.readFileSync(path.join(B, 'favicon.svg')), { density: 300 }).resize(32, 32)
    .png().toFile(path.join(__dirname, 'favicon-32.png'));
  await sharp(fs.readFileSync(path.join(B, 'app-icon.svg')), { density: 72 }).resize(180, 180)
    .flatten({ background: '#14261B' }).png().toFile(path.join(__dirname, 'apple-touch-icon.png'));
}

(async () => {
  await icons();
  for (const lang of ['en', 'ru']) for (const s of SCREENS) await screen(lang, s);
  for (const [n, ws] of Object.entries(PHOTOS)) await photo(n, ws);
  for (const lang of ['en', 'ru']) await og(lang);
  const files = fs.readdirSync(OUT);
  const kb = files.reduce((n, f) => n + fs.statSync(path.join(OUT, f)).size, 0) / 1024;
  console.log(`картинок: ${files.length}, вес ${Math.round(kb)} КБ`);
})();
