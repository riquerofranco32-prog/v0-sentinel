"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";

// ponytail: cobe renders a WebGL globe — kept out of the initial bundle and
// only mounted once this section is actually visible (see isVisible below).
const Globe = dynamic(() => import("./ui/globe").then((m) => m.Globe), {
  ssr: false,
});

export function CTA() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-28 lg:py-36 overflow-hidden"
      style={{ background: "#0c0b09" }}
    >
      {/* Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(148,241,190,0.08) 0%, transparent 60%)",
        }}
      />

      {/* Globe */}
      <div className="absolute inset-0 flex items-end justify-center pointer-events-none overflow-hidden select-none opacity-40 md:opacity-60">
        {isVisible && (
          <Globe className="!relative !inset-auto translate-y-1/3" />
        )}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-10 text-center">
        <p
          className={`text-[11px] tracking-[0.3em] uppercase mb-8 transition-all duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}
          style={{
            fontFamily: "var(--font-sans)",
            color: "rgba(240,234,216,0.3)",
          }}
        >
          Empezá hoy
        </p>

        <h2
          className={`text-4xl sm:text-5xl lg:text-6xl mb-6 transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 800,
            color: "rgba(240,234,216,0.92)",
            lineHeight: 1.05,
          }}
        >
          Dejá que Sentinel vigile
          <br />
          <span style={{ color: "#94f1be" }}>para que vos puedas actuar.</span>
        </h2>

        <p
          className={`text-[15px] mb-12 transition-all duration-700 delay-200 ${isVisible ? "opacity-100" : "opacity-0"}`}
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 300,
            color: "rgba(240,234,216,0.4)",
          }}
        >
          Drones autónomos con IA para detectar incendios antes de que sea
          demasiado tarde.
        </p>

        <div
          className={`flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mb-12 transition-all duration-700 delay-[250ms] ${isVisible ? "opacity-100" : "opacity-0"}`}
        >
          {[
            "Sin inversión inicial (CAPEX)",
            "Piloto de 4 a 8 semanas",
            "Para municipios, brigadas y grandes propietarios",
          ].map((item, i) => (
            <div key={item} className="flex items-center gap-8">
              {i > 0 && (
                <div
                  className="hidden sm:block w-px h-3"
                  style={{ background: "rgba(240,234,216,0.15)" }}
                />
              )}
              <span
                className="text-[12px]"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 400,
                  color: "rgba(240,234,216,0.55)",
                }}
              >
                {item}
              </span>
            </div>
          ))}
        </div>

        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <a
            href="https://linktr.ee/sentinelarg"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-sm text-[13px] font-semibold transition-all duration-300 bg-[rgba(148,241,190,0.15)] border border-[rgba(148,241,190,0.4)] text-[#94f1be] hover:bg-[rgba(148,241,190,0.25)] hover:border-[rgba(148,241,190,0.7)] hover:-translate-y-0.5"
            style={{ fontFamily: "var(--font-sans)", letterSpacing: "0.04em" }}
          >
            Solicitar una reunión
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href="#servicios"
            className="inline-flex items-center justify-center px-8 py-4 rounded-sm text-[13px] font-light transition-all duration-300 border border-[rgba(240,234,216,0.1)] text-[rgba(240,234,216,0.45)] hover:border-[rgba(240,234,216,0.3)] hover:text-[rgba(240,234,216,0.75)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Ver cómo funciona
          </a>
        </div>
      </div>
    </section>
  );
}
