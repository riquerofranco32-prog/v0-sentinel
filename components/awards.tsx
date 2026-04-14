"use client"

import { useEffect, useRef, useState } from "react"

const logros = [
  { bold: "Ganadores", rest: "Premios ILAN 2025 — viaje a Israel." },
  { bold: "Ganadores", rest: "JIJE 20 años — Universidad Nacional del Litoral." },
  { bold: "Ganadores", rest: "Premios Sadosky 2025 — CESSI." },
  { bold: "Ganadores", rest: "Usina Emprendedores — CAC." },
  { bold: "Ganadores", rest: "Prendete Pitch Day — CICE SV." },
  { bold: "Seleccionados", rest: "Softlanding en Europa por Piensas.xyz." },
  { bold: "Inversión", rest: "3.000 USD — Gobierno de Mendoza." },
  { bold: "Seleccionados", rest: "Emprelatam y Draper House Americas." },
  { bold: "Finalistas", rest: "Impact Startup Competition Perú 2026 — Scale." },
]

export function Awards() {
  const [isVisible, setIsVisible] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
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
      className="relative overflow-hidden"
      style={{ background: "#0c0b09" }}
    >
      {/* ── Foto de fondo completa ── */}
      <div className="relative w-full overflow-hidden" style={{ height: "clamp(260px, 40vw, 520px)" }}>
        <img
          src="/logros.png"
          alt="Sentinel Technologies en competencias y eventos"
          className="w-full h-full object-cover transition-transform duration-[8000ms] ease-out"
          style={{
            objectPosition: "center 30%",
            transform: imageLoaded ? "scale(1.0)" : "scale(1.06)",
            filter: "grayscale(20%) brightness(0.75)",
          }}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
        />

        {/* Gradientes sobre la foto */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(12,11,9,0.3) 0%, transparent 40%, rgba(12,11,9,0.7) 80%, #0c0b09 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(12,11,9,0.5) 0%, transparent 50%, rgba(12,11,9,0.5) 100%)",
          }}
        />

        {/* Label flotante sobre la foto */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(12px)",
            transition: "all 800ms 100ms",
          }}
        >
          <p
            style={{
              fontFamily: "'Jura', sans-serif",
              fontSize: "10px",
              fontWeight: 600,
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "#94f1be",
              marginBottom: "10px",
            }}
          >
            Reconocimientos
          </p>
          <h2
            style={{
              fontFamily: "'Jura', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              color: "rgba(240,234,216,0.95)",
              lineHeight: 1.1,
              textShadow: "0 2px 32px rgba(0,0,0,0.6)",
            }}
          >
            Nuestros logros.
          </h2>
        </div>
      </div>

      {/* ── Lista de logros ── */}
      <div
        className="relative mx-auto px-6"
        style={{ maxWidth: "880px", paddingTop: "48px", paddingBottom: "88px" }}
      >
        {/* Línea de tiempo vertical */}
        <div
          className="absolute left-6 md:left-1/2 top-0 bottom-0"
          style={{
            width: "0.5px",
            background: "linear-gradient(to bottom, rgba(148,241,190,0.4) 0%, rgba(148,241,190,0.05) 100%)",
            transform: "translateX(-50%)",
            pointerEvents: "none",
          }}
        />

        <div className="flex flex-col gap-0">
          {logros.map((l, i) => {
            const isEven = i % 2 === 0
            return (
              <div
                key={i}
                className="relative flex items-center gap-0"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible
                    ? "translateY(0)"
                    : `translateY(16px)`,
                  transition: `opacity 600ms ${200 + i * 70}ms, transform 600ms ${200 + i * 70}ms`,
                  justifyContent: "center",
                }}
              >
                {/* ── Desktop: alternating layout ── */}
                <div className="hidden md:grid w-full" style={{ gridTemplateColumns: "1fr 48px 1fr" }}>

                  {/* Left */}
                  <div
                    className="flex justify-end pr-6 py-4"
                    style={{ opacity: isEven ? 1 : 0.15, pointerEvents: isEven ? "auto" : "none" }}
                  >
                    {isEven && (
                      <LogroCard bold={l.bold} rest={l.rest} align="right" index={i} />
                    )}
                  </div>

                  {/* Center dot */}
                  <div className="flex items-center justify-center relative">
                    <div
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: isVisible ? "#94f1be" : "rgba(148,241,190,0.2)",
                        border: "0.5px solid rgba(148,241,190,0.5)",
                        boxShadow: isVisible ? "0 0 12px rgba(148,241,190,0.4)" : "none",
                        transition: `all 400ms ${300 + i * 70}ms`,
                        flexShrink: 0,
                      }}
                    />
                  </div>

                  {/* Right */}
                  <div
                    className="flex justify-start pl-6 py-4"
                    style={{ opacity: !isEven ? 1 : 0.15, pointerEvents: !isEven ? "auto" : "none" }}
                  >
                    {!isEven && (
                      <LogroCard bold={l.bold} rest={l.rest} align="left" index={i} />
                    )}
                  </div>
                </div>

                {/* ── Mobile: single column ── */}
                <div className="flex md:hidden items-start gap-4 w-full py-3 pl-8">
                  <div
                    className="absolute left-6 top-1/2 -translate-y-1/2"
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "#94f1be",
                      border: "0.5px solid rgba(148,241,190,0.5)",
                      flexShrink: 0,
                    }}
                  />
                  <div>
                    <span
                      style={{
                        fontFamily: "'Jura', sans-serif",
                        fontWeight: 700,
                        fontSize: "13px",
                        color: "rgba(240,234,216,0.95)",
                        display: "block",
                      }}
                    >
                      {l.bold}
                    </span>
                    <span
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: 300,
                        fontSize: "13px",
                        color: "rgba(240,234,216,0.5)",
                        lineHeight: 1.5,
                      }}
                    >
                      {l.rest}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom counter */}
        <div
          className="flex justify-center gap-12 mt-16 pt-12"
          style={{
            borderTop: "0.5px solid rgba(240,234,216,0.07)",
            opacity: isVisible ? 1 : 0,
            transition: "opacity 800ms 900ms",
          }}
        >
          {[
            { num: "9", label: "reconocimientos" },
            { num: "3", label: "países" },
            { num: "2025–26", label: "temporada" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div
                style={{
                  fontFamily: "'Jura', sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                  color: "rgba(240,234,216,0.92)",
                  lineHeight: 1,
                }}
              >
                {s.num}
              </div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "11px",
                  fontWeight: 300,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "rgba(240,234,216,0.35)",
                  marginTop: "6px",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Subcomponente tarjeta ──────────────────────────────────────────────────────
function LogroCard({
  bold,
  rest,
  align,
  index,
}: {
  bold: string
  rest: string
  align: "left" | "right"
  index: number
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="max-w-xs"
      style={{
        padding: "12px 16px",
        border: `0.5px solid ${hovered ? "rgba(148,241,190,0.2)" : "rgba(240,234,216,0.06)"}`,
        borderRadius: "2px",
        background: hovered ? "rgba(148,241,190,0.03)" : "transparent",
        transition: "all 0.25s ease",
        textAlign: align,
        cursor: "default",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        style={{
          fontFamily: "'Jura', sans-serif",
          fontWeight: 700,
          fontSize: "14px",
          color: hovered ? "#94f1be" : "rgba(240,234,216,0.9)",
          display: "block",
          transition: "color 0.25s",
          lineHeight: 1.3,
        }}
      >
        {bold}
      </span>
      <span
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 300,
          fontSize: "13px",
          color: "rgba(240,234,216,0.5)",
          lineHeight: 1.5,
          display: "block",
          marginTop: "2px",
        }}
      >
        {rest}
      </span>
    </div>
  )
}
