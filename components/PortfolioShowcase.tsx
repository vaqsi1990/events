"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { type Dictionary } from "@/lib/i18n";

gsap.registerPlugin(CustomEase);

if (!CustomEase.get("hop")) {
  CustomEase.create("hop", "0.9, 0, 0.1, 1");
}

type PortfolioShowcaseProps = {
  dict: Dictionary["portfolio"];
};

type Slide = Dictionary["portfolio"]["slides"][number];

/** Fan offsets relative to stage center (percent-based for responsiveness). */
const LAYER_LAYOUT = [
  { xPercent: -18, yPercent: 10, rotation: -11, scale: 0.78, zIndex: 1 },
  { xPercent: 0, yPercent: 0, rotation: 0, scale: 1, zIndex: 3 },
  { xPercent: 16, yPercent: -12, rotation: 13, scale: 0.82, zIndex: 2 },
] as const;

export default function PortfolioShowcase({ dict }: PortfolioShowcaseProps) {
  const rootRef = useRef<HTMLElement>(null);
  const clusterRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const slides = dict.slides as readonly Slide[];

  useEffect(() => {
    const clusterEl = clusterRef.current;
    const textEl = textRef.current;
    const counterEl = counterRef.current;
    const prevBtn = prevRef.current;
    const nextBtn = nextRef.current;

    if (!clusterEl || !textEl || !counterEl || !prevBtn || !nextBtn) return;

    let currentIndex = 0;
    let isAnimating = false;
    let activeTextTween: gsap.core.Timeline | null = null;
    const textPanels: HTMLDivElement[] = [];

    const nestLayer = (slide: Slide, layout: (typeof LAYER_LAYOUT)[number]) => {
      const layer = document.createElement("div");
      layer.className = "ps-layer";

      const frame = document.createElement("div");
      frame.className = "ps-layer-frame";

      const img = document.createElement("img");
      img.src = slide.image;
      img.alt = slide.imageAlt;
      img.draggable = false;

      frame.appendChild(img);
      layer.appendChild(frame);

      gsap.set(layer, {
        xPercent: -50 + layout.xPercent,
        yPercent: -50 + layout.yPercent,
        rotation: layout.rotation,
        scale: layout.scale,
        zIndex: layout.zIndex,
        top: "50%",
        left: "50%",
        autoAlpha: 1,
      });

      return layer;
    };

    const nestCluster = (slide: Slide) => {
      const cluster = document.createElement("div");
      cluster.className = "ps-cluster";
      LAYER_LAYOUT.forEach((layout) => {
        cluster.appendChild(nestLayer(slide, layout));
      });
      return cluster;
    };

    const nestTextPanels = () => {
      slides.forEach((slide, index) => {
        const panel = document.createElement("div");
        panel.className = "ps-text-panel";

        const badge = document.createElement("span");
        badge.className = "ps-text-badge body-text";
        badge.textContent = String(index + 1).padStart(2, "0");

        const goldLine = document.createElement("span");
        goldLine.className = "ps-gold-line";
        goldLine.setAttribute("aria-hidden", "true");

        const title = document.createElement("h2");
        title.className = "main-text ps-text-title";
        const [accent, ...rest] = slide.title.split(" ");
        const accentSpan = document.createElement("span");
        accentSpan.className = "ps-text-accent";
        accentSpan.textContent = accent ?? slide.title;
        title.appendChild(accentSpan);
        if (rest.length) {
          title.appendChild(document.createTextNode(` ${rest.join(" ")}`));
        }

        const description = document.createElement("p");
        description.className = "body-text ps-text-desc";
        description.textContent = slide.description;

        panel.append(badge, goldLine, title, description);
        textEl.appendChild(panel);
        textPanels.push(panel);

        gsap.set(panel, {
          autoAlpha: index === 0 ? 1 : 0,
          y: index === 0 ? 0 : 24,
          filter: index === 0 ? "blur(0px)" : "blur(10px)",
        });
      });
    };

    const updateCounter = (index: number) => {
      counterEl.textContent = `${String(index + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
    };

    const updateText = (nextIndex: number) => {
      if (activeTextTween) activeTextTween.kill();
      const tl = gsap.timeline();
      activeTextTween = tl;

      textPanels.forEach((panel, index) => {
        if (index === nextIndex) {
          tl.to(
            panel,
            {
              autoAlpha: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.8,
              ease: "power2.out",
            },
            0.1,
          );
        } else {
          tl.to(
            panel,
            {
              autoAlpha: 0,
              y: -16,
              filter: "blur(10px)",
              duration: 0.4,
              ease: "power2.in",
            },
            0,
          );
        }
      });
    };

    const animateTransition = (direction: "left" | "right") => {
      if (isAnimating) return;
      isAnimating = true;

      const outgoing = clusterEl.querySelector(".ps-cluster") as HTMLElement | null;
      const incoming = nestCluster(slides[currentIndex]);
      const exitX = direction === "right" ? -55 : 55;
      const enterX = direction === "right" ? 55 : -55;
      const spin = direction === "right" ? 18 : -18;

      gsap.set(incoming.querySelectorAll(".ps-layer"), {
        xPercent: (i) => -50 + LAYER_LAYOUT[i].xPercent + enterX,
        yPercent: (i) => -50 + LAYER_LAYOUT[i].yPercent + 18,
        rotation: (i) => LAYER_LAYOUT[i].rotation + spin,
        scale: (i) => LAYER_LAYOUT[i].scale * 0.75,
        autoAlpha: 0,
      });

      clusterEl.appendChild(incoming);

      const tl = gsap.timeline({
        onComplete: () => {
          outgoing?.remove();
          isAnimating = false;
        },
      });

      if (outgoing) {
        tl.to(
          outgoing.querySelectorAll(".ps-layer"),
          {
            xPercent: (i) => -50 + LAYER_LAYOUT[i].xPercent + exitX,
            yPercent: (i) => -50 + LAYER_LAYOUT[i].yPercent - 14,
            rotation: (i) => LAYER_LAYOUT[i].rotation - spin,
            scale: (i) => LAYER_LAYOUT[i].scale * 0.7,
            autoAlpha: 0,
            duration: 0.85,
            stagger: 0.04,
            ease: "hop",
          },
          0,
        );
      }

      tl.to(
        incoming.querySelectorAll(".ps-layer"),
        {
          xPercent: (i) => -50 + LAYER_LAYOUT[i].xPercent,
          yPercent: (i) => -50 + LAYER_LAYOUT[i].yPercent,
          rotation: (i) => LAYER_LAYOUT[i].rotation,
          scale: (i) => LAYER_LAYOUT[i].scale,
          autoAlpha: 1,
          duration: 0.95,
          stagger: 0.05,
          ease: "hop",
        },
        0.08,
      );

      updateText(currentIndex);
      updateCounter(currentIndex);
    };

    const goNext = () => {
      if (isAnimating) return;
      currentIndex = (currentIndex + 1) % slides.length;
      animateTransition("right");
    };

    const goPrev = () => {
      if (isAnimating) return;
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      animateTransition("left");
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") goNext();
      if (event.key === "ArrowLeft") goPrev();
    };

    clusterEl.appendChild(nestCluster(slides[0]));
    nestTextPanels();
    updateCounter(0);

    prevBtn.addEventListener("click", goPrev);
    nextBtn.addEventListener("click", goNext);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      prevBtn.removeEventListener("click", goPrev);
      nextBtn.removeEventListener("click", goNext);
      window.removeEventListener("keydown", onKeyDown);
      activeTextTween?.kill();
      textPanels.forEach((panel) => panel.remove());
      clusterEl.replaceChildren();
    };
  }, [slides]);

  return (
    <section
      ref={rootRef}
      className="ps-section"
      aria-roledescription="carousel"
      aria-label={dict.pageTitle}
    >
      <div className="ps-header">
        
        
        <h1 className="main-text ps-page-title">{dict.pageTitle}</h1>
        <p className="body-text ps-page-intro">{dict.pageIntro}</p>
      </div>

      <div className="ps-stage">
        <div className="ps-text-wrap">
          <div ref={textRef} className="ps-text-stack" aria-live="polite" />
         
        </div>

        <div className="ps-visual">
          <div className="ps-controls">
            <button
              ref={prevRef}
              type="button"
              className="ps-nav ps-nav-prev"
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

            <span ref={counterRef} className="body-text ps-counter">
              01 / {String(slides.length).padStart(2, "0")}
            </span>

            <button
              ref={nextRef}
              type="button"
              className="ps-nav ps-nav-next"
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
          </div>

          <div ref={clusterRef} className="ps-cluster-stage" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
