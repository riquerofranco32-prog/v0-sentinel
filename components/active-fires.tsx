import { FireMap } from "@/components/ui/fire-map";

// ponytail: Latin America bounding box (west,south,east,north) — Mexico's
// northern border down to Cape Horn, wide enough to cover every country in
// data/latam-countries.json.
const LATAM_BBOX = "-118,-56,-34,33";
const SOURCE = "VIIRS_SNPP_NRT";
const DAY_RANGE = 1;

interface FirePoint {
  lat: number;
  lng: number;
  confidence: string;
  acqDate: string;
  acqTime: string;
  frp: number;
}

function parseCsv(csv: string): FirePoint[] {
  const lines = csv.trim().split("\n");
  if (lines.length < 2) return [];

  const header = lines[0].split(",");
  const idx = (name: string) => header.indexOf(name);
  const latI = idx("latitude");
  const lngI = idx("longitude");
  const confI = idx("confidence");
  const dateI = idx("acq_date");
  const timeI = idx("acq_time");
  const frpI = idx("frp");
  if (latI === -1 || lngI === -1) return [];

  return lines.slice(1).map((line) => {
    const cols = line.split(",");
    return {
      lat: parseFloat(cols[latI]),
      lng: parseFloat(cols[lngI]),
      confidence: confI !== -1 ? cols[confI] : "",
      acqDate: dateI !== -1 ? cols[dateI] : "",
      acqTime: timeI !== -1 ? cols[timeI] : "",
      frp: frpI !== -1 ? parseFloat(cols[frpI]) : 0,
    };
  });
}

async function fetchActiveFires(): Promise<FirePoint[] | null> {
  const key = process.env.NASA_FIRMS_KEY;
  if (!key) return null;

  try {
    const url = `https://firms.modaps.eosdis.nasa.gov/api/area/csv/${key}/${SOURCE}/${LATAM_BBOX}/${DAY_RANGE}`;
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const csv = await res.text();
    if (csv.startsWith("Invalid") || csv.startsWith("Error")) return null;
    return parseCsv(csv);
  } catch {
    return null;
  }
}

export async function ActiveFires() {
  const fires = await fetchActiveFires();

  // ponytail: no key configured yet -> render nothing rather than a broken
  // section. Set NASA_FIRMS_KEY (from firms.modaps.eosdis.nasa.gov/api/map_key)
  // as an env var to turn this on.
  if (fires === null) return null;

  const highConfidence = fires.filter((f) => f.confidence !== "l");
  const sorted = [...highConfidence]
    .sort((a, b) => b.frp - a.frp)
    .slice(0, 200);

  return (
    <section
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: "#0c0b09" }}
    >
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-10">
        <div className="flex items-center gap-2 mb-5">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "#f16b6b", boxShadow: "0 0 8px #f16b6b" }}
          />
          <p
            className="text-[11px] tracking-[0.3em] uppercase"
            style={{
              fontFamily: "var(--font-sans)",
              color: "rgba(240,234,216,0.3)",
            }}
          >
            Satélite · últimas 24hs
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
          {sorted.length > 0 ? (
            <>
              {sorted.length} focos{" "}
              <span style={{ color: "#f16b6b" }}>activos</span> hoy.
            </>
          ) : (
            <>
              Sin focos <span style={{ color: "#94f1be" }}>activos</span> hoy.
            </>
          )}
        </h2>
        <p
          className="text-[13px] mb-10 max-w-xl"
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 300,
            color: "rgba(240,234,216,0.4)",
          }}
        >
          Detecciones satelitales VIIRS de la NASA (FIRMS) en toda Latinoamérica
          — la misma clase de dato que un sistema como el nuestro procesa y
          verifica en minutos, no en horas. Tocá un foco para ver el detalle, o
          elegí un país para recorrer la región.
        </p>

        <div
          className="rounded-lg overflow-hidden p-4"
          style={{ border: "0.5px solid rgba(240,234,216,0.07)" }}
        >
          <FireMap
            points={sorted.map((f) => ({
              lat: f.lat,
              lng: f.lng,
              confidence: f.confidence,
              acqDate: f.acqDate,
              acqTime: f.acqTime,
              frp: f.frp,
            }))}
          />
        </div>

        <p
          className="text-[10px] mt-4"
          style={{
            fontFamily: "var(--font-sans)",
            color: "rgba(240,234,216,0.2)",
          }}
        >
          Fuente: NASA FIRMS (VIIRS_SNPP_NRT). Datos preliminares, no
          verificados en campo.
        </p>
      </div>
    </section>
  );
}
