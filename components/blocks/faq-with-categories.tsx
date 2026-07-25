"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

interface FaqSectionWithCategoriesProps {
  title: string;
  description?: string;
  items: FaqItem[];
  contactInfo?: {
    title: string;
    buttonText: string;
    onContact: () => void;
  };
}

export function FaqSectionWithCategories({
  title,
  description,
  items,
  contactInfo,
}: FaqSectionWithCategoriesProps) {
  const categories = [
    "Todas",
    ...Array.from(new Set(items.map((i) => i.category))),
  ];
  const [activeCategory, setActiveCategory] = useState("Todas");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filtered =
    activeCategory === "Todas"
      ? items
      : items.filter((i) => i.category === activeCategory);

  return (
    <section
      id="faq"
      className="py-24 lg:py-32"
      style={{ background: "#0e100d" }}
    >
      <div className="max-w-3xl mx-auto px-6 lg:px-10">
        <div className="mb-10 text-center">
          <p
            className="text-[11px] tracking-[0.3em] uppercase mb-5"
            style={{
              fontFamily: "var(--font-sans)",
              color: "rgba(240,234,216,0.3)",
            }}
          >
            Preguntas frecuentes
          </p>
          <h2
            className="text-4xl sm:text-5xl mb-4"
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 800,
              color: "rgba(240,234,216,0.92)",
              lineHeight: 1.1,
            }}
          >
            {title}
          </h2>
          {description && (
            <p
              className="text-sm md:text-base max-w-lg mx-auto"
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 300,
                color: "rgba(240,234,216,0.45)",
              }}
            >
              {description}
            </p>
          )}
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => {
            const active = cat === activeCategory;
            return (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setOpenIndex(null);
                }}
                className="px-4 py-1.5 rounded-full text-xs transition-colors duration-200"
                style={{
                  fontFamily: "var(--font-sans)",
                  border: `0.5px solid ${active ? "rgba(148,241,190,0.4)" : "rgba(240,234,216,0.1)"}`,
                  background: active ? "rgba(148,241,190,0.1)" : "transparent",
                  color: active ? "#94f1be" : "rgba(240,234,216,0.45)",
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Accordion */}
        <div
          className="border-t"
          style={{ borderColor: "rgba(240,234,216,0.08)" }}
        >
          {filtered.map((faq, i) => (
            <div
              key={faq.question}
              className="border-b"
              style={{ borderColor: "rgba(240,234,216,0.08)" }}
            >
              <button
                className="w-full flex items-start justify-between gap-4 py-6 text-left"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span
                  className="text-[14px] font-medium leading-snug transition-colors duration-200"
                  style={{
                    fontFamily: "var(--font-sans)",
                    color:
                      openIndex === i
                        ? "rgba(240,234,216,0.95)"
                        : "rgba(240,234,216,0.65)",
                  }}
                >
                  {faq.question}
                </span>
                <div
                  className="flex-shrink-0 w-7 h-7 rounded-sm flex items-center justify-center mt-0.5 transition-all duration-200"
                  style={{
                    background:
                      openIndex === i
                        ? "rgba(148,241,190,0.15)"
                        : "rgba(240,234,216,0.05)",
                    border: `0.5px solid ${openIndex === i ? "rgba(148,241,190,0.4)" : "rgba(240,234,216,0.1)"}`,
                  }}
                >
                  {openIndex === i ? (
                    <Minus
                      className="w-3.5 h-3.5"
                      style={{ color: "#94f1be" }}
                    />
                  ) : (
                    <Plus
                      className="w-3.5 h-3.5"
                      style={{ color: "rgba(240,234,216,0.4)" }}
                    />
                  )}
                </div>
              </button>

              <div
                className="overflow-hidden transition-all duration-300"
                style={{ maxHeight: openIndex === i ? "300px" : "0px" }}
              >
                <p
                  className="pb-6 text-[13px] leading-relaxed"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: 300,
                    color: "rgba(240,234,216,0.45)",
                  }}
                >
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {contactInfo && (
          <div className="mt-12 text-center">
            <p
              className="text-sm mb-4"
              style={{
                fontFamily: "var(--font-sans)",
                color: "rgba(240,234,216,0.4)",
              }}
            >
              {contactInfo.title}
            </p>
            <button
              onClick={contactInfo.onContact}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-sm text-[13px] font-medium transition-colors"
              style={{
                fontFamily: "var(--font-sans)",
                background: "rgba(148,241,190,0.1)",
                border: "0.5px solid rgba(148,241,190,0.3)",
                color: "#94f1be",
              }}
            >
              {contactInfo.buttonText}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
