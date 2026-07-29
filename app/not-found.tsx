import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#0c0b09] flex flex-col">
      <Navbar />

      <section className="flex-1 flex items-center justify-center px-6 py-40 text-center">
        <div>
          <p
            className="text-[11px] tracking-[0.3em] uppercase mb-6"
            style={{
              fontFamily: "var(--font-sans)",
              color: "rgba(240,234,216,0.3)",
            }}
          >
            Error 404
          </p>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl mb-6"
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 800,
              color: "rgba(240,234,216,0.92)",
              lineHeight: 1,
            }}
          >
            Esto no lo <span style={{ color: "#94f1be" }}>detectamos.</span>
          </h1>
          <p
            className="text-[14px] mb-10 max-w-md mx-auto"
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 300,
              color: "rgba(240,234,216,0.45)",
            }}
          >
            La página que buscás no existe o se movió de lugar.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-sm text-[13px] font-medium transition-all hover:-translate-y-0.5"
            style={{
              fontFamily: "var(--font-sans)",
              background: "rgba(148,241,190,0.1)",
              border: "0.5px solid rgba(148,241,190,0.3)",
              color: "#94f1be",
            }}
          >
            Volver al inicio
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
