import { Download, Mail } from "lucide-react";
import { profile } from "@/content/profile";
import { site } from "@/content/site";
import { hasResume } from "@/lib/resume";
import { ThemeToggle } from "./ThemeToggle";

const PRIMARY = "nb-btn nb-btn--primary";

export function Header() {
  return (
    <header className="border-b-3 border-line bg-bg">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-[auto_1fr] grid-rows-[4.5rem_auto] items-center gap-x-3 px-[var(--margin)] lg:grid-cols-[auto_1fr_auto] lg:grid-rows-[4.5rem]">
        <a
          href="#conteudo"
          aria-label={site.header.home}
          className="on-fill wide inline-flex size-11 items-center justify-center rounded-nb border-3 border-line bg-pop-yellow text-[1rem] font-black shadow-hard-sm"
        >
          {site.header.monogram}
        </a>
        <nav
          aria-label={site.header.sections}
          className="col-span-full row-start-2 flex flex-wrap gap-x-5 pb-2 lg:col-span-1 lg:col-start-2 lg:row-start-1 lg:justify-center lg:gap-x-2 lg:pb-0"
        >
          {site.nav.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className="inline-flex min-h-11 items-center text-[1rem] font-bold decoration-3 underline-offset-[6px] hover:underline lg:px-3"
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="col-start-2 row-start-1 flex items-center justify-end gap-3 lg:col-start-3">
          <ThemeToggle />
          {hasResume ? (
            <a href={profile.resumePath} download className={PRIMARY}>
              <Download aria-hidden="true" strokeWidth={2.5} className="size-4" />
              {site.links.downloadResume}
            </a>
          ) : (
            <a href={`mailto:${profile.email}`} className={PRIMARY}>
              <Mail aria-hidden="true" strokeWidth={2.5} className="size-4" />
              {site.links.email}
            </a>
          )}
        </div>
      </div>
    </header>
  );
}
