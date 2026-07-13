import About from "@/components/About";
import {
  defaultLocale,
  getDictionary,
  isLocale,
} from "@/lib/i18n";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function AboutPage({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale = isLocale(localeParam) ? localeParam : defaultLocale;
  const dict = getDictionary(locale);

  return (
    <main className="pt-16">
      <About locale={locale} dict={dict.about} showCta={false} />
    </main>
  );
}
