"use client";

import Image from "next/image";
import { Linkedin } from "lucide-react";
import { Marquee } from "@/components/ui/marquee";

const teamMembers = [
  {
    image: "/GANAMOS-3.jpg",
    name: "Lautaro Silva",
    role: "CEO | Founder",
    background: "Ingeniero Industrial",
    linkedin: "https://www.linkedin.com/in/lautaro-silva-0188781a2/",
  },
  {
    image: "/GANAMOS-2.jpg",
    name: "Franco Riquero",
    role: "CDO | Co-Founder",
    background: "Tec. Elec | Ingeniero Industrial",
    linkedin: "https://www.linkedin.com/in/franco-riquero-117492355/",
  },
  {
    image: "/GANAMOS-1.jpg",
    name: "Alexis Ramundo",
    role: "CTO | Co-Founder",
    background: "Tec. Elec | Ingeniero en Sistemas",
    linkedin: "https://www.linkedin.com/in/alexisramundo-dev/",
  },
  {
    image: "/GANAMOS.jpg",
    name: "Martín Toledano",
    role: "CFO | Co-Founder",
    background: "Tec. Elec | Ingeniero Industrial",
    linkedin: "https://www.linkedin.com/in/martin-toledano-804a69264/",
  },
];

export function Team() {
  return (
    <section
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

        <div className="relative w-full">
          <div
            className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 sm:w-32"
            style={{
              background: "linear-gradient(to right, #0c0b09, transparent)",
            }}
          />
          <div
            className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 sm:w-32"
            style={{
              background: "linear-gradient(to left, #0c0b09, transparent)",
            }}
          />

          <Marquee className="[--gap:1.5rem] [--duration:32s]" pauseOnHover>
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="group flex w-60 shrink-0 flex-col overflow-hidden rounded-sm"
                style={{
                  border: "0.5px solid rgba(240,234,216,0.07)",
                  background: "rgba(240,234,216,0.02)",
                }}
              >
                <div className="relative w-full" style={{ aspectRatio: "3/4" }}>
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="240px"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    style={{ filter: "grayscale(15%)" }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to bottom, transparent 55%, rgba(12,11,9,0.95) 100%)",
                    }}
                  />
                  <div
                    className="absolute top-3 left-3 px-2 py-1 rounded-sm"
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "9px",
                      fontWeight: 600,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "#94f1be",
                      background: "rgba(12,11,9,0.7)",
                      border: "0.5px solid rgba(148,241,190,0.2)",
                    }}
                  >
                    {member.role.split(" | ")[0]}
                  </div>
                </div>

                <div className="flex flex-col gap-1 p-4">
                  <h3
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontWeight: 700,
                      fontSize: "15px",
                      color: "rgba(240,234,216,0.95)",
                    }}
                  >
                    {member.name}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "11px",
                      fontWeight: 300,
                      color: "rgba(240,234,216,0.35)",
                    }}
                  >
                    {member.background}
                  </p>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-[11px] transition-colors hover:text-[#94f1be]"
                    style={{
                      fontFamily: "var(--font-sans)",
                      color: "rgba(240,234,216,0.4)",
                    }}
                  >
                    <Linkedin className="w-3 h-3" />
                    LinkedIn
                  </a>
                </div>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
