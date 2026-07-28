interface Logo {
  id: string;
  description: string;
  image: string;
  className?: string;
}

interface Logos3Props {
  heading?: string;
  logos: Logo[];
}

export function Logos3({ heading = "Nos acompañan", logos }: Logos3Props) {
  return (
    <section className="py-8">
      <p
        className="text-center mb-6"
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "9px",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "rgba(240,234,216,0.25)",
        }}
      >
        {heading}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 max-w-4xl mx-auto px-6">
        {logos.map((logo) => (
          <img
            key={logo.id}
            src={logo.image}
            alt={logo.description}
            title={logo.description}
            loading="lazy"
            className={
              logo.className ??
              "h-7 w-auto object-contain transition-opacity duration-300 hover:opacity-90"
            }
            style={{
              opacity: 0.45,
              filter: "grayscale(100%) brightness(0) invert(1)",
            }}
          />
        ))}
      </div>
    </section>
  );
}
