"use client"
import { useEffect, useRef, useState } from "react"

export function Team() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.05 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])
  return (
    <section
      ref={sectionRef}
      id="equipo"
      className="relative py-24 lg:py-32 bg-[#0c0b09]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="mb-14">
          <p
            className={`text-[11px] tracking-[0.3em] uppercase mb-5 transition-all duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}
            style={{ fontFamily: "'Inter', sans-serif", color: "rgba(240,234,216,0.3)" }}
          >
            Las personas detrás
          </p>
          <h2
            className={`text-4xl sm:text-5xl lg:text-6xl transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              color: "rgba(240,234,216,0.92)",
              lineHeight: 1,
            }}
          >
            Nuestro{" "}
            <span style={{ color: "#4ade80" }}>equipo.</span>
          </h2>
        </div>
        {/* Team photo */}
        <div
          className={`relative rounded-lg overflow-hidden mb-10 transition-all duration-700 delay-200 group ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dddd-M6Ef54CFMRyZqIfjY2lUznWajCrIGK.jpg"
            alt="Equipo Sentinel"
            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0b09]/70 via-transparent to-transparent" />
        </div>
      </div>
    </section>
  )
}
