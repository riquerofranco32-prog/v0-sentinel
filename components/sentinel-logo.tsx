// ponytail: single SVG wordmark (currentColor) replacing the old raster
// logoo.png, which was baked light-on-transparent for a dark theme and
// needed a dark backing plate wherever it sat on the light page. This
// adapts to any background with no plate.
export function SentinelLogo({
  className = "h-6 w-auto",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 172 28"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Sentinel"
    >
      <g
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 8V3h5" />
        <path d="M2 20v5h5" />
        <path d="M21 3h5v5" />
        <path d="M26 20v5h-5" />
      </g>
      <circle cx="14" cy="14" r="3.4" fill="#0f7a4f" />
      <text
        x="40"
        y="19.5"
        fontFamily="var(--font-heading)"
        fontWeight={800}
        fontSize="16.5"
        letterSpacing="0.5"
        fill="currentColor"
      >
        SENTINEL
      </text>
    </svg>
  );
}
