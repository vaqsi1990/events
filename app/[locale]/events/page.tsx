import PageShell from "@/components/PageShell";
import EventsTabs from "@/components/EventsTabs";
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
    <PageShell title={dict.nav.events}>
      <EventsTabs items={dict.services.items} ariaLabel={dict.nav.events} />
    </PageShell>
  );
}
