import PortfolioShowcase from "@/components/PortfolioShowcase";
import {
  defaultLocale,
  getDictionary,
  isLocale,
} from "@/lib/i18n";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function PortfoglioPage({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale = isLocale(localeParam) ? localeParam : defaultLocale;
  const dict = getDictionary(locale);

  return (
    <main className="pt-16">
      <PortfolioShowcase dict={dict.portfolio} />
    </main>
  );
}
