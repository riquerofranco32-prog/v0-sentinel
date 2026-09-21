"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { SentinelLogo } from "@/components/sentinel-logo";

const navLinks = [
  { href: "/#inicio", label: "Inicio" },
  { href: "/#nosotros", label: "Solución" },
  { href: "/#servicios", label: "Servicios" },
  { href: "/#noticias", label: "Logros" },
  { href: "/#equipo", label: "Equipo" },
  { href: "/blog", label: "Blog" },
  { href: "/#contacto", label: "Contacto" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      aria-label="Navegación principal"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-[#faf7f0]/95 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href="/#inicio"
            className="flex items-center"
            style={{ color: "rgba(26,24,18,0.92)" }}
          >
            <SentinelLogo className="h-5 w-auto" />
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[13px] font-light transition-colors duration-200"
                style={{
                  fontFamily: "var(--font-sans)",
                  color: "rgba(26,24,18,0.65)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "rgba(26,24,18,0.95)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(26,24,18,0.65)")
                }
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <a
              href="https://linktr.ee/sentinelarg"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] font-medium px-5 py-2.5 rounded-full transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
              style={{
                fontFamily: "var(--font-sans)",
                color: "#faf7f0",
                background: "#0c0b09",
                letterSpacing: "0.04em",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#0f7a4f";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#0c0b09";
              }}
            >
              Solicitar reunión
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className="md:hidden text-[#1a1812] p-2.5 -mr-2.5"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        aria-hidden={!isMobileMenuOpen}
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? "max-h-[400px]" : "max-h-0"
        }`}
      >
        <div className="bg-[#faf7f0]/98 backdrop-blur-xl border-t border-white/5 px-6 py-5 space-y-5">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              tabIndex={isMobileMenuOpen ? 0 : -1}
              className="block text-[13px] font-light"
              style={{
                fontFamily: "var(--font-sans)",
                color: "rgba(26,24,18,0.68)",
              }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://linktr.ee/sentinelarg"
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={isMobileMenuOpen ? 0 : -1}
            className="block text-center text-[12px] font-medium px-5 py-2.5 border rounded-sm transition-transform duration-150 active:scale-[0.98]"
            style={{
              fontFamily: "var(--font-sans)",
              borderColor: "rgba(26,24,18,0.2)",
              color: "rgba(26,24,18,0.8)",
              letterSpacing: "0.06em",
            }}
          >
            Solicitar reunión
          </a>
        </div>
      </div>
    </nav>
  );
}
