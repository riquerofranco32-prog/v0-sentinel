"use client"

import { useEffect, useRef, useState } from "react"

const stats = [
  { value: 8, unit: "min", label: "Detección temprana", prefix: "<" },
  { value: 98, unit: "%", label: "Precisión IA", prefix: "" },
  { value: 24, unit: "/7", label: "Monitoreo continuo", prefix: "" },
]

function useCountUp(target: number, isVisible: boolean, duration = 1200) {
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

function StatCard({ value, unit, label, prefix, isVisible, delay }: {
  value: number; unit: string; label: string; prefix: string; isVisible: boolean; delay: number
}) {
  const count = useCountUp(value, isVisible)
  return (
    <div
      className="flex flex-col items-center justify-center py-6 px-4 text-center relative overflow-hidden group"
      style={{ background: "rgba(240,234,216,0.02)" }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: "linear-gradient(135deg, rgba(74,222,128,0.05), transparent)" }}
      />
      <div
        className="text-3xl sm:text-4xl font-bold leading-none mb-1.5 transition-all duration-700"
        style={{
          fontFamily: "'Syne', sans-serif",
          color: "#4ade80",
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(10px)",
          transitionDelay: `${delay}ms`,
        }}
      >
        {prefix}{count}
        <span className="text-lg" style={{ color: "rgba(74,222,128,0.55)" }}>{unit}</span>
      </div>
      <div
        className="text-[10px] tracking-[0.2em] uppercase transition-all duration-700"
        style={{
          fontFamily: "'Inter', sans-serif",
          color: "rgba(240,234,216,0.3)",
          opacity: isVisible ? 1 : 0,
          transitionDelay: `${delay + 100}ms`,
        }}
      >
        {label}
      </div>
    </div>
  )
}

export function Features() {
  const [isVisible, setIsVisible] = useState(false)
  const [scanPos, setScanPos] = useState(0)
  const [alertPulse, setAlertPulse] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.05 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // Scan line animation
  useEffect(() => {
    if (!isVisible) return
    const timer = setInterval(() => {
      setScanPos(p => (p >= 100 ? 0 : p + 0.35))
    }, 16)
    return () => clearInterval(timer)
  }, [isVisible])

  // Alert pulse every 4s
  useEffect(() => {
    if (!isVisible) return
    const timer = setInterval(() => {
      setAlertPulse(true)
      setTimeout(() => setAlertPulse(false), 900)
    }, 4000)
    return () => clearInterval(timer)
  }, [isVisible])

  return (
    <section
      ref={sectionRef}
      id="nosotros"
      className="relative py-24 lg:py-32 bg-[#0c0b09] overflow-hidden"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
        style={{
          opacity: isVisible ? 1 : 0,
          backgroundImage: "radial-gradient(ellipse 70% 50% at 65% 55%, rgba(74,222,128,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Subtle grid lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ opacity: 0.025 }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="absolute top-0 bottom-0 w-px" style={{ left: `${(i + 1) * 12.5}%`, background: "rgba(74,222,128,1)" }} />
        ))}
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="absolute left-0 right-0 h-px" style={{ top: `${(i + 1) * 16.6}%`, background: "rgba(74,222,128,1)" }} />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* ── HEADER ── */}
        <div className="mb-16">
          <p
            className="text-[11px] tracking-[0.3em] uppercase mb-5 transition-all duration-700"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: "rgba(240,234,216,0.3)",
              opacity: isVisible ? 1 : 0,
            }}
          >
            Nuestra tecnología
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
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
              Nuestra{" "}
              <span style={{ color: "#4ade80" }}>solución.</span>
            </h2>
            <p
              className="max-w-xs text-[13px] leading-relaxed lg:pb-1 transition-all duration-700"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 300,
                color: "rgba(240,234,216,0.4)",
                opacity: isVisible ? 1 : 0,
                transitionDelay: "200ms",
              }}
            >
              Un sistema inmunitario planetario. Sentinel fusiona el IoT, los drones y los
              satélites en un único{" "}
              <span style={{ color: "rgba(240,234,216,0.75)", fontWeight: 400 }}>
                sistema nervioso impulsado por IA.
              </span>
            </p>
          </div>
        </div>

        {/* ── STATS ROW ── */}
        <div
          className="grid grid-cols-3 gap-px mb-10 transition-all duration-700"
          style={{
            border: "0.5px solid rgba(240,234,216,0.07)",
            borderRadius: "6px",
            overflow: "hidden",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(12px)",
            transitionDelay: "300ms",
          }}
        >
          {stats.map((s, i) => (
            <div key={i} style={{ borderRight: i < 2 ? "0.5px solid rgba(240,234,216,0.07)" : "none" }}>
              <StatCard {...s} isVisible={isVisible} delay={400 + i * 120} />
            </div>
          ))}
        </div>

        {/* ── MAIN GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">

          {/* Image 1 — large, 3 cols */}
          <div
            className="lg:col-span-3 relative rounded-lg overflow-hidden group cursor-pointer transition-all duration-700"
            style={{
              minHeight: "380px",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(24px)",
              transitionDelay: "500ms",
            }}
          >
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/d-0eY1XCgdCNJr5FWwE0WfHb4VdN6lFe.jpg"
              alt="Sistema Sentinel"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              style={{ minHeight: "380px" }}
            />

            {/* Scan line */}
            <div
              className="absolute left-0 right-0 pointer-events-none"
              style={{
                top: `${scanPos}%`,
                height: "2px",
                background: "linear-gradient(to right, transparent 0%, rgba(74,222,128,0.7) 30%, rgba(74,222,128,0.9) 50%, rgba(74,222,128,0.7) 70%, transparent 100%)",
                boxShadow: "0 0 16px rgba(74,222,128,0.5), 0 0 4px rgba(74,222,128,0.8)",
                opacity: isVisible ? 1 : 0,
                transition: "opacity 0.5s",
              }}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0b09]/80 via-[#0c0b09]/10 to-transparent" />

            {/* Hover tint */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: "linear-gradient(135deg, rgba(74,222,128,0.06) 0%, transparent 60%)" }}
            />

            {/* Alert border flash */}
            <div
              className="absolute inset-0 rounded-lg pointer-events-none"
              style={{
                border: "1px solid rgba(74,222,128,0.5)",
                boxShadow: "inset 0 0 40px rgba(74,222,128,0.08)",
                opacity: alertPulse ? 1 : 0,
                transition: "opacity 0.3s ease",
              }}
            />

            {/* LIVE badge */}
            <div
              className="absolute top-5 right-5 flex items-center gap-2 px-3 py-1.5 rounded-sm"
              style={{
                fontFamily: "'Inter', sans-serif",
                background: "rgba(0,0,0,0.6)",
                border: "0.5px solid rgba(74,222,128,0.4)",
                backdropFilter: "blur(8px)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  background: "#4ade80",
                  boxShadow: "0 0 6px #4ade80",
                  animation: "sentinelPulse 1.5s ease-in-out infinite",
                }}
              />
              <span className="text-[10px] tracking-widest uppercase" style={{ color: "#4ade80" }}>En vivo</span>
            </div>

            {/* Bottom */}
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
              <div
                className="px-3 py-1.5 rounded-sm text-[10px] tracking-widest uppercase"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  background: "rgba(0,79,57,0.75)",
                  border: "0.5px solid rgba(74,222,128,0.3)",
                  color: "#4ade80",
                  backdropFilter: "blur(6px)",
                }}
              >
                Sistema Sentinel
              </div>
              <div
                className="text-[10px] tracking-wider opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-3 group-hover:translate-x-0"
                style={{ fontFamily: "'Inter', sans-serif", color: "rgba(240,234,216,0.4)" }}
              >
                Detecta en minutos →
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="lg:col-span-2 flex flex-col gap-4">

            {/* Image 2 */}
            <div
              className="relative rounded-lg overflow-hidden group cursor-pointer flex-1 transition-all duration-700"
              style={{
                minHeight: "180px",
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(24px)",
                transitionDelay: "620ms",
              }}
            >
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dd-5FM9OcJbCEu1IatjOnmcjtjnVYhTem.jpg"
                alt="Cobertura integral"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                style={{ minHeight: "180px" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0b09]/75 via-transparent to-transparent" />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "rgba(74,222,128,0.05)" }}
              />
              <div className="absolute bottom-4 left-4">
                <div
                  className="px-3 py-1.5 rounded-sm text-[10px] tracking-widest uppercase"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    background: "rgba(0,79,57,0.75)",
                    border: "0.5px solid rgba(74,222,128,0.3)",
                    color: "#4ade80",
                    backdropFilter: "blur(6px)",
                  }}
                >
                  Cobertura integral
                </div>
              </div>
            </div>

            {/* Info card */}
            <div
              className="relative rounded-lg p-6 flex-1 overflow-hidden transition-all duration-700 group"
              style={{
                background: "rgba(240,234,216,0.02)",
                border: "0.5px solid rgba(240,234,216,0.07)",
                minHeight: "160px",
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(24px)",
                transitionDelay: "740ms",
              }}
            >
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-6 h-6 pointer-events-none" style={{ borderTop: "1px solid rgba(74,222,128,0.4)", borderLeft: "1px solid rgba(74,222,128,0.4)" }} />
              <div className="absolute bottom-0 right-0 w-6 h-6 pointer-events-none" style={{ borderBottom: "1px solid rgba(74,222,128,0.2)", borderRight: "1px solid rgba(74,222,128,0.2)" }} />

              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(74,222,128,0.05), transparent 70%)" }}
              />

              <p className="text-[11px] tracking-[0.2em] uppercase mb-3" style={{ fontFamily: "'Inter', sans-serif", color: "rgba(240,234,216,0.25)" }}>
                Alcance
              </p>
              <p className="text-[13px] leading-relaxed" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, color: "rgba(240,234,216,0.5)" }}>
                Cobertura desde{" "}
                <span style={{ color: "rgba(240,234,216,0.85)", fontWeight: 400 }}>Patagonia</span>
                {" "}hasta{" "}
                <span style={{ color: "rgba(240,234,216,0.85)", fontWeight: 400 }}>todo el país</span>
                . Drones autónomos, sensores IoT y satélites en red.
              </p>

              {/* Animated status dots */}
              <div className="flex items-center gap-1.5 mt-5">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full"
                    style={{
                      background: "#4ade80",
                      opacity: 0.3 + i * 0.18,
                      animation: `sentinelDot ${1 + i * 0.25}s ease-in-out infinite`,
                      animationDelay: `${i * 0.15}s`,
                    }}
                  />
                ))}
                <span className="text-[10px] ml-1" style={{ fontFamily: "'Inter', sans-serif", color: "rgba(240,234,216,0.25)" }}>
                  sistema activo
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes sentinelPulse {
          0%, 100% { opacity: 1; transform: scale(1); box-shadow: 0 0 6px #4ade80; }
          50% { opacity: 0.35; transform: scale(0.8); box-shadow: 0 0 2px #4ade80; }
        }
        @keyframes sentinelDot {
          0%, 100% { opacity: var(--base-op, 0.5); transform: scale(1); }
          50% { opacity: 1; transform: scale(1.4); }
        }
      `}</style>
    </section>
  )
}
