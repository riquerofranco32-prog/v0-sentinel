"use client";

import { Mail, MapPin, MessageCircle, Instagram, Linkedin } from "lucide-react";
import Image from "next/image";
import { SentinelLogo } from "@/components/sentinel-logo";

const footerLinks = {
  Producto: [
    { label: "Cómo funciona", href: "/#servicios" },
    { label: "Reconocimientos", href: "/#noticias" },
    { label: "Prensa", href: "/#prensa" },
  ],
  Empresa: [
    { label: "Solución", href: "/#nosotros" },
    { label: "Equipo", href: "/#equipo" },
  ],
  Soporte: [
    { label: "Blog", href: "/blog" },
    { label: "Contacto", href: "/#contacto" },
    { label: "FAQ", href: "/#faq" },
  ],
};

const socialLinks = [
  {
    href: "https://instagram.com/sentinel.arg",
    label: "Instagram",
    icon: <Instagram className="w-4 h-4" />,
  },
  {
    href: "https://linkedin.com/company/sentinelarg",
    label: "LinkedIn",
    icon: <Linkedin className="w-4 h-4" />,
  },
  {
    href: "https://linktr.ee/sentinelarg",
    label: "WhatsApp",
    icon: <MessageCircle className="w-4 h-4" />,
  },
];

export function Footer() {
  return (
    <footer
      id="contacto"
      className="relative overflow-hidden"
      style={{ background: "#faf7f0" }}
    >
      {/* Top border gradient */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(15,122,79,0.35), transparent)",
        }}
      />

      {/* Foto de fondo: muy sutil, como textura, para que el texto oscuro
          del footer siga siendo legible sobre un fondo claro. */}
      <div className="absolute inset-0">
        <Image
          src="/fot.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
          style={{ opacity: 0.08, filter: "saturate(0.6)" }}
          priority={false}
        />
        {/* Degradado superior */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(250,247,240,0.92) 0%, rgba(250,247,240,0.6) 40%, rgba(250,247,240,0.3) 70%, rgba(250,247,240,0.3) 100%)",
          }}
        />
      </div>

      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none">
        <span
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 800,
            fontSize: "18vw",
            color: "rgba(26,24,18,0.05)",
            letterSpacing: "0.1em",
            whiteSpace: "nowrap",
          }}
        >
          SENTINEL
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-14">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div
              className="mb-5 inline-flex items-center"
              style={{ color: "rgba(26,24,18,0.92)" }}
            >
              <SentinelLogo className="h-6 w-auto" />
            </div>

            <p
              className="text-[13px] leading-relaxed mb-7 max-w-xs"
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 300,
                color: "rgba(26,24,18,0.62)",
              }}
            >
              Tecnología aérea e inteligencia artificial para la detección
              temprana de incendios y el monitoreo ambiental.
            </p>

            <div className="space-y-2.5 mb-7">
              <a
                href="mailto:sentinelproyecto@gmail.com"
                className="flex items-center gap-2.5 w-fit transition-colors duration-200"
                style={{ color: "rgba(26,24,18,0.65)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "rgba(26,24,18,0.8)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(26,24,18,0.65)")
                }
              >
                <Mail
                  className="w-3.5 h-3.5 flex-shrink-0"
                  style={{ color: "#0f7a4f", opacity: 0.7 }}
                />
                <span
                  className="text-[12px]"
                  style={{ fontFamily: "var(--font-sans)", fontWeight: 300 }}
                >
                  sentinelproyecto@gmail.com
                </span>
              </a>
              <div className="flex items-center gap-2.5">
                <MapPin
                  className="w-3.5 h-3.5 flex-shrink-0"
                  style={{ color: "#0f7a4f", opacity: 0.7 }}
                />
                <span
                  className="text-[12px]"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: 300,
                    color: "rgba(26,24,18,0.65)",
                  }}
                >
                  San Rafael, Mendoza, Argentina
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-10 h-10 rounded-sm flex items-center justify-center transition-all duration-200"
                  style={{
                    background: "rgba(26,24,18,0.05)",
                    border: "0.5px solid rgba(26,24,18,0.1)",
                    color: "rgba(26,24,18,0.55)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(15,122,79,0.4)";
                    e.currentTarget.style.color = "#0f7a4f";
                    e.currentTarget.style.background = "rgba(15,122,79,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(26,24,18,0.1)";
                    e.currentTarget.style.color = "rgba(26,24,18,0.55)";
                    e.currentTarget.style.background = "rgba(26,24,18,0.05)";
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <p
                className="text-[11px] tracking-[0.2em] uppercase mb-5"
                style={{
                  fontFamily: "var(--font-sans)",
                  color: "rgba(26,24,18,0.25)",
                }}
              >
                {section}
              </p>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[13px] transition-colors duration-200"
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontWeight: 300,
                        color: "rgba(26,24,18,0.62)",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "rgba(26,24,18,0.8)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "rgba(26,24,18,0.62)")
                      }
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div
          className="pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderColor: "rgba(26,24,18,0.08)" }}
        >
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3 text-center sm:text-left">
            <p
              className="text-[12px]"
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 300,
                color: "rgba(26,24,18,0.6)",
              }}
            >
              © {new Date().getFullYear()} Sentinel. Todos los derechos
              reservados.
            </p>
            <span
              className="hidden sm:inline text-[10px]"
              style={{ color: "rgba(26,24,18,0.3)" }}
            >
              •
            </span>
            <span
              className="text-[11px] hidden sm:inline"
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 300,
                color: "rgba(26,24,18,0.55)",
              }}
            >
              Monitoreo y Alerta Temprana de Incendios
            </span>
          </div>

          {/* Creado por Se7en Dev */}
          <div className="flex items-center">
            <a
              href="https://se7endev.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-[12px] transition-colors duration-200"
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 300,
                color: "rgba(26,24,18,0.65)",
              }}
            >
              <span>Creado por</span>
              <span className="font-medium text-[#0f7a4f] group-hover:underline underline-offset-4 decoration-[#0f7a4f]/50 transition-all inline-flex items-center gap-1">
                Se7en Dev
                <svg
                  className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 opacity-70 group-hover:opacity-100"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 17L17 7M17 7H7M17 7V17"
                  />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
