import { Wind, Droplets, Thermometer } from "lucide-react";
import { PatagoniaRiskMapLazy } from "@/components/ui/patagonia-risk-map-lazy";

// ponytail: kept in sync with RISK_EXPLAIN in patagonia-risk-map.tsx —
// duplicated rather than imported since that component is a client boundary
// and re-exporting plain constants across it doesn't resolve reliably here.
const RISK_EXPLAIN: Record<string, string> = {
  Bajo: "Condiciones tranquilas, riesgo bajo de que un fuego se propague.",
  Moderado: "Vigilar: condiciones que podrían favorecer un incendio.",
  Alto: "Un incendio se propagaría rápido en estas condiciones.",
  Extremo: "Alerta: condiciones muy peligrosas para incendios forestales.",
};

interface Location {
  name: string;
  province: string;
  lat: number;
  lon: number;
}

const locations: Location[] = [
  { name: "Bariloche", province: "Río Negro", lat: -41.1335, lon: -71.3103 },
  { name: "El Bolsón", province: "Río Negro", lat: -41.9667, lon: -71.5333 },
  {
    name: "San Martín de los Andes",
    province: "Neuquén",
    lat: -40.1576,
    lon: -71.3468,
  },
  { name: "Esquel", province: "Chubut", lat: -42.9083, lon: -71.3197 },
];

interface Reading {
  location: Location;
  temperature: number;
  humidity: number;
  windSpeed: number;
}

// ponytail: illustrative risk heuristic (temp+humidity+wind), not an official
// fire-danger index (like the Canadian FWI) — labeled as "estimado" in the UI
// so it doesn't read as more scientifically precise than it is.
function riskLevel(r: Reading): { label: string; color: string } {
  let score = 0;
  if (r.temperature > 30) score += 3;
  else if (r.temperature > 25) score += 2;
  else if (r.temperature > 18) score += 1;

  if (r.humidity < 20) score += 3;
  else if (r.humidity < 35) score += 2;
  else if (r.humidity < 50) score += 1;

  if (r.windSpeed > 40) score += 3;
  else if (r.windSpeed > 25) score += 2;
  else if (r.windSpeed > 15) score += 1;

  if (score >= 8) return { label: "Extremo", color: "#b83a3a" };
  if (score >= 6) return { label: "Alto", color: "#f1b46b" };
  if (score >= 3) return { label: "Moderado", color: "#f1e06b" };
  return { label: "Bajo", color: "#0f7a4f" };
}

const RISK_RANK: Record<string, number> = {
  Bajo: 0,
  Moderado: 1,
  Alto: 2,
  Extremo: 3,
};

async function fetchReading(location: Location): Promise<Reading | null> {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m&timezone=auto`;
    const res = await fetch(url, { next: { revalidate: 900 } });
    if (!res.ok) return null;
    const data = await res.json();
    return {
      location,
      temperature: data.current.temperature_2m,
      humidity: data.current.relative_humidity_2m,
      windSpeed: data.current.wind_speed_10m,
    };
  } catch {
    return null;
  }
}

export async function FireRiskIndex() {
  const readings = (await Promise.all(locations.map(fetchReading))).filter(
    (r): r is Reading => r !== null,
  );

  if (readings.length === 0) return null;

  const points = readings.map((r) => {
    const risk = riskLevel(r);
    return {
      name: r.location.name,
      province: r.location.province,
      lat: r.location.lat,
      lon: r.location.lon,
      color: risk.color,
      label: risk.label,
      temperature: r.temperature,
      humidity: r.humidity,
      windSpeed: r.windSpeed,
    };
  });
  const overall = points.reduce((worst, p) =>
    RISK_RANK[p.label] > RISK_RANK[worst.label] ? p : worst,
  );

  return (
    <section
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: "#faf7f0" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(15,122,79,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center gap-2 mb-5">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "#0f7a4f", boxShadow: "0 0 8px #0f7a4f" }}
          />
          <p
            className="text-[11px] tracking-[0.3em] uppercase"
            style={{
              fontFamily: "var(--font-sans)",
              color: "rgba(26,24,18,0.3)",
            }}
          >
            Datos en vivo
          </p>
        </div>
        <div className="flex flex-wrap items-end gap-4 mb-4">
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl"
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 800,
              color: "rgba(26,24,18,0.92)",
              lineHeight: 1,
            }}
          >
            Riesgo de incendio, <span style={{ color: "#0f7a4f" }}>hoy.</span>
          </h2>
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm mb-1"
            style={{
              background: `${overall.color}15`,
              border: `0.5px solid ${overall.color}40`,
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: overall.color }}
            />
            <span
              className="text-[11px] tracking-wide"
              style={{ fontFamily: "var(--font-sans)", color: overall.color }}
            >
              Patagonia: {overall.label}
            </span>
          </div>
        </div>
        <p
          className="text-[13px] mb-10 max-w-xl"
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 300,
            color: "rgba(26,24,18,0.4)",
          }}
        >
          Índice estimado a partir de temperatura, humedad y viento en tiempo
          real, la misma clase de variables que alimenta nuestros modelos de
          detección.{" "}
          <span style={{ color: "rgba(26,24,18,0.6)" }}>
            {RISK_EXPLAIN[overall.label]}
          </span>{" "}
          Tocá un punto del mapa para ver el detalle de cada localidad.
        </p>

        <div
          className="max-w-xl mx-auto mb-10 rounded-lg p-4"
          style={{ border: "0.5px solid rgba(26,24,18,0.07)" }}
        >
          <PatagoniaRiskMapLazy points={points} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {readings.map((r) => {
            const risk = riskLevel(r);
            return (
              <div
                key={r.location.name}
                className="relative overflow-hidden rounded-lg border-[0.5px] border-[rgba(26,24,18,0.08)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(26,24,18,0.14)]"
                style={{
                  background: "rgba(26,24,18,0.02)",
                }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{ background: risk.color, opacity: 0.6 }}
                />
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p
                      className="text-[15px] mb-0.5 font-semibold"
                      style={{
                        fontFamily: "var(--font-heading)",
                        color: "rgba(26,24,18,0.92)",
                      }}
                    >
                      {r.location.name}
                    </p>
                    <p
                      className="text-[11px]"
                      style={{
                        fontFamily: "var(--font-sans)",
                        color: "rgba(26,24,18,0.35)",
                      }}
                    >
                      {r.location.province}
                    </p>
                  </div>

                  <div
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm"
                    style={{
                      background: `${risk.color}15`,
                      border: `0.5px solid ${risk.color}35`,
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: risk.color }}
                    />
                    <span
                      className="text-[10px] uppercase font-medium tracking-wider"
                      style={{
                        fontFamily: "var(--font-sans)",
                        color: risk.color,
                      }}
                    >
                      {risk.label}
                    </span>
                  </div>
                </div>

                <div className="space-y-2.5 pt-3 border-t border-[rgba(26,24,18,0.06)]">
                  <div className="flex items-center justify-between text-[12px]">
                    <span
                      className="flex items-center gap-2"
                      style={{
                        fontFamily: "var(--font-sans)",
                        color: "rgba(26,24,18,0.4)",
                      }}
                    >
                      <Thermometer className="w-3.5 h-3.5 opacity-70" />
                      Temperatura
                    </span>
                    <span
                      className="font-medium tabular-nums"
                      style={{
                        fontFamily: "var(--font-sans)",
                        color: "rgba(26,24,18,0.85)",
                      }}
                    >
                      {Math.round(r.temperature)}°C
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[12px]">
                    <span
                      className="flex items-center gap-2"
                      style={{
                        fontFamily: "var(--font-sans)",
                        color: "rgba(26,24,18,0.4)",
                      }}
                    >
                      <Droplets className="w-3.5 h-3.5 opacity-70" />
                      Humedad
                    </span>
                    <span
                      className="font-medium tabular-nums"
                      style={{
                        fontFamily: "var(--font-sans)",
                        color: "rgba(26,24,18,0.85)",
                      }}
                    >
                      {Math.round(r.humidity)}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[12px]">
                    <span
                      className="flex items-center gap-2"
                      style={{
                        fontFamily: "var(--font-sans)",
                        color: "rgba(26,24,18,0.4)",
                      }}
                    >
                      <Wind className="w-3.5 h-3.5 opacity-70" />
                      Viento
                    </span>
                    <span
                      className="font-medium tabular-nums"
                      style={{
                        fontFamily: "var(--font-sans)",
                        color: "rgba(26,24,18,0.85)",
                      }}
                    >
                      {Math.round(r.windSpeed)} km/h
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p
          className="text-[10px] mt-6"
          style={{
            fontFamily: "var(--font-sans)",
            color: "rgba(26,24,18,0.42)",
          }}
        >
          Fuente: Open-Meteo. Índice ilustrativo, no reemplaza el sistema de
          detección de Sentinel.
        </p>
      </div>
    </section>
  );
}
