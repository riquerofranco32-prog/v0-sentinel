"use client";

import { useEffect, useRef, useState } from "react";
import { Satellite, Cpu, Zap } from "lucide-react";

const steps = [
  {
    icon: Satellite,
    number: "01",
    title: "Identificación",
    tagline: "Vigilancia permanente desde el aire",
    description:
      "Drones autónomos y satélites capturan datos térmicos, ópticos e infrarrojos en tiempo real. Cobertura 24/7 sobre territorios de difícil acceso.",
    metrics: [
      { label: "Cobertura", value: "24/7" },
      { label: "Resolución", value: "5cm" },
    ],
  },
  {
    icon: Cpu,
    number: "02",
    title: "Análisis IA",
    tagline: "Inteligencia que no descansa",
    description:
      "Modelos de visión computacional procesan cada frame. La IA descarta falsos positivos y genera alertas geoespaciales verificadas en segundos.",
    metrics: [
      { label: "Precisión", value: "98%" },
      { label: "Latencia", value: "<3s" },
    ],
  },
  {
    icon: Zap,
    number: "03",
    title: "Respuesta",
    tagline: "De la detección a la acción",
    description:
      "Brigadistas, municipios y organismos provinciales reciben alertas con coordenadas GPS exactas. Respuesta 60% más rápida que métodos tradicionales.",
    metrics: [
      { label: "Velocidad respuesta", value: "+60%" },
      { label: "Detección", value: "<8min" },
    ],
  },
];

export function HowItWorks() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
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

  useEffect(() => {
    if (!isVisible) return;
    const timer = setInterval(() => {
      setActiveStep((s) => (s + 1) % 3);
    }, 3200);
    return () => clearInterval(timer);
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      id="servicios"
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: "#0c0b09" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(20,74,52,0.15) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div
          className="mb-20 transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(16px)",
          }}
        >
          <p
            className="text-[11px] tracking-[0.35em] uppercase mb-4"
            style={{
              fontFamily: "var(--font-sans)",
              color: "rgba(240,234,216,0.25)",
            }}
          >
            El proceso
          </p>
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 800,
              fontSize: "clamp(40px, 6vw, 64px)",
              lineHeight: 0.95,
              color: "rgba(240,234,216,0.92)",
              letterSpacing: "-1px",
            }}
          >
            ¿Cómo <span style={{ color: "#94f1be" }}>lo hacemos?</span>
          </h2>
        </div>

        {/* Steps */}
        <div className="relative max-w-3xl mx-auto">
          <div
            className="absolute left-[27px] top-8 bottom-8 w-px hidden lg:block"
            style={{ background: "rgba(240,234,216,0.08)" }}
          />

          <div className="space-y-4">
            {steps.map((step, i) => {
              const isActive = activeStep === i;
              return (
                <div
                  key={step.number}
                  className="relative flex gap-6 cursor-pointer transition-all duration-500"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible
                      ? "translateX(0)"
                      : "translateX(-20px)",
                    transitionDelay: `${i * 140}ms`,
                  }}
                  onClick={() => setActiveStep(i)}
                >
                  {/* Step circle */}
                  <div
                    className="relative z-10 flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500"
                    style={{
                      background: isActive
                        ? "rgba(148,241,190,0.12)"
                        : "rgba(240,234,216,0.03)",
                      border: `1.5px solid ${isActive ? "#94f1be" : "rgba(240,234,216,0.1)"}`,
                    }}
                  >
                    <step.icon
                      className="w-5 h-5 transition-all duration-300"
                      style={{
                        color: isActive ? "#94f1be" : "rgba(240,234,216,0.3)",
                      }}
                    />
                  </div>

                  {/* Content card */}
                  <div
                    className="flex-1 rounded-lg p-6 transition-all duration-500"
                    style={{
                      background: isActive
                        ? "rgba(148,241,190,0.05)"
                        : "rgba(240,234,216,0.02)",
                      border: `0.5px solid ${isActive ? "rgba(148,241,190,0.2)" : "rgba(240,234,216,0.06)"}`,
                    }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="text-[10px] tracking-[0.25em] uppercase"
                        style={{
                          fontFamily: "var(--font-sans)",
                          color: isActive ? "#94f1be" : "rgba(240,234,216,0.2)",
                        }}
                      >
                        {step.number}
                      </span>
                    </div>
                    <h3
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontWeight: 800,
                        fontSize: "20px",
                        color: isActive
                          ? "rgba(240,234,216,0.95)"
                          : "rgba(240,234,216,0.55)",
                        transition: "color 0.4s",
                      }}
                    >
                      {step.title}
                    </h3>
                    <p
                      className="text-[11px] mt-0.5"
                      style={{
                        fontFamily: "var(--font-sans)",
                        color: isActive ? "#94f1be" : "rgba(240,234,216,0.2)",
                        transition: "color 0.4s",
                        fontStyle: "italic",
                      }}
                    >
                      {step.tagline}
                    </p>

                    {/* Expandable body */}
                    <div
                      className="overflow-hidden transition-all duration-500"
                      style={{
                        maxHeight: isActive ? "200px" : "0px",
                        opacity: isActive ? 1 : 0,
                      }}
                    >
                      <p
                        className="text-[13px] leading-relaxed mb-4 mt-3"
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontWeight: 300,
                          color: "rgba(240,234,216,0.5)",
                        }}
                      >
                        {step.description}
                      </p>
                      <div className="flex gap-4">
                        {step.metrics.map((m) => (
                          <div
                            key={m.label}
                            className="px-3 py-2 rounded-sm"
                            style={{
                              background: "rgba(148,241,190,0.06)",
                              border: "0.5px solid rgba(148,241,190,0.15)",
                            }}
                          >
                            <div
                              style={{
                                fontFamily: "var(--font-heading)",
                                fontWeight: 700,
                                fontSize: "16px",
                                color: "#94f1be",
                                lineHeight: 1,
                              }}
                            >
                              {m.value}
                            </div>
                            <div
                              className="text-[9px] tracking-wider uppercase mt-0.5"
                              style={{
                                fontFamily: "var(--font-sans)",
                                color: "rgba(240,234,216,0.3)",
                              }}
                            >
                              {m.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Progress bar */}
          <div
            className="mt-8 ml-[70px] h-px rounded-full overflow-hidden transition-all duration-700"
            style={{
              background: "rgba(240,234,216,0.06)",
              opacity: isVisible ? 1 : 0,
            }}
          >
            <div
              className="h-full rounded-full transition-all duration-[3200ms] ease-linear"
              style={{
                width: isVisible ? "100%" : "0%",
                background: "#94f1be",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
