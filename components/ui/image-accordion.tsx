"use client";

import Image from "next/image";

interface ImageAccordionItem {
  image: string;
  title: string;
  description: string;
  href?: string;
}

export function ImageAccordion({ items }: { items: ImageAccordionItem[] }) {
  return (
    <div className="group flex max-md:flex-col justify-center gap-2 w-full">
      {items.map((item) => (
        <article
          key={item.image}
          className="group/article relative w-full rounded-xl overflow-hidden md:not-[&:hover]:group-hover:w-[20%] md:[&:not(:focus-within):not(:hover)]:group-focus-within:w-[20%] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.15)] before:absolute before:inset-x-0 before:bottom-0 before:h-1/3 before:bg-linear-to-t before:from-black/60 before:transition-opacity md:before:opacity-0 md:hover:before:opacity-100 focus-within:before:opacity-100"
        >
          <a
            className="absolute inset-0 text-white z-10 p-4 flex flex-col justify-end"
            href={item.href ?? "#equipo"}
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <h3
              className="text-lg font-bold md:whitespace-nowrap md:truncate md:opacity-0 group-hover/article:opacity-100 group-focus-within/article:opacity-100 md:translate-y-2 group-hover/article:translate-y-0 group-focus-within/article:translate-y-0 transition duration-200 ease-[cubic-bezier(.5,.85,.25,1.8)] group-hover/article:delay-200 group-focus-within/article:delay-200"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {item.title}
            </h3>
            <span className="text-sm md:whitespace-nowrap md:truncate md:opacity-0 group-hover/article:opacity-100 group-focus-within/article:opacity-100 md:translate-y-2 group-hover/article:translate-y-0 group-focus-within/article:translate-y-0 transition duration-200 ease-[cubic-bezier(.5,.85,.25,1.8)] group-hover/article:delay-300 group-focus-within/article:delay-300">
              {item.description}
            </span>
          </a>
          <Image
            className="object-cover h-72 md:h-[420px] w-full"
            src={item.image}
            width={480}
            height={640}
            alt={item.title}
          />
        </article>
      ))}
    </div>
  );
}
