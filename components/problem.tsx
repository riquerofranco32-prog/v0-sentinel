"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight } from "lucide-react"

export function Problem() {
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
    `transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`

  return (
    <section ref={sectionRef} className="relative bg-[#0c0b09]">

      {/* Hero image */}
      <div className="relative h-[65vh] min-h-[480px] overflow-hidden">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/267-OTOcu9EUVLZS8Z5p5N46egBZitm0qj.jpg"
          alt="Bomberos enfrentando incendio forestal en la Patagonia"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0b09] via-[#0c0b09]/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-8 md:px-16 pb-12">
          <p
            className={`text-[11px] tracking-[0.3em] uppercase mb-4 transition-all duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}
            style={{ fontFamily: "'Inter', sans-serif", color: "rgba(240,234,216,0.3)" }}
          >
            Emergencia nacional
          </p>
          <h2
            className={`text-4xl sm:text-5xl lg:text-6xl leading-none ${fadeIn()}`}
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              color: "rgba(240,234,216,0.92)",
            }}
          >
            Hoy la Patagonia duele.
          </h2>
        </div>
      </div>

      {/* Block 1 — El problema */}
      <div className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* Left */}
            <div>
              <p
                className={`text-lg leading-relaxed mb-10 ${fadeIn(100)}`}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 300,
                  color: "rgba(240,234,216,0.55)",
                }}
              >
                No es solo bosque lo que se quema. Es el futuro de nuestras economías.{" "}
                <span style={{ color: "#f03c3c", fontWeight: 400 }}>
                  Más de 1 millón de hectáreas perdidas en Corrientes.
                </span>{" "}
                Bosques milenarios desapareciendo en la Patagonia. No son solo árboles: son
                hogares, biodiversidad única y el futuro económico de nuestras provincias.
              </p>

              {/* Stats — rediseñados con rojo */}
              <div className={`grid grid-cols-3 gap-4 ${fadeIn(200)}`}>
                {[
                  { value: "1M+", label: "Hectáreas quemadas" },
                  { value: "95%", label: "Causa humana" },
                  { value: "∞", label: "Daño a fauna" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    style={{
                      background: "rgba(220,30,30,0.07)",
                      border: "0.5px solid rgba(220,30,30,0.25)",
                      borderRadius: "6px",
                      padding: "20px 16px",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    {/* Barra lateral roja */}
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "3px",
                        height: "100%",
                        background: "#dc1e1e",
                      }}
                    />
                    <div
                      style={{
                        fontFamily: "'Syne', sans-serif",
                        fontWeight: 800,
                        fontSize: "clamp(28px, 4vw, 40px)",
                        lineHeight: 1,
                        color: "#f03c3c",
                        letterSpacing: "-1px",
                        marginBottom: "6px",
                      }}
                    >
                      {stat.value}
                    </div>
                    <div
                      style={{
                        fontSize: "11px",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 300,
                        color: "rgba(240,234,216,0.35)",
                      }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Barras de progreso */}
              <div className={`mt-8 space-y-4 ${fadeIn(250)}`}>
                {[
                  { label: "Superficie afectada", value: "1.000.000 ha", pct: 100 },
                  { label: "Causa humana", value: "95%", pct: 95 },
                  { label: "Fauna afectada irreversiblemente", value: "100%", pct: 100 },
                ].map((bar) => (
                  <div key={bar.label}>
                    <div className="flex justify-between mb-1">
                      <span
                        style={{
                          fontSize: "11px",
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          fontFamily: "'Inter', sans-serif",
                          color: "rgba(240,234,216,0.3)",
                        }}
                      >
                        {bar.label}
                      </span>
                      <span
                        style={{
                          fontSize: "11px",
                          fontFamily: "'Inter', sans-serif",
                          fontWeight: 500,
                          color: "rgba(240,234,216,0.55)",
                        }}
                      >
                        {bar.value}
                      </span>
                    </div>
                    <div
                      style={{
                        background: "rgba(240,234,216,0.06)",
                        borderRadius: "2px",
                        height: "3px",
                        width: "100%",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: `${bar.pct}%`,
                          background: "#dc1e1e",
                          borderRadius: "2px",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Problem list — dots rojos */}
              <div className={`mt-12 space-y-0 ${fadeIn(300)}`}>
                {[
                  { title: "Pulmón verde en riesgo", body: "Bosques nativos que tardan décadas en regenerarse se pierden en horas." },
                  { title: "Comunidades amenazadas", body: "Familias enteras pierden sus hogares y su sustento económico." },
                  { title: "Respuesta insuficiente", body: "Los brigadistas arriesgan su vida con recursos limitados." },
                ].map((item, i) => (
                  <div
                    key={item.title}
                    className="flex gap-4 items-start py-4"
                    style={{
                      borderBottom: i < 2 ? "0.5px solid rgba(240,234,216,0.06)" : "none",
                    }}
                  >
                    {/* Dot rojo con glow */}
                    <div
                      style={{
                        width: "8px",
                        height: "8px",
                        background: "#dc1e1e",
                        borderRadius: "50%",
                        marginTop: "5px",
                        flexShrink: 0,
                        boxShadow: "0 0 8px rgba(220,30,30,0.6)",
                      }}
                    />
                    <div>
                      <p
                        style={{
                          fontSize: "13px",
                          fontFamily: "'Inter', sans-serif",
                          fontWeight: 500,
                          color: "rgba(240,234,216,0.75)",
                          marginBottom: "3px",
                        }}
                      >
                        {item.title}
                      </p>
                      <p
                        style={{
                          fontSize: "13px",
                          fontFamily: "'Inter', sans-serif",
                          fontWeight: 300,
                          color: "rgba(240,234,216,0.35)",
                          lineHeight: 1.5,
                        }}
                      >
                        {item.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — image grid */}
            <div className={`grid grid-cols-2 gap-3 ${fadeIn(400)}`}>
              {[
                "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/a2-sCSrBbHtMQFzFqp4eBBIvUs8dgnrEh.jpg",
                "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/a-ctE13dVLBzJmNQfjnPbHhp9EhxtVRw.jpg",
                "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/a3-oiXPvEaaqCu4FDqlu6UlcDIRhaaex6.jpg",
                "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/a1-dL77IHIBwasbZgslhBmZWAQ2XQHJdk.jpg",
              ].map((src, i) => (
                <div key={i} className="relative overflow-hidden aspect-[4/5]" style={{ borderRadius: "4px" }}>
                  <img src={src} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Block 2 — Lo irrecuperable */}
      <div className="py-24 lg:py-32 border-t" style={{ borderColor: "rgba(240,234,216,0.06)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <p
            className={`text-[11px] tracking-[0.3em] uppercase mb-8 ${fadeIn()}`}
            style={{ fontFamily: "'Inter', sans-serif", color: "rgba(240,234,216,0.3)" }}
          >
            Impacto económico
          </p>
          <h3
            className={`text-3xl sm:text-4xl lg:text-5xl mb-16 ${fadeIn(100)}`}
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              color: "rgba(240,234,216,0.92)",
            }}
          >
            Lo irrecuperable
          </h3>

          <div className="space-y-0">
            {[
              {
                tag: "Valor pre-incendio",
                label: "Una chacra en Puerto Patriada cotiza entre",
                value: "$47,000 – $130,000 USD",
                sub: "por hectárea",
                red: false,
                badge: null,
              },
              {
                tag: "Valor post-incendio",
                label: "El valor cae entre un",
                value: "–40% / –60%",
                sub: "USD $18,000 – $40,000 / ha",
                red: true,
                badge: "Caída patrimonial crítica",
              },
              {
                tag: "La cuenta",
                label: "La quema de 100 hectáreas significa una pérdida patrimonial de",
                value: "$5,000,000 USD",
                sub: "25% del presupuesto nacional de manejo del fuego",
                red: true,
                badge: "Equivale al presupuesto anual del SNMF",
              },
            ].map((item, i) => (
              <div
                key={item.tag}
                className={`py-10 border-b ${fadeIn(i * 100)}`}
                style={{ borderColor: "rgba(240,234,216,0.06)" }}
              >
                <p
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    fontFamily: "'Inter', sans-serif",
                    color: item.red ? "#f03c3c" : "rgba(240,234,216,0.25)",
                    marginBottom: "6px",
                  }}
                >
                  {item.tag}
                </p>
                <p
                  style={{
                    fontSize: "13px",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 300,
                    color: "rgba(240,234,216,0.4)",
                    marginBottom: "8px",
                  }}
                >
                  {item.label}
                </p>
                <p
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 800,
                    fontSize: "clamp(32px, 5vw, 56px)",
                    lineHeight: 1,
                    letterSpacing: "-2px",
                    color: item.red ? "#f03c3c" : "rgba(240,234,216,0.88)",
                  }}
                >
                  {item.value}
                </p>
                <p
                  style={{
                    fontSize: "12px",
                    marginTop: "8px",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 300,
                    color: "rgba(240,234,216,0.3)",
                  }}
                >
                  {item.sub}
                </p>
                {item.badge && (
                  <span
                    style={{
                      display: "inline-block",
                      marginTop: "12px",
                      fontSize: "10px",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      background: "rgba(220,30,30,0.12)",
                      border: "0.5px solid rgba(220,30,30,0.3)",
                      color: "#f06060",
                      padding: "3px 10px",
                      borderRadius: "3px",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Block 3 — Presupuesto */}
      <div className="py-24 lg:py-32 border-t" style={{ borderColor: "rgba(240,234,216,0.06)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <p
            className={`text-[11px] tracking-[0.3em] uppercase mb-8 ${fadeIn()}`}
            style={{ fontFamily: "'Inter', sans-serif", color: "rgba(240,234,216,0.3)" }}
          >
            Estado de situación
          </p>
          <h3
            className={`text-3xl sm:text-4xl mb-14 ${fadeIn(100)}`}
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              color: "rgba(240,234,216,0.92)",
            }}
          >
            La prevención en números rojos
          </h3>

          <div className={`grid md:grid-cols-3 gap-px ${fadeIn(200)}`} style={{ background: "rgba(240,234,216,0.06)" }}>
            {[
              {
                num: "–78%",
                tag: "Recorte del presupuesto",
                body: "El presupuesto 2026 del Servicio Nacional de Manejo del Fuego se redujo drásticamente en términos reales.",
              },
              {
                num: "25%",
                tag: "Dinero sin usar",
                body: "En 2025, el 25% del presupuesto asignado no se ejecutó. La plata estaba, pero no se usó.",
              },
              {
                num: "$20.131M",
                tag: "Presupuesto 2026",
                body: "El SNMF opera con pesos insuficientes para la escala real del problema.",
              },
            ].map((item) => (
              <div
                key={item.tag}
                className="p-8"
                style={{ background: "#0c0b09" }}
              >
                {/* Número grande en rojo */}
                <p
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 800,
                    fontSize: "32px",
                    color: "#f03c3c",
                    letterSpacing: "-1px",
                    lineHeight: 1,
                    marginBottom: "8px",
                  }}
                >
                  {item.num}
                </p>
                <p
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    fontFamily: "'Inter', sans-serif",
                    color: "rgba(240,234,216,0.25)",
                    marginBottom: "12px",
                  }}
                >
                  {item.tag}
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 300,
                    color: "rgba(240,234,216,0.5)",
                    lineHeight: 1.6,
                  }}
                >
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA transition */}
      <div
        className="py-20 border-t border-b"
        style={{ borderColor: "rgba(240,234,216,0.06)" }}
      >
        <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center">
          <h3
            className={`text-3xl sm:text-4xl lg:text-5xl mb-4 ${fadeIn()}`}
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              color: "rgba(240,234,216,0.92)",
            }}
          >
            La solución existe.
          </h3>
          <p
            className={`text-[15px] mb-10 ${fadeIn(100)}`}
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, color: "rgba(240,234,216,0.4)" }}
          >
            Detectar antes de que sea demasiado tarde.
          </p>
          <a
            href="#servicios"
            className={`inline-flex items-center gap-2 px-8 py-3 text-[13px] font-medium rounded-sm transition-all ${fadeIn(200)}`}
            style={{
              fontFamily: "'Inter', sans-serif",
              background: "rgba(240,234,216,0.08)",
              border: "0.5px solid rgba(240,234,216,0.2)",
              color: "rgba(240,234,216,0.85)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(240,234,216,0.13)"
              e.currentTarget.style.borderColor = "rgba(240,234,216,0.4)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(240,234,216,0.08)"
              e.currentTarget.style.borderColor = "rgba(240,234,216,0.2)"
            }}
          >
            Ver cómo funciona
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  )
}
