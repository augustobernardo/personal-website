import { Download, Mail } from "lucide-react";
import type { ReactNode } from "react";
import { profile } from "@/content/profile";

const BUTTON =
  "inline-flex min-h-11 items-center gap-2 rounded-md border border-line px-4 py-2 text-sm font-medium hover:bg-surface";

function BrandIcon({ path }: { path: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4" fill="currentColor">
      <path d={path} />
    </svg>
  );
}

const GITHUB_PATH =
  "M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.7 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z";
const LINKEDIN_PATH =
  "M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z";

function External({ href, icon, children }: { href: string; icon: ReactNode; children: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={BUTTON}>
      {icon}
      {children}
      <span className="sr-only"> (abre em nova aba)</span>
    </a>
  );
}

export function Hero() {
  return (
    <section aria-labelledby="hero-titulo" className="rise py-16 sm:py-24">
      <h1 id="hero-titulo" className="text-4xl font-semibold tracking-tight sm:text-5xl">
        {profile.name}
      </h1>
      <p className="mt-3 text-lg text-muted">{profile.title}</p>
      <p className="mt-6 max-w-2xl text-xl">{profile.tagline}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href={profile.resumePath}
          download
          className="inline-flex min-h-11 items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-medium text-on-accent hover:opacity-90"
        >
          <Download aria-hidden="true" className="size-4" />
          Baixar currículo
        </a>
        <External href={profile.github} icon={<BrandIcon path={GITHUB_PATH} />}>
          GitHub
        </External>
        <External href={profile.linkedin} icon={<BrandIcon path={LINKEDIN_PATH} />}>
          LinkedIn
        </External>
        <a href={`mailto:${profile.email}`} className={BUTTON}>
          <Mail aria-hidden="true" className="size-4" />
          E-mail
        </a>
      </div>
    </section>
  );
}
