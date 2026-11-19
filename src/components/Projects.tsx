import { publishedProjects } from "@/content/projects";
import { ProjectCard } from "./ProjectCard";
import { Section } from "./Section";

export function Projects() {
  return (
    <Section
      id="projetos"
      title="Projetos"
      className="mt-24 lg:mt-40"
      titleClassName="in-word px-[var(--margin)] text-[length:var(--step-head)] font-extrabold leading-[0.92] tracking-[-0.05em] lg:ml-[calc((100%_-_2_*_var(--margin)_+_24px)_/_6)]"
    >
      <ul className="mt-12">
        {publishedProjects.map((project, index) => (
          <li key={project.slug} className={index > 0 ? "relative -mt-11" : "relative"}>
            <ProjectCard project={project} index={index} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
