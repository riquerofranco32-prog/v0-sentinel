"use client";

import { FaqSectionWithCategories } from "@/components/blocks/faq-with-categories";

const faqs = [
  {
    question: "¿Cómo funciona el monitoreo con drones para prevenir incendios?",
    answer:
      "Drones autónomos con cámaras térmicas sobrevuelan el territorio de forma programada. Un modelo de IA analiza cada imagen en tiempo real, descarta falsos positivos y genera una alerta geolocalizada apenas confirma un foco de calor real, con 98% de precisión y antes de que se convierta en un incendio incontrolable.",
    category: "Producto",
  },
  {
    question: "¿Y si la IA se equivoca y salta una falsa alarma?",
    answer:
      "Es la primera pregunta que hace cualquier brigada, y con razón: una alerta falsa cuesta tiempo y recursos. Por eso el modelo cruza cámara térmica, cámara óptica y coordenadas antes de confirmar un foco, y ese cruce es justamente lo que sostiene el 98% de precisión que medimos en campo.",
    category: "Producto",
  },
  {
    question: "¿Cuánto cuesta implementar Sentinel?",
    answer:
      "No hay inversión inicial en equipos (CAPEX): el servicio se contrata como una suscripción sobre la cobertura que necesitás, no como una compra de drones. Arrancamos con un piloto acotado para que veas resultados antes de comprometerte a un contrato mayor.",
    category: "Precio",
  },
  {
    question: "¿Cuánto tarda en estar operativo en mi territorio?",
    answer:
      "Un piloto típico está en el aire y generando alertas en 4 a 8 semanas desde que arrancamos, sin obra ni infraestructura que instalar de tu lado. Nuestro equipo se encarga del despliegue de principio a fin.",
    category: "Implementación",
  },
  {
    question: "¿Es difícil implementar Sentinel en mi región?",
    answer:
      "No. La plataforma es cloud-based y se adapta a cualquier territorio: bosque nativo, forestación productiva o campo abierto. Solo necesitás acceso a internet, el resto lo resuelve nuestro equipo.",
    category: "Implementación",
  },
  {
    question: "¿Necesito conocimientos técnicos para usar Sentinel?",
    answer:
      "No. La interfaz está diseñada para ser intuitiva. Recibís alertas en tu dispositivo con la ubicación exacta del foco y podés decidir sin necesidad de ser un experto en drones ni en IA.",
    category: "Implementación",
  },
  {
    question: "¿Qué tipo de soporte ofrecen?",
    answer:
      "Soporte 24/7 durante operaciones críticas, onboarding personalizado para tu equipo y actualizaciones continuas de los modelos de IA a medida que suman más horas de vuelo sobre tu territorio.",
    category: "Soporte",
  },
  {
    question: "¿Qué instituciones pueden beneficiarse de Sentinel?",
    answer:
      "Municipios, brigadas de bomberos, empresas forestales, parques nacionales, productores agropecuarios y cualquier organización que gestione grandes superficies de terreno.",
    category: "Producto",
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
          buttonText: "Enviar mensaje",
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
