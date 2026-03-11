import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: '--font-heading'
});

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-sans'
});

export const metadata: Metadata = {
  title: 'SENTINEL | Tecnología que protege tu territorio',
  description: 'Tecnología aérea e inteligencia artificial para la detección temprana de incendios y el monitoreo ambiental.',
  keywords: ['drones', 'incendios', 'monitoreo ambiental', 'IA', 'Argentina', 'detección temprana'],
}

export const viewport: Viewport = {
  themeColor: '#080c08',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased bg-[#080c08] text-white`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
