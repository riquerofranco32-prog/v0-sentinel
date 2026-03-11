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

const siteUrl = 'https://v0-sentinel-smoky.vercel.app'
const heroImage = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-wMoLWM6ee43OTLxdif9ekqEJu7qlet.png'

export const metadata: Metadata = {
  title: 'SENTINEL | Detección Temprana de Incendios con Drones e IA — Argentina',
  description: 'Sentinel protege territorios en Argentina con drones autónomos e inteligencia artificial para la detección temprana de incendios forestales. Cobertura en tiempo real, alertas geoespaciales y respuesta 60% más rápida.',
  keywords: ['detección incendios forestales', 'drones monitoreo ambiental', 'prevención incendios Patagonia', 'tecnología aérea Argentina', 'IA incendios', 'monitoreo territorial', 'alerta temprana incendios', 'drones IA Argentina'],
  authors: [{ name: 'Sentinel' }],
  robots: 'index, follow',
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: 'SENTINEL | Detección Temprana de Incendios con Drones e IA',
    description: 'Tecnología aérea e inteligencia artificial para la detección temprana de incendios forestales en Argentina. Alertas en tiempo real, cobertura satelital y drones autónomos.',
    images: [{ url: heroImage, alt: 'Vista del territorio patagónico que Sentinel protege contra incendios forestales' }],
    locale: 'es_AR',
    siteName: 'Sentinel',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SENTINEL | Detección Temprana de Incendios con Drones e IA',
    description: 'Tecnología aérea e IA para detectar incendios forestales antes de que sea tarde. Operando en Argentina.',
    images: [heroImage],
  },
}

export const viewport: Viewport = {
  themeColor: '#151613',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Sentinel",
    "url": siteUrl,
    "logo": heroImage,
    "description": "Startup argentina de tecnología aérea e inteligencia artificial para la detección temprana de incendios forestales y monitoreo ambiental.",
    "email": "sentinelproyecto@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Mendoza",
      "addressCountry": "AR"
    },
    "sameAs": ["https://linktr.ee/sentinelarg"],
    "award": [
      "ILAN–UTN 2025 Ganadores",
      "Premios Sadosky 2025 Ganadores",
      "JIJE 2025 Mejor Modelo de Negocio",
      "Usina de Emprendedores 3° Puesto Nacional"
    ]
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Sentinel",
    "url": siteUrl,
    "description": "Detección temprana de incendios forestales con drones e inteligencia artificial en Argentina",
    "inLanguage": "es-AR"
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "¿Cómo puede ayudar Sentinel en la detección de incendios forestales?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sentinel utiliza drones autónomos con cámaras térmicas e inteligencia artificial para detectar focos de incendio en tiempo real, generando alertas geoespaciales verificadas con coordenadas precisas que permiten una respuesta hasta un 60% más rápida."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué instituciones pueden beneficiarse de Sentinel?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Municipios, cuerpos de bomberos, empresas forestales, ONGs ambientales, parques nacionales y productores agropecuarios pueden implementar Sentinel para proteger sus territorios."
        }
      },
      {
        "@type": "Question",
        "name": "¿Es difícil implementar Sentinel en mi región?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. El sistema está diseñado para ser desplegado rápidamente en cualquier territorio argentino. El equipo de Sentinel acompaña todo el proceso de implementación."
        }
      }
    ]
  }

  return (
    <html lang="es-AR" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" as="image" href={heroImage} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </head>
      <body className={`${dmMono.variable} ${bebasNeue.variable} font-sans antialiased bg-[#151613] text-[#FFFACA]`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
