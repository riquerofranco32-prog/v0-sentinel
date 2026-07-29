"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import DottedMap from "dotted-map";
import Image from "next/image";

interface MapProps {
  dots?: Array<{
    start: { lat: number; lng: number; label?: string };
    end: { lat: number; lng: number; label?: string };
  }>;
  lineColor?: string;
  points?: Array<{ lat: number; lng: number }>;
  pointColor?: string;
}

export function WorldMap({
  dots = [],
  lineColor = "#94f1be",
  points = [],
  pointColor = "#f16b6b",
}: MapProps) {
  // ponytail: countries: ["ARG"] crops the dotted grid + pin projection to
  // Argentina so coverage dots read as a real regional map instead of
  // pinpricks lost on a full-world equirectangular projection.
  const { svgMap, image, project } = useMemo(() => {
    const map = new DottedMap({
      height: 100,
      grid: "diagonal",
      countries: ["ARG"],
    });
    const svg = map.getSVG({
      radius: 0.22,
      color: "#f0ead840",
      shape: "circle",
      backgroundColor: "#0c0b09",
    });
    return {
      svgMap: svg,
      image: map.image,
      project: (lat: number, lng: number) => map.addPin({ lat, lng }),
    };
  }, []);

  const projectPoint = (lat: number, lng: number) => {
    const { x, y } = project(lat, lng);
    return { x, y };
  };

  // ponytail: stroke/radius/curve constants below were tuned for the old
  // 800×400 whole-world viewBox; scale by the cropped map's own height so
  // they stay proportionally the same size on the much smaller ARG grid.
  const scale = image.height / 400;

  const createCurvedPath = (
    start: { x: number; y: number },
    end: { x: number; y: number },
  ) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 50 * scale;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  return (
    <div
      className="w-full bg-[#0c0b09] rounded-lg relative font-sans"
      style={{ aspectRatio: `${image.width} / ${image.height}` }}
    >
      <Image
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="h-full w-full [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)] pointer-events-none select-none"
        alt="Mapa de cobertura"
        height={image.height}
        width={image.width}
        draggable={false}
      />
      <svg
        viewBox={`0 0 ${image.width} ${image.height}`}
        className="w-full h-full absolute inset-0 pointer-events-none select-none"
      >
        {dots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng);
          const endPoint = projectPoint(dot.end.lat, dot.end.lng);
          return (
            <motion.path
              key={`path-${i}`}
              d={createCurvedPath(startPoint, endPoint)}
              fill="none"
              stroke="url(#path-gradient)"
              strokeWidth={scale}
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 * i, ease: "easeOut" }}
            />
          );
        })}

        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="5%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="95%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>

        {dots.map((dot, i) => (
          <g key={`points-${i}`}>
            {[dot.start, dot.end].map((point, j) => {
              const p = projectPoint(point.lat, point.lng);
              return (
                <g key={j}>
                  <circle cx={p.x} cy={p.y} r={2 * scale} fill={lineColor} />
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={2 * scale}
                    fill={lineColor}
                    opacity="0.5"
                  >
                    <animate
                      attributeName="r"
                      from={2 * scale}
                      to={8 * scale}
                      dur="1.5s"
                      begin="0s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      from="0.5"
                      to="0"
                      dur="1.5s"
                      begin="0s"
                      repeatCount="indefinite"
                    />
                  </circle>
                </g>
              );
            })}
          </g>
        ))}

        {points.map((point, i) => {
          const p = projectPoint(point.lat, point.lng);
          return (
            <g key={`fire-${i}`}>
              <circle cx={p.x} cy={p.y} r={2.5 * scale} fill={pointColor} />
              <circle
                cx={p.x}
                cy={p.y}
                r={2.5 * scale}
                fill={pointColor}
                opacity="0.5"
              >
                <animate
                  attributeName="r"
                  from={2.5 * scale}
                  to={10 * scale}
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
              </circle>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
