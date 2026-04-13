"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#servicios", label: "Servicios" },
  { href: "#equipo", label: "Equipo" },
  { href: "#noticias", label: "Noticias" },
  { href: "#contacto", label: "Contacto" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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
          <a href="#inicio" className="flex items-center gap-3 group">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#004f39] opacity-60"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#004f39]"></span>
            </span>
            <span
              className="text-lg font-extrabold text-[#f0ead8] tracking-tight"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              SENTINEL
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              
                key={link.href}
                href={link.href}
                className="text-[13px] font-light transition-colors"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  color: "rgba(240,234,216,0.45)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "rgba(240,234,216,0.95)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(240,234,216,0.45)")
                }
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            
              href="https://linktr.ee/sentinelarg"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] font-medium px-5 py-2 rounded-sm border transition-all"
              style={{
                fontFamily: "'Inter', sans-serif",
                borderColor: "rgba(240,234,216,0.2)",
                color: "rgba(240,234,216,0.8)",
                letterSpacing: "0.06em",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(240,234,216,0.5)"
                e.currentTarget.style.color = "rgba(240,234,216,1)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(240,234,216,0.2)"
                e.currentTarget.style.color = "rgba(240,234,216,0.8)"
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
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
            
              key={link.href}
              href={link.href}
              className="block text-[13px] font-light"
              style={{
                fontFamily: "'Inter', sans-serif",
                color: "rgba(240,234,216,0.55)",
              }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          
            href="https://linktr.ee/sentinelarg"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center text-[12px] font-medium px-5 py-2.5 border rounded-sm"
            style={{
              fontFamily: "'Inter', sans-serif",
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
  )
}
