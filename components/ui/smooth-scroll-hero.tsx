"use client";
import * as React from "react";

import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

interface SmoothScrollHeroProps {
  /** Height of the scroll section in pixels @default 1500 */
  scrollHeight?: number;
  /** Background image URL for desktop view */
  desktopImage: string;
  /** Background image URL for mobile view */
  mobileImage: string;
  /** Initial clip path percentage @default 25 */
  initialClipPercentage?: number;
  /** Final clip path percentage @default 75 */
  finalClipPercentage?: number;
  /** Content pinned over the background while it scrolls/zooms in */
  children?: React.ReactNode;
}

function SmoothScrollHeroBackground({
  scrollHeight = 1500,
  desktopImage,
  mobileImage,
  initialClipPercentage = 25,
  finalClipPercentage = 75,
  children,
}: SmoothScrollHeroProps) {
  const { scrollY } = useScroll();
  // ponytail: the clip/zoom is scroll-linked, not scroll-hijacked (no
  // preventDefault), but it's still a large parallax effect — vestibular
  // trigger for prefers-reduced-motion users, so pin it to its resting
  // state instead of tying it to scroll for them.
  const reduceMotion = useReducedMotion();

  const clipStart = useTransform(
    scrollY,
    [0, scrollHeight],
    [initialClipPercentage, 0],
  );
  const clipEnd = useTransform(
    scrollY,
    [0, scrollHeight],
    [finalClipPercentage, 100],
  );

  const clipPath = useMotionTemplate`polygon(${clipStart}% ${clipStart}%, ${clipEnd}% ${clipStart}%, ${clipEnd}% ${clipEnd}%, ${clipStart}% ${clipEnd}%)`;

  const backgroundSize = useTransform(
    scrollY,
    [0, scrollHeight + 500],
    ["170%", "100%"],
  );

  const contentOpacity = useTransform(scrollY, [0, scrollHeight * 0.4], [1, 0]);

  return (
    <motion.div
      className="sticky top-0 h-screen w-full bg-black"
      style={{
        clipPath: reduceMotion
          ? "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
          : clipPath,
        willChange: "transform, opacity",
      }}
    >
      <motion.div
        className="absolute inset-0 md:hidden"
        style={{
          backgroundImage: `url(${mobileImage})`,
          backgroundSize: reduceMotion ? "100%" : backgroundSize,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <motion.div
        className="absolute inset-0 hidden md:block"
        style={{
          backgroundImage: `url(${desktopImage})`,
          backgroundSize: reduceMotion ? "100%" : backgroundSize,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="absolute inset-0 bg-[#0c0b09]/45" />

      {children && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center px-6"
          style={{ opacity: reduceMotion ? 1 : contentOpacity }}
        >
          {children}
        </motion.div>
      )}
    </motion.div>
  );
}

export default function SmoothScrollHero({
  scrollHeight = 1500,
  desktopImage,
  mobileImage,
  initialClipPercentage = 25,
  finalClipPercentage = 75,
  children,
}: SmoothScrollHeroProps) {
  return (
    <div
      style={{ height: `calc(${scrollHeight}px + 100vh)` }}
      className="relative w-full"
    >
      <SmoothScrollHeroBackground
        scrollHeight={scrollHeight}
        desktopImage={desktopImage}
        mobileImage={mobileImage}
        initialClipPercentage={initialClipPercentage}
        finalClipPercentage={finalClipPercentage}
      >
        {children}
      </SmoothScrollHeroBackground>
    </div>
  );
}
