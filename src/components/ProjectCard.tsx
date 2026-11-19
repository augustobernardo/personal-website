import Image from "next/image";
import type { CSSProperties } from "react";
import type { Project } from "@/content/types";
import { ProjectVisual } from "./ProjectVisual";

const FILLS = ["bg-surface", "bg-surface-2", "bg-surface-3"];
const TONES = { pass: "bg-accent", warn: "bg-warn", neutral: "bg-muted" };
const LINK =
  "inline-flex min-h-11 items-center gap-2 bg-surface-2 px-4 text-[length:var(--step-small)] font-semibold text-fg transition-colors duration-[var(--dur-fast)] hover:bg-surface-3 active:scale-[0.97]";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const fill = FILLS[index % FILLS.length];
  const hasVisual = Boolean(project.image ?? project.visual);

  return (
    <article className={`relative ${fill}`}>
      <div
        className={`in-tab absolute -top-11 left-[var(--margin)] flex h-11 min-w-[200px] w-max max-w-[calc(100%-2*var(--margin))] items-center px-7 ${fill} [clip-path:polygon(0_100%,14px_0,calc(100%-14px)_0,100%_100%)]`}
      >
        <h3 className="whitespace-nowrap text-[length:var(--step-body)] font-extrabold md:text-[length:var(--step-lead)]">
          {project.name}
        </h3>
      </div>
      <div className="flex h-16 items-center gap-2 px-[var(--margin)] text-[length:var(--step-small)] font-semibold md:justify-end">
        <span aria-hidden="true" className={`size-2.5 shrink-0 ${TONES[project.status.tone]}`} />
        <p>
          {project.status.label}
          {project.corporate && <span className="text-muted"> · Projeto corporativo</span>}
        </p>
      </div>
      <div className="grid gap-8 px-[var(--margin)] pb-24 lg:grid-cols-12 lg:gap-6">
        {hasVisual && (
          <div className="in-media lg:col-span-7">
            {project.image ? (
              <Image
                src={project.image}
                alt={`Captura de tela do ${project.name}`}
                width={640}
                height={360}
                loading="lazy"
                className="aspect-video w-full object-cover"
              />
            ) : project.visual ? (
              <ProjectVisual visual={project.visual} name={project.name} />
            ) : null}
          </div>
        )}
        <div className={`in-seq ${hasVisual ? "lg:col-span-5" : "lg:col-span-12"}`}>
          <p
            className="max-w-[40ch] text-[length:var(--step-lead)]"
            style={{ "--i": 0 } as CSSProperties}
          >
            {project.result}
          </p>
          {project.decisions.length > 0 && (
            <div className="mt-8" style={{ "--i": 1 } as CSSProperties}>
              <h4 className="text-[length:var(--step-small)] font-semibold text-muted">
                Decisões técnicas
              </h4>
              <ul className="mt-2 list-disc space-y-2 pl-5 text-[length:var(--step-body)]">
                {project.decisions.map((decision) => (
                  <li key={decision}>{decision}</li>
                ))}
              </ul>
            </div>
          )}
          <p
            className="mt-6 text-[length:var(--step-small)] text-muted"
            style={{ "--i": 2 } as CSSProperties}
          >
            <span className="sr-only">Tecnologias: </span>
            {project.stack.join(" · ")}
          </p>
          {(project.repoUrl || project.liveUrl) && (
            <p className="mt-6 flex flex-wrap gap-2" style={{ "--i": 3 } as CSSProperties}>
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={LINK}
                >
                  Código<span className="sr-only"> de {project.name} (abre em nova aba)</span>
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={LINK}
                >
                  Site no ar<span className="sr-only"> de {project.name} (abre em nova aba)</span>
                </a>
              )}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
