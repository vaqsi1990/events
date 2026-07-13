"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { SplitText } from "gsap/SplitText";
import { TransitionRouter } from "next-transition-router";

gsap.registerPlugin(CustomEase, SplitText);

CustomEase.create("hop", "0.9, 0, 0.1, 1");

const ROW_COUNT = 4;

type PageTransitionProps = {
  children: React.ReactNode;
  brand?: string;
};

export default function PageTransition({
  children,
  brand = "Event",
}: PageTransitionProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const blocksRef = useRef<HTMLDivElement[]>([]);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const wordsRef = useRef<HTMLElement[]>([]);
  const splitRef = useRef<SplitText | null>(null);

  useEffect(() => {
    if (!headingRef.current) return;

    const split = SplitText.create(headingRef.current, {
      type: "words",
      wordsClass: "page-transition-word",
      mask: "words",
    });

    splitRef.current = split;
    wordsRef.current = split.words as HTMLElement[];

    gsap.set(wordsRef.current, { yPercent: 120 });

    return () => {
      split.revert();
      splitRef.current = null;
      wordsRef.current = [];
    };
  }, [brand]);

  const animateIn = (onComplete: () => void) => {
    const blocks = blocksRef.current;
    const words = wordsRef.current;

    const tl = gsap.timeline({ onComplete });

    gsap.set(blocks, { transformOrigin: "left center", scaleX: 0 });
    gsap.set(words, { yPercent: 120 });

    tl.to(blocks, {
      scaleX: 1,
      duration: 0.32,
      ease: "hop",
      stagger: 0.045,
    }).to(
      words,
      {
        yPercent: 0,
        duration: 0.4,
        ease: "power4.out",
        stagger: 0.025,
      },
      "-=0.2",
    );

    return tl;
  };

  const animateOut = (onComplete: () => void) => {
    const blocks = blocksRef.current;
    const words = wordsRef.current;

    const tl = gsap.timeline({ onComplete });

    gsap.set(blocks, { transformOrigin: "right center" });

    tl.to(words, {
      yPercent: 120,
      duration: 0.25,
      ease: "power4.in",
      stagger: 0.02,
    }).to(
      blocks,
      {
        scaleX: 0,
        duration: 0.32,
        ease: "hop",
        stagger: 0.045,
      },
      "-=0.2",
    );

    return tl;
  };

  return (
    <TransitionRouter
      auto
      leave={(next) => {
        const tl = animateIn(next);
        return () => tl.kill();
      }}
      enter={(next) => {
        const tl = animateOut(next);
        return () => tl.kill();
      }}
    >
      <div
        ref={gridRef}
        className="page-transition-grid"
        aria-hidden="true"
      >
        {Array.from({ length: ROW_COUNT }, (_, index) => (
          <div
            key={index}
            className="page-transition-block"
            ref={(el) => {
              if (el) blocksRef.current[index] = el;
            }}
          />
        ))}
      </div>

      <div className="page-transition-text" aria-hidden="true">
        <h2 ref={headingRef} className="page-transition-heading main-text">
          {brand}
        </h2>
      </div>

      {children}
    </TransitionRouter>
  );
}
