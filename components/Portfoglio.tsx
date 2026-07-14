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

export default function Portfoglio({ locale, dict }: PortfoglioProps) {
  const rootRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const slides = dict.slides.slice(0, 4);

  useEffect(() => {
    const sticky = stickyRef.current;
    const cardContainer = containerRef.current;
    const root = rootRef.current;

    if (!sticky || !cardContainer || !root) return;

    const cards = gsap.utils.toArray<HTMLElement>(
      root.querySelectorAll(".pf-card"),
    );
    if (cards.length === 0) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(max-width: 999px)", () => {
        gsap.set([cardContainer, ...cards], { clearProps: "all" });
        gsap.set(cards, { rotationY: 0, y: 0, rotateZ: 0 });
      });

      mm.add("(min-width: 1000px)", () => {
        gsap.set(cardContainer, {
          width: "72%",
          gap: "20px",
          force3D: true,
        });
        gsap.set(cards, {
          rotationY: 0,
          y: 0,
          rotateZ: 0,
          force3D: true,
        });

        const first = cards[0];
        const last = cards[cards.length - 1];

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: sticky,
            start: "top top",
            end: "+=1100",
            scrub: 0.4,
            pin: sticky,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            fastScrollEnd: true,
            preventOverlaps: true,
          },
        });

        tl.to(
          cardContainer,
          {
            width: "86%",
            gap: "32px",
            duration: 0.4,
          },
          0,
        ).to(
          cards,
          {
            rotationY: 180,
            duration: 0.45,
            stagger: 0.04,
          },
          0.42,
        );

        if (first) {
          tl.to(
            first,
            {
              y: 28,
              rotateZ: -12,
              duration: 0.45,
            },
            0.42,
          );
        }

        if (last) {
          tl.to(
            last,
            {
              y: 28,
              rotateZ: 12,
              duration: 0.45,
            },
            0.42,
          );
        }

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      });
    }, root);

    const refresh = () => ScrollTrigger.refresh();
    const raf = requestAnimationFrame(refresh);
    window.addEventListener("load", refresh);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("load", refresh);
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
          <h2 className="main-text mt-2 text-center text-[22px] leading-snug font-normal text-neutral-900 md:text-[30px]">
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
                <div className="pf-card-media">
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

                <span className="pf-card-badge body-text text-[13px] md:text-[14px]">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="pf-card-corner pf-card-corner-tl" aria-hidden="true" />
                <span className="pf-card-corner pf-card-corner-br" aria-hidden="true" />

                <div className="pf-card-front-meta">
                  <h3 className="main-text pf-card-front-title text-[16px] md:text-[18px]">
                    <span className="pf-card-front-accent">
                      {slide.title.split(" ")[0]}
                    </span>
                    {slide.title.includes(" ")
                      ? ` ${slide.title.split(" ").slice(1).join(" ")}`
                      : null}
                  </h3>
                </div>
              </div>
              <div className="pf-card-back">
                <span className="pf-card-index main-text">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="pf-card-copy">
                  <span className="pf-card-gold-line" aria-hidden="true" />
                  <h3 className="main-text pf-card-title">{slide.title}</h3>
                  <p className="body-text pf-card-desc">{slide.description}</p>
                </div>
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
