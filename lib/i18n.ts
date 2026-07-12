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
