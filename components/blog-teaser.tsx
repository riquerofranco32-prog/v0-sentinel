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
      style={{ background: "#0c0b09" }}
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
            <p
              className="text-[11px] tracking-[0.3em] uppercase mb-5"
              style={{
                fontFamily: "var(--font-sans)",
                color: "rgba(240,234,216,0.3)",
              }}
            >
              Blog
            </p>
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl"
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 800,
                color: "rgba(240,234,216,0.92)",
                lineHeight: 1,
              }}
            >
              Últimas <span style={{ color: "#94f1be" }}>notas.</span>
            </h2>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-sm text-[13px] font-medium transition-all hover:-translate-y-0.5 w-fit"
            style={{
              fontFamily: "var(--font-sans)",
              border: "0.5px solid rgba(240,234,216,0.2)",
              color: "rgba(240,234,216,0.8)",
            }}
          >
            Ver todas las notas
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {posts.map((post, i) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded-lg overflow-hidden transition-all duration-700 hover:-translate-y-1"
              style={{
                background: "rgba(240,234,216,0.02)",
                border: "0.5px solid rgba(240,234,216,0.07)",
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(24px)",
                transitionDelay: `${i * 100}ms`,
              }}
            >
              <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
                <Image
                  src={post.coverImage}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0b09]/85 via-transparent to-transparent" />
              </div>
              <div className="p-6">
                <h3
                  className="text-base mb-2 leading-snug"
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 700,
                    color: "rgba(240,234,216,0.92)",
                  }}
                >
                  {post.title}
                </h3>
                <p
                  className="text-[13px] leading-relaxed line-clamp-2"
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
  );
}
