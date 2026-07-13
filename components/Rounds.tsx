"use client";

import { motion } from "framer-motion";
import type { Dictionary } from "@/lib/i18n";

type RoundsProps = {
  dict: Dictionary["rounds"];
};

const easeOut = [0.22, 1, 0.36, 1] as const;

const sectionVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.06,
    },
  },
};

const riseVariants = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: easeOut },
  },
};

export default function Rounds({ dict }: RoundsProps) {
  return (
    <motion.section
      className="mt-20 bg-[#F3EEE8] pb-20"
      variants={sectionVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.12 }}
    >
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <motion.h2
          className="main-text pt-20 text-center text-[26px] leading-tight font-normal tracking-[0.04em] text-neutral-900 uppercase sm:text-[32px] md:text-[40px] md:leading-[1.2]"
          variants={riseVariants}
        >
          {dict.title}
        </motion.h2>

        <motion.ul
          className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:mt-16 lg:grid-cols-6 lg:gap-7"
          variants={sectionVariants}
        >
          {dict.steps.map((step, index) => {
            const number = String(index + 1).padStart(2, "0");
            const isSecondRow = index >= 3;

            return (
              <motion.li
                key={step.title}
                variants={riseVariants}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.35, ease: easeOut }}
                className={`group relative overflow-hidden rounded-xl bg-[#FAF7F3] ${
                  isSecondRow
                    ? index === 3
                      ? "lg:col-span-2 lg:col-start-2"
                      : "lg:col-span-2"
                    : "lg:col-span-2"
                }`}
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#A08968]/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative flex h-full flex-col px-6 pt-8 pb-7 sm:px-7 sm:pt-9 sm:pb-8">
                  <span
                    className="main-text pointer-events-none absolute top-3 right-4 text-[64px] leading-none font-normal tracking-[-0.04em] text-[#A08968]/12 transition-colors duration-500 group-hover:text-[#A08968]/22 sm:top-2 sm:right-5 sm:text-[76px]"
                    aria-hidden="true"
                  >
                    {number}
                  </span>

                  <div className="relative flex items-center gap-3">
                    <span className="body-text text-[13px] font-medium tracking-[0.2em] text-[#A08968] uppercase">
                      {number}
                    </span>
                   
                  </div>

                  <h3 className="body-text relative mt-5 text-[17px] font-semibold tracking-[0.02em] text-neutral-900 md:text-[18px]">
                    {step.title}
                  </h3>

                  <p className="body-text relative mt-3 flex-1 text-[15px] leading-relaxed text-neutral-600">
                    {step.description}
                  </p>

                 
                </div>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </motion.section>
  );
}
