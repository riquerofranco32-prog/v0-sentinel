"use client"

import { useEffect, useRef, useState } from "react"
import { Award, Trophy, Medal, GraduationCap, Building, Sprout, Rocket, Search, TreePine, Flame, Mountain, Shield, Leaf } from "lucide-react"

const alliances = [
  { name: "Forestal Argentina", icon: TreePine },
  { name: "Bomberos de San Rafael", icon: Flame },
  { name: "Fundación Patagonia Natural", icon: Mountain },
  { name: "Municipalidad de San Rafael", icon: Building },
  { name: "UBA Facultad de Cs. Económicas", icon: Shield },
  { name: "Endeavor Cuyo", icon: Leaf },
]

const awards = [
  {
    icon: Trophy,
    year: "2025",
    title: "ILAN–UTN 2025",
    description: "Ganadores — Solución tecnológica más innovadora. Viaje a Israel.",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-t-yellow-500",
  },
  {
    icon: Award,
    year: "2025",
    title: "Premios Sadosky 2025",
    description: "Finalistas Mejor Startup del Año y Solución Innovadora.",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-t-blue-500",
  },
  {
    icon: Medal,
    year: "2024",
    title: "Usina de Emprendedores",
    description: "3° Puesto Nacional entre emprendimientos de alto potencial.",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    borderColor: "border-t-orange-500",
  },
  {
    icon: Trophy,
    year: "2025",
    title: "JIJE 2025",
    description: "Ganadores — Mejor Modelo de Negocio.",
    color: "text-[#004f39]",
    bgColor: "bg-[#004f39]/20",
    borderColor: "border-t-[#004f39]",
  },
  {
    icon: GraduationCap,
    year: "2025",
    title: "NAVES – IAE Business School",
    description: "Seleccionados para el principal programa de aceleración de Argentina.",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    borderColor: "border-t-purple-500",
  },
  {
    icon: Building,
    year: "2025",
    title: "BNA 2025",
    description: "Seleccionados entre +700 propuestas para el Concurso Soluciones Innovadoras.",
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-t-cyan-500",
  },
  {
    icon: Sprout,
    year: "2024",
    title: "Incubación UNCUYO",
    description: "Programa de Incubación — mentoría y desarrollo tecnológico.",
    color: "text-[#004f39]",
    bgColor: "bg-[#004f39]/20",
    borderColor: "border-t-[#004f39]",
  },
  {
    icon: Search,
    year: "2025",
    title: "Premios Prendete 2025",
    description: "Finalistas categoría Jump — soluciones de crecimiento acelerado.",
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
    borderColor: "border-t-pink-500",
  },
]

export function Awards() {
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
      id="noticias"
      className="py-24 lg:py-32 bg-[#151613]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FFFACA] mb-4 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Nuestra Validación
          </h2>
        </div>

        {/* Alliances Section */}
        <div className="mb-20">
          <h3
            className={`text-xl font-semibold text-[#FFFACA]/80 mb-8 text-center transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Alianzas Estratégicas
          </h3>
          <div
            className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {alliances.map((alliance, index) => (
              <div
                key={index}
                className="bg-[#1a1c18] border border-[#FFFACA]/10 rounded-xl p-4 hover:border-[#004f39]/50 transition-all group flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 bg-[#FFFACA]/5 rounded-xl flex items-center justify-center mb-3 group-hover:bg-[#004f39]/20 transition-colors">
                  <alliance.icon className="w-6 h-6 text-[#FFFACA]/70 group-hover:text-[#004f39] transition-colors" />
                </div>
                <span className="text-[#FFFACA]/70 text-sm font-medium leading-tight">
                  {alliance.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Awards Section */}
        <div>
          <h3
            className={`text-3xl sm:text-4xl font-bold text-[#FFFACA] mb-8 transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Premios
          </h3>
          
          {/* Scrollable Awards */}
          <div className="relative">
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
              {awards.map((award, index) => (
                <div
                  key={index}
                  className={`group flex-shrink-0 w-72 bg-[#1a1c18] border border-[#FFFACA]/10 rounded-xl overflow-hidden hover:border-[#004f39]/50 transition-all duration-700 snap-start ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  } ${award.borderColor} border-t-2`}
                  style={{ transitionDelay: `${400 + index * 50}ms` }}
                >
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-10 h-10 ${award.bgColor} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}
                      >
                        <award.icon className={`w-5 h-5 ${award.color}`} />
                      </div>
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${award.bgColor} ${award.color}`}>
                        {award.year}
                      </span>
                    </div>
                    <h4 className="font-semibold text-[#FFFACA] text-base mb-2">
                      {award.title}
                    </h4>
                    <p className="text-[#FFFACA]/50 text-sm leading-relaxed">{award.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Scroll Indicators */}
            <div className="absolute right-0 top-0 bottom-4 w-20 bg-gradient-to-l from-[#151613] to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Nuestros Logros - Full Width Image */}
        <div className="mt-16">
          <div
            className={`relative rounded-2xl overflow-hidden transition-all duration-700 delay-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ccc-gALQ3KWjawlF9rnPDmzFmx33ahTdAz.png"
              alt="Nuestros logros - Ganadores de premios ILAN, JIJE, Sadosky, Usina Emprendedores"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Event Photo */}
        <div className="mt-8">
          <div
            className={`relative rounded-2xl overflow-hidden aspect-video max-w-4xl mx-auto transition-all duration-700 delay-600 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AGRADECIMIENTOS.png-5OTA6U7D0gfG9BTAJJXyKQwQIhtxO1.jpeg"
              alt="Equipo Sentinel en Prendete y Premios Sadosky"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#151613]/80 to-transparent" />
            <div className="absolute bottom-4 left-4">
              <span className="text-[#FFFACA]/80 text-sm font-medium">Prendete & Premios Sadosky</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
