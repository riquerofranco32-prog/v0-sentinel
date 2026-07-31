import { Flame, MapPin, Satellite } from "lucide-react";
import { AnimatedNumber } from "@/components/ui/animated-number";

// ponytail: Argentina bounding box (west,south,east,north).
const ARG_BBOX = "-73,-55,-53,-21";
const SOURCE = "VIIRS_SNPP_NRT";
const CHUNK_DAYS = 5;
const WINDOW_DAYS = 90;

function isoDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function countHighConfidenceRows(csv: string): number {
  const lines = csv.trim().split("\n");
  if (lines.length < 2) return 0;
  const header = lines[0].split(",");
  const confI = header.indexOf("confidence");
  if (confI === -1) return lines.length - 1;
  return lines.slice(1).filter((line) => line.split(",")[confI] !== "l").length;
}

async function fetchChunkCount(startDate: string): Promise<number> {
  const key = process.env.NASA_FIRMS_KEY;
  if (!key) return 0;
  try {
    const url = `https://firms.modaps.eosdis.nasa.gov/api/area/csv/${key}/${SOURCE}/${ARG_BBOX}/${CHUNK_DAYS}/${startDate}`;
    const res = await fetch(url, { next: { revalidate: 86400 } });
    if (!res.ok) return 0;
    const csv = await res.text();
    if (csv.startsWith("Invalid") || csv.startsWith("Error")) return 0;
    return countHighConfidenceRows(csv);
  } catch {
    return 0;
  }
}

async function fetchYtdDetectionCount(): Promise<number | null> {
  if (!process.env.NASA_FIRMS_KEY) return null;

  const today = new Date();
  const chunkStarts: string[] = [];
  for (let offset = WINDOW_DAYS; offset > 0; offset -= CHUNK_DAYS) {
    const d = new Date(today);
    d.setDate(d.getDate() - offset);
    chunkStarts.push(isoDate(d));
  }

  const counts = await Promise.all(chunkStarts.map(fetchChunkCount));
  return counts.reduce((sum, n) => sum + n, 0);
}

export async function FireImpactStats() {
  const total = await fetchYtdDetectionCount();

  // ponytail: no key configured, or NASA request failed entirely -> hide
  // rather than show a broken/zero stat.
  if (total === null) return null;

  const stats = [
    {
      icon: Flame,
      value: total,
      label: `Detecciones satelitales de calor en Argentina, últimos ${WINDOW_DAYS} días`,
    },
    {
      icon: MapPin,
      value: Math.round(total / WINDOW_DAYS),
      label: "Promedio de focos detectados por día",
    },
  ];

  return (
    <section
      className="relative py-20 lg:py-28 overflow-hidden"
      style={{ background: "#0c0b09" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(241,107,107,0.08) 0%, transparent 60%)",
        }}
      />
      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-10">
        <div className="flex items-center gap-2 mb-5">
          <Satellite className="w-3.5 h-3.5" style={{ color: "#f16b6b" }} />
          <p
            className="text-[11px] tracking-[0.3em] uppercase"
            style={{
              fontFamily: "var(--font-sans)",
              color: "rgba(240,234,216,0.3)",
            }}
          >
            El impacto en números
          </p>
        </div>
        <h2
          className="text-3xl sm:text-4xl lg:text-5xl mb-10 max-w-2xl"
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 800,
            color: "rgba(240,234,216,0.92)",
            lineHeight: 1.1,
          }}
        >
          El monitoreo de incendios en Argentina, en cifras.
        </h2>

        <div
          className="grid sm:grid-cols-2 gap-px"
          style={{ background: "rgba(240,234,216,0.05)" }}
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-start p-8"
              style={{ background: "#0c0b09" }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-5"
                style={{
                  background: "rgba(241,107,107,0.1)",
                  border: "0.5px solid rgba(241,107,107,0.3)",
                }}
              >
                <stat.icon className="w-5 h-5" style={{ color: "#f16b6b" }} />
              </div>
              <div
                className="text-4xl sm:text-5xl font-extrabold mb-2 tabular-nums"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "#f16b6b",
                }}
              >
                <AnimatedNumber value={stat.value} />
              </div>
              <p
                className="text-[13px] leading-snug max-w-[280px]"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 300,
                  color: "rgba(240,234,216,0.4)",
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <p
          className="text-[10px] mt-6"
          style={{
            fontFamily: "var(--font-sans)",
            color: "rgba(240,234,216,0.2)",
          }}
        >
          Fuente: NASA FIRMS (VIIRS_SNPP_NRT), detecciones satelitales de calor
          en territorio argentino. Datos preliminares, no verificados en campo —
          no distingue incendios forestales de otras fuentes de calor (quemas
          agrícolas, etc.).
        </p>
      </div>
    </section>
  );
}
