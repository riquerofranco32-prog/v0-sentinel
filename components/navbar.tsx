"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/#inicio", label: "Inicio" },
  { href: "/#nosotros", label: "Solución" },
  { href: "/#servicios", label: "Servicios" },
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-[#0c0b09]/95 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="/#inicio" className="flex items-center gap-3 group">
            <Image
              src="/logoo.png"
              alt="Sentinel Logo"
              width={140}
              height={32}
              priority
              className="h-8 object-contain"
              style={{ width: "auto" }}
            />
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-[13px] font-light transition-all duration-200 hover:text-white group py-1"
                style={{
                  fontFamily: "var(--font-sans)",
                  color: "rgba(240,234,216,0.55)",
                }}
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#94f1be] transition-all duration-300 group-hover:w-full rounded-full opacity-80" />
              </a>
            ))}
          </div>

          {/* CTA & Live Status */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#94f1be]/5 border border-[#94f1be]/15 text-[11px] text-[#94f1be]/80">
              <span className="w-1.5 h-1.5 rounded-full bg-[#94f1be] animate-pulse" />
              <span className="font-light tracking-wider uppercase text-[10px]">Patagonia Activa</span>
            </div>

            <a
              href="https://linktr.ee/sentinelarg"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] font-medium px-5 py-2 rounded-sm border transition-all duration-300 shadow-sm"
              style={{
                fontFamily: "var(--font-sans)",
                borderColor: "rgba(148,241,190,0.3)",
                color: "#94f1be",
                background: "rgba(148,241,190,0.06)",
                letterSpacing: "0.04em",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(148,241,190,0.7)";
                e.currentTarget.style.color = "#0c0b09";
                e.currentTarget.style.background = "#94f1be";
                e.currentTarget.style.boxShadow = "0 0 20px rgba(148,241,190,0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(148,241,190,0.3)";
                e.currentTarget.style.color = "#94f1be";
                e.currentTarget.style.background = "rgba(148,241,190,0.06)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Solicitar reunión
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-[#f0ead8] p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
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
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? "max-h-[400px]" : "max-h-0"
        }`}
      >
        <div className="bg-[#0c0b09]/98 backdrop-blur-xl border-t border-white/5 px-6 py-5 space-y-5">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block text-[13px] font-light"
              style={{
                fontFamily: "var(--font-sans)",
                color: "rgba(240,234,216,0.55)",
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
            className="block text-center text-[12px] font-medium px-5 py-2.5 border rounded-sm"
            style={{
              fontFamily: "var(--font-sans)",
              borderColor: "rgba(240,234,216,0.2)",
              color: "rgba(240,234,216,0.8)",
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
