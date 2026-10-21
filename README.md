# Dameli MK — сайт детского сада

Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Motion · Lucide.

## Запуск

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run lint
npm run typecheck
```

## Структура: две композиции на одном адресе

```text
src/
├── app/                 page.tsx (читает фото, выбирает версию), layout.tsx, globals.css
├── website/             компьютерная версия (≥ 1024 px): Website.tsx, components/, sections/, website.css
├── mobile-website/      мобильная версия (< 1024 px): MobileWebsite.tsx, components/, sections/, mobile.css
├── shared/              общие компоненты (логотип, Lightbox, видео, декор), hooks/, utils/
├── config/site.ts       все факты о саде, ссылки (WhatsApp, Instagram, 2GIS, Google Drive)
├── i18n/                переводы RU / KZ
└── lib/images.ts        чтение фото из public/images при сборке
```

- Версия выбирается **по ширине экрана** (`shared/utils/layout.ts`, граница 1024 px), не по user-agent.
- В HTML с сервера есть обе версии, лишнюю скрывает CSS — поэтому нет ошибок гидратации и скачков.
  Сразу после загрузки `LayoutSwitch` оставляет на странице только нужную версию; при изменении
  ширины окна версии меняются, а читатель остаётся на том же разделе.
- Фото чужой версии не скачиваются: каждое фото обёрнуто в `LayoutPicture`, а главное фото
  предзагружается только для своей версии (`<link rel="preload" media=…>`).
- Компьютерная версия подстраивается и под ширину, и под высоту экрана (`clamp()`, `vh`):
  на 1366×768 и 1440×900 каждый основной раздел помещается под шапкой целиком.

## Фотографии — `public/images`

Изображения читаются **во время сборки** — после добавления файлов пересоберите проект / сделайте новый деплой.

| Файл | Где используется |
| --- | --- |
| `main-page.(jpg/jpeg/png/webp/avif)` | Главный экран (Hero) |
| `main-page2.(jpg/…)` или `main-page2.(mp4/webm/mov)` | Раздел «О садике» (фото или видео) |
| `main-page2-poster.jpg` | Необязательный кадр-обложка для видео |
| любые другие `.jpg .jpeg .png .webp .avif` | Фотогалерея (сортировка по имени: `1.jpg`, `2.jpg`, …) |

В галерею не попадают `main-page*`, файлы `logo*`, `icon*`, `favicon*`, `og*`, `*-poster` и точные копии главных фото.
Пока фото нет, показываются аккуратные заглушки.

Скриншоты с телефона часто содержат чёрные полосы сверху/снизу. Перед `npm run dev` и `npm run build`
автоматически запускается `npm run photos` (`scripts/prepare-photos.mjs`): он срезает только однородные
чёрные края и кладёт копии в `public/_trimmed/` (папка генерируется, в git не хранится). Оригиналы не меняются.

## Данные и карта

Все контакты — в `src/config/site.ts`, тексты на двух языках — в `src/i18n/translations.ts`.

Точку 2GIS для «Жетысу-3, 58» подтвердить не удалось, поэтому карта ведёт на поиск адреса в 2GIS,
а «Построить маршрут» — на маршрут по адресу. Когда будет известна карточка организации в 2GIS,
укажите `twoGis.firmId` и `twoGis.coordinates` в `site.ts` — на странице автоматически появится
интерактивная карта 2GIS, а маршрут будет строиться в 2GIS.

## Деплой на Vercel

Импортируйте репозиторий в Vercel — настройки по умолчанию подходят.
По желанию задайте `NEXT_PUBLIC_SITE_URL` (например, `https://dameli.kz`) для canonical, Open Graph и sitemap.
