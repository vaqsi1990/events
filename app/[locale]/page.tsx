import Hero from "@/components/Hero";
import { getDictionary, isLocale, defaultLocale } from "@/lib/i18n";
import Services from "@/components/Services";

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
        <Services locale={locale} dict={dict.services} />
      </div>
    </main>
  );
}
