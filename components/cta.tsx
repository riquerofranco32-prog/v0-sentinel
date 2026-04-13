"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight } from "lucide-react"

export function CTA() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-28 lg:py-36 overflow-hidden"
      style={{ background: "#0c0b09" }}
    >
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse at 50% 100%, rgba(251,146,60,0.08) 0%, transparent 60%)"
      }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse at 50% 0%, rgba(0,79,57,0.12) 0%, transparent 60%)"
      }} />

      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none">
        <span
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: "22vw",
            color: "rgba(240,234,216,0.025)",
            letterSpacing: "0.05em",
            whiteSpace: "nowrap",
          }}
        >
          SENTINEL
        </span>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-10 text-center">
        <p
          className={`text-[11px] tracking-[0.3em] uppercase mb-8 transition-all duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}
          style={{ fontFamily: "'Inter', sans-serif", color: "rgba(240,234,216,0.3)" }}
        >
          Empezá hoy
        </p>

        <h2
          className={`text-4xl sm:text-5xl lg:text-6xl mb-6 transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            color: "rgba(240,234,216,0.92)",
            lineHeight: 1.05,
          }}
        >
          Dejá que Sentinel vigile<br />
          <span style={{ color: "#fb923c" }}>para que vos puedas actuar.</span>
        </h2>

        <p
          className={`text-[15px] mb-12 transition-all duration-700 delay-200 ${isVisible ? "opacity-100" : "opacity-0"}`}
          style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, color: "rgba(240,234,216,0.4)" }}
        >
          Drones autónomos con IA para detectar incendios antes de que sea demasiado tarde.
        </p>

        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <a
            href="https://linktr.ee/sentinelarg"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-sm text-[13px] font-semibold transition-all duration-300"
            style={{
              fontFamily: "'Inter', sans-serif",
              background: "rgba(251,146,60,0.15)",
              border: "0.5px solid rgba(251,146,60,0.4)",
              color: "#fb923c",
              letterSpacing: "0.04em",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(251,146,60,0.25)"
              e.currentTarget.style.borderColor = "rgba(251,146,60,0.7)"
              e.currentTarget.style.transform = "translateY(-2px)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(251,146,60,0.15)"
              e.currentTarget.style.borderColor = "rgba(251,146,60,0.4)"
              e.currentTarget.style.transform = "translateY(0)"
            }}
          >
            Solicitar una reunión
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href="#servicios"
            className="inline-flex items-center justify-center px-8 py-4 rounded-sm text-[13px] font-light transition-all duration-300"
            style={{
              fontFamily: "'Inter', sans-serif",
              border: "0.5px solid rgba(240,234,216,0.1)",
              color: "rgba(240,234,216,0.45)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(240,234,216,0.3)"
              e.currentTarget.style.color = "rgba(240,234,216,0.75)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(240,234,216,0.1)"
              e.currentTarget.style.color = "rgba(240,234,216,0.45)"
            }}
          >
            Ver cómo funciona
          </a>
        </div>
      </div>
    </section>
  )
}
