"use client"

import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, TreePine, Flame, Building, Shield, Leaf, Mountain } from "lucide-react"

const partners = [
  { name: "Forestal Argentina", icon: TreePine, color: "bg-emerald-500/20 text-emerald-400" },
  { name: "Bomberos San Rafael", icon: Flame, color: "bg-red-500/20 text-red-400" },
  { name: "Fundación Patagonia Natural", icon: Mountain, color: "bg-cyan-500/20 text-cyan-400" },
  { name: "Municipalidad San Rafael", icon: Building, color: "bg-amber-500/20 text-amber-400" },
  { name: "UBA", icon: Shield, color: "bg-blue-500/20 text-blue-400" },
  { name: "Endeavor", icon: Leaf, color: "bg-purple-500/20 text-purple-400" },
  { name: "BNA", icon: Building, color: "bg-green-500/20 text-green-400" },
]

export function Hero() {
  const [mounted, setMounted] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Particle animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    interface Particle {
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
    }

    const particles: Particle[] = []
    const particleCount = 50

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.3 + 0.1,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p, i) => {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 79, 57, ${p.opacity})`
        ctx.fill()

        // Draw connections
        particles.slice(i + 1).forEach((p2) => {
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 100) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(0, 79, 57, ${0.1 * (1 - dist / 100)})`
            ctx.stroke()
          }
        })
      })

      requestAnimationFrame(animate)
    }

    const animationId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-wMoLWM6ee43OTLxdif9ekqEJu7qlet.png"
          alt="Paisaje montañoso con volcán nevado y bosque patagónico"
          className="w-full h-full object-cover scale-105"
        />
        {/* Multi-layer gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#004f39]/20 to-[#151613]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#151613] via-transparent to-[#151613]/40" />
      </div>

      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-[1] pointer-events-none opacity-40"
      />

      {/* Main Content - Centered Wordmark */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Badge */}
        <div
          className={`inline-flex items-center gap-2 bg-[#004f39]/30 border border-[#004f39]/50 rounded-full px-4 py-2 mb-8 transition-all duration-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
        >
          <Sparkles className="w-4 h-4 text-[#FFFACA]" />
          <span className="text-sm text-[#FFFACA] font-medium tracking-wider uppercase">
            NEW — Sentinel Cloud v2.0
          </span>
        </div>

        {/* Giant Wordmark */}
        <h1
          className={`text-[clamp(5rem,18vw,16rem)] font-bold leading-none tracking-tight text-center ${
            mounted ? "animate-hero-fade-in" : "opacity-0"
          }`}
          style={{ 
            fontFamily: "var(--font-heading)",
            color: "rgba(255, 250, 202, 0.93)",
          }}
        >
          SENTINEL
        </h1>

        {/* Tagline */}
        <p
          className={`text-sm md:text-base tracking-[0.4em] uppercase mt-4 transition-all duration-700 delay-300 ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
          style={{ color: "rgba(255, 250, 202, 0.45)" }}
        >
          TECNOLOGÍA · TERRITORIO · PREVENCIÓN
        </p>

        {/* Scroll Indicator */}
        <div 
          className={`absolute bottom-32 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-700 delay-700 ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="w-px h-12 bg-[#FFFACA]/30 animate-scroll-indicator" />
        </div>
      </div>

      {/* Bottom Left Content */}
      <div 
        className={`absolute bottom-24 left-0 z-10 max-w-xl px-6 md:px-12 transition-all duration-700 delay-500 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <h2 
          className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#FFFACA] mb-4"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Tecnología que protege tu TERRITORIO
        </h2>
        <p className="text-[#FFFACA]/60 text-sm md:text-base mb-6 leading-relaxed">
          Tecnología aérea e inteligencia artificial para la detección temprana
          de incendios y el monitoreo ambiental.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            asChild
            size="lg"
            className="bg-[#004f39] hover:bg-[#003d2c] text-[#FFFACA] font-semibold rounded-full px-6 h-11 text-sm"
          >
            <a href="#nosotros">
              Quiero saber más
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-[#FFFACA]/30 bg-transparent text-[#FFFACA] hover:bg-[#FFFACA]/10 rounded-full px-6 h-11 text-sm"
          >
            <a href="#servicios">Ver Servicios</a>
          </Button>
        </div>
      </div>

      {/* Partner Marquee */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-[#151613]/95 backdrop-blur-sm border-t border-[#FFFACA]/10 py-3 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...partners, ...partners, ...partners].map((partner, index) => (
            <div
              key={index}
              className={`inline-flex items-center gap-2 mx-4 px-3 py-1.5 rounded-full ${partner.color} border border-[#FFFACA]/5`}
            >
              <partner.icon className="w-3.5 h-3.5" />
              <span className="text-xs font-medium">{partner.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
