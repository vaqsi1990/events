"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { getLocalizedPath, type Dictionary, type Locale } from "@/lib/i18n";

type HeroProps = {
  locale: Locale;
  dict: Dictionary["hero"];
};

const easeOut = [0.22, 1, 0.36, 1] as const;

const contentVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.35,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: easeOut },
  },
};

export default function Hero({ locale, dict }: HeroProps) {
  return (
    <section className="relative isolate min-h-[100svh] w-full overflow-hidden text-white">
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 18, ease: "easeOut" }}
      >
        <Image
          src="/hero.jpg"
          alt={dict.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      <motion.div
        className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(10,10,10,0.55)_0%,rgba(10,10,10,0.35)_40%,rgba(10,10,10,0.72)_100%)]"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />

      <div className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-5 md:px-10 lg:px-16">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          variants={contentVariants}
          initial="hidden"
          animate="show"
        >
          <motion.h1
            className="main-text text-[20px] leading-tight font-semibold tracking-wide md:text-[30px] md:leading-[1.15]"
            variants={itemVariants}
          >
            {dict.title}
          </motion.h1>

          <motion.div
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
            variants={itemVariants}
          >
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
              <Link
                href={getLocalizedPath(locale, "/contact")}
                className="body-text inline-flex items-center rounded-xl bg-white px-7 py-3.5 text-[16px] font-medium tracking-[0.12em] text-neutral-900 uppercase transition-colors duration-300 hover:bg-white/90 md:text-[18px]"
              >
                {dict.contactCta}
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
              <Link
                href={getLocalizedPath(locale, "/works")}
                className="body-text inline-flex items-center rounded-xl border border-white/50 px-7 py-3.5 text-[16px] font-medium tracking-[0.12em] text-white uppercase transition-colors duration-300 hover:border-neutral-900 hover:bg-neutral-900 hover:text-white md:text-[18px]"
              >
                {dict.worksCta}
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
