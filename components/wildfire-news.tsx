import { ArrowUpRight, Newspaper } from "lucide-react";

const FEED_URL =
  "https://news.google.com/rss/search?q=incendios%20forestales%20Argentina%20when:7d&hl=es-419&gl=AR&ceid=AR:es-419";
const MAX_ITEMS = 6;

interface NewsItem {
  title: string;
  source: string;
  link: string;
  pubDate: string;
}

function decodeEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function parseRss(xml: string): NewsItem[] {
  const items: NewsItem[] = [];
  const itemBlocks = xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];

  for (const block of itemBlocks) {
    const titleMatch = block.match(/<title>([\s\S]*?)<\/title>/);
    const linkMatch = block.match(/<link>([\s\S]*?)<\/link>/);
    const dateMatch = block.match(/<pubDate>([\s\S]*?)<\/pubDate>/);
    if (!titleMatch || !linkMatch) continue;

    const rawTitle = decodeEntities(titleMatch[1].trim());
    // ponytail: Google News RSS titles end in " - Source Name".
    const lastDash = rawTitle.lastIndexOf(" - ");
    const title = lastDash === -1 ? rawTitle : rawTitle.slice(0, lastDash);
    const source = lastDash === -1 ? "" : rawTitle.slice(lastDash + 3);

    items.push({
      title,
      source,
      link: linkMatch[1].trim(),
      pubDate: dateMatch?.[1]?.trim() ?? "",
    });
  }

  return items;
}

async function fetchWildfireNews(): Promise<NewsItem[] | null> {
  try {
    const res = await fetch(FEED_URL, { next: { revalidate: 21600 } });
    if (!res.ok) return null;
    const xml = await res.text();
    return parseRss(xml).slice(0, MAX_ITEMS);
  } catch {
    return null;
  }
}

function relativeTime(pubDate: string): string {
  if (!pubDate) return "";
  const then = new Date(pubDate).getTime();
  if (Number.isNaN(then)) return "";
  const hours = Math.max(1, Math.round((Date.now() - then) / 3_600_000));
  if (hours < 24) return `hace ${hours} h`;
  return `hace ${Math.round(hours / 24)} d`;
}

export async function WildfireNews() {
  const news = await fetchWildfireNews();

  // ponytail: feed unreachable -> hide the section instead of showing empty.
  if (!news || news.length === 0) return null;

  return (
    <section
      className="relative py-20 lg:py-28"
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
            Actualidad
          </p>
        </div>
        <h2
          className="text-3xl sm:text-4xl lg:text-5xl mb-10 max-w-2xl"
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 800,
            color: "rgba(240,234,216,0.92)",
            lineHeight: 1.1,
          }}
        >
          Noticias sobre incendios forestales, al día.
        </h2>

        <div className="flex flex-col">
          {news.map((item, i) => (
            <a
              key={i}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start justify-between gap-4 py-5 transition-colors hover:bg-[rgba(240,234,216,0.02)]"
              style={{
                borderTop:
                  i === 0 ? "none" : "0.5px solid rgba(240,234,216,0.07)",
              }}
            >
              <div className="min-w-0">
                <p
                  className="text-[15px] leading-snug mb-2 transition-colors group-hover:text-[rgba(240,234,216,0.95)]"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: 400,
                    color: "rgba(240,234,216,0.8)",
                  }}
                >
                  {item.title}
                </p>
                <p
                  className="text-[11px]"
                  style={{
                    fontFamily: "var(--font-sans)",
                    color: "rgba(240,234,216,0.3)",
                  }}
                >
                  {item.source}
                  {item.source && relativeTime(item.pubDate) && " · "}
                  {relativeTime(item.pubDate)}
                </p>
              </div>
              <ArrowUpRight
                className="w-4 h-4 mt-1 flex-shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                style={{ color: "rgba(240,234,216,0.25)" }}
              />
            </a>
          ))}
        </div>

        <p
          className="text-[10px] mt-6"
          style={{
            fontFamily: "var(--font-sans)",
            color: "rgba(240,234,216,0.2)",
          }}
        >
          Fuente: Google Noticias. Los enlaces abren la nota original en el
          medio que la publicó.
        </p>
      </div>
    </section>
  );
}
