"use client"

import { useEffect, useRef, useState } from "react"

const awards = [
  {
    logo: "ILAN",
    logoSubtext: "ISRAEL+LATIN AMERICAN\nNETWORK",
    title: "ILAN–UTN 2025 – Ganadores",
    description: "Premiados como la solución tecnológica más innovadora del certamen, con viaje a Israel para una misión de innovación.",
    bgColor: "bg-[#1a1c18]",
    badge: "ganador",
  },
  {
    logo: "sadosky",
    logoImage: true,
    title: "Premios Sadosky 2025 – Startup del Año (Ganadores)",
    description: "Ganadores en la categoría Mejor Startup del Año 2025 y Solución Innovadora, uno de los reconocimientos más prestigiosos del sector tecnológico argentino. Este logro valida la solidez técnica, el impacto y la innovación del modelo de Sentinel.",
    bgColor: "bg-[#1a1c18]",
    badge: "ganador",
  },
  {
    logo: "UE",
    logoImage: true,
    title: "Usina de Emprendedores – 3° Puesto Nacional",
    description: "Tercer lugar entre emprendimientos de alto potencial elegidos a nivel nacional. Destaca nuestra propuesta de valor, escalabilidad y viabilidad dentro del ecosistema emprendedor argentino.",
    bgColor: "bg-[#1a1c18]",
    badge: "ganador",
  },
  {
    logo: "prendete",
    logoImage: true,
    title: "Premios Prendete 2025 – Ganadores (Categoría Jump)",
    description: "Ganadores en la categoría Jump, que premia soluciones innovadoras con potencial de crecimiento acelerado. Este reconocimiento refuerza la validación de Sentinel como plataforma tecnológica escalable y de impacto regional.",
    bgColor: "bg-[#1a1c18]",
    badge: "ganador",
  },
  {
    logo: "BNA",
    logoImage: true,
    title: "Concurso Soluciones Innovadoras BNA 2025",
    description: "¡Nuestro proyecto fue seleccionado entre más de 700 propuestas para avanzar a la segunda etapa del Concurso Soluciones Innovadoras BNA 2025! Participaremos del Proceso de Formación y Asistencia, con 8 encuentros diseñados para potenciar proyectos con impacto. Gracias al Banco Nación por esta oportunidad.",
    bgColor: "bg-[#1a1c18]",
    badge: "finalista",
  },
  {
    logo: "JIJE",
    logoImage: true,
    title: "JIJE 2025 – Mejor Modelo de Negocio (Ganadores)",
    description: "Reconocidos como el modelo de mayor impacto entre decenas de iniciativas innovadoras, reforzando la escalabilidad y el fit de nuestro negocio.",
    bgColor: "bg-[#1a1c18]",
    badge: "ganador",
  },
]

const alliances = [
  {
    logo: "forestal",
    logoImage: true,
    title: "FORESTAL ARGENTINA",
    description: "Esta empresa nos proporcionó más de 40 registros históricos de incendios forestales, incluyendo ubicación, imágenes y cronologías de propagación. Esta información fue clave para validar la precisión del sistema y ajustar nuestra IA a los patrones reales del territorio.",
  },
  {
    logo: "bomberos",
    logoImage: true,
    title: "BOMBEROS DE SAN RAFAEL",
    description: "Trabajamos junto al cuerpo de bomberos local en pruebas de campo con escenarios reales. Gracias a su colaboración, obtuvimos más de 100 imágenes térmicas que fueron utilizadas para entrenar nuestros algoritmos de detección de humo y fuego. Esta validación técnica es clave para garantizar que Sentinel funcione en situaciones reales.",
  },
  {
    logo: "patagonia",
    logoImage: true,
    title: "Fundación Patagonia Natural",
    description: "ONG reconocida por su compromiso ambiental, que nos acompaña en la construcción de una propuesta coherente con criterios de sostenibilidad y conservación. Su aval respalda nuestra misión de actuar en defensa de los ecosistemas vulnerables.",
  },
  {
    logo: "sanrafael",
    logoImage: true,
    title: "Municipalidad de San Rafael",
    description: "Establecimos una relación directa con la Dirección de Espacios Verdes y Medio Ambiente, quienes nos brindaron respaldo institucional y acceso a áreas protegidas para patrullaje experimental. Este vínculo demuestra el interés local por adoptar soluciones tecnológicas en la gestión de riesgos.",
  },
  {
    logo: "uba",
    logoImage: true,
    title: "Universidad de Buenos Aires – Facultad de Ciencias Económicas",
    description: "Sentinel fue uno de los casos presentados en el Kick Off de la materia Plan de Marketing Digital del Máster de la UBA, en una actividad organizada por Movistar Argentina. Llevamos nuestra propuesta de tecnología para la prevención de incendios al aula, conectando innovación y educación.",
  },
  {
    logo: "endeavor",
    logoImage: true,
    title: "Endeavor – Meet the Companies",
    description: "Seleccionados por Endeavor Cuyo para mentoría y apoyo estratégico, validando nuestro potencial de crecimiento regional e internacional.",
  },
  {
    logo: "naves",
    logoImage: true,
    title: "NAVES – IAE Business School",
    description: "Seleccionados para participar en el principal programa de aceleración empresarial de Argentina, validando nuestro modelo de negocio, impacto y escalabilidad.",
  },
  {
    logo: "uncuyo",
    logoImage: true,
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
                className="relative bg-[rgba(0,79,57,0.08)] border border-[#FFFACA]/10 rounded-2xl p-6 hover:border-[#004f39]/60 transition-all card-hover"
              >
                {/* Badge */}
                {award.badge && (
                  <div className="absolute top-4 right-4">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full tracking-wider uppercase ${
                      award.badge === "ganador" 
                        ? "bg-[#004f39] text-[#FFFACA]" 
                        : "bg-[#FFFACA]/10 text-[#FFFACA]/70"
                    }`}>
                      {award.badge === "ganador" ? "Ganadores" : "Finalistas"}
                    </span>
                  </div>
                )}
                {/* Logo Area */}
                <div className="h-24 flex items-center justify-start mb-4">
                  {award.logo === "ILAN" ? (
                    <div className="bg-white rounded-lg p-2 h-20 flex items-center">
                      <img 
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-mIq8y4N1ZE0TlcMVzuVVRd9fkU0eOQ.png" 
                        alt="ILAN - Israel+Latin American Network" 
                        className="h-full w-auto object-contain"
                      />
                    </div>
                  ) : award.logo === "sadosky" ? (
                    <div className="bg-white rounded-lg p-2 h-20 flex items-center">
                      <img 
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-O2jrcTC0dEtLWElzxkW4b9bRtM6ol2.png" 
                        alt="Premios Sadosky 20 Aniversario" 
                        className="h-full w-auto object-contain"
                      />
                    </div>
                  ) : award.logo === "UE" ? (
                    <div className="bg-white rounded-lg px-4 py-3">
                      <div className="flex items-center gap-1">
                        <span className="text-2xl font-bold text-teal-600">U</span>
                        <span className="text-2xl font-bold text-orange-500">E</span>
                        <div className="text-xs text-gray-600 ml-2">
                          <div>Usina de</div>
                          <div className="font-semibold">Emprendedores</div>
                        </div>
                      </div>
                    </div>
                  ) : award.logo === "prendete" ? (
                    <div className="bg-white rounded-lg p-2 h-20 flex items-center">
                      <img 
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-gyNye74f9lUS067E5CLCLSSSXElw4c.png" 
                        alt="Prendete - Impulsa tu idea al exito" 
                        className="h-full w-auto object-contain"
                      />
                    </div>
                  ) : award.logo === "BNA" ? (
                    <div className="bg-white rounded-lg p-2 h-20 flex items-center">
                      <img 
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Lpglp1MasxEDLphITuVBeSkq6id7Vg.png" 
                        alt="Banco Nacion" 
                        className="h-full w-auto object-contain"
                      />
                    </div>
                  ) : award.logo === "JIJE" ? (
                    <div className="rounded-lg overflow-hidden h-20 flex items-center">
                      <img 
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-YPNhlbesfbm8ahhUfnTwRlcLrXMkKW.png" 
                        alt="JIJE - Jornadas Internacionales de Jóvenes Emprendedores 20 Años" 
                        className="h-full w-auto object-contain"
                      />
                    </div>
                  ) : null}
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
                className="bg-[rgba(0,79,57,0.08)] border border-[#FFFACA]/10 rounded-2xl p-6 hover:border-[#004f39]/60 transition-all card-hover"
              >
                {/* Logo Area */}
                <div className="h-20 flex items-center justify-start mb-4">
                  {alliance.logo === "forestal" ? (
                    <div className="bg-[#d5e6c8] rounded-lg p-2 h-16 flex items-center">
                      <img 
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-zrY7C8R93knZCuLejkVzdVbtnjsKfc.png" 
                        alt="Forestal Argentina" 
                        className="h-full w-auto object-contain"
                      />
                    </div>
                  ) : alliance.logo === "bomberos" ? (
                    <div className="bg-white rounded-lg p-1 h-16 flex items-center">
                      <img 
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-vKImrd4CDZbzl3Zd4NUAjrORxRZ59j.png" 
                        alt="Cuerpo de Bomberos San Rafael" 
                        className="h-full w-auto object-contain"
                      />
                    </div>
                  ) : alliance.logo === "patagonia" ? (
                    <div className="bg-white rounded-lg p-2 h-16 flex items-center">
                      <img 
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-7Vp1BIgvEcOTF9lgbKEzOXIW3OvWeC.png" 
                        alt="Fundacion Patagonia Natural" 
                        className="h-full w-auto object-contain"
                      />
                    </div>
                  ) : alliance.logo === "sanrafael" ? (
                    <div className="bg-[#e5e5e5] rounded-lg p-2 h-16 flex items-center">
                      <img 
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-61NujLdy4AazxCgi3hla5t1yGbQkYO.png" 
                        alt="Tu! Municipio San Rafael" 
                        className="h-full w-auto object-contain"
                      />
                    </div>
                  ) : alliance.logo === "uba" ? (
                    <div className="bg-white rounded-lg p-2 h-16 flex items-center">
                      <img 
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Rn9528hvohsjWGcqYfTnr49k3X4Koe.png" 
                        alt="Universidad de Buenos Aires" 
                        className="h-full w-auto object-contain"
                      />
                    </div>
                  ) : alliance.logo === "endeavor" ? (
                    <div className="bg-[#00d6b4] rounded-lg p-2 h-16 flex items-center">
                      <img 
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-9SSdLDTJcH90NdLAJkCh9t8BxfCYs0.png" 
                        alt="Endeavor" 
                        className="h-full w-auto object-contain"
                      />
                    </div>
                  ) : null}
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
                className="bg-[rgba(0,79,57,0.08)] border border-[#FFFACA]/10 rounded-2xl p-6 hover:border-[#004f39]/60 transition-all card-hover"
              >
                {/* Logo Area */}
                <div className="h-20 flex items-center justify-start mb-4">
                  {alliance.logo === "naves" ? (
                    <div>
                      <div className="text-2xl font-bold">
                        <span className="text-gray-400">NA</span>
                        <span className="text-green-500">V</span>
                        <span className="text-gray-400">ES</span>
                      </div>
                    </div>
                  ) : alliance.logo === "uncuyo" ? (
                    <div className="bg-white rounded-lg p-2 h-16 flex items-center">
                      <img 
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-cldm2Prrkr7lI6DOCRfHHnv09FCAlF.png" 
                        alt="Incubadora UNCUYO Real Impact" 
                        className="h-full w-auto object-contain"
                      />
                    </div>
                  ) : null}
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

        {/* Galeria de Logros */}
        <div className="mt-20">
          <h3
            className={`text-3xl sm:text-4xl font-bold text-[#FFFACA] mb-8 transition-all duration-700 delay-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Nuestros Logros en Imagenes
          </h3>

          {/* Main Featured Image - Prendete & Sadosky */}
          <div
            className={`relative rounded-2xl overflow-hidden mb-8 transition-all duration-700 delay-600 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AGRADECIMIENTOS.png-RKj8ZwFvVm1htaOUrB36I39sl85Del.jpeg"
              alt="Equipo Sentinel ganadores en Premios Prendete 2025 y ceremonia Premios Sadosky"
              className="w-full h-auto object-cover rounded-2xl"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#151613]/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6">
              <span className="bg-[#004f39] text-[#FFFACA] text-sm font-semibold px-4 py-2 rounded-full">
                Prendete & Premios Sadosky 2025
              </span>
            </div>
          </div>

          {/* Two Column Grid for Other Images */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* JIJE & Award Ceremony */}
            <div
              className={`relative rounded-2xl overflow-hidden transition-all duration-700 delay-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/a.png-sV2KmnIrJF6CaHh1Wko7f3VyZtf53g.jpeg"
                alt="Equipo Sentinel en ceremonia de premiación y presentación en JIJE 20 Años"
                className="w-full h-auto object-cover rounded-2xl"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#151613]/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6">
                <span className="bg-[#004f39] text-[#FFFACA] text-sm font-semibold px-4 py-2 rounded-full">
                  JIJE 20 Años & Premiación
                </span>
              </div>
            </div>

            {/* Endeavor UNCUYO */}
            <div
              className={`relative rounded-2xl overflow-hidden transition-all duration-700 delay-800 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/aa.png-4GoJJL0KZMX5f9ujAZWi6OwfQcC1GA.jpeg"
                alt="Equipo Sentinel en Endeavor UNCUYO - mentoria y networking"
                className="w-full h-auto object-cover rounded-2xl"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#151613]/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6">
                <span className="bg-[#004f39] text-[#FFFACA] text-sm font-semibold px-4 py-2 rounded-full">
                  Endeavor UNCUYO
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
