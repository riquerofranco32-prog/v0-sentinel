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
      style={{ background: "#faf7f0" }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <h2
          className="text-3xl sm:text-4xl lg:text-5xl mb-4 max-w-2xl flex items-center gap-3"
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 800,
            color: "rgba(26,24,18,0.92)",
            lineHeight: 1.1,
          }}
        >
          <Newspaper
            className="w-7 h-7 shrink-0 hidden sm:block"
            style={{ color: "#0f7a4f" }}
          />
          Dónde <span style={{ color: "#0f7a4f" }}>salimos en los medios.</span>
        </h2>
        <p
          className="text-[13px] mb-10 max-w-xl"
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 300,
            color: "rgba(26,24,18,0.4)",
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
      className="group relative flex flex-col overflow-hidden rounded-lg transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(15,122,79,0.3)]"
      style={{
        background: "rgba(26,24,18,0.02)",
        border: "0.5px solid rgba(26,24,18,0.08)",
      }}
    >
      <div
        className="relative w-full overflow-hidden"
        style={{
          aspectRatio: large ? "16/9" : "4/3",
          background:
            "linear-gradient(135deg, rgba(15,122,79,0.1), rgba(26,24,18,0.05))",
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
              style={{ color: "rgba(15,122,79,0.25)" }}
            />
          </div>
        )}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(12,11,9,0.95) 0%, rgba(12,11,9,0.2) 55%, transparent 100%)",
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between">
          <span
            className="px-2 py-0.5 rounded-sm text-[10px] tracking-wider uppercase font-medium"
            style={{
              fontFamily: "var(--font-sans)",
              color: "#94f1be",
              background: "rgba(20,74,52,0.8)",
              border: "0.5px solid rgba(148,241,190,0.3)",
              backdropFilter: "blur(4px)",
            }}
          >
            {mention.outlet}
          </span>
          <ArrowUpRight
            className="w-4 h-4 flex-shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            style={{ color: "rgba(255,255,255,0.85)" }}
          />
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <p
          className={
            large
              ? "text-[16px] leading-snug line-clamp-3"
              : "text-[13px] leading-snug line-clamp-2"
          }
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 700,
            color: "rgba(26,24,18,0.9)",
          }}
        >
          {mention.title}
        </p>
        {mention.date && (
          <p
            className="text-[11px] mt-3"
            style={{
              fontFamily: "var(--font-sans)",
              color: "rgba(26,24,18,0.3)",
            }}
          >
            {formatDate(mention.date)}
          </p>
        )}
      </div>
    </a>
  );
}
