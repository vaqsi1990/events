"use client";

import Image from "next/image";
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
      className="bg-[#F3EEE8] py-20"
      variants={sectionVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.12 }}
    >
      <div className="mx-auto grid max-w-[1200px] items-center gap-10 px-5 md:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] md:gap-14 md:px-8 lg:gap-20">
        <motion.div
          className="relative aspect-[3/2] w-full overflow-hidden rounded-xl bg-neutral-200"
          variants={riseVariants}
        >
          <Image
            src="/campaign.jpg"
            alt={dict.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 55vw"
            className="object-cover object-center"
          />
          <div
            className="absolute inset-0 bg-black/40"
            aria-hidden="true"
          />
        </motion.div>

        <div>
          <motion.h2
            className="main-text text-[22px] leading-tight font-normal tracking-[0.04em] text-neutral-900 uppercase  md:text-[30px] md:leading-[1.2]"
            variants={riseVariants}
          >
            {dict.title}
          </motion.h2>


          <div className="body-text mt-8 space-y-6 text-[16px] leading-[1.85] text-neutral-600 md:mt-10 md:space-y-7 md:text-[18px] md:leading-[1.9]">
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
                className="body-text inline-flex items-center rounded-xl border border-neutral-900 px-7 py-3.5 text-[16px] font-medium tracking-[0.18em] text-neutral-900 uppercase transition-colors duration-300 hover:bg-neutral-900 hover:text-white md:text-[18px]"
              >
                {dict.cta}
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </motion.section>
  );
}
