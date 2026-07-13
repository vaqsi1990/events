"use client";

import { useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);

function LenisScrollTriggerSync() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);
    ScrollTrigger.refresh();

    return () => {
      lenis.off("scroll", onScroll);
    };
  }, [lenis]);

  return null;
}

type SmoothScrollProps = {
  children: React.ReactNode;
};

export default function SmoothScroll({ children }: SmoothScrollProps) {
  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        lerp: 0.08,
        duration: 1.15,
        smoothWheel: true,
        syncTouch: false,
        touchMultiplier: 1.2,
        wheelMultiplier: 0.85,
        anchors: true,
        autoToggle: true,
        stopInertiaOnNavigate: true,
      }}
    >
      <LenisScrollTriggerSync />
      {children}
    </ReactLenis>
  );
}
