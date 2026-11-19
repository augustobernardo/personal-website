import Image from "next/image";
import type { Project } from "@/content/types";
import { ProjectVisual } from "./ProjectVisual";

const LINK =
  "inline-flex min-h-11 items-center font-medium text-accent underline underline-offset-4";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="reveal">
      {project.image ? (
        <Image
          src={project.image}
          alt={`Captura de tela do ${project.name}`}
          width={640}
          height={360}
          loading="lazy"
          className="aspect-video w-full rounded object-cover"
        />
      ) : project.visual ? (
        <ProjectVisual visual={project.visual} name={project.name} />
      ) : null}
      <div className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h3 className="text-xl font-semibold text-balance">{project.name}</h3>
        {project.corporate && <p className="text-sm text-muted">Projeto corporativo</p>}
      </div>
      <p className="mt-3 leading-[1.65] text-pretty">{project.result}</p>
      <ul aria-label="Tecnologias" className="mt-4 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <li key={tech} className="rounded bg-surface px-2 py-1 text-sm text-muted">
            {tech}
          </li>
        ))}
      </ul>
      {(project.repoUrl ?? project.liveUrl) && (
        <p className="mt-4 flex flex-wrap gap-4 text-sm">
          {project.repoUrl && (
            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className={LINK}>
              Código<span className="sr-only"> de {project.name} (abre em nova aba)</span>
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={LINK}>
              Site no ar<span className="sr-only"> de {project.name} (abre em nova aba)</span>
            </a>
          )}
        </p>
      )}
      {project.decisions.length > 0 && (
        <details className="mt-4 text-sm">
          <summary className="inline-flex min-h-11 cursor-pointer items-center font-medium">
            Decisões técnicas
          </summary>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {project.decisions.map((decision) => (
              <li key={decision}>{decision}</li>
            ))}
          </ul>
        </details>
      )}
    </article>
  );
}
