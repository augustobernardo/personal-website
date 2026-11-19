import { stack } from "@/content/stack";
import { Section } from "./Section";

export function Stack() {
  return (
    <div className="mt-24 overflow-hidden bg-bg pb-0 lg:mt-40">
      <Section
        id="stack"
        title="Stack"
        className="in-card mx-auto -mb-24 w-[92vw] rotate-[-1deg] bg-surface p-7 text-center md:rotate-[-1.5deg] md:p-14 lg:-mb-40 lg:w-[min(56rem,92vw)]"
        titleClassName="text-[length:var(--step-lead)] font-extrabold"
      >
        {stack.map((group) => (
          <div key={group.name}>
            <h3 className="mt-8 text-[length:var(--step-small)] font-semibold text-muted">
              {group.name}
            </h3>
            <p className="text-[length:var(--step-lead)] leading-[1.7]">
              {group.items.join("\u00a0· ")}
            </p>
          </div>
        ))}
        {/* Extra paper keeps the cut below the text even at the rotated edge. */}
        <div aria-hidden="true" className="h-40 lg:h-56" />
      </Section>
    </div>
  );
}
