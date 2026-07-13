import PageShell from "@/components/PageShell";
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
    <PageShell title={dict.nav.about}>
      <p className="body-text max-w-xl text-lg leading-relaxed text-neutral-900/65">
        {locale === "ka"
          ? "ჩვენს შესახებ გვერდი მალე დაემატება."
          : "The about page is coming soon."}
      </p>
    </PageShell>
  );
}
