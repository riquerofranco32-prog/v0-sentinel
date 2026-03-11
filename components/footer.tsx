"use client"

import { SentinelLogoIcon } from "@/components/sentinel-logo"
import { Mail, MapPin } from "lucide-react"

const footerLinks = {
  producto: [
    { label: "Cómo Funciona", href: "#servicios" },
    { label: "Casos de Uso", href: "#casos" },
    { label: "Precios", href: "#contacto" },
  ],
  empresa: [
    { label: "Nosotros", href: "#nosotros" },
    { label: "Equipo", href: "#equipo" },
    { label: "Noticias", href: "#noticias" },
  ],
  soporte: [
    { label: "Contacto", href: "#contacto" },
    { label: "FAQ", href: "#faq" },
    { label: "Documentación", href: "#" },
  ],
}

const socialLinks = [
  {
    href: "https://instagram.com/sentinel.arg",
    label: "Instagram",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    href: "https://linkedin.com/company/sentinelarg",
    label: "LinkedIn",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
]

export function Footer() {
  return (
    <footer id="contacto" className="bg-[#080c08] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <SentinelLogoIcon className="w-10 h-10" />
              <span
                className="text-lg font-medium text-white tracking-[0.2em]"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                SENTINEL
              </span>
            </div>
            <p className="text-white/60 mb-6 max-w-sm leading-relaxed">
              Tecnología aérea e inteligencia artificial para la detección temprana 
              de incendios y el monitoreo ambiental en Argentina.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-white/60">
                <Mail className="w-4 h-4 text-[#22c55e]" />
                <span className="text-sm">sentinelproyecto@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 text-white/60">
                <MapPin className="w-4 h-4 text-[#22c55e]" />
                <span className="text-sm">Mendoza, Argentina</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-white/60 hover:bg-[#22c55e]/20 hover:text-[#22c55e] transition-all"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="text-white font-semibold mb-4">Producto</h4>
            <ul className="space-y-3">
              {footerLinks.producto.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Empresa</h4>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Soporte</h4>
            <ul className="space-y-3">
              {footerLinks.soporte.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            All copyrights @sentinel.arg · Visioned and Crafted by Sentinel
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-white/40 hover:text-white/60 text-sm transition-colors">
              Términos
            </a>
            <a href="#" className="text-white/40 hover:text-white/60 text-sm transition-colors">
              Privacidad
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
