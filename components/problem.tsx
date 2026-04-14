"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight } from "lucide-react"

function useCountUp(target: number, isVisible: boolean, duration = 1400) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!isVisible) return
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [isVisible, target, duration])
  return count
}

export function Problem() {
  const [isVisible, setIsVisible] = useState(false)
  const [fireIntensity, setFireIntensity] = useState(0)
  const [emberPositions] = useState(() =>
    Array.from({ length: 12 }, (_, i) => ({
      left: 5 + Math.random() * 90,
      delay: Math.random() * 3,
      duration: 2.5 + Math.random() * 2,
      size: 2 + Math.random() * 3,
    }))
  )
  const sectionRef = useRef<HTMLElement>(null)

  const hectareas = useCountUp(1000000, isVisible, 2000)
  const causa = useCountUp(95, isVisible, 1200)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.05 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // Fire intensity oscillation
  useEffect(() => {
    if (!isVisible) return
    const timer = setInterval(() => {
      setFireIntensity(Math.sin(Date.now() / 600) * 0.3 + 0.7)
    }, 50)
    return () => clearInterval(timer)
  }, [isVisible])

  return (
    <section ref={sectionRef} className="relative bg-[#0c0b09]">

      {/* Hero image */}
      <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <img
          src="/a3.jpg"
          alt="Bomberos enfrentando incendio forestal en la Patagonia"
          className="w-full h-full object-cover transition-transform duration-[3000ms]"
          style={{ transform: isVisible ? "scale(1.04)" : "scale(1)" }}
        />

        {/* Fire color overlay pulsing */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 50% 80%, rgba(220,50,20,${0.25 * fireIntensity}) 0%, transparent 70%)`,
            transition: "none",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0b09] via-[#0c0b09]/40 to-transparent" />

        {/* Ember particles */}
        {isVisible && emberPositions.map((e, i) => (
          <div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: `${e.left}%`,
              bottom: "0",
              width: `${e.size}px`,
              height: `${e.size}px`,
              background: i % 3 === 0 ? "#fb923c" : i % 3 === 1 ? "#f03c3c" : "#fbbf24",
              boxShadow: `0 0 ${e.size * 2}px ${i % 2 === 0 ? "#fb923c" : "#f03c3c"}`,
              animation: `emberRise ${e.duration}s ${e.delay}s ease-in infinite`,
            }}
          />
        ))}

        <div className="absolute bottom-0 left-0 right-0 px-8 md:px-16 pb-12">
          <p
            className="text-[11px] tracking-[0.3em] uppercase mb-4 transition-all duration-700"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: "rgba(240,234,216,0.3)",
              opacity: isVisible ? 1 : 0,
            }}
          >
            Emergencia nacional
          </p>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl leading-none transition-all duration-700"
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              color: "rgba(240,234,216,0.92)",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(16px)",
              transitionDelay: "100ms",
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
                className="text-lg leading-relaxed mb-10 transition-all duration-700"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 300,
                  color: "rgba(240,234,216,0.55)",
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(16px)",
                  transitionDelay: "150ms",
                }}
              >
                No es solo bosque lo que se quema. Es el futuro de nuestras economías.{" "}
                <span style={{ color: "#f03c3c", fontWeight: 400 }}>
                  Más de 1 millón de hectáreas perdidas en Corrientes.
                </span>{" "}
                Bosques milenarios desapareciendo en la Patagonia. No son solo árboles: son
                hogares, biodiversidad única y el futuro económico de nuestras provincias.
              </p>

              {/* Stats with counters */}
              <div
                className="grid grid-cols-3 gap-4 mb-12 transition-all duration-700"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(16px)",
                  transitionDelay: "250ms",
                }}
              >
                {[
                  {
                    display: hectareas >= 1000000 ? "1M+" : hectareas >= 1000 ? `${Math.floor(hectareas / 1000)}K` : String(hectareas),
                    label: "Hectáreas quemadas",
                  },
                  {
                    display: `${causa}%`,
                    label: "Causa humana",
                  },
                  {
                    display: "∞",
                    label: "Daño a fauna",
                  },
                ].map((stat, i) => (
                  <div
                    key={stat.label}
                    className="relative overflow-hidden group"
                    style={{
                      background: "rgba(220,30,30,0.07)",
                      border: "0.5px solid rgba(220,30,30,0.25)",
                      borderRadius: "6px",
                      padding: "20px 16px",
                      transition: "border-color 0.3s, background 0.3s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "rgba(240,60,60,0.6)"
                      e.currentTarget.style.background = "rgba(220,30,30,0.12)"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(220,30,30,0.25)"
                      e.currentTarget.style.background = "rgba(220,30,30,0.07)"
                    }}
                  >
                    {/* Left accent bar */}
                    <div style={{
                      position: "absolute", top: 0, left: 0,
                      width: "3px", height: "100%",
                      background: "linear-gradient(to bottom, #dc1e1e, #fb923c)",
                    }} />
                    {/* Hover shimmer */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ background: "linear-gradient(135deg, rgba(240,60,60,0.06), transparent)" }}
                    />
                    <div style={{
                      fontFamily: "'Syne', sans-serif",
                      fontWeight: 800,
                      fontSize: "clamp(26px, 4vw, 38px)",
                      lineHeight: 1,
                      color: "#f03c3c",
                      letterSpacing: "-1px",
                      marginBottom: "6px",
                    }}>
                      {stat.display}
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
              <div
                className="space-y-0 transition-all duration-700"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(16px)",
                  transitionDelay: "350ms",
                }}
              >
                {[
                  { title: "Pulmón verde en riesgo", body: "Bosques nativos que tardan décadas en regenerarse se pierden en horas." },
                  { title: "Comunidades amenazadas", body: "Familias enteras pierden sus hogares y su sustento económico." },
                  { title: "Respuesta insuficiente", body: "Los brigadistas arriesgan su vida con recursos limitados." },
                ].map((item, i) => (
                  <div
                    key={item.title}
                    className="flex gap-4 items-start py-4 group transition-all duration-300"
                    style={{
                      borderBottom: i < 2 ? "0.5px solid rgba(240,234,216,0.06)" : "none",
                    }}
                  >
                    <div
                      style={{
                        width: "8px", height: "8px",
                        background: "#dc1e1e", borderRadius: "50%",
                        marginTop: "5px", flexShrink: 0,
                        boxShadow: "0 0 8px rgba(220,30,30,0.6)",
                        animation: `problemDot ${1.8 + i * 0.4}s ease-in-out infinite`,
                        animationDelay: `${i * 0.3}s`,
                      }}
                    />
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
              <div
                className="mt-12 transition-all duration-700"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(16px)",
                  transitionDelay: "450ms",
                }}
              >
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
            <div
              className="grid grid-cols-2 gap-3 transition-all duration-700"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(24px)",
                transitionDelay: "400ms",
              }}
            >
              {[
                "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/a2-sCSrBbHtMQFzFqp4eBBIvUs8dgnrEh.jpg",
                "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/a-ctE13dVLBzJmNQfjnPbHhp9EhxtVRw.jpg",
                "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/a3-oiXPvEaaqCu4FDqlu6UlcDIRhaaex6.jpg",
                "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/a1-dL77IHIBwasbZgslhBmZWAQ2XQHJdk.jpg",
              ].map((src, i) => (
                <div
                  key={i}
                  className="relative overflow-hidden aspect-[4/5] group cursor-pointer transition-all duration-700"
                  style={{
                    borderRadius: "4px",
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.97)",
                    transitionDelay: `${450 + i * 80}ms`,
                  }}
                >
                  <img
                    src={src}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  {/* Red tint on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: "rgba(220,30,30,0.15)" }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes emberRise {
          0%   { transform: translateY(0) translateX(0) scale(1); opacity: 0; }
          10%  { opacity: 1; }
          80%  { opacity: 0.6; }
          100% { transform: translateY(-120px) translateX(${Math.random() > 0.5 ? "" : "-"}${20 + Math.random() * 30}px) scale(0.2); opacity: 0; }
        }
        @keyframes problemDot {
          0%, 100% { box-shadow: 0 0 6px rgba(220,30,30,0.5); transform: scale(1); }
          50%       { box-shadow: 0 0 14px rgba(240,60,60,0.9); transform: scale(1.4); }
        }
      `}</style>
    </section>
  )
}
