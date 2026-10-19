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

## Данные и карта

Все контакты — в `src/config/site.ts`, тексты на двух языках — в `src/i18n/translations.ts`.

Точку 2GIS для «Жетысу-3, 58» подтвердить не удалось, поэтому карта ведёт на поиск адреса в 2GIS,
а «Построить маршрут» — на маршрут по адресу. Когда будет известна карточка организации в 2GIS,
укажите `twoGis.firmId` и `twoGis.coordinates` в `site.ts` — на странице автоматически появится
интерактивная карта 2GIS, а маршрут будет строиться в 2GIS.

## Деплой на Vercel

Импортируйте репозиторий в Vercel — настройки по умолчанию подходят.
По желанию задайте `NEXT_PUBLIC_SITE_URL` (например, `https://dameli.kz`) для canonical, Open Graph и sitemap.
