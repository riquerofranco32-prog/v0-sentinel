// ponytail: single SVG wordmark, brand green fill, replacing the old raster
// logoo.png (which was baked light-on-transparent for a dark theme and
// needed a dark backing plate wherever it sat on the light page).
export function SentinelLogo({
  className = "h-6 w-auto",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 140 24"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Sentinel"
    >
      <text
        x="0"
        y="18"
        fontFamily="var(--font-heading)"
        fontWeight={800}
        fontSize="17"
        letterSpacing="0.5"
        fill="#0f7a4f"
      >
        SENTINEL
      </text>
    </svg>
  );
}
