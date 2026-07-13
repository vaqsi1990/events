"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getLocalizedPath, type Dictionary, type Locale } from "@/lib/i18n";

type ServicesProps = {
  locale: Locale;
  dict: Dictionary["services"];
};

const easeOut = [0.22, 1, 0.36, 1] as const;

const sectionVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.08,
    },
  },
};

const riseVariants = {
  hidden: { opacity: 0, y: 48 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: easeOut },
  },
};

export default function Services({ locale, dict }: ServicesProps) {
  const [activeId, setActiveId] = useState<
    Dictionary["services"]["items"][number]["id"]
  >(dict.items[0].id);
  const active =
    dict.items.find((item) => item.id === activeId) ?? dict.items[0];

  return (
    <motion.section
      className="bg-white py-14 md:py-24"
      variants={sectionVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
    >
      <motion.div
        className="mx-auto max-w-[1400px] px-5 md:px-8"
        variants={riseVariants}
      >
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-12">
          <div className="min-w-0 max-w-3xl">
            <p className="body-text text-[12px] font-medium tracking-[0.16em] text-neutral-500 uppercase sm:text-[14px] sm:tracking-[0.2em] md:text-[15px] md:tracking-[0.22em]">
              {dict.eyebrow}
            </p>
            <h2 className="main-text mt-3 text-[22px] leading-snug font-normal break-words text-neutral-900 sm:text-[28px] md:mt-4 md:text-[30px] md:leading-[1.15]">
              {dict.title}
            </h2>
          </div>

          <Link
            href={getLocalizedPath(locale, "/services")}
            className="body-text inline-flex shrink-0 items-center self-start rounded-xl border border-neutral-900 px-5 py-3 text-[16px] font-medium tracking-[0.14em] text-neutral-900 uppercase transition-colors duration-300 hover:bg-neutral-900 hover:text-white sm:px-7 sm:py-3.5 sm:text-[12px] sm:tracking-[0.18em] md:self-auto md:text-[13px]"
          >
            {dict.cta}
          </Link>
        </div>
      </motion.div>

      <div className="mt-10 grid gap-6 px-5 md:mt-12 md:gap-8 md:px-8 lg:mt-16 lg:grid-cols-[minmax(200px,260px)_minmax(0,1fr)] lg:items-center lg:gap-0 lg:pr-0 lg:pl-[max(2rem,calc((100vw-1400px)/2+2rem))] xl:grid-cols-[minmax(220px,280px)_minmax(0,1fr)]">
        <motion.ul
          className="body-text grid grid-cols-1 gap-1 sm:grid-cols-2 lg:flex lg:flex-col lg:justify-center lg:gap-0 lg:pr-2"
          role="tablist"
          aria-label={dict.eyebrow}
          variants={riseVariants}
        >
          {dict.items.map((item) => {
            const isActive = item.id === active.id;

            return (
              <li key={item.id} className="min-w-0 lg:w-full">
                <button
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveId(item.id)}
                  className={`w-full cursor-pointer px-3 py-3 text-left text-[15px] leading-snug font-medium tracking-[0.08em] uppercase transition-colors duration-300 sm:px-4 sm:tracking-[0.12em] lg:px-5 lg:py-4 lg:tracking-[0.14em] ${
                    isActive
                      ? "bg-[#F3EEE8] text-neutral-900"
                      : "bg-transparent text-neutral-500 hover:text-neutral-800"
                  }`}
                >
                  <span className="block break-words hyphens-auto">
                    {item.label}
                  </span>
                </button>
              </li>
            );
          })}
        </motion.ul>

        <motion.div
          className="relative lg:flex lg:min-h-[420px] lg:items-center"
          variants={riseVariants}
        >
          <div className="relative ml-auto h-[280px] w-full overflow-hidden bg-white sm:h-[340px] md:h-[400px] lg:h-[460px] lg:w-[72%] xl:h-[500px] xl:w-[75%]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.7, ease: easeOut }}
              >
                <Image
                  src={active.image}
                  alt={active.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                  priority={active.id === dict.items[0].id}
                />
              </motion.div>
            </AnimatePresence>

            <div
              className="pointer-events-none absolute inset-0 bg-black/35"
              aria-hidden="true"
            />
          </div>

          <div className="relative z-10 mx-auto -mt-14 w-[min(100%,22rem)] px-0 sm:-mt-16 sm:w-[min(100%,24rem)] lg:absolute lg:top-1/2 lg:left-[10%] lg:mx-0 lg:mt-0 lg:w-[min(100%,26rem)] lg:-translate-y-1/2 xl:left-[12%] xl:w-[28rem]">
            <AnimatePresence mode="wait">
              <motion.div
                key={`panel-${active.id}`}
                className="bg-white px-5 py-6 sm:px-7 sm:py-8 md:px-9 md:py-10"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.55, ease: easeOut, delay: 0.08 }}
              >
                <p className="body-text text-[15px] font-medium tracking-[0.16em] break-words text-neutral-500 uppercase">
                  {active.label}
                </p>
                <h3 className="main-text mt-3 text-[15px] leading-snug break-words text-neutral-900 sm:mt-4 sm:text-[16px] md:text-[20px] md:leading-[1.2]">
                  {active.heading}
                </h3>
                <Link
                  href={getLocalizedPath(locale, `/services#${active.id}`)}
                  className="body-text mt-5 inline-flex max-w-full flex-wrap items-center gap-2 text-[15px] font-medium tracking-[0.16em] text-neutral-900 uppercase transition-opacity duration-300 hover:opacity-55 sm:mt-7"
                >
                  <span className="break-words">
                    {dict.explore} {active.label}
                  </span>
                  <span aria-hidden="true">→</span>
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
