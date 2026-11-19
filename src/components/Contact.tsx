import { ExternalLink } from "lucide-react";
import { profile } from "@/content/profile";
import { Section } from "./Section";

const SECONDARY =
  "inline-flex min-h-11 items-center gap-2 rounded px-3 text-sm font-medium text-muted transition-colors duration-[var(--dur-fast)] hover:bg-surface hover:text-fg active:scale-[0.98]";

export function Contact() {
  return (
    <Section id="contato" title="Contato">
      <a
        href={`mailto:${profile.email}`}
        className="inline-flex min-h-11 items-center break-all text-xl font-semibold text-accent underline underline-offset-4 sm:text-2xl"
      >
        {profile.email}
      </a>
      <ul className="mt-6 flex flex-wrap gap-2">
        <li>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={SECONDARY}
          >
            <ExternalLink aria-hidden="true" className="size-4" />
            LinkedIn
            <span className="sr-only"> (abre em nova aba)</span>
          </a>
        </li>
        <li>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className={SECONDARY}>
            <ExternalLink aria-hidden="true" className="size-4" />
            GitHub
            <span className="sr-only"> (abre em nova aba)</span>
          </a>
        </li>
      </ul>
    </Section>
  );
}
