"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { blogPosts } from "@/lib/blog-posts";

export function BlogTeaser() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const posts = [...blogPosts]
    .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt))
    .slice(0, 3);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.05 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: "#faf7f0" }}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        <div
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16 transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(16px)",
          }}
        >
          <div>
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl"
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 800,
                color: "rgba(26,24,18,0.92)",
                lineHeight: 1,
              }}
            >
              Últimas <span style={{ color: "#0f7a4f" }}>notas.</span>
            </h2>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-sm text-[13px] font-medium transition-all hover:-translate-y-0.5 w-fit"
            style={{
              fontFamily: "var(--font-sans)",
              border: "0.5px solid rgba(26,24,18,0.2)",
              color: "rgba(26,24,18,0.8)",
            }}
          >
            Ver todas las notas
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          {/* Featured post, image-led, three-fifths width */}
          {posts[0] && (
            <Link
              href={`/blog/${posts[0].slug}`}
              className="group lg:col-span-3 flex flex-col overflow-hidden rounded-lg transition-all duration-300 hover:-translate-y-1"
              style={{
                background: "rgba(26,24,18,0.02)",
                border: "0.5px solid rgba(26,24,18,0.07)",
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(24px)",
              }}
            >
              <div
                className="relative w-full overflow-hidden"
                style={{ aspectRatio: "16/8" }}
              >
                <Image
                  src={posts[0].coverImage}
                  alt={posts[0].title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <p
                    className="text-[11px] mb-2 font-normal"
                    style={{
                      fontFamily: "var(--font-sans)",
                      color: "rgba(15,122,79,0.8)",
                    }}
                  >
                    {new Date(posts[0].publishedAt).toLocaleDateString(
                      "es-AR",
                      { day: "numeric", month: "short", year: "numeric" },
                    )}
                  </p>
                  <h3
                    className="text-xl mb-2.5 leading-snug transition-colors duration-200 group-hover:text-[#0f7a4f]"
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontWeight: 700,
                      color: "rgba(26,24,18,0.92)",
                    }}
                  >
                    {posts[0].title}
                  </h3>
                  <p
                    className="text-[13px] leading-relaxed line-clamp-2 max-w-lg"
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontWeight: 300,
                      color: "rgba(26,24,18,0.65)",
                    }}
                  >
                    {posts[0].excerpt}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[rgba(26,24,18,0.06)] flex items-center justify-between">
                  <span
                    className="text-[11px] font-normal group-hover:text-[#0f7a4f] transition-colors flex items-center gap-1"
                    style={{
                      fontFamily: "var(--font-sans)",
                      color: "rgba(26,24,18,0.62)",
                    }}
                  >
                    Leer artículo
                    <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </div>
            </Link>
          )}

          {/* Remaining posts as a compact list, two-fifths width */}
          <div className="lg:col-span-2 flex flex-col divide-y divide-[rgba(26,24,18,0.06)]">
            {posts.slice(1).map((post, i) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex-1 flex flex-col justify-center py-5 first:pt-0 last:pb-0 transition-colors duration-200"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(16px)",
                  transitionDelay: `${100 + i * 100}ms`,
                }}
              >
                <p
                  className="text-[11px] mb-1.5 font-normal"
                  style={{
                    fontFamily: "var(--font-sans)",
                    color: "rgba(15,122,79,0.8)",
                  }}
                >
                  {new Date(post.publishedAt).toLocaleDateString("es-AR", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
                <h3
                  className="text-base mb-1.5 leading-snug transition-colors duration-200 group-hover:text-[#0f7a4f]"
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 700,
                    color: "rgba(26,24,18,0.92)",
                  }}
                >
                  {post.title}
                </h3>
                <span
                  className="text-[11px] font-normal group-hover:text-[#0f7a4f] transition-colors flex items-center gap-1"
                  style={{
                    fontFamily: "var(--font-sans)",
                    color: "rgba(26,24,18,0.62)",
                  }}
                >
                  Leer artículo
                  <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
