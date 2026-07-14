"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Dictionary } from "@/lib/i18n";

type PartnersProps = {
  dict: Dictionary["partners"];
};

const PARTNER_LOGOS = [
  { src: "/partners/1.jpg", alt: "Lierac Paris" },
  { src: "/partners/2.jpg", alt: "Gori Mall" },
  { src: "/partners/3.jpg", alt: "Jaokeni" },
  { src: "/partners/4.jpg", alt: "Nuxe Paris" },
  { src: "/partners/5.jpg", alt: "Pharmadepot" },
  { src: "/partners/6.jpg", alt: "Biographi Living" },
] as const;

const easeOut = [0.22, 1, 0.36, 1] as const;

const sectionVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.06,
    },
  },
};

const riseVariants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: easeOut },
  },
};

export default function Partners({ dict }: PartnersProps) {
  return (
    <motion.section
      className="bg-[#F3EEE8] pb-20"
      variants={sectionVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      aria-label={dict.title}
    >
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <motion.div className="text-center" variants={riseVariants}>
          <p className="body-text text-[14px] font-medium tracking-[0.2em] text-neutral-500 uppercase md:text-[16px]">
            {dict.eyebrow}
          </p>
          <h2 className="main-text mt-3 text-[22px] leading-snug font-normal text-neutral-900 md:mt-4 md:text-[30px]">
            {dict.title}
          </h2>
        </motion.div>

        <motion.ul
          className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 md:mt-14 lg:grid-cols-6 lg:gap-6"
          variants={sectionVariants}
        >
          {PARTNER_LOGOS.map((logo, index) => (
            <motion.li
              key={logo.src}
              variants={riseVariants}
              className="group flex aspect-[4/3] items-center justify-center bg-[#FAF7F3] px-4 py-5 transition-colors duration-300 hover:bg-white sm:px-5"
            >
              <Image
                src={logo.src}
                alt={dict.logos[index]?.alt ?? logo.alt}
                width={280}
                height={160}
                className="max-h-20 w-auto max-w-full object-contain opacity-80 grayscale transition-[opacity,filter,transform] duration-500 group-hover:scale-[1.04] group-hover:opacity-100 group-hover:grayscale-0 sm:max-h-24"
              />
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </motion.section>
  );
}
