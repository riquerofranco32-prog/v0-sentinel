import { Wind, Droplets, Thermometer } from "lucide-react";

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

  if (score >= 8) return { label: "Extremo", color: "#f16b6b" };
  if (score >= 6) return { label: "Alto", color: "#f1b46b" };
  if (score >= 3) return { label: "Moderado", color: "#f1e06b" };
  return { label: "Bajo", color: "#94f1be" };
}

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

  return (
    <section
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: "#0c0b09" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(148,241,190,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center gap-2 mb-5">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "#94f1be", boxShadow: "0 0 8px #94f1be" }}
          />
          <p
            className="text-[11px] tracking-[0.3em] uppercase"
            style={{
              fontFamily: "var(--font-sans)",
              color: "rgba(240,234,216,0.3)",
            }}
          >
            Datos en vivo
          </p>
        </div>
        <h2
          className="text-4xl sm:text-5xl lg:text-6xl mb-4"
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 800,
            color: "rgba(240,234,216,0.92)",
            lineHeight: 1,
          }}
        >
          Riesgo de incendio, <span style={{ color: "#94f1be" }}>hoy.</span>
        </h2>
        <p
          className="text-[13px] mb-14 max-w-xl"
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 300,
            color: "rgba(240,234,216,0.4)",
          }}
        >
          Índice estimado a partir de temperatura, humedad y viento en tiempo
          real — la misma clase de variables que alimenta nuestros modelos de
          detección.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {readings.map((r) => {
            const risk = riskLevel(r);
            return (
              <div
                key={r.location.name}
                className="rounded-lg p-6"
                style={{
                  background: "rgba(240,234,216,0.02)",
                  border: "0.5px solid rgba(240,234,216,0.07)",
                }}
              >
                <p
                  className="text-[15px] mb-0.5"
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 700,
                    color: "rgba(240,234,216,0.92)",
                  }}
                >
                  {r.location.name}
                </p>
                <p
                  className="text-[11px] mb-5"
                  style={{
                    fontFamily: "var(--font-sans)",
                    color: "rgba(240,234,216,0.3)",
                  }}
                >
                  {r.location.province}
                </p>

                <div
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm mb-5"
                  style={{
                    background: `${risk.color}15`,
                    border: `0.5px solid ${risk.color}40`,
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: risk.color }}
                  />
                  <span
                    className="text-[11px] tracking-wide"
                    style={{
                      fontFamily: "var(--font-sans)",
                      color: risk.color,
                    }}
                  >
                    {risk.label}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Thermometer
                      className="w-3.5 h-3.5"
                      style={{ color: "rgba(240,234,216,0.3)" }}
                    />
                    <span
                      className="text-[12px]"
                      style={{
                        fontFamily: "var(--font-sans)",
                        color: "rgba(240,234,216,0.55)",
                      }}
                    >
                      {Math.round(r.temperature)}°C
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Droplets
                      className="w-3.5 h-3.5"
                      style={{ color: "rgba(240,234,216,0.3)" }}
                    />
                    <span
                      className="text-[12px]"
                      style={{
                        fontFamily: "var(--font-sans)",
                        color: "rgba(240,234,216,0.55)",
                      }}
                    >
                      {Math.round(r.humidity)}% humedad
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wind
                      className="w-3.5 h-3.5"
                      style={{ color: "rgba(240,234,216,0.3)" }}
                    />
                    <span
                      className="text-[12px]"
                      style={{
                        fontFamily: "var(--font-sans)",
                        color: "rgba(240,234,216,0.55)",
                      }}
                    >
                      {Math.round(r.windSpeed)} km/h viento
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
            color: "rgba(240,234,216,0.2)",
          }}
        >
          Fuente: Open-Meteo. Índice ilustrativo, no reemplaza el sistema de
          detección de Sentinel.
        </p>
      </div>
    </section>
  );
}
