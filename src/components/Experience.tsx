import { ArrowRight } from "lucide-react";
import { Fragment, type CSSProperties } from "react";
import { careerArc, experience } from "@/content/experience";
import { formatPeriod } from "@/lib/format";
import { Section } from "./Section";

export function Experience() {
  return (
    <Section
      id="experiencia"
      title="Experiência"
      className="mt-24 px-[var(--margin)] lg:mt-40 lg:ml-[calc((100%-2*var(--margin)+24px)/6)] lg:max-w-[calc(44rem+2*var(--margin))]"
      titleClassName="in-word text-[length:var(--step-display)] font-extrabold leading-[0.92] tracking-[-0.05em]"
    >
      <p className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[length:var(--step-lead)] font-semibold">
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
      <ol className="in-seq mt-10 grid gap-1.5">
        {experience.map((item, index) => (
          <li
            key={`${item.company}-${item.start}`}
            className="bg-surface-2"
            style={{ "--i": index } as CSSProperties}
          >
            <div className="grid min-h-14 grid-cols-[minmax(0,1fr)_auto] items-baseline gap-4 px-[18px] py-4 max-[359px]:grid-cols-1">
              <div>
                <h3 className="text-[length:var(--step-body)] font-extrabold">{item.role}</h3>
                <p className="text-[length:var(--step-body)] text-muted">{item.company}</p>
              </div>
              <p
                className={`text-[length:var(--step-small)] tabular-nums ${item.end === null ? "text-accent" : "text-muted"}`}
              >
                <time>{formatPeriod(item.start, item.end)}</time>
              </p>
            </div>
            {(item.highlights.length > 0 || item.tags.length > 0) && (
              <div className="px-[18px] pb-5">
                {item.highlights.length > 0 && (
                  <ul className="list-disc space-y-2 pl-5 text-[length:var(--step-body)]">
                    {item.highlights.map((text) => (
                      <li key={text}>{text}</li>
                    ))}
                  </ul>
                )}
                {item.tags.length > 0 && (
                  <p className="mt-3 text-[length:var(--step-small)] text-muted">
                    <span className="sr-only">Tecnologias: </span>
                    {item.tags.join(" · ")}
                  </p>
                )}
              </div>
            )}
          </li>
        ))}
      </ol>
    </Section>
  );
}
