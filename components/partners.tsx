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
      style={{ background: "#faf7f0" }}
    >
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-10 text-center">
        <h2
          className="text-3xl sm:text-4xl mb-4"
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 800,
            color: "rgba(26,24,18,0.92)",
            lineHeight: 1.1,
          }}
        >
          Instituciones que{" "}
          <span style={{ color: "#0f7a4f" }}>nos acompañan.</span>
        </h2>
        <p
          className="text-[14px] max-w-lg mx-auto mb-14"
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 300,
            color: "rgba(26,24,18,0.4)",
          }}
        >
          Universidades, cámaras y organizaciones que respaldaron a Sentinel en
          su camino desde una idea universitaria hasta una plataforma en
          producción.
        </p>

        <div
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-6 sm:gap-8 items-center justify-items-center transition-all duration-700 max-w-5xl mx-auto"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(16px)",
          }}
        >
          {logos.map((logo, i) => (
            <div
              key={logo.id}
              className="flex items-center justify-center p-3 h-16 w-full rounded-lg transition-all duration-300 hover:bg-[rgba(26,24,18,0.03)] group"
            >
              <img
                src={logo.image}
                alt={logo.description}
                title={logo.description}
                loading="lazy"
                className="max-h-9 max-w-[100px] w-auto object-contain transition-all duration-300 group-hover:scale-105 opacity-60 group-hover:opacity-100"
                style={{
                  filter: "grayscale(100%) brightness(0)",
                  transitionDelay: `${i * 20}ms`,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
