"use client";

import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
        href="https://linktr.ee/sentinelarg"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#f1ede3] hover:bg-[#e9e3d4] border border-[rgba(26,24,18,0.12)] hover:border-[#0f7a4f]/40 text-[#1a1812] shadow-lg shadow-black/10 transition-all duration-200 hover:-translate-y-0.5"
        aria-label="Contactar al equipo de Sentinel"
      >
        <MessageCircle className="w-4 h-4 text-[#0f7a4f]" />
        <span
          className="text-[12px] font-normal tracking-wide"
          style={{
            fontFamily: "var(--font-sans)",
            color: "rgba(26,24,18,0.85)",
          }}
        >
          Contactanos
        </span>
      </a>
    </div>
  );
}
