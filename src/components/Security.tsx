import { security } from "@/content/security";
import { SecurityPanel, SecurityRecheck } from "./SecurityHeaders";

const FACT_STYLES = [
  "bg-pop-blue rotate-[-2deg]",
  "bg-white rotate-[1.5deg]",
  "bg-pop-blue rotate-[-1deg]",
];

export function Security() {
  return (
    <div className="inverse">
      <section
        id="seguranca"
        aria-labelledby="seguranca-titulo"
        className="mx-auto grid w-full max-w-7xl gap-8 px-[var(--margin)] py-16 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-6 lg:py-24"
      >
        <div className="in-seq grid gap-8 lg:sticky lg:top-24 lg:col-span-5 lg:row-span-2 lg:self-start">
          <ul data-parallax="float" className="flex flex-wrap gap-3">
            {security.facts.map((fact, index) => (
              <li
                key={fact}
                className={`nb-sticker on-fill in-slap ${FACT_STYLES[index % FACT_STYLES.length]}`}
              >
                {fact}
              </li>
            ))}
          </ul>
          <h2 id="seguranca-titulo" className="in-word type-head scroll-mt-6">
            {security.title}
          </h2>
          <p className="max-w-[44ch] text-[length:var(--step-body)]">{security.intro}</p>
        </div>
        <div className="in-media min-w-0 lg:col-span-7 lg:col-start-6 lg:row-start-1">
          <SecurityPanel />
        </div>
        <SecurityRecheck />
      </section>
    </div>
  );
}
