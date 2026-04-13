"use client"

import { useEffect, useRef, useState } from "react"

export function Features() {
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
      id="nosotros"
      className="relative py-24 lg:py-32 bg-[#0c0b09]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div className="mb-14">
          <p
            className={`text-[11px] tracking-[0.3em] uppercase mb-5 transition-all duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}
            style={{ fontFamily: "'Inter', sans-serif", color: "rgba(240,234,216,0.3)" }}
          >
            Nuestra tecnología
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
            Nuestra{" "}
            <span style={{ color: "#4ade80" }}>solución.</span>
          </h2>
        </div>

        {/* Main image */}
        <div
          className={`relative rounded-lg overflow-hidden mb-4 transition-all duration-700 delay-200 group ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/d-0eY1XCgdCNJr5FWwE0WfHb4VdN6lFe.jpg"
            alt="Sistema Sentinel — drones, IoT y satélites con IA"
            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0b09]/60 to-transparent" />
          <div
            className="absolute bottom-6 left-6 px-4 py-2 rounded-sm text-[11px] tracking-widest uppercase"
            style={{
              fontFamily: "'Inter', sans-serif",
              background: "rgba(0,79,57,0.7)",
              border: "0.5px solid rgba(74,222,128,0.3)",
              color: "#4ade80",
            }}
          >
            Sistema Sentinel
          </div>
        </div>

        {/* Second image */}
        <div
          className={`relative rounded-lg overflow-hidden transition-all duration-700 delay-400 group ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dd-5FM9OcJbCEu1IatjOnmcjtjnVYhTem.jpg"
            alt="Sistema integral — monitoreo con drones, sensores y satélites"
            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0b09]/60 to-transparent" />
          <div
            className="absolute bottom-6 left-6 px-4 py-2 rounded-sm text-[11px] tracking-widest uppercase"
            style={{
              fontFamily: "'Inter', sans-serif",
              background: "rgba(0,79,57,0.7)",
              border: "0.5px solid rgba(74,222,128,0.3)",
              color: "#4ade80",
            }}
          >
            Cobertura integral
          </div>
        </div>

      </div>
    </section>
  )
}
