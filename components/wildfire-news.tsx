import { ArrowUpRight, Flame } from "lucide-react";

const QUERY = "incendios forestales Argentina";
const MAX_ITEMS = 6;

interface NewsItem {
  title: string;
  source: string;
  link: string;
  image: string;
  publishedAt: string;
}

interface GNewsArticle {
  title: string;
  url: string;
  image: string | null;
  publishedAt: string;
  source: { name: string };
}

async function fetchWildfireNews(): Promise<NewsItem[] | null> {
  const key = process.env.GNEWS_API_KEY;
  if (!key) return null;

  try {
    const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(QUERY)}&lang=es&max=${MAX_ITEMS}&sortby=publishedAt&apikey=${key}`;
    const res = await fetch(url, { next: { revalidate: 21600 } });
    if (!res.ok) return null;
    const data = (await res.json()) as { articles?: GNewsArticle[] };
    if (!data.articles) return null;

    return data.articles.map((a) => ({
      title: a.title,
      source: a.source.name,
      link: a.url,
      image: a.image ?? "",
      publishedAt: a.publishedAt,
    }));
  } catch {
    return null;
  }
}

function relativeTime(publishedAt: string): string {
  const then = new Date(publishedAt).getTime();
  if (Number.isNaN(then)) return "";
  const hours = Math.max(1, Math.round((Date.now() - then) / 3_600_000));
  if (hours < 24) return `hace ${hours} h`;
  return `hace ${Math.round(hours / 24)} d`;
}

const ACCENTS = ["#b83a3a", "#8a5a1f", "#0f7a4f"];

export async function WildfireNews() {
  const news = await fetchWildfireNews();

  // ponytail: no key or feed unreachable -> hide the section rather than
  // show broken/empty rows.
  if (!news || news.length === 0) return null;

  return (
    <section
      className="relative py-20 lg:py-28"
      style={{ background: "#faf7f0" }}
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-10">
        <h2
          className="text-3xl sm:text-4xl lg:text-5xl mb-4 max-w-2xl"
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 800,
            color: "rgba(26,24,18,0.92)",
            lineHeight: 1.1,
          }}
        >
          Noticias sobre <span style={{ color: "#0f7a4f" }}>incendios</span>{" "}
          forestales, al día.
        </h2>
        <p
          className="text-[13px] mb-12 max-w-xl"
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 300,
            color: "rgba(26,24,18,0.4)",
          }}
        >
          Cobertura reciente de otros medios sobre el problema que Sentinel
          existe para resolver.
        </p>

        <div>
          {news.map((item, i) => {
            const accent = ACCENTS[i % ACCENTS.length];
            return (
              <a
                key={i}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-5 py-5"
                style={{
                  borderBottom:
                    i < news.length - 1
                      ? "0.5px solid rgba(26,24,18,0.08)"
                      : "none",
                }}
              >
                <span
                  className="hidden sm:block shrink-0 tabular-nums"
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 800,
                    fontSize: "22px",
                    color: "rgba(26,24,18,0.15)",
                    width: "36px",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div
                  className="relative shrink-0 overflow-hidden rounded-md"
                  style={{
                    width: "88px",
                    height: "64px",
                    background: `radial-gradient(circle at 30% 30%, ${accent}22, rgba(26,24,18,0.06))`,
                  }}
                >
                  {item.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Flame
                        className="w-5 h-5"
                        style={{ color: accent, opacity: 0.85 }}
                      />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p
                    className="text-[14px] sm:text-[15px] leading-snug line-clamp-2 transition-colors group-hover:text-[#0f7a4f]"
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontWeight: 500,
                      color: "rgba(26,24,18,0.85)",
                    }}
                  >
                    {item.title}
                  </p>
                  <p
                    className="text-[11px] mt-1.5"
                    style={{
                      fontFamily: "var(--font-sans)",
                      color: "rgba(26,24,18,0.35)",
                    }}
                  >
                    {item.source} · {relativeTime(item.publishedAt)}
                  </p>
                </div>

                <ArrowUpRight
                  className="w-4 h-4 shrink-0 transition-all duration-200 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  style={{ color: "rgba(26,24,18,0.4)" }}
                />
              </a>
            );
          })}
        </div>

        <p
          className="text-[10px] mt-8"
          style={{
            fontFamily: "var(--font-sans)",
            color: "rgba(26,24,18,0.42)",
          }}
        >
          Fuente: GNews. Los enlaces abren la nota original en el medio que la
          publicó.
        </p>
      </div>
    </section>
  );
}
