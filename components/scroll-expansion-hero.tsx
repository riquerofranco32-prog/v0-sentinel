"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface ScrollExpandMediaProps {
  mediaType?: "video" | "image";
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  children?: ReactNode;
}

const ScrollExpandMedia = ({
  mediaType = "video",
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend,
  children,
}: ScrollExpandMediaProps) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobileState, setIsMobileState] = useState(false);
  // ponytail: the expanded box used to grow toward a fixed pixel target
  // (~1550x800) tuned for ~1600px-wide screens. On anything wider than
  // that, the box stalled far short of the viewport while the dark
  // backdrop had already faded to transparent — leaving a growing cream
  // gap around it for the whole rest of the scroll-jack. Tracking real
  // viewport size lets the target grow with the screen instead.
  const [viewport, setViewport] = useState({ width: 1920, height: 1080 });
  const pinZoneRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // ponytail: mobile browsers fire "resize" when the address bar
    // shows/hides during scroll (viewport height changes, width doesn't) —
    // only react to actual width changes so scrolling on mobile doesn't
    // keep re-triggering this.
    let lastWidth = window.innerWidth;
    const checkIfMobile = (): void => {
      if (window.innerWidth === lastWidth) return;
      lastWidth = window.innerWidth;
      setIsMobileState(window.innerWidth < 768);
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    };
    setIsMobileState(window.innerWidth < 768);
    setViewport({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // ponytail: driven by real window scroll (sticky element + scroll math)
  // instead of intercepting wheel/touch with preventDefault. The previous
  // version hijacked the wheel to fake a scroll, which fought trackpad
  // momentum, keyboard scroll and anchor-link navigation, and felt "stuck"
  // to real users. This never blocks native scrolling — it just reads it.
  useEffect(() => {
    // ponytail: cache the pin zone's document-relative top once (on mount
    // and on resize) instead of calling getBoundingClientRect() on every
    // scroll frame. That call forces a synchronous layout flush right after
    // this same component's width/height write from the previous frame —
    // a classic write-then-read thrash loop that stutters scroll. Deriving
    // progress from window.scrollY avoids the forced layout read entirely.
    let pinTop = 0;
    let scrollRange = 0;
    let ticking = false;
    let lastStep = -1;
    let lastWidth = window.innerWidth;

    const measure = (): void => {
      const el = pinZoneRef.current;
      if (!el) return;
      pinTop = el.getBoundingClientRect().top + window.scrollY;
      scrollRange = el.offsetHeight - window.innerHeight;
    };
    const updateProgress = (): void => {
      ticking = false;
      const progress =
        scrollRange > 0
          ? Math.min(Math.max((window.scrollY - pinTop) / scrollRange, 0), 1)
          : 0;
      // ponytail: this drives a width/height resize (non-composited, forces
      // layout) every time it changes — round to 200 discrete steps so a
      // 1px scroll delta doesn't trigger a re-render for an imperceptible
      // size change. Still smooth, just fewer layout passes.
      const step = Math.round(progress * 200);
      if (step === lastStep) return;
      lastStep = step;
      setScrollProgress(step / 200);
    };
    const onScroll = (): void => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(updateProgress);
    };
    const onResize = (): void => {
      // ponytail: same address-bar-collapse issue as the isMobileState
      // effect above — a pure height change (toolbar show/hide) shouldn't
      // re-measure and shift the scroll math mid-gesture.
      if (window.innerWidth === lastWidth) return;
      lastWidth = window.innerWidth;
      measure();
      onScroll();
    };

    measure();
    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const showContent = scrollProgress >= 0.85;
  // ponytail: grow toward a share of the actual viewport instead of a
  // fixed pixel target, so the box reaches ~full-bleed on wide screens
  // too instead of stalling and leaving a cream gap (see viewport state
  // above).
  const targetWidth = viewport.width * (isMobileState ? 0.94 : 0.96);
  const targetHeight = viewport.height * (isMobileState ? 0.7 : 0.88);
  const mediaWidth = 300 + scrollProgress * (targetWidth - 300);
  const mediaHeight = 400 + scrollProgress * (targetHeight - 400);
  const textTranslateX = scrollProgress * (isMobileState ? 180 : 150);

  const firstWord = title ? title.split(" ")[0] : "";
  const restOfTitle = title ? title.split(" ").slice(1).join(" ") : "";

  return (
    <div className="relative">
      {/* ponytail: was 180vh — since the content section starts exactly at
          this height in document flow, the total height IS the total
          scroll needed before subhead+stats appear. 180vh meant ~0.8
          viewport-heights of expand animation followed by another full
          viewport-height of scrolling past an already-fully-expanded,
          static video before any new content showed — the reported dead
          gap. 145vh keeps a real expand animation but cuts that idle
          pass-by by roughly a third. */}
      <div ref={pinZoneRef} className="relative" style={{ height: "145vh" }}>
        <div className="sticky top-0 h-[100dvh] overflow-hidden">
          <motion.div
            className="absolute inset-0 z-0 h-full"
            initial={false}
            animate={{ opacity: 1 - scrollProgress }}
            transition={{ duration: 0.1 }}
          >
            <Image
              src={bgImageSrc}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-[#0c0b09]/50" />
          </motion.div>

          <div className="container mx-auto flex flex-col items-center justify-center relative z-10 h-full">
            <div className="flex flex-col items-center justify-center w-full h-full relative">
              <div
                className="absolute z-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-none rounded-2xl"
                style={{
                  width: `${mediaWidth}px`,
                  height: `${mediaHeight}px`,
                  maxWidth: "95vw",
                  maxHeight: "85vh",
                  // ponytail: was a flat pure-black glow (0,0,0,0.4) — tinted
                  // to the page's ink color instead, plus a thin light inset
                  // edge, so the box reads as a considered framed card
                  // rather than a default drop-shadow.
                  boxShadow:
                    "0 30px 70px -20px rgba(26,24,18,0.45), inset 0 0 0 1px rgba(240,234,216,0.08)",
                  // ponytail: this box resizes every scroll frame while
                  // pinned — contain keeps that layout/paint work scoped to
                  // itself instead of the browser re-checking ancestors.
                  contain: "layout paint",
                }}
              >
                {mediaType === "video" ? (
                  <div className="relative w-full h-full pointer-events-none">
                    <video
                      src={mediaSrc}
                      poster={posterSrc}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                      // @ts-expect-error -- fetchPriority is valid on video/img but not yet in this React DOM typing
                      fetchPriority="high"
                      className="w-full h-full object-cover rounded-xl"
                      controls={false}
                      disablePictureInPicture
                      disableRemotePlayback
                    />
                    <motion.div
                      className="absolute inset-0 bg-black/30 rounded-xl"
                      initial={{ opacity: 0.7 }}
                      animate={{ opacity: 0.5 - scrollProgress * 0.3 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                ) : (
                  <div className="relative w-full h-full">
                    <Image
                      src={mediaSrc}
                      alt={title || "Media content"}
                      fill
                      sizes="95vw"
                      className="object-cover rounded-xl"
                    />
                    <motion.div
                      className="absolute inset-0 bg-black/50 rounded-xl"
                      initial={{ opacity: 0.7 }}
                      animate={{ opacity: 0.7 - scrollProgress * 0.3 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                )}

                <div className="flex flex-col items-center text-center relative z-10 mt-5 transition-none">
                  {date && (
                    <div
                      className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-medium tracking-wider uppercase mb-2"
                      style={{
                        background: "rgba(12,11,9,0.8)",
                        border: "0.5px solid rgba(148,241,190,0.3)",
                        backdropFilter: "blur(8px)",
                        color: "#94f1be",
                        fontFamily: "var(--font-sans)",
                        transform: `translateX(-${textTranslateX}vw)`,
                      }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#94f1be]" />
                      {date}
                    </div>
                  )}
                  {scrollToExpand && (
                    <p
                      className="text-[12px] tracking-wide"
                      style={{
                        color: "rgba(240,234,216,0.5)",
                        fontFamily: "var(--font-sans)",
                        transform: `translateX(${textTranslateX}vw)`,
                      }}
                    >
                      {scrollToExpand}
                    </p>
                  )}
                </div>
              </div>

              <h1
                className={`flex items-center justify-center text-center gap-2 w-full relative z-10 transition-none flex-col font-extrabold text-4xl sm:text-5xl lg:text-7xl tracking-[-0.03em] ${
                  textBlend ? "mix-blend-difference" : "mix-blend-normal"
                }`}
                style={{ fontFamily: "var(--font-heading)", lineHeight: 1.05 }}
              >
                <motion.span
                  className="transition-none"
                  style={{
                    color: "rgba(240,234,216,0.95)",
                    transform: `translateX(-${textTranslateX}vw)`,
                  }}
                >
                  {firstWord}
                </motion.span>
                <motion.span
                  className="text-center transition-none"
                  style={{
                    color: "#94f1be",
                    transform: `translateX(${textTranslateX}vw)`,
                  }}
                >
                  {restOfTitle}
                </motion.span>
              </h1>
            </div>
          </div>
        </div>
      </div>

      <motion.section
        className="relative z-10 flex flex-col w-full px-8 py-10 md:px-16 lg:py-20 bg-[#faf7f0]"
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: 0.7 }}
      >
        {children}
      </motion.section>
    </div>
  );
};

export default ScrollExpandMedia;
