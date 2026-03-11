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
      {/* Block 1 - Emergency Hook */}
      <div className="py-20 lg:py-28 bg-gradient-to-b from-[#080c08] via-[#1a0a0a] to-[#1a0a0a]">
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
                className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 transition-all duration-700 delay-100 ${
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
                className={`text-white/70 text-lg leading-relaxed mb-8 transition-all duration-700 delay-200 ${
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
                  <div className="text-xs sm:text-sm text-white/50">Hectáreas quemadas</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-red-400" style={{ fontFamily: "var(--font-heading)" }}>
                    95%
                  </div>
                  <div className="text-xs sm:text-sm text-white/50">Causa humana</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-red-400" style={{ fontFamily: "var(--font-heading)" }}>
                    Irreversible
                  </div>
                  <div className="text-xs sm:text-sm text-white/50">Daño a fauna</div>
                </div>
              </div>
            </div>

            {/* Right Content - Problem Cards */}
            <div
              className={`space-y-4 transition-all duration-700 delay-400 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <div className="bg-[#1a0808] border border-red-500/20 rounded-xl p-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Trees className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Pulmón Verde en Riesgo</h4>
                    <p className="text-white/50 text-sm">Bosques nativos que tardan décadas en regenerarse se pierden en horas.</p>
                  </div>
                </div>
              </div>
              <div className="bg-[#1a0808] border border-red-500/20 rounded-xl p-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Comunidades Amenazadas</h4>
                    <p className="text-white/50 text-sm">Familias enteras pierden sus hogares y su sustento económico.</p>
                  </div>
                </div>
              </div>
              <div className="bg-[#1a0808] border border-red-500/20 rounded-xl p-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <ShieldAlert className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Respuesta Insuficiente</h4>
                    <p className="text-white/50 text-sm">Los brigadistas arriesgan su vida con recursos limitados.</p>
                  </div>
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
            className={`text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-12 text-center transition-all duration-700 ${
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
              <div className="inline-block bg-red-500 text-white text-sm font-semibold px-3 py-1 rounded mb-4">
                Valor Pre-Incendio:
              </div>
              <p className="text-white/70 mb-2">Una chacra en Puerto Patriada cotiza entre</p>
              <p className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>
                <span className="text-[#22c55e]">$47,000</span> y <span className="text-[#22c55e]">$130,000 USD</span>
              </p>
              <p className="text-white/50 text-sm">por hectárea.</p>
            </div>

            <div className={`bg-[#0a0808] border border-red-500/20 rounded-xl p-6 transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}>
              <div className="inline-block bg-red-500 text-white text-sm font-semibold px-3 py-1 rounded mb-4">
                Valor Post-Incendio:
              </div>
              <p className="text-white/70 mb-2">El valor cae entre un</p>
              <p className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>
                <span className="text-red-400">40%</span> y un <span className="text-red-400">60%</span>
              </p>
              <p className="text-white/50 text-sm">USD $18,000 - $40,000 / ha</p>
            </div>

            <div className={`bg-[#0a0808] border border-red-500/20 rounded-xl p-6 transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}>
              <div className="inline-block bg-red-500 text-white text-sm font-semibold px-3 py-1 rounded mb-4">
                La cuenta:
              </div>
              <p className="text-white/70 mb-2">La quema de 100 hectáreas significa una pérdida patrimonial de</p>
              <p className="text-2xl font-bold text-red-400" style={{ fontFamily: "var(--font-heading)" }}>
                ~$5,000,000 USD
              </p>
              <p className="text-white/50 text-sm">25% del presupuesto nacional de manejo del fuego.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Block 3 - Budget Crisis */}
      <div className="py-20 lg:py-28 bg-gradient-to-b from-[#1a0808] to-[#080c08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3
            className={`text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ fontFamily: "var(--font-heading)" }}
          >
            La prevención en números <span className="text-red-400">rojos</span>
          </h3>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className={`bg-[#0f1a0f] border border-red-500/20 rounded-xl p-6 transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}>
              <div className="inline-block bg-red-500 text-white text-sm font-semibold px-3 py-1 rounded mb-4">
                Recorte del 78%:
              </div>
              <p className="text-white/70">
                El Presupuesto 2026 del Servicio Nacional de Manejo del Fuego{" "}
                <span className="text-red-400 font-semibold">se redujo drásticamente</span> en términos reales.
              </p>
            </div>

            <div className={`bg-[#0f1a0f] border border-red-500/20 rounded-xl p-6 transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}>
              <div className="inline-block bg-red-500 text-white text-sm font-semibold px-3 py-1 rounded mb-4">
                Dinero sin usar:
              </div>
              <p className="text-white/70">
                En 2025, <span className="text-red-400 font-semibold">el 25% del presupuesto asignado no se ejecutó</span>.
                La plata estaba, pero no se usó para equipar a los que nos cuidan.
              </p>
            </div>

            <div className={`bg-[#0f1a0f] border border-red-500/20 rounded-xl p-6 transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}>
              <div className="inline-block bg-red-500 text-white text-sm font-semibold px-3 py-1 rounded mb-4">
                Presupuesto actual:
              </div>
              <p className="text-white/70">
                En 2026 el presupuesto para en servicio nacional de manejo del fuego (SNMF) es de{" "}
                <span className="text-[#22c55e] font-semibold">$ 20.131 Millones</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Transition CTA */}
      <div className="py-16 bg-gradient-to-r from-[#0f1a0f] via-[#1a2e1a] to-[#0f1a0f] border-y border-[#22c55e]/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3
            className={`text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ fontFamily: "var(--font-heading)" }}
          >
            La solución <span className="text-[#22c55e]">existe</span>.
          </h3>
          <p
            className={`text-xl text-white/70 mb-8 transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Detectar antes de que sea demasiado tarde.
          </p>
          <Button
            asChild
            size="lg"
            className={`bg-[#22c55e] hover:bg-[#16a34a] text-[#080c08] font-semibold rounded-full px-8 h-12 transition-all duration-700 delay-200 ${
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
