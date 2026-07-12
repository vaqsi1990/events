"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  getDictionary,
  getLocalizedPath,
  locales,
  type Locale,
} from "@/lib/i18n";

const easeOut = [0.22, 1, 0.36, 1] as const;

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

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

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
            onClick={() => setOpen(false)}
          >
            {dict.language[code]}
          </Link>
        </span>
      ))}
    </div>
  );

  return (
    <>
      <motion.header
        className="fixed top-0 right-0 left-0 z-50 border-b border-white/10 bg-[rgba(18,18,18,0.35)] text-white backdrop-blur-md"
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: easeOut, delay: 0.15 }}
      >
        <div className="mx-auto grid h-[4.25rem] max-w-[1400px] grid-cols-[1fr_auto] items-center gap-4 px-5 md:px-8 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
          <Link
            href={getLocalizedPath(locale)}
            className="main-text justify-self-start text-[0.95rem] font-semibold tracking-[0.28em] uppercase transition-opacity duration-300 hover:opacity-70"
          >
            Event
          </Link>

          <nav
            className="body-text hidden items-center justify-center gap-8 lg:flex xl:gap-10"
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

          <div className="body-text hidden items-center justify-self-end border-l border-white/35 px-4 lg:flex xl:px-5">
            <LanguageSwitcher />
          </div>

          <button
            type="button"
            className="relative z-[60] flex size-10 justify-self-end items-center justify-center lg:hidden"
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
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            className="fixed inset-0 z-40 flex flex-col bg-[rgba(12,12,12,0.97)] text-white lg:hidden"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: easeOut }}
          >
            <nav
              className="body-text flex h-full flex-col justify-center gap-2 px-8 pt-24 pb-10"
              aria-label={dict.nav.mobileAria}
            >
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + index * 0.06, duration: 0.35 }}
                >
                  <Link
                    href={link.href}
                    className="block py-3 text-2xl tracking-[0.12em] uppercase transition-opacity duration-300 hover:opacity-70"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                className="mt-8 border-t border-white/15 pt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35, duration: 0.3 }}
              >
                <LanguageSwitcher className="text-sm" />
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
