import type { CSSProperties } from "react";
import { security } from "@/content/security";
import { SecurityPanel, SecurityRecheck } from "./SecurityHeaders";

const FACT_STYLES = [
  "bg-pop-yellow rotate-[-2deg]",
  "bg-pop-blue rotate-[1.5deg]",
  "bg-pop-pink rotate-[-1deg]",
];

export function Security() {
  return (
    <div className="inverse">
      <section
        id="seguranca"
        aria-labelledby="seguranca-titulo"
        className="in-seq mx-auto grid w-full max-w-7xl gap-8 px-[var(--margin)] py-16 lg:grid-cols-12 lg:grid-rows-[auto_auto_auto_1fr] lg:gap-x-10 lg:gap-y-6 lg:py-24"
      >
        <ul data-parallax="float" className="flex flex-wrap gap-3 lg:col-span-5 lg:row-start-1">
          {security.facts.map((fact, index) => (
            <li
              key={fact}
              className={`nb-sticker on-fill in-slap ${FACT_STYLES[index % FACT_STYLES.length]}`}
            >
              {fact}
            </li>
          ))}
        </ul>
        <h2
          id="seguranca-titulo"
          style={{ "--i": 1 } as CSSProperties}
          className="in-word type-head scroll-mt-6 lg:col-span-5 lg:row-start-2"
        >
          {security.title}
        </h2>
        <p
          style={{ "--i": 2 } as CSSProperties}
          className="max-w-[44ch] text-[length:var(--step-body)] lg:col-span-5 lg:row-start-3"
        >
          {security.intro}
        </p>
        <div className="in-media min-w-0 lg:col-span-7 lg:col-start-6 lg:row-span-4 lg:row-start-1">
          <SecurityPanel />
        </div>
        <SecurityRecheck />
      </section>
    </div>
  );
}
