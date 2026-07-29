"use client";

import { useMemo, useState } from "react";
import { geoMercator, geoPath } from "d3-geo";
import type { FeatureCollection, Geometry } from "geojson";
import countriesGeoJson from "@/data/latam-countries.json";

export interface RiskPoint {
  name: string;
  province: string;
  lat: number;
  lon: number;
  color: string;
  label: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
}

const WIDTH = 480;
const HEIGHT = 480;

// ponytail: two corner points, not a real bbox polygon — a lightweight way
// to hand d3-geo a Patagonia lake-district viewport (fitExtent just needs
// something with those bounds). Manually framed since our sensor towns are
// all clustered in northern Patagonia, not the whole region.
const VIEWPORT: FeatureCollection<Geometry> = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {},
      geometry: { type: "Point", coordinates: [-73, -39.3] },
    },
    {
      type: "Feature",
      properties: {},
      geometry: { type: "Point", coordinates: [-68, -43.5] },
    },
  ],
};

const countries = countriesGeoJson as FeatureCollection<
  Geometry,
  { name: string }
>;
const backdrop = countries.features.filter((f) =>
  ["Argentina", "Chile"].includes(f.properties.name),
);

export function PatagoniaRiskMap({ points }: { points: RiskPoint[] }) {
  const [active, setActive] = useState<number | null>(null);

  const { pathFor, project } = useMemo(() => {
    const projection = geoMercator().fitExtent(
      [
        [16, 16],
        [WIDTH - 16, HEIGHT - 16],
      ],
      VIEWPORT,
    );
    const path = geoPath(projection);
    return {
      pathFor: (feature: (typeof backdrop)[number]) => path(feature) ?? "",
      project: (lat: number, lon: number) => projection([lon, lat]) ?? [0, 0],
    };
  }, []);

  const activePoint = active !== null ? points[active] : undefined;

  return (
    <div
      className="w-full bg-[#0c0b09] rounded-lg relative font-sans"
      style={{ aspectRatio: `${WIDTH} / ${HEIGHT}` }}
    >
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="w-full h-full [mask-image:linear-gradient(to_bottom,transparent,white_4%,white_96%,transparent)]"
        onClick={() => setActive(null)}
      >
        {backdrop.map((feature) => (
          <path
            key={feature.properties.name}
            d={pathFor(feature)}
            fill="#f0ead808"
            stroke="rgba(240,234,216,0.18)"
            strokeWidth={0.75}
          />
        ))}

        {points.map((point, i) => {
          const [x, y] = project(point.lat, point.lon);
          return (
            <g
              key={point.name}
              onClick={(e) => {
                e.stopPropagation();
                setActive(i === active ? null : i);
              }}
              style={{ cursor: "pointer" }}
            >
              <circle cx={x} cy={y} r={12} fill="transparent" />
              <circle cx={x} cy={y} r={9} fill={point.color} opacity="0.15" />
              <circle cx={x} cy={y} r={3.5} fill={point.color} />
              <text
                x={x}
                y={y - 12}
                textAnchor="middle"
                fontSize={9}
                fill="rgba(240,234,216,0.55)"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {point.name}
              </text>
            </g>
          );
        })}
      </svg>

      {activePoint && (
        <div
          className="absolute top-3 right-3 rounded-md px-4 py-3 text-[11px] leading-relaxed max-w-[190px]"
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
            style={{ color: activePoint.color }}
          >
            {activePoint.name} · {activePoint.label}
          </p>
          <p>{activePoint.province}</p>
          <p>{Math.round(activePoint.temperature)}°C</p>
          <p>{Math.round(activePoint.humidity)}% humedad</p>
          <p>{Math.round(activePoint.windSpeed)} km/h viento</p>
        </div>
      )}
    </div>
  );
}
