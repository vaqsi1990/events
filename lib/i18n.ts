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
      portfolio: "პორტფოლიო",
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
      title: "ვქმნით დაუვიწყარ ღონისძიებებს იდეიდან სრულ რეალიზაციამდე",
      contactCta: "დაგვიკავშირდით",
      eventsCta: "ღონისძიებები",
      imageAlt: "ელეგანტური ღონისძიების სივრცე",
      prevAria: "წინა სლაიდი",
      nextAria: "შემდეგი სლაიდი",
      slides: [
        {
          title: "გუნდური ენერგია\nდაუვიწყარ გამოცდილებად",
          image: "/1.jpg",
          imageAlt: "კორპორატიული გუნდური ღონისძიება",
        },
        {
          title: "ავთენტური შეხვედრები\nდა ცოცხალი ატმოსფერო",
          image: "/2.jpg",
          imageAlt: "საზოგადოებრივი ღონისძიების ატმოსფერო",
        },
        {
          title: "კერძო ზეიმები,\nსადაც ყოველი დეტალი გულშია",
          image: "/3.jpg",
          imageAlt: "კერძო სადილის ზეიმი",
        }
      ],
    },
    services: {
      eyebrow: "ღონისძიებები",
      title: "ნება მოგვეცით, გაგაოცოთ და შთაგაგონოთ",
      cta: "ღონისძიებები",
      explore: "გაიცანით",
      items: [
        {
          id: "private",
          label: "კერძო ღონისძიებები",
          heading: "პირადი მომენტები, რომლებიც სამუდამოდ რჩება",
          image: "/private.jpg",
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
          heading: "ბიზნესი, რომელიც შთაბეჭდილებას ტოვებს",
          image: "/corporate.jpg",
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
          heading: "ატმოსფერო, რომელიც ყველას აერთიანებს",
          image: "/entertainment.jpg",
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
            heading: "ბრენდი, რომელიც ცოცხლდება სივრცეში",
          image: "/branded.jpg",
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
          title: "კონსულტაცია",
          description:
            "ვუსმენთ თქვენს მიზნებს, სურვილებს და ბიუჯეტს — რომ სწორი მიმართულება თავიდანვე განვსაზღვროთ.",
        },
        {
          title: "კონცეფციის შექმნა",
          description:
            "ვქმნით იდეას და ვამტკიცებთ ფორმატს: ატმოსფერო, სტილი და ის დეტალები, რომლებიც გამოცდილებას გამორჩეულს ხდის.",
        },
        {
          title: "დაგეგმვა",
          description:
            "ვაწყობთ დეტალურ გეგმას და განრიგს — რომ ყოველი ნაბიჯი ზუსტად და დროულად შესრულდეს.",
        },
        {
          title: "მომწოდებლების კოორდინაცია",
          description:
            "ვაკოორდინირებთ ლოკაციას, მომწოდებლებს და გუნდს; ვაკონტროლებთ ვადებს და ყველა ტექნიკურ დეტალს.",
        },
        {
          title: "ღონისძიების ჩატარება",
          description:
            "ადგილზე ვმართავთ პროცესს თავიდან ბოლომდე — რომ თქვენ მხოლოდ მომენტით და სტუმრებით ისიამოვნოთ.",
        },
      ],
    },
    partners: {
      eyebrow: "პარტნიორები",
      title: "ბრენდები, რომლებთანაც ვმუშაობთ",
      logos: [
        { alt: "Lierac Paris" },
        { alt: "Gori Mall" },
        { alt: "ჯაოკენი" },
        { alt: "Nuxe Paris" },
        { alt: "ფარმადეპო" },
        { alt: "Biographi Living" },
      ],
    },
    floatingContact: {
      open: "კონტაქტის გახსნა",
      close: "დახურვა",
      whatsapp: "WhatsApp",
      facebook: "Facebook",
      phone: "დარეკვა",
    },
    footer: {
      getInTouch: "დაგვიკავშირდით",
      phoneLabel: "ტელ",
      rights: "ყველა უფლება დაცულია",
    },
    about: {
      title: "ვქმნით გამოცდილებებს, რომლებიც შთაბეჭდილებას ტოვებს",
      image: "/hero.jpg",
      imageAlt: "ღონისძიების ატმოსფერო",
      paragraphs: [
        [
          {
            text: "ჩვენთვის თითოეული ღონისძიება უნიკალური ისტორიაა. იდეიდან განხორციელებამდე ვქმნით გამოცდილებას, რომელიც აერთიანებს კრეატიულობას, ხარისხს და პროფესიონალურ შესრულებას.",
          },
        ],
      ],
      cta: "გაიცანით ჩვენი გუნდი",
    },
    portfolio: {
      eyebrow: "პორტფოლიო",
      title: "პროექტები, რომლებიც შთაგაგონებთ",
      viewAll: "ყველას ნახვა",
      clickHint: "ისრებით შეცვალეთ სლაიდები",
      prevAria: "წინა სლაიდი",
      nextAria: "შემდეგი სლაიდი",
      pageTitle: "პორტფოლიო",
      pageIntro: "პროექტები, რომლებიც ჩვენს სტილს და გამოცდილებას გამოხატავს",
      slides: [
        {
          title: "კერძო ღონისძიება",
          description:
            "მყუდრო ატმოსფერო, გააზრებული დეტალები და მომენტები, რომლებიც სამუდამოდ რჩება.",
          image: "/only.jpg",
          imageAlt: "კერძო ღონისძიება",
        },
        {
          title: "კორპორატიული საღამო",
          description:
            "ბიზნეს შეკრება, რომელიც შთაბეჭდილებას ტოვებს — ზუსტი ორგანიზებით და ძლიერი ვიზუალით.",
          image: "/corp.jpg",
          imageAlt: "კორპორატიული ღონისძიება",
        },
        {
          title: "ბრენდის პრეზენტაცია",
          description:
            "ბრენდი, რომელიც სივრცეში ცოცხლდება — სტარტი, გაშვება და გამორჩეული შთაბეჭდილება.",
          image: "/brands.jpg",
          imageAlt: "ბრენდული ღონისძიება",
        },
        {
          title: "გასართობი საღამო",
          description:
            "ენერგია, მუსიკა და ატმოსფერო, რომელიც სტუმრებს ერთიან გამოცდილებად აერთიანებს.",
          image: "/dances.jpg",
          imageAlt: "გასართობი ღონისძიება",
        },
      ],
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
      portfolio: "Portfolio",
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
      title: "We create unforgettable events from idea to full realization",
      contactCta: "Contact Us",
      eventsCta: "Events",
      imageAlt: "Elegant event venue",
      prevAria: "Previous slide",
      nextAria: "Next slide",
      slides: [
        {
          title: "Team energy turned into\nunforgettable experiences",
          image: "/1.jpg",
          imageAlt: "Corporate team-building event",
        },
        {
          title: "Authentic gatherings\nwith vibrant atmosphere",
          image: "/2.jpg",
          imageAlt: "Social networking event atmosphere",
        },
        {
          title: "Private celebrations\nwhere every detail matters",
          image: "/3.jpg",
          imageAlt: "Private dinner celebration",
        }
      ],
    },
    services: {
      eyebrow: "Events",
      title: "Let us dazzle and inspire you",
      cta: "Events",
      explore: "Explore",
      items: [
        {
          id: "private",
          label: "Private Events",
          heading: "Personal moments that stay forever",
          image: "/private.jpg",
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
          heading: "Business that leaves an impression",
          image: "/corporate.jpg",
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
          heading: "An atmosphere that brings everyone together",
          image: "/entertainment.jpg",
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
          heading: "A brand that comes alive in space",
          image: "/branded.jpg",
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
          title: "Consultation",
          description:
            "We listen to your goals, wishes, and budget — so the right direction is set from the start.",
        },
        {
          title: "Concept creation",
          description:
            "We shape the idea and approve the format: atmosphere, style, and the details that make the experience distinctive.",
        },
        {
          title: "Planning",
          description:
            "We build a detailed plan and schedule — so every step is completed accurately and on time.",
        },
        {
          title: "Vendor coordination",
          description:
            "We coordinate the venue, vendors, and team; we manage deadlines and every technical detail.",
        },
        {
          title: "Event execution",
          description:
            "We run the process on site from start to finish — so you can simply enjoy the moment and your guests.",
        },
      ],
    },
    partners: {
      eyebrow: "Partners",
      title: "Brands we work with",
      logos: [
        { alt: "Lierac Paris" },
        { alt: "Gori Mall" },
        { alt: "Jaokeni" },
        { alt: "Nuxe Paris" },
        { alt: "Pharmadepot" },
        { alt: "Biographi Living" },
      ],
    },
    floatingContact: {
      open: "Open contact menu",
      close: "Close",
      whatsapp: "WhatsApp",
      facebook: "Facebook",
      phone: "Call",
    },
    footer: {
      getInTouch: "Get in Touch",
      phoneLabel: "Tel",
      rights: "All rights reserved",
    },
    about: {
      title: "We create experiences that leave a lasting impression",
      image: "/hero.jpg",
      imageAlt: "Event atmosphere",
      paragraphs: [
        [
          {
            text: "For us, every event is a unique story. From concept to realization, we create an experience that brings together creativity, quality, and professional execution.",
          },
        ],
      ],
      cta: "Discover who we are",
    },
    portfolio: {
      eyebrow: "Portfolio",
      title: "Projects that inspire",
      viewAll: "View all",
      clickHint: "Use the arrows to change slides",
      prevAria: "Previous slide",
      nextAria: "Next slide",
      pageTitle: "Portfolio",
      pageIntro: "Projects that reflect our style and experience",
      slides: [
        {
          title: "Private event",
          description:
            "A serene atmosphere, thoughtful details, and moments that stay forever.",
          image: "/only.jpg",
          imageAlt: "Private event",
        },
        {
          title: "Corporate evening",
          description:
            "A business gathering that leaves an impression — precise organization and strong visuals.",
          image: "/corp.jpg",
          imageAlt: "Corporate event",
        },
        {
          title: "Brand presentation",
          description:
            "A brand that comes alive in space — launch energy and a distinctive presence.",
          image: "/brands.jpg",
          imageAlt: "Brand event",
        },
        {
          title: "Entertainment night",
          description:
            "Energy, music, and an atmosphere that turns guests into one shared experience.",
          image: "/dances.jpg",
          imageAlt: "Entertainment event",
        },
      ],
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
