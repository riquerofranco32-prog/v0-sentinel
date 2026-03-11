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
    title: "Premios Sadosky 2025 – Startup del Año (Finalistas)",
    description: "Finalistas en la categoría Mejor Startup del Año 2025 y Solución Innovadora, uno de los reconocimientos más prestigiosos del sector tecnológico argentino. Este logro valida la solidez técnica, el impacto y la innovación del modelo de Sentinel.",
    bgColor: "bg-[#1a1c18]",
    badge: "finalista",
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
    title: "Premios Prendete 2025 – Finalistas (Categoría Jump)",
    description: "Seleccionados como finalistas en la categoría Jump, que premia soluciones innovadoras con potencial de crecimiento acelerado. Este reconocimiento refuerza la validación de Sentinel como plataforma tecnológica escalable y de impacto regional.",
    bgColor: "bg-[#1a1c18]",
    badge: "finalista",
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
                    <div className="bg-white rounded-lg px-4 py-3">
                      <div className="text-2xl font-bold text-black tracking-wider">ILAN</div>
                      <div className="text-[8px] text-gray-600 whitespace-pre-line leading-tight">ISRAEL+LATIN AMERICAN{"\n"}NETWORK</div>
                    </div>
                  ) : award.logo === "sadosky" ? (
                    <div className="bg-white rounded-lg px-4 py-3 flex items-center gap-2">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-lg">S</span>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-gray-800">Premios</div>
                        <div className="text-lg font-bold text-blue-600">Sadosky</div>
                      </div>
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
                    <div className="bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg px-4 py-3">
                      <div className="text-white font-bold text-xl">Prendete</div>
                      <div className="text-white/80 text-xs">IMPULSA TU IDEA AL EXITO</div>
                    </div>
                  ) : award.logo === "BNA" ? (
                    <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-xs text-gray-500">Banco Nación</div>
                      </div>
                    </div>
                  ) : award.logo === "JIJE" ? (
                    <div className="bg-[#1a3a5c] rounded-lg px-6 py-4">
                      <div className="text-white font-bold text-2xl">JIJE</div>
                      <div className="text-yellow-400 text-sm">20 años</div>
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
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-10 bg-green-600 rounded-sm" />
                      <div>
                        <div className="text-green-500 font-script text-xl italic">Forestal</div>
                        <div className="text-orange-500 font-script text-xl italic">Argentina</div>
                      </div>
                    </div>
                  ) : alliance.logo === "bomberos" ? (
                    <div className="w-16 h-16 bg-gradient-to-b from-red-600 to-red-800 rounded-full flex items-center justify-center">
                      <span className="text-yellow-400 text-2xl">🔥</span>
                    </div>
                  ) : alliance.logo === "patagonia" ? (
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-12 bg-yellow-600 rounded" />
                      <div className="text-[#FFFACA]/80 text-sm">
                        <div className="font-bold">FUNDACIÓN</div>
                        <div className="font-bold">PATAGONIA</div>
                        <div className="font-bold">NATURAL</div>
                      </div>
                    </div>
                  ) : alliance.logo === "sanrafael" ? (
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">SR</div>
                      <div className="text-[#FFFACA]/80 text-sm">
                        <div>Tu</div>
                        <div className="font-bold">Municipio</div>
                        <div className="text-green-500">San Rafael</div>
                      </div>
                    </div>
                  ) : alliance.logo === "uba" ? (
                    <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-blue-800 font-bold text-lg">.UBA</div>
                        <div className="text-[6px] text-gray-600">Universidad de<br/>Buenos Aires</div>
                      </div>
                    </div>
                  ) : alliance.logo === "endeavor" ? (
                    <div>
                      <div className="text-red-500 font-bold text-2xl italic">endeavor</div>
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
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-12 rounded-full border-2 border-red-600 flex items-center justify-center">
                        <span className="text-red-600 text-xs">🎓</span>
                      </div>
                      <div className="text-[#FFFACA]/80">
                        <div className="text-xl font-bold">UNCUYO</div>
                        <div className="text-[8px]">UNIVERSIDAD<br/>NACIONAL DE CUYO</div>
                      </div>
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
