"use client"

import { useEffect, useRef, useState } from "react"

const achievements = [
  { tag: "Ganadores", highlight: true,  title: "Premios ILAN 2025",                       detail: "Viaje a Israel · Misión de innovación" },
  { tag: "Ganadores", highlight: true,  title: "JIJE 2025 — UNL",                          detail: "Mejor Modelo de Negocio · 20 años del certamen" },
  { tag: "Ganadores", highlight: true,  title: "Premios Sadosky 2025 — CESSI",             detail: "Startup del Año · Solución Innovadora" },
  { tag: "Ganadores", highlight: true,  title: "Usina Emprendedores — CAC",                detail: "1° Puesto Nacional · Alto potencial" },
  { tag: "Ganadores", highlight: true,  title: "Prendete Pitch Day — CICE SV",             detail: "Categoría Jump · Crecimiento acelerado" },
  { tag: "Seleccionados", highlight: false, title: "Softlanding en Europa",                detail: "Por Piensas.xyz · Internacionalización" },
  { tag: "Inversión",    highlight: false, title: "Gobierno de Mendoza",                   detail: "$3.000 USD · Primer capital público" },
  { tag: "Seleccionados", highlight: false, title: "Emprelatam + Draper House Americas",   detail: "Red internacional de inversión" },
  { tag: "Finalistas",   highlight: false, title: "Impact Startup Competition Perú 2026",  detail: "By Scale · Expansión regional" },
]

const supporters = [
  "ILAN", "Gobierno de Salta", "endeavor", "Premios Sadosky", "CESSI", "UTN San Rafael",
  "Bomberos", "Embajada Argentina en China", "XAG", "Incubadora UNCUYO",
  "UNL", "Fundación Patagonia Natural", "UBA", "Movistar",
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

  const winners = achievements.filter((a) => a.highlight)
  const others  = achievements.filter((a) => !a.highlight)

  return (
    <section
      ref={sectionRef}
      id="noticias"
      style={{ background: "#0c0b09", padding: "96px 0 80px" }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 40px" }}>

        {/* Header */}
        <div
          style={{
            marginBottom: "64px",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "none" : "translateY(16px)",
            transition: "all 700ms",
          }}
        >
          <p
            style={{
              fontFamily: "'Inter',sans-serif",
              fontSize: "11px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "rgba(240,234,216,0.3)",
              marginBottom: "16px",
            }}
          >
            Reconocimientos
          </p>
          <h2
            style={{
              fontFamily: "'Syne',sans-serif",
              fontWeight: 800,
              fontSize: "clamp(36px,5vw,60px)",
              color: "rgba(240,234,216,0.92)",
              lineHeight: 1.05,
              margin: 0,
            }}
          >
            Nuestros logros.
          </h2>
        </div>

        {/* Label ganadores */}
        <p
          style={{
            fontFamily: "'Inter',sans-serif",
            fontSize: "11px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(100,210,140,0.5)",
            marginBottom: "20px",
            opacity: isVisible ? 1 : 0,
            transition: "opacity 600ms 100ms",
          }}
        >
          Ganadores
        </p>

        {/* Tarjetas verdes — ganadores */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))",
            gap: "2px",
          }}
        >
          {winners.map((a, i) => (
            <div
              key={a.title}
              style={{
                background: "rgba(20,70,42,0.4)",
                border: "0.5px solid rgba(74,222,128,0.18)",
                padding: "28px 22px",
                position: "relative",
                overflow: "hidden",
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "none" : "translateY(12px)",
                transition: `all 700ms ${150 + i * 60}ms`,
              }}
            >
              {/* glow esquina */}
              <div
                style={{
                  position: "absolute",
                  top: "-20px",
                  right: "-20px",
                  width: "100px",
                  height: "100px",
                  background: "radial-gradient(circle, rgba(74,222,128,0.12) 0%, transparent 70%)",
                  pointerEvents: "none",
                }}
              />

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "7px",
                  marginBottom: "16px",
                }}
              >
                <span style={{ color: "#4ade80", fontSize: "13px" }}>★</span>
                <span
                  style={{
                    fontFamily: "'Inter',sans-serif",
                    fontSize: "10px",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "rgba(74,222,128,0.65)",
                    fontWeight: 500,
                  }}
                >
                  Ganadores
                </span>
              </div>

              <p
                style={{
                  fontFamily: "'Syne',sans-serif",
                  fontWeight: 800,
                  fontSize: "15px",
                  color: "rgba(240,234,216,0.92)",
                  lineHeight: 1.25,
                  marginBottom: "8px",
                }}
              >
                {a.title}
              </p>
              <p
                style={{
                  fontFamily: "'Inter',sans-serif",
                  fontWeight: 300,
                  fontSize: "12px",
                  color: "rgba(240,234,216,0.38)",
                  lineHeight: 1.5,
                }}
              >
                {a.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Tabla — otros logros */}
        <div
          style={{
            marginTop: "52px",
            borderTop: "0.5px solid rgba(240,234,216,0.06)",
          }}
        >
          {others.map((a, i) => (
            <div
              key={a.title}
              style={{
                display: "grid",
                gridTemplateColumns: "120px 1fr auto",
                gap: "24px",
                alignItems: "center",
                padding: "18px 0",
                borderBottom: "0.5px solid rgba(240,234,216,0.06)",
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "none" : "translateY(8px)",
                transition: `all 600ms ${480 + i * 50}ms`,
              }}
            >
              <span
                style={{
                  fontFamily: "'Inter',sans-serif",
                  fontSize: "10px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(240,234,216,0.26)",
                  fontWeight: 300,
                }}
              >
                {a.tag}
              </span>
              <p
                style={{
                  fontFamily: "'Syne',sans-serif",
                  fontWeight: 700,
                  fontSize: "14px",
                  color: "rgba(240,234,216,0.78)",
                  margin: 0,
                }}
              >
                {a.title}
              </p>
              <p
                style={{
                  fontFamily: "'Inter',sans-serif",
                  fontWeight: 300,
                  fontSize: "12px",
                  color: "rgba(240,234,216,0.32)",
                  textAlign: "right",
                  margin: 0,
                  whiteSpace: "nowrap",
                }}
              >
                {a.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Apoyo — logo strip */}
        <div
          style={{
            marginTop: "72px",
            paddingTop: "48px",
            borderTop: "0.5px solid rgba(240,234,216,0.06)",
            opacity: isVisible ? 1 : 0,
            transition: "opacity 700ms 650ms",
          }}
        >
          <p
            style={{
              fontFamily: "'Inter',sans-serif",
              fontSize: "11px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "rgba(240,234,216,0.2)",
              marginBottom: "28px",
            }}
          >
            Apoyo
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "2px" }}>
            {supporters.map((name, i) => (
              <div
                key={name}
                style={{
                  background: "rgba(240,234,216,0.04)",
                  border: "0.5px solid rgba(240,234,216,0.08)",
                  padding: "9px 16px",
                  borderRadius: "2px",
                  fontFamily: "'Inter',sans-serif",
                  fontSize: "12px",
                  fontWeight: 300,
                  color: "rgba(240,234,216,0.38)",
                  letterSpacing: "0.02em",
                  opacity: isVisible ? 1 : 0,
                  transition: `opacity 500ms ${680 + i * 30}ms`,
                }}
              >
                {name}
              </div>
            ))}
          </div>
        </div>

        {/* Fotos */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
            marginTop: "56px",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "none" : "translateY(16px)",
            transition: "all 700ms 750ms",
          }}
        >
          <div
            style={{
              position: "relative",
              overflow: "hidden",
              borderRadius: "4px",
              aspectRatio: "16/9",
            }}
          >
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ccc-gALQ3KWjawlF9rnPDmzFmx33ahTdAz.png"
              alt="Logros Sentinel"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(12,11,9,0.6), transparent)",
              }}
            />
          </div>
          <div
            style={{
              position: "relative",
              overflow: "hidden",
              borderRadius: "4px",
              aspectRatio: "16/9",
            }}
          >
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AGRADECIMIENTOS.png-5OTA6U7D0gfG9BTAJJXyKQwQIhtxO1.jpeg"
              alt="Prendete & Premios Sadosky"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(12,11,9,0.6), transparent)",
              }}
            />
            <p
              style={{
                position: "absolute",
                bottom: "16px",
                left: "20px",
                fontFamily: "'Inter',sans-serif",
                fontSize: "11px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "rgba(240,234,216,0.5)",
                margin: 0,
              }}
            >
              Prendete & Premios Sadosky
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}
