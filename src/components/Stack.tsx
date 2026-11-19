import { stack } from "@/content/stack";
import { Section } from "./Section";

export function Stack() {
  return (
    <Section id="stack" title="Stack">
      <div className="grid gap-6 sm:grid-cols-2">
        {stack.map((group) => (
          <div key={group.name}>
            <h3 className="mb-2 font-semibold">{group.name}</h3>
            <ul className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-md border border-line bg-surface px-2 py-1 text-sm"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
