"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";

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
    window.addEventListener("scroll", handleScroll);
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
          {/* ponytail: logoo.png's wordmark is light-on-transparent (built
              for the old dark theme), so it needs a dark backing plate to
              stay legible now that the page around it is light. No dark
              logo variant exists in /public to swap in instead. */}
          <a href="/#inicio" className="flex items-center gap-3 group">
            <div
              className="flex items-center rounded-md px-3 py-1.5"
              style={{ background: "#0c0b09" }}
            >
              <Image
                src="/logoo.png"
                alt="Sentinel Logo"
                width={140}
                height={32}
                priority
                className="h-6 object-contain"
                style={{ width: "auto" }}
              />
            </div>
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
              className="text-[12px] font-normal px-4 py-2 rounded-sm border transition-all duration-200 active:scale-[0.98]"
              style={{
                fontFamily: "var(--font-sans)",
                borderColor: "rgba(26,24,18,0.18)",
                color: "rgba(26,24,18,0.85)",
                background: "rgba(26,24,18,0.03)",
                letterSpacing: "0.04em",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(15,122,79,0.5)";
                e.currentTarget.style.color = "#0f7a4f";
                e.currentTarget.style.background = "rgba(15,122,79,0.06)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(26,24,18,0.18)";
                e.currentTarget.style.color = "rgba(26,24,18,0.85)";
                e.currentTarget.style.background = "rgba(26,24,18,0.03)";
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
