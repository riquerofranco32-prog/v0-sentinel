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

const siteUrl = "https://www.sentineltech.com.ar";
const title = "Monitoreo de Incendios Forestales con Drones e IA | Sentinel";
const description =
  "Sentinel: la solución a incendios forestales. Monitoreo de incendios con drones autónomos e IA. Detección en minutos para Patagonia y Argentina.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | Sentinel Technologies",
  },
  description,
  keywords: [
    "monitoreo de incendios",
    "monitoreo de incendios forestales",
    "solución a incendios forestales",
    "soluciones a incendios",
    "monitoreo con drones",
    "incendios forestales",
    "detección incendios forestales",
    "prevención incendios Patagonia",
    "drones monitoreo ambiental",
    "inteligencia artificial incendios",
    "Sentinel Technologies Argentina",
    "monitoreo Río Negro",
    "wildfire detection Argentina",
  ],
  authors: [{ name: "Sentinel Technologies", url: siteUrl }],
  creator: "Sentinel Technologies",
  publisher: "Sentinel Technologies",
  verification: {
    google: "_e_gueYaQyl1g7OI7D112etzhS028QTSXqnFzdM1Gfg",
  },
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
    canonical: siteUrl,
    languages: { "es-AR": siteUrl },
  },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "Sentinel Technologies",
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#0c0b09",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Sentinel Technologies",
  url: siteUrl,
  logo: `${siteUrl}/logoo.png`,
  description,
  areaServed: [
    { "@type": "AdministrativeArea", name: "Neuquén" },
    { "@type": "AdministrativeArea", name: "Río Negro" },
    { "@type": "AdministrativeArea", name: "Patagonia" },
    { "@type": "Country", name: "Argentina" },
  ],
  sameAs: [
    "https://instagram.com/sentinel.arg",
    "https://linktr.ee/sentinelarg",
  ],
  knowsAbout: [
    "Wildfire Detection",
    "Drone Technology",
    "Artificial Intelligence",
    "Environmental Monitoring",
    "Forest Fire Prevention",
  ],
  award: ["ILAN Awards 2025", "Premio Sadosky 2025", "JIJE 2025"],
};

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Sentinel Cloud",
  applicationCategory: "EnvironmentalManagement",
  operatingSystem: "Web",
  description:
    "Plataforma SaaS de monitoreo, alertas y dashboards en tiempo real para detección de incendios forestales.",
  offers: {
    "@type": "Offer",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      description: "Modelo sin CAPEX inicial. Piloto de 4 a 8 semanas.",
    },
  },
  provider: {
    "@type": "Organization",
    name: "Sentinel Technologies",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        {/* ponytail: the hero video streams from Cloudinary — preconnecting
            lets the browser open that connection while the HTML is still
            parsing instead of waiting until the <video> tag is discovered,
            which matters on the LCP critical path. */}
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${jura.variable} font-sans antialiased bg-[#0c0b09] text-[#f0ead8]`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
