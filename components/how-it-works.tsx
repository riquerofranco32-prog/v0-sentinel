"use client"

import { useEffect, useRef, useState } from "react"
import { Search, Bell, Zap, MapPin, Wind, Flame, CheckCircle, Satellite, Cpu } from "lucide-react"

// ─── Data ────────────────────────────────────────────────────────────────────

const steps = [
  {
    icon: Satellite,
    number: "01",
    title: "Identificación",
    tagline: "Vigilancia permanente desde el aire",
    description:
      "Drones autónomos y satélites capturan datos térmicos, ópticos e infrarrojos en tiempo real. Cobertura 24/7 sobre territorios de difícil acceso.",
    accent: "#4ade80",
    accentDim: "rgba(74,222,128,0.12)",
    accentBorder: "rgba(74,222,128,0.22)",
    metrics: [
      { label: "Cobertura", value: "24/7" },
      { label: "Resolución", value: "5cm" },
    ],
  },
  {
    icon: Cpu,
    number: "02",
    title: "Análisis IA",
    tagline: "Inteligencia que no descansa",
    description:
      "Modelos de visión computacional procesan cada frame. La IA descarta falsos positivos y genera alertas geoespaciales verificadas en segundos.",
    accent: "#fb923c",
    accentDim: "rgba(251,146,60,0.12)",
    accentBorder: "rgba(251,146,60,0.22)",
    metrics: [
      { label: "Precisión", value: "98%" },
      { label: "Latencia", value: "<3s" },
    ],
  },
  {
    icon: Zap,
    number: "03",
    title: "Respuesta",
    tagline: "De la detección a la acción",
    description:
      "Brigadistas, municipios y organismos provinciales reciben alertas con coordenadas GPS exactas. Respuesta 60% más rápida que métodos tradicionales.",
    accent: "#4ade80",
    accentDim: "rgba(74,222,128,0.12)",
    accentBorder: "rgba(74,222,128,0.22)",
    metrics: [
      { label: "Velocidad respuesta", value: "+60%" },
      { label: "Detección", value: "<8min" },
    ],
  },
]

const TYPING_LINES = [
  { text: "$ sentinel-core --scan --region patagonia", color: "rgba(74,222,128,0.6)", delay: 0 },
  { text: "  Iniciando escaneo de zona...", color: "rgba(240,234,216,0.3)", delay: 800 },
  { text: "  Sensor térmico activo · dron-04 online", color: "rgba(240,234,216,0.3)", delay: 1600 },
  { text: "  ⚠  Anomalía térmica detectada", color: "#fb923c", delay: 2600 },
  { text: "  Verificando con modelo IA v2.4...", color: "rgba(240,234,216,0.3)", delay: 3400 },
  { text: "  ✓  INCENDIO CONFIRMADO — alertando equipos", color: "#4ade80", delay: 4200 },
]

// ─── Hooks ───────────────────────────────────────────────────────────────────

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

// ─── Sub-components ──────────────────────────────────────────────────────────

function RadarCanvas({ isVisible }: { isVisible: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const angleRef = useRef(0)
  const frameRef = useRef<number>(0)

  useEffect(() => {
    if (!isVisible) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const W = canvas.width
    const H = canvas.height
    const cx = W / 2
    const cy = H / 2
    const R = W / 2 - 8

    // Static blips
    const blips = [
      { x: cx + 45, y: cy - 52, size: 3.5, pulse: 0 },
      { x: cx - 30, y: cy + 38, size: 2.5, pulse: 1 },
      { x: cx + 20, y: cy + 60, size: 2, pulse: 2 },
    ]

    function draw() {
      ctx!.clearRect(0, 0, W, H)
      const angle = angleRef.current

      // Background
      ctx!.fillStyle = "rgba(7,8,6,0.0)"
      ctx!.fillRect(0, 0, W, H)

      // Grid circles
      ;[0.33, 0.55, 0.78, 1].forEach((f) => {
        ctx!.beginPath()
        ctx!.arc(cx, cy, R * f, 0, Math.PI * 2)
        ctx!.strokeStyle = "rgba(74,222,128,0.12)"
        ctx!.lineWidth = 1
        ctx!.stroke()
      })

      // Cross hair
      ctx!.strokeStyle = "rgba(74,222,128,0.08)"
      ctx!.lineWidth = 0.8
      ctx!.beginPath(); ctx!.moveTo(cx, cy - R); ctx!.lineTo(cx, cy + R); ctx!.stroke()
      ctx!.beginPath(); ctx!.moveTo(cx - R, cy); ctx!.lineTo(cx + R, cy); ctx!.stroke()
      ctx!.beginPath(); ctx!.moveTo(cx - R * 0.707, cy - R * 0.707); ctx!.lineTo(cx + R * 0.707, cy + R * 0.707); ctx!.stroke()
      ctx!.beginPath(); ctx!.moveTo(cx + R * 0.707, cy - R * 0.707); ctx!.lineTo(cx - R * 0.707, cy + R * 0.707); ctx!.stroke()

      // Sweep gradient (trailing cone)
      const sweepLen = Math.PI * 0.55
      const grad = ctx!.createConicalGradient
        ? null
        : null
      // Manual cone via arc fill
      ctx!.beginPath()
      ctx!.moveTo(cx, cy)
      ctx!.arc(cx, cy, R, angle - sweepLen, angle, false)
      ctx!.closePath()
      const radGrad = ctx!.createRadialGradient(cx, cy, 0, cx, cy, R)
      radGrad.addColorStop(0, "rgba(74,222,128,0.0)")
      radGrad.addColorStop(1, "rgba(74,222,128,0.18)")
      ctx!.fillStyle = radGrad
      ctx!.fill()

      // Sweep line
      ctx!.beginPath()
      ctx!.moveTo(cx, cy)
      ctx!.lineTo(cx + R * Math.cos(angle), cy + R * Math.sin(angle))
      ctx!.strokeStyle = "rgba(74,222,128,0.9)"
      ctx!.lineWidth = 1.5
      ctx!.shadowColor = "#4ade80"
      ctx!.shadowBlur = 8
      ctx!.stroke()
      ctx!.shadowBlur = 0

      // Blips
      blips.forEach((b) => {
        const blipAngle = Math.atan2(b.y - cy, b.x - cx)
        const diff = ((angle - blipAngle) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2)
        const fade = diff < sweepLen ? 1 - diff / sweepLen : Math.max(0, 1 - (diff - sweepLen) / (Math.PI * 1.2))
        if (fade < 0.01) return
        const pulse = Math.sin(Date.now() / 500 + b.pulse * 2) * 0.5 + 0.5
        ctx!.beginPath()
        ctx!.arc(b.x, b.y, b.size + pulse * 1.5, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(74,222,128,${fade * (0.6 + pulse * 0.4)})`
        ctx!.shadowColor = "#4ade80"
        ctx!.shadowBlur = 12 * fade
        ctx!.fill()
        ctx!.shadowBlur = 0
      })

      // Center dot
      ctx!.beginPath()
      ctx!.arc(cx, cy, 3, 0, Math.PI * 2)
      ctx!.fillStyle = "rgba(74,222,128,0.8)"
      ctx!.fill()

      // Outer ring
      ctx!.beginPath()
      ctx!.arc(cx, cy, R, 0, Math.PI * 2)
      ctx!.strokeStyle = "rgba(74,222,128,0.2)"
      ctx!.lineWidth = 1
      ctx!.stroke()

      angleRef.current += 0.018
      frameRef.current = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(frameRef.current)
  }, [isVisible])

  return (
    <canvas
      ref={canvasRef}
      width={220}
      height={220}
      style={{ display: "block" }}
    />
  )
}

function TerminalLines({ isVisible }: { isVisible: boolean }) {
  const [visibleLines, setVisibleLines] = useState<number[]>([])

  useEffect(() => {
    if (!isVisible) return
    TYPING_LINES.forEach((line, i) => {
      setTimeout(() => {
        setVisibleLines(prev => [...prev, i])
      }, line.delay)
    })
  }, [isVisible])

  return (
    <div
      className="rounded-lg p-5 font-mono text-[12px] leading-relaxed overflow-hidden"
      style={{
        background: "rgba(0,0,0,0.6)",
        border: "0.5px solid rgba(74,222,128,0.15)",
        backdropFilter: "blur(8px)",
        minHeight: "160px",
      }}
    >
      {/* Terminal header */}
      <div className="flex items-center gap-1.5 mb-4 pb-3" style={{ borderBottom: "0.5px solid rgba(240,234,216,0.06)" }}>
        {["#dc1e1e", "#fb923c", "#4ade80"].map((c, i) => (
          <div key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: c, opacity: 0.7 }} />
        ))}
        <span className="ml-2 text-[10px] tracking-widest" style={{ color: "rgba(240,234,216,0.2)" }}>
          sentinel-core · terminal
        </span>
      </div>
      {TYPING_LINES.map((line, i) => (
        <div
          key={i}
          className="transition-all duration-300"
          style={{
            color: line.color,
            opacity: visibleLines.includes(i) ? 1 : 0,
            transform: visibleLines.includes(i) ? "translateY(0)" : "translateY(4px)",
            transitionDelay: "0ms",
          }}
        >
          {line.text}
          {i === TYPING_LINES.length - 1 && visibleLines.includes(i) && (
            <span style={{ animation: "blink 0.8s step-end infinite", marginLeft: "2px" }}>▋</span>
          )}
        </div>
      ))}
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function HowItWorks() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  const [alertShown, setAlertShown] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const responseCount = useCountUp(60, isVisible, 1400)
  const precisionCount = useCountUp(98, isVisible, 1200)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.05 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // Auto-cycle active step
  useEffect(() => {
    if (!isVisible) return
    const timer = setInterval(() => {
      setActiveStep(s => (s + 1) % 3)
    }, 2800)
    return () => clearInterval(timer)
  }, [isVisible])

  // Show alert after terminal finishes
  useEffect(() => {
    if (!isVisible) return
    const t = setTimeout(() => setAlertShown(true), 5200)
    return () => clearTimeout(t)
  }, [isVisible])

  return (
    <section
      ref={sectionRef}
      id="servicios"
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: "#0a0c09" }}
    >
      {/* ── Background layers ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(74,222,128,1) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,1) 1px, transparent 1px)`,
          backgroundSize: "72px 72px",
          opacity: 0.03,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(0,79,57,0.18) 0%, transparent 70%)" }}
      />
      {/* Left glow streak */}
      <div
        className="absolute left-0 top-0 bottom-0 w-px pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(74,222,128,0.15), transparent)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">

        {/* ── HEADER ── */}
        <div
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-20 gap-6 transition-all duration-700"
          style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(16px)" }}
        >
          <div>
            <p
              className="text-[11px] tracking-[0.35em] uppercase mb-4"
              style={{ fontFamily: "'Inter', sans-serif", color: "rgba(240,234,216,0.25)" }}
            >
              El proceso
            </p>
            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(40px, 6vw, 72px)",
                lineHeight: 0.95,
                color: "rgba(240,234,216,0.92)",
                letterSpacing: "-1px",
              }}
            >
              ¿Cómo{" "}
              <span style={{ color: "#4ade80" }}>lo hacemos?</span>
            </h2>
          </div>

          {/* Live KPI pills */}
          <div className="flex gap-3 flex-wrap">
            {[
              { label: "Precisión IA", value: `${precisionCount}%`, accent: "#4ade80" },
              { label: "Respuesta más rápida", value: `+${responseCount}%`, accent: "#fb923c" },
            ].map((kpi) => (
              <div
                key={kpi.label}
                className="flex flex-col items-center px-5 py-3 rounded-sm"
                style={{
                  background: "rgba(240,234,216,0.03)",
                  border: `0.5px solid rgba(240,234,216,0.08)`,
                }}
              >
                <span
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 800,
                    fontSize: "28px",
                    color: kpi.accent,
                    lineHeight: 1,
                  }}
                >
                  {kpi.value}
                </span>
                <span
                  className="text-[10px] tracking-wider uppercase mt-1"
                  style={{ fontFamily: "'Inter', sans-serif", color: "rgba(240,234,216,0.3)" }}
                >
                  {kpi.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── MAIN LAYOUT: steps left + right panel ── */}
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">

          {/* LEFT — Vertical timeline steps */}
          <div className="lg:col-span-3 relative">

            {/* Vertical connector line */}
            <div
              className="absolute left-[27px] top-8 bottom-8 w-px hidden lg:block"
              style={{ background: "linear-gradient(to bottom, rgba(74,222,128,0.3), rgba(251,146,60,0.3), rgba(74,222,128,0.3))" }}
            />

            <div className="space-y-4">
              {steps.map((step, i) => {
                const isActive = activeStep === i
                return (
                  <div
                    key={step.number}
                    className="relative flex gap-6 cursor-pointer transition-all duration-500"
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? "translateX(0)" : "translateX(-20px)",
                      transitionDelay: `${i * 140}ms`,
                    }}
                    onClick={() => setActiveStep(i)}
                  >
                    {/* Step circle */}
                    <div
                      className="relative z-10 flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500"
                      style={{
                        background: isActive ? `${step.accent}20` : "rgba(240,234,216,0.03)",
                        border: `1.5px solid ${isActive ? step.accent : "rgba(240,234,216,0.1)"}`,
                        boxShadow: isActive ? `0 0 24px ${step.accent}30` : "none",
                      }}
                    >
                      <step.icon
                        className="w-5 h-5 transition-all duration-300"
                        style={{
                          color: isActive ? step.accent : "rgba(240,234,216,0.3)",
                          transform: isActive ? "scale(1.1)" : "scale(1)",
                        }}
                      />
                      {/* Pulse ring on active */}
                      {isActive && (
                        <div
                          className="absolute inset-0 rounded-full"
                          style={{
                            border: `1px solid ${step.accent}`,
                            animation: "stepRingPulse 2s ease-out infinite",
                          }}
                        />
                      )}
                    </div>

                    {/* Content card */}
                    <div
                      className="flex-1 rounded-lg p-6 transition-all duration-500 group"
                      style={{
                        background: isActive ? step.accentDim : "rgba(240,234,216,0.02)",
                        border: `0.5px solid ${isActive ? step.accentBorder : "rgba(240,234,216,0.06)"}`,
                        transform: isActive ? "translateX(4px)" : "translateX(0)",
                      }}
                    >
                      {/* Header row */}
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className="text-[10px] tracking-[0.25em] uppercase"
                              style={{ fontFamily: "'Inter', sans-serif", color: isActive ? step.accent : "rgba(240,234,216,0.2)" }}
                            >
                              {step.number}
                            </span>
                            {isActive && (
                              <span
                                className="flex items-center gap-1 text-[9px] px-1.5 py-0.5 rounded-sm tracking-wider uppercase"
                                style={{
                                  background: `${step.accent}18`,
                                  border: `0.5px solid ${step.accent}40`,
                                  color: step.accent,
                                  fontFamily: "'Inter', sans-serif",
                                  animation: "fadeInScale 0.3s ease",
                                }}
                              >
                                <span className="w-1 h-1 rounded-full" style={{ background: step.accent, animation: "sentinelPulse 1.2s infinite" }} />
                                Activo
                              </span>
                            )}
                          </div>
                          <h3
                            style={{
                              fontFamily: "'Syne', sans-serif",
                              fontWeight: 800,
                              fontSize: "20px",
                              color: isActive ? "rgba(240,234,216,0.95)" : "rgba(240,234,216,0.55)",
                              transition: "color 0.4s",
                            }}
                          >
                            {step.title}
                          </h3>
                          <p
                            className="text-[11px] mt-0.5"
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              color: isActive ? step.accent : "rgba(240,234,216,0.2)",
                              transition: "color 0.4s",
                              fontStyle: "italic",
                            }}
                          >
                            {step.tagline}
                          </p>
                        </div>
                      </div>

                      {/* Expandable body */}
                      <div
                        className="overflow-hidden transition-all duration-500"
                        style={{ maxHeight: isActive ? "200px" : "0px", opacity: isActive ? 1 : 0 }}
                      >
                        <p
                          className="text-[13px] leading-relaxed mb-4 mt-3"
                          style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, color: "rgba(240,234,216,0.5)" }}
                        >
                          {step.description}
                        </p>
                        {/* Mini metrics */}
                        <div className="flex gap-4">
                          {step.metrics.map((m) => (
                            <div
                              key={m.label}
                              className="px-3 py-2 rounded-sm"
                              style={{ background: `${step.accent}10`, border: `0.5px solid ${step.accent}25` }}
                            >
                              <div
                                style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "16px", color: step.accent, lineHeight: 1 }}
                              >
                                {m.value}
                              </div>
                              <div
                                className="text-[9px] tracking-wider uppercase mt-0.5"
                                style={{ fontFamily: "'Inter', sans-serif", color: "rgba(240,234,216,0.3)" }}
                              >
                                {m.label}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Progress bar */}
            <div
              className="mt-8 ml-[70px] h-px rounded-full overflow-hidden transition-all duration-700"
              style={{
                background: "rgba(240,234,216,0.06)",
                opacity: isVisible ? 1 : 0,
              }}
            >
              <div
                className="h-full rounded-full transition-all duration-[2800ms] ease-linear"
                style={{
                  width: isVisible ? "100%" : "0%",
                  background: "linear-gradient(to right, #4ade80, #fb923c, #4ade80)",
                }}
              />
            </div>
          </div>

          {/* RIGHT — Radar + Terminal + Alert */}
          <div
            className="lg:col-span-2 flex flex-col gap-4 transition-all duration-700"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
              transitionDelay: "400ms",
            }}
          >
            {/* Radar panel */}
            <div
              className="relative rounded-lg p-5 flex flex-col items-center overflow-hidden"
              style={{
                background: "rgba(7,8,6,0.8)",
                border: "0.5px solid rgba(74,222,128,0.15)",
                backdropFilter: "blur(12px)",
              }}
            >
              {/* Corner accents */}
              {[
                "top-0 left-0 border-t border-l",
                "top-0 right-0 border-t border-r",
                "bottom-0 left-0 border-b border-l",
                "bottom-0 right-0 border-b border-r",
              ].map((cls, i) => (
                <div
                  key={i}
                  className={`absolute w-4 h-4 ${cls}`}
                  style={{ borderColor: "rgba(74,222,128,0.35)" }}
                />
              ))}

              <div className="flex items-center justify-between w-full mb-4">
                <div>
                  <p className="text-[10px] tracking-[0.25em] uppercase" style={{ fontFamily: "'Inter', sans-serif", color: "rgba(240,234,216,0.25)" }}>
                    Sistema de radar
                  </p>
                  <p className="text-[12px]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, color: "rgba(240,234,216,0.7)" }}>
                    Patagonia Norte
                  </p>
                </div>
                <div className="flex items-center gap-2 px-2.5 py-1 rounded-sm" style={{ background: "rgba(74,222,128,0.08)", border: "0.5px solid rgba(74,222,128,0.2)" }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#4ade80", animation: "sentinelPulse 1.5s infinite" }} />
                  <span className="text-[9px] tracking-widest uppercase" style={{ color: "#4ade80", fontFamily: "'Inter', sans-serif" }}>En vivo</span>
                </div>
              </div>

              <RadarCanvas isVisible={isVisible} />

              {/* Radar legend */}
              <div className="flex gap-4 mt-4 w-full">
                {[
                  { dot: "#4ade80", label: "Zona segura" },
                  { dot: "#fb923c", label: "Anomalía" },
                ].map((l) => (
                  <div key={l.label} className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full" style={{ background: l.dot }} />
                    <span className="text-[10px]" style={{ fontFamily: "'Inter', sans-serif", color: "rgba(240,234,216,0.3)" }}>{l.label}</span>
                  </div>
                ))}
                <div className="ml-auto text-[10px]" style={{ fontFamily: "'Inter', sans-serif", color: "rgba(240,234,216,0.2)" }}>
                  3 drones activos
                </div>
              </div>
            </div>

            {/* Terminal */}
            <TerminalLines isVisible={isVisible} />

            {/* Alert card */}
            <div
              className="relative rounded-lg p-5 overflow-hidden transition-all duration-500"
              style={{
                background: "linear-gradient(135deg, rgba(251,146,60,0.1) 0%, rgba(10,12,9,0.9) 100%)",
                border: "0.5px solid rgba(251,146,60,0.35)",
                opacity: alertShown ? 1 : 0,
                transform: alertShown ? "translateY(0)" : "translateY(12px)",
              }}
            >
              {/* Animated scan line */}
              <div
                className="absolute left-0 right-0 h-px pointer-events-none"
                style={{
                  background: "linear-gradient(to right, transparent, rgba(251,146,60,0.6), transparent)",
                  animation: alertShown ? "alertScan 3s ease-in-out infinite" : "none",
                }}
              />

              {/* Pulsing dot top-right */}
              <div className="absolute top-4 right-4">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "#fb923c" }} />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ background: "#fb923c" }} />
                </span>
              </div>

              <div className="flex items-start gap-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "rgba(251,146,60,0.15)",
                    border: "0.5px solid rgba(251,146,60,0.35)",
                    animation: "alertIconPulse 2s ease-in-out infinite",
                  }}
                >
                  <Flame className="w-4 h-4" style={{ color: "#fb923c" }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5 mb-2">
                    <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ fontFamily: "'Inter', sans-serif", color: "#fb923c" }}>
                      Incendio detectado
                    </span>
                    <span
                      className="flex items-center gap-1 text-[9px] px-1.5 py-0.5 rounded-sm"
                      style={{ background: "rgba(74,222,128,0.1)", border: "0.5px solid rgba(74,222,128,0.3)", color: "#4ade80", fontFamily: "'Inter', sans-serif" }}
                    >
                      <CheckCircle className="w-2.5 h-2.5" />
                      IA verificada
                    </span>
                  </div>
                  <p className="text-[14px] font-bold mb-3" style={{ fontFamily: "'Syne', sans-serif", color: "rgba(240,234,216,0.9)" }}>
                    El Bolsón — Cajón del Azul
                  </p>
                  <div className="grid grid-cols-2 gap-y-1.5 gap-x-3">
                    {[
                      { icon: MapPin, label: "-41.97°, -71.53°", color: "#4ade80" },
                      { icon: Flame, label: "Intensidad: Alta", color: "#fb923c" },
                      { icon: Wind, label: "NE 18 km/h", color: "#4ade80" },
                      { label: "Área: 2,3 ha", color: "rgba(240,234,216,0.5)" },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-1.5 transition-all duration-300"
                        style={{
                          opacity: alertShown ? 1 : 0,
                          transform: alertShown ? "none" : "translateX(-6px)",
                          transitionDelay: `${i * 100 + 200}ms`,
                        }}
                      >
                        {item.icon && <item.icon className="w-3 h-3 flex-shrink-0" style={{ color: item.color }} />}
                        <span className="text-[11px]" style={{ fontFamily: "'Inter', sans-serif", color: item.color, fontWeight: 300 }}>
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div
                className="absolute bottom-0 left-0 right-0 h-px"
                style={{ background: "linear-gradient(to right, transparent, rgba(251,146,60,0.5), transparent)" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Global styles ── */}
      <style>{`
        @keyframes sentinelPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(0.75); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes stepRingPulse {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes fadeInScale {
          0% { opacity: 0; transform: scale(0.85); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes alertScan {
          0% { top: 0%; }
          100% { top: 100%; }
        }
        @keyframes alertIconPulse {
          0%, 100% { box-shadow: 0 0 0 rgba(251,146,60,0); }
          50% { box-shadow: 0 0 18px rgba(251,146,60,0.35); }
        }
      `}</style>
    </section>
  )
}
