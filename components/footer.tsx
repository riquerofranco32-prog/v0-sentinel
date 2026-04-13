"use client"

import { Mail, MapPin } from "lucide-react"

const footerLinks = {
  Producto: [
    { label: "Cómo funciona", href: "#servicios" },
    { label: "Casos de uso", href: "#casos" },
  ],
  Empresa: [
    { label: "Nosotros", href: "#nosotros" },
    { label: "Equipo", href: "#equipo" },
  ],
  Soporte: [
    { label: "Contacto", href: "#contacto" },
    { label: "FAQ", href: "#faq" },
  ],
}

const socialLinks = [
  {
    href: "https://instagram.com/sentinel.arg",
    label: "Instagram",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    href: "https://linkedin.com/company/sentinelarg",
    label: "LinkedIn",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
]

export function Footer() {
  return (
    <footer
      id="contacto"
      className="relative overflow-hidden"
      style={{ background: "#070806" }}
    >
      {/* Top border gradient */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(74,222,128,0.3), rgba(251,146,60,0.3), transparent)" }}
      />

      {/* Foto de fondo */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: "70%",
          backgroundImage: "url('/fot.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          opacity: 0.22,
        }}
      />

      {/* Overlay degradado sobre la foto */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: "70%",
          background: "linear-gradient(to top, rgba(7,8,6,0.98) 0%, rgba(7,8,6,0.65) 45%, transparent 100%)",
        }}
      />

      {/* Degradado superior */}
      <div
        className="absolute top-0 left-0 right-0"
        style={{
          height: "35%",
          background: "linear-gradient(to bottom, rgba(7,8,6,1) 0%, transparent 100%)",
        }}
      />

      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none">
        <span
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: "18vw",
            color: "rgba(240,234,216,0.02)",
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
            <div className="flex items-center gap-3 mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4ade80] opacity-60"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4ade80]"></span>
              </span>
              <span
                className="text-lg font-extrabold tracking-tight"
                style={{ fontFamily: "'Syne', sans-serif", color: "rgba(240,234,216,0.9)" }}
              >
                SENTINEL
              </span>
            </div>

            {/* Badge región */}
            <div
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full mb-5"
              style={{ border: "0.5px solid rgba(74,222,128,0.2)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]" />
              <span
                className="text-[10px] tracking-widest uppercase"
                style={{ fontFamily: "'Inter', sans-serif", color: "rgba(74,222,128,0.7)" }}
              >
                Patagonia · Argentina
              </span>
            </div>

            <p
              className="text-[13px] leading-relaxed mb-7 max-w-xs"
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, color: "rgba(240,234,216,0.4)" }}
            >
              Tecnología aérea e inteligencia artificial para la detección
              temprana de incendios y el monitoreo ambiental.
            </p>

            <div className="space-y-2.5 mb-7">
              {[
                { icon: Mail, text: "sentinelproyecto@gmail.com" },
                { icon: MapPin, text: "San Rafael, Mendoza — Argentina" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2.5">
                  <item.icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#4ade80", opacity: 0.7 }} />
                  <span
                    className="text-[12px]"
                    style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, color: "rgba(240,234,216,0.45)" }}
                  >
                    {item.text}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-8 h-8 rounded-sm flex items-center justify-center transition-all duration-200"
                  style={{
                    background: "rgba(240,234,216,0.05)",
                    border: "0.5px solid rgba(240,234,216,0.1)",
                    color: "rgba(240,234,216,0.4)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(74,222,128,0.4)"
                    e.currentTarget.style.color = "#4ade80"
                    e.currentTarget.style.background = "rgba(74,222,128,0.08)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(240,234,216,0.1)"
                    e.currentTarget.style.color = "rgba(240,234,216,0.4)"
                    e.currentTarget.style.background = "rgba(240,234,216,0.05)"
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
                style={{ fontFamily: "'Inter', sans-serif", color: "rgba(240,234,216,0.25)" }}
              >
                {section}
              </p>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[13px] transition-colors duration-200"
                      style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, color: "rgba(240,234,216,0.4)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(240,234,216,0.8)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(240,234,216,0.4)")}
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
          className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 border-t"
          style={{ borderColor: "rgba(240,234,216,0.06)" }}
        >
          <p
            className="text-[11px]"
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, color: "rgba(240,234,216,0.25)" }}
          >
            © 2025 Sentinel · Visioned and Crafted by Sentinel
          </p>
          <div className="flex gap-6">
            {["Términos", "Privacidad"].map((label) => (
              <a
                key={label}
                href="#"
                className="text-[11px] transition-colors duration-200"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, color: "rgba(240,234,216,0.25)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(240,234,216,0.55)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(240,234,216,0.25)")}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
