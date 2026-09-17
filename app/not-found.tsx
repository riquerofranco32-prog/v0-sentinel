import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function NotFound() {
  return (
    <>
      <header>
        <Navbar />
      </header>

      <main
        id="main-content"
        className="min-h-screen bg-[#faf7f0] flex flex-col"
      >
        <section className="flex-1 flex items-center justify-center px-6 py-40 text-center">
          <div>
            <p
              className="text-[11px] tracking-[0.3em] uppercase mb-6"
              style={{
                fontFamily: "var(--font-sans)",
                color: "rgba(26,24,18,0.3)",
              }}
            >
              Error 404
            </p>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl mb-6"
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 800,
                color: "rgba(26,24,18,0.92)",
                lineHeight: 1,
              }}
            >
              Esto no lo <span style={{ color: "#0f7a4f" }}>detectamos.</span>
            </h1>
            <p
              className="text-[14px] mb-10 max-w-md mx-auto"
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 300,
                color: "rgba(26,24,18,0.45)",
              }}
            >
              La página que buscás no existe o se movió de lugar.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-sm text-[13px] font-medium transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  fontFamily: "var(--font-sans)",
                  background: "rgba(15,122,79,0.12)",
                  border: "0.5px solid rgba(15,122,79,0.35)",
                  color: "#0f7a4f",
                }}
              >
                Volver al inicio
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <Link
                href="/blog"
                className="inline-flex items-center justify-center px-7 py-3 rounded-sm text-[13px] font-light transition-all duration-200 border border-[rgba(26,24,18,0.15)] text-[rgba(26,24,18,0.65)] hover:border-[rgba(26,24,18,0.35)] hover:text-[#1a1812]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Explorar el Blog
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
