"use client"

import { useEffect, useRef, useState } from "react"
import { Search, Bell, Zap, ArrowRight, MapPin, Wind, Flame, CheckCircle } from "lucide-react"

const steps = [
  {
    icon: Search,
    title: "Identificación",
    description:
      "Drones + satélites capturan datos térmicos y visuales en tiempo real",
  },
  {
    icon: Bell,
    title: "Aviso",
    description:
      "IA analiza y genera alertas geoespaciales verificadas con coordenadas precisas",
  },
  {
    icon: Zap,
    title: "Acción",
    description:
      "Equipos reciben notificaciones automáticas y responden 60% más rápido",
  },
]

export function HowItWorks() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="servicios"
      className="relative py-24 lg:py-32 bg-[#080c08] overflow-hidden"
    >
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(#22c55e 1px, transparent 1px), linear-gradient(90deg, #22c55e 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080c08] via-transparent to-[#080c08]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ fontFamily: "var(--font-heading)" }}
          >
            ¿Cómo lo hacemos?
          </h2>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`relative transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Connector Arrow (except last) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 -right-4 z-20">
                  <ArrowRight className="w-8 h-8 text-[#22c55e]/40" />
                </div>
              )}

              <div className="bg-gradient-to-br from-[#0f1a0f] to-[#080c08] border border-white/10 rounded-2xl p-8 h-full hover:border-[#22c55e]/30 transition-all group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-[#22c55e] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <step.icon className="w-7 h-7 text-[#080c08]" />
                  </div>
                  <span className="text-5xl font-bold text-white/10">
                    0{index + 1}
                  </span>
                </div>

                <h3
                  className="text-xl font-bold text-white mb-3"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {step.title}
                </h3>

                <p className="text-white/60 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Alert Card Mock-up */}
        <div
          className={`max-w-2xl mx-auto transition-all duration-700 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="bg-gradient-to-br from-red-500/10 to-[#0f1a0f] border border-red-500/30 rounded-2xl p-6 relative overflow-hidden">
            {/* Pulse Effect */}
            <div className="absolute top-4 right-4">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Flame className="w-6 h-6 text-red-500" />
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="text-red-400 font-bold text-sm uppercase tracking-wider">
                    Alerta de Incendio Encontrada
                  </span>
                  <span className="flex items-center gap-1 text-[#22c55e] text-xs bg-[#22c55e]/10 px-2 py-1 rounded-full">
                    <CheckCircle className="w-3 h-3" />
                    IA Verificada
                  </span>
                </div>

                <h4 className="text-white font-semibold mb-2">
                  El Bolsón – Cajón del Azul
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-white/60">
                    <MapPin className="w-4 h-4 text-[#22c55e]" />
                    <span className="text-xs">-41.9712, -71.5368</span>
                  </div>
                  <div className="text-white/60">
                    <span className="text-white/40 text-xs">Intensidad:</span>
                    <span className="text-red-400 ml-1 text-xs font-medium">Alta</span>
                  </div>
                  <div className="text-white/60">
                    <span className="text-white/40 text-xs">Área:</span>
                    <span className="text-white ml-1 text-xs">2,3 ha</span>
                  </div>
                  <div className="flex items-center gap-1 text-white/60">
                    <Wind className="w-4 h-4 text-[#22c55e]" />
                    <span className="text-xs">NE 18 km/h</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
