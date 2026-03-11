"use client"

import { useEffect, useRef, useState } from "react"

export function Team() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section 
      ref={sectionRef}
      id="equipo"
      className="relative py-24 lg:py-32 bg-[#151613]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FFFACA] mb-2 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Nuestro equipo.
          </h2>
          <div className={`w-48 h-0.5 bg-[#004f39]/70 transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`} />
        </div>

        {/* Team Photo - Full Width */}
        <div 
          className={`relative rounded-2xl overflow-hidden transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dddd-M6Ef54CFMRyZqIfjY2lUznWajCrIGK.jpg"
            alt="Equipo Sentinel - Nuestro equipo de fundadores"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </section>
  )
}
