import { ArrowUpRight, Newspaper } from "lucide-react";
import { pressMentions } from "@/lib/press-mentions";

function formatDate(date: string): string {
  if (!date) return "";
  return new Date(date).toLocaleDateString("es-AR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function Press() {
  const [featured, ...rest] = pressMentions;

  return (
    <section
      id="prensa"
      className="relative py-24 lg:py-32"
      style={{ background: "#0c0b09" }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <div className="flex items-center gap-2 mb-5">
          <Newspaper className="w-3.5 h-3.5" style={{ color: "#94f1be" }} />
          <p
            className="text-[11px] tracking-[0.3em] uppercase"
            style={{
              fontFamily: "var(--font-sans)",
              color: "rgba(240,234,216,0.3)",
            }}
          >
            Prensa
          </p>
        </div>
        <h2
          className="text-3xl sm:text-4xl lg:text-5xl mb-4 max-w-2xl"
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 800,
            color: "rgba(240,234,216,0.92)",
            lineHeight: 1.1,
          }}
        >
          Dónde <span style={{ color: "#94f1be" }}>salimos.</span>
        </h2>
        <p
          className="text-[13px] mb-10 max-w-xl"
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 300,
            color: "rgba(240,234,216,0.4)",
          }}
        >
          Medios y organizaciones que ya cubrieron el proyecto.
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          <PressCard mention={featured} large />
          <div className="grid sm:grid-cols-2 gap-4">
            {rest.slice(0, 4).map((m, i) => (
              <PressCard key={i} mention={m} />
            ))}
          </div>
        </div>

        {rest.length > 4 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {rest.slice(4).map((m, i) => (
              <PressCard key={i} mention={m} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function PressCard({
  mention,
  large = false,
}: {
  mention: (typeof pressMentions)[number];
  large?: boolean;
}) {
  return (
    <a
      href={mention.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col overflow-hidden rounded-lg transition-all duration-300 hover:-translate-y-0.5"
      style={{
        background: "rgba(240,234,216,0.02)",
        border: "0.5px solid rgba(240,234,216,0.07)",
      }}
    >
      <div
        className="relative w-full overflow-hidden"
        style={{
          aspectRatio: large ? "16/9" : "4/3",
          background:
            "linear-gradient(135deg, rgba(148,241,190,0.08), rgba(12,11,9,0.4))",
        }}
      >
        {mention.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={encodeURI(mention.image)}
            alt=""
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Newspaper
              className="w-8 h-8"
              style={{ color: "rgba(148,241,190,0.25)" }}
            />
          </div>
        )}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(12,11,9,0.95) 0%, rgba(12,11,9,0.1) 55%, transparent 100%)",
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between">
          <p
            className="text-[11px] tracking-[0.15em] uppercase"
            style={{ fontFamily: "var(--font-sans)", color: "#94f1be" }}
          >
            {mention.outlet}
          </p>
          <ArrowUpRight
            className="w-4 h-4 flex-shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            style={{ color: "rgba(240,234,216,0.6)" }}
          />
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <p
          className={
            large ? "text-[17px] leading-snug" : "text-[13px] leading-snug"
          }
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 700,
            color: "rgba(240,234,216,0.85)",
          }}
        >
          {mention.title}
        </p>
        {mention.date && (
          <p
            className="text-[11px] mt-3"
            style={{
              fontFamily: "var(--font-sans)",
              color: "rgba(240,234,216,0.25)",
            }}
          >
            {formatDate(mention.date)}
          </p>
        )}
      </div>
    </a>
  );
}
