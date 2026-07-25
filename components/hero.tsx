"use client";

import { useEffect, useRef, useState } from "react";
import ScrollExpandMedia from "./scroll-expansion-hero";

const logos = [
  { src: "/20220609002317_uba.png", alt: "UBA" },
  { src: "/aiweken.png", alt: "Aiweken" },
  { src: "/cice.png", alt: "CICE" },
  { src: "/empretec.png", alt: "Empretec" },
  { src: "/endeavor.png", alt: "Endeavor" },
  { src: "/FPN2.webp", alt: "Fundación Patagonia Natural" },
  { src: "/ilan.png", alt: "ILAN" },
  { src: "/movistar-3.svg", alt: "Movistar" },
  { src: "/sadosky.png", alt: "Sadosky" },
  { src: "/scale.png", alt: "Scale" },
  { src: "/ue.png", alt: "UE" },
  { src: "/uncuyo.png", alt: "UNCUYO" },
  { src: "/unl.png", alt: "UNL" },
  { src: "/utn.png", alt: "UTN" },
];

const stats = [
  { target: 8, suffix: "min", label: "Tiempo detección" },
  { target: 300, suffix: "ha", label: "Cobertura por vuelo" },
  { target: 98, suffix: "%", label: "Precisión de detección" },
];

const CLOUDINARY_CLOUD = "djqq3fxou";
const VIDEO_PUBLIC_ID = "13851-252799027_gbm6no";
const VIDEO_URL = `https://res.cloudinary.com/${CLOUDINARY_CLOUD}/video/upload/q_auto:low,w_1280,vc_h264,fl_progressive/${VIDEO_PUBLIC_ID}.mp4`;

function useCountUp(target: number, isVisible: boolean, duration = 1800) {
  const [count, setCount] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!isVisible || hasRun.current) return;
    hasRun.current = true;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isVisible, target, duration]);

  return count;
}

function AnimatedStat({
  target,
  suffix,
  label,
}: {
  target: number;
  suffix: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const count = useCountUp(target, inView);

  return (
    <div ref={ref} className="text-center">
      <div
        className="leading-none font-bold"
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: "clamp(1.5rem, 3.5vw, 2rem)",
          color: "rgba(240,234,216,0.95)",
        }}
      >
        {count}
        <span style={{ color: "#94f1be" }}> {suffix}</span>
      </div>
      <div
        className="mt-1"
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "11px",
          fontWeight: 400,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "rgba(240,234,216,0.4)",
        }}
      >
        {label}
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <div id="inicio">
      <ScrollExpandMedia
        mediaType="video"
        mediaSrc={VIDEO_URL}
        posterSrc="/aaa.jpg"
        bgImageSrc="/aaa.jpg"
        title="Detectamos incendios en minutos, no en horas"
        date="Sistema activo · Patagonia"
        scrollToExpand="Desplazate para expandir"
      >
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 300,
              fontSize: "16px",
              lineHeight: 1.75,
              color: "rgba(240,234,216,0.6)",
            }}
          >
            Tecnología aérea e inteligencia artificial para el{" "}
            <strong style={{ fontWeight: 500, color: "rgba(240,234,216,0.9)" }}>
              monitoreo forestal continuo
            </strong>{" "}
            en la Patagonia.
          </p>

          <div className="flex items-center gap-6 sm:gap-10 mt-10">
            {stats.map((s, i) => (
              <div key={s.label} className="flex items-center gap-6 sm:gap-10">
                {i > 0 && (
                  <div
                    className="w-px self-stretch"
                    style={{ background: "rgba(240,234,216,0.1)" }}
                  />
                )}
                <AnimatedStat
                  target={s.target}
                  suffix={s.suffix}
                  label={s.label}
                />
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-10">
            <a
              href="#nosotros"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-sm text-[13px] font-medium transition-all hover:-translate-y-0.5"
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 500,
                letterSpacing: "0.04em",
                background: "rgba(148,241,190,0.1)",
                border: "0.5px solid rgba(148,241,190,0.3)",
                color: "#94f1be",
              }}
            >
              Conocer la plataforma
            </a>

            <a
              href="#servicios"
              className="inline-flex items-center justify-center px-7 py-3 rounded-sm text-[13px] font-light transition-colors hover:text-[rgba(240,234,216,0.85)]"
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 300,
                color: "rgba(240,234,216,0.4)",
              }}
            >
              Ver servicios
            </a>
          </div>

          <p
            className="mt-16 mb-6"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "9px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "rgba(240,234,216,0.25)",
            }}
          >
            Nos acompañan
          </p>

          <div
            className="overflow-hidden w-full"
            style={{
              maskImage:
                "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            }}
          >
            <div className="flex animate-marquee whitespace-nowrap hover:[animation-play-state:paused]">
              {[...logos, ...logos, ...logos].map((logo, i) => (
                <div
                  key={i}
                  className="inline-flex items-center justify-center mx-9 shrink-0"
                  style={{ height: "40px" }}
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="h-full w-auto object-contain transition-opacity duration-300 hover:opacity-90"
                    style={{ opacity: 0.5, filter: "grayscale(25%)" }}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollExpandMedia>
    </div>
  );
}
