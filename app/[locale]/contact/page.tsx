import PageShell from "@/components/PageShell";
import {
  defaultLocale,
  getDictionary,
  isLocale,
} from "@/lib/i18n";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ContactPage({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale = isLocale(localeParam) ? localeParam : defaultLocale;
  const dict = getDictionary(locale);

  return (
    <PageShell title={dict.nav.contact}>
      <p className="body-text max-w-xl text-lg leading-relaxed text-white/65">
        {locale === "ka"
          ? "საკონტაქტო ფორმა მალე დაემატება."
          : "The contact form is coming soon."}
      </p>
    </PageShell>
  );
}
