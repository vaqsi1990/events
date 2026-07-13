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
    <PageShell title={dict.nav.events} eyebrow={dict.services.eyebrow}>
      <p className="body-text max-w-xl text-lg leading-relaxed text-neutral-900/65">
        {dict.services.title}
      </p>
      <ul className="body-text mt-10 grid gap-4 sm:grid-cols-2">
        {dict.services.items.map((item) => (
          <li
            key={item.id}
            id={item.id}
            className="border border-neutral-900/10 bg-white px-5 py-6"
          >
            <p className="text-sm tracking-[0.16em] text-neutral-500 uppercase">
              {item.label}
            </p>
            <p className="main-text mt-3 text-xl text-neutral-900">
              {item.heading}
            </p>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
