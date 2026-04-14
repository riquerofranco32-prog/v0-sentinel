// app/head.tsx  o  components/SentinelHead.tsx
// Usarlo en app/layout.tsx o en cada page según tu estructura Next.js

import type { Metadata } from "next"

// ─── Exportar para usar en layout.tsx ─────────────────────────────────────────
export const sentinelMetadata: Metadata = {
  metadataBase: new URL("https://sentinel.com.ar"),

  title: {
    default: "Sentinel Technologies — Detección temprana de incendios forestales",
    template: "%s | Sentinel Technologies",
  },
  description:
    "Protegemos la Patagonia con drones autónomos e inteligencia artificial. Detectamos incendios forestales en menos de 15 minutos. Sin CAPEX inicial, modelo SaaS.",
  keywords: [
    "detección incendios forestales",
    "prevención incendios Patagonia",
    "drones monitoreo ambiental",
    "inteligencia artificial incendios",
    "Sentinel Technologies Argentina",
    "ResQ-1 drone",
    "Stratos drone",
    "Sentinel Cloud",
    "monitoreo Neuquén",
    "monitoreo Río Negro",
    "wildfire detection Argentina",
    "early fire detection drones",
  ],
  authors: [{ name: "Sentinel Technologies", url: "https://sentinel.com.ar" }],
  creator: "Sentinel Technologies",
  publisher: "Sentinel Technologies",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://sentinel.com.ar",
    languages: { "es-AR": "https://sentinel.com.ar" },
  },

  // ── Open Graph ──────────────────────────────────────────────────────────────
  openGraph: {
    type: "website",
    url: "https://sentinel.com.ar",
    siteName: "Sentinel Technologies",
    title: "Sentinel Technologies — Plataforma de prevención de incendios forestales",
    description:
      "Tecnología aérea e inteligencia artificial para detectar incendios en minutos, no en horas. Protegemos la Patagonia.",
    locale: "es_AR",
    images: [
      {
        url: "/og-image.jpg",           // 1200×630 recomendado
        width: 1200,
        height: 630,
        alt: "Sentinel Technologies — Detección de incendios forestales con drones en Patagonia",
        type: "image/jpeg",
      },
    ],
  },

  // ── Twitter / X ─────────────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: "Sentinel Technologies — Detección temprana de incendios",
    description:
      "Drones autónomos e IA para detectar incendios forestales en minutos. Patagonia protegida.",
    images: ["/og-image.jpg"],
    // creator: "@sentineltech_ar",   // agregar cuando tengas cuenta
  },

  // ── Íconos ───────────────────────────────────────────────────────────────────
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },

  // ── Manifest (PWA) ───────────────────────────────────────────────────────────
  manifest: "/manifest.json",

  // ── Verification (agregar cuando corresponda) ─────────────────────────────
  // verification: {
  //   google: "xxxx",
  //   yandex: "xxxx",
  // },
}


// ─── JSON-LD Structured Data ──────────────────────────────────────────────────
// Pegarlo en app/layout.tsx dentro de <head> usando dangerouslySetInnerHTML
export const structuredData = {
  organization: {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Sentinel Technologies",
    url: "https://sentinel.com.ar",
    logo: "https://sentinel.com.ar/logo.png",
    description:
      "Plataforma de detección temprana de incendios forestales mediante drones autónomos e inteligencia artificial en la Patagonia argentina.",
    areaServed: [
      { "@type": "AdministrativeArea", name: "Neuquén" },
      { "@type": "AdministrativeArea", name: "Río Negro" },
      { "@type": "AdministrativeArea", name: "Patagonia" },
      { "@type": "Country", name: "Argentina" },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "info@sentinel.com.ar",
      availableLanguage: "Spanish",
    },
    sameAs: [
      "https://www.linkedin.com/company/sentinel-technologies",
      // Agregar Instagram, Twitter cuando corresponda
    ],
    knowsAbout: [
      "Wildfire Detection",
      "Drone Technology",
      "Artificial Intelligence",
      "Environmental Monitoring",
      "Forest Fire Prevention",
    ],
    award: [
      "ILAN Awards 2025",
      "Premio Sadosky 2025 — Innovación Transformadora",
      "JIJE 2025 Best Business Model",
    ],
  },

  product: {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Sentinel Cloud",
    applicationCategory: "EnvironmentalManagement",
    operatingSystem: "Web",
    description:
      "Plataforma SaaS de monitoreo, alertas y dashboards en tiempo real para detección de incendios forestales.",
    offers: {
      "@type": "Offer",
      pricingType: "Subscription",
      description: "Modelo sin CAPEX inicial. Piloto de 4 a 8 semanas.",
    },
    provider: {
      "@type": "Organization",
      name: "Sentinel Technologies",
    },
  },
}

// ─── Componente para insertar JSON-LD ─────────────────────────────────────────
export function StructuredDataScript() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData.organization),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData.product),
        }}
      />
    </>
  )
}
