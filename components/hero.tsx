"use client";

import { useEffect, useRef, useState } from "react";
import ScrollExpandMedia from "./scroll-expansion-hero";

const stats = [
  { target: 8, suffix: "min", label: "Tiempo detección" },
  { target: 24, suffix: "h", label: "Monitoreo continuo" },
  { target: 98, suffix: "%", label: "Precisión objetivo" },
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
          color: "rgba(26,24,18,0.95)",
        }}
      >
        {count}
        <span style={{ color: "#0f7a4f" }}> {suffix}</span>
      </div>
      <div
        className="mt-1"
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "11px",
          fontWeight: 400,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "rgba(26,24,18,0.4)",
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
        posterSrc="/aaa-poster.webp"
        bgImageSrc="/aaa.jpg"
        title="Detectamos incendios en minutos, no en horas"
        date="Sentinel Cloud · Patagonia"
        scrollToExpand="Desplazate para expandir"
      >
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 300,
              fontSize: "16px",
              lineHeight: 1.75,
              color: "rgba(26,24,18,0.6)",
            }}
          >
            Sentinel Cloud cruza datos satelitales, información geoespacial e IA
            para vigilar tu territorio y avisar a{" "}
            <strong style={{ fontWeight: 500, color: "rgba(26,24,18,0.9)" }}>
              municipios, brigadas y grandes propietarios
            </strong>{" "}
            apenas aparece un foco real, con sensores y drones sumándose de
            forma progresiva.
          </p>

          <div className="flex items-center gap-6 sm:gap-10 mt-10">
            {stats.map((s, i) => (
              <div key={s.label} className="flex items-center gap-6 sm:gap-10">
                {i > 0 && (
                  <div
                    className="w-px self-stretch"
                    style={{ background: "rgba(26,24,18,0.1)" }}
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
              className="inline-flex items-center gap-2 px-7 py-3 rounded-sm text-[13px] font-medium transition-all border border-[rgba(15,122,79,0.3)] bg-[rgba(15,122,79,0.1)] text-[#0f7a4f] hover:bg-[#0f7a4f] hover:text-[#faf7f0] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 500,
                letterSpacing: "0.04em",
              }}
            >
              Conocer la plataforma
            </a>

            <a
              href="#servicios"
              className="inline-flex items-center justify-center px-7 py-3 rounded-sm text-[13px] font-light transition-colors hover:text-[rgba(26,24,18,0.85)]"
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 300,
                color: "rgba(26,24,18,0.4)",
              }}
            >
              Ver servicios
            </a>
          </div>
        </div>
      </ScrollExpandMedia>
    </div>
  );
}
