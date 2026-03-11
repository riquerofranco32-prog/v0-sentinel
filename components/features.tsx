"use client"

import { useEffect, useRef, useState } from "react"
import { Cpu, Leaf, Satellite, Radio, Droplets, Shield } from "lucide-react"

const pills = [
  "Detecta antes de que ocurra.",
  "La prevención empieza hoy",
  "Ver antes, actuar mejor.",
  "Anticipar es proteger.",
]

const features = [
  {
    icon: Cpu,
    title: "Fusión Inteligente de Datos Multifuente",
    description:
      "Integramos imágenes aéreas (RGB + Térmico), datos satelitales y sensores IoT para una visión completa del territorio.",
    tags: ["Drones + Satélite + IoT", "Motor de IA Propietario"],
  },
  {
    icon: Leaf,
    title: "Impacto Ambiental Positivo",
    description:
      "Analiza miles de puntos de datos para anticipar riesgos y proteger ecosistemas de forma proactiva.",
    tags: ["Riesgo Ambiental", "Estrés Hídrico", "Patrullaje Autónomo"],
  },
]

export function Features() {
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
      id="nosotros"
      className="relative py-24 lg:py-32 bg-[#0f1a0f]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span
            className={`inline-block text-[#22c55e] text-sm font-semibold tracking-wider uppercase mb-4 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
            }`}
          >
            Por qué elegirnos
          </span>
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-white max-w-4xl mx-auto leading-tight transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Por qué Sentinel Cloud Transforma la Inteligencia Territorial
          </h2>
        </div>

        {/* Animated Pills */}
        <div
          className={`flex flex-wrap justify-center gap-3 mb-16 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {pills.map((pill, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-[#22c55e]/10 border border-[#22c55e]/30 rounded-full px-5 py-2.5 hover:bg-[#22c55e]/20 transition-colors"
            >
              <span className="text-[#22c55e] text-lg">✓</span>
              <span className="text-white/90 text-sm font-medium">{pill}</span>
            </div>
          ))}
        </div>

        {/* Feature Cards - Bento Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative bg-gradient-to-br from-[#1a2e1a] to-[#0f1a0f] border border-white/10 rounded-2xl p-8 hover:border-[#22c55e]/30 transition-all duration-500 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-[#22c55e]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative z-10">
                <div className="w-14 h-14 bg-[#22c55e]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#22c55e]/20 transition-colors">
                  <feature.icon className="w-7 h-7 text-[#22c55e]" />
                </div>

                <h3
                  className="text-xl lg:text-2xl font-bold text-white mb-4"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {feature.title}
                </h3>

                <p className="text-white/60 leading-relaxed mb-6">
                  {feature.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {feature.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="text-xs bg-[#080c08] text-[#22c55e] px-3 py-1.5 rounded-full border border-[#22c55e]/20"
                    >
                      {tag}
                    </span>
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
