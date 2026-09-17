"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

function useCountUp(target: number, isVisible: boolean, duration = 1400) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible, target, duration]);
  return count;
}

export function Problem() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const hectareas = useCountUp(1000000, isVisible, 2000);
  const causa = useCountUp(95, isVisible, 1200);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.05, rootMargin: "0px 0px 200px 0px" },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[#faf7f0]">
      {/* Hero image */}
      <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <Image
          src="/a3.jpg"
          alt="Bomberos enfrentando incendio forestal en la Patagonia"
          fill
          sizes="100vw"
          loading="lazy"
          className="object-cover transition-transform duration-[3000ms]"
          style={{ transform: isVisible ? "scale(1.04)" : "scale(1)" }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0b09] via-[#0c0b09]/50 to-[#0c0b09]/20" />

        <div className="absolute bottom-0 left-0 right-0 px-8 md:px-16 pb-12">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-sm text-[11px] font-medium tracking-[0.18em] uppercase mb-4 transition-all duration-700"
            style={{
              fontFamily: "var(--font-sans)",
              background: "rgba(241,107,107,0.15)",
              border: "0.5px solid rgba(241,107,107,0.35)",
              color: "#f16b6b",
              opacity: isVisible ? 1 : 0,
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#f16b6b]" />
            Emergencia territorial
          </div>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl leading-none font-extrabold tracking-[-0.03em] transition-all duration-700"
            style={{
              fontFamily: "var(--font-heading)",
              color: "rgba(240,234,216,0.95)",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(16px)",
              transitionDelay: "100ms",
            }}
          >
            Hoy la Patagonia duele.
          </h2>
        </div>
      </div>

      {/* Contenido */}
      <div className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left */}
            <div>
              <p
                className="text-lg leading-relaxed mb-10 transition-all duration-700"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 300,
                  color: "rgba(26,24,18,0.55)",
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(16px)",
                  transitionDelay: "150ms",
                }}
              >
                No es solo bosque lo que se quema. Es el futuro de nuestras
                economías.{" "}
                <span style={{ color: "rgba(26,24,18,0.85)", fontWeight: 400 }}>
                  Más de 1 millón de hectáreas perdidas en Corrientes.
                </span>{" "}
                Bosques milenarios desapareciendo en la Patagonia. No son solo
                árboles: son hogares, biodiversidad única y el futuro económico
                de nuestras provincias.
              </p>

              {/* Stats with counters */}
              <div
                className="grid grid-cols-3 gap-2 sm:gap-4 mb-12 transition-all duration-700"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(16px)",
                  transitionDelay: "250ms",
                }}
              >
                {[
                  {
                    display:
                      hectareas >= 1000000
                        ? "1M+"
                        : hectareas >= 1000
                          ? `${Math.floor(hectareas / 1000)}K`
                          : String(hectareas),
                    label: "Hectáreas quemadas",
                  },
                  {
                    display: `${causa}%`,
                    label: "Causa humana",
                  },
                  {
                    display: "∞",
                    label: "Daño a fauna",
                  },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="relative overflow-hidden tech-card rounded-lg p-3 sm:p-5"
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "2px",
                        height: "100%",
                        background: "rgba(15,122,79,0.5)",
                      }}
                    />
                    <div
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontWeight: 800,
                        fontSize: "clamp(24px, 3.5vw, 36px)",
                        lineHeight: 1,
                        color: "rgba(26,24,18,0.95)",
                        letterSpacing: "-0.03em",
                        marginBottom: "6px",
                      }}
                    >
                      {stat.display}
                    </div>
                    <div
                      style={{
                        fontSize: "10px",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        fontFamily: "var(--font-sans)",
                        fontWeight: 400,
                        color: "rgba(26,24,18,0.4)",
                      }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Problem list */}
              <div
                className="space-y-0 transition-all duration-700"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(16px)",
                  transitionDelay: "350ms",
                }}
              >
                {[
                  {
                    title: "Pulmón verde en riesgo",
                    body: "Bosques nativos que tardan décadas en regenerarse se pierden en horas.",
                  },
                  {
                    title: "Comunidades amenazadas",
                    body: "Familias enteras pierden sus hogares y su sustento económico.",
                  },
                  {
                    title: "Respuesta insuficiente",
                    body: "Los brigadistas arriesgan su vida con recursos limitados.",
                  },
                ].map((item, i) => (
                  <div
                    key={item.title}
                    className="flex gap-4 items-start py-4"
                    style={{
                      borderBottom:
                        i < 2 ? "0.5px solid rgba(26,24,18,0.06)" : "none",
                    }}
                  >
                    <div
                      style={{
                        width: "6px",
                        height: "6px",
                        background: "#0f7a4f",
                        borderRadius: "50%",
                        marginTop: "6px",
                        flexShrink: 0,
                        opacity: 0.8,
                      }}
                    />
                    <div>
                      <p
                        style={{
                          fontSize: "14px",
                          fontFamily: "var(--font-sans)",
                          fontWeight: 500,
                          color: "rgba(26,24,18,0.85)",
                          marginBottom: "3px",
                        }}
                      >
                        {item.title}
                      </p>
                      <p
                        style={{
                          fontSize: "13px",
                          fontFamily: "var(--font-sans)",
                          fontWeight: 300,
                          color: "rgba(26,24,18,0.45)",
                          lineHeight: 1.5,
                        }}
                      >
                        {item.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div
                className="mt-12 transition-all duration-700"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(16px)",
                  transitionDelay: "450ms",
                }}
              >
                <a
                  href="#servicios"
                  className="group inline-flex items-center gap-2 px-7 py-3 text-[13px] font-medium rounded-sm transition-all duration-200 border border-[rgba(15,122,79,0.35)] bg-[rgba(15,122,79,0.1)] text-[#0f7a4f] hover:bg-[#0f7a4f] hover:text-[#faf7f0] hover:-translate-y-0.5"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  Ver cómo lo resolvemos
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </a>
              </div>
            </div>

            {/* Right — image grid */}
            <div
              className="grid grid-cols-2 gap-3 transition-all duration-700"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(24px)",
                transitionDelay: "400ms",
              }}
            >
              {[
                "/problem-a2.jpg",
                "/problem-a1.jpg",
                "/problem-a3.jpg",
                "/problem-a4.jpg",
              ].map((src, i) => (
                <div
                  key={i}
                  className="relative overflow-hidden rounded-lg group transition-all duration-700"
                  style={{
                    aspectRatio: "4/5",
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible
                      ? "translateY(0) scale(1)"
                      : "translateY(20px) scale(0.97)",
                    transitionDelay: `${450 + i * 80}ms`,
                  }}
                >
                  <Image
                    src={src}
                    alt={`Incendio forestal en la Patagonia argentina ${i + 1}`}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
