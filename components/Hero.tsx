"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { SplitText } from "gsap/SplitText";
import { getLocalizedPath, type Dictionary, type Locale } from "@/lib/i18n";

gsap.registerPlugin(CustomEase, SplitText);

if (!CustomEase.get("hop")) {
  CustomEase.create("hop", "0.9, 0, 0.1, 1");
}

type HeroProps = {
  locale: Locale;
  dict: Dictionary["hero"];
};

type Slide = Dictionary["hero"]["slides"][number];

export default function Hero({ locale, dict }: HeroProps) {
  const rootRef = useRef<HTMLElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);
  const titlesRef = useRef<HTMLDivElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const slides = dict.slides as readonly Slide[];

  useEffect(() => {
    const root = rootRef.current;
    const imagesEl = imagesRef.current;
    const titlesEl = titlesRef.current;
    const prevBtn = prevRef.current;
    const nextBtn = nextRef.current;

    if (!root || !imagesEl || !titlesEl || !prevBtn || !nextBtn) return;

    const titleContainers: HTMLDivElement[] = [];
    const splitInstances: SplitText[] = [];
    let currentIndex = 0;
    let isAnimating = false;
    let activeTextTween: gsap.core.Tween | gsap.core.Timeline | null = null;
    let cancelled = false;

    const createTitles = () => {
      slides.forEach((slide) => {
        const container = document.createElement("div");
        container.className = "hero-slide-title";

        const heading = document.createElement("p");
        heading.className = "hero-title main-text";

        slide.title.split("\n").forEach((line, index, lines) => {
          heading.appendChild(document.createTextNode(line.trim()));
          if (index < lines.length - 1) {
            heading.appendChild(document.createElement("br"));
          }
        });

        container.appendChild(heading);
        titlesEl.appendChild(container);
        titleContainers.push(container);
      });
    };

    const createInitialSlide = () => {
      const wrapper = document.createElement("div");
      wrapper.className = "hero-image";

      const img = document.createElement("img");
      img.src = slides[0].image;
      img.alt = slides[0].imageAlt;
      img.draggable = false;

      wrapper.appendChild(img);
      imagesEl.appendChild(wrapper);
    };

    const splitTitles = () => {
      titleContainers.forEach((container) => {
        const heading = container.querySelector(".hero-title");
        if (!heading) return;

        const split = SplitText.create(heading, {
          type: "words",
          wordsClass: "hero-word",
        });

        splitInstances.push(split);
        gsap.set(split.words, {
          opacity: 0,
          filter: "blur(18px)",
        });
      });
    };

    const revealFirstTitle = () => {
      const words = titleContainers[0]?.querySelectorAll(".hero-word");
      if (!words?.length) return;

      gsap.to(words, {
        opacity: 1,
        filter: "blur(0px)",
        duration: 1,
        ease: "power2.out",
        stagger: 0.06,
      });
    };

    const updateActiveText = (nextIndex: number) => {
      if (activeTextTween) activeTextTween.kill();

      const tl = gsap.timeline();
      activeTextTween = tl;

      titleContainers.forEach((container, index) => {
        const words = container.querySelectorAll(".hero-word");
        if (!words.length) return;

        if (index === nextIndex) {
          tl.to(
            words,
            {
              opacity: 1,
              filter: "blur(0px)",
              duration: 0.85,
              ease: "power2.out",
              stagger: 0.05,
              onComplete: () => {
                gsap.set(words, { opacity: 1, filter: "blur(0px)" });
              },
            },
            0.15,
          );
        } else {
          tl.to(
            words,
            {
              opacity: 0,
              filter: "blur(18px)",
              duration: 0.45,
              ease: "power2.in",
              stagger: 0.02,
            },
            0,
          );
        }
      });
    };

    const cleanupSlides = () => {
      const layers = imagesEl.querySelectorAll(".hero-image");
      if (layers.length <= 1) return;

      layers.forEach((layer, index) => {
        if (index < layers.length - 1) layer.remove();
      });
    };

    const animateSlide = (direction: "left" | "right") => {
      if (isAnimating) return;
      isAnimating = true;

      const slideDistance = Math.min(window.innerWidth * 0.5, 480);
      const outgoing = imagesEl.querySelector(".hero-image:last-child") as HTMLElement | null;
      const outgoingImg = outgoing?.querySelector("img") as HTMLImageElement | null;

      const incoming = document.createElement("div");
      incoming.className = "hero-image";

      const img = document.createElement("img");
      img.src = slides[currentIndex].image;
      img.alt = slides[currentIndex].imageAlt;
      img.draggable = false;

      incoming.appendChild(img);

      const fromX = direction === "right" ? slideDistance : -slideDistance;
      gsap.set(incoming, {
        x: fromX,
        clipPath:
          direction === "right"
            ? "inset(0% 0% 0% 100%)"
            : "inset(0% 100% 0% 0%)",
      });
      gsap.set(img, { x: direction === "right" ? -slideDistance * 0.35 : slideDistance * 0.35 });

      imagesEl.appendChild(incoming);

      const tl = gsap.timeline({
        onComplete: () => {
          cleanupSlides();
          isAnimating = false;
        },
      });

      if (outgoing && outgoingImg) {
        tl.to(
          outgoing,
          {
            x: direction === "right" ? -slideDistance * 0.45 : slideDistance * 0.45,
            duration: 1,
            ease: "hop",
          },
          0,
        );
      }

      tl.to(
        incoming,
        {
          x: 0,
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1,
          ease: "hop",
        },
        0,
      ).to(
        img,
        {
          x: 0,
          duration: 1,
          ease: "hop",
        },
        0,
      );

      updateActiveText(currentIndex);
    };

    const goNext = () => {
      if (isAnimating) return;
      currentIndex = (currentIndex + 1) % slides.length;
      animateSlide("right");
    };

    const goPrev = () => {
      if (isAnimating) return;
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      animateSlide("left");
    };

    let autoplayId: ReturnType<typeof setInterval> | null = null;

    const startAutoplay = () => {
      if (autoplayId !== null) clearInterval(autoplayId);
      autoplayId = setInterval(goNext, 5000);
    };

    const onManualPrev = () => {
      goPrev();
      startAutoplay();
    };

    const onManualNext = () => {
      goNext();
      startAutoplay();
    };

    createTitles();
    createInitialSlide();

    prevBtn.addEventListener("click", onManualPrev);
    nextBtn.addEventListener("click", onManualNext);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        onManualNext();
      }
      if (event.key === "ArrowLeft") {
        onManualPrev();
      }
    };
    window.addEventListener("keydown", onKeyDown);

    void document.fonts.ready.then(() => {
      if (cancelled) return;
      splitTitles();
      revealFirstTitle();
    });

    startAutoplay();

    return () => {
      cancelled = true;
      if (autoplayId !== null) clearInterval(autoplayId);
      prevBtn.removeEventListener("click", onManualPrev);
      nextBtn.removeEventListener("click", onManualNext);
      window.removeEventListener("keydown", onKeyDown);
      activeTextTween?.kill();
      splitInstances.forEach((split) => split.revert());
      titleContainers.forEach((container) => container.remove());
      imagesEl.replaceChildren();
    };
  }, [slides]);

  return (
    <section
      ref={rootRef}
      className="hero-carousel relative isolate min-h-[100svh] w-full overflow-hidden text-white"
      aria-roledescription="carousel"
      aria-label={dict.title}
    >
      <h1 className="sr-only">{dict.title}</h1>

      <div ref={imagesRef} className="hero-carousel-images" aria-hidden="true" />

      <div className="hero-carousel-veil" aria-hidden="true" />

      <div ref={titlesRef} className="hero-carousel-titles" aria-hidden="true" />

      <button
        ref={prevRef}
        type="button"
        className="hero-nav hero-nav-prev"
        aria-label={dict.prevAria}
      >
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M15 6L9 12L15 18"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <button
        ref={nextRef}
        type="button"
        className="hero-nav hero-nav-next"
        aria-label={dict.nextAria}
      >
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M9 6L15 12L9 18"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div className="hero-carousel-cta">
        <Link
          href={getLocalizedPath(locale, "/contact")}
          className="body-text inline-flex items-center rounded-xl border border-white/50 px-7 py-3.5 text-[16px] font-medium tracking-[0.12em] text-white uppercase transition-colors duration-300 hover:border-black hover:bg-black hover:text-white md:text-[18px]"
        >
          {dict.contactCta}
        </Link>
      </div>

      <svg className="hero-smudge-svg" aria-hidden="true" focusable="false">
        <defs>
          <filter id="hero-smudge">
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0.18
                      0 0 0 18 -7"
            />
          </filter>
        </defs>
      </svg>
    </section>
  );
}
