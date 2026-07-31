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
  return (
    <section
      id="prensa"
      className="relative py-24 lg:py-32"
      style={{ background: "#0c0b09" }}
    >
      <div className="max-w-5xl mx-auto px-6 lg:px-10">
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

        <div className="grid sm:grid-cols-2 gap-4">
          {pressMentions.map((m, i) => (
            <a
              key={i}
              href={m.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col justify-between rounded-lg p-5 transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: "rgba(240,234,216,0.02)",
                border: "0.5px solid rgba(240,234,216,0.07)",
              }}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p
                    className="text-[11px] tracking-[0.15em] uppercase"
                    style={{
                      fontFamily: "var(--font-sans)",
                      color: "#94f1be",
                    }}
                  >
                    {m.outlet}
                  </p>
                  <ArrowUpRight
                    className="w-4 h-4 flex-shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    style={{ color: "rgba(240,234,216,0.25)" }}
                  />
                </div>
                <p
                  className="text-[14px] leading-snug"
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 700,
                    color: "rgba(240,234,216,0.85)",
                  }}
                >
                  {m.title}
                </p>
              </div>
              {m.date && (
                <p
                  className="text-[11px] mt-4"
                  style={{
                    fontFamily: "var(--font-sans)",
                    color: "rgba(240,234,216,0.25)",
                  }}
                >
                  {formatDate(m.date)}
                </p>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
