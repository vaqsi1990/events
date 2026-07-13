import PageShell from "@/components/PageShell";
import {
  defaultLocale,
  getDictionary,
  isLocale,
} from "@/lib/i18n";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function WorksPage({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale = isLocale(localeParam) ? localeParam : defaultLocale;
  const dict = getDictionary(locale);

  return (
    <PageShell title={dict.nav.works}>
      <p className="body-text max-w-xl text-lg leading-relaxed text-neutral-900/65">
        {locale === "ka"
          ? "ნამუშევრების გალერეა მალე დაემატება."
          : "The works gallery is coming soon."}
      </p>
    </PageShell>
  );
}
