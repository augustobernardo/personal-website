import { ArrowUpRight, Check, CircleDot, Eye } from "lucide-react";
import Image from "next/image";
import type { CSSProperties } from "react";
import type { Project } from "@/content/types";
import { ProjectVisual } from "./ProjectVisual";

const TONES = {
  pass: { fill: "bg-ok", icon: Check },
  warn: { fill: "bg-warn", icon: Eye },
  neutral: { fill: "bg-white", icon: CircleDot },
};
const LINK = "nb-btn nb-btn--secondary";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const hasVisual = Boolean(project.image ?? project.visual);
  const { fill: toneFill, icon: StatusIcon } = TONES[project.status.tone];
  const paneSide = index % 2 === 0 ? "lg:border-r-3" : "lg:order-2 lg:border-l-3";

  return (
    <article className="nb-card overflow-hidden">
      <div className="on-fill flex flex-wrap items-center justify-between gap-x-4 gap-y-3 border-b-3 border-line px-5 py-4 sm:px-8 bg-pop-blue">
        <h3 className="type-title">{project.name}</h3>
        <p className="flex flex-wrap items-center gap-2">
          <span className={`nb-sticker in-slap rotate-[2deg] ${toneFill}`}>
            <StatusIcon aria-hidden="true" className="size-4" strokeWidth={2.5} />
            {project.status.label}
          </span>
          {project.corporate && <span className="nb-chip">Projeto corporativo</span>}
        </p>
      </div>
      <div className="grid lg:grid-cols-12">
        {hasVisual && (
          <div
            className={`in-media border-b-3 border-line bg-tint p-5 sm:p-8 lg:col-span-7 lg:border-b-0 ${paneSide}`}
          >
            {project.image ? (
              <Image
                src={project.image}
                alt={`Captura de tela do ${project.name}`}
                width={640}
                height={360}
                loading="lazy"
                className="aspect-video w-full rounded-nb border-3 border-line object-cover"
              />
            ) : project.visual ? (
              <ProjectVisual visual={project.visual} name={project.name} />
            ) : null}
          </div>
        )}
        <div
          className={`in-seq p-5 sm:p-8 lg:p-10 ${hasVisual ? "lg:col-span-5" : "lg:col-span-12"}`}
        >
          <p
            className="max-w-[40ch] text-[length:var(--step-lead)] font-medium"
            style={{ "--i": 0 } as CSSProperties}
          >
            {project.result}
          </p>
          {project.decisions.length > 0 && (
            <div className="mt-8" style={{ "--i": 1 } as CSSProperties}>
              <h4 className="nb-chip on-fill bg-pop-blue">Decisões técnicas</h4>
              <ul className="list-square mt-4 space-y-2 text-[length:var(--step-body)]">
                {project.decisions.map((decision) => (
                  <li key={decision}>{decision}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="mt-8" style={{ "--i": 2 } as CSSProperties}>
            <p className="sr-only">Tecnologias:</p>
            <ul className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <li key={tech} className="nb-chip">
                  {tech}
                </li>
              ))}
            </ul>
          </div>
          {(project.repoUrl || project.liveUrl) && (
            <p className="mt-8 flex flex-wrap gap-3" style={{ "--i": 3 } as CSSProperties}>
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={LINK}
                >
                  Código
                  <ArrowUpRight aria-hidden="true" className="size-4" strokeWidth={2.5} />
                  <span className="sr-only"> de {project.name} (abre em nova aba)</span>
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={LINK}
                >
                  Site no ar
                  <ArrowUpRight aria-hidden="true" className="size-4" strokeWidth={2.5} />
                  <span className="sr-only"> de {project.name} (abre em nova aba)</span>
                </a>
              )}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
