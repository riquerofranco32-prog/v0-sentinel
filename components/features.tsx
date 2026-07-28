"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { WorldMap } from "./ui/world-map";

const PATAGONIA = { lat: -41.1335, lng: -71.3103 }; // Bariloche

export function Features() {
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
      id="nosotros"
      className="relative py-24 lg:py-32 bg-[#0c0b09] overflow-hidden"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
        style={{
          opacity: isVisible ? 1 : 0,
          backgroundImage:
            "radial-gradient(ellipse 70% 50% at 65% 55%, rgba(148,241,190,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Subtle grid lines */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{ opacity: 0.025 }}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 w-px"
            style={{
              left: `${(i + 1) * 12.5}%`,
              background: "rgba(148,241,190,1)",
            }}
          />
        ))}
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="absolute left-0 right-0 h-px"
            style={{
              top: `${(i + 1) * 16.6}%`,
              background: "rgba(148,241,190,1)",
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* ── HEADER ── */}
        <div className="mb-16">
          <p
            className="text-[11px] tracking-[0.3em] uppercase mb-5 transition-all duration-700"
            style={{
              fontFamily: "var(--font-sans)",
              color: "rgba(240,234,216,0.3)",
              opacity: isVisible ? 1 : 0,
            }}
          >
            Nuestra tecnología
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl transition-all duration-700"
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 800,
                color: "rgba(240,234,216,0.92)",
                lineHeight: 1,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(16px)",
                transitionDelay: "100ms",
              }}
            >
              Nuestra <span style={{ color: "#94f1be" }}>solución.</span>
            </h2>
            <p
              className="max-w-xs text-[13px] leading-relaxed lg:pb-1 transition-all duration-700"
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 300,
                color: "rgba(240,234,216,0.4)",
                opacity: isVisible ? 1 : 0,
                transitionDelay: "200ms",
              }}
            >
              Una plataforma integral que combina drones, satélites y sensores
              para el monitoreo ambiental —{" "}
              <span
                style={{ color: "rgba(240,234,216,0.75)", fontWeight: 400 }}
              >
                pasando de una acción reactiva a una acción preventiva.
              </span>
            </p>
          </div>
        </div>

        {/* ── MAIN GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Image 1 — large, 3 cols */}
          <div
            className="lg:col-span-3 relative rounded-lg overflow-hidden group cursor-pointer transition-all duration-700"
            style={{
              minHeight: "380px",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(24px)",
              transitionDelay: "500ms",
            }}
          >
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/d-0eY1XCgdCNJr5FWwE0WfHb4VdN6lFe.jpg"
              alt="Sistema Sentinel"
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0b09]/80 via-[#0c0b09]/10 to-transparent" />

            {/* Hover tint */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background:
                  "linear-gradient(135deg, rgba(148,241,190,0.06) 0%, transparent 60%)",
              }}
            />

            {/* Bottom */}
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
              <div
                className="px-3 py-1.5 rounded-sm text-[10px] tracking-widest uppercase"
                style={{
                  fontFamily: "var(--font-sans)",
                  background: "rgba(20,74,52,0.75)",
                  border: "0.5px solid rgba(148,241,190,0.3)",
                  color: "#94f1be",
                  backdropFilter: "blur(6px)",
                }}
              >
                Sistema Sentinel
              </div>
              <div
                className="text-[10px] tracking-wider opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-3 group-hover:translate-x-0"
                style={{
                  fontFamily: "var(--font-sans)",
                  color: "rgba(240,234,216,0.4)",
                }}
              >
                Detecta en minutos →
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {/* Image 2 */}
            <div
              className="relative rounded-lg overflow-hidden group cursor-pointer flex-1 transition-all duration-700"
              style={{
                minHeight: "180px",
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(24px)",
                transitionDelay: "620ms",
              }}
            >
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dd-5FM9OcJbCEu1IatjOnmcjtjnVYhTem.jpg"
                alt="Cobertura integral"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0b09]/75 via-transparent to-transparent" />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "rgba(148,241,190,0.05)" }}
              />
              <div className="absolute bottom-4 left-4">
                <div
                  className="px-3 py-1.5 rounded-sm text-[10px] tracking-widest uppercase"
                  style={{
                    fontFamily: "var(--font-sans)",
                    background: "rgba(20,74,52,0.75)",
                    border: "0.5px solid rgba(148,241,190,0.3)",
                    color: "#94f1be",
                    backdropFilter: "blur(6px)",
                  }}
                >
                  Cobertura integral
                </div>
              </div>
            </div>

            {/* Info card */}
            <div
              className="relative rounded-lg p-6 flex-1 overflow-hidden transition-all duration-700 group"
              style={{
                background: "rgba(240,234,216,0.02)",
                border: "0.5px solid rgba(240,234,216,0.07)",
                minHeight: "160px",
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(24px)",
                transitionDelay: "740ms",
              }}
            >
              {/* Corner accents */}
              <div
                className="absolute top-0 left-0 w-6 h-6 pointer-events-none"
                style={{
                  borderTop: "1px solid rgba(148,241,190,0.4)",
                  borderLeft: "1px solid rgba(148,241,190,0.4)",
                }}
              />
              <div
                className="absolute bottom-0 right-0 w-6 h-6 pointer-events-none"
                style={{
                  borderBottom: "1px solid rgba(148,241,190,0.2)",
                  borderRight: "1px solid rgba(148,241,190,0.2)",
                }}
              />

              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at 30% 50%, rgba(148,241,190,0.05), transparent 70%)",
                }}
              />

              <p
                className="text-[11px] tracking-[0.2em] uppercase mb-3"
                style={{
                  fontFamily: "var(--font-sans)",
                  color: "rgba(240,234,216,0.25)",
                }}
              >
                Alcance
              </p>
              <p
                className="text-[13px] leading-relaxed"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 300,
                  color: "rgba(240,234,216,0.5)",
                }}
              >
                Cobertura desde{" "}
                <span
                  style={{ color: "rgba(240,234,216,0.85)", fontWeight: 400 }}
                >
                  Patagonia
                </span>{" "}
                hasta{" "}
                <span
                  style={{ color: "rgba(240,234,216,0.85)", fontWeight: 400 }}
                >
                  todo el país
                </span>
                . Drones autónomos, sensores IoT y satélites en red.
              </p>

              {/* Status */}
              <div className="flex items-center gap-2 mt-5">
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "#94f1be" }}
                />
                <span
                  className="text-[10px]"
                  style={{
                    fontFamily: "var(--font-sans)",
                    color: "rgba(240,234,216,0.25)",
                  }}
                >
                  sistema activo
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── COVERAGE MAP ── */}
        <div
          className="mt-4 mx-auto max-w-xs sm:max-w-sm rounded-lg overflow-hidden relative transition-all duration-700"
          style={{
            border: "0.5px solid rgba(240,234,216,0.07)",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(24px)",
            transitionDelay: "820ms",
          }}
        >
          <WorldMap
            lineColor="#94f1be"
            dots={[
              { start: PATAGONIA, end: { lat: -38.9516, lng: -68.0591 } }, // Neuquén
              { start: PATAGONIA, end: { lat: -32.8895, lng: -68.8458 } }, // Mendoza
              { start: PATAGONIA, end: { lat: -27.4698, lng: -58.8306 } }, // Corrientes
              { start: PATAGONIA, end: { lat: -34.6037, lng: -58.3816 } }, // CABA
            ]}
          />
          <div className="absolute top-5 left-5">
            <p
              className="text-[11px] tracking-[0.2em] uppercase"
              style={{
                fontFamily: "var(--font-sans)",
                color: "rgba(240,234,216,0.35)",
              }}
            >
              Red de cobertura
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
