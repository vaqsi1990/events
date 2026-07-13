import PageShell from "@/components/PageShell";
import {
  defaultLocale,
  getDictionary,
  isLocale,
} from "@/lib/i18n";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function EventsPage({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale = isLocale(localeParam) ? localeParam : defaultLocale;
  const dict = getDictionary(locale);

  return (
    <PageShell title={dict.nav.events} eyebrow={dict.nav.events}>
      <p className="body-text max-w-xl text-lg leading-relaxed text-white/65">
        {locale === "ka"
          ? "ღონისძიებების გვერდი მალე დაემატება."
          : "The events page is coming soon."}
      </p>
    </PageShell>
  );
}
