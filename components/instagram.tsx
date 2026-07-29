"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Instagram, Heart } from "lucide-react";

const posts = [
  {
    image: "/problem-a2.jpg",
    likes: 42,
    caption:
      "Un incendio detectado en los primeros minutos se controla. Uno detectado horas después, arrasa. Sentinel detecta focos activos en menos de 5 minutos con drones autónomos e IA.",
    href: "https://www.instagram.com/p/DWmLb_DjvIA/",
  },
  {
    image: "/problem-a3.jpg",
    likes: 7,
    caption:
      "Con Sentinel pasás de reaccionar a predecir. Monitorear → Detectar/Verificar → Contextualizar → Alertar. Así funciona la protección real del territorio.",
    href: "https://www.instagram.com/p/DWmLh-Bjn91/",
  },
  {
    image: "/problem-a4.jpg",
    likes: 36,
    caption:
      "El fuego no da segundas oportunidades. Usamos sistemas de detección temprana e inteligencia territorial para identificar el peligro antes de que sea incontrolable.",
    href: "https://www.instagram.com/p/DZL3LoIjMNn/",
  },
];

export function InstagramFeed() {
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
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: "#0c0b09" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(148,241,190,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        <div
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16 transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(16px)",
          }}
        >
          <div>
            <p
              className="text-[11px] tracking-[0.3em] uppercase mb-5"
              style={{
                fontFamily: "var(--font-sans)",
                color: "rgba(240,234,216,0.3)",
              }}
            >
              Redes
            </p>
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl mb-4"
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 800,
                color: "rgba(240,234,216,0.92)",
                lineHeight: 1,
              }}
            >
              Seguinos en <span style={{ color: "#94f1be" }}>Instagram.</span>
            </h2>
            <p
              className="max-w-md text-[13px] leading-relaxed"
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 300,
                color: "rgba(240,234,216,0.4)",
              }}
            >
              Prevenimos incendios y generamos datos ambientales — el detrás de
              escena de Sentinel, contado por el equipo.{" "}
              <span
                style={{ color: "rgba(240,234,216,0.75)", fontWeight: 400 }}
              >
                +950 seguidores.
              </span>
            </p>
          </div>

          <a
            href="https://instagram.com/sentinel.arg"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-sm text-[13px] font-medium transition-all hover:-translate-y-0.5 w-fit"
            style={{
              fontFamily: "var(--font-sans)",
              background: "rgba(148,241,190,0.1)",
              border: "0.5px solid rgba(148,241,190,0.3)",
              color: "#94f1be",
            }}
          >
            <Instagram className="w-4 h-4" />
            @sentinel.arg
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {posts.map((post, i) => (
            <a
              key={post.href}
              href={post.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-lg overflow-hidden transition-all duration-700 hover:-translate-y-1"
              style={{
                aspectRatio: "4/5",
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(24px)",
                transitionDelay: `${i * 100}ms`,
              }}
            >
              <Image
                src={post.image}
                alt=""
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0b09]/90 via-[#0c0b09]/20 to-transparent" />

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#0c0b09]/40" />

              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div
                  className="flex items-center gap-1.5 mb-2"
                  style={{ color: "#94f1be" }}
                >
                  <Heart className="w-3.5 h-3.5" fill="currentColor" />
                  <span
                    className="text-[11px]"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {post.likes}
                  </span>
                </div>
                <p
                  className="text-[12px] leading-relaxed line-clamp-4"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: 300,
                    color: "rgba(240,234,216,0.75)",
                  }}
                >
                  {post.caption}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
