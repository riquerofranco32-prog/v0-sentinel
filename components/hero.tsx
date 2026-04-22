"use client"

import { useEffect, useState, useRef } from "react"
import { ArrowRight } from "lucide-react"

// ─── Logos ────────────────────────────────────────────────────────────────────
const logos = [
  { src: "/20220609002317_uba.png", alt: "UBA" },
  { src: "/aiweken.png", alt: "Aiweken" },
  { src: "/cice.png", alt: "CICE" },
  { src: "/empretec.png", alt: "Empretec" },
  { src: "/endeavor.png", alt: "Endeavor" },
  { src: "/FPN2.webp", alt: "Fundación Patagonia Natural" },
  { src: "/ilan.png", alt: "ILAN" },
  { src: "/movistar-3.svg", alt: "Movistar" },
  { src: "/sadosky.png", alt: "Sadosky" },
  { src: "/scale.png", alt: "Scale" },
  { src: "/ue.png", alt: "UE" },
  { src: "/uncuyo.png", alt: "UNCUYO" },
  { src: "/unl.png", alt: "UNL" },
  { src: "/utn.png", alt: "UTN" },
]

// ─── Stats ─────────────────────────────────────────────────────────────────────
const stats = [
  { target: 15, suffix: "min", label: "Tiempo detección" },
  { target: 300, suffix: "ha", label: "Cobertura por vuelo" },
  { target: 98, suffix: "%", label: "Precisión de detección" },
]

// ─── Cloudinary video URL ──────────────────────────────────────────────────────
// Public ID: 13851-252799027_gbm6no
// Using your Cloudinary cloud (auto-detected from public ID format)
const CLOUDINARY_CLOUD = "your_cloud_name" // ← reemplazá con tu cloud name de Cloudinary
const VIDEO_PUBLIC_ID = "13851-252799027_gbm6no"
const VIDEO_URL = `https://res.cloudinary.com/${CLOUDINARY_CLOUD}/video/upload/q_auto,f_auto/${VIDEO_PUBLIC_ID}.mp4`
const VIDEO_URL_WEBM = `https://res.cloudinary.com/${CLOUDINARY_CLOUD}/video/upload/q_auto,f_webm/${VIDEO_PUBLIC_ID}.webm`

// ─── Particle types ────────────────────────────────────────────────────────────
interface Particle {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  speedX: number
  speedY: number
  life: number
  maxLife: number
  type: "ember" | "smoke"
}

// ─── Particles canvas ──────────────────────────────────────────────────────────
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animFrameRef = useRef<number>(0)
  const counterRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const spawnParticle = () => {
      const isEmber = Math.random() < 0.28
      const p: Particle = {
        id: counterRef.current++,
        x: Math.random() * canvas.width,
        y: canvas.height * (0.4 + Math.random() * 0.5),
        size: isEmber ? Math.random() * 2.2 + 0.8 : Math.random() * 38 + 18,
        opacity: isEmber
          ? Math.random() * 0.75 + 0.15
          : Math.random() * 0.055 + 0.015,
        speedX: (Math.random() - 0.5) * (isEmber ? 1.1 : 0.35),
        speedY: -(Math.random() * (isEmber ? 1.4 : 0.55) + 0.25),
        life: 0,
        maxLife: isEmber
          ? Math.random() * 80 + 40
          : Math.random() * 160 + 80,
        type: isEmber ? "ember" : "smoke",
      }
      particlesRef.current.push(p)
    }

    let frame = 0
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      if (frame % 3 === 0) spawnParticle()
      if (frame % 7 === 0) spawnParticle()
      frame++

      particlesRef.current = particlesRef.current.filter(
        (p) => p.life < p.maxLife
      )

      for (const p of particlesRef.current) {
        p.life++
        p.x += p.speedX
        p.y += p.speedY
        p.speedX += (Math.random() - 0.5) * 0.08
        const progress = p.life / p.maxLife

        if (p.type === "ember") {
          const alpha = p.opacity * (1 - progress)
          const flicker = 0.75 + Math.random() * 0.25
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size * flicker, 0, Math.PI * 2)
          const grad = ctx.createRadialGradient(
            p.x, p.y, 0, p.x, p.y, p.size * 2.2
          )
          grad.addColorStop(0, `rgba(255,185,60,${alpha})`)
          grad.addColorStop(0.4, `rgba(255,85,15,${alpha * 0.55})`)
          grad.addColorStop(1, `rgba(255,40,0,0)`)
          ctx.fillStyle = grad
          ctx.fill()
        } else {
          const alpha =
            p.opacity *
            (progress < 0.2
              ? progress / 0.2
              : 1 - (progress - 0.2) / 0.8)
          const radius = p.size * (1 + progress * 1.6)
          const grad = ctx.createRadialGradient(
            p.x, p.y, 0, p.x, p.y, radius
          )
          grad.addColorStop(0, `rgba(170,135,95,${alpha})`)
          grad.addColorStop(1, `rgba(90,70,50,0)`)
          ctx.beginPath()
          ctx.arc(p.x, p.y, radius, 0, Math.PI * 2)
          ctx.fillStyle = grad
          ctx.fill()
        }
      }
      animFrameRef.current = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animFrameRef.current)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-[1] pointer-events-none"
      aria-hidden="true"
    />
  )
}

// ─── Animated counter ──────────────────────────────────────────────────────────
function AnimatedStat({
  target,
  suffix,
  label,
  delay = 0,
}: {
  target: number
  suffix: string
  label: string
  delay?: number
}) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const ran = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !ran.current) {
          ran.current = true
          const start = performance.now()
          const dur = 1800
          const step = (ts: number) => {
            const p = Math.min((ts - start) / dur, 1)
            const eased = 1 - Math.pow(1 - p, 3)
            setValue(Math.round(eased * target))
            if (p < 1) requestAnimationFrame(step)
          }
          setTimeout(() => requestAnimationFrame(step), delay)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, delay])

  return (
    <div ref={ref} className="text-center">
      <div
        className="leading-none"
        style={{
          fontFamily: "'Jura', sans-serif",
          fontWeight: 700,
          fontSize: "clamp(1.5rem, 3.5vw, 2rem)",
          color: "rgba(240,234,216,0.95)",
        }}
      >
        {value}
        <span style={{ color: "#94f1be" }}>{" "}{suffix}</span>
      </div>
      <div
        className="mt-1"
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "11px",
          fontWeight: 400,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "rgba(240,234,216,0.4)",
        }}
      >
        {label}
      </div>
    </div>
  )
}

// ─── Video background hook ─────────────────────────────────────────────────────
function useVideoFade(videoRef: React.RefObject<HTMLVideoElement>) {
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let rafId: number
    const FADE = 0.6 // segundos de fade in/out

    const setOp = (v: number) => {
      video.style.opacity = String(Math.min(1, Math.max(0, v)))
    }

    const tick = () => {
      const t = video.currentTime
      const d = video.duration
      if (!d || isNaN(d)) { rafId = requestAnimationFrame(tick); return }
      if (t < FADE) {
        setOp(t / FADE)
      } else if (t > d - FADE) {
        setOp((d - t) / FADE)
      } else {
        setOp(1)
      }
      rafId = requestAnimationFrame(tick)
    }

    const onEnded = () => {
      setOp(0)
      setTimeout(() => {
        video.currentTime = 0
        video.play().catch(() => {})
      }, 100)
    }

    const onCanPlay = () => {
      video.play().then(() => {
        if (rafId) cancelAnimationFrame(rafId)
        tick()
      }).catch(() => {})
    }

    video.addEventListener("ended", onEnded)
    video.addEventListener("canplay", onCanPlay)
    video.load()

    return () => {
      cancelAnimationFrame(rafId)
      video.removeEventListener("ended", onEnded)
      video.removeEventListener("canplay", onCanPlay)
    }
  }, [videoRef])
}

// ─── Hero ──────────────────────────────────────────────────────────────────────
export function Hero() {
  const [mounted, setMounted] = useState(false)
  const [showScroll, setShowScroll] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  useVideoFade(videoRef)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => setShowScroll(window.scrollY < 80)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      aria-label="Inicio — Sentinel Technologies"
    >
      {/* ── Background video ── */}
      <div className="absolute inset-0 z-0 bg-[#0c0b09]">
        <video
          ref={videoRef}
          id="bg-video"
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0 }}
        >
          {/* WebM primero para mejor compresión en navegadores compatibles */}
          <source src={VIDEO_URL_WEBM} type="video/webm" />
          <source src={VIDEO_URL} type="video/mp4" />
        </video>

        {/* Gradientes encima del video — igual que antes */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0b09]/75 via-[#0c0b09]/35 to-[#0c0b09]/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0b09] via-transparent to-[#0c0b09]/70" />
      </div>

      {/* ── Particles ── */}
      <ParticleCanvas />

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 pb-44 text-center">

        {/* Badge */}
        <div
          className={`inline-flex items-center gap-2 mb-8 transition-all duration-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"
          }`}
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#94f1be] opacity-50"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#94f1be]"></span>
          </span>
          <span
            style={{
              fontFamily: "'Jura', sans-serif",
              fontSize: "10px",
              fontWeight: 600,
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "#94f1be",
            }}
          >
            Sistema activo · Patagonia
          </span>
        </div>

        {/* Headline */}
        <h1
          className={`leading-tight tracking-tight text-center transition-all duration-700 delay-100 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{
            fontFamily: "'Jura', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(2.6rem, 6.5vw, 5.5rem)",
            color: "rgba(240,234,216,0.95)",
            maxWidth: "860px",
          }}
        >
          Plataforma de prevención
          <br />
          <span style={{ color: "#94f1be" }}>de incendios forestales</span>
        </h1>

        {/* Divider */}
        <div
          className={`w-12 h-px my-8 transition-all duration-700 delay-200 ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
          style={{ background: "rgba(240,234,216,0.12)" }}
        />

        {/* Tagline */}
        <p
          className={`text-center max-w-md transition-all duration-700 delay-300 ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 300,
            fontSize: "16px",
            lineHeight: 1.75,
            color: "rgba(240,234,216,0.6)",
          }}
        >
          Tecnología aérea e inteligencia artificial para detectar incendios en{" "}
          <strong
            style={{ fontWeight: 500, color: "rgba(240,234,216,0.9)" }}
          >
            minutos, no en horas.
          </strong>
        </p>

        {/* Stats */}
        <div
          className={`flex items-center gap-6 sm:gap-10 mt-10 transition-all duration-700 delay-[400ms] ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {stats.map((s, i) => (
            <>
              {i > 0 && (
                <div
                  key={`div-${i}`}
                  className="w-px self-stretch"
                  style={{ background: "rgba(240,234,216,0.1)" }}
                />
              )}
              <AnimatedStat
                key={s.label}
                target={s.target}
                suffix={s.suffix}
                label={s.label}
                delay={i * 150}
              />
            </>
          ))}
        </div>

        {/* CTAs */}
        <div
          className={`flex flex-col sm:flex-row gap-3 mt-10 transition-all duration-700 delay-500 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <a
            href="#nosotros"
            className="group inline-flex items-center gap-2 px-7 py-3 rounded-sm text-[13px] font-medium transition-all"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 500,
              letterSpacing: "0.04em",
              background: "rgba(148,241,190,0.1)",
              border: "0.5px solid rgba(148,241,190,0.3)",
              color: "#94f1be",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(148,241,190,0.2)"
              e.currentTarget.style.borderColor = "rgba(148,241,190,0.65)"
              e.currentTarget.style.transform = "translateY(-1px)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(148,241,190,0.1)"
              e.currentTarget.style.borderColor = "rgba(148,241,190,0.3)"
              e.currentTarget.style.transform = "translateY(0)"
            }}
          >
            Conocer la plataforma
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </a>

          <a
            href="#servicios"
            className="inline-flex items-center justify-center px-7 py-3 rounded-sm text-[13px] font-light transition-all"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 300,
              color: "rgba(240,234,216,0.4)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "rgba(240,234,216,0.85)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(240,234,216,0.4)")
            }
          >
            Ver servicios
          </a>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div
        className="absolute left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 transition-all duration-500"
        style={{ bottom: "172px", opacity: showScroll && mounted ? 1 : 0 }}
        aria-hidden="true"
      >
        <div
          className="w-px relative overflow-hidden"
          style={{ height: "44px", background: "rgba(240,234,216,0.08)" }}
        >
          <div
            className="absolute top-0 left-0 w-full"
            style={{
              height: "100%",
              background: "linear-gradient(to bottom, transparent, #94f1be)",
              animation: "scrollDown 2s ease-in-out infinite",
            }}
          />
        </div>
        <span
          style={{
            fontFamily: "'Jura', sans-serif",
            fontSize: "9px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(240,234,216,0.18)",
          }}
        >
          Scroll
        </span>
      </div>

      {/* ── Marquee ── */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10 border-t py-6 overflow-hidden"
        style={{
          borderColor: "rgba(255,255,255,0.04)",
          background: "rgba(12,11,9,0.75)",
          backdropFilter: "blur(12px)",
        }}
      >
        <p
          className="text-center mb-4"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "9px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(240,234,216,0.18)",
          }}
        >
          Nos acompañan
        </p>

        <div
          className="overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          }}
        >
          <div className="flex animate-marquee whitespace-nowrap hover:[animation-play-state:paused]">
            {[...logos, ...logos, ...logos].map((logo, i) => (
              <div
                key={i}
                className="inline-flex items-center justify-center mx-9 shrink-0"
                style={{ height: "40px" }}
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-full w-auto object-contain transition-all duration-300"
                  style={{ opacity: 0.5, filter: "grayscale(25%)" }}
                  loading="lazy"
                  onMouseEnter={(e) => {
                    ;(e.currentTarget as HTMLImageElement).style.opacity = "0.9"
                    ;(e.currentTarget as HTMLImageElement).style.filter =
                      "grayscale(0%)"
                  }}
                  onMouseLeave={(e) => {
                    ;(e.currentTarget as HTMLImageElement).style.opacity = "0.5"
                    ;(e.currentTarget as HTMLImageElement).style.filter =
                      "grayscale(25%)"
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll animation keyframe */}
      <style jsx>{`
        @keyframes scrollDown {
          0% { top: -100%; }
          100% { top: 200%; }
        }
      `}</style>
    </section>
  )
}
