import { publishedProjects } from "@/content/projects";
import { ProjectCard } from "./ProjectCard";
import { Section } from "./Section";

export function Projects() {
  return (
    <Section id="projetos" title="Projetos">
      <ul className="grid gap-6 sm:grid-cols-2">
        {publishedProjects.map((project) => (
          <li key={project.slug} className="flex">
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
