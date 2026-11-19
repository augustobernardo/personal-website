import { Download, Mail } from "lucide-react";
import { profile } from "@/content/profile";
import { site } from "@/content/site";
import { hasResume } from "@/lib/resume";
import { ThemeToggle } from "./ThemeToggle";

const PRIMARY =
  "inline-flex min-h-11 items-center gap-2 bg-accent px-4 text-[length:var(--step-small)] font-semibold text-on-accent transition-[transform,opacity] duration-[var(--dur-fast)] ease-[var(--ease-out)] hover:opacity-90 active:scale-[0.97] active:duration-[var(--dur-press)]";

export function Header() {
  return (
    <header className="grid grid-cols-[auto_1fr] grid-rows-[4rem_auto] items-center bg-bg px-[var(--margin)] lg:grid-cols-[1fr_auto_1fr] lg:grid-rows-[4.5rem]">
      <a
        href="#conteudo"
        aria-label={site.header.home}
        className="inline-flex size-11 items-center justify-center bg-surface text-[length:var(--step-small)] font-extrabold transition-colors duration-[var(--dur-fast)] hover:bg-surface-2"
      >
        {site.header.monogram}
      </a>
      <nav
        aria-label={site.header.sections}
        className="col-span-full row-start-2 flex flex-wrap gap-x-4 lg:col-span-1 lg:col-start-2 lg:row-start-1 lg:gap-2"
      >
        {site.nav.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            className="inline-flex min-h-11 min-w-11 items-center text-[length:var(--step-small)] font-semibold text-muted transition-colors duration-[var(--dur-fast)] hover:text-fg lg:px-3"
          >
            {label}
          </a>
        ))}
      </nav>
      <div className="col-start-2 row-start-1 flex items-center justify-end gap-2 lg:col-start-3">
        <ThemeToggle />
        {hasResume ? (
          <a href={profile.resumePath} download className={PRIMARY}>
            <Download aria-hidden="true" className="size-4" />
            {site.links.downloadResume}
          </a>
        ) : (
          <a href={`mailto:${profile.email}`} className={PRIMARY}>
            <Mail aria-hidden="true" className="size-4" />
            {site.links.email}
          </a>
        )}
      </div>
    </header>
  );
}
