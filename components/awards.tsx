"use client"

import { useEffect, useRef, useState } from "react"

const logros = [
  { bold: "Ganadores",     rest: "de los Premios ILAN 2025: viaje a ISRAEL." },
  { bold: "Ganadores",     rest: "de la edición 2025 del JIJE 20 años (UNL)." },
  { bold: "Ganadores",     rest: "de los Premios SADOSKY 2025 – CESSI." },
  { bold: "Ganadores",     rest: "de los premios Usina Emprendedores – CAC." },
  { bold: "Ganadores",     rest: "del Prendete Pitch Day – CICE SV." },
  { bold: "Seleccionados", rest: "para el proceso Softlanding en Europa por Piensas.xyz.", highlight: "Piensas.xyz" },
  { bold: "Inversión",     rest: "de 3.000 USD por Gobierno de Mendoza." },
  { bold: "Seleccionados", rest: "por Emprelatam y Draper House Americas.", highlight: "Emprelatam" },
  { bold: "Finalistas",    rest: "de la Impact Startup Competition Perú 2026 by Scale.", highlight: "Impact Startup Competition" },
]

const supporters = [
  "ILAN", "Gobierno de Salta", "endeavor", "Premios Sadosky",
  "CESSI", "UTN San Rafael", "Bomberos", "Embajada Arg. en China",
  "XAG", "Incubadora UNCUYO", "UNL", "Patagonia Natural", ".UBA", "Movistar",
]

const gridBg = [
  "repeating-linear-gradient(0deg,  transparent, transparent 47px, rgba(74,222,128,0.04) 47px, rgba(74,222,128,0.04) 48px)",
  "repeating-linear-gradient(90deg, transparent, transparent 47px, rgba(74,222,128,0.04) 47px, rgba(74,222,128,0.04) 48px)",
].join(", ")

function HighlightText({ text, highlight }: { text: string; highlight?: string }) {
  if (!highlight || !text.includes(highlight)) {
    return <>{text}</>
  }
  const parts = text.split(highlight)
  return (
    <>
      {parts[0]}
      <strong style={{ color: "rgba(240,234,216,0.92)", fontWeight: 700 }}>{highlight}</strong>
      {parts[1]}
    </>
  )
}

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
      style={{
        background: `${gridBg}, #0b1610`,
        padding: "96px 0 88px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glow ambiental fondo */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 55% 55% at 78% 38%, rgba(10,55,28,0.6) 0%, transparent 68%)",
      }} />

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 48px", position: "relative" }}>

        {/* Título */}
        <h2
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(42px, 5.5vw, 72px)",
            color: "rgba(240,234,216,0.92)",
            lineHeight: 1.05,
            marginBottom: "44px",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "none" : "translateY(16px)",
            transition: "all 700ms",
          }}
        >
          Nuestros{" "}
          <em style={{ fontStyle: "italic" }}>logros.</em>
          <span style={{
            display: "block",
            width: "48px", height: "2px",
            background: "#4ade80",
            marginTop: "12px",
            opacity: 0.6,
          }} />
        </h2>

        {/* Caja de logros */}
        <div
          style={{
            background: "rgba(6,18,10,0.85)",
            border: "1px solid rgba(74,222,128,0.14)",
            borderRadius: "18px",
            padding: "36px 44px",
            marginBottom: "60px",
            position: "relative",
            overflow: "hidden",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "none" : "translateY(16px)",
            transition: "all 700ms 80ms",
          }}
        >
          {/* Glow interior derecha */}
          <div style={{
            position: "absolute", top: "-60px", right: "-60px",
            width: "320px", height: "320px", pointerEvents: "none",
            background: "radial-gradient(circle, rgba(74,222,128,0.2) 0%, transparent 62%)",
          }} />

          {logros.map((l, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "20px",
                padding: "14px 0",
                borderBottom: i < logros.length - 1
                  ? "0.5px solid rgba(74,222,128,0.07)"
                  : "none",
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "none" : "translateX(-10px)",
                transition: `all 550ms ${160 + i * 55}ms`,
              }}
            >
              {/* Asterisco estilo slide */}
              <span style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: "22px",
                color: "#4ade80",
                flexShrink: 0,
                lineHeight: 1,
                userSelect: "none",
              }}>
                ✳
              </span>

              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(14px, 1.35vw, 17px)",
                fontWeight: 300,
                color: "rgba(240,234,216,0.6)",
                margin: 0,
                lineHeight: 1.45,
              }}>
                <strong style={{ fontWeight: 700, color: "rgba(240,234,216,0.92)" }}>
                  {l.bold}
                </strong>{" "}
                <HighlightText text={l.rest} highlight={l.highlight} />
              </p>
            </div>
          ))}
        </div>

        {/* Apoyo */}
        <div style={{
          opacity: isVisible ? 1 : 0,
          transition: "opacity 700ms 680ms",
        }}>
          <p style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(26px, 3vw, 40px)",
            color: "rgba(240,234,216,0.85)",
            marginBottom: "28px",
          }}>
            Apoyo:
          </p>

          <div style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "10px 0",
          }}>
            {supporters.map((name, i) => (
              <span
                key={name}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "clamp(12px, 1.05vw, 15px)",
                  fontWeight: 400,
                  color: "rgba(240,234,216,0.48)",
                  paddingLeft: "16px",
                  paddingRight: "16px",
                  borderRight: "0.5px solid rgba(74,222,128,0.2)",
                  lineHeight: 1,
                  opacity: isVisible ? 1 : 0,
                  transition: `opacity 400ms ${700 + i * 28}ms`,
                }}
              >
                {name}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
