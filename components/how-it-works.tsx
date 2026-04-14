"use client"

import { useEffect, useRef, useState } from "react"
import { Search, Bell, Zap, MapPin, Wind, Flame, CheckCircle } from "lucide-react"

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Identificación",
    description: "Drones + satélites capturan datos térmicos y visuales en tiempo real sobre el territorio.",
    accent: "#4ade80",
    accentBg: "rgba(74,222,128,0.08)",
    accentBorder: "rgba(74,222,128,0.2)",
  },
  {
    icon: Bell,
    number: "02",
    title: "Aviso",
    description: "IA analiza y genera alertas geoespaciales verificadas con coordenadas precisas.",
    accent: "#fb923c",
    accentBg: "rgba(251,146,60,0.08)",
    accentBorder: "rgba(251,146,60,0.2)",
  },
  {
    icon: Zap,
    number: "03",
    title: "Acción",
    description: "Equipos reciben notificaciones automáticas y responden 60% más rápido.",
    accent: "#4ade80",
    accentBg: "rgba(74,222,128,0.08)",
    accentBorder: "rgba(74,222,128,0.2)",
  },
]

const TYPING_TEXT = "Analizando señal térmica... incendio confirmado."

export function HowItWorks() {
  const [isVisible, setIsVisible] = useState(false)
  const [radarAngle, setRadarAngle] = useState(0)
  const [typedText, setTypedText] = useState("")
  const [typingDone, setTypingDone] = useState(false)
  const [alertVisible, setAlertVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.05 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // Radar sweep
  useEffect(() => {
    if (!isVisible) return
    const timer = setInterval(() => {
      setRadarAngle(a => (a + 1.2) % 360)
    }, 16)
    return () => clearInterval(timer)
  }, [isVisible])

  // Typing effect — starts after section is visible
  useEffect(() => {
    if (!isVisible) return
    const delay = setTimeout(() => {
      let i = 0
      const timer = setInterval(() => {
        setTypedText(TYPING_TEXT.slice(0, i + 1))
        i++
        if (i >= TYPING_TEXT.length) {
          clearInterval(timer)
          setTypingDone(true)
          setTimeout(() => setAlertVisible(true), 400)
        }
      }, 38)
      return () => clearInterval(timer)
    }, 900)
    return () => clearTimeout(delay)
  }, [isVisible])

  return (
    <section
      ref={sectionRef}
      id="servicios"
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: "#0e100d" }}
    >
      {/* Grid background */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `linear-gradient(rgba(74,222,128,1) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,1) 1px, transparent 1px)`,
        backgroundSize: "80px 80px",
      }} />
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse at 50% 50%, rgba(0,79,57,0.15) 0%, transparent 70%)"
      }} />

      {/* Radar in top-right corner */}
      <div
        className="absolute top-12 right-12 pointer-events-none select-none transition-opacity duration-1000"
        style={{ opacity: isVisible ? 0.15 : 0, width: 160, height: 160 }}
      >
        <svg viewBox="0 0 160 160" width="160" height="160">
          {/* Concentric circles */}
          {[40, 60, 80].map((r) => (
            <circle key={r} cx="80" cy="80" r={r} fill="none" stroke="#4ade80" strokeWidth="0.6" />
          ))}
          {/* Cross lines */}
          <line x1="80" y1="0" x2="80" y2="160" stroke="#4ade80" strokeWidth="0.5" />
          <line x1="0" y1="80" x2="160" y2="80" stroke="#4ade80" strokeWidth="0.5" />
          {/* Sweep cone */}
          <path
            d={`M 80 80 L ${80 + 80 * Math.cos((radarAngle - 90) * Math.PI / 180)} ${80 + 80 * Math.sin((radarAngle - 90) * Math.PI / 180)} A 80 80 0 0 0 ${80 + 80 * Math.cos((radarAngle - 130) * Math.PI / 180)} ${80 + 80 * Math.sin((radarAngle - 130) * Math.PI / 180)} Z`}
            fill="rgba(74,222,128,0.25)"
          />
          {/* Sweep line */}
          <line
            x1="80" y1="80"
            x2={80 + 80 * Math.cos((radarAngle - 90) * Math.PI / 180)}
            y2={80 + 80 * Math.sin((radarAngle - 90) * Math.PI / 180)}
            stroke="#4ade80" strokeWidth="1.5"
          />
          {/* Blip */}
          <circle cx="110" cy="55" r="3" fill="#4ade80" style={{ animation: "radarBlip 2s ease-in-out infinite" }} />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div className="mb-16">
          <p
            className="text-[11px] tracking-[0.3em] uppercase mb-5 transition-all duration-700"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: "rgba(240,234,216,0.3)",
              opacity: isVisible ? 1 : 0,
            }}
          >
            El proceso
          </p>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl transition-all duration-700"
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              color: "rgba(240,234,216,0.92)",
              lineHeight: 1,
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(16px)",
              transitionDelay: "100ms",
            }}
          >
            ¿Cómo lo hacemos?
          </h2>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-5 mb-14">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="relative rounded-lg p-8 group cursor-default transition-all duration-700"
              style={{
                background: step.accentBg,
                border: `0.5px solid ${step.accentBorder}`,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(24px)",
                transitionDelay: `${i * 140}ms`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = step.accent
                e.currentTarget.style.transform = "translateY(-5px)"
                e.currentTarget.style.boxShadow = `0 12px 40px ${step.accent}18`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = step.accentBorder
                e.currentTarget.style.transform = "translateY(0)"
                e.currentTarget.style.boxShadow = "none"
              }}
            >
              {/* Big number watermark */}
              <div
                className="text-7xl font-extrabold mb-6 leading-none select-none"
                style={{
                  fontFamily: "'Syne', sans-serif",
                  color: `${step.accent}14`,
                }}
              >
                {step.number}
              </div>

              {/* Animated icon */}
              <div
                className="w-11 h-11 rounded-lg flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                style={{ background: `${step.accent}20`, border: `0.5px solid ${step.accent}40` }}
              >
                <step.icon className="w-5 h-5" style={{ color: step.accent }} />
              </div>

              <h3
                className="text-lg font-bold mb-3"
                style={{ fontFamily: "'Syne', sans-serif", color: "rgba(240,234,216,0.9)" }}
              >
                {step.title}
              </h3>
              <p
                className="text-[13px] leading-relaxed"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, color: "rgba(240,234,216,0.5)" }}
              >
                {step.description}
              </p>

              {/* Bottom accent line */}
              <div
                className="absolute bottom-0 left-0 right-0 h-px rounded-b-lg"
                style={{ background: `linear-gradient(to right, transparent, ${step.accent}60, transparent)` }}
              />

              {/* Hover glow top-left */}
              <div
                className="absolute top-0 left-0 w-16 h-16 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-tl-lg"
                style={{ background: `radial-gradient(circle at 0% 0%, ${step.accent}18, transparent 70%)` }}
              />

              {/* Connector line between steps */}
              {i < 2 && (
                <div
                  className="hidden md:block absolute top-1/2 -right-3 w-5 h-px"
                  style={{ background: `linear-gradient(to right, ${step.accent}50, transparent)` }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Alert mockup with typing + reveal */}
        <div
          className="max-w-2xl mx-auto transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(24px)",
            transitionDelay: "550ms",
          }}
        >
          {/* Typing line above card */}
          <div
            className="mb-3 h-5 flex items-center gap-2"
            style={{ opacity: isVisible ? 1 : 0, transition: "opacity 0.5s 0.9s" }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: "#4ade80", animation: "sentinelPulse 1.2s ease-in-out infinite" }}
            />
            <span
              className="text-[11px] tracking-wider"
              style={{ fontFamily: "'Inter', sans-serif", color: "rgba(74,222,128,0.7)" }}
            >
              {typedText}
              {!typingDone && (
                <span style={{ animation: "blink 0.7s step-end infinite" }}>|</span>
              )}
            </span>
          </div>

          {/* Alert card */}
          <div
            className="relative rounded-lg p-6 overflow-hidden transition-all duration-500"
            style={{
              background: "linear-gradient(135deg, rgba(251,146,60,0.08) 0%, rgba(14,16,13,0.8) 100%)",
              border: "0.5px solid rgba(251,146,60,0.3)",
              opacity: alertVisible ? 1 : 0,
              transform: alertVisible ? "translateY(0)" : "translateY(10px)",
            }}
          >
            {/* Pulse dot */}
            <div className="absolute top-5 right-5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500"></span>
              </span>
            </div>

            <div className="flex items-start gap-4">
              <div
                className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{
                  background: "rgba(251,146,60,0.15)",
                  border: "0.5px solid rgba(251,146,60,0.3)",
                  animation: alertVisible ? "alertIconPulse 2s ease-in-out infinite" : "none",
                }}
              >
                <Flame className="w-5 h-5" style={{ color: "#fb923c" }} />
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span
                    className="text-[12px] font-semibold uppercase tracking-wider"
                    style={{ fontFamily: "'Inter', sans-serif", color: "#fb923c" }}
                  >
                    Alerta de incendio encontrada
                  </span>
                  <span
                    className="flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-sm"
                    style={{
                      background: "rgba(74,222,128,0.1)",
                      border: "0.5px solid rgba(74,222,128,0.3)",
                      color: "#4ade80",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    <CheckCircle className="w-3 h-3" />
                    IA verificada
                  </span>
                </div>

                <p
                  className="font-semibold mb-3"
                  style={{ fontFamily: "'Syne', sans-serif", color: "rgba(240,234,216,0.85)" }}
                >
                  El Bolsón — Cajón del Azul
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { icon: MapPin, label: "-41.9712, -71.5368", color: "#4ade80" },
                    { label: "Intensidad: Alta", color: "#fb923c" },
                    { label: "Área: 2,3 ha", color: "rgba(240,234,216,0.6)" },
                    { icon: Wind, label: "NE 18 km/h", color: "#4ade80" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-1.5 transition-all duration-300"
                      style={{
                        opacity: alertVisible ? 1 : 0,
                        transform: alertVisible ? "translateX(0)" : "translateX(-8px)",
                        transitionDelay: `${i * 80}ms`,
                      }}
                    >
                      {item.icon && <item.icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: item.color }} />}
                      <span
                        className="text-[11px]"
                        style={{ fontFamily: "'Inter', sans-serif", color: item.color, fontWeight: 300 }}
                      >
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom gradient line */}
            <div
              className="absolute bottom-0 left-0 right-0 h-px"
              style={{ background: "linear-gradient(to right, transparent, rgba(251,146,60,0.5), transparent)" }}
            />
          </div>
        </div>

      </div>

      <style>{`
        @keyframes sentinelPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(0.75); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes radarBlip {
          0%, 100% { opacity: 0.3; r: 3; }
          50% { opacity: 1; r: 5; }
        }
        @keyframes alertIconPulse {
          0%, 100% { box-shadow: 0 0 0 rgba(251,146,60,0); }
          50% { box-shadow: 0 0 16px rgba(251,146,60,0.3); }
        }
      `}</style>
    </section>
  )
}
