import { ArrowUpRight, Flame, Newspaper } from "lucide-react";

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

export async function WildfireNews() {
  const news = await fetchWildfireNews();

  // ponytail: no key or feed unreachable -> hide the section rather than
  // show broken/empty cards.
  if (!news || news.length === 0) return null;

  return (
    <section
      className="relative py-20 lg:py-28"
      style={{ background: "#faf7f0" }}
    >
      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        <h2
          className="text-3xl sm:text-4xl lg:text-5xl mb-10 max-w-2xl flex items-center gap-3"
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
          Noticias sobre incendios forestales, al día.
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {news.map((item, i) => (
            <a
              key={i}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col overflow-hidden rounded-lg transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: "rgba(26,24,18,0.02)",
                border: "0.5px solid rgba(26,24,18,0.07)",
              }}
            >
              <div
                className="relative overflow-hidden"
                style={{
                  aspectRatio: "16/9",
                  background: `radial-gradient(circle at 30% 30%, ${
                    [
                      "rgba(184,58,58,0.16)",
                      "rgba(138,90,31,0.16)",
                      "rgba(15,122,79,0.14)",
                    ][i % 3]
                  }, rgba(26,24,18,0.06))`,
                }}
              >
                {item.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Flame
                      className="w-8 h-8"
                      style={{
                        color: ["#b83a3a", "#8a5a1f", "#0f7a4f"][i % 3],
                        opacity: 0.85,
                      }}
                    />
                  </div>
                )}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(12,11,9,0.9) 0%, transparent 55%)",
                  }}
                />
                <ArrowUpRight
                  className="absolute top-3 right-3 w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  style={{ color: "rgba(255,255,255,0.85)" }}
                />
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <p
                  className="text-[14px] leading-snug mb-3 line-clamp-3 transition-colors group-hover:text-[rgba(26,24,18,0.95)]"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: 400,
                    color: "rgba(26,24,18,0.8)",
                  }}
                >
                  {item.title}
                </p>
                <p
                  className="text-[11px]"
                  style={{
                    fontFamily: "var(--font-sans)",
                    color: "rgba(26,24,18,0.3)",
                  }}
                >
                  {item.source} · {relativeTime(item.publishedAt)}
                </p>
              </div>
            </a>
          ))}
        </div>

        <p
          className="text-[10px] mt-6"
          style={{
            fontFamily: "var(--font-sans)",
            color: "rgba(26,24,18,0.2)",
          }}
        >
          Fuente: GNews. Los enlaces abren la nota original en el medio que la
          publicó.
        </p>
      </div>
    </section>
  );
}
