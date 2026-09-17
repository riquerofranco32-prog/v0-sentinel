"use client";

// ponytail: FireMap pulls in d3-geo + the LatAm GeoJSON (heavy, below-fold-only).
// Deferring it to a client-only dynamic import keeps that weight out of the
// initial JS the browser has to parse for LCP; the skeleton keeps the same
// aspect-ratio box so there's no layout shift while it loads.
import dynamic from "next/dynamic";
import type { FireMapProps } from "@/components/ui/fire-map";

const WIDTH = 560;
const HEIGHT = 700;

const FireMap = dynamic(
  () => import("@/components/ui/fire-map").then((m) => m.FireMap),
  {
    ssr: false,
    loading: () => (
      <div
        className="w-full max-w-lg mx-auto rounded-lg animate-pulse"
        style={{
          aspectRatio: `${WIDTH} / ${HEIGHT}`,
          background: "rgba(26,24,18,0.04)",
        }}
      />
    ),
  },
);

export function FireMapLazy(props: FireMapProps) {
  return <FireMap {...props} />;
}
