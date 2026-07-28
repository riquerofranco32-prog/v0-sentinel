export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  publishedAt: string; // ISO date
  keywords: string[];
  body: {
    heading?: string;
    paragraphs: string[];
  }[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "deteccion-temprana-incendios-forestales",
    title: "El tiempo de detección lo es todo en un incendio forestal",
    excerpt:
      "Un incendio detectado en los primeros minutos se controla. Uno detectado horas después, arrasa. Así funciona la ventana de tiempo que decide todo.",
    coverImage: "/problem-a2.jpg",
    publishedAt: "2026-04-01",
    keywords: [
      "detección temprana de incendios forestales",
      "tiempo de respuesta ante incendios",
      "drones para detección de incendios",
      "monitoreo forestal Patagonia",
    ],
    body: [
      {
        paragraphs: [
          "Un incendio forestal no crece de forma lineal. En sus primeros minutos es un foco puntual que un solo brigadista puede sofocar con herramientas manuales. Treinta minutos después, con viento y vegetación seca de por medio, ya es un frente de varios metros que necesita una dotación completa. Dos horas después puede ser incontrolable. La diferencia entre esos tres escenarios no es la cantidad de recursos disponibles — es cuánto tiempo pasó entre que el fuego empezó y alguien se enteró.",
          "El método de detección más extendido en Argentina sigue siendo el mismo desde hace décadas: alguien lo ve (un puestero, un turista, un guardaparque) y lo reporta por teléfono o radio. Ese reporte depende de que haya alguien cerca, de que tenga señal, y de que la información llegue a la persona correcta. En la Patagonia, con distancias enormes y baja densidad poblacional, ese proceso puede tardar horas — el tiempo exacto que el fuego necesita para dejar de ser manejable.",
        ],
      },
      {
        heading: "Qué cambia con la detección automatizada",
        paragraphs: [
          "Un sistema de monitoreo con drones autónomos y cámaras térmicas no depende de que alguien esté mirando en el momento justo. Sobrevuela el territorio de forma programada, analiza cada frame con visión computacional entrenada para reconocer focos de calor incipientes, y descarta automáticamente los falsos positivos (reflejos solares, superficies calientes no combustibles, actividad agrícola normal). Cuando confirma un foco real, genera una alerta geolocalizada en minutos, no en horas.",
          "En Sentinel medimos esto en la práctica: nuestro sistema identifica focos activos en menos de 5 minutos desde que aparecen, sin intervención humana en el circuito de detección. Esa ventana de 5 minutos contra las 2-3 horas de un reporte tradicional es, en términos prácticos, la diferencia entre apagar un fuego con una mochila de agua y evacuar una zona.",
        ],
      },
      {
        heading: "Por qué esto importa más en la Patagonia",
        paragraphs: [
          "La combinación de bosques nativos de crecimiento lento (algunas especies como el ciprés o la araucaria tardan siglos en alcanzar su tamaño adulto), viento sostenido y territorios de difícil acceso hace que cualquier demora en la detección se multiplique en daño. No es solo el área quemada: es biodiversidad que no vuelve en una generación, y economías locales (turismo, ganadería, forestales) que dependen de ese territorio intacto.",
          "Por eso el foco de Sentinel no está solamente en '¿podemos ver el fuego?' sino en '¿en cuántos minutos lo vemos?'. Es la pregunta que determina si un incendio se convierte en una anécdota o en una tragedia.",
        ],
      },
    ],
  },
  {
    slug: "monitoreo-continuo-campos-y-forestales",
    title: "De reaccionar a predecir: monitoreo forestal continuo",
    excerpt:
      "Tus campos, tu monte, tu hacienda llevan años de inversión. La diferencia entre perderlo todo y protegerlo está en cuándo sabés lo que está pasando.",
    coverImage: "/problem-a1.jpg",
    publishedAt: "2026-04-01",
    keywords: [
      "monitoreo forestal continuo",
      "protección de campos y hacienda",
      "inteligencia territorial",
      "gestión de riesgo forestal Argentina",
    ],
    body: [
      {
        paragraphs: [
          "Un campo productivo, un monte forestal o un establecimiento ganadero representan años — a veces generaciones — de inversión y trabajo acumulado. Un incendio puede destruir esa inversión en horas. Lo que separa a los productores que logran proteger su patrimonio de los que lo pierden no es la suerte: es cuánto tiempo antes se enteraron de que algo estaba pasando en su territorio.",
          "La gestión tradicional de este riesgo es reactiva por diseño: se actúa después de que el fuego ya es visible, ya sea porque alguien lo reportó o porque el humo se ve desde la ruta. Para cuando el productor se entera, ya perdió la ventana en la que una intervención rápida hubiera cambiado el resultado.",
        ],
      },
      {
        heading:
          "El modelo de cuatro pasos: monitorear, detectar, contextualizar, alertar",
        paragraphs: [
          "Sentinel reemplaza ese modelo reactivo por un ciclo continuo de cuatro etapas. Primero, monitoreo autónomo: drones y sensores recorren el territorio de forma programada, sin que nadie tenga que pedirlo. Segundo, detección y verificación: los modelos de IA identifican anomalías térmicas y descartan falsos positivos antes de escalar nada. Tercero, contextualización: cada alerta se cruza con datos satelitales de macro-riesgo (humedad, viento, historial de la zona) para entender qué tan urgente es. Cuarto, alerta: la información llega a quien tiene que actuar, con coordenadas exactas, en minutos.",
          "Este ciclo corre solo, de forma continua, sin que el productor tenga que estar revisando cámaras o esperando un llamado. Es la diferencia entre tener un vigía ocasional y tener un sistema que nunca deja de mirar.",
        ],
      },
      {
        heading: "Datos precisos por hectárea, sin infraestructura compleja",
        paragraphs: [
          "Uno de los obstáculos históricos para este tipo de monitoreo en el sector agropecuario y forestal era la infraestructura: torres de vigilancia, personal dedicado, conectividad satelital costosa. Sentinel funciona como una plataforma cloud que no requiere que el productor instale nada complejo en el campo — el sistema aporta la cobertura aérea y el análisis, y el productor recibe alertas accionables en su dispositivo.",
          "El resultado no es solo prevención de incendios: es un registro histórico de datos ambientales por hectárea (focos de calor, patrones estacionales, zonas de mayor riesgo) que permite planificar, no solo reaccionar. Pasar de reaccionar a predecir no es una frase de marketing — es literalmente la diferencia entre gestionar el riesgo y sufrirlo.",
        ],
      },
    ],
  },
  {
    slug: "prevencion-vs-reaccion-incendios-forestales",
    title: "Lo que el fuego no perdona: prevención vs. reacción",
    excerpt:
      "El fuego no da segundas oportunidades. Lo que ya pasó, lo que no se ve, y lo que todavía se puede salvar si se actúa a tiempo.",
    coverImage: "/problem-a4.jpg",
    publishedAt: "2026-06-04",
    keywords: [
      "prevención de incendios forestales Argentina",
      "inteligencia territorial",
      "ecosistemas patagónicos",
      "detección temprana vs reacción",
    ],
    body: [
      {
        paragraphs: [
          "Cada temporada de incendios en Argentina deja la misma imagen: bosques milenarios reducidos a cenizas, comunidades evacuadas, brigadistas exponiéndose con recursos limitados frente a un frente de fuego que ya es demasiado grande para controlar. Es la consecuencia visible de llegar tarde. Pero antes de esa imagen hubo una amenaza silenciosa que nadie vio a tiempo: un foco de calor incipiente, en un lugar de difícil acceso, que nadie estaba mirando en ese momento exacto.",
          "La pregunta que define el resultado no es '¿tenemos los recursos para combatir el incendio?' sino '¿lo vimos a tiempo para que esos recursos alcancen?'. Un incendio de dos hectáreas se apaga con una cuadrilla. Un incendio de dos mil hectáreas necesita aviones hidrantes, semanas de trabajo, y aun así puede no ser suficiente.",
        ],
      },
      {
        heading: "La amenaza que no se ve es la que se puede prevenir",
        paragraphs: [
          "La inteligencia territorial — el uso de drones autónomos, cámaras térmicas y modelos de IA para vigilar el territorio de forma continua — existe exactamente para atacar esa amenaza invisible. No reemplaza a los brigadistas ni a los organismos de respuesta: les da la información que necesitan minutos después de que el riesgo aparece, en lugar de horas después de que el daño ya es irreversible.",
          "Esto cambia la naturaleza del trabajo de prevención. En lugar de esperar reportes ciudadanos o depender de guardaparques cubriendo territorios enormes, un sistema de monitoreo continuo identifica anomalías térmicas y picos de riesgo antes de que se conviertan en un incendio activo, permitiendo intervenir cuando todavía es una intervención simple.",
        ],
      },
      {
        heading: "Lo que se salva cuando la prevención funciona",
        paragraphs: [
          "Los bosques nativos de la Patagonia — cipreses, araucarias, lengas — tardan décadas o siglos en alcanzar el tamaño que el fuego destruye en horas. No es solo madera: es hábitat de fauna única, regulación hídrica de cuencas enteras, y la base económica de comunidades que dependen del turismo, la forestación y la ganadería. Ese es el costo real cuando la prevención llega tarde.",
          "En Sentinel, la misión no es apagar incendios — es evitar que existan como emergencias descontroladas. Usar innovación para salvar bosques significa, en la práctica, ganarle al fuego la única batalla que realmente importa: la del tiempo.",
        ],
      },
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
