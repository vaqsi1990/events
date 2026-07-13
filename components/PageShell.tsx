"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

type PageShellProps = {
  children: React.ReactNode;
  className?: string;
  title?: string;
  eyebrow?: string;
};

export default function PageShell({
  children,
  className = "",
  title,
  eyebrow,
}: PageShellProps) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const items = root.querySelectorAll("[data-reveal]");
      gsap.fromTo(
        items,
        { autoAlpha: 0, y: 36 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.12,
          ease: "power3.out",
          delay: 0.15,
        },
      );
    }, root);

    return () => ctx.revert();
  }, [title]);

  return (
    <main
      ref={rootRef}
      className={`min-h-[100svh] bg-[#0c0c0c] pt-28 text-white ${className}`}
    >
      {(eyebrow || title) && (
        <header className="mx-auto max-w-[1400px] px-5 pb-16 md:px-8">
          {eyebrow && (
            <p
              data-reveal
              className="body-text mb-4 text-sm tracking-[0.2em] text-white/50 uppercase"
            >
              {eyebrow}
            </p>
          )}
          {title && (
            <h1
              data-reveal
              className="main-text text-4xl tracking-tight md:text-6xl lg:text-7xl"
            >
              {title}
            </h1>
          )}
        </header>
      )}
      <div data-reveal className="mx-auto max-w-[1400px] px-5 pb-24 md:px-8">
        {children}
      </div>
    </main>
  );
}
