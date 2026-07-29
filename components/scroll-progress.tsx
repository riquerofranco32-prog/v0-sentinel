"use client";

import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // ponytail: rAF-throttled + passive so this runs at most once per frame
    // instead of on every raw scroll event (was causing layout reads + a
    // setState on every pixel of scroll).
    let ticking = false;
    const updateProgress = () => {
      ticking = false;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollTop = window.scrollY;
      setProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);
    };
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(updateProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-1 bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-[#94f1be] to-[#6dd9a0] transition-all duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
