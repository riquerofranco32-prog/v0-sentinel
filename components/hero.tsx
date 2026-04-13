"use client"

import { useEffect, useState, useRef } from "react"
import { ArrowRight } from "lucide-react"

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
      const isEmber = Math.random() < 0.3
      const p: Particle = {
        id: counterRef.current++,
        x: Math.random() * canvas.width,
        y: canvas.height * (0.4 + Math.random() * 0.5),
        size: isEmber ? Math.random() * 2.5 + 1 : Math.random() * 40 + 20,
        opacity: isEmber ? Math.random() * 0.8 + 0.2 : Math.random() * 0.06 + 0.02,
        speedX: (Math.random() - 0.5) * (isEmber ? 1.2 : 0.4),
        speedY: -(Math.random() * (isEmber ? 1.5 : 0.6) + 0.3),
        life: 0,
        maxLife: isEmber ? Math.random() * 80 + 40 : Math.random() * 160 + 80,
        type: isEmber ? "ember" : "smoke",
      }
      particlesRef.current.push(p)
    }

    let frame = 0
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      if (frame % 3 === 0) spawnParticle()
      if (frame % 8 === 0) spawnParticle()
      frame++

      particlesRef.current = particlesRef.current.filter(p => p.life < p.maxLife)

      for (const p of particlesRef.current) {
        p.life++
        p.x += p.speedX
        p.y += p.speedY
        p.speedX += (Math.random() - 0.5) * 0.1
        const progress = p.life / p.maxLife

        if (p.type === "ember") {
          const alpha = p.opacity * (1 - progress)
          const flicker = 0.7 + Math.random() * 0.3
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size * flicker, 0, Math.PI * 2)
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2)
          grad.addColorStop(0, `rgba(255, 180, 50, ${alpha})`)
          grad.addColorStop(0.4, `rgba(255, 80, 10, ${alpha * 0.6})`)
          grad.addColorStop(1, `rgba(255, 40, 0, 0)`)
          ctx.fillStyle = grad
          ctx.fill()
        } else {
          const alpha = p.opacity * (progress < 0.2 ? progress / 0.2 : 1 - (progress - 0.2) / 0.8)
          const radius = p.size * (1 + progress * 1.5)
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius)
          grad.addColorStop(0, `rgba(180, 140, 100, ${alpha})`)
          grad.addColorStop(1, `rgba(100, 80, 60, 0)`)
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
    />
  )
}

export function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/aaa.jpg"
          alt="Incendio forestal Patagonia"
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0b09]/60 via-[#0c0b09]/40 to-[#0c0b09]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0b09] via-transparent to-[#0c0b09]/70" />
      </div>

      {/* Particle effect */}
      <ParticleCanvas />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 pb-32">

        {/* Marca chica arriba */}
        <div
          className={`inline-flex items-center gap-2 mb-8 transition-all duration-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"
          }`}
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#94f1be] opacity-60"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#94f1be]"></span>
          </span>
          <span
            className="text-[11px] font-semibold tracking-[0.35em] uppercase"
            style={{
              fontFamily: "'Jura', sans-serif",
              color: "#94f1be",
            }}
          >
            
          </span>
        </div>

        {/* Headline principal */}
        <h1
          className={`leading-tight tracking-tight text-center transition-all duration-700 delay-100 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{
            fontFamily: "'Jura', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(2.8rem, 7vw, 6rem)",
            color: "rgba(240,234,216,0.95)",
            maxWidth: "820px",
          }}
        >
          Plataforma de prevención
          <br />
          <span style={{ color: "#94f1be" }}>de incendios forestales</span>
        </h1>

        {/* Divider */}
        <div
          className={`w-16 h-px my-8 transition-all duration-700 delay-200 ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
          style={{ background: "rgba(240,234,216,0.15)" }}
        />

        {/* Tagline */}
        <p
          className={`text-center max-w-md transition-all duration-700 delay-300 ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            fontSize: "16px",
            lineHeight: 1.7,
            color: "rgba(240,234,216,0.75)",
          }}
        >
          Tecnología aérea e inteligencia artificial para detectar incendios
          en minutos, no en horas.
        </p>

        {/* CTAs */}
        <div
          className={`flex flex-col sm:flex-row gap-3 mt-10 transition-all duration-700 delay-500 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <a
            href="#nosotros"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-sm text-[13px] font-medium transition-all"
            style={{
              fontFamily: "'Inter', sans-serif",
              background: "rgba(148,241,190,0.1)",
              border: "0.5px solid rgba(148,241,190,0.35)",
              color: "#94f1be",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(148,241,190,0.18)"
              e.currentTarget.style.borderColor = "rgba(148,241,190,0.6)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(148,241,190,0.1)"
              e.currentTarget.style.borderColor = "rgba(148,241,190,0.35)"
            }}
          >
            Quiero saber más
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
          <a
            href="#servicios"
            className="inline-flex items-center justify-center px-7 py-3 rounded-sm text-[13px] font-light transition-all"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: "rgba(240,234,216,0.45)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "rgba(240,234,216,0.8)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(240,234,216,0.45)")
            }
          >
            Ver servicios
          </a>
        </div>
      </div>

      {/* Logo marquee */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/5 py-8 overflow-hidden"
        style={{ background: "rgba(12,11,9,0.7)", backdropFilter: "blur(8px)" }}
      >
        <p
          className="text-center mb-5 text-[10px] tracking-[0.25em] uppercase"
          style={{ color: "rgba(240,234,216,0.2)", fontFamily: "'Inter', sans-serif" }}
        >
          Nos acompañan
        </p>
        <div className="flex animate-marquee whitespace-nowrap">
          {[...logos, ...logos, ...logos].map((logo, i) => (
            <div
              key={i}
              className="inline-flex items-center justify-center mx-10 shrink-0"
              style={{ height: "52px" }}
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-full w-auto object-contain"
                style={{ opacity: 0.8 }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
