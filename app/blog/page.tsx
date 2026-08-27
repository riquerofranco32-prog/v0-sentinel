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
          {/* Breadcrumb */}
          <nav
            className="flex items-center gap-2 mb-6 text-[12px]"
            style={{
              fontFamily: "var(--font-sans)",
              color: "rgba(240,234,216,0.45)",
            }}
          >
            <Link href="/" className="hover:text-[#94f1be] transition-colors">
              Inicio
            </Link>
            <span className="text-[10px] opacity-40">/</span>
            <span className="font-light" style={{ color: "rgba(240,234,216,0.75)" }}>
              Blog
            </span>
          </nav>

          <p
            className="text-[11px] tracking-[0.3em] uppercase mb-5"
            style={{
              fontFamily: "var(--font-sans)",
              color: "rgba(240,234,216,0.3)",
            }}
          >
            Artículos y Publicaciones
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
                className="group flex flex-col rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(148,241,190,0.3)]"
                style={{
                  background: "rgba(240,234,216,0.02)",
                  border: "0.5px solid rgba(240,234,216,0.08)",
                }}
              >
                <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4/3" }}>
                  <Image
                    src={post.coverImage}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0b09]/90 via-transparent to-transparent" />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <p
                      className="text-[11px] mb-2 font-normal"
                      style={{
                        fontFamily: "var(--font-sans)",
                        color: "rgba(148,241,190,0.8)",
                      }}
                    >
                      {new Date(post.publishedAt).toLocaleDateString("es-AR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                    <h2
                      className="text-lg mb-3 leading-snug font-bold transition-colors duration-200 group-hover:text-[#94f1be]"
                      style={{
                        fontFamily: "var(--font-heading)",
                        color: "rgba(240,234,216,0.92)",
                      }}
                    >
                      {post.title}
                    </h2>
                    <p
                      className="text-[13px] leading-relaxed line-clamp-3"
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontWeight: 300,
                        color: "rgba(240,234,216,0.5)",
                      }}
                    >
                      {post.excerpt}
                    </p>
                  </div>
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
