"use client";

import { useEffect, useMemo, useState } from "react";
import { geoMercator, geoPath, geoCentroid } from "d3-geo";
import type { FeatureCollection, Geometry } from "geojson";
import provinciasGeoJson from "@/data/argentina-provincias.json";

interface FirePoint {
  lat: number;
  lng: number;
}

interface ArgentinaFireMapProps {
  points?: FirePoint[];
  pointColor?: string;
}

const WIDTH = 500;
const HEIGHT = 700;
const provincias = provinciasGeoJson as FeatureCollection<
  Geometry,
  { name: string }
>;

export function ArgentinaFireMap({
  points = [],
  pointColor = "#f16b6b",
}: ArgentinaFireMapProps) {
  // ponytail: gates the infinite SMIL <animate> pulses below — starts false
  // to match SSR, then syncs on mount to avoid a hydration mismatch.
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
  }, []);

  const { pathFor, project, labels } = useMemo(() => {
    const projection = geoMercator().fitExtent(
      [
        [10, 10],
        [WIDTH - 10, HEIGHT - 10],
      ],
      provincias,
    );
    const path = geoPath(projection);

    // ponytail: label once per province name even if a province is made of
    // multiple polygons (e.g. Tierra del Fuego's mainland + island pieces).
    const seen = new Set<string>();
    const provinceLabels: { name: string; x: number; y: number }[] = [];
    for (const feature of provincias.features) {
      const name = feature.properties.name;
      if (seen.has(name)) continue;
      seen.add(name);
      const [x, y] = projection(geoCentroid(feature)) ?? [0, 0];
      provinceLabels.push({ name, x, y });
    }

    return {
      pathFor: (feature: (typeof provincias.features)[number]) =>
        path(feature) ?? "",
      project: (lat: number, lng: number) => projection([lng, lat]) ?? [0, 0],
      labels: provinceLabels,
    };
  }, []);

  return (
    <div
      className="w-full bg-[#0c0b09] rounded-lg relative font-sans"
      style={{ aspectRatio: `${WIDTH} / ${HEIGHT}` }}
    >
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="w-full h-full [mask-image:linear-gradient(to_bottom,transparent,white_4%,white_96%,transparent)]"
      >
        {provincias.features.map((feature, i) => (
          <path
            key={`province-${i}`}
            d={pathFor(feature)}
            fill="#f0ead808"
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
            fontSize={7}
            fill="rgba(240,234,216,0.35)"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {label.name}
          </text>
        ))}

        {points.map((point, i) => {
          const [x, y] = project(point.lat, point.lng);
          return (
            <g key={`fire-${i}`}>
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
    </div>
  );
}
