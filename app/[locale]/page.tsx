import Hero from "@/components/Hero";
import { getDictionary, isLocale, defaultLocale } from "@/lib/i18n";

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
    </main>
  );
}
