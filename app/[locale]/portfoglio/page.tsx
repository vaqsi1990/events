import Image from "next/image";
import {
  defaultLocale,
  getDictionary,
  isLocale,
} from "@/lib/i18n";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function PortfoglioPage({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale = isLocale(localeParam) ? localeParam : defaultLocale;
  const dict = getDictionary(locale);

  return (
    <main className="bg-[#F3EEE8] pt-24 pb-20">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <p className="body-text text-center text-[14px] font-medium tracking-[0.2em] text-neutral-500 uppercase md:text-[16px]">
          {dict.portfolio.eyebrow}
        </p>
        <h1 className="main-text mt-3 text-center text-[28px] leading-tight font-normal text-neutral-900 md:text-[40px]">
          {dict.portfolio.pageTitle}
        </h1>
        <p className="body-text mx-auto mt-4 max-w-2xl text-center text-[16px] leading-relaxed text-neutral-600 md:text-[18px]">
          {dict.portfolio.pageIntro}
        </p>

        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:mt-16 lg:gap-10">
          {dict.portfolio.slides.map((slide) => (
            <li key={slide.title} className="group">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={slide.image}
                  alt={slide.imageAlt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <h2 className="main-text mt-4 text-[22px] text-neutral-900 md:text-[26px]">
                {slide.title}
              </h2>
              <p className="body-text mt-2 text-[15px] leading-relaxed text-neutral-600 md:text-[16px]">
                {slide.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
