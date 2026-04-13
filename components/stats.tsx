"use client"

import { useEffect, useRef, useState } from "react"
import { Flame, Clock, Trees, Trophy } from "lucide-react"

const stats = [
  { icon: Flame, value: 95, suffix: "%", label: "Precisión en detección", accent: "#fb923c" },
  { icon: Clock, value: 60, suffix: "%", label: "Reducción en tiempo de respuesta", accent: "#fb923c" },
  { icon: Trees, value: 10000, suffix: " ha", label: "Cobertura por vuelo", accent: "#4ade80" },
  { icon: Trophy, value: 700, suffix: "+", label: "Propuestas superadas (BNA 2025)", accent: "#4ade80" },
]

function AnimatedCounter({ value, suffix, isVisible, accent }: {
  value: number
  suffix: string
  isVisible: boolean
  accent: string
}) {
  const [count, setCount] = useState(0)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return
    hasAnimated.current = true
    const duration = 2000
    const startTime = Date.now()
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easeOut = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(value * easeOut))
      if (progress < 1) requestAnimationFrame(animate)
      else setCount(value)
    }
    requestAnimationFrame(animate)
  }, [isVisible, value])

  return (
    <span style={{ color: accent }}>
      {count.toLocaleString("es-AR")}{suffix}
    </span>
  )
}

export function Stats() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const hasTriggered = useRef(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered.current) {
          hasTriggered.current = true
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-28 overflow-hidden"
      style={{ background: "#0a0c0a" }}
    >
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse at 50% 100%, rgba(0,79,57,0.25) 0%, transparent 65%)"
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">

        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-px"
          style={{ background: "rgba(240,234,216,0.05)" }}
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`flex flex-col items-center justify-center py-12 px-6 text-center transition-all duration-700 group ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{
                transitionDelay: `${i * 100}ms`,
                background: "#0a0c0a",
              }}
            >
              {/* Icon */}
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${stat.accent}15`, border: `0.5px solid ${stat.accent}30` }}
              >
                <stat.icon className="w-5 h-5" style={{ color: stat.accent }} />
              </div>

              {/* Number */}
              <div
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-2 tabular-nums"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  isVisible={isVisible}
                  accent={stat.accent}
                />
              </div>

              {/* Label */}
              <p
                className="text-[12px] leading-snug max-w-[140px]"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 300,
                  color: "rgba(240,234,216,0.4)",
                }}
              >
                {stat.label}
              </p>

              {/* Bottom accent */}
              <div
                className="mt-5 w-8 h-px transition-all duration-300 group-hover:w-16"
                style={{ background: stat.accent, opacity: 0.4 }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
