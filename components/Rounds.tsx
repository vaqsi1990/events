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
      className="bg-[#F3EEE8] py-14 "
      variants={sectionVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
    >
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <motion.h2
          className="body-text text-center text-[22px] font-semibold text-neutral-900 sm:text-[26px] md:text-[30px]"
          variants={riseVariants}
        >
          {dict.title}
        </motion.h2>

        <motion.ul
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:mt-16 lg:grid-cols-6"
          variants={sectionVariants}
        >
          {dict.steps.map((step, index) => {
            const isLast = index === dict.steps.length - 1;
            const hasRightBorderSm = index % 2 === 0 && !isLast;
            const hasRightBorderLg = index === 0 || index === 1 || index === 3;

            return (
              <motion.li
                key={step.title}
                variants={riseVariants}
                className={`px-6 py-10 text-center sm:px-8 sm:py-12 ${
                  hasRightBorderSm ? "sm:border-r sm:border-neutral-300/80" : ""
                } ${
                  hasRightBorderLg
                    ? "lg:border-r lg:border-neutral-300/80"
                    : "lg:border-r-0"
                } ${
                  index < 3
                    ? "lg:col-span-2"
                    : index === 3
                      ? "lg:col-span-2 lg:col-start-2"
                      : "lg:col-span-2"
                }`}
              >
                <p className="body-text text-[15px] tracking-[0.08em] text-neutral-600">
                  - {index + 1} -
                </p>
                <h3 className="body-text mt-4 text-[17px] font-semibold text-neutral-900 md:text-[18px]">
                  {step.title}
                </h3>
                <p className="body-text mx-auto mt-4 max-w-[28rem] text-[15px] leading-relaxed text-neutral-600">
                  {step.description}
                </p>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </motion.section>
  );
}
