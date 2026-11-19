import { ArrowRight } from "lucide-react";
import { Fragment } from "react";
import { careerArc, experience } from "@/content/experience";
import { formatPeriod } from "@/lib/format";
import { Section } from "./Section";

export function Experience() {
  return (
    <Section id="experiencia" title="Experiência">
      <p className="mb-10 flex flex-wrap items-center gap-x-2 gap-y-1 text-base font-medium">
        <span className="sr-only">Trajetória: </span>
        {careerArc.map((step, i) => (
          <Fragment key={step}>
            {i > 0 && (
              <>
                <ArrowRight aria-hidden="true" className="size-4 text-muted" />
                <span className="sr-only">, depois </span>
              </>
            )}
            <span className={i === careerArc.length - 1 ? "text-accent" : undefined}>{step}</span>
          </Fragment>
        ))}
      </p>
      <ol className="grid gap-12">
        {experience.map((item) => (
          <li
            key={`${item.company}-${item.start}`}
            className="reveal grid gap-1 md:grid-cols-[9rem_minmax(0,1fr)] md:gap-6"
          >
            <p
              className={`text-sm tabular-nums md:pt-0.5 ${item.end === null ? "text-accent" : "text-muted"}`}
            >
              <time>{formatPeriod(item.start, item.end)}</time>
            </p>
            <div>
              <h3 className="text-lg font-semibold text-balance">{item.role}</h3>
              <p className="text-muted">{item.company}</p>
              {item.highlights.length > 0 && (
                <ul className="mt-3 list-disc space-y-1 pl-5 leading-[1.65]">
                  {item.highlights.map((text) => (
                    <li key={text}>{text}</li>
                  ))}
                </ul>
              )}
              {item.tags.length > 0 && (
                <ul aria-label="Tecnologias" className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <li key={tag} className="rounded bg-surface px-2 py-1 text-sm text-muted">
                      {tag}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
