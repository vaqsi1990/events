import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import { getDictionary, isLocale, defaultLocale } from "@/lib/i18n";
import Services from "@/components/Services";
import Rounds from "@/components/Rounds";
import About from "@/components/About";
import Portfoglio from "@/components/Portfoglio";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale = isLocale(localeParam) ? localeParam : defaultLocale;
  const dict = getDictionary(locale);

  return (
    <main>
      <Hero locale={locale} dict={dict.hero} />
      <div className="page-sections">
        <Reveal>
          <About locale={locale} dict={dict.about} />
        </Reveal>
        <Reveal>
          <Services locale={locale} dict={dict.services} />
        </Reveal>
        <Reveal>
          <Portfoglio locale={locale} dict={dict.portfolio} />
        </Reveal>
        <Reveal delay={0.08}>
          <Rounds dict={dict.rounds} />
        </Reveal>
        
      </div>
    </main>
  );
}
