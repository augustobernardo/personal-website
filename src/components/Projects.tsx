import { publishedProjects } from "@/content/projects";
import { ProjectCard } from "./ProjectCard";
import { Section } from "./Section";

export function Projects() {
  return (
    <div className="border-t-3 border-line">
      <Section
        id="projetos"
        title="Projetos"
        className="mx-auto w-full max-w-7xl px-[var(--margin)] py-16 lg:py-24"
        titleClassName="in-word type-head"
      >
        <ul className="mt-10 grid gap-8 lg:mt-14 lg:gap-12">
          {publishedProjects.map((project, index) => (
            <li key={project.slug}>
              <ProjectCard project={project} index={index} />
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}
