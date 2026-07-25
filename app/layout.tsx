import type { Metadata, Viewport } from "next";
import { Jura, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const jura = Jura({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-heading",
});

const inter = Inter({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "SENTINEL | Tecnología que protege tu territorio",
  description:
    "Tecnología aérea e inteligencia artificial para la detección temprana de incendios y el monitoreo ambiental.",
  keywords: [
    "drones",
    "incendios",
    "monitoreo ambiental",
    "IA",
    "Argentina",
    "detección temprana",
  ],
};

export const viewport: Viewport = {
  themeColor: "#0c0b09",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${inter.variable} ${jura.variable} font-sans antialiased bg-[#0c0b09] text-[#f0ead8]`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
