import { profile } from "@/content/profile";
import { Section } from "./Section";

const LINK = "text-accent underline underline-offset-4";

export function Contact() {
  return (
    <Section id="contato" title="Contato">
      <ul className="space-y-2">
        <li>
          E-mail:{" "}
          <a href={`mailto:${profile.email}`} className={LINK}>
            {profile.email}
          </a>
        </li>
        <li>
          LinkedIn:{" "}
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className={LINK}>
            {profile.linkedin.replace("https://www.", "")}
            <span className="sr-only"> (abre em nova aba)</span>
          </a>
        </li>
        <li>
          GitHub:{" "}
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className={LINK}>
            {profile.github.replace("https://", "")}
            <span className="sr-only"> (abre em nova aba)</span>
          </a>
        </li>
      </ul>
    </Section>
  );
}
