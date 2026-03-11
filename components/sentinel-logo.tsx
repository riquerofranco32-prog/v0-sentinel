export function SentinelLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <SentinelLogoIcon className="w-12 h-6" />
      <span className="text-white text-lg font-light tracking-[0.35em]">
        SENTINEL
      </span>
    </div>
  )
}

export function SentinelLogoIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Left wing - curved triangle pointing left */}
      <path
        d="M0 25 Q15 0, 55 22 Q40 25, 55 28 Q15 50, 0 25Z"
        fill="white"
      />
      {/* Right wing - curved triangle pointing right */}
      <path
        d="M120 25 Q105 0, 65 22 Q80 25, 65 28 Q105 50, 120 25Z"
        fill="white"
      />
      {/* Center connection */}
      <ellipse cx="60" cy="25" rx="12" ry="10" fill="white" />
      {/* Center bicolor oval eye - navy background */}
      <ellipse cx="60" cy="25" rx="8" ry="7" fill="#0f172a" />
      {/* Gold/yellow vertical element on right half */}
      <ellipse cx="62" cy="25" rx="3" ry="5" fill="#d4a418" />
    </svg>
  )
}
