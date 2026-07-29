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

const capabilities = [
  {
    icon: Thermometer,
    title: "Detección térmica con IA",
    description:
      "Cámaras térmicas a bordo y modelos de visión computacional que identifican focos de calor antes de que se conviertan en incendios.",
  },
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
    icon: Satellite,
    title: "Cobertura satelital y drones",
    description: "Red combinada de drones autónomos y satélites.",
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
            Capacidades
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {capabilities.map((cap, i) => (
            <div
              key={cap.title}
              className="group relative rounded-lg p-7 overflow-hidden transition-all duration-700 hover:-translate-y-1"
              style={{
                background: "rgba(240,234,216,0.02)",
                border: "0.5px solid rgba(240,234,216,0.07)",
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(24px)",
                transitionDelay: `${i * 90}ms`,
              }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at 30% 20%, rgba(148,241,190,0.07), transparent 70%)",
                }}
              />

              <div
                className="w-11 h-11 rounded-lg flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                style={{
                  background: "rgba(148,241,190,0.1)",
                  border: "0.5px solid rgba(148,241,190,0.25)",
                }}
              >
                <cap.icon className="w-5 h-5" style={{ color: "#94f1be" }} />
              </div>

              <h3
                className="text-lg mb-2"
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
                className="text-[13px] leading-relaxed"
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
        </div>
      </div>
    </section>
  );
}
