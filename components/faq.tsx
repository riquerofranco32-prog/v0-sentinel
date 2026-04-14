"use client"

import { useEffect, useRef, useState } from "react"
import { Plus, Minus } from "lucide-react"

const faqs = [
  {
    question: "¿Cómo puede ayudar Sentinel en la detección de incendios forestales?",
    answer: "Utilizamos drones con cámaras térmicas e IA a bordo que analizan en tiempo real imágenes para identificar focos de calor con 95% de precisión, enviando alertas automáticas geolocalizadas.",
  },
  {
    question: "¿Es difícil implementar Sentinel en mi región?",
    answer: "No. Nuestra plataforma es cloud-based y se adapta a cualquier territorio. Solo necesitás acceso a internet y nuestro equipo se encarga del resto.",
  },
  {
    question: "¿Qué instituciones pueden beneficiarse de Sentinel?",
    answer: "Municipios, bomberos, empresas forestales, parques nacionales, productores agropecuarios y cualquier organización que gestione grandes superficies de terreno.",
  },
  {
    question: "¿Necesito conocimientos técnicos para usar Sentinel?",
    answer: "No. La interfaz está diseñada para ser intuitiva. Recibís alertas en tu dispositivo y podés tomar decisiones sin necesidad de ser un experto.",
  },
  {
    question: "¿Qué tipo de soporte ofrecen?",
    answer: "Soporte 24/7 durante operaciones críticas, onboarding personalizado y actualizaciones continuas de los modelos de IA.",
  },
]

export function FAQ() {
  const [isVisible, setIsVisible] = useState(false)
  const [openIndex, setOpenIndex] = useState<number | null>(null)
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
      id="faq"
      className="py-24 lg:py-32"
      style={{ background: "#0e100d" }}
    >
      <div className="max-w-3xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div className="mb-14">
          <p
            className={`text-[11px] tracking-[0.3em] uppercase mb-5 transition-all duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}
            style={{ fontFamily: "'Inter', sans-serif", color: "rgba(240,234,216,0.3)" }}
          >
            Preguntas frecuentes
          </p>
          <h2
            className={`text-4xl sm:text-5xl transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              color: "rgba(240,234,216,0.92)",
              lineHeight: 1.1,
            }}
          >
            Tenemos las respuestas<br />
            <span style={{ color: "#4ade80" }}>que buscás.</span>
          </h2>
        </div>

        {/* Accordion */}
        <div
          className={`border-t transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ borderColor: "rgba(240,234,216,0.08)" }}
        >
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border-b"
              style={{ borderColor: "rgba(240,234,216,0.08)" }}
            >
              <button
                className="w-full flex items-start justify-between gap-4 py-6 text-left group"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span
                  className="text-[14px] font-medium leading-snug transition-colors duration-200"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    color: openIndex === i ? "rgba(240,234,216,0.95)" : "rgba(240,234,216,0.65)",
                  }}
                >
                  {faq.question}
                </span>
                <div
                  className="flex-shrink-0 w-7 h-7 rounded-sm flex items-center justify-center mt-0.5 transition-all duration-200"
                  style={{
                    background: openIndex === i ? "rgba(74,222,128,0.15)" : "rgba(240,234,216,0.05)",
                    border: `0.5px solid ${openIndex === i ? "rgba(74,222,128,0.4)" : "rgba(240,234,216,0.1)"}`,
                  }}
                >
                  {openIndex === i
                    ? <Minus className="w-3.5 h-3.5" style={{ color: "#4ade80" }} />
                    : <Plus className="w-3.5 h-3.5" style={{ color: "rgba(240,234,216,0.4)" }} />
                  }
                </div>
              </button>

              <div
                className="overflow-hidden transition-all duration-300"
                style={{ maxHeight: openIndex === i ? "300px" : "0px" }}
              >
                <p
                  className="pb-6 text-[13px] leading-relaxed"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 300,
                    color: "rgba(240,234,216,0.45)",
                  }}
                >
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
