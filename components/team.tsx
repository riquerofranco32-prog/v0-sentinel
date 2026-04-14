"use client"

import { useState } from "react"
import { Linkedin } from "lucide-react"

const team = [
  {
    name: "Lautaro Silva",
    role: "CEO | Founder",
    background: "Ingeniero Industrial",
    focus: "Liderazgo en estrategia, desarrollo de productos y asociaciones.",
    photo: "/GANAMOS-3.jpg",
    linkedin: "https://linkedin.com/in/",
  },
  {
    name: "Franco Riquero",
    role: "CDO | Co-Founder",
    background: "Tec. Elec | Ingeniero Industrial",
    focus: "Sensores, IA, datos y hoja de ruta de I+D.",
    photo: "/GANAMOS-2.jpg",
    linkedin: "https://linkedin.com/in/francoriquero-117492355",
  },
  {
    name: "Alexis Ramundo",
    role: "CTO | Co-Founder",
    background: "Tec. Elec | Ingeniero en Sistemas",
    focus: "Liderazgo técnico. Desarrollo de software y gestión de sistemas.",
    photo: "/GANAMOS-1.jpg",
    linkedin: "https://linkedin.com/in/",
  },
  {
    name: "Martín Toledano",
    role: "CFO | Co-Founder",
    background: "Tec. Elec | Ingeniero Industrial",
    focus: "Modelo de negocio, precios y asociaciones industriales.",
    photo: "/GANAMOS.jpg",
    linkedin: "https://linkedin.com/in/",
  },
]

export function Team() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section
      id="equipo"
      className="relative py-32 px-6 overflow-hidden"
      style={{ background: "#0c0b09" }}
    >
      {/* Top border line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2"
        style={{
          width: "1px",
          height: "80px",
          background:
            "linear-gradient(to bottom, transparent, rgba(148,241,190,0.3))",
        }}
      />

      <div className="relative max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-20 text-center">
          <p
            className="mb-4"
            style={{
              fontFamily: "'Jura', sans-serif",
              fontSize: "10px",
              fontWeight: 600,
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "#94f1be",
            }}
          >
            El equipo
          </p>
          <h2
            style={{
              fontFamily: "'Jura', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              color: "rgba(240,234,216,0.95)",
              lineHeight: 1.15,
            }}
          >
            Las personas detrás de Sentinel
          </h2>
          <p
            className="mt-4 mx-auto"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 300,
              fontSize: "15px",
              lineHeight: 1.7,
              color: "rgba(240,234,216,0.45)",
              maxWidth: "400px",
            }}
          >
            Cuatro ingenieros de la Patagonia con un objetivo común: que ningún
            incendio pase desapercibido.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {team.map((member, i) => (
            <div
              key={member.name}
              className="relative flex flex-col overflow-hidden rounded-sm cursor-default transition-all duration-500"
              style={{
                border: `0.5px solid ${
                  hovered === i
                    ? "rgba(148,241,190,0.25)"
                    : "rgba(240,234,216,0.07)"
                }`,
                background:
                  hovered === i
                    ? "rgba(148,241,190,0.03)"
                    : "rgba(240,234,216,0.02)",
                transform: hovered === i ? "translateY(-4px)" : "translateY(0)",
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Photo */}
              <div
                className="relative overflow-hidden"
                style={{ aspectRatio: "3/4" }}
              >
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-full object-cover object-top transition-transform duration-700"
                  style={{
                    transform:
                      hovered === i ? "scale(1.04)" : "scale(1.0)",
                    filter: "grayscale(15%)",
                  }}
                  loading="lazy"
                />
                {/* Gradient over photo */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to bottom, transparent 50%, rgba(12,11,9,0.95) 100%)",
                  }}
                />

                {/* Role badge — top left */}
                <div
                  className="absolute top-3 left-3"
                  style={{
                    fontFamily: "'Jura', sans-serif",
                    fontSize: "9px",
                    fontWeight: 600,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "#94f1be",
                    background: "rgba(12,11,9,0.7)",
                    border: "0.5px solid rgba(148,241,190,0.2)",
                    padding: "4px 8px",
                    borderRadius: "2px",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  {member.role.split(" | ")[0]}
                </div>
              </div>

              {/* Info */}
              <div className="p-4 flex flex-col gap-1 flex-1">
                <h3
                  style={{
                    fontFamily: "'Jura', sans-serif",
                    fontWeight: 700,
                    fontSize: "15px",
                    color: "rgba(240,234,216,0.95)",
                    lineHeight: 1.2,
                  }}
                >
                  {member.name}
                </h3>

                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "11px",
                    fontWeight: 300,
                    color: "rgba(240,234,216,0.35)",
                    letterSpacing: "0.03em",
                  }}
                >
                  {member.background}
                </p>

                {/* Divider */}
                <div
                  className="my-3"
                  style={{
                    height: "0.5px",
                    background:
                      hovered === i
                        ? "rgba(148,241,190,0.2)"
                        : "rgba(240,234,216,0.07)",
                    transition: "background 0.3s",
                  }}
                />

                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "12px",
                    fontWeight: 300,
                    color: "rgba(240,234,216,0.5)",
                    lineHeight: 1.6,
                    flex: 1,
                  }}
                >
                  {member.focus}
                </p>

                {/* LinkedIn */}
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 transition-all duration-200"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "11px",
                    fontWeight: 400,
                    color:
                      hovered === i
                        ? "#94f1be"
                        : "rgba(240,234,216,0.25)",
                    textDecoration: "none",
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Linkedin className="w-3 h-3" />
                  LinkedIn
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
