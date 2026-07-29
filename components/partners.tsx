"use client";

import { useEffect, useRef, useState } from "react";

const logos = [
  { id: "uba", description: "UBA", image: "/uba-logo.png" },
  { id: "aiweken", description: "Aiweken", image: "/aiweken.png" },
  { id: "cice", description: "CICE", image: "/cice.png" },
  { id: "empretec", description: "Empretec", image: "/empretec.png" },
  { id: "endeavor", description: "Endeavor", image: "/endeavor.png" },
  {
    id: "fpn",
    description: "Fundación Patagonia Natural",
    image: "/FPN2.webp",
  },
  { id: "ilan", description: "ILAN", image: "/ilan.png" },
  { id: "movistar", description: "Movistar", image: "/movistar-3.svg" },
  { id: "sadosky", description: "Sadosky", image: "/sadosky.png" },
  { id: "scale", description: "Scale", image: "/scale.png" },
  { id: "ue", description: "UE", image: "/ue.png" },
  { id: "uncuyo", description: "UNCUYO", image: "/uncuyo.png" },
  { id: "unl", description: "UNL", image: "/unl.png" },
  { id: "utn", description: "UTN", image: "/utn.png" },
];

export function Partners() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.05 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-28 overflow-hidden"
      style={{ background: "#0c0b09" }}
    >
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-10 text-center">
        <p
          className="text-[11px] tracking-[0.3em] uppercase mb-4"
          style={{
            fontFamily: "var(--font-sans)",
            color: "rgba(240,234,216,0.3)",
          }}
        >
          Instituciones que nos acompañan
        </p>
        <p
          className="text-[14px] max-w-lg mx-auto mb-14"
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 300,
            color: "rgba(240,234,216,0.4)",
          }}
        >
          Universidades, cámaras y organizaciones que respaldaron a Sentinel en
          su camino desde una idea universitaria hasta una plataforma en
          producción.
        </p>

        <div
          className="flex flex-wrap items-center justify-center gap-x-14 gap-y-10 transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(16px)",
          }}
        >
          {logos.map((logo, i) => (
            <img
              key={logo.id}
              src={logo.image}
              alt={logo.description}
              title={logo.description}
              loading="lazy"
              className="h-10 sm:h-12 w-auto object-contain transition-all duration-300 hover:scale-110"
              style={{
                filter: "grayscale(100%) brightness(0) invert(1)",
                opacity: 0.65,
                transitionDelay: `${i * 30}ms`,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.65")}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
