"use client";

import { useEffect, useRef, useState } from "react";
import {
  Flame,
  Radar,
  Satellite,
  BellRing,
  PlaneTakeoff,
  Thermometer,
} from "lucide-react";

const flow = [
  { icon: Flame, label: "Detectar" },
  { icon: Radar, label: "Verificar / Descubrir" },
  { icon: Satellite, label: "Contextualizar" },
  { icon: BellRing, label: "Alertar" },
];

const monitoring = [
  {
    icon: PlaneTakeoff,
    text: "Patrullas térmicas diarias con verificación automatizada.",
  },
  {
    icon: Thermometer,
    text: "Sensores que identifican anomalías térmicas y picos de calor en la fuente.",
  },
  {
    icon: Satellite,
    text: "Feed satelital para contexto de macro-riesgo y mapeo horario.",
  },
];

export function Features() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.05, rootMargin: "0px 0px 200px 0px" },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="nosotros"
      className="relative py-20 lg:py-24 bg-[#faf7f0] overflow-hidden"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
        style={{
          opacity: isVisible ? 1 : 0,
          backgroundImage:
            "radial-gradient(ellipse 70% 50% at 65% 55%, rgba(15,122,79,0.06) 0%, transparent 70%)",
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
              background: "rgba(15,122,79,1)",
            }}
          />
        ))}
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="absolute left-0 right-0 h-px"
            style={{
              top: `${(i + 1) * 16.6}%`,
              background: "rgba(15,122,79,1)",
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
              color: "rgba(26,24,18,0.3)",
              opacity: isVisible ? 1 : 0,
            }}
          >
            Sentinel Cloud: inteligencia territorial para incendios forestales
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl transition-all duration-700"
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 800,
                color: "rgba(26,24,18,0.92)",
                lineHeight: 1,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(16px)",
                transitionDelay: "100ms",
              }}
            >
              Nuestra <span style={{ color: "#0f7a4f" }}>solución.</span>
            </h2>
            <p
              className="max-w-xs text-[13px] leading-relaxed lg:pb-1 transition-all duration-700"
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 300,
                color: "rgba(26,24,18,0.4)",
                opacity: isVisible ? 1 : 0,
                transitionDelay: "200ms",
              }}
            >
              Una plataforma integral que combina datos satelitales, información
              geoespacial e IA, y suma sensores y drones de forma progresiva,{" "}
              <span style={{ color: "rgba(26,24,18,0.75)", fontWeight: 400 }}>
                pasando de una acción reactiva a una acción preventiva.
              </span>
            </p>
          </div>
        </div>

        {/* ── MAIN GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Flow card — large, 3 cols */}
          <div
            className="lg:col-span-3 relative rounded-lg p-8 overflow-hidden transition-all duration-700 flex flex-col justify-center"
            style={{
              background:
                "linear-gradient(160deg, rgba(15,122,79,0.06) 0%, rgba(26,24,18,0.02) 60%)",
              border: "0.5px solid rgba(15,122,79,0.2)",
              minHeight: "380px",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(24px)",
              transitionDelay: "500ms",
            }}
          >
            <p
              className="text-[11px] tracking-[0.2em] uppercase mb-8"
              style={{ fontFamily: "var(--font-sans)", color: "#0f7a4f" }}
            >
              Cómo protegemos tu territorio
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-6 sm:gap-2">
              {flow.map((step) => (
                <div
                  key={step.label}
                  className="flex items-center gap-3 sm:flex-col sm:items-center sm:text-center sm:flex-1"
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 sm:mb-3"
                    style={{
                      background: "rgba(15,122,79,0.08)",
                      border: "0.5px solid rgba(15,122,79,0.3)",
                    }}
                  >
                    <step.icon
                      className="w-5 h-5"
                      style={{ color: "#0f7a4f" }}
                    />
                  </div>
                  <p
                    className="text-[13px]"
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontWeight: 700,
                      color: "rgba(26,24,18,0.85)",
                    }}
                  >
                    {step.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right column */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {/* Monitoring card */}
            <div
              className="relative rounded-lg p-6 flex-1 overflow-hidden transition-all duration-700"
              style={{
                background: "rgba(26,24,18,0.02)",
                border: "0.5px solid rgba(26,24,18,0.07)",
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(24px)",
                transitionDelay: "620ms",
              }}
            >
              <p
                className="text-[11px] tracking-[0.2em] uppercase mb-4"
                style={{
                  fontFamily: "var(--font-sans)",
                  color: "rgba(26,24,18,0.25)",
                }}
              >
                Monitoreo constante de la zona
              </p>
              <div className="flex flex-col gap-3">
                {monitoring.map((item) => (
                  <div key={item.text} className="flex items-start gap-3">
                    <item.icon
                      className="w-4 h-4 mt-0.5 shrink-0"
                      style={{ color: "#0f7a4f" }}
                    />
                    <p
                      className="text-[12px] leading-relaxed"
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontWeight: 300,
                        color: "rgba(26,24,18,0.5)",
                      }}
                    >
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Info card */}
            <div
              className="relative rounded-lg p-6 flex-1 overflow-hidden transition-all duration-700 group hover:-translate-y-1"
              style={{
                background: "rgba(26,24,18,0.02)",
                border: "0.5px solid rgba(26,24,18,0.07)",
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
                  borderTop: "1px solid rgba(15,122,79,0.4)",
                  borderLeft: "1px solid rgba(15,122,79,0.4)",
                }}
              />
              <div
                className="absolute bottom-0 right-0 w-6 h-6 pointer-events-none"
                style={{
                  borderBottom: "1px solid rgba(15,122,79,0.2)",
                  borderRight: "1px solid rgba(15,122,79,0.2)",
                }}
              />

              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at 30% 50%, rgba(15,122,79,0.05), transparent 70%)",
                }}
              />

              <p
                className="text-[11px] tracking-[0.2em] uppercase mb-3"
                style={{
                  fontFamily: "var(--font-sans)",
                  color: "rgba(26,24,18,0.25)",
                }}
              >
                Alcance
              </p>
              <p
                className="text-[13px] leading-relaxed"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 300,
                  color: "rgba(26,24,18,0.5)",
                }}
              >
                Cobertura desde{" "}
                <span style={{ color: "rgba(26,24,18,0.85)", fontWeight: 400 }}>
                  Patagonia
                </span>{" "}
                hasta{" "}
                <span style={{ color: "rgba(26,24,18,0.85)", fontWeight: 400 }}>
                  todo el país
                </span>
                . Satélites, geoespacial e IA hoy, sensores y drones se suman de
                forma progresiva.
              </p>

              {/* Status */}
              <div className="flex items-center gap-2 mt-5">
                <span
                  className="text-[11px] font-light tracking-wide"
                  style={{
                    fontFamily: "var(--font-sans)",
                    color: "rgba(26,24,18,0.45)",
                  }}
                >
                  Sentinel Cloud en desarrollo y validación en territorio
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
