"use client"

import { useEffect, useRef, useState } from "react"

const awards = [
  {
    tag: "Ganadores",
    title: "ILAN–UTN 2025",
    description: "Premiados como la solución tecnológica más innovadora del certamen, con viaje a Israel para una misión de innovación.",
  },
  {
    tag: "Finalistas",
    title: "Premios Sadosky 2025 — Startup del Año",
    description: "Finalistas en la categoría Mejor Startup del Año 2025 y Solución Innovadora, uno de los reconocimientos más prestigiosos del sector tecnológico argentino.",
  },
  {
    tag: "3° Puesto Nacional",
    title: "Usina de Emprendedores",
    description: "Tercer lugar entre emprendimientos de alto potencial elegidos a nivel nacional. Destaca nuestra propuesta de valor, escalabilidad y viabilidad.",
  },
  {
    tag: "Finalistas",
    title: "Premios Prendete 2025 — Categoría Jump",
    description: "Seleccionados en la categoría Jump, que premia soluciones innovadoras con potencial de crecimiento acelerado.",
  },
  {
    tag: "Top 700+",
    title: "Concurso Soluciones Innovadoras BNA 2025",
    description: "Seleccionados entre más de 700 propuestas para avanzar a la segunda etapa, con 8 encuentros de formación y asistencia.",
  },
  {
    tag: "Ganadores",
    title: "JIJE 2025 — Mejor Modelo de Negocio",
    description: "Reconocidos como el modelo de mayor impacto entre decenas de iniciativas innovadoras.",
  },
]

const alliances = [
  {
    title: "Forestal Argentina",
    description: "Más de 40 registros históricos de incendios forestales con ubicación, imágenes y cronologías de propagación para validar la precisión del sistema.",
  },
  {
    title: "Bomberos de San Rafael",
    description: "Más de 100 imágenes térmicas obtenidas en pruebas de campo con escenarios reales, usadas para entrenar los algoritmos de detección.",
  },
  {
    title: "Fundación Patagonia Natural",
    description: "Acompañamiento en la construcción de una propuesta coherente con criterios de sostenibilidad y conservación de ecosistemas vulnerables.",
  },
  {
    title: "Municipalidad de San Rafael",
    description: "Respaldo institucional y acceso a áreas protegidas para patrullaje experimental a través de la Dirección de Espacios Verdes y Medio Ambiente.",
  },
  {
    title: "UBA — Ciencias Económicas",
    description: "Sentinel fue caso de estudio en el Kick Off de la materia Plan de Marketing Digital del Máster de la UBA, en una actividad organizada por Movistar.",
  },
  {
    title: "Endeavor Cuyo",
    description: "Seleccionados para mentoría y apoyo estratégico, validando el potencial de crecimiento regional e internacional.",
  },
  {
    title: "NAVES — IAE Business School",
    description: "Seleccionados para participar en el principal programa de aceleración empresarial de Argentina.",
  },
  {
    title: "Programa de Incubación UNCUYO",
    description: "Seleccionados para incubación y mentoría por la Universidad Nacional de Cuyo, fortaleciendo el desarrollo tecnológico y la estrategia de go-to-market.",
  },
]

export function Awards() {
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

  const fadeIn = (delay = 0) =>
    `transition-all duration-700 delay-[${delay}ms] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`

  return (
    <section
      ref={sectionRef}
      id="noticias"
      className="py-24 lg:py-32 bg-[#0c0b09]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div className="mb-20">
          <p
            className={`text-[11px] tracking-[0.3em] uppercase mb-6 transition-all duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}
            style={{ fontFamily: "'Inter', sans-serif", color: "rgba(240,234,216,0.3)" }}
          >
            Reconocimientos
          </p>
          <h2
            className={`text-4xl sm:text-5xl lg:text-6xl transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              color: "rgba(240,234,216,0.92)",
            }}
          >
            Nuestra validación
          </h2>
        </div>

        {/* Awards — tabla */}
        <div className="mb-24">
          <p
            className={`text-[11px] tracking-[0.3em] uppercase mb-8 transition-all duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}
            style={{ fontFamily: "'Inter', sans-serif", color: "rgba(240,234,216,0.2)" }}
          >
            Premios
          </p>
          <div
            className="border-t"
            style={{ borderColor: "rgba(240,234,216,0.06)" }}
          >
            {awards.map((award, i) => (
              <div
                key={award.title}
                className={`grid md:grid-cols-[200px_1fr] gap-6 md:gap-12 py-8 border-b transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={{
                  borderColor: "rgba(240,234,216,0.06)",
                  transitionDelay: `${i * 60}ms`,
                }}
              >
                <div className="flex md:flex-col gap-3 md:gap-2">
                  <span
                    className="text-[11px] tracking-[0.15em] uppercase"
                    style={{ fontFamily: "'Inter', sans-serif", color: "rgba(240,234,216,0.25)" }}
                  >
                    {award.tag}
                  </span>
                </div>
                <div>
                  <p
                    className="text-[15px] font-medium mb-2"
                    style={{ fontFamily: "'Syne', sans-serif", color: "rgba(240,234,216,0.85)" }}
                  >
                    {award.title}
                  </p>
                  <p
                    className="text-[13px] leading-relaxed"
                    style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, color: "rgba(240,234,216,0.4)" }}
                  >
                    {award.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alliances */}
        <div className="mb-20">
          <p
            className={`text-[11px] tracking-[0.3em] uppercase mb-8 transition-all duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}
            style={{ fontFamily: "'Inter', sans-serif", color: "rgba(240,234,216,0.2)" }}
          >
            Alianzas estratégicas
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: "rgba(240,234,216,0.06)" }}>
            {alliances.map((alliance, i) => (
              <div
                key={alliance.title}
                className={`p-7 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={{
                  background: "#0c0b09",
                  transitionDelay: `${i * 50}ms`,
                }}
              >
                <p
                  className="text-[13px] font-medium mb-3"
                  style={{ fontFamily: "'Syne', sans-serif", color: "rgba(240,234,216,0.75)" }}
                >
                  {alliance.title}
                </p>
                <p
                  className="text-[12px] leading-relaxed"
                  style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, color: "rgba(240,234,216,0.35)" }}
                >
                  {alliance.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Photos */}
        <div className={`grid md:grid-cols-2 gap-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="relative overflow-hidden" style={{ borderRadius: "4px", aspectRatio: "16/9" }}>
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ccc-gALQ3KWjawlF9rnPDmzFmx33ahTdAz.png"
              alt="Logros Sentinel"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0b09]/60 to-transparent" />
          </div>
          <div className="relative overflow-hidden" style={{ borderRadius: "4px", aspectRatio: "16/9" }}>
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AGRADECIMIENTOS.png-5OTA6U7D0gfG9BTAJJXyKQwQIhtxO1.jpeg"
              alt="Prendete & Premios Sadosky"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0b09]/60 to-transparent" />
            <p
              className="absolute bottom-4 left-5 text-[11px] tracking-wider uppercase"
              style={{ fontFamily: "'Inter', sans-serif", color: "rgba(240,234,216,0.5)" }}
            >
              Prendete & Premios Sadosky
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}
