export const LANGS = ["ru", "kk"] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = "ru";

export const isLang = (value: unknown): value is Lang =>
  typeof value === "string" && (LANGS as readonly string[]).includes(value);

type StatItem = { value: string; suffix?: string; caption: string };

type ClubKey = "english" | "dance" | "music" | "robotics";

export type Dictionary = {
  meta: { title: string; description: string };
  langName: string;
  nav: { home: string; about: string; clubs: string; gallery: string; contacts: string };
  header: {
    contact: string;
    openMenu: string;
    closeMenu: string;
    menu: string;
    switchLang: string;
    homeLink: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    text: string;
    primary: string;
    secondary: string;
    photoAlt: string;
    placeholder: string;
    badge: string;
  };
  stats: {
    label: string;
    groups: StatItem;
    ages: StatItem;
    meals: StatItem;
    hours: StatItem;
  };
  about: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    points: { value: string; label: string }[];
    photoAlt: string;
    videoLabel: string;
    placeholder: string;
  };
  clubs: {
    eyebrow: string;
    title: string;
    text: string;
    items: Record<ClubKey, { title: string; text: string }>;
  };
  gallery: {
    eyebrow: string;
    title: string;
    text: string;
    more: string;
    less: string;
    emptyTitle: string;
    emptyText: string;
    open: (n: number) => string;
    alt: (n: number) => string;
    dialog: string;
    close: string;
    prev: string;
    next: string;
    counter: (n: number, total: number) => string;
  };
  schedule: {
    eyebrow: string;
    title: string;
    text: string;
    opens: string;
    closes: string;
    items: {
      hours: { label: string; value: string };
      age: { label: string; value: string };
      langs: { label: string; value: string };
      meals: { label: string; value: string };
    };
    note: string;
  };
  contacts: {
    eyebrow: string;
    title: string;
    text: string;
    address: string;
    phone: string;
    instagram: string;
    hours: string;
    call: string;
    whatsapp: string;
    openInstagram: string;
    route: string;
    mapTitle: string;
    mapText: string;
    mapOpen: string;
    mapFrame: string;
    mapActivate: string;
  };
  video: { play: string; pause: string; mute: string; unmute: string };
  footer: { text: string; nav: string; contacts: string; rights: string; top: string };
  a11y: { skip: string; newTab: string };
};

const ru: Dictionary = {
  meta: {
    title: "Dameli MK — детский сад в Алматы",
    description:
      "Dameli MK — детский сад в Алматы (мкр. Жетысу-3) для детей от 2 до 6 лет. 4 группы, обучение на казахском и русском языках, 4-разовое питание, кружки: английский, хореография, музыка, робототехника.",
  },
  langName: "Русский",
  nav: { home: "Главная", about: "О садике", clubs: "Кружки", gallery: "Галерея", contacts: "Контакты" },
  header: {
    contact: "Связаться",
    openMenu: "Открыть меню",
    closeMenu: "Закрыть меню",
    menu: "Меню",
    switchLang: "Язык сайта",
    homeLink: "Dameli MK — на главную",
  },
  hero: {
    eyebrow: "Детский сад в Алматы",
    title: "Место, где каждый день",
    titleAccent: "начинается с открытий",
    text: "Dameli MK — детский сад в Алматы для детей от 2 до 6 лет. Казахский и русский языки обучения, интересные занятия и новые открытия каждый день.",
    primary: "Записаться на консультацию",
    secondary: "Узнать больше",
    photoAlt: "Дети в детском саду Dameli MK",
    placeholder: "Скоро здесь будет фотография нашего сада",
    badge: "лет — возраст воспитанников",
  },
  stats: {
    label: "Коротко о саде",
    groups: { value: "4", caption: "группы" },
    ages: { value: "2–6", suffix: " лет", caption: "возраст детей" },
    meals: { value: "4", suffix: "-разовое", caption: "питание" },
    hours: { value: "08:00–18:30", caption: "режим работы" },
  },
  about: {
    eyebrow: "О детском саде",
    title: "Счастливое детство начинается здесь",
    paragraphs: [
      "Dameli MK — детский сад в микрорайоне Жетысу-3 в Алматы. Мы принимаем детей от 2 до 6 лет: в саду работают 4 группы, обучение ведётся на казахском и русском языках.",
      "День ребёнка наполнен занятиями, играми и общением со сверстниками. Дополнительные кружки — английский язык, хореография, музыка и робототехника — помогают пробовать новое и находить любимые увлечения.",
      "Дети питаются 4 раза в день, а сад открыт с 08:00 до 18:30.",
    ],
    points: [
      { value: "4", label: "группы" },
      { value: "2", label: "языка обучения" },
      { value: "4", label: "кружка" },
    ],
    photoAlt: "Жизнь детского сада Dameli MK",
    videoLabel: "Видео о детском саде Dameli MK",
    placeholder: "Здесь появится фото или видео",
  },
  clubs: {
    eyebrow: "Дополнительные занятия",
    title: "Наши кружки",
    text: "Занятия, на которых ребёнок пробует новое и раскрывает свои интересы.",
    items: {
      english: {
        title: "Английский язык",
        text: "Первые слова, песенки и игры на английском — легко и понятно.",
      },
      dance: {
        title: "Хореография",
        text: "Движение под музыку, чувство ритма и пластика.",
      },
      music: {
        title: "Музыка",
        text: "Песни, ритм и знакомство с миром звуков.",
      },
      robotics: {
        title: "Робототехника",
        text: "Конструирование и первые шаги в логике и технике через игру.",
      },
    },
  },
  gallery: {
    eyebrow: "Фотогалерея",
    title: "Моменты из жизни сада",
    text: "Как проходят наши дни — в фотографиях.",
    more: "Показать ещё",
    less: "Свернуть",
    emptyTitle: "Фотографии скоро появятся",
    emptyText: "Мы готовим снимки из жизни Dameli MK. Загляните сюда чуть позже или посмотрите наш Instagram.",
    open: (n) => `Открыть фотографию ${n} в полноэкранном режиме`,
    alt: (n) => `Фотография из жизни детского сада Dameli MK, ${n}`,
    dialog: "Просмотр фотографий",
    close: "Закрыть",
    prev: "Предыдущая фотография",
    next: "Следующая фотография",
    counter: (n, total) => `${n} из ${total}`,
  },
  schedule: {
    eyebrow: "Наш распорядок",
    title: "День в Dameli MK",
    text: "Основное, что важно знать родителям.",
    opens: "Открытие",
    closes: "Закрытие",
    items: {
      hours: { label: "Режим работы", value: "08:00–18:30" },
      age: { label: "Возраст", value: "2–6 лет" },
      langs: { label: "Языки", value: "Казахский и русский" },
      meals: { label: "Питание", value: "4 раза в день" },
    },
    note: "Подробный распорядок дня уточняйте по телефону.",
  },
  contacts: {
    eyebrow: "Контакты",
    title: "Приходите знакомиться!",
    text: "Позвоните или напишите — ответим на ваши вопросы.",
    address: "Адрес",
    phone: "Телефон",
    instagram: "Instagram",
    hours: "Время работы",
    call: "Позвонить",
    whatsapp: "Написать в WhatsApp",
    openInstagram: "Открыть Instagram",
    route: "Построить маршрут",
    mapTitle: "Мы на карте",
    mapText: "Откройте 2GIS, чтобы посмотреть адрес на карте.",
    mapOpen: "Открыть в 2GIS",
    mapFrame: "Карта 2GIS: детский сад Dameli MK",
    mapActivate: "Нажмите, чтобы двигать карту",
  },
  video: { play: "Воспроизвести видео", pause: "Поставить на паузу", mute: "Выключить звук", unmute: "Включить звук" },
  footer: {
    text: "Детский сад в Алматы для детей от 2 до 6 лет. Обучение на казахском и русском языках.",
    nav: "Навигация",
    contacts: "Контакты",
    rights: "Все права защищены.",
    top: "Наверх",
  },
  a11y: { skip: "Перейти к содержимому", newTab: "откроется в новой вкладке" },
};

const kk: Dictionary = {
  meta: {
    title: "Dameli MK — Алматыдағы балабақша",
    description:
      "Dameli MK — Алматыдағы (Жетісу-3 ш/а) 2 жастан 6 жасқа дейінгі балаларға арналған балабақша. 4 топ, қазақ және орыс тілдерінде оқыту, 4 мезгіл тамақтану, үйірмелер: ағылшын тілі, хореография, музыка, робототехника.",
  },
  langName: "Қазақша",
  nav: { home: "Басты бет", about: "Біз туралы", clubs: "Үйірмелер", gallery: "Галерея", contacts: "Байланыс" },
  header: {
    contact: "Байланысу",
    openMenu: "Мәзірді ашу",
    closeMenu: "Мәзірді жабу",
    menu: "Мәзір",
    switchLang: "Сайт тілі",
    homeLink: "Dameli MK — басты бетке",
  },
  hero: {
    eyebrow: "Алматыдағы балабақша",
    title: "Әр күні",
    titleAccent: "жаңалықтан басталатын орын",
    text: "Dameli MK — Алматыдағы 2 жастан 6 жасқа дейінгі балаларға арналған балабақша. Қазақ және орыс тілдерінде оқыту, қызықты сабақтар және күн сайын жаңа ашылулар.",
    primary: "Кеңеске жазылу",
    secondary: "Толығырақ",
    photoAlt: "Dameli MK балабақшасындағы балалар",
    placeholder: "Жақында мұнда балабақшамыздың фотосы болады",
    badge: "жастағы балаларға арналған",
  },
  stats: {
    label: "Балабақша туралы қысқаша",
    groups: { value: "4", caption: "топ" },
    ages: { value: "2–6", suffix: " жас", caption: "балалардың жасы" },
    meals: { value: "4", suffix: " мезгіл", caption: "тамақтану" },
    hours: { value: "08:00–18:30", caption: "жұмыс уақыты" },
  },
  about: {
    eyebrow: "Балабақша туралы",
    title: "Бақытты балалық шақ осы жерден басталады",
    paragraphs: [
      "Dameli MK — Алматы қаласы, Жетісу-3 шағын ауданындағы балабақша. Біз 2 жастан 6 жасқа дейінгі балаларды қабылдаймыз: балабақшада 4 топ жұмыс істейді, оқыту қазақ және орыс тілдерінде жүргізіледі.",
      "Баланың күні сабақтарға, ойындарға және құрдастарымен араласуға толы. Қосымша үйірмелер — ағылшын тілі, хореография, музыка және робототехника — жаңа нәрсені байқап көруге және сүйікті ісін табуға көмектеседі.",
      "Балалар күніне 4 рет тамақтанады, балабақша 08:00-ден 18:30-ға дейін жұмыс істейді.",
    ],
    points: [
      { value: "4", label: "топ" },
      { value: "2", label: "оқыту тілі" },
      { value: "4", label: "үйірме" },
    ],
    photoAlt: "Dameli MK балабақшасының өмірі",
    videoLabel: "Dameli MK балабақшасы туралы бейне",
    placeholder: "Мұнда фото немесе бейне болады",
  },
  clubs: {
    eyebrow: "Қосымша сабақтар",
    title: "Біздің үйірмелер",
    text: "Бала жаңа нәрсені байқап көріп, өз қызығушылығын ашатын сабақтар.",
    items: {
      english: {
        title: "Ағылшын тілі",
        text: "Алғашқы сөздер, әндер мен ойындар — ағылшын тілімен жеңіл әрі түсінікті танысу.",
      },
      dance: {
        title: "Хореография",
        text: "Музыкамен қозғалу, ырғақты сезіну және икемділік.",
      },
      music: {
        title: "Музыка",
        text: "Әндер, ырғақ және дыбыстар әлемімен танысу.",
      },
      robotics: {
        title: "Робототехника",
        text: "Ойын арқылы құрастыру, логика мен техникаға алғашқы қадамдар.",
      },
    },
  },
  gallery: {
    eyebrow: "Фотогалерея",
    title: "Балабақша өмірінен сәттер",
    text: "Күндеріміз қалай өтеді — суреттерде.",
    more: "Тағы көрсету",
    less: "Жасыру",
    emptyTitle: "Фотосуреттер жақында қосылады",
    emptyText: "Біз Dameli MK өмірінен суреттер дайындап жатырмыз. Кейінірек кіріңіз немесе Instagram парақшамызды қараңыз.",
    open: (n) => `${n}-фотоны толық экранда ашу`,
    alt: (n) => `Dameli MK балабақшасының өмірінен фото, ${n}`,
    dialog: "Фотосуреттерді қарау",
    close: "Жабу",
    prev: "Алдыңғы фото",
    next: "Келесі фото",
    counter: (n, total) => `${n} / ${total}`,
  },
  schedule: {
    eyebrow: "Күн тәртібі",
    title: "Dameli MK-дағы күн",
    text: "Ата-аналарға білу маңызды негізгі мәліметтер.",
    opens: "Ашылуы",
    closes: "Жабылуы",
    items: {
      hours: { label: "Жұмыс уақыты", value: "08:00–18:30" },
      age: { label: "Жасы", value: "2–6 жас" },
      langs: { label: "Тілдер", value: "Қазақ және орыс тілдері" },
      meals: { label: "Тамақтану", value: "Күніне 4 рет" },
    },
    note: "Күн тәртібі туралы толығырақ телефон арқылы біліңіз.",
  },
  contacts: {
    eyebrow: "Байланыс",
    title: "Танысуға келіңіздер!",
    text: "Қоңырау шалыңыз немесе жазыңыз — сұрақтарыңызға жауап береміз.",
    address: "Мекенжай",
    phone: "Телефон",
    instagram: "Instagram",
    hours: "Жұмыс уақыты",
    call: "Қоңырау шалу",
    whatsapp: "WhatsApp-қа жазу",
    openInstagram: "Instagram-ды ашу",
    route: "Маршрут құру",
    mapTitle: "Біз картада",
    mapText: "Мекенжайды картадан көру үшін 2GIS-ті ашыңыз.",
    mapOpen: "2GIS-те ашу",
    mapFrame: "2GIS картасы: Dameli MK балабақшасы",
    mapActivate: "Картаны жылжыту үшін басыңыз",
  },
  video: { play: "Бейнені қосу", pause: "Кідірту", mute: "Дыбысты өшіру", unmute: "Дыбысты қосу" },
  footer: {
    text: "Алматыдағы 2–6 жастағы балаларға арналған балабақша. Оқыту қазақ және орыс тілдерінде.",
    nav: "Навигация",
    contacts: "Байланыс",
    rights: "Барлық құқықтар қорғалған.",
    top: "Жоғары",
  },
  a11y: { skip: "Негізгі мазмұнға өту", newTab: "жаңа бетте ашылады" },
};

export const dictionaries: Record<Lang, Dictionary> = { ru, kk };
