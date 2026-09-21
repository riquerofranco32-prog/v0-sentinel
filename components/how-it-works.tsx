"use client";

import { useEffect, useRef, useState } from "react";
import { Satellite, Cpu, Zap } from "lucide-react";

const steps = [
  {
    icon: Satellite,
    number: "01",
    title: "Identificación",
    tagline: "Vigilancia permanente desde el satélite",
    description:
      "Datos satelitales, geoespaciales y de sensores en tiempo real. Cobertura 24/7 sobre territorios de difícil acceso, sumando sensores y drones de forma progresiva.",
    metrics: [
      { label: "Cobertura", value: "24/7" },
      { label: "Fuentes", value: "Satelital" },
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

const STEP_DURATION = 3200;

export function HowItWorks() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  // ponytail: starts false to match SSR (no `document` on the server) —
  // syncing the real value happens in the effect below, after hydration,
  // instead of in the initializer, which caused a hydration mismatch for
  // anyone who opened the page in a background tab.
  const [isTabHidden, setIsTabHidden] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
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

  // Pause the auto-advance while the tab is backgrounded, so it doesn't burn
  // cycles or jump several steps ahead when the user comes back.
  // ponytail: doesn't also pause on scroll-out — the observer above never
  // flips isVisible back to false (one-shot reveal trigger), so there's no
  // existing "left viewport" signal to reuse without adding a second observer.
  useEffect(() => {
    const handleVisibilityChange = () => setIsTabHidden(document.hidden);
    handleVisibilityChange();
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  useEffect(() => {
    if (!isVisible || isPaused || isTabHidden) return;
    const timer = setInterval(() => {
      setActiveStep((s) => (s + 1) % 3);
      setProgressKey((k) => k + 1);
    }, STEP_DURATION);
    return () => clearInterval(timer);
  }, [isVisible, isPaused, isTabHidden]);

  return (
    <section
      ref={sectionRef}
      id="servicios"
      className="relative py-20 lg:py-24 overflow-hidden"
      style={{ background: "#faf7f0" }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
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
            className="text-[11px] tracking-[0.3em] uppercase mb-4"
            style={{
              fontFamily: "var(--font-sans)",
              color: "rgba(26,24,18,0.3)",
            }}
          >
            Cómo funciona Sentinel Cloud
          </p>
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 800,
              fontSize: "clamp(40px, 6vw, 64px)",
              lineHeight: 0.95,
              color: "rgba(26,24,18,0.92)",
              letterSpacing: "-1px",
            }}
          >
            ¿Cómo <span style={{ color: "#0f7a4f" }}>lo hacemos?</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-5 gap-10 items-start max-w-5xl mx-auto">
          {/* Steps */}
          <div className="relative lg:col-span-3">
            <div
              className="absolute left-[27px] top-8 bottom-8 w-px hidden lg:block"
              style={{ background: "rgba(26,24,18,0.08)" }}
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
                    onClick={() => {
                      setActiveStep(i);
                      setProgressKey((k) => k + 1);
                    }}
                  >
                    {/* Step circle */}
                    <div
                      className="relative z-10 flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500"
                      style={{
                        background: isActive
                          ? "rgba(15,122,79,0.12)"
                          : "rgba(26,24,18,0.03)",
                        border: `1.5px solid ${isActive ? "#0f7a4f" : "rgba(26,24,18,0.1)"}`,
                      }}
                    >
                      <step.icon
                        className="w-5 h-5 transition-all duration-300"
                        style={{
                          color: isActive ? "#0f7a4f" : "rgba(26,24,18,0.3)",
                        }}
                      />
                    </div>

                    {/* Content — plain, no card boundary; the circle +
                        connecting line already read as a timeline, a boxed
                        background around the text was redundant framing. */}
                    <div className="flex-1 pt-3 pb-2">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="text-[10px] tracking-[0.25em] uppercase"
                          style={{
                            fontFamily: "var(--font-sans)",
                            color: isActive ? "#0f7a4f" : "rgba(26,24,18,0.42)",
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
                            ? "rgba(26,24,18,0.95)"
                            : "rgba(26,24,18,0.62)",
                          transition: "color 0.4s",
                        }}
                      >
                        {step.title}
                      </h3>
                      <p
                        className="text-[11px] mt-0.5"
                        style={{
                          fontFamily: "var(--font-sans)",
                          color: isActive ? "#0f7a4f" : "rgba(26,24,18,0.5)",
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
                            color: "rgba(26,24,18,0.5)",
                          }}
                        >
                          {step.description}
                        </p>
                        <div className="flex items-center gap-5">
                          {step.metrics.map((m, mi) => (
                            <div
                              key={m.label}
                              className="flex items-center gap-5"
                            >
                              {mi > 0 && (
                                <div
                                  className="w-px h-8"
                                  style={{ background: "rgba(15,122,79,0.15)" }}
                                />
                              )}
                              <div>
                                <div
                                  style={{
                                    fontFamily: "var(--font-heading)",
                                    fontWeight: 700,
                                    fontSize: "16px",
                                    color: "#0f7a4f",
                                    lineHeight: 1,
                                  }}
                                >
                                  {m.value}
                                </div>
                                <div
                                  className="text-[10px] tracking-wider uppercase mt-0.5"
                                  style={{
                                    fontFamily: "var(--font-sans)",
                                    color: "rgba(26,24,18,0.42)",
                                  }}
                                >
                                  {m.label}
                                </div>
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

            {/* Progress bar — resets each cycle with progressKey */}
            <div
              className="mt-8 ml-[70px] h-px rounded-full overflow-hidden transition-all duration-700"
              style={{
                background: "rgba(26,24,18,0.06)",
                opacity: isVisible ? 1 : 0,
              }}
            >
              <div
                key={progressKey}
                className="h-full w-full rounded-full"
                style={{
                  background: "#0f7a4f",
                  transformOrigin: "left",
                  animation:
                    isVisible && !isPaused && !isTabHidden
                      ? `progressBar ${STEP_DURATION}ms linear forwards`
                      : "none",
                  transform: isPaused || isTabHidden ? undefined : "scaleX(0)",
                }}
              />
            </div>
            <style>{`
            @keyframes progressBar {
              from { transform: scaleX(0); }
              to   { transform: scaleX(1); }
            }
          `}</style>
          </div>

          {/* Visual companion — mirrors whichever step is active instead of
            leaving the right half of the section empty on desktop. */}
          <div
            className="hidden lg:flex lg:col-span-2 flex-col items-center justify-center rounded-lg p-10 transition-all duration-700"
            style={{
              background: "#0c0b09",
              border: "0.5px solid rgba(148,241,190,0.15)",
              minHeight: "360px",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(16px)",
            }}
          >
            {(() => {
              const step = steps[activeStep];
              return (
                <div
                  key={step.number}
                  className="animate-fade-in-up flex flex-col items-center text-center"
                >
                  <div
                    className="relative w-28 h-28 rounded-full flex items-center justify-center mb-6"
                    style={{
                      background: "rgba(148,241,190,0.08)",
                      border: "1px solid rgba(148,241,190,0.3)",
                    }}
                  >
                    <span
                      className="absolute inset-0 rounded-full animate-ping"
                      style={{
                        background: "rgba(148,241,190,0.15)",
                        animationDuration: "2.5s",
                      }}
                    />
                    <step.icon
                      className="relative w-11 h-11"
                      style={{ color: "#94f1be" }}
                    />
                  </div>
                  <p
                    className="text-[11px] tracking-[0.25em] uppercase mb-2"
                    style={{
                      fontFamily: "var(--font-sans)",
                      color: "#94f1be",
                    }}
                  >
                    {step.number} / 03
                  </p>
                  <h3
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontWeight: 800,
                      fontSize: "24px",
                      color: "rgba(240,234,216,0.95)",
                    }}
                  >
                    {step.title}
                  </h3>
                </div>
              );
            })()}
          </div>
        </div>
      </div>
    </section>
  );
}
