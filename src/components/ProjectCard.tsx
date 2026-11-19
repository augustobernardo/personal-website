import Image from "next/image";
import type { Project } from "@/content/types";

const LINK = "font-medium text-accent underline underline-offset-4";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex w-full flex-col overflow-hidden rounded-lg border border-line bg-surface transition-shadow hover:shadow-md">
      <Image
        src={project.image ?? "/projects/placeholder.svg"}
        alt={`Imagem ilustrativa do projeto ${project.name}`}
        width={640}
        height={360}
        loading="lazy"
        className="aspect-video w-full object-cover"
      />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-lg font-semibold">{project.name}</h3>
        {project.corporate && (
          <p className="w-fit rounded-full border border-line px-2 py-0.5 text-xs text-muted">
            Projeto corporativo
          </p>
        )}
        <p>{project.result}</p>
        <ul aria-label="Tecnologias" className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <li key={tech} className="rounded-md bg-bg px-2 py-1 text-xs text-muted">
              {tech}
            </li>
          ))}
        </ul>
        {(project.repoUrl ?? project.liveUrl) && (
          <p className="flex gap-4 text-sm">
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
          <details className="text-sm">
            <summary className="cursor-pointer font-medium">Decisões técnicas</summary>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {project.decisions.map((decision) => (
                <li key={decision}>{decision}</li>
              ))}
            </ul>
          </details>
        )}
      </div>
    </article>
  );
}
