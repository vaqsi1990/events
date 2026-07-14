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

/** 0 = previous (left), 1 = current (front), 2 = next (right). */
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
    const layers: HTMLDivElement[] = [];
    const images: HTMLImageElement[] = [];

    const wrap = (index: number) =>
      (index + slides.length) % slides.length;

    /** Left = previous, center = current, right = next. */
    const stackSlides = (index: number) => [
      slides[wrap(index - 1)],
      slides[wrap(index)],
      slides[wrap(index + 1)],
    ] as const;

    const nestLayer = (
      slide: Slide,
      layout: (typeof LAYER_LAYOUT)[number],
    ) => {
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

      layers.push(layer);
      images.push(img);
      return layer;
    };

    const nestStack = (index: number) => {
      const cluster = document.createElement("div");
      cluster.className = "ps-cluster";
      const trio = stackSlides(index);
      LAYER_LAYOUT.forEach((layout, i) => {
        cluster.appendChild(nestLayer(trio[i], layout));
      });
      return cluster;
    };

    const setLayout = (
      layer: HTMLElement,
      layout: (typeof LAYER_LAYOUT)[number],
      extras: gsap.TweenVars = {},
    ) => {
      gsap.set(layer, {
        xPercent: -50 + layout.xPercent,
        yPercent: -50 + layout.yPercent,
        rotation: layout.rotation,
        scale: layout.scale,
        zIndex: layout.zIndex,
        autoAlpha: 1,
        ...extras,
      });
    };

    const moveToLayout = (
      layer: HTMLElement,
      layout: (typeof LAYER_LAYOUT)[number],
      duration = 0.85,
    ) =>
      gsap.to(layer, {
        xPercent: -50 + layout.xPercent,
        yPercent: -50 + layout.yPercent,
        rotation: layout.rotation,
        scale: layout.scale,
        zIndex: layout.zIndex,
        autoAlpha: 1,
        duration,
        ease: "hop",
      });

    const reorderStack = (nextOrder: [number, number, number]) => {
      const nextLayers = nextOrder.map((i) => layers[i]);
      const nextImages = nextOrder.map((i) => images[i]);
      layers.splice(0, layers.length, ...nextLayers);
      images.splice(0, images.length, ...nextImages);

      const cluster = clusterEl.querySelector(".ps-cluster");
      if (cluster) {
        nextLayers.forEach((layer) => cluster.appendChild(layer));
      }

      LAYER_LAYOUT.forEach((layout, i) => setLayout(layers[i], layout));
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
      if (isAnimating || layers.length < 3) return;
      isAnimating = true;

      const left = layers[0];
      const center = layers[1];
      const right = layers[2];
      const layoutL = LAYER_LAYOUT[0];
      const layoutC = LAYER_LAYOUT[1];
      const layoutR = LAYER_LAYOUT[2];

      const tl = gsap.timeline({
        onComplete: () => {
          isAnimating = false;
        },
      });

      if (direction === "right") {
        const incoming = slides[wrap(currentIndex + 1)];

        tl.add(moveToLayout(center, layoutL), 0);
        tl.add(moveToLayout(right, layoutC), 0);

        tl.to(
          left,
          {
            xPercent: -50 + layoutL.xPercent - 55,
            yPercent: -50 + layoutL.yPercent + 8,
            rotation: layoutL.rotation - 16,
            scale: layoutL.scale * 0.72,
            autoAlpha: 0,
            duration: 0.5,
            ease: "power2.in",
          },
          0,
        );

        tl.set(left, {
          xPercent: -50 + layoutR.xPercent + 55,
          yPercent: -50 + layoutR.yPercent - 6,
          rotation: layoutR.rotation + 16,
          scale: layoutR.scale * 0.78,
          autoAlpha: 0,
          zIndex: layoutR.zIndex,
        });

        tl.add(() => {
          images[0].src = incoming.image;
          images[0].alt = incoming.imageAlt;
        });

        tl.to(
          left,
          {
            xPercent: -50 + layoutR.xPercent,
            yPercent: -50 + layoutR.yPercent,
            rotation: layoutR.rotation,
            scale: layoutR.scale,
            autoAlpha: 1,
            duration: 0.7,
            ease: "hop",
          },
          "-=0.12",
        );

        tl.add(() => reorderStack([1, 2, 0]));
      } else {
        const incoming = slides[wrap(currentIndex - 1)];

        tl.add(moveToLayout(center, layoutR), 0);
        tl.add(moveToLayout(left, layoutC), 0);

        tl.to(
          right,
          {
            xPercent: -50 + layoutR.xPercent + 55,
            yPercent: -50 + layoutR.yPercent - 8,
            rotation: layoutR.rotation + 16,
            scale: layoutR.scale * 0.72,
            autoAlpha: 0,
            duration: 0.5,
            ease: "power2.in",
          },
          0,
        );

        tl.set(right, {
          xPercent: -50 + layoutL.xPercent - 55,
          yPercent: -50 + layoutL.yPercent + 6,
          rotation: layoutL.rotation - 16,
          scale: layoutL.scale * 0.78,
          autoAlpha: 0,
          zIndex: layoutL.zIndex,
        });

        tl.add(() => {
          images[2].src = incoming.image;
          images[2].alt = incoming.imageAlt;
        });

        tl.to(
          right,
          {
            xPercent: -50 + layoutL.xPercent,
            yPercent: -50 + layoutL.yPercent,
            rotation: layoutL.rotation,
            scale: layoutL.scale,
            autoAlpha: 1,
            duration: 0.7,
            ease: "hop",
          },
          "-=0.12",
        );

        tl.add(() => reorderStack([2, 0, 1]));
      }

      updateText(currentIndex);
      updateCounter(currentIndex);
    };

    const goNext = () => {
      if (isAnimating) return;
      currentIndex = wrap(currentIndex + 1);
      animateTransition("right");
    };

    const goPrev = () => {
      if (isAnimating) return;
      currentIndex = wrap(currentIndex - 1);
      animateTransition("left");
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") goNext();
      if (event.key === "ArrowLeft") goPrev();
    };

    clusterEl.appendChild(nestStack(0));
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
