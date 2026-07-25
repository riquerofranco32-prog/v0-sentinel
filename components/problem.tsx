"use client";

import { useEffect, useRef, useState } from "react";
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
      { threshold: 0.05 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[#0c0b09]">
      {/* Hero image */}
      <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <img
          src="/a3.jpg"
          alt="Bomberos enfrentando incendio forestal en la Patagonia"
          className="w-full h-full object-cover transition-transform duration-[3000ms]"
          style={{ transform: isVisible ? "scale(1.04)" : "scale(1)" }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0b09] via-[#0c0b09]/50 to-[#0c0b09]/20" />

        <div className="absolute bottom-0 left-0 right-0 px-8 md:px-16 pb-12">
          <p
            className="text-[11px] tracking-[0.3em] uppercase mb-4 transition-all duration-700"
            style={{
              fontFamily: "var(--font-sans)",
              color: "rgba(240,234,216,0.3)",
              opacity: isVisible ? 1 : 0,
            }}
          >
            Emergencia nacional
          </p>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl leading-none transition-all duration-700"
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 800,
              color: "rgba(240,234,216,0.92)",
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
                  color: "rgba(240,234,216,0.55)",
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(16px)",
                  transitionDelay: "150ms",
                }}
              >
                No es solo bosque lo que se quema. Es el futuro de nuestras
                economías.{" "}
                <span
                  style={{ color: "rgba(240,234,216,0.85)", fontWeight: 400 }}
                >
                  Más de 1 millón de hectáreas perdidas en Corrientes.
                </span>{" "}
                Bosques milenarios desapareciendo en la Patagonia. No son solo
                árboles: son hogares, biodiversidad única y el futuro económico
                de nuestras provincias.
              </p>

              {/* Stats with counters */}
              <div
                className="grid grid-cols-3 gap-4 mb-12 transition-all duration-700"
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
                    className="relative overflow-hidden"
                    style={{
                      background: "rgba(240,234,216,0.02)",
                      border: "0.5px solid rgba(240,234,216,0.08)",
                      borderRadius: "6px",
                      padding: "20px 16px",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "2px",
                        height: "100%",
                        background: "rgba(148,241,190,0.4)",
                      }}
                    />
                    <div
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontWeight: 800,
                        fontSize: "clamp(26px, 4vw, 38px)",
                        lineHeight: 1,
                        color: "rgba(240,234,216,0.92)",
                        letterSpacing: "-1px",
                        marginBottom: "6px",
                      }}
                    >
                      {stat.display}
                    </div>
                    <div
                      style={{
                        fontSize: "11px",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        fontFamily: "var(--font-sans)",
                        fontWeight: 300,
                        color: "rgba(240,234,216,0.35)",
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
                        i < 2 ? "0.5px solid rgba(240,234,216,0.06)" : "none",
                    }}
                  >
                    <div
                      style={{
                        width: "6px",
                        height: "6px",
                        background: "rgba(148,241,190,0.6)",
                        borderRadius: "50%",
                        marginTop: "6px",
                        flexShrink: 0,
                      }}
                    />
                    <div>
                      <p
                        style={{
                          fontSize: "13px",
                          fontFamily: "var(--font-sans)",
                          fontWeight: 500,
                          color: "rgba(240,234,216,0.75)",
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
                          color: "rgba(240,234,216,0.35)",
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
                  className="inline-flex items-center gap-2 px-8 py-3 text-[13px] font-medium rounded-sm transition-all border border-[rgba(240,234,216,0.2)] bg-[rgba(240,234,216,0.08)] text-[rgba(240,234,216,0.85)] hover:bg-[rgba(240,234,216,0.13)] hover:border-[rgba(240,234,216,0.4)]"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  Ver cómo lo resolvemos
                  <ArrowRight className="w-3.5 h-3.5" />
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
                "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/a2-sCSrBbHtMQFzFqp4eBBIvUs8dgnrEh.jpg",
                "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/a-ctE13dVLBzJmNQfjnPbHhp9EhxtVRw.jpg",
                "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/a3-oiXPvEaaqCu4FDqlu6UlcDIRhaaex6.jpg",
                "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/a1-dL77IHIBwasbZgslhBmZWAQ2XQHJdk.jpg",
              ].map((src, i) => (
                <div
                  key={i}
                  className="relative overflow-hidden group transition-all duration-700"
                  style={{
                    borderRadius: "4px",
                    aspectRatio: "4/5",
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible
                      ? "translateY(0) scale(1)"
                      : "translateY(20px) scale(0.97)",
                    transitionDelay: `${450 + i * 80}ms`,
                  }}
                >
                  <img
                    src={src}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
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
