"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Linkedin } from "lucide-react";

const teamMembers = [
  {
    image: "/GANAMOS-3.jpg",
    name: "Lautaro Silva",
    role: "CEO | Founder",
    linkedin: "https://www.linkedin.com/in/lautaro-silva-0188781a2/",
  },
  {
    image: "/GANAMOS-2.jpg",
    name: "Franco Riquero",
    role: "CDO | Co-Founder",
    linkedin: "https://www.linkedin.com/in/franco-riquero-117492355/",
  },
  {
    image: "/GANAMOS-1.jpg",
    name: "Alexis Ramundo",
    role: "CTO | Co-Founder",
    linkedin: "https://www.linkedin.com/in/alexisramundo-dev/",
  },
  {
    image: "/GANAMOS.jpg",
    name: "Martín Toledano",
    role: "CFO | Co-Founder",
    linkedin: "https://www.linkedin.com/in/martin-toledano-804a69264/",
  },
];

export function Team() {
  const [isVisible, setIsVisible] = useState(false);
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
      id="equipo"
      className="relative w-full overflow-hidden py-24 lg:py-32"
      style={{ background: "#0c0b09" }}
    >
      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-10">
        <div className="mx-auto mb-16 flex max-w-2xl flex-col items-center text-center">
          <p
            className="mb-4 text-[11px] tracking-[0.35em] uppercase"
            style={{ fontFamily: "var(--font-sans)", color: "#94f1be" }}
          >
            El equipo
          </p>
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 700,
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              color: "rgba(240,234,216,0.95)",
              lineHeight: 1.15,
            }}
          >
            Las personas detrás de Sentinel
          </h2>
          <p
            className="mt-4"
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 300,
              fontSize: "15px",
              lineHeight: 1.7,
              color: "rgba(240,234,216,0.45)",
            }}
          >
            Cuatro ingenieros de la Patagonia con un objetivo común: que ningún
            incendio pase desapercibido.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {teamMembers.map((member, i) => (
            <a
              key={member.name}
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex overflow-hidden rounded-xl transition-all duration-700 hover:-translate-y-1.5"
              style={{
                aspectRatio: "9/16",
                border: "0.5px solid rgba(240,234,216,0.1)",
                boxShadow: "0 20px 40px -20px rgba(0,0,0,0.6)",
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(24px)",
                transitionDelay: `${i * 100}ms`,
              }}
            >
              {/* member.image is a pre-designed card (name, role, bio
                  already baked in) — shown full, no HTML caption on top */}
              <Image
                src={member.image}
                alt={`${member.name} — ${member.role}`}
                fill
                sizes="(max-width: 1024px) 45vw, 22vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div
                className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-1.5 py-3 transition-all duration-300"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent 0%, rgba(12,11,9,0.9) 70%)",
                }}
              >
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-[11px] transition-all duration-300 group-hover:-translate-y-0.5"
                  style={{
                    fontFamily: "var(--font-sans)",
                    color: "#94f1be",
                    background: "rgba(148,241,190,0.1)",
                    border: "0.5px solid rgba(148,241,190,0.3)",
                  }}
                >
                  <Linkedin className="w-3 h-3" />
                  LinkedIn
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
