export interface PressMention {
  outlet: string;
  title: string;
  url: string;
  date: string; // ISO date, "" if unknown
}

// ponytail: every entry here was verified by fetching the live article and
// confirming it's actually about this Sentinel (UTN San Rafael, ILAN/Sadosky
// drones-for-wildfires) before adding it — don't add a mention without doing
// the same, misattributing press coverage on your own site is worse than
// not having the section.
export const pressMentions: PressMention[] = [
  {
    outlet: "UTN",
    title: "Finalizó la competencia ILAN a la innovación Universitaria UTN",
    url: "https://www.utn.edu.ar/es/articulos-slider-principal/finalizo-la-competencia-ilan-a-la-innovacion-universitaria-utn",
    date: "2025-05-22",
  },
  {
    outlet: "CESSI",
    title: "Premios Sadosky | Conocé los ganadores 2025",
    url: "https://cessi.org.ar/2025/11/27/premios-sadosky-conoce-los-ganadores-2025/",
    date: "2025-11-27",
  },
  {
    outlet: "Canal-AR",
    title: "¿Quiénes ganaron los Premios Sadosky 2025?",
    url: "https://www.canal-ar.com.ar/33894-Quienes-ganaron-los-Premios-Sadosky-2025.html",
    date: "2025-11-27",
  },
  {
    outlet: "Diario San Rafael",
    title:
      "Sentinel: innovación sanrafaelina que usa drones e IA para detectar incendios forestales en sus primeros minutos",
    url: "https://diariosanrafael.com.ar/sentinel-innovacion-sanrafaelina-que-usa-drones-e-ia-para-detectar-incendios-forestales-en-sus-primeros-minutos/",
    date: "",
  },
  {
    outlet: "Diario San Rafael",
    title:
      "Alumnos de la UTN San Rafael ganaron el primer puesto en el Premio ILAN con drones para prevenir incendios",
    url: "https://diariosanrafael.com.ar/alumnos-de-la-utn-san-rafael-ganaron-el-primer-puesto-en-el-premio-ilan-con-drones-para-prevenir-incendios/",
    date: "2025-05-30",
  },
  {
    outlet: "Diario Río Negro",
    title:
      "El ingenioso invento de estudiantes universitarios para la detección temprana de incendios forestales",
    url: "https://www.rionegro.com.ar/sociedad/el-ingenioso-invento-de-estudiantes-universitarios-para-la-deteccion-temprana-de-incendios-forestales/",
    date: "",
  },
  {
    outlet: "Mediamendoza",
    title:
      "Sentinel, el proyecto de estudiantes de la UTN ganó el Premio Sadosky a la Innovación Transformadora",
    url: "https://mediamendoza.com/san_rafael/243402-Sentinel-el-proyecto-de-estudiantes-de-la-UTN-gano-el-Premio-Sadosky-a-la-Innovacion-Transformadora",
    date: "2025-11-27",
  },
  {
    outlet: "VientoSur Noticias",
    title:
      "Sentinel: el proyecto que detecta incendios con drones e inteligencia artificial",
    url: "https://vientosurnoticias.com.ar/sentinel-el-proyecto-que-detecta-incendios-con-drones-e-inteligencia-artificial/",
    date: "",
  },
  {
    outlet: "Revista Divergente",
    title:
      "Sentinel, el innovador sistema creado por alumnos de Ingeniería de la UTN",
    url: "https://revistadivergente.com/notas/7423-sentinel-el-innovador-sistema-creado-por-alumnos-de-ingenieria-de-la-utn/",
    date: "2025-12-15",
  },
];
