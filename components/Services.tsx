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
      className="bg-[#F3EEE8]"
      variants={sectionVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
    >
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <motion.div variants={riseVariants}>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-12">
            <div className="min-w-0 max-w-3xl">
              <p className="body-text text-[16px] text-center font-medium tracking-[0.16em] text-neutral-500 uppercase sm:text-[14px] sm:tracking-[0.2em] md:text-[18px] md:tracking-[0.22em]">
                {dict.eyebrow}
              </p>
              <h2 className="main-text mt-3 text-[22px] text-center leading-snug font-normal break-words text-neutral-900 sm:text-[28px] md:mt-4 md:text-[30px] md:leading-[1.15]">
                {dict.title}
              </h2>
            </div>

            <Link
              href={getLocalizedPath(locale, "/events")}
              className="body-text mx-auto inline-flex shrink-0 items-center rounded-xl border border-neutral-900 px-5 py-3 text-center text-[16px] font-medium tracking-[0.14em] text-neutral-900 uppercase transition-colors duration-300 hover:bg-neutral-900 hover:text-white sm:px-7 sm:py-3.5 sm:tracking-[0.18em] md:mx-0 md:self-auto md:text-[18px]"
            >
              {dict.cta}
            </Link>
          </div>
        </motion.div>

        <div className="mt-10 grid gap-8 md:mt-12 lg:mt-16 lg:grid-cols-[minmax(0,280px)_minmax(0,1fr)] lg:items-center lg:gap-10 xl:grid-cols-[minmax(0,300px)_minmax(0,1fr)] xl:gap-12">
          <motion.ul
            className="body-text grid grid-cols-1 gap-1 sm:grid-cols-2 lg:flex lg:flex-col lg:justify-center lg:gap-0"
            aria-label={dict.eyebrow}
            variants={riseVariants}
          >
            {dict.items.map((item) => {
              const isActive = item.id === active.id;

              return (
                <li key={item.id} className="min-w-0 lg:w-full">
                  <Link
                    href={`${getLocalizedPath(locale, "/events")}#${item.id}`}
                    onMouseEnter={() => setActiveId(item.id)}
                    onFocus={() => setActiveId(item.id)}
                    className={`group relative block w-full py-3 text-left text-[15px] leading-snug font-medium tracking-[0.08em] uppercase transition-colors duration-300 sm:tracking-[0.12em] lg:py-4 lg:tracking-[0.14em] ${
                      isActive
                        ? "text-neutral-900"
                        : "text-neutral-500 hover:text-neutral-800"
                    }`}
                  >
                    <span className="block break-words text-[16px] hyphens-auto md:text-[18px]">
                      {item.label}
                    </span>
                    <span
                      className={`absolute right-0 bottom-1 left-0 h-[2px] origin-left bg-neutral-900 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        isActive
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100"
                      }`}
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              );
            })}
          </motion.ul>

          <motion.div
            className="relative lg:flex lg:min-h-[400px] lg:items-center lg:justify-end"
            variants={riseVariants}
          >
            <div className="relative mx-auto h-[260px] w-full max-w-[580px] bg-[#EAE3D8] p-px sm:h-[300px] sm:max-w-[620px] md:h-[360px] md:max-w-[680px] lg:mx-0 lg:ml-auto lg:h-[400px] lg:w-[75%] lg:max-w-none xl:h-[440px] xl:w-[72%]">
              <div className="relative h-full w-full overflow-hidden bg-white">
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
                  className="pointer-events-none absolute inset-0 bg-black/15"
                  aria-hidden="true"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
