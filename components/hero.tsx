"use client"

import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, TreePine, Flame, Building, Shield, Leaf, Mountain } from "lucide-react"
import { RotatingWord } from "@/components/rotating-word"

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
        ctx.fillStyle = `rgba(34, 197, 94, ${p.opacity})`
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
            ctx.strokeStyle = `rgba(34, 197, 94, ${0.1 * (1 - dist / 100)})`
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
      {/* Background Image with Parallax effect */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1448375240586-882707db888b?w=1920&q=80"
          alt="Lush green forest with sunlight rays"
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080c08]/70 via-[#080c08]/50 to-[#080c08]" />
      </div>

      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-[1] pointer-events-none opacity-60"
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        {/* Floating Badge */}
        <div
          className={`inline-flex items-center gap-2 bg-[#22c55e]/10 border border-[#22c55e]/30 rounded-full px-4 py-2 mb-8 transition-all duration-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
        >
          <Sparkles className="w-4 h-4 text-[#22c55e]" />
          <span className="text-sm text-[#22c55e] font-medium">
            NEW — Sentinel Cloud v2.0
          </span>
        </div>

        {/* Headline */}
        <h1
          className={`text-5xl md:text-7xl lg:text-8xl font-black text-white text-center leading-tight mb-8 transition-all duration-700 delay-100 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Tecnología que protege tu
          <br />
          <RotatingWord />
        </h1>

        {/* Subtext */}
        <p
          className={`text-lg sm:text-xl text-white/70 max-w-2xl mb-10 leading-relaxed transition-all duration-700 delay-500 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Tecnología aérea e inteligencia artificial para la detección temprana
          de incendios y el monitoreo ambiental.
        </p>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Button
            asChild
            size="lg"
            className="bg-[#22c55e] hover:bg-[#16a34a] text-[#080c08] font-semibold rounded-full px-8 h-12 text-base"
          >
            <a href="#nosotros">
              Quiero saber más
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white rounded-full px-8 h-12 text-base"
          >
            <a href="#servicios">Ver Servicios</a>
          </Button>
        </div>
      </div>

      {/* Partner Marquee with styled badges */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-[#080c08]/90 backdrop-blur-sm border-t border-white/10 py-4 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...partners, ...partners, ...partners].map((partner, index) => (
            <div
              key={index}
              className={`inline-flex items-center gap-2 mx-4 px-4 py-2 rounded-full ${partner.color} border border-white/10`}
            >
              <partner.icon className="w-4 h-4" />
              <span className="text-sm font-medium">{partner.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
