"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  getDictionary,
  getLocalizedPath,
  locales,
  type Locale,
} from "@/lib/i18n";

const PHONE = "+995 555 12 34 56";
const PHONE_HREF = "tel:+995555123456";

const easeOut = [0.22, 1, 0.36, 1] as const;

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
      />
    </svg>
  );
}

function switchLocalePath(pathname: string, nextLocale: Locale) {
  const segments = pathname.split("/");
  if (segments.length > 1 && locales.includes(segments[1] as Locale)) {
    segments[1] = nextLocale;
    return segments.join("/") || `/${nextLocale}`;
  }
  return `/${nextLocale}${pathname === "/" ? "" : pathname}`;
}

type HeaderProps = {
  locale: Locale;
};

const Header = ({ locale }: HeaderProps) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const dict = getDictionary(locale);

  const navLinks = [
    { href: getLocalizedPath(locale, "/services"), label: dict.nav.services },
    { href: getLocalizedPath(locale, "/works"), label: dict.nav.works },
    { href: getLocalizedPath(locale, "/about"), label: dict.nav.about },
    { href: getLocalizedPath(locale, "/contact"), label: dict.nav.contact },
  ];

  const LanguageSwitcher = ({ className = "" }: { className?: string }) => (
    <div
      className={`flex items-center gap-2 text-[0.72rem] tracking-[0.14em] uppercase ${className}`}
      aria-label={dict.language.switchAria}
    >
      {locales.map((code, index) => (
        <span key={code} className="flex items-center gap-2">
          {index > 0 && <span className="text-white/40">|</span>}
          <Link
            href={switchLocalePath(pathname, code)}
            className={`transition-opacity duration-300 hover:opacity-70 ${
              locale === code ? "opacity-100" : "opacity-45"
            }`}
            hrefLang={code}
            lang={code}
          >
            {dict.language[code]}
          </Link>
        </span>
      ))}
    </div>
  );

  return (
    <motion.header
      className="fixed top-0 right-0 left-0 z-50 border-b border-white/10 bg-[rgba(18,18,18,0.35)] text-white backdrop-blur-md"
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: easeOut, delay: 0.15 }}
    >
      <div className="mx-auto flex h-[4.25rem] max-w-[1400px] items-center justify-between gap-6 px-5 md:px-8">
        <Link
          href={getLocalizedPath(locale)}
          className="main-text shrink-0 text-[0.95rem] font-semibold tracking-[0.28em] uppercase transition-opacity duration-300 hover:opacity-70"
        >
          Event
        </Link>

        <div className="body-text hidden items-center gap-8 lg:flex xl:gap-10">
          <nav
            className="flex items-center gap-8 xl:gap-10"
            aria-label={dict.nav.mainAria}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative shrink-0 whitespace-nowrap text-[15px] font-medium tracking-[0.12em] uppercase transition-opacity duration-300 hover:opacity-70 xl:text-[16px]"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="flex items-stretch">
           
          </div>
        </div>
            <div className="flex items-center border-l border-white/35 px-4 xl:px-5">
              <LanguageSwitcher />
            </div>

        <button
          type="button"
          className="flex size-10 shrink-0 items-center justify-center lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? dict.nav.closeMenu : dict.nav.openMenu}
          onClick={() => setOpen((prev) => !prev)}
        >
          <span className="relative block h-3.5 w-5">
            <motion.span
              className="absolute left-0 block h-px w-full bg-white"
              animate={
                open
                  ? { top: "50%", y: "-50%", rotate: 45 }
                  : { top: "0%", y: "0%", rotate: 0 }
              }
              transition={{ duration: 0.25 }}
            />
            <motion.span
              className="absolute top-1/2 left-0 block h-px w-full -translate-y-1/2 bg-white"
              animate={{ opacity: open ? 0 : 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="absolute left-0 block h-px w-full bg-white"
              animate={
                open
                  ? { top: "50%", y: "-50%", rotate: -45 }
                  : { top: "100%", y: "-100%", rotate: 0 }
              }
              transition={{ duration: 0.25 }}
            />
          </span>
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="mobile-nav"
            className="overflow-hidden border-t border-white/10 lg:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: easeOut }}
          >
            <nav
              className="body-text flex flex-col gap-1 px-5 py-4"
              aria-label={dict.nav.mobileAria}
            >
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    className="block py-3 text-[0.85rem] tracking-[0.12em] uppercase transition-opacity duration-300 hover:opacity-70"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
             
              <div className="border-t border-white/15 py-3.5">
                <LanguageSwitcher />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
