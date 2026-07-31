"use client";

import { useEffect, useRef, useState } from "react";
import {
  Thermometer,
  Satellite,
  BellRing,
  LayoutDashboard,
  Radio,
  BarChart3,
} from "lucide-react";

const secondary = [
  {
    icon: BellRing,
    title: "Alertas geolocalizadas",
    description: "Coordenadas GPS exactas enviadas en segundos.",
  },
  {
    icon: LayoutDashboard,
    title: "Dashboard en tiempo real",
    description: "Monitoreo del territorio desde cualquier dispositivo.",
  },
  {
    icon: Radio,
    title: "Integración con brigadas",
    description: "Alertas directas a los equipos de respuesta en campo.",
  },
  {
    icon: BarChart3,
    title: "Reportes y analítica",
    description: "Historial de focos, tiempos de respuesta y tendencias.",
  },
];

export function Capabilities() {
  const [isVisible, setIsVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
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
      id="capacidades"
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: "#0c0b09" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 35% 45%, rgba(148,241,190,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        <div
          className="mb-16 transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(16px)",
          }}
        >
          <p
            className="text-[11px] tracking-[0.3em] uppercase mb-5"
            style={{
              fontFamily: "var(--font-sans)",
              color: "rgba(240,234,216,0.3)",
            }}
          >
            La solución a incendios forestales
          </p>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl"
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 800,
              color: "rgba(240,234,216,0.92)",
              lineHeight: 1,
            }}
          >
            Todo lo que <span style={{ color: "#94f1be" }}>Sentinel</span> hace
            por vos.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 lg:grid-rows-2 gap-4">
          {/* Featured — the flagship capability gets real visual weight
              instead of the same icon-in-a-box treatment as everything else. */}
          <div
            className="group relative rounded-lg p-8 overflow-hidden transition-all duration-700 hover:-translate-y-1 lg:col-span-2 lg:row-span-2 flex flex-col justify-between"
            style={{
              background:
                "linear-gradient(160deg, rgba(148,241,190,0.06) 0%, rgba(240,234,216,0.02) 60%)",
              border: "0.5px solid rgba(148,241,190,0.2)",
              minHeight: "280px",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(24px)",
              transitionDelay: "0ms",
            }}
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at 20% 10%, rgba(148,241,190,0.1), transparent 70%)",
              }}
            />

            {/* radar sweep — a quiet visual signature for the flagship card */}
            <div
              className="absolute -right-10 -bottom-10 w-56 h-56 rounded-full pointer-events-none"
              style={{ border: "0.5px solid rgba(148,241,190,0.12)" }}
            >
              <div
                className="absolute inset-6 rounded-full"
                style={{ border: "0.5px solid rgba(148,241,190,0.12)" }}
              />
              <div
                className="absolute inset-12 rounded-full"
                style={{ border: "0.5px solid rgba(148,241,190,0.12)" }}
              />
              {!reducedMotion && (
                <div
                  className="absolute inset-0 rounded-full animate-spin"
                  style={{
                    background:
                      "conic-gradient(from 0deg, rgba(148,241,190,0.25), transparent 25%)",
                    animationDuration: "6s",
                  }}
                />
              )}
            </div>

            <div className="relative">
              <Thermometer
                className="w-9 h-9 mb-6"
                style={{ color: "#94f1be" }}
              />
              <p
                className="text-[11px] tracking-[0.2em] uppercase mb-3"
                style={{
                  fontFamily: "var(--font-sans)",
                  color: "#94f1be",
                }}
              >
                Capacidad principal
              </p>
              <h3
                className="text-2xl sm:text-3xl mb-3"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 800,
                  color: "rgba(240,234,216,0.95)",
                  lineHeight: 1.15,
                }}
              >
                Detección térmica con IA
              </h3>
              <p
                className="text-[14px] leading-relaxed max-w-sm"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 300,
                  color: "rgba(240,234,216,0.5)",
                }}
              >
                Cámaras térmicas a bordo y modelos de visión computacional que
                identifican focos de calor antes de que se conviertan en
                incendios.
              </p>
            </div>

            <div className="relative flex gap-6 mt-8">
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 800,
                    fontSize: "22px",
                    color: "rgba(240,234,216,0.92)",
                  }}
                >
                  8 min
                </p>
                <p
                  className="text-[10px] uppercase tracking-wide"
                  style={{
                    fontFamily: "var(--font-sans)",
                    color: "rgba(240,234,216,0.35)",
                  }}
                >
                  Tiempo de detección
                </p>
              </div>
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 800,
                    fontSize: "22px",
                    color: "rgba(240,234,216,0.92)",
                  }}
                >
                  98%
                </p>
                <p
                  className="text-[10px] uppercase tracking-wide"
                  style={{
                    fontFamily: "var(--font-sans)",
                    color: "rgba(240,234,216,0.35)",
                  }}
                >
                  Precisión
                </p>
              </div>
            </div>
          </div>

          {secondary.map((cap, i) => (
            <div
              key={cap.title}
              className="group relative rounded-lg p-6 overflow-hidden transition-all duration-700 hover:-translate-y-1"
              style={{
                background: "rgba(240,234,216,0.02)",
                border: "0.5px solid rgba(240,234,216,0.07)",
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(24px)",
                transitionDelay: `${100 + i * 90}ms`,
              }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at 30% 20%, rgba(148,241,190,0.07), transparent 70%)",
                }}
              />

              <cap.icon
                className="w-5 h-5 mb-4 transition-transform duration-300 group-hover:scale-110"
                style={{ color: "#94f1be" }}
              />

              <h3
                className="text-[15px] mb-1.5"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 700,
                  color: "rgba(240,234,216,0.92)",
                  lineHeight: 1.2,
                }}
              >
                {cap.title}
              </h3>

              <p
                className="text-[12px] leading-relaxed"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 300,
                  color: "rgba(240,234,216,0.45)",
                }}
              >
                {cap.description}
              </p>
            </div>
          ))}

          {/* Wide banner — horizontal layout instead of the vertical
              icon-on-top pattern used everywhere else on the page. */}
          <div
            className="group relative rounded-lg p-6 overflow-hidden transition-all duration-700 hover:-translate-y-1 lg:col-span-2 flex items-center gap-6"
            style={{
              background: "rgba(240,234,216,0.02)",
              border: "0.5px solid rgba(240,234,216,0.07)",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(24px)",
              transitionDelay: "460ms",
            }}
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center shrink-0"
              style={{
                background: "rgba(148,241,190,0.08)",
                border: "0.5px solid rgba(148,241,190,0.2)",
              }}
            >
              <Satellite className="w-6 h-6" style={{ color: "#94f1be" }} />
            </div>
            <div>
              <h3
                className="text-[15px] mb-1"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 700,
                  color: "rgba(240,234,216,0.92)",
                }}
              >
                Cobertura satelital y drones
              </h3>
              <p
                className="text-[12px] leading-relaxed"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 300,
                  color: "rgba(240,234,216,0.45)",
                }}
              >
                Red combinada de drones autónomos y satélites, siempre en vuelo
                sobre el territorio.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
