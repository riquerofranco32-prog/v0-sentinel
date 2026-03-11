"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SentinelLogoIcon } from "@/components/sentinel-logo"

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#080c08]/95 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#inicio" className="flex items-center gap-3 group">
            <SentinelLogoIcon className="w-10 h-10 transition-transform group-hover:scale-110" />
            <span 
              className="text-lg font-medium text-white tracking-[0.3em]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              S E N T I N E L
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-white/70 hover:text-white transition-colors font-medium tracking-wide"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button
              asChild
              className="bg-[#22c55e] hover:bg-[#16a34a] text-[#080c08] font-semibold rounded-full px-6"
            >
              <a
                href="https://linktr.ee/sentinelarg"
                target="_blank"
                rel="noopener noreferrer"
              >
                Solicitar reunión
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
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
        <div className="bg-[#080c08]/95 backdrop-blur-xl border-t border-white/10 px-4 py-4 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block text-sm text-white/70 hover:text-white transition-colors font-medium tracking-wide py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <Button
            asChild
            className="w-full bg-[#22c55e] hover:bg-[#16a34a] text-[#080c08] font-semibold rounded-full"
          >
            <a
              href="https://linktr.ee/sentinelarg"
              target="_blank"
              rel="noopener noreferrer"
            >
              Solicitar reunión
            </a>
          </Button>
        </div>
      </div>
    </nav>
  )
}
