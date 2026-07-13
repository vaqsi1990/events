"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { getLocalizedPath, type Dictionary, type Locale } from "@/lib/i18n";

type AboutProps = {
  locale: Locale;
  dict: Dictionary["about"];
  showCta?: boolean;
};

const easeOut = [0.22, 1, 0.36, 1] as const;

const sectionVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.06,
    },
  },
};

const riseVariants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeOut },
  },
};

export default function About({ locale, dict, showCta = true }: AboutProps) {
  return (
    <motion.section
      className="bg-white py-20"
      variants={sectionVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.12 }}
    >
      <div className="mx-auto max-w-[820px] px-5 text-center md:px-8">
        <motion.h2
          className="main-text text-[26px] leading-tight font-normal tracking-[0.04em] text-neutral-900 uppercase sm:text-[32px] md:text-[40px] md:leading-[1.2]"
          variants={riseVariants}
        >
          {dict.title}
        </motion.h2>

        <motion.div
          className="mx-auto mt-14 h-12 w-px bg-neutral-600 md:mt-10 md:h-14"
          variants={riseVariants}
          aria-hidden="true"
        />

        <div className="body-text mt-8 space-y-6 text-[15px] leading-[1.85] text-neutral-600 md:mt-10 md:space-y-7 md:text-[16px] md:leading-[1.9]">
          {dict.paragraphs.map((paragraph, index) => (
            <motion.p key={index} variants={riseVariants}>
              {paragraph.map((part, partIndex) =>
                "highlight" in part && part.highlight ? (
                  <span
                    key={partIndex}
                    className="font-medium text-[#A08968]"
                  >
                    {part.text}
                  </span>
                ) : (
                  <span key={partIndex}>{part.text}</span>
                ),
              )}
            </motion.p>
          ))}
        </div>

        {showCta && (
          <motion.div className="mt-10 md:mt-12" variants={riseVariants}>
            <Link
              href={getLocalizedPath(locale, "/about")}
              className="body-text inline-flex items-center border border-neutral-900 px-7 py-3.5 text-[12px] font-medium tracking-[0.18em] text-neutral-900 uppercase transition-colors duration-300 hover:bg-neutral-900 hover:text-white sm:text-[13px]"
            >
              {dict.cta}
            </Link>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}
