"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Dictionary } from "@/lib/i18n";

type EventItem = Dictionary["services"]["items"][number];

type EventsTabsProps = {
  items: readonly EventItem[];
  ariaLabel: string;
};

const easeOut = [0.22, 1, 0.36, 1] as const;

export default function EventsTabs({ items, ariaLabel }: EventsTabsProps) {
  const [activeId, setActiveId] = useState(items[0].id);
  const active = items.find((item) => item.id === activeId) ?? items[0];
  const hasGallery = active.gallery.length > 0;

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash && items.some((item) => item.id === hash)) {
      setActiveId(hash as EventItem["id"]);
    }
  }, [items]);

  const selectTab = (id: EventItem["id"]) => {
    setActiveId(id);
    window.history.replaceState(null, "", `#${id}`);
  };

  return (
    <div>
      <div
        className="overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="tablist"
        aria-label={ariaLabel}
      >
        <div className="flex min-w-max text-center items-center justify-center items-stretch gap-6 border-b border-neutral-900/15 sm:gap-8 md:gap-10">
          {items.map((item) => {
            const isActive = item.id === activeId;

            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => selectTab(item.id)}
                className={`body-text relative cursor-pointer pb-3 text-left text-[16px] md:text-[18px] whitespace-nowrap transition-colors duration-300  md:pb-3.5  ${
                  isActive
                    ? "font-semibold text-neutral-900"
                    : "font-normal text-neutral-600 hover:text-neutral-700"
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="events-tab-underline"
                    className="absolute right-0 bottom-[-1px] left-0 h-[2px] bg-neutral-900"
                    transition={{ duration: 0.3, ease: easeOut }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          id={active.id}
          role="tabpanel"
          className="mt-10 md:mt-14"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, ease: easeOut }}
        >
          {hasGallery ? (
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
              {active.gallery.map((card, index) => (
                <li key={card.id}>
                  <article className="group relative aspect-[16/10] overflow-hidden bg-neutral-900 sm:aspect-[5/3]">
                    <Image
                      src={card.image}
                      alt={card.imageAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      priority={index === 0}
                    />
                    <div
                      className="absolute inset-0 bg-black/55 transition-colors duration-500 group-hover:bg-black/45"
                      aria-hidden="true"
                    />
                    <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
                      <h3 className="body-text max-w-[14ch] text-[16px] md:text-[18px] leading-snug font-medium text-white ">
                        {card.label}
                      </h3>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          ) : (
            <div className="grid items-center gap-8 md:grid-cols-[1.05fr_0.95fr] md:gap-12">
              <div>
                <p className="body-text text-[12px] tracking-[0.18em] text-neutral-500 uppercase">
                  {active.label}
                </p>
                <h2 className="main-text mt-4 text-[26px] leading-tight font-normal tracking-[0.04em] text-neutral-900 uppercase sm:text-[32px] md:text-[40px] md:leading-[1.2]">
                  {active.heading}
                </h2>
              </div>

              <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-200 md:aspect-[5/4]">
                <Image
                  src={active.image}
                  alt={active.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className="object-cover"
                />
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
