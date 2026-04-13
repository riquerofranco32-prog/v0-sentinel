"use client"

import { useEffect, useRef, useState } from "react"

const awards = [
  {
    tag: "Ganadores",
    winner: true,
    title: "ILAN–UTN 2025",
    description: "Premiados como la solución tecnológica más innovadora del certamen, con viaje a Israel para una misión de innovación.",
  },
  {
    tag: "Finalistas",
    winner: false,
    title: "Premios Sadosky 2025 — Startup del Año",
    description: "Finalistas en la categoría Mejor Startup del Año 2025 y Solución Innovadora, uno de los reconocimientos más prestigiosos del sector tecnológico argentino.",
  },
  {
    tag: "3° Puesto Nacional",
    winner: false,
    title: "Usina de Emprendedores",
    description: "Tercer lugar entre emprendimientos de alto potencial elegidos a nivel nacional. Destaca nuestra propuesta de valor, escalabilidad y viabilidad.",
  },
  {
    tag: "Finalistas",
    winner: false,
    title: "Premios Prendete 2025 — Categoría Jump",
    description: "Seleccionados en la categoría Jump, que premia soluciones innovadoras con potencial de crecimiento acelerado.",
  },
  {
    tag: "Top 700+",
    winner: false,
    title: "Concurso Soluciones Innovadoras BNA 2025",
    description: "Seleccionados entre más de 700 propuestas para avanzar a la segunda etapa, con 8 encuentros de formación y asistencia.",
  },
  {
    tag: "Ganadores",
    winner: true,
    title: "JIJE 2025 — Mejor Modelo de Negocio",
    description: "Reconocidos como el modelo de mayor impacto entre decenas de iniciativas innovadoras.",
  },
]

const alliances = [
  {
    title: "Forestal Argentina",
    stat: "40+",
    statLabel: "registros históricos",
    description: "Registros históricos de incendios forestales con ubicación, imágenes y cronologías de propagación para validar la precisión del sistema.",
  },
  {
    title: "Bomberos de San Rafael",
    stat: "100+",
    statLabel: "imágenes térmicas",
    description: "Imágenes térmicas obtenidas en pruebas de campo con escenarios reales, usadas para entrenar los algoritmos de detección.",
  },
  {
    title: "Fundación Patagonia Natural",
    stat: "ONG",
    statLabel: "aval ambiental",
    description: "Acompañamiento en la construcción de una propuesta coherente con criterios de sostenibilidad y conservación de ecosistemas vulnerables.",
  },
  {
    title: "Municipalidad de San Rafael",
    stat: "Gov",
    statLabel: "respaldo institucional",
    description: "Acceso a áreas protegidas para patrullaje experimental a través de la Dirección de Espacios Verdes y Medio Ambiente.",
  },
  {
    title: "UBA — Ciencias Económicas",
    stat: "UBA",
    statLabel: "caso de estudio",
    description: "Sentinel fue caso de estudio en el Kick Off de la materia Plan de Marketing Digital del Máster de la UBA.",
  },
  {
    title: "Endeavor Cuyo",
    stat: "Red",
    statLabel: "mentoría estratégica",
    description: "Seleccionados para mentoría y apoyo estratégico, validando el potencial de crecimiento regional e internacional.",
  },
  {
    title: "NAVES — IAE Business School",
    stat: "#1",
    statLabel: "aceleradora argentina",
    description: "Seleccionados para participar en el principal programa de aceleración empresarial de Argentina.",
  },
  {
    title: "UNCUYO — Incubación",
    stat: "I+D",
    statLabel: "desarrollo tecnológico",
    description: "Seleccionados para incubación y mentoría por la Universidad Nacional de Cuyo, fortaleciendo el desarrollo y la estrategia de go-to-market.",
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
            className="text-[11px] tracking-[0.3em] uppercase mb-6"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: "rgba(240,234,216,0.3)",
              opacity: isVisible ? 1 : 0,
              transition: "opacity 700ms",
            }}
          >
            Reconocimientos
          </p>
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(36px, 6vw, 64px)",
              color: "rgba(240,234,216,0.92)",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(16px)",
              transition: "all 700ms 100ms",
            }}
          >
            Nuestra validación
          </h2>
        </div>

        {/* Contador de premios destacado */}
        <div
          className="grid grid-cols-3 gap-px mb-20"
          style={{
            background: "rgba(240,234,216,0.06)",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(16px)",
            transition: "all 700ms 150ms",
          }}
        >
          {[
            { value: "2", label: "Premios ganados" },
            { value: "4", label: "Premios finalistas" },
            { value: "8", label: "Alianzas estratégicas" },
          ].map((item) => (
            <div key={item.label} className="p-8 text-center" style={{ background: "#0c0b09" }}>
              <div
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 800,
                  fontSize: "48px",
                  lineHeight: 1,
                  color: "rgba(240,234,216,0.88)",
                  letterSpacing: "-2px",
                  marginBottom: "6px",
                }}
              >
                {item.value}
              </div>
              <div
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 300,
                  color: "rgba(240,234,216,0.3)",
                }}
              >
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* Awards — tabla con ganadores destacados */}
        <div className="mb-24">
          <p
            style={{
              fontSize: "11px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              fontFamily: "'Inter', sans-serif",
              color: "rgba(240,234,216,0.2)",
              marginBottom: "24px",
              opacity: isVisible ? 1 : 0,
              transition: "opacity 700ms 200ms",
            }}
          >
            Premios
          </p>

          <div style={{ borderTop: "0.5px solid rgba(240,234,216,0.06)" }}>
            {awards.map((award, i) => (
              <div
                key={award.title}
                style={{
                  display: "grid",
                  gridTemplateColumns: "180px 1fr",
                  gap: "48px",
                  padding: "28px 0",
                  borderBottom: "0.5px solid rgba(240,234,216,0.06)",
                  background: award.winner ? "rgba(240,234,216,0.025)" : "transparent",
                  borderLeft: award.winner ? "2px solid rgba(240,234,216,0.15)" : "2px solid transparent",
                  paddingLeft: award.winner ? "20px" : "0",
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(12px)",
                  transition: `all 700ms ${200 + i * 60}ms`,
                }}
              >
                {/* Tag */}
                <div style={{ display: "flex", alignItems: "flex-start", paddingTop: "2px" }}>
                  <span
                    style={{
                      display: "inline-block",
                      fontSize: "10px",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: award.winner ? 500 : 300,
                      color: award.winner ? "rgba(240,234,216,0.7)" : "rgba(240,234,216,0.25)",
                      background: award.winner ? "rgba(240,234,216,0.08)" : "transparent",
                      border: award.winner ? "0.5px solid rgba(240,234,216,0.15)" : "none",
                      padding: award.winner ? "4px 10px" : "0",
                      borderRadius: award.winner ? "3px" : "0",
                    }}
                  >
                    {award.winner && "★ "}{award.tag}
                  </span>
                </div>

                {/* Content */}
                <div>
                  <p
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontWeight: 800,
                      fontSize: award.winner ? "18px" : "15px",
                      color: award.winner ? "rgba(240,234,216,0.92)" : "rgba(240,234,216,0.75)",
                      marginBottom: "8px",
                      letterSpacing: award.winner ? "-0.3px" : "0",
                    }}
                  >
                    {award.title}
                  </p>
                  <p
                    style={{
                      fontSize: "13px",
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 300,
                      color: "rgba(240,234,216,0.4)",
                      lineHeight: 1.6,
                    }}
                  >
                    {award.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alianzas */}
        <div className="mb-20">
          <p
            style={{
              fontSize: "11px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              fontFamily: "'Inter', sans-serif",
              color: "rgba(240,234,216,0.2)",
              marginBottom: "24px",
              opacity: isVisible ? 1 : 0,
              transition: "opacity 700ms 400ms",
            }}
          >
            Alianzas estratégicas
          </p>

          <div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-px"
            style={{ background: "rgba(240,234,216,0.06)" }}
          >
            {alliances.map((alliance, i) => (
              <div
                key={alliance.title}
                style={{
                  background: "#0c0b09",
                  padding: "28px 24px",
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(12px)",
                  transition: `all 700ms ${420 + i * 40}ms`,
                }}
              >
                {/* Stat destacado */}
                <div
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 800,
                    fontSize: "28px",
                    color: "rgba(240,234,216,0.6)",
                    letterSpacing: "-1px",
                    lineHeight: 1,
                    marginBottom: "2px",
                  }}
                >
                  {alliance.stat}
                </div>
                <div
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    fontFamily: "'Inter', sans-serif",
                    color: "rgba(240,234,216,0.2)",
                    marginBottom: "12px",
                  }}
                >
                  {alliance.statLabel}
                </div>
                <div
                  style={{
                    width: "20px",
                    height: "0.5px",
                    background: "rgba(240,234,216,0.12)",
                    marginBottom: "12px",
                  }}
                />
                <p
                  style={{
                    fontSize: "12px",
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 700,
                    color: "rgba(240,234,216,0.6)",
                    marginBottom: "6px",
                  }}
                >
                  {alliance.title}
                </p>
                <p
                  style={{
                    fontSize: "12px",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 300,
                    color: "rgba(240,234,216,0.3)",
                    lineHeight: 1.5,
                  }}
                >
                  {alliance.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Photos */}
        <div
          className="grid md:grid-cols-2 gap-4"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(16px)",
            transition: "all 700ms 600ms",
          }}
        >
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
