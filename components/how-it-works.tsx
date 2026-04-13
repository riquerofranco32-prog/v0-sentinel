"use client"

import { useEffect, useRef, useState } from "react"
import { Search, Bell, Zap, MapPin, Wind, Flame, CheckCircle } from "lucide-react"

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Identificación",
    description: "Drones + satélites capturan datos térmicos y visuales en tiempo real sobre el territorio.",
    accent: "#4ade80",
    accentBg: "rgba(74,222,128,0.08)",
    accentBorder: "rgba(74,222,128,0.2)",
  },
  {
    icon: Bell,
    number: "02",
    title: "Aviso",
    description: "IA analiza y genera alertas geoespaciales verificadas con coordenadas precisas.",
    accent: "#fb923c",
    accentBg: "rgba(251,146,60,0.08)",
    accentBorder: "rgba(251,146,60,0.2)",
  },
  {
    icon: Zap,
    number: "03",
    title: "Acción",
    description: "Equipos reciben notificaciones automáticas y responden 60% más rápido.",
    accent: "#4ade80",
    accentBg: "rgba(74,222,128,0.08)",
    accentBorder: "rgba(74,222,128,0.2)",
  },
]

export function HowItWorks() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.05 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="servicios"
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: "#0e100d" }}
    >
      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `linear-gradient(rgba(74,222,128,1) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,1) 1px, transparent 1px)`,
        backgroundSize: "80px 80px",
      }} />
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse at 50% 50%, rgba(0,79,57,0.15) 0%, transparent 70%)"
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div className="mb-16">
          <p
            className={`text-[11px] tracking-[0.3em] uppercase mb-5 transition-all duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}
            style={{ fontFamily: "'Inter', sans-serif", color: "rgba(240,234,216,0.3)" }}
          >
            El proceso
          </p>
          <h2
            className={`text-4xl sm:text-5xl lg:text-6xl transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              color: "rgba(240,234,216,0.92)",
              lineHeight: 1,
            }}
          >
            ¿Cómo lo hacemos?
          </h2>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-5 mb-14">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className={`relative rounded-lg p-8 transition-all duration-700 group cursor-default ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{
                transitionDelay: `${i * 120}ms`,
                background: step.accentBg,
                border: `0.5px solid ${step.accentBorder}`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = step.accent
                e.currentTarget.style.transform = "translateY(-4px)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = step.accentBorder
                e.currentTarget.style.transform = "translateY(0)"
              }}
            >
              {/* Number */}
              <div
                className="text-6xl font-extrabold mb-6 leading-none select-none"
                style={{
                  fontFamily: "'Syne', sans-serif",
                  color: `${step.accent}18`,
                }}
              >
                {step.number}
              </div>

              {/* Icon */}
              <div
                className="w-11 h-11 rounded-lg flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${step.accent}20`, border: `0.5px solid ${step.accent}40` }}
              >
                <step.icon className="w-5 h-5" style={{ color: step.accent }} />
              </div>

              <h3
                className="text-lg font-bold mb-3"
                style={{ fontFamily: "'Syne', sans-serif", color: "rgba(240,234,216,0.9)" }}
              >
                {step.title}
              </h3>
              <p
                className="text-[13px] leading-relaxed"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, color: "rgba(240,234,216,0.5)" }}
              >
                {step.description}
              </p>

              {/* Bottom accent line */}
              <div
                className="absolute bottom-0 left-0 right-0 h-px rounded-b-lg transition-all duration-300"
                style={{ background: `linear-gradient(to right, transparent, ${step.accent}60, transparent)` }}
              />
            </div>
          ))}
        </div>

        {/* Alert mockup */}
        <div
          className={`max-w-2xl mx-auto transition-all duration-700 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div
            className="relative rounded-lg p-6 overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(251,146,60,0.08) 0%, rgba(14,16,13,0.8) 100%)",
              border: "0.5px solid rgba(251,146,60,0.3)",
            }}
          >
            {/* Pulse dot */}
            <div className="absolute top-5 right-5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500"></span>
              </span>
            </div>

            <div className="flex items-start gap-4">
              <div
                className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(251,146,60,0.15)", border: "0.5px solid rgba(251,146,60,0.3)" }}
              >
                <Flame className="w-5 h-5" style={{ color: "#fb923c" }} />
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span
                    className="text-[12px] font-semibold uppercase tracking-wider"
                    style={{ fontFamily: "'Inter', sans-serif", color: "#fb923c" }}
                  >
                    Alerta de incendio encontrada
                  </span>
                  <span
                    className="flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-sm"
                    style={{ background: "rgba(74,222,128,0.1)", border: "0.5px solid rgba(74,222,128,0.3)", color: "#4ade80", fontFamily: "'Inter', sans-serif" }}
                  >
                    <CheckCircle className="w-3 h-3" />
                    IA verificada
                  </span>
                </div>

                <p
                  className="font-semibold mb-3"
                  style={{ fontFamily: "'Syne', sans-serif", color: "rgba(240,234,216,0.85)" }}
                >
                  El Bolsón — Cajón del Azul
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { icon: MapPin, label: "-41.9712, -71.5368", color: "#4ade80" },
                    { label: "Intensidad: Alta", color: "#fb923c" },
                    { label: "Área: 2,3 ha", color: "rgba(240,234,216,0.6)" },
                    { icon: Wind, label: "NE 18 km/h", color: "#4ade80" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      {item.icon && <item.icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: item.color }} />}
                      <span
                        className="text-[11px]"
                        style={{ fontFamily: "'Inter', sans-serif", color: item.color, fontWeight: 300 }}
                      >
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom gradient line */}
            <div
              className="absolute bottom-0 left-0 right-0 h-px"
              style={{ background: "linear-gradient(to right, transparent, rgba(251,146,60,0.5), transparent)" }}
            />
          </div>
        </div>

      </div>
    </section>
  )
}
