import { ArrowRight } from "lucide-react";
import { Fragment, type CSSProperties } from "react";
import { careerArc, experience } from "@/content/experience";
import { formatPeriod } from "@/lib/format";
import { Section } from "./Section";

export function Experience() {
  return (
    <div className="border-t-3 border-line">
      <Section
        id="experiencia"
        title="Experiência"
        className="mx-auto w-full max-w-7xl px-[var(--margin)] py-16 lg:grid lg:grid-cols-12 lg:gap-6 lg:py-24"
        titleClassName="in-word type-head lg:col-span-12"
      >
        <p className="mt-6 flex flex-wrap items-center gap-2 lg:col-span-4 lg:col-start-1 lg:row-start-2 lg:flex-col lg:items-start lg:self-start">
          <span className="sr-only">Trajetória: </span>
          {careerArc.map((step, i) => (
            <Fragment key={step}>
              {i > 0 && (
                <>
                  <ArrowRight
                    aria-hidden="true"
                    className="size-5 lg:rotate-90"
                    strokeWidth={2.5}
                  />
                  <span className="sr-only">, depois </span>
                </>
              )}
              <span
                className={`nb-chip${i === careerArc.length - 1 ? " bg-pop-pink on-fill" : ""}`}
              >
                {step}
              </span>
            </Fragment>
          ))}
        </p>
        <ol className="in-seq mt-10 grid gap-6 lg:col-span-8 lg:col-start-5 lg:row-start-2 lg:mt-6">
          {experience.map((item, index) => (
            <li
              key={`${item.company}-${item.start}`}
              className="nb-card overflow-hidden"
              style={{ "--i": index } as CSSProperties}
            >
              <div
                className={`flex flex-wrap items-start justify-between gap-3 px-5 py-4 sm:px-6 ${
                  item.end === null ? "bg-pop-yellow on-fill" : "bg-surface"
                } ${item.highlights.length > 0 || item.tags.length > 0 ? "border-b-3 border-line" : ""}`}
              >
                <div>
                  <h3 className="type-title">{item.role}</h3>
                  <p className="font-bold">{item.company}</p>
                </div>
                <p className="nb-chip tabular-nums">
                  <time>{formatPeriod(item.start, item.end)}</time>
                </p>
              </div>
              {(item.highlights.length > 0 || item.tags.length > 0) && (
                <div className="px-5 py-5 sm:px-6">
                  {item.highlights.length > 0 && (
                    <ul className="list-square space-y-2">
                      {item.highlights.map((text) => (
                        <li key={text}>{text}</li>
                      ))}
                    </ul>
                  )}
                  {item.tags.length > 0 && (
                    <p className="mt-4 flex flex-wrap gap-2">
                      <span className="sr-only">Tecnologias: </span>
                      {item.tags.map((tag) => (
                        <span key={tag} className="nb-chip">
                          {tag}
                        </span>
                      ))}
                    </p>
                  )}
                </div>
              )}
            </li>
          ))}
        </ol>
      </Section>
    </div>
  );
}
