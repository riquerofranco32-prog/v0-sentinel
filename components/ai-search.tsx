"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle } from "lucide-react";

const assistants = ["ChatGPT", "Claude", "Gemini", "Perplexity", "Google"];

const items = [
  "Datos estructurados Organization y Product (schema.org)",
  "Metadata Open Graph y Twitter Card completa",
  "Contenido semántico, con texto real en vez de solo imágenes",
];

export function AISearch() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-28"
      style={{ background: "#0c0b09" }}
    >
      <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
        <p
          className="text-[11px] tracking-[0.3em] uppercase mb-4"
          style={{ fontFamily: "var(--font-sans)", color: "#94f1be" }}
        >
          Búsqueda con IA
        </p>
        <h2
          className="mb-6 transition-all duration-700"
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 700,
            fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
            color: "rgba(240,234,216,0.95)",
            lineHeight: 1.2,
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(12px)",
          }}
        >
          Preparados para la nueva forma de buscar
        </h2>
        <p
          className="mb-10 text-sm md:text-base leading-relaxed max-w-xl mx-auto"
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 300,
            color: "rgba(240,234,216,0.5)",
          }}
        >
          Cada vez más gente le pregunta a un asistente de IA en vez de buscar
          directamente. Publicamos datos estructurados sobre Sentinel para que,
          cuando lo hagan, encuentren información precisa y actualizada.
        </p>

        <div className="flex flex-col gap-3 max-w-md mx-auto mb-10 text-left">
          {items.map((item) => (
            <div key={item} className="flex gap-2.5 items-start text-sm">
              <CheckCircle
                className="w-4 h-4 flex-shrink-0 mt-0.5"
                style={{ color: "#94f1be" }}
              />
              <span
                style={{
                  color: "rgba(240,234,216,0.6)",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 300,
                }}
              >
                {item}
              </span>
            </div>
          ))}
        </div>

        <p
          className="text-[10px] tracking-[0.2em] uppercase mb-4"
          style={{
            fontFamily: "var(--font-sans)",
            color: "rgba(240,234,216,0.25)",
          }}
        >
          Compatible con
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {assistants.map((name) => (
            <span
              key={name}
              className="px-3 py-1.5 rounded-sm text-xs"
              style={{
                fontFamily: "var(--font-sans)",
                border: "0.5px solid rgba(240,234,216,0.1)",
                color: "rgba(240,234,216,0.45)",
              }}
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
