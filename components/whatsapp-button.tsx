"use client";

import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      <a
        href="https://linktr.ee/sentinelarg"
        target="_blank"
        rel="noopener noreferrer"
        className="relative group flex items-center justify-center"
        aria-label="Contactar con el equipo de Sentinel"
      >
        {/* Ambient pulse ring */}
        <span className="absolute inset-0 rounded-full bg-[#94f1be]/30 animate-ping duration-1000 pointer-events-none opacity-60" />
        
        {/* Outer glow ring */}
        <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#94f1be]/40 to-[#6dd9a0]/40 blur-sm opacity-70 group-hover:opacity-100 transition-opacity" />

        {/* Button body */}
        <div className="relative w-14 h-14 bg-[#94f1be] hover:bg-[#a8fcd0] rounded-full flex items-center justify-center shadow-[0_8px_25px_rgba(148,241,190,0.35)] transition-all duration-300 group-hover:scale-110">
          <MessageCircle className="w-7 h-7 text-[#0c0b09] transition-transform duration-300 group-hover:rotate-6" />

          {/* Active online dot */}
          <span className="absolute top-0 right-0 w-4 h-4 bg-[#0c0b09] rounded-full flex items-center justify-center p-0.5 border border-[#94f1be]/60">
            <span className="w-2.5 h-2.5 bg-[#4ade80] rounded-full animate-pulse" />
          </span>
        </div>

        {/* Floating tooltip */}
        <div className="absolute right-full mr-3.5 px-3.5 py-2 rounded-xl bg-[#0c0b09]/95 backdrop-blur-md border border-[#94f1be]/20 text-[#f0ead8] text-[13px] font-medium shadow-2xl opacity-0 translate-x-2 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap flex items-center gap-2">
          <span className="text-[#94f1be]">💬</span>
          <span>¿Tenés dudas? <strong className="font-semibold text-[#94f1be]">Escribinos</strong></span>
        </div>
      </a>
    </div>
  );
}

