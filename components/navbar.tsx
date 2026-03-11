"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const navLinks = [
  { href: "#inicio", label: "INICIO" },
  { href: "#nosotros", label: "NOSOTROS" },
  { href: "#servicios", label: "SERVICIOS" },
  { href: "#equipo", label: "EQUIPO" },
  { href: "#noticias", label: "NOTICIAS" },
  { href: "#contacto", label: "CONTACTO" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-[#151613]/95 backdrop-blur-xl border-b border-[#FFFACA]/10"
          : "bg-gradient-to-b from-[#151613]/60 to-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#inicio" className="flex items-center gap-3 group">
            {/* Pulsing dot */}
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#004f39] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#004f39]"></span>
            </span>
            <span 
              className="text-xl font-bold text-[#FFFACA] tracking-[0.2em]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              SENTINEL
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs tracking-[0.15em] transition-colors font-medium"
                style={{ color: "rgba(255, 250, 202, 0.6)" }}
                onMouseEnter={(e) => e.currentTarget.style.color = "rgba(255, 250, 202, 1)"}
                onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255, 250, 202, 0.6)"}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button
              asChild
              className="bg-[#004f39] hover:bg-[#003d2c] text-[#FFFACA] font-semibold rounded-full px-6 text-xs tracking-wider"
            >
              <a
                href="https://linktr.ee/sentinelarg"
                target="_blank"
                rel="noopener noreferrer"
              >
                SOLICITAR REUNIÓN
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#FFFACA] p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? "max-h-[500px]" : "max-h-0"
        }`}
      >
        <div className="bg-[#151613]/98 backdrop-blur-xl border-t border-[#FFFACA]/10 px-4 py-4 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block text-xs tracking-[0.15em] font-medium py-2"
              style={{ color: "rgba(255, 250, 202, 0.6)" }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <Button
            asChild
            className="w-full bg-[#004f39] hover:bg-[#003d2c] text-[#FFFACA] font-semibold rounded-full text-xs tracking-wider"
          >
            <a
              href="https://linktr.ee/sentinelarg"
              target="_blank"
              rel="noopener noreferrer"
            >
              SOLICITAR REUNIÓN
            </a>
          </Button>
        </div>
      </div>
    </nav>
  )
}
