"use client"

import { useEffect, useRef, useState } from "react"

const awards = [
  {
    logo: "ILAN",
    logoUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-FbhxBpUrczxoVxCvvgu18wYEHsffZT.png",
    title: "ILAN–UTN 2025 – Ganadores",
    description: "Premiados como la solución tecnológica más innovadora del certamen, con viaje a Israel para una misión de innovación.",
    bgColor: "bg-[#1a1c18]",
  },
  {
    logo: "sadosky",
    logoUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-OlQRPIjilvD7DCsYlwTYG8K1fTFOAW.png",
    title: "Premios Sadosky 2025 – Startup del Año (Finalistas)",
    description: "Finalistas en la categoría Mejor Startup del Año 2025 y Solución Innovadora, uno de los reconocimientos más prestigiosos del sector tecnológico argentino. Este logro valida la solidez técnica, el impacto y la innovación del modelo de Sentinel.",
    bgColor: "bg-[#1a1c18]",
  },
  {
    logo: "UE",
    logoUrl: "/images/usina-emprendedores.png",
    title: "Usina de Emprendedores – 3° Puesto Nacional",
    description: "Tercer lugar entre emprendimientos de alto potencial elegidos a nivel nacional. Destaca nuestra propuesta de valor, escalabilidad y viabilidad dentro del ecosistema emprendedor argentino.",
    bgColor: "bg-[#1a1c18]",
  },
  {
    logo: "prendete",
    logoUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-6R61i0qgkLFn7dgeVBp8FeqFpk1tGH.png",
    title: "Premios Prendete 2025 – Finalistas (Categoría Jump)",
    description: "Seleccionados como finalistas en la categoría Jump, que premia soluciones innovadoras con potencial de crecimiento acelerado. Este reconocimiento refuerza la validación de Sentinel como plataforma tecnológica escalable y de impacto regional.",
    bgColor: "bg-[#1a1c18]",
  },
  {
    logo: "BNA",
    logoUrl: "/images/banco-nacion.png",
    title: "Concurso Soluciones Innovadoras BNA 2025",
    description: "¡Nuestro proyecto fue seleccionado entre más de 700 propuestas para avanzar a la segunda etapa del Concurso Soluciones Innovadoras BNA 2025! Participaremos del Proceso de Formación y Asistencia, con 8 encuentros diseñados para potenciar proyectos con impacto. Gracias al Banco Nación por esta oportunidad.",
    bgColor: "bg-[#1a1c18]",
  },
  {
    logo: "JIJE",
    logoUrl: "/images/jije.png",
    title: "JIJE 2025 – Mejor Modelo de Negocio (Ganadores)",
    description: "Reconocidos como el modelo de mayor impacto entre decenas de iniciativas innovadoras, reforzando la escalabilidad y el fit de nuestro negocio.",
    bgColor: "bg-[#1a1c18]",
  },
]

const alliances = [
  {
    logo: "forestal",
    logoUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-LBLZI8wQAHgIHdM0dePvMxHiu9itDd.png",
    title: "FORESTAL ARGENTINA",
    description: "Esta empresa nos proporcionó más de 40 registros históricos de incendios forestales, incluyendo ubicación, imágenes y cronologías de propagación. Esta información fue clave para validar la precisión del sistema y ajustar nuestra IA a los patrones reales del territorio.",
  },
  {
    logo: "bomberos",
    logoUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-wnFztR7AmvzL7yfAesx0WInxKV78y7.png",
    title: "BOMBEROS DE SAN RAFAEL",
    description: "Trabajamos junto al cuerpo de bomberos local en pruebas de campo con escenarios reales. Gracias a su colaboración, obtuvimos más de 100 imágenes térmicas que fueron utilizadas para entrenar nuestros algoritmos de detección de humo y fuego. Esta validación técnica es clave para garantizar que Sentinel funcione en situaciones reales.",
  },
  {
    logo: "patagonia",
    logoUrl: "/images/fundacion-patagonia.png",
    title: "Fundación Patagonia Natural",
    description: "ONG reconocida por su compromiso ambiental, que nos acompaña en la construcción de una propuesta coherente con criterios de sostenibilidad y conservación. Su aval respalda nuestra misión de actuar en defensa de los ecosistemas vulnerables.",
  },
  {
    logo: "sanrafael",
    logoUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jbF8OT2TdgOSxqsCo1K53IO6LezhGl.png",
    title: "Municipalidad de San Rafael",
    description: "Establecimos una relación directa con la Dirección de Espacios Verdes y Medio Ambiente, quienes nos brindaron respaldo institucional y acceso a áreas protegidas para patrullaje experimental. Este vínculo demuestra el interés local por adoptar soluciones tecnológicas en la gestión de riesgos.",
  },
  {
    logo: "uba",
    logoUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-pfFAV3OybYvGE77kv4YtwR5kUoQnKH.png",
    title: "Universidad de Buenos Aires – Facultad de Ciencias Económicas",
    description: "Sentinel fue uno de los casos presentados en el Kick Off de la materia Plan de Marketing Digital del Máster de la UBA, en una actividad organizada por Movistar Argentina. Llevamos nuestra propuesta de tecnología para la prevención de incendios al aula, conectando innovación y educación.",
  },
  {
    logo: "endeavor",
    logoUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-djt9o0pbHI6wT0lB1WQnGc7Neqm112.png",
    title: "Endeavor – Meet the Companies",
    description: "Seleccionados por Endeavor Cuyo para mentoría y apoyo estratégico, validando nuestro potencial de crecimiento regional e internacional.",
  },
  {
    logo: "naves",
    logoUrl: "/images/naves.png",
    title: "NAVES – IAE Business School",
    description: "Seleccionados para participar en el principal programa de aceleración empresarial de Argentina, validando nuestro modelo de negocio, impacto y escalabilidad.",
  },
  {
    logo: "uncuyo",
    logoUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-f2aKShLLfBgotbD3g3nvZ3BUVMUdL0.png",
    title: "Programa de Incubación UNCUYO",
    description: "Seleccionados para incubación y mentoría por la Universidad Nacional de Cuyo, fortaleciendo nuestro desarrollo tecnológico y estrategia de go-to-market.",
  },
]

export function Awards() {
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
      id="noticias"
      className="py-24 lg:py-32 bg-[#151613]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FFFACA] mb-4 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Nuestra Validación
          </h2>
        </div>

        {/* Premios Section */}
        <div className="mb-20">
          <h3
            className={`text-3xl sm:text-4xl font-bold text-[#FFFACA] mb-8 transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Premios
          </h3>
          
          <div
            className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {awards.map((award, index) => (
              <div
                key={index}
                className="bg-[#0a0c0a] border border-[#004f39]/30 rounded-2xl p-6 hover:border-[#004f39]/60 transition-all"
              >
                {/* Logo Area */}
                <div className="h-24 flex items-center justify-start mb-4">
                  <div className="bg-white rounded-lg p-3 h-20 flex items-center justify-center">
                    <img
                      src={award.logoUrl}
                      alt={award.title}
                      className="max-h-14 max-w-[180px] w-auto object-contain"
                    />
                  </div>
                </div>
                
                <h4 className="font-bold text-[#FFFACA] text-lg mb-3">
                  {award.title}
                </h4>
                <p className="text-[#FFFACA]/60 text-sm leading-relaxed">
                  {award.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Alianzas Section */}
        <div>
          <h3
            className={`text-3xl sm:text-4xl font-bold text-[#FFFACA] mb-8 transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Alianzas Estratégicas
          </h3>
          
          <div
            className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 delay-400 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {alliances.slice(0, 6).map((alliance, index) => (
              <div
                key={index}
                className="bg-[#0a0c0a] border border-[#004f39]/30 rounded-2xl p-6 hover:border-[#004f39]/60 transition-all"
              >
                {/* Logo Area */}
                <div className="h-20 flex items-center justify-start mb-4">
                  <div className="bg-white rounded-lg p-3 h-16 flex items-center justify-center">
                    <img
                      src={alliance.logoUrl}
                      alt={alliance.title}
                      className="max-h-12 max-w-[160px] w-auto object-contain"
                    />
                  </div>
                </div>
                
                <h4 className="font-bold text-[#FFFACA] text-lg mb-3">
                  {alliance.title}
                </h4>
                <p className="text-[#FFFACA]/60 text-sm leading-relaxed">
                  {alliance.description}
                </p>
              </div>
            ))}
          </div>

          {/* Last 2 alliances - centered */}
          <div
            className={`grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mt-6 transition-all duration-700 delay-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {alliances.slice(6).map((alliance, index) => (
              <div
                key={index}
                className="bg-[#0a0c0a] border border-[#004f39]/30 rounded-2xl p-6 hover:border-[#004f39]/60 transition-all"
              >
                {/* Logo Area */}
                <div className="h-20 flex items-center justify-start mb-4">
                  <div className="bg-white rounded-lg p-3 h-16 flex items-center justify-center">
                    <img
                      src={alliance.logoUrl}
                      alt={alliance.title}
                      className="max-h-12 max-w-[160px] w-auto object-contain"
                    />
                  </div>
                </div>
                
                <h4 className="font-bold text-[#FFFACA] text-lg mb-3">
                  {alliance.title}
                </h4>
                <p className="text-[#FFFACA]/60 text-sm leading-relaxed">
                  {alliance.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Nuestros Logros - Full Width Image */}
        <div className="mt-16">
          <div
            className={`relative rounded-2xl overflow-hidden transition-all duration-700 delay-600 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ccc-gALQ3KWjawlF9rnPDmzFmx33ahTdAz.png"
              alt="Nuestros logros - Ganadores de premios ILAN, JIJE, Sadosky, Usina Emprendedores"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Event Photo */}
        <div className="mt-8">
          <div
            className={`relative rounded-2xl overflow-hidden aspect-video max-w-4xl mx-auto transition-all duration-700 delay-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AGRADECIMIENTOS.png-5OTA6U7D0gfG9BTAJJXyKQwQIhtxO1.jpeg"
              alt="Equipo Sentinel en Prendete y Premios Sadosky"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#151613]/80 to-transparent" />
            <div className="absolute bottom-4 left-4">
              <span className="text-[#FFFACA]/80 text-sm font-medium">Prendete & Premios Sadosky</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
