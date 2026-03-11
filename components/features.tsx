"use client"

import { useEffect, useRef, useState } from "react"

export function Features() {
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
      id="nosotros"
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
            Nuestra <span className="relative">
              solución
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#004f39]"></span>
            </span>.
          </h2>
        </div>

        {/* Main Solution Image */}
        <div
          className={`mb-12 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="relative rounded-2xl overflow-hidden">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/d-0eY1XCgdCNJr5FWwE0WfHb4VdN6lFe.jpg"
              alt="Sistema de drones Sentinel para detección temprana de incendios con inteligencia artificial"
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
        </div>

        {/* Sistema Integral Image */}
        <div
          className={`transition-all duration-700 delay-400 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="relative rounded-2xl overflow-hidden">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dd-5FM9OcJbCEu1IatjOnmcjtjnVYhTem.jpg"
              alt="Sistema integral de monitoreo con drones, sensores IoT y satélites para detección de incendios forestales"
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
