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
      about: "ჩვენს შესახებ",
      contact: "კონტაქტები",
      events: "ღონისძიებები",
      eventTypes: [
        { id: "private", label: "კერძო ღონისძიებები", href: "/events/private" },
        {
          id: "corporate",
          label: "კორპორატიული ღონისძიებები",
          href: "/events/corporate",
        },
        {
          id: "entertainment",
          label: "გასართობი ღონისძიებები",
          href: "/events/entertainment",
        },
        { id: "brand", label: "ბრენდული ღონისძიებები", href: "/events/brand" },
      ],
      mainAria: "მთავარი ნავიგაცია",
      mobileAria: "მობილური ნავიგაცია",
      openMenu: "მენიუს გახსნა",
      closeMenu: "მენიუს დახურვა",
    },
    hero: {
      title: "ვქმნით მომენტებს, რომლებიც სამუდამოდ დაგამახსოვრდებათ",
      contactCta: "დაგვიკავშირდით",
      eventsCta: "ღონისძიებები",
      imageAlt: "ელეგანტური ღონისძიების სივრცე",
    },
    services: {
      eyebrow: "ღონისძიებები",
      title: "ნება მოგვეცით, გაგაოცოთ და შთაგაგონოთ.",
      cta: "ღონისძიებები",
      explore: "გაიცანით",
      items: [
        {
          id: "private",
          label: "კერძო ღონისძიებები",
          heading: "პირადი მომენტები, რომლებიც სამუდამოდ რჩება.",
          image: "/hero.jpg",
          imageAlt: "კერძო ღონისძიება",
          gallery: [
            {
              id: "birthdays",
              label: "დაბადების დღეები",
              image: "/hero.jpg",
              imageAlt: "დაბადების დღე",
            },
            {
              id: "engagement",
              label: "ნიშნობა",
              image: "/hero.jpg",
              imageAlt: "ნიშნობა",
            },
            {
              id: "graduation",
              label: "გამოსაშვები საღამო",
              image: "/hero.jpg",
              imageAlt: "გამოსაშვები საღამო",
            },
          ],
        },
        {
          id: "corporate",
          label: "კორპორატიული ღონისძიებები",
          heading: "ბიზნესი, რომელიც შთაბეჭდილებას ტოვებს.",
          image: "/hero.jpg",
          imageAlt: "კორპორატიული ღონისძიება",
          gallery: [
            {
              id: "conferences",
              label: "კონფერენციები",
              image: "/hero.jpg",
              imageAlt: "კონფერენცია",
            },
            {
              id: "business-forums",
              label: "ბიზნეს ფორუმები",
              image: "/hero.jpg",
              imageAlt: "ბიზნეს ფორუმი",
            },
            {
              id: "seminars",
              label: "სემინარები",
              image: "/hero.jpg",
              imageAlt: "სემინარი",
            },
            {
              id: "trainings",
              label: "ტრენინგები",
              image: "/hero.jpg",
              imageAlt: "ტრენინგი",
            },
            {
              id: "presentations",
              label: "პრეზენტაციები",
              image: "/hero.jpg",
              imageAlt: "პრეზენტაცია",
            },
          ],
        },
        {
          id: "entertainment",
          label: "გასართობი ღონისძიებები",
          heading: "ატმოსფერო, რომელიც ყველას აერთიანებს.",
          image: "/hero.jpg",
          imageAlt: "გასართობი ღონისძიება",
          gallery: [
            {
              id: "concerts",
              label: "კონცერტები",
              image: "/hero.jpg",
              imageAlt: "კონცერტი",
            },
            {
              id: "festivals",
              label: "ფესტივალები",
              image: "/hero.jpg",
              imageAlt: "ფესტივალი",
            },
            {
              id: "cultural",
              label: "კულტურული ღონისძიებები",
              image: "/hero.jpg",
              imageAlt: "კულტურული ღონისძიება",
            },
            {
              id: "theatrical",
              label: "თეატრალური ღონისძიებები",
              image: "/hero.jpg",
              imageAlt: "თეატრალური ღონისძიება",
            },
          ],
        },
        {
          id: "brand",
          label: "ბრენდული ღონისძიებები",
          heading: "ბრენდი, რომელიც ცოცხლდება სივრცეში.",
          image: "/hero.jpg",
          imageAlt: "ბრენდული ღონისძიება",
          gallery: [
            {
              id: "brand-presentation",
              label: "ბრენდის პრეზენტაცია",
              image: "/hero.jpg",
              imageAlt: "ბრენდის პრეზენტაცია",
            },
            {
              id: "product-presentation",
              label: "პროდუქტის პრეზენტაცია",
              image: "/hero.jpg",
              imageAlt: "პროდუქტის პრეზენტაცია",
            },
            {
              id: "pr-events",
              label: "PR Events",
              image: "/hero.jpg",
              imageAlt: "PR Events",
            },
            {
              id: "promotional-events",
              label: "Promotional Events",
              image: "/hero.jpg",
              imageAlt: "Promotional Events",
            },
          ],
        },
      ],
    },
    language: {
      ka: "ქარ",
      en: "EN",
      switchAria: "ენის არჩევა",
    },
    rounds: {
      title: "ღონისძიების ორგანიზების ეტაპები",
      steps: [
        {
          title: "მიზნების განსაზღვრა",
          description:
            "ვაზუსტებთ ღონისძიების მიზნებს, აუდიტორიას და ბიუჯეტს — რომ ყველა შემდეგი ნაბიჯი სწორი მიმართულებით წავიდეს.",
        },
        {
          title: "კონცეფციის შემუშავება",
          description:
            "ვქმნით იდეას და ვამტკიცებთ ფორმატს: ატმოსფერო, სტილი და ის დეტალები, რომლებიც გამოცდილებას გამორჩეულს ხდის.",
        },
        {
          title: "სცენარი და თაიმინგი",
          description:
            "ვწერთ დეტალურ სცენარს და განრიგს — რომ დღე ზუსტად, მშვიდად და შთამბეჭდავად წარიმართოს.",
        },
        {
          title: "მომზადება და ორგანიზება",
          description:
            "ვაკოორდინირებთ ლოკაციას, მომწოდებლებს და გუნდს; ვაკონტროლებთ ვადებს და ყველა ტექნიკურ დეტალს.",
        },
        {
          title: "ღონისძიების კონტროლი",
          description:
            "ადგილზე ვმართავთ პროცესს თავიდან ბოლომდე — რომ თქვენ მხოლოდ მომენტით და სტუმრებით ისიამოვნოთ.",
        },
      ],
    },
    floatingContact: {
      open: "კონტაქტის გახსნა",
      close: "დახურვა",
      whatsapp: "WhatsApp",
      facebook: "Facebook",
      phone: "დარეკვა",
    },
  },
  en: {
    meta: {
      title: "Event — Event Company",
      description: "Professional planning and organization for unforgettable events",
    },
    nav: {
      about: "About Us",
      contact: "Contact",
      events: "Events",
      eventTypes: [
        { id: "private", label: "Private Events", href: "/events/private" },
        {
          id: "corporate",
          label: "Corporate Events",
          href: "/events/corporate",
        },
        {
          id: "entertainment",
          label: "Entertainment Events",
          href: "/events/entertainment",
        },
        { id: "brand", label: "Brand Events", href: "/events/brand" },
      ],
      mainAria: "Main navigation",
      mobileAria: "Mobile navigation",
      openMenu: "Open menu",
      closeMenu: "Close menu",
    },
    hero: {
      title: "We create moments you'll remember forever",
      contactCta: "Contact Us",
      eventsCta: "Events",
      imageAlt: "Elegant event venue",
    },
    services: {
      eyebrow: "Events",
      title: "Let us dazzle and inspire you.",
      cta: "Events",
      explore: "Explore",
      items: [
        {
          id: "private",
          label: "Private Events",
          heading: "Personal moments that stay forever.",
          image: "/hero.jpg",
          imageAlt: "Private event",
          gallery: [
            {
              id: "birthdays",
              label: "Birthdays",
              image: "/hero.jpg",
              imageAlt: "Birthday celebration",
            },
            {
              id: "engagement",
              label: "Engagement",
              image: "/hero.jpg",
              imageAlt: "Engagement",
            },
            {
              id: "graduation",
              label: "Graduation Evening",
              image: "/hero.jpg",
              imageAlt: "Graduation evening",
            },
          ],
        },
        {
          id: "corporate",
          label: "Corporate Events",
          heading: "Business that leaves an impression.",
          image: "/hero.jpg",
          imageAlt: "Corporate event",
          gallery: [
            {
              id: "conferences",
              label: "Conferences",
              image: "/hero.jpg",
              imageAlt: "Conference",
            },
            {
              id: "business-forums",
              label: "Business Forums",
              image: "/hero.jpg",
              imageAlt: "Business forum",
            },
            {
              id: "seminars",
              label: "Seminars",
              image: "/hero.jpg",
              imageAlt: "Seminar",
            },
            {
              id: "trainings",
              label: "Trainings",
              image: "/hero.jpg",
              imageAlt: "Training",
            },
            {
              id: "presentations",
              label: "Presentations",
              image: "/hero.jpg",
              imageAlt: "Presentation",
            },
          ],
        },
        {
          id: "entertainment",
          label: "Entertainment Events",
          heading: "An atmosphere that brings everyone together.",
          image: "/hero.jpg",
          imageAlt: "Entertainment event",
          gallery: [
            {
              id: "concerts",
              label: "Concerts",
              image: "/hero.jpg",
              imageAlt: "Concert",
            },
            {
              id: "festivals",
              label: "Festivals",
              image: "/hero.jpg",
              imageAlt: "Festival",
            },
            {
              id: "cultural",
              label: "Cultural Events",
              image: "/hero.jpg",
              imageAlt: "Cultural event",
            },
            {
              id: "theatrical",
              label: "Theatrical Events",
              image: "/hero.jpg",
              imageAlt: "Theatrical event",
            },
          ],
        },
        {
          id: "brand",
          label: "Brand Events",
          heading: "A brand that comes alive in space.",
          image: "/hero.jpg",
          imageAlt: "Brand event",
          gallery: [
            {
              id: "brand-presentation",
              label: "Brand Presentation",
              image: "/hero.jpg",
              imageAlt: "Brand presentation",
            },
            {
              id: "product-presentation",
              label: "Product Presentation",
              image: "/hero.jpg",
              imageAlt: "Product presentation",
            },
            {
              id: "pr-events",
              label: "PR Events",
              image: "/hero.jpg",
              imageAlt: "PR Events",
            },
            {
              id: "promotional-events",
              label: "Promotional Events",
              image: "/hero.jpg",
              imageAlt: "Promotional Events",
            },
          ],
        },
      ],
    },
    language: {
      ka: "KA",
      en: "EN",
      switchAria: "Choose language",
    },
    rounds: {
      title: "Stages of Event Organization",
      steps: [
        {
          title: "Defining the goals",
          description:
            "We clarify the purpose, audience, and budget — so every next step moves in the right direction.",
        },
        {
          title: "Concept development",
          description:
            "We shape the idea and approve the format: atmosphere, style, and the details that make the experience distinctive.",
        },
        {
          title: "Script and timing",
          description:
            "We write a detailed script and schedule — so the day runs precisely, calmly, and impressively.",
        },
        {
          title: "Preparation and organization",
          description:
            "We coordinate the venue, vendors, and team; we manage deadlines and every technical detail.",
        },
        {
          title: "On-site control",
          description:
            "We run the process on site from start to finish — so you can simply enjoy the moment and your guests.",
        },
      ],
    },
    floatingContact: {
      open: "Open contact menu",
      close: "Close",
      whatsapp: "WhatsApp",
      facebook: "Facebook",
      phone: "Call",
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
