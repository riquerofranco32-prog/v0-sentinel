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
      <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <img
          src="/a3.jpg"
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

      {/* Contenido */}
      <div className="py-20 lg:py-28">
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

              {/* Stats */}
              <div className={`grid grid-cols-3 gap-4 mb-12 ${fadeIn(200)}`}>
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
                    <div style={{
                      position: "absolute", top: 0, left: 0,
                      width: "3px", height: "100%", background: "#dc1e1e",
                    }} />
                    <div style={{
                      fontFamily: "'Syne', sans-serif",
                      fontWeight: 800,
                      fontSize: "clamp(28px, 4vw, 40px)",
                      lineHeight: 1,
                      color: "#f03c3c",
                      letterSpacing: "-1px",
                      marginBottom: "6px",
                    }}>
                      {stat.value}
                    </div>
                    <div style={{
                      fontSize: "11px",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 300,
                      color: "rgba(240,234,216,0.35)",
                    }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Problem list */}
              <div className={`space-y-0 ${fadeIn(300)}`}>
                {[
                  { title: "Pulmón verde en riesgo", body: "Bosques nativos que tardan décadas en regenerarse se pierden en horas." },
                  { title: "Comunidades amenazadas", body: "Familias enteras pierden sus hogares y su sustento económico." },
                  { title: "Respuesta insuficiente", body: "Los brigadistas arriesgan su vida con recursos limitados." },
                ].map((item, i) => (
                  <div
                    key={item.title}
                    className="flex gap-4 items-start py-4"
                    style={{ borderBottom: i < 2 ? "0.5px solid rgba(240,234,216,0.06)" : "none" }}
                  >
                    <div style={{
                      width: "8px", height: "8px",
                      background: "#dc1e1e", borderRadius: "50%",
                      marginTop: "5px", flexShrink: 0,
                      boxShadow: "0 0 8px rgba(220,30,30,0.6)",
                    }} />
                    <div>
                      <p style={{
                        fontSize: "13px", fontFamily: "'Inter', sans-serif",
                        fontWeight: 500, color: "rgba(240,234,216,0.75)", marginBottom: "3px",
                      }}>
                        {item.title}
                      </p>
                      <p style={{
                        fontSize: "13px", fontFamily: "'Inter', sans-serif",
                        fontWeight: 300, color: "rgba(240,234,216,0.35)", lineHeight: 1.5,
                      }}>
                        {item.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className={`mt-12 ${fadeIn(400)}`}>
                <a
                  href="#servicios"
                  className="inline-flex items-center gap-2 px-8 py-3 text-[13px] font-medium rounded-sm transition-all"
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
                  Ver cómo lo resolvemos
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
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
    </section>
  )
}
