import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "Sentinel Technologies — Tecnología que protege tu territorio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#0c0b09",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(148,241,190,0.18) 0%, transparent 70%)",
          display: "flex",
        }}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginBottom: 28,
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "#0f4a34",
            border: "3px solid #94f1be",
            display: "flex",
          }}
        />
        <div
          style={{
            fontSize: 40,
            fontWeight: 700,
            letterSpacing: 6,
            color: "#f0ead8",
            display: "flex",
          }}
        >
          SENTINEL
        </div>
      </div>
      <div
        style={{
          fontSize: 56,
          fontWeight: 700,
          color: "#f0ead8",
          textAlign: "center",
          maxWidth: 900,
          lineHeight: 1.15,
          display: "flex",
        }}
      >
        Tecnología que protege tu territorio
      </div>
      <div
        style={{
          fontSize: 26,
          color: "#94f1be",
          marginTop: 28,
          display: "flex",
        }}
      >
        Detección temprana de incendios con drones e IA
      </div>
    </div>,
    { ...size },
  );
}
