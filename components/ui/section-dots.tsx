"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "inicio", label: "Inicio" },
  { id: "nosotros", label: "Solución" },
  { id: "servicios", label: "Servicios" },
  { id: "capacidades", label: "Capacidades" },
  { id: "equipo", label: "Equipo" },
  { id: "faq", label: "FAQ" },
  { id: "contacto", label: "Contacto" },
];

// ponytail: complements the linear top ScrollProgress bar — that one shows
// "how far", this shows "where", so people can jump straight to a section
// on a page this long instead of scroll-hunting for it.
export function SectionDots() {
  const [active, setActive] = useState("inicio");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        const topmost = visible.reduce((a, b) =>
          a.boundingClientRect.top < b.boundingClientRect.top ? a : b,
        );
        setActive(topmost.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );

    const elements = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-4">
      {SECTIONS.map((s) => {
        const isActive = active === s.id;
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="group relative flex items-center justify-end py-1"
            aria-label={s.label}
            aria-current={isActive}
          >
            <span
              className="absolute right-5 whitespace-nowrap text-[10px] tracking-wide px-2.5 py-1 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
              style={{
                fontFamily: "var(--font-sans)",
                background: "rgba(12,11,9,0.92)",
                border: "0.5px solid rgba(240,234,216,0.15)",
                color: "rgba(240,234,216,0.8)",
                backdropFilter: "blur(6px)",
              }}
            >
              {s.label}
            </span>
            <span
              className="rounded-full transition-all duration-300"
              style={{
                width: isActive ? 8 : 6,
                height: isActive ? 8 : 6,
                background: isActive ? "#94f1be" : "rgba(240,234,216,0.25)",
                boxShadow: isActive ? "0 0 8px #94f1be" : "none",
              }}
            />
          </a>
        );
      })}
    </div>
  );
}
