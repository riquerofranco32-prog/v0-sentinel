import type { Metadata, Viewport } from 'next'
import { Bebas_Neue, DM_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const bebasNeue = Bebas_Neue({ 
  weight: '400',
  subsets: ["latin"],
  variable: '--font-heading'
});

const dmMono = DM_Mono({ 
  weight: ['400', '500'],
  subsets: ["latin"],
  variable: '--font-sans'
});

export const metadata: Metadata = {
  title: 'SENTINEL | Tecnología que protege tu territorio',
  description: 'Tecnología aérea e inteligencia artificial para la detección temprana de incendios y el monitoreo ambiental.',
  keywords: ['drones', 'incendios', 'monitoreo ambiental', 'IA', 'Argentina', 'detección temprana'],
}

export const viewport: Viewport = {
  themeColor: '#151613',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${dmMono.variable} ${bebasNeue.variable} font-sans antialiased bg-[#151613] text-[#FFFACA]`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
