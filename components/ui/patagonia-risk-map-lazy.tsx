"use client";

// ponytail: same reasoning as fire-map-lazy.tsx — defer the d3-geo-based
// risk map's JS out of the initial bundle, no CLS thanks to the matching
// aspect-ratio skeleton.
import dynamic from "next/dynamic";
import type { RiskPoint } from "@/components/ui/patagonia-risk-map";

const WIDTH = 480;
const HEIGHT = 480;

const PatagoniaRiskMap = dynamic(
  () =>
    import("@/components/ui/patagonia-risk-map").then(
      (m) => m.PatagoniaRiskMap,
    ),
  {
    ssr: false,
    loading: () => (
      <div
        className="w-full max-w-md mx-auto rounded-lg animate-pulse"
        style={{
          aspectRatio: `${WIDTH} / ${HEIGHT}`,
          background: "rgba(26,24,18,0.04)",
        }}
      />
    ),
  },
);

export function PatagoniaRiskMapLazy({ points }: { points: RiskPoint[] }) {
  return <PatagoniaRiskMap points={points} />;
}
