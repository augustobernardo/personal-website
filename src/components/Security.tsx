import type { CSSProperties } from "react";
import { security } from "@/content/security";
import { SecurityPanel, SecurityRecheck } from "./SecurityHeaders";

export function Security() {
  return (
    <section
      id="seguranca"
      aria-labelledby="seguranca-titulo"
      className="in-seq mt-24 grid gap-8 bg-surface px-[var(--margin)] py-16 lg:mt-40 lg:min-h-[88svh] lg:grid-cols-12 lg:grid-rows-[1fr_auto_1fr_auto] lg:items-stretch lg:gap-x-6 lg:gap-y-0 lg:py-24"
    >
      <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[length:var(--step-body)] font-semibold lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:self-start">
        {security.facts.map((fact) => (
          <li key={fact}>{fact}</li>
        ))}
      </ul>
      <h2
        id="seguranca-titulo"
        style={{ "--i": 1 } as CSSProperties}
        className="in-word scroll-mt-6 text-[length:var(--step-head)] font-extrabold leading-[0.92] tracking-[-0.05em] lg:col-span-5 lg:col-start-8 lg:row-start-2 lg:self-end"
      >
        {security.title}
      </h2>
      <p
        style={{ "--i": 2 } as CSSProperties}
        className="max-w-[44ch] text-[length:var(--step-body)] lg:col-span-5 lg:col-start-8 lg:row-start-3 lg:mt-6 lg:self-start"
      >
        {security.intro}
      </p>
      <div
        className="in-media min-w-0 lg:col-span-6 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:self-center"
        style={{ animationName: "settle", animationRange: "entry 10% entry 55%" }}
      >
        <SecurityPanel />
      </div>
      <SecurityRecheck />
    </section>
  );
}
