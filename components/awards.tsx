"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { Timeline } from "@/components/ui/timeline";

function ChecklistItem({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex gap-2 items-start text-xs md:text-sm"
      style={{ color: "rgba(240,234,216,0.6)" }}
    >
      <CheckCircle
        className="w-4 h-4 flex-shrink-0 mt-0.5"
        style={{ color: "#94f1be" }}
      />
      {children}
    </div>
  );
}

const imgClass = "rounded-lg object-cover h-24 md:h-40 lg:h-48 w-full";

const timelineData = [
  {
    title: "Competencias",
    content: (
      <div>
        <p
          className="text-xs md:text-sm mb-6 leading-relaxed"
          style={{ color: "rgba(240,234,216,0.55)", fontWeight: 300 }}
        >
          Cinco competencias ganadas en 2025, de norte a sur del país.
        </p>
        <div className="mb-6 flex flex-col gap-2">
          <ChecklistItem>Premios ILAN 2025 — viaje a Israel</ChecklistItem>
          <ChecklistItem>
            JIJE 20 años — Universidad Nacional del Litoral
          </ChecklistItem>
          <ChecklistItem>Premios Sadosky 2025 — CESSI</ChecklistItem>
          <ChecklistItem>Usina Emprendedores — CAC</ChecklistItem>
          <ChecklistItem>Prendete Pitch Day — CICE SV</ChecklistItem>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Image
            src="/logros-tile-0.jpg"
            alt="Equipo Sentinel en Prendete Pitch Day"
            width={500}
            height={320}
            className={imgClass}
          />
          <Image
            src="/logros-tile-3.jpg"
            alt="Premios Sadosky 2025"
            width={500}
            height={320}
            className={imgClass}
          />
        </div>
      </div>
    ),
  },
  {
    title: "Selección internacional",
    content: (
      <div>
        <p
          className="text-xs md:text-sm mb-6 leading-relaxed"
          style={{ color: "rgba(240,234,216,0.55)", fontWeight: 300 }}
        >
          Reconocimiento fuera de Argentina y primer apoyo financiero.
        </p>
        <div className="mb-6 flex flex-col gap-2">
          <ChecklistItem>Softlanding en Europa por Piensas.xyz</ChecklistItem>
          <ChecklistItem>3.000 USD — Gobierno de Mendoza</ChecklistItem>
          <ChecklistItem>Emprelatam y Draper House Americas</ChecklistItem>
          <ChecklistItem>
            Finalistas — Impact Startup Competition Perú 2026 (Scale)
          </ChecklistItem>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Image
            src="/logros-tile-1.jpg"
            alt="Entrega de reconocimiento a Sentinel"
            width={500}
            height={320}
            className={imgClass}
          />
          <Image
            src="/logros-tile-4.jpg"
            alt="Presentación de Sentinel en JIJE 20 años"
            width={500}
            height={320}
            className={imgClass}
          />
        </div>
      </div>
    ),
  },
];

export function Awards() {
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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
    <section
      ref={sectionRef}
      id="noticias"
      className="relative overflow-hidden"
      style={{ background: "#0c0b09" }}
    >
      {/* ── Foto de fondo completa ── */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: "clamp(260px, 40vw, 520px)" }}
      >
        <Image
          src="/logros.jpg"
          alt="Sentinel Technologies en competencias y eventos"
          fill
          sizes="100vw"
          className="object-cover transition-transform duration-[8000ms] ease-out"
          style={{
            objectPosition: "center 30%",
            transform: imageLoaded ? "scale(1.0)" : "scale(1.06)",
            filter: "grayscale(20%) brightness(0.75)",
          }}
          onLoad={() => setImageLoaded(true)}
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(12,11,9,0.3) 0%, transparent 40%, rgba(12,11,9,0.7) 80%, #0c0b09 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(12,11,9,0.5) 0%, transparent 50%, rgba(12,11,9,0.5) 100%)",
          }}
        />

        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible
              ? "translateX(-50%) translateY(0)"
              : "translateX(-50%) translateY(12px)",
            transition: "all 800ms 100ms",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "10px",
              fontWeight: 600,
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "#94f1be",
              marginBottom: "10px",
            }}
          >
            Reconocimientos
          </p>
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 700,
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              color: "rgba(240,234,216,0.95)",
              lineHeight: 1.1,
              textShadow: "0 2px 32px rgba(0,0,0,0.6)",
            }}
          >
            Nuestros logros.
          </h2>
        </div>
      </div>

      {/* ── Timeline de logros ── */}
      <div className="relative py-12">
        <Timeline data={timelineData} />

        {/* Bottom counter */}
        <div
          className="flex justify-center gap-12 mt-4 pt-12 max-w-4xl mx-auto"
          style={{ borderTop: "0.5px solid rgba(240,234,216,0.07)" }}
        >
          {[
            { num: "9", label: "reconocimientos" },
            { num: "3", label: "países" },
            { num: "2025–26", label: "temporada" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 700,
                  fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                  color: "rgba(240,234,216,0.92)",
                  lineHeight: 1,
                }}
              >
                {s.num}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "11px",
                  fontWeight: 300,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "rgba(240,234,216,0.35)",
                  marginTop: "6px",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
