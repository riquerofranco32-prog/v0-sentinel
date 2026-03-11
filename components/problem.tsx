"use client"

import { useEffect, useRef, useState } from "react"
import { AlertTriangle, Trees, Users, ShieldAlert, TrendingDown, DollarSign, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Problem() {
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
    <section ref={sectionRef} className="relative">
      {/* Hero Image - Firefighters */}
      <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/267-OTOcu9EUVLZS8Z5p5N46egBZitm0qj.jpg"
          alt="Bomberos enfrentando incendio forestal masivo en la Patagonia"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#151613] via-[#151613]/30 to-transparent" />
        
        {/* Overlay Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <div className="max-w-4xl">
            <h2
              className={`text-4xl sm:text-5xl lg:text-6xl font-bold text-[#FFFACA] mb-4 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Hoy la Patagonia duele.
            </h2>
            <p
              className={`text-xl sm:text-2xl text-[#FFFACA]/80 transition-all duration-700 delay-100 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              No es solo bosque lo que se quema. Es el futuro de nuestras economías.
            </p>
          </div>
        </div>
      </div>

      {/* Block 1 - Emergency Hook */}
      <div className="py-20 lg:py-28 bg-gradient-to-b from-[#151613] via-[#1a0a0a] to-[#1a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Emergency Badge */}
          <div
            className={`inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-full px-4 py-2 mb-8 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
            }`}
          >
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-sm text-red-400 font-medium uppercase tracking-wider">
              Emergencia Nacional
            </span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Content */}
            <div>
              <h2
                className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FFFACA] mb-2 transition-all duration-700 delay-100 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Hoy la Patagonia duele.
              </h2>
              <h3
                className={`text-2xl sm:text-3xl lg:text-4xl font-bold text-red-400 mb-6 transition-all duration-700 delay-150 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Pero hay una realidad que debemos enfrentar.
              </h3>
              <p
                className={`text-[#FFFACA]/70 text-lg leading-relaxed mb-8 transition-all duration-700 delay-200 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                No es solo bosque lo que se quema. Es el futuro de nuestras economías.
                Más de 1 millón de hectáreas perdidas en Corrientes. Bosques milenarios 
                desapareciendo en la Patagonia. No son solo árboles: son hogares, 
                biodiversidad única y el futuro económico de nuestras provincias.
              </p>

              {/* Stats Row */}
              <div
                className={`grid grid-cols-3 gap-4 transition-all duration-700 delay-300 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-red-400" style={{ fontFamily: "var(--font-heading)" }}>
                    1M+
                  </div>
                  <div className="text-xs sm:text-sm text-[#FFFACA]/50">Hectáreas quemadas</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-red-400" style={{ fontFamily: "var(--font-heading)" }}>
                    95%
                  </div>
                  <div className="text-xs sm:text-sm text-[#FFFACA]/50">Causa humana</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-red-400" style={{ fontFamily: "var(--font-heading)" }}>
                    Irreversible
                  </div>
                  <div className="text-xs sm:text-sm text-[#FFFACA]/50">Daño a fauna</div>
                </div>
              </div>
            </div>

            {/* Right Content - Fire Images Gallery */}
            <div
              className={`transition-all duration-700 delay-400 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <div className="grid grid-cols-2 gap-3">
                <div className="relative overflow-hidden rounded-xl aspect-[4/5]">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/a2-sCSrBbHtMQFzFqp4eBBIvUs8dgnrEh.jpg"
                    alt="Incendio forestal nocturno con llamas reflejándose en el lago"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="relative overflow-hidden rounded-xl aspect-[4/5]">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/a-ctE13dVLBzJmNQfjnPbHhp9EhxtVRw.jpg"
                    alt="Vista aérea de incendio forestal masivo"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="relative overflow-hidden rounded-xl aspect-[4/5]">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/a3-oiXPvEaaqCu4FDqlu6UlcDIRhaaex6.jpg"
                    alt="Incendio forestal avanzando sobre montañas patagónicas"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="relative overflow-hidden rounded-xl aspect-[4/5]">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/a1-dL77IHIBwasbZgslhBmZWAQ2XQHJdk.jpg"
                    alt="Múltiples perspectivas de incendios forestales devastadores"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
              </div>
            </div>
          </div>

          {/* Problem Cards Row */}
          <div
            className={`grid md:grid-cols-3 gap-4 mt-12 transition-all duration-700 delay-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="bg-[#1a0808] border border-red-500/20 rounded-xl p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Trees className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#FFFACA] mb-1">Pulmón Verde en Riesgo</h4>
                  <p className="text-[#FFFACA]/50 text-sm">Bosques nativos que tardan décadas en regenerarse se pierden en horas.</p>
                </div>
              </div>
            </div>
            <div className="bg-[#1a0808] border border-red-500/20 rounded-xl p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#FFFACA] mb-1">Comunidades Amenazadas</h4>
                  <p className="text-[#FFFACA]/50 text-sm">Familias enteras pierden sus hogares y su sustento económico.</p>
                </div>
              </div>
            </div>
            <div className="bg-[#1a0808] border border-red-500/20 rounded-xl p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <ShieldAlert className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#FFFACA] mb-1">Respuesta Insuficiente</h4>
                  <p className="text-[#FFFACA]/50 text-sm">Los brigadistas arriesgan su vida con recursos limitados.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Block 2 - Economic Reality */}
      <div className="py-20 lg:py-28 bg-gradient-to-b from-[#1a0a0a] to-[#1a0808]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3
            className={`text-2xl sm:text-3xl lg:text-4xl font-bold text-[#FFFACA] mb-12 text-center transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Lo Irrecuperable
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            <div className={`bg-[#0a0808] border border-red-500/20 rounded-xl p-6 transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}>
              <div className="inline-block bg-red-500 text-[#FFFACA] text-sm font-semibold px-3 py-1 rounded mb-4">
                Valor Pre-Incendio:
              </div>
              <p className="text-[#FFFACA]/70 mb-2">Una chacra en Puerto Patriada cotiza entre</p>
              <p className="text-2xl font-bold text-[#FFFACA]" style={{ fontFamily: "var(--font-heading)" }}>
                <span className="text-[#004f39]">$47,000</span> y <span className="text-[#004f39]">$130,000 USD</span>
              </p>
              <p className="text-[#FFFACA]/50 text-sm">por hectárea.</p>
            </div>

            <div className={`bg-[#0a0808] border border-red-500/20 rounded-xl p-6 transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}>
              <div className="inline-block bg-red-500 text-[#FFFACA] text-sm font-semibold px-3 py-1 rounded mb-4">
                Valor Post-Incendio:
              </div>
              <p className="text-[#FFFACA]/70 mb-2">El valor cae entre un</p>
              <p className="text-2xl font-bold text-[#FFFACA]" style={{ fontFamily: "var(--font-heading)" }}>
                <span className="text-red-400">40%</span> y un <span className="text-red-400">60%</span>
              </p>
              <p className="text-[#FFFACA]/50 text-sm">USD $18,000 - $40,000 / ha</p>
            </div>

            <div className={`bg-[#0a0808] border border-red-500/20 rounded-xl p-6 transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}>
              <div className="inline-block bg-red-500 text-[#FFFACA] text-sm font-semibold px-3 py-1 rounded mb-4">
                La cuenta:
              </div>
              <p className="text-[#FFFACA]/70 mb-2">La quema de 100 hectáreas significa una pérdida patrimonial de</p>
              <p className="text-2xl font-bold text-red-400" style={{ fontFamily: "var(--font-heading)" }}>
                ~$5,000,000 USD
              </p>
              <p className="text-[#FFFACA]/50 text-sm">25% del presupuesto nacional de manejo del fuego.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Block 3 - Budget Crisis */}
      <div className="py-20 lg:py-28 bg-gradient-to-b from-[#1a0808] to-[#151613]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3
            className={`text-2xl sm:text-3xl lg:text-4xl font-bold text-[#FFFACA] mb-4 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ fontFamily: "var(--font-heading)" }}
          >
            La prevención en números <span className="text-red-400">rojos</span>
          </h3>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className={`bg-[#1a1c18] border border-red-500/20 rounded-xl p-6 transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}>
              <div className="inline-block bg-red-500 text-[#FFFACA] text-sm font-semibold px-3 py-1 rounded mb-4">
                Recorte del 78%:
              </div>
              <p className="text-[#FFFACA]/70">
                El Presupuesto 2026 del Servicio Nacional de Manejo del Fuego{" "}
                <span className="text-red-400 font-semibold">se redujo drásticamente</span> en términos reales.
              </p>
            </div>

            <div className={`bg-[#1a1c18] border border-red-500/20 rounded-xl p-6 transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}>
              <div className="inline-block bg-red-500 text-[#FFFACA] text-sm font-semibold px-3 py-1 rounded mb-4">
                Dinero sin usar:
              </div>
              <p className="text-[#FFFACA]/70">
                En 2025, <span className="text-red-400 font-semibold">el 25% del presupuesto asignado no se ejecutó</span>.
                La plata estaba, pero no se usó para equipar a los que nos cuidan.
              </p>
            </div>

            <div className={`bg-[#1a1c18] border border-red-500/20 rounded-xl p-6 transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}>
              <div className="inline-block bg-red-500 text-[#FFFACA] text-sm font-semibold px-3 py-1 rounded mb-4">
                Presupuesto actual:
              </div>
              <p className="text-[#FFFACA]/70">
                En 2026 el presupuesto para en servicio nacional de manejo del fuego (SNMF) es de{" "}
                <span className="text-[#004f39] font-semibold">$ 20.131 Millones</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Transition CTA */}
      <div className="py-16 bg-gradient-to-r from-[#151613] via-[#1a2e1a] to-[#151613] border-y border-[#004f39]/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3
            className={`text-2xl sm:text-3xl lg:text-4xl font-bold text-[#FFFACA] mb-4 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ fontFamily: "var(--font-heading)" }}
          >
            La solución <span className="text-[#004f39]">existe</span>.
          </h3>
          <p
            className={`text-xl text-[#FFFACA]/70 mb-8 transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Detectar antes de que sea demasiado tarde.
          </p>
          <Button
            asChild
            size="lg"
            className={`bg-[#004f39] hover:bg-[#003d2c] text-[#FFFACA] font-semibold rounded-full px-8 h-12 transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <a href="#servicios">
              Ver cómo funciona
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
