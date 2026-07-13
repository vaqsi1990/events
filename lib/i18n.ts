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
      title: "ვქმნით დაუვიწყარ ღონისძიებებს იდეიდან სრულ რეალიზაციამდე",
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
    floatingContact: {
      open: "კონტაქტის გახსნა",
      close: "დახურვა",
      whatsapp: "WhatsApp",
      facebook: "Facebook",
      phone: "დარეკვა",
    },
    about: {
      title: "ვქმნით გამოცდილებებს, რომლებიც შთაბეჭდილებას ტოვებს",
      paragraphs: [
        [
          { text: "ყველა წარმატებული ღონისძიება ხედვით იწყება. " },
          { text: "Event", highlight: true },
          {
            text: "-ში იდეებს დაუვიწყარ გამოცდილებად ვაქცევთ — გააზრებული დაგეგმვით, კრეატიული მიმართულებით და უმწიკვლო შესრულებით. იქნება ეს კორპორატიული შეკრება, ",
          },
          { text: "კერძო ზეიმი", highlight: true },
          {
            text: ", კონფერენცია, გალა თუ პროდუქტის პრეზენტაცია — ყოველი დეტალი გულდასმით არის გააზრებული.",
          },
        ],
        [
          { text: "ჩვენი მიდგომა", highlight: true },
          {
            text: " თანამშრომლობაზეა აგებული. ვუთმობთ დროს, რომ გავიგოთ თქვენი მიზნები, აუდიტორია და ის ატმოსფერო, რომლის შექმნაც გსურთ. ასე ვქმნით ღონისძიებებს, რომლებიც ავთენტური, მიზანმიმართული და უნიკალურად თქვენია.",
          },
        ],
        [
          {
            text: "კონცეფციის შემუშავებიდან და ლოკაციის შერჩევიდან დიზაინამდე, ლოგისტიკამდე, გართობამდე და ადგილზე კოორდინაციამდე — პროცესის ყოველ ეტაპს სიზუსტითა და პროფესიონალიზმით ვმართავთ. ჩვენი გუნდი თვლის, რომ გამორჩეული ღონისძიებები ",
          },
          { text: "სკრუპულოზური დაგეგმვის", highlight: true },
          { text: ", კრეატიულობისა და გატაცების შედეგია." },
        ],
        [
          {
            text: "წლების განმავლობაში გვქონდა პატივი, ვიმუშაოთ ბიზნესებთან, ბრენდებთან და კერძო კლიენტებთან — და მიგვეწოდებინა ღონისძიებები, რომლებიც შთაგაგონებთ, აერთიანებთ და დაუვიწყარ მოგონებებს ტოვებს. ზომისა და სირთულის მიუხედავად, ყოველ პროექტს ერთნაირი ერთგულებითა და დეტალებზე ყურადღებით ვუდგებით.",
          },
        ],
        [
          { text: "ჩვენ უბრალოდ არ ვაწყობთ ღონისძიებებს — ", },
          { text: "ვქმნით გამოცდილებებს, რომლებსაც ადამიანები იმახსოვრებენ.", highlight: true },
        ],
      ],
      cta: "გაიცანით ჩვენი გუნდი",
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
      title: "We create unforgettable events from idea to full realization",
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
    floatingContact: {
      open: "Open contact menu",
      close: "Close",
      whatsapp: "WhatsApp",
      facebook: "Facebook",
      phone: "Call",
    },
    about: {
      title: "We create experiences that leave a lasting impression",
      paragraphs: [
        [
          { text: "Every successful event begins with a vision. At " },
          { text: "Event", highlight: true },
          {
            text: ", we transform ideas into memorable experiences through thoughtful planning, creative direction, and flawless execution. Whether it's a corporate gathering, ",
          },
          { text: "private celebration", highlight: true },
          {
            text: ", conference, gala, or product launch, every detail is carefully considered.",
          },
        ],
        [
          { text: "Our approach", highlight: true },
          {
            text: " is built on collaboration. We take the time to understand your goals, your audience, and the atmosphere you want to create. This allows us to design events that feel authentic, purposeful, and uniquely yours.",
          },
        ],
        [
          {
            text: "From concept development and venue selection to design, logistics, entertainment, and on-site coordination, we manage every stage of the process with precision and professionalism. Our team believes that exceptional events are the result of ",
          },
          { text: "meticulous planning", highlight: true },
          { text: " combined with creativity and passion." },
        ],
        [
          {
            text: "Over the years, we have had the privilege of working with businesses, brands, and private clients, delivering events that inspire, connect, and create lasting memories. No matter the size or complexity, we approach every project with the same dedication to quality and attention to detail.",
          },
        ],
        [
          { text: "We don't simply organize events—", },
          {
            text: "we create experiences people remember.",
            highlight: true,
          },
        ],
      ],
      cta: "Discover who we are",
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
