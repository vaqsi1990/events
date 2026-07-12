export const locales = ["ka", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ka";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

const dictionaries = {
  ka: {
    meta: {
      title: "Event — ღონისძიებების კომპანია",
      description: "პროფესიონალური ღონისძიებების ორგანიზება",
    },
    nav: {
      services: "სერვისები",
      works: "ნამუშევრები",
      about: "ჩვენს შესახებ",
      contact: "კონტაქტები",
      mainAria: "მთავარი ნავიგაცია",
      mobileAria: "მობილური ნავიგაცია",
      openMenu: "მენიუს გახსნა",
      closeMenu: "მენიუს დახურვა",
    },
    hero: {
      title: "ვქმნით მომენტებს, რომლებიც სამუდამოდ დაგამახსოვრდებათ",
      contactCta: "დაგვიკავშირდით",
      worksCta: "ნამუშევრები",
      imageAlt: "ელეგანტური ღონისძიების სივრცე",
    },
    services: {
      eyebrow: "სერვისები",
      title: "ნება მოგვეცით, გაგაოცოთ და შთაგაგონოთ.",
      cta: "სერვისები",
      explore: "გაიცანით",
      items: [
        {
          id: "social",
          label: "სოციალური ღონისძიებები",
          heading: "შეხვედრები, რომლებიც რჩება მეხსიერებაში.",
          image: "/hero.jpg",
          imageAlt: "სოციალური ღონისძიება",
        },
        {
          id: "nonprofit",
          label: "არაკომერციული",
          heading: "მიზანი, რომელიც ლამაზად ჟღერს.",
          image: "/hero.jpg",
          imageAlt: "არაკომერციული ღონისძიება",
        },
        {
          id: "corporate",
          label: "კორპორატიული",
          heading: "ბიზნესი, რომელიც შთაბეჭდილებას ტოვებს.",
          image: "/hero.jpg",
          imageAlt: "კორპორატიული ღონისძიება",
        },
        {
          id: "consulting",
          label: "კონსულტა",
          heading: "იდეიდან გამორჩეულ გამოცდილებამდე.",
          image: "/hero.jpg",
          imageAlt: "კონსულტა",
        },
      ],
    },
    language: {
      ka: "ქარ",
      en: "EN",
      switchAria: "ენის არჩევა",
    },
  },
  en: {
    meta: {
      title: "Event — Event Company",
      description: "Professional planning and organization for unforgettable events",
    },
    nav: {
      services: "Services",
      works: "Works",
      about: "About Us",
      contact: "Contact",
      mainAria: "Main navigation",
      mobileAria: "Mobile navigation",
      openMenu: "Open menu",
      closeMenu: "Close menu",
    },
    hero: {
      title: "We create moments you'll remember forever",
      contactCta: "Contact Us",
      worksCta: "Works",
      imageAlt: "Elegant event venue",
    },
    services: {
      eyebrow: "What We Do",
      title: "Let us dazzle and inspire you.",
      cta: "What We Do",
      explore: "Explore",
      items: [
        {
          id: "social",
          label: "Social Events",
          heading: "Gatherings that linger in memory.",
          image: "/hero.jpg",
          imageAlt: "Social event",
        },
        {
          id: "nonprofit",
          label: "Non-Profit",
          heading: "A cause, told beautifully.",
          image: "/hero.jpg",
          imageAlt: "Non-profit event",
        },
        {
          id: "corporate",
          label: "Corporate",
          heading: "Business that leaves an impression.",
          image: "/hero.jpg",
          imageAlt: "Corporate event",
        },
        {
          id: "consulting",
          label: "Consultancy",
          heading: "From idea to a signature experience.",
          image: "/hero.jpg",
          imageAlt: "Consultancy",
        },
      ],
    },
    language: {
      ka: "KA",
      en: "EN",
      switchAria: "Choose language",
    },
  },
} as const;

export type Dictionary = (typeof dictionaries)[Locale];

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export function getLocalizedPath(locale: Locale, path: string = "/") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized === "/") return `/${locale}`;
  return `/${locale}${normalized}`;
}
