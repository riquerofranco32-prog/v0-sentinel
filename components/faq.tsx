"use client"

import { useEffect, useRef, useState } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "¿Cómo puede ayudar Sentinel en la detección de incendios forestales?",
    answer:
      "Utilizamos drones con cámaras térmicas y IA a bordo que analizan en tiempo real imágenes para identificar focos de calor con 95% de precisión, enviando alertas automáticas geolocalizadas.",
  },
  {
    question: "¿Es difícil implementar Sentinel en mi región?",
    answer:
      "No. Nuestra plataforma es cloud-based y se adapta a cualquier territorio. Solo necesitás acceso a internet y nuestro equipo se encarga del resto.",
  },
  {
    question: "¿Qué instituciones pueden beneficiarse de Sentinel?",
    answer:
      "Municipios, bomberos, empresas forestales, parques nacionales, productores agropecuarios y cualquier organización que gestione grandes superficies de terreno.",
  },
  {
    question: "¿Necesito conocimientos técnicos para usar Sentinel?",
    answer:
      "No. La interfaz está diseñada para ser intuitiva. Recibís alertas en tu dispositivo y podés tomar decisiones sin necesidad de ser un experto.",
  },
  {
    question: "¿Qué tipo de soporte ofrecen?",
    answer:
      "Soporte 24/7 durante operaciones críticas, onboarding personalizado y actualizaciones continuas de los modelos de IA.",
  },
]

export function FAQ() {
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
    <section ref={sectionRef} id="faq" className="py-24 lg:py-32 bg-[#151613]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FFFACA] mb-4 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Tenemos las Respuestas que Buscás
          </h2>
        </div>

        {/* Accordion */}
        <div
          className={`transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-[#1a1c18] border border-[#FFFACA]/10 rounded-xl px-6 data-[state=open]:border-[#004f39]/50"
              >
                <AccordionTrigger className="text-left text-[#FFFACA] hover:text-[#FFFACA]/80 hover:no-underline py-5 [&[data-state=open]>svg]:text-[#004f39]">
                  <span className="font-medium pr-4">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-[#FFFACA]/60 pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
