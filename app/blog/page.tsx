import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ScrollProgress } from "@/components/scroll-progress";
import { blogPosts } from "@/lib/blog-posts";

const siteUrl = "https://www.sentineltech.com.ar";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Ideas y análisis sobre detección temprana de incendios, monitoreo forestal e inteligencia territorial en la Patagonia.",
  alternates: { canonical: `${siteUrl}/blog` },
  openGraph: {
    title: "Blog | Sentinel Technologies",
    description:
      "Ideas y análisis sobre detección temprana de incendios, monitoreo forestal e inteligencia territorial en la Patagonia.",
    url: `${siteUrl}/blog`,
    type: "website",
  },
};

export default function BlogIndex() {
  const posts = [...blogPosts].sort(
    (a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt),
  );

  return (
    <main className="min-h-screen bg-[#0c0b09]">
      <ScrollProgress />
      <Navbar />

      <section className="relative pt-40 pb-20 lg:pt-48 lg:pb-28 px-6 lg:px-10 bg-[#0c0b09]">
        <div className="max-w-5xl mx-auto">
          <p
            className="text-[11px] tracking-[0.3em] uppercase mb-5"
            style={{
              fontFamily: "var(--font-sans)",
              color: "rgba(240,234,216,0.3)",
            }}
          >
            Blog
          </p>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl mb-16"
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 800,
              color: "rgba(240,234,216,0.92)",
              lineHeight: 1,
            }}
          >
            Ideas sobre{" "}
            <span style={{ color: "#94f1be" }}>monitoreo forestal</span> e
            inteligencia territorial.
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group rounded-lg overflow-hidden transition-all duration-500 hover:-translate-y-1"
                style={{
                  background: "rgba(240,234,216,0.02)",
                  border: "0.5px solid rgba(240,234,216,0.07)",
                }}
              >
                <div className="relative w-full" style={{ aspectRatio: "4/3" }}>
                  <Image
                    src={post.coverImage}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0b09]/90 via-transparent to-transparent" />
                </div>
                <div className="p-6">
                  <p
                    className="text-[11px] mb-3"
                    style={{
                      fontFamily: "var(--font-sans)",
                      color: "rgba(240,234,216,0.3)",
                    }}
                  >
                    {new Date(post.publishedAt).toLocaleDateString("es-AR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  <h2
                    className="text-lg mb-3"
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontWeight: 700,
                      color: "rgba(240,234,216,0.92)",
                      lineHeight: 1.3,
                    }}
                  >
                    {post.title}
                  </h2>
                  <p
                    className="text-[13px] leading-relaxed line-clamp-3"
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontWeight: 300,
                      color: "rgba(240,234,216,0.45)",
                    }}
                  >
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
