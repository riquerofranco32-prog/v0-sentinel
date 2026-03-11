"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTA() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[#151613] overflow-hidden"
    >
      {/* Background Glow Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#004f39]/15 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#004f39]/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2
          className={`text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#FFFACA] mb-6 leading-tight transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ fontFamily: "var(--font-heading)" }}
        >
          <span className="text-balance">
            Dejá que Sentinel vigile para que vos puedas actuar más rápido
          </span>
        </h2>

        <p
          className={`text-lg sm:text-xl text-[#FFFACA]/60 mb-10 max-w-2xl mx-auto leading-relaxed transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Drones autónomos con IA para detectar incendios antes de que sea
          demasiado tarde.
        </p>

        <div
          className={`transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Button
            asChild
            size="lg"
            className="bg-[#004f39] hover:bg-[#003d2c] text-[#FFFACA] font-semibold rounded-full px-10 h-14 text-lg shadow-lg shadow-[#004f39]/25 hover:shadow-[#004f39]/40 transition-all hover:scale-105"
          >
            <a
              href="https://linktr.ee/sentinelarg"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Solicitar una reunión con el equipo de Sentinel"
            >
              Solicitar una Reunión
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
