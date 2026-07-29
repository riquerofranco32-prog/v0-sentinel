"use client";

import { useEffect, useMemo, useState } from "react";
import { geoMercator, geoPath, geoCentroid, geoContains } from "d3-geo";
import type { Feature, FeatureCollection, Geometry } from "geojson";
import countriesGeoJson from "@/data/latam-countries.json";

export interface FirePoint {
  lat: number;
  lng: number;
  confidence?: string;
  acqDate?: string;
  acqTime?: string;
  frp?: number;
}

interface FireMapProps {
  points?: FirePoint[];
  pointColor?: string;
}

const WIDTH = 560;
const HEIGHT = 700;
const countries = countriesGeoJson as FeatureCollection<
  Geometry,
  { name: string }
>;

const CONFIDENCE_LABEL: Record<string, string> = {
  l: "Baja",
  n: "Nominal",
  h: "Alta",
  low: "Baja",
  nominal: "Nominal",
  high: "Alta",
};

function formatConfidence(c?: string) {
  if (!c) return "—";
  return CONFIDENCE_LABEL[c.toLowerCase()] ?? c;
}

function formatDateTime(acqDate?: string, acqTime?: string) {
  if (!acqDate) return "—";
  const time =
    acqTime && acqTime.length >= 3
      ? `${acqTime.padStart(4, "0").slice(0, 2)}:${acqTime
          .padStart(4, "0")
          .slice(2)} UTC`
      : "";
  return `${acqDate}${time ? ` · ${time}` : ""}`;
}

export function FireMap({ points = [], pointColor = "#f16b6b" }: FireMapProps) {
  // ponytail: gates the infinite SMIL <animate> pulses below — starts false
  // to match SSR, then syncs on mount to avoid a hydration mismatch.
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
  }, []);

  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [activePoint, setActivePoint] = useState<number | null>(null);

  // Tag each point with the country it falls in, once — independent of zoom.
  const taggedPoints = useMemo(() => {
    return points.map((p) => {
      const country = countries.features.find((f) =>
        geoContains(f, [p.lng, p.lat]),
      );
      return { ...p, country: country?.properties.name };
    });
  }, [points]);

  const countryCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of taggedPoints) {
      if (!p.country) continue;
      counts.set(p.country, (counts.get(p.country) ?? 0) + 1);
    }
    return [...counts.entries()].sort((a, b) => b[1] - a[1]);
  }, [taggedPoints]);

  const selectedFeature = useMemo(
    () =>
      selectedCountry
        ? countries.features.find((f) => f.properties.name === selectedCountry)
        : null,
    [selectedCountry],
  );

  const visiblePoints = useMemo(
    () =>
      selectedCountry
        ? taggedPoints.filter((p) => p.country === selectedCountry)
        : taggedPoints,
    [taggedPoints, selectedCountry],
  );

  const { pathFor, project, labels } = useMemo(() => {
    const extentTarget:
      | FeatureCollection<Geometry, { name: string }>
      | Feature<Geometry, { name: string }> = selectedFeature ?? countries;
    const projection = geoMercator().fitExtent(
      [
        [16, 16],
        [WIDTH - 16, HEIGHT - 16],
      ],
      extentTarget,
    );
    const path = geoPath(projection);

    const provinceLabels: { name: string; x: number; y: number }[] = [];
    for (const feature of countries.features) {
      if (selectedFeature && feature.properties.name !== selectedCountry)
        continue;
      const [x, y] = projection(geoCentroid(feature)) ?? [0, 0];
      provinceLabels.push({ name: feature.properties.name, x, y });
    }

    return {
      pathFor: (feature: (typeof countries.features)[number]) =>
        path(feature) ?? "",
      project: (lat: number, lng: number) => projection([lng, lat]) ?? [0, 0],
      labels: provinceLabels,
    };
  }, [selectedFeature, selectedCountry]);

  const active = activePoint !== null ? visiblePoints[activePoint] : undefined;

  return (
    <div className="w-full">
      <div
        className="w-full bg-[#0c0b09] rounded-lg relative font-sans"
        style={{ aspectRatio: `${WIDTH} / ${HEIGHT}` }}
      >
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className="w-full h-full [mask-image:linear-gradient(to_bottom,transparent,white_4%,white_96%,transparent)]"
          onClick={() => setActivePoint(null)}
        >
          {countries.features.map((feature, i) => (
            <path
              key={`country-${i}`}
              d={pathFor(feature)}
              fill={
                feature.properties.name === selectedCountry
                  ? "#f0ead810"
                  : "#f0ead808"
              }
              stroke="rgba(240,234,216,0.18)"
              strokeWidth={0.75}
            />
          ))}

          {labels.map((label) => (
            <text
              key={label.name}
              x={label.x}
              y={label.y}
              textAnchor="middle"
              fontSize={selectedFeature ? 11 : 7}
              fill="rgba(240,234,216,0.35)"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {label.name}
            </text>
          ))}

          {visiblePoints.map((point, i) => {
            const [x, y] = project(point.lat, point.lng);
            return (
              <g
                key={`fire-${i}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePoint(i === activePoint ? null : i);
                }}
                style={{ cursor: "pointer" }}
              >
                {/* generous invisible hit target — the visible dot is tiny */}
                <circle cx={x} cy={y} r={8} fill="transparent" />
                <circle cx={x} cy={y} r={2.5} fill={pointColor} />
                <circle cx={x} cy={y} r={2.5} fill={pointColor} opacity="0.5">
                  {!reducedMotion && (
                    <>
                      <animate
                        attributeName="r"
                        from={2.5}
                        to={10}
                        dur="1.8s"
                        begin={`${(i % 5) * 0.3}s`}
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        from="0.5"
                        to="0"
                        dur="1.8s"
                        begin={`${(i % 5) * 0.3}s`}
                        repeatCount="indefinite"
                      />
                    </>
                  )}
                </circle>
              </g>
            );
          })}
        </svg>

        {active && (
          <div
            className="absolute top-3 right-3 rounded-md px-4 py-3 text-[11px] leading-relaxed max-w-[200px]"
            style={{
              fontFamily: "var(--font-sans)",
              background: "rgba(12,11,9,0.92)",
              border: "0.5px solid rgba(240,234,216,0.15)",
              color: "rgba(240,234,216,0.8)",
              backdropFilter: "blur(6px)",
            }}
          >
            <p
              className="uppercase tracking-widest text-[9px] mb-2"
              style={{ color: "#f16b6b" }}
            >
              {active.country ?? "Foco detectado"}
            </p>
            <p>Confianza: {formatConfidence(active.confidence)}</p>
            {active.frp !== undefined && (
              <p>Potencia radiativa: {active.frp.toFixed(1)} MW</p>
            )}
            <p>{formatDateTime(active.acqDate, active.acqTime)}</p>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        <button
          type="button"
          onClick={() => {
            setSelectedCountry(null);
            setActivePoint(null);
          }}
          className="px-3 py-1.5 rounded-sm text-[10px] tracking-wide uppercase transition-colors"
          style={{
            fontFamily: "var(--font-sans)",
            background: !selectedCountry
              ? "rgba(148,241,190,0.12)"
              : "transparent",
            border: `0.5px solid ${
              !selectedCountry
                ? "rgba(148,241,190,0.4)"
                : "rgba(240,234,216,0.15)"
            }`,
            color: !selectedCountry ? "#94f1be" : "rgba(240,234,216,0.5)",
          }}
        >
          Toda la región
        </button>
        {countryCounts.map(([name, count]) => (
          <button
            key={name}
            type="button"
            onClick={() => {
              setSelectedCountry(name);
              setActivePoint(null);
            }}
            className="px-3 py-1.5 rounded-sm text-[10px] tracking-wide uppercase transition-colors"
            style={{
              fontFamily: "var(--font-sans)",
              background:
                selectedCountry === name
                  ? "rgba(148,241,190,0.12)"
                  : "transparent",
              border: `0.5px solid ${
                selectedCountry === name
                  ? "rgba(148,241,190,0.4)"
                  : "rgba(240,234,216,0.15)"
              }`,
              color:
                selectedCountry === name ? "#94f1be" : "rgba(240,234,216,0.5)",
            }}
          >
            {name} · {count}
          </button>
        ))}
      </div>
    </div>
  );
}
