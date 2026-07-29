"use client";

import { FaqSectionWithCategories } from "@/components/blocks/faq-with-categories";

const faqs = [
  {
    question:
      "¿Cómo puede ayudar Sentinel en la detección de incendios forestales?",
    answer:
      "Utilizamos drones con cámaras térmicas e IA a bordo que analizan en tiempo real imágenes para identificar focos de calor con 98% de precisión, enviando alertas automáticas geolocalizadas.",
    category: "Producto",
  },
  {
    question: "¿Qué instituciones pueden beneficiarse de Sentinel?",
    answer:
      "Municipios, bomberos, empresas forestales, parques nacionales, productores agropecuarios y cualquier organización que gestione grandes superficies de terreno.",
    category: "Producto",
  },
  {
    question: "¿Es difícil implementar Sentinel en mi región?",
    answer:
      "No. Nuestra plataforma es cloud-based y se adapta a cualquier territorio. Solo necesitás acceso a internet y nuestro equipo se encarga del resto.",
    category: "Implementación",
  },
  {
    question: "¿Necesito conocimientos técnicos para usar Sentinel?",
    answer:
      "No. La interfaz está diseñada para ser intuitiva. Recibís alertas en tu dispositivo y podés tomar decisiones sin necesidad de ser un experto.",
    category: "Implementación",
  },
  {
    question: "¿Qué tipo de soporte ofrecen?",
    answer:
      "Soporte 24/7 durante operaciones críticas, onboarding personalizado y actualizaciones continuas de los modelos de IA.",
    category: "Soporte",
  },
  {
    question:
      "¿Los datos en vivo de la web son de la red de drones de Sentinel?",
    answer:
      "No, y queremos ser claros con eso: el índice de riesgo y el mapa de focos activos usan fuentes públicas (Open-Meteo y NASA FIRMS) a modo ilustrativo, para mostrar la misma clase de variables que nuestro sistema procesa. Los datos que genera la red propia de drones de un cliente no son públicos ni se muestran en la web.",
    category: "Producto",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export function FAQ() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <FaqSectionWithCategories
        title="Tenemos las respuestas que buscás"
        items={faqs}
        contactInfo={{
          title: "¿Tenés otra pregunta?",
          buttonText: "Hablar con el equipo",
          onContact: () => {
            document
              .getElementById("contacto")
              ?.scrollIntoView({ behavior: "smooth" });
          },
        }}
      />
    </>
  );
}
