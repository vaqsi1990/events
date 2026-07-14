"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getLocalizedPath, type Dictionary, type Locale } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger);

type PortfoglioProps = {
  locale: Locale;
  dict: Dictionary["portfolio"];
};

const CARD_BACK_COLORS = ["#1a1816", "#2a2420", "#171513", "#3a322c"] as const;

export default function Portfoglio({ locale, dict }: PortfoglioProps) {
  const rootRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const slides = dict.slides.slice(0, 4);

  useEffect(() => {
    const sticky = stickyRef.current;
    const header = headerRef.current;
    const cardContainer = containerRef.current;
    const root = rootRef.current;

    if (!sticky || !header || !cardContainer || !root) return;

    const cards = gsap.utils.toArray<HTMLElement>(
      root.querySelectorAll(".pf-card"),
    );
    if (cards.length === 0) return;

    let isGapDone = false;
    let isFlipDone = false;

    const ctx = gsap.context(() => {
      gsap.set(cardContainer, { y: 40, force3D: true });
      gsap.set(header, { y: 40, opacity: 0 });

      const mm = gsap.matchMedia();

      mm.add("(max-width: 999px)", () => {
        gsap.set([header, cardContainer, ...cards], { clearProps: "all" });
        cards.forEach((card) => {
          gsap.set(card, { rotationY: 0, y: 0, rotateZ: 0 });
        });
      });

      mm.add("(min-width: 1000px)", () => {
        isGapDone = false;
        isFlipDone = false;

        gsap.set(cardContainer, { y: 40, width: "72%", gap: "0px" });
        gsap.set(header, { y: 40, opacity: 0 });
        gsap.set(cards, { rotationY: 0, y: 0, rotateZ: 0 });

        const radiusTargets = gsap.utils.toArray<HTMLElement>(
          root.querySelectorAll(".pf-card, .pf-card-front, .pf-card-back"),
        );
        const originalRadii = radiusTargets.map(
          (el) => getComputedStyle(el).borderRadius,
        );

        const roundCorners = () => {
          gsap.to(radiusTargets, {
            borderRadius: "16px",
            duration: 0.22,
            ease: "power2.out",
            overwrite: "auto",
          });
        };

        const resetCorners = () => {
          gsap.to(radiusTargets, {
            borderRadius: (i: number) => originalRadii[i],
            duration: 0.22,
            ease: "power2.out",
            overwrite: "auto",
          });
        };

        ScrollTrigger.create({
          trigger: sticky,
          start: "top top",
          end: "+=1300",
          scrub: 0.35,
          pin: sticky,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress;

            if (progress >= 0.08 && progress <= 0.2) {
              const hp = gsap.utils.mapRange(0.08, 0.2, 0, 1, progress);
              gsap.set(header, {
                y: gsap.utils.mapRange(0, 1, 40, 0, hp),
                opacity: hp,
              });
            } else if (progress < 0.08) {
              gsap.set(header, { y: 40, opacity: 0 });
            } else {
              gsap.set(header, { y: 0, opacity: 1 });
            }

            if (progress <= 0.2) {
              const width = gsap.utils.mapRange(0, 0.2, 72, 86, progress);
              gsap.set(cardContainer, { width: `${width}%` });
            } else {
              gsap.set(cardContainer, { width: "86%" });
            }

            if (progress >= 0.28 && !isGapDone) {
              gsap.to(cardContainer, {
                gap: "16px",
                duration: 0.22,
                ease: "power2.out",
                overwrite: "auto",
              });
              roundCorners();
              isGapDone = true;
            } else if (progress < 0.28 && isGapDone) {
              gsap.to(cardContainer, {
                gap: "0px",
                duration: 0.22,
                ease: "power2.out",
                overwrite: "auto",
              });
              resetCorners();
              isGapDone = false;
            }

            if (progress >= 0.48 && !isFlipDone) {
              gsap.to(cards, {
                rotationY: 180,
                duration: 0.4,
                ease: "power3.inOut",
                stagger: 0.05,
              });

              const first = cards[0];
              const last = cards[cards.length - 1];
              if (first) gsap.to(first, { y: 28, rotateZ: -12, duration: 0.4 });
              if (last) gsap.to(last, { y: 28, rotateZ: 12, duration: 0.4 });

              isFlipDone = true;
            } else if (progress < 0.48 && isFlipDone) {
              gsap.to(cards, {
                rotationY: 0,
                duration: 0.4,
                ease: "power3.inOut",
                stagger: -0.05,
              });

              const first = cards[0];
              const last = cards[cards.length - 1];
              if (first) gsap.to(first, { y: 0, rotateZ: 0, duration: 0.4 });
              if (last) gsap.to(last, { y: 0, rotateZ: 0, duration: 0.4 });

              isFlipDone = false;
            }
          },
        });
      });
    }, root);

    const onLoad = () => {
      requestAnimationFrame(() => ScrollTrigger.refresh());
    };
    window.addEventListener("load", onLoad);

    return () => {
      window.removeEventListener("load", onLoad);
      ctx.revert();
    };
  }, [dict.slides]);

  return (
    <section
      ref={rootRef}
      className="pf-section bg-[#F3EEE8]"
      aria-label={dict.eyebrow}
    >
      <div ref={stickyRef} className="pf-sticky">
        <div className="pf-sticky-header">
          <p className="body-text text-[14px] font-medium tracking-[0.2em] text-neutral-500 uppercase md:text-[16px]">
            {dict.eyebrow}
          </p>
          <h2
            ref={headerRef}
            className="main-text mt-2 text-center text-[22px] leading-snug font-normal text-neutral-900 md:text-[30px]"
          >
            {dict.title}
          </h2>
        </div>

        <div ref={containerRef} className="pf-card-container">
          {slides.map((slide, index) => (
            <div
              key={slide.title}
              id={`pf-card-${index + 1}`}
              className={`pf-card pf-card-${index + 1}`}
            >
              <div className="pf-card-front">
                {/* Different object-position helps when placeholders share one file */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={slide.image}
                  alt={slide.imageAlt}
                  draggable={false}
                  style={{
                    objectPosition: `${(index / Math.max(slides.length - 1, 1)) * 100}% 50%`,
                  }}
                />
              </div>
              <div
                className="pf-card-back"
                style={{ backgroundColor: CARD_BACK_COLORS[index] }}
              >
                <span className="pf-card-index body-text">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="main-text pf-card-title">{slide.title}</h3>
                <p className="body-text pf-card-desc">{slide.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="pf-cta">
          <Link
            href={getLocalizedPath(locale, "/portfoglio")}
            className="body-text inline-flex items-center rounded-xl border border-neutral-900 px-6 py-3 text-[15px] font-medium tracking-[0.14em] text-neutral-900 uppercase transition-colors duration-300 hover:bg-neutral-900 hover:text-white md:text-[16px]"
          >
            {dict.viewAll}
          </Link>
        </div>
      </div>
    </section>
  );
}
