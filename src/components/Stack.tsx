import type { CSSProperties } from "react";
import { stack } from "@/content/stack";
import { Section } from "./Section";

export function Stack() {
  return (
    <div className="border-t-3 border-line">
      <Section
        id="stack"
        title="Stack"
        className="mx-auto w-full max-w-7xl px-[var(--margin)] py-16 lg:py-24"
        titleClassName="in-word type-head"
      >
        <ul className="in-seq nb-card mt-10 divide-y-3 divide-line lg:mt-14">
          {stack.map((group, i) => (
            <li
              key={group.name}
              className="grid gap-3 p-5 sm:p-6 lg:grid-cols-12 lg:items-baseline lg:gap-6 lg:px-10"
              style={{ "--i": i } as CSSProperties}
            >
              <h3 className="type-title lg:col-span-3">{group.name}</h3>
              <ul className="flex flex-wrap gap-2 lg:col-span-9">
                {group.items.map((item) => (
                  <li key={item} className="nb-chip">
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}
