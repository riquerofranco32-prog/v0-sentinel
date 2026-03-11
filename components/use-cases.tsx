"use client"

import { useEffect, useRef, useState } from "react"
import { Flame, Droplets, Bird, Zap } from "lucide-react"

const useCases = [
  {
    icon: Flame,
    title: "Detección Temprana de Incendios",
    color: "from-orange-500/20 to-red-500/20",
    borderColor: "border-orange-500/30",
    iconColor: "text-orange-500",
    stats: [
      { value: "60%", label: "menos tiempo de respuesta" },
      { value: "40%", label: "menos área quemada" },
      { value: "10.000 ha", label: "por vuelo" },
    ],
  },
  {
    icon: Droplets,
    title: "Detección de Estrés Hídrico",
    color: "from-blue-500/20 to-cyan-500/20",
    borderColor: "border-blue-500/30",
    iconColor: "text-blue-500",
    stats: [
      { value: "22%", label: "reducción en uso de agua" },
      { value: "87%", label: "precisión" },
      { value: "+18%", label: "rendimiento" },
    ],
  },
  {
    icon: Bird,
    title: "Protección de Fauna",
    color: "from-[#22c55e]/20 to-emerald-500/20",
    borderColor: "border-[#22c55e]/30",
    iconColor: "text-[#22c55e]",
    stats: [
      { value: "35%", label: "reducción en caza ilegal" },
      { value: "GPS", label: "coordenadas exactas" },
      { value: "24/7", label: "monitoreo" },
    ],
  },
  {
    icon: Zap,
    title: "Infraestructura Rural",
    color: "from-yellow-500/20 to-amber-500/20",
    borderColor: "border-yellow-500/30",
    iconColor: "text-yellow-500",
    stats: [
      { value: "50%", label: "menos fallas inesperadas" },
      { value: "AI", label: "mantenimiento predictivo" },
      { value: "-28%", label: "costos" },
    ],
  },
]

export function UseCases() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

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
    <section ref={sectionRef} id="casos" className="py-24 lg:py-32 bg-[#0f1a0f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Casos de Éxito
          </h2>
          <p
            className={`text-white/60 text-lg max-w-2xl mx-auto transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Cómo Sentinel Cloud Genera Impacto Real en el Terreno
          </p>
        </div>

        {/* Scrollable Cards */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory -mx-4 px-4 lg:mx-0 lg:px-0 lg:grid lg:grid-cols-4 lg:overflow-visible"
        >
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className={`flex-shrink-0 w-[300px] lg:w-auto snap-start transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              <div
                className={`bg-gradient-to-br ${useCase.color} border ${useCase.borderColor} rounded-2xl p-6 h-full hover:scale-[1.02] transition-transform`}
              >
                <div
                  className={`w-12 h-12 bg-[#080c08]/50 rounded-xl flex items-center justify-center mb-4`}
                >
                  <useCase.icon className={`w-6 h-6 ${useCase.iconColor}`} />
                </div>

                <h3
                  className="text-lg font-bold text-white mb-6"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {useCase.title}
                </h3>

                <div className="space-y-4">
                  {useCase.stats.map((stat, statIndex) => (
                    <div key={statIndex}>
                      <div className="text-2xl font-bold text-white">
                        {stat.value}
                      </div>
                      <div className="text-sm text-white/50">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
