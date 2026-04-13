"use client"

import { useEffect, useRef, useState } from "react"
import { Trophy, Star, Globe, Banknote, Award } from "lucide-react"

const winners = [
  { num: "01", title: "Premios ILAN 2025",              sub: "Viaje a Israel · Misión de innovación",             icon: "trophy" },
  { num: "02", title: "JIJE 2025 — UNL",                sub: "Mejor Modelo de Negocio · 20 años",                icon: "star"   },
  { num: "03", title: "Premios Sadosky — CESSI",        sub: "Startup del Año · Solución Innovadora",            icon: "award"  },
  { num: "04", title: "Usina Emprendedores — CAC",      sub: "1° Puesto Nacional · Alto potencial",              icon: "trophy" },
  { num: "05", title: "Prendete Pitch Day — CICE SV",   sub: "Categoría Jump · Crecimiento acelerado",           icon: "star"   },
]

const others = [
  { tag: "Seleccionados", title: "Softlanding en Europa",                   sub: "Piensas.xyz",              icon: "globe"    },
  { tag: "Inversión",     title: "Gobierno de Mendoza",                     sub: "$3.000 USD",               icon: "banknote" },
  { tag: "Seleccionados", title: "Emprelatam + Draper House Americas",      sub: "Red de inversión",         icon: "globe"    },
  { tag: "Finalistas",    title: "Impact Startup Competition Perú 2026",    sub: "By Scale",                 icon: "award"    },
]

const supporters = [
  "ILAN", "Gobierno de Salta", "endeavor", "Premios Sadosky",
  "CESSI", "UTN San Rafael", "Bomberos", "Embajada Arg. en China",
  "XAG", "Incubadora UNCUYO", "UNL", "Patagonia Natural", "UBA", "Movistar",
]

const IconComp = ({ name, size = 18 }: { name: string; size?: number }) => {
  const props = { size, strokeWidth: 1.5 }
  if (name === "trophy")   return <Trophy   {...props} />
  if (name === "star")     return <Star     {...props} />
  if (name === "globe")    return <Globe    {...props} />
  if (name === "banknote") return <Banknote {...props} />
  return <Award {...props} />
}

// Grid background CSS (subtle lines)
const gridBg = `
  repeating-linear-gradient(
    0deg,
    transparent,
    transparent 39px,
    rgba(74,222,128,0.04) 39px,
    rgba(74,222,128,0.04) 40px
  ),
  repeating-linear-gradient(
    90deg,
    transparent,
    transparent 39px,
    rgba(74,222,128,0.04) 39px,
    rgba(74,222,128,0.04) 40px
  )
`

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

  const vis = (delay = 0): React.CSSProperties => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "none" : "translateY(14px)",
    transition: `all 700ms ${delay}ms`,
  })

  return (
    <section
      ref={sectionRef}
      id="noticias"
      style={{
        background: `${gridBg}, #0d1a12`,
        padding: "96px 0 80px",
        position: "relative",
      }}
    >
      {/* verde ambiental de fondo */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(20,90,50,0.35) 0%, transparent 70%)",
      }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 40px", position: "relative" }}>

        {/* ── Header ── */}
        <div style={{ marginBottom: "56px", ...vis(0) }}>
          <p style={{
            fontFamily: "'Inter',sans-serif", fontSize: "11px",
            letterSpacing: "0.3em", textTransform: "uppercase",
            color: "rgba(74,222,128,0.45)", marginBottom: "14px",
          }}>
            Reconocimientos
          </p>
          <h2 style={{
            fontFamily: "'Syne',sans-serif", fontWeight: 800,
            fontSize: "clamp(38px,5vw,64px)",
            color: "rgba(240,234,216,0.92)", lineHeight: 1.05, margin: 0,
          }}>
            Nuestros logros.
          </h2>
        </div>

        {/* ── Ganadores — 5 tarjetas ── */}
        <p style={{
          fontFamily: "'Inter',sans-serif", fontSize: "11px",
          letterSpacing: "0.3em", textTransform: "uppercase",
          color: "rgba(74,222,128,0.4)", marginBottom: "16px",
          ...vis(80),
        }}>
          Ganadores
        </p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "12px",
          marginBottom: "48px",
        }}>
          {winners.map((w, i) => (
            <div
              key={w.title}
              style={{
                background: "rgba(10,40,22,0.75)",
                border: "0.5px solid rgba(74,222,128,0.18)",
                borderRadius: "12px",
                padding: "28px 22px 24px",
                position: "relative",
                overflow: "hidden",
                backdropFilter: "blur(4px)",
                ...vis(120 + i * 60),
              }}
            >
              {/* número gran */}
              <div style={{
                position: "absolute", top: "18px", right: "20px",
                fontFamily: "'Syne',sans-serif", fontWeight: 800,
                fontSize: "40px", lineHeight: 1,
                color: "rgba(74,222,128,0.12)",
                letterSpacing: "-2px", userSelect: "none",
              }}>
                {w.num}
              </div>

              {/* ícono */}
              <div style={{
                width: "38px", height: "38px",
                background: "rgba(74,222,128,0.1)",
                border: "0.5px solid rgba(74,222,128,0.2)",
                borderRadius: "8px",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "rgba(74,222,128,0.8)",
                marginBottom: "20px",
              }}>
                <IconComp name={w.icon} size={16} />
              </div>

              <div style={{
                display: "flex", alignItems: "center", gap: "6px", marginBottom: "10px",
              }}>
                <span style={{ color: "#4ade80", fontSize: "11px" }}>★</span>
                <span style={{
                  fontFamily: "'Inter',sans-serif", fontSize: "10px",
                  letterSpacing: "0.2em", textTransform: "uppercase",
                  color: "rgba(74,222,128,0.6)", fontWeight: 500,
                }}>
                  Ganadores
                </span>
              </div>

              <p style={{
                fontFamily: "'Syne',sans-serif", fontWeight: 800,
                fontSize: "14px", color: "rgba(240,234,216,0.88)",
                lineHeight: 1.3, marginBottom: "8px",
              }}>
                {w.title}
              </p>
              <p style={{
                fontFamily: "'Inter',sans-serif", fontWeight: 300,
                fontSize: "12px", color: "rgba(240,234,216,0.35)",
                lineHeight: 1.5, margin: 0,
              }}>
                {w.sub}
              </p>
            </div>
          ))}
        </div>

        {/* ── Otros logros — fila de cards más chicas ── */}
        <p style={{
          fontFamily: "'Inter',sans-serif", fontSize: "11px",
          letterSpacing: "0.3em", textTransform: "uppercase",
          color: "rgba(240,234,216,0.2)", marginBottom: "16px",
          ...vis(500),
        }}>
          También
        </p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: "12px",
          marginBottom: "56px",
        }}>
          {others.map((o, i) => (
            <div
              key={o.title}
              style={{
                background: "rgba(240,234,216,0.03)",
                border: "0.5px solid rgba(240,234,216,0.08)",
                borderRadius: "10px",
                padding: "20px 20px",
                display: "flex",
                gap: "14px",
                alignItems: "flex-start",
                ...vis(520 + i * 50),
              }}
            >
              <div style={{
                width: "32px", height: "32px", flexShrink: 0,
                background: "rgba(240,234,216,0.05)",
                border: "0.5px solid rgba(240,234,216,0.1)",
                borderRadius: "7px",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "rgba(240,234,216,0.3)",
              }}>
                <IconComp name={o.icon} size={14} />
              </div>
              <div>
                <span style={{
                  fontFamily: "'Inter',sans-serif", fontSize: "10px",
                  letterSpacing: "0.15em", textTransform: "uppercase",
                  color: "rgba(240,234,216,0.25)", display: "block", marginBottom: "5px",
                }}>
                  {o.tag}
                </span>
                <p style={{
                  fontFamily: "'Syne',sans-serif", fontWeight: 700,
                  fontSize: "13px", color: "rgba(240,234,216,0.75)",
                  margin: "0 0 4px",
                }}>
                  {o.title}
                </p>
                <p style={{
                  fontFamily: "'Inter',sans-serif", fontWeight: 300,
                  fontSize: "11px", color: "rgba(240,234,216,0.3)",
                  margin: 0,
                }}>
                  {o.sub}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Card de alerta — hero visual ── */}
        <div style={{ ...vis(680), marginBottom: "56px" }}>
          <p style={{
            fontFamily: "'Inter',sans-serif", fontSize: "11px",
            letterSpacing: "0.3em", textTransform: "uppercase",
            color: "rgba(240,234,216,0.2)", marginBottom: "16px",
          }}>
            Nuestro sistema en acción
          </p>

          <div style={{
            background: "rgba(10,30,18,0.9)",
            border: "0.5px solid rgba(74,222,128,0.25)",
            borderRadius: "14px",
            padding: "24px 28px",
            maxWidth: "520px",
            position: "relative",
            overflow: "hidden",
          }}>
            {/* glow */}
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0,
              height: "1px",
              background: "linear-gradient(90deg, transparent, rgba(74,222,128,0.4), transparent)",
            }} />

            {/* cabecera */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
              <div style={{
                width: "32px", height: "32px",
                background: "rgba(234,88,12,0.2)",
                border: "0.5px solid rgba(234,88,12,0.4)",
                borderRadius: "8px",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "16px",
              }}>
                🔥
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{
                    fontFamily: "'Inter',sans-serif", fontSize: "10px",
                    letterSpacing: "0.15em", textTransform: "uppercase",
                    color: "rgba(234,88,12,0.9)", fontWeight: 600,
                  }}>
                    Alerta de incendio encontrada
                  </span>
                  <span style={{
                    fontFamily: "'Inter',sans-serif", fontSize: "10px",
                    background: "rgba(74,222,128,0.12)",
                    border: "0.5px solid rgba(74,222,128,0.3)",
                    color: "rgba(74,222,128,0.8)",
                    padding: "2px 8px", borderRadius: "20px",
                    letterSpacing: "0.1em",
                  }}>
                    ✓ IA verificada
                  </span>
                </div>
              </div>
              {/* dot pulsante */}
              <div style={{
                width: "8px", height: "8px",
                background: "#f97316",
                borderRadius: "50%",
                boxShadow: "0 0 8px rgba(249,115,22,0.8)",
              }} />
            </div>

            {/* título */}
            <p style={{
              fontFamily: "'Syne',sans-serif", fontWeight: 800,
              fontSize: "20px", color: "rgba(240,234,216,0.92)",
              margin: "0 0 14px",
              borderBottom: "0.5px solid rgba(74,222,128,0.1)",
              paddingBottom: "14px",
            }}>
              El Bolsón — Cajón del Azul
            </p>

            {/* datos */}
            <div style={{
              display: "flex", gap: "24px", flexWrap: "wrap",
            }}>
              {[
                { icon: "📍", label: "-41.9712, -71.5368" },
                { icon: "🔥", label: "Intensidad: Alta" },
                { icon: "📐", label: "Área: 2,3 ha" },
                { icon: "💨", label: "NE 18 km/h" },
              ].map((d) => (
                <div key={d.label} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ fontSize: "12px" }}>{d.icon}</span>
                  <span style={{
                    fontFamily: "'Inter',sans-serif", fontSize: "12px",
                    fontWeight: 400, color: "rgba(74,222,128,0.7)",
                  }}>
                    {d.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Apoyo strip ── */}
        <div style={{ ...vis(750), borderTop: "0.5px solid rgba(240,234,216,0.06)", paddingTop: "40px" }}>
          <p style={{
            fontFamily: "'Inter',sans-serif", fontSize: "11px",
            letterSpacing: "0.3em", textTransform: "uppercase",
            color: "rgba(240,234,216,0.18)", marginBottom: "20px",
          }}>
            Apoyo
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {supporters.map((name, i) => (
              <div
                key={name}
                style={{
                  background: "rgba(74,222,128,0.04)",
                  border: "0.5px solid rgba(74,222,128,0.1)",
                  padding: "7px 14px",
                  borderRadius: "6px",
                  fontFamily: "'Inter',sans-serif",
                  fontSize: "11px",
                  fontWeight: 300,
                  color: "rgba(240,234,216,0.35)",
                  opacity: isVisible ? 1 : 0,
                  transition: `opacity 400ms ${780 + i * 25}ms`,
                }}
              >
                {name}
              </div>
            ))}
          </div>
        </div>

        {/* ── Fotos ── */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: "12px", marginTop: "48px",
          ...vis(850),
        }}>
          {[
            {
              src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ccc-gALQ3KWjawlF9rnPDmzFmx33ahTdAz.png",
              alt: "Logros Sentinel",
              label: null,
            },
            {
              src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AGRADECIMIENTOS.png-5OTA6U7D0gfG9BTAJJXyKQwQIhtxO1.jpeg",
              alt: "Prendete & Premios Sadosky",
              label: "Prendete & Premios Sadosky",
            },
          ].map((photo) => (
            <div
              key={photo.src}
              style={{
                position: "relative", overflow: "hidden",
                borderRadius: "10px", aspectRatio: "16/9",
                border: "0.5px solid rgba(74,222,128,0.1)",
              }}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to top, rgba(12,11,9,0.65), transparent)",
              }} />
              {photo.label && (
                <p style={{
                  position: "absolute", bottom: "14px", left: "18px",
                  fontFamily: "'Inter',sans-serif", fontSize: "11px",
                  letterSpacing: "0.15em", textTransform: "uppercase",
                  color: "rgba(240,234,216,0.5)", margin: 0,
                }}>
                  {photo.label}
                </p>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
