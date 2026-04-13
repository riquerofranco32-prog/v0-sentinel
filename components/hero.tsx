"use client"

import { useEffect, useState } from "react"
import { ArrowRight } from "lucide-react"

const logos = [
  { src: "/20220609002317_uba.png", alt: "UBA" },
  { src: "/aiweken.png", alt: "Aiweken" },
  { src: "/cice.png", alt: "CICE" },
  { src: "/cuerpo_San_Rafael_2138338625.jpg", alt: "Bomberos San Rafael" },
  { src: "/empretec.png", alt: "Empretec" },
  { src: "/endeavor.png", alt: "Endeavor" },
  { src: "/FPN2.webp", alt: "Fundación Patagonia Natural" },
  { src: "/ilan.png", alt: "ILAN" },
  { src: "/movistar-3.svg", alt: "Movistar" },
  { src: "/portada-forestal.jpg", alt: "Forestal Argentina" },
  { src: "/sadosky.png", alt: "Sadosky" },
  { src: "/scale.png", alt: "Scale" },
  { src: "/ue.png", alt: "UE" },
  { src: "/uncuyo.png", alt: "UNCUYO" },
  { src: "/unl.png", alt: "UNL" },
  { src: "/utn.png", alt: "UTN" },
]

export function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/aaa.jpg"
          alt="Incendio forestal Patagonia"
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0b09]/50 via-[#0c0b09]/30 to-[#0c0b09]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0b09] via-transparent to-[#0c0b09]/60" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 pb-32">

        {/* Tag */}
        <div
          className={`inline-flex items-center gap-2 mb-10 transition-all duration-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"
          }`}
        >
          <span
            className="text-[11px] font-medium tracking-[0.3em] uppercase"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: "rgba(240,234,216,0.35)",
            }}
          >
            Detección temprana de incendios
          </span>
        </div>

        {/* Wordmark */}
        <h1
          className={`leading-none tracking-tight text-center transition-all duration-700 delay-100 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{
            fontFamily: "'Jura', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(5rem, 20vw, 17rem)",
            color: "rgba(240,234,216,0.92)",
          }}
        >
          SENTINEL
        </h1>

        {/* Divider */}
        <div
          className={`w-16 h-px my-8 transition-all duration-700 delay-200 ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
          style={{ background: "rgba(240,234,216,0.15)" }}
        />

        {/* Tagline */}
        <p
          className={`text-center max-w-sm transition-all duration-700 delay-300 ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            fontSize: "15px",
            lineHeight: 1.7,
            color: "rgba(240,234,216,0.5)",
          }}
        >
          Tecnología aérea e inteligencia artificial para la detección temprana
          de incendios en la Patagonia.
        </p>

        {/* CTAs */}
        <div
          className={`flex flex-col sm:flex-row gap-3 mt-10 transition-all duration-700 delay-500 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <a
            href="#nosotros"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-sm text-[13px] font-medium transition-all"
            style={{
              fontFamily: "'Inter', sans-serif",
              background: "rgba(240,234,216,0.08)",
              border: "0.5px solid rgba(240,234,216,0.2)",
              color: "rgba(240,234,216,0.9)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(240,234,216,0.13)"
              e.currentTarget.style.borderColor = "rgba(240,234,216,0.4)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(240,234,216,0.08)"
              e.currentTarget.style.borderColor = "rgba(240,234,216,0.2)"
            }}
          >
            Quiero saber más
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
          <a
            href="#servicios"
            className="inline-flex items-center justify-center px-7 py-3 rounded-sm text-[13px] font-light transition-all"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: "rgba(240,234,216,0.4)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "rgba(240,234,216,0.7)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(240,234,216,0.4)")
            }
          >
            Ver servicios
          </a>
        </div>
      </div>

      {/* Logo marquee */}
      <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/5 py-8 overflow-hidden"
        style={{ background: "rgba(12,11,9,0.7)", backdropFilter: "blur(8px)" }}
      >
        <p
          className="text-center mb-5 text-[10px] tracking-[0.25em] uppercase"
          style={{ color: "rgba(240,234,216,0.2)", fontFamily: "'Inter', sans-serif" }}
        >
          Nos acompañan
        </p>
        <div className="flex animate-marquee whitespace-nowrap">
          {[...logos, ...logos, ...logos].map((logo, i) => (
            <div
              key={i}
              className="inline-flex items-center justify-center mx-10 shrink-0"
              style={{ height: "52px" }}
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-full w-auto object-contain"
                style={{ opacity: 0.8 }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
