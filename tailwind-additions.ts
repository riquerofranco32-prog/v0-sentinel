// tailwind.config.ts — agregar estas extensiones a tu config existente

import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        jura: ["'Jura'", "sans-serif"],
        dm: ["'DM Sans'", "sans-serif"],
      },
      colors: {
        sentinel: {
          bg: "#0c0b09",
          green: "#94f1be",
          cream: "rgba(240,234,216,0.95)",
        },
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        "spin-slow": "spin 8s linear infinite",
        ping: "ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite",
        "scroll-down": "scrollDown 2s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-33.333%)" },
        },
        scrollDown: {
          "0%": { top: "-100%" },
          "100%": { top: "200%" },
        },
      },
    },
  },
  plugins: [],
}

export default config
