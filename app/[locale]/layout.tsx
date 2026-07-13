import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Manrope, Noto_Sans_Georgian, Playfair_Display } from "next/font/google";
import Header from "@/components/Header";
import FloatingContact from "@/components/FloatingContact";
import PageTransition from "@/components/PageTransition";
import SmoothScroll from "@/components/SmoothScroll";
import {
  defaultLocale,
  getDictionary,
  isLocale,
  type Locale,
} from "@/lib/i18n";
import "../globals.css";

const playfair = Playfair_Display({
  variable: "--font-main",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const georgian = Noto_Sans_Georgian({
  variable: "--font-georgian",
  subsets: ["georgian"],
  weight: ["400", "500", "600"],
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return [{ locale: "ka" }, { locale: "en" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = isLocale(localeParam) ? localeParam : defaultLocale;
  const dict = getDictionary(locale);

  return {
    title: dict.meta.title,
    description: dict.meta.description,
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale: Locale = localeParam;

  return (
    <html
      lang={locale}
      className={`${playfair.variable} ${manrope.variable} ${georgian.variable} h-full antialiased`}
    >
      <body
        className={`flex min-h-full flex-col ${
          locale === "ka"
            ? "font-[family-name:var(--font-georgian)]"
            : "font-[family-name:var(--font-body)]"
        }`}
      >
        <SmoothScroll>
          <PageTransition brand="Event">
            <Header locale={locale} />
            {children}
            <FloatingContact locale={locale} />
          </PageTransition>
        </SmoothScroll>
      </body>
    </html>
  );
}
