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
        <ul className="in-seq mt-10 grid gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-8">
          {stack.map((group, i) => (
            <li
              key={group.name}
              className="nb-card overflow-hidden"
              style={{ "--i": i } as CSSProperties}
            >
              <div className="on-fill border-b-3 border-line px-5 py-3 bg-pop-blue">
                <h3 className="type-title">{group.name}</h3>
              </div>
              <div className="p-5">
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item} className="nb-chip">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}
