import { experience } from "@/content/experience";
import { formatPeriod } from "@/lib/format";
import { Section } from "./Section";

export function Experience() {
  return (
    <Section id="experiencia" title="Experiência">
      <ol className="space-y-8 border-l border-line pl-6">
        {experience.map((item) => (
          <li key={`${item.company}-${item.start}`}>
            <h3 className="font-semibold">{item.role}</h3>
            <p className="text-muted">
              {item.company} · <time>{formatPeriod(item.start, item.end)}</time>
            </p>
            {item.highlights.length > 0 && (
              <ul className="mt-3 list-disc space-y-1 pl-5">
                {item.highlights.map((text) => (
                  <li key={text}>{text}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>
    </Section>
  );
}
