import { Download, Mail } from "lucide-react";
import type { ReactNode } from "react";
import { profile } from "@/content/profile";
import { site } from "@/content/site";
import { hasResume } from "@/lib/resume";
import { Section } from "./Section";
import { SecurityStamp } from "./SecurityHeaders";

const SECONDARY = "nb-btn nb-btn--secondary";
const PRIMARY = "nb-btn nb-btn--primary";

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
    <a href={href} target="_blank" rel="noopener noreferrer" className={SECONDARY}>
      {icon}
      {children}
      <span className="sr-only"> {site.links.newTab}</span>
    </a>
  );
}

export function Hero() {
  const words = profile.name.split(" ");

  return (
    <div className="mx-auto w-full max-w-7xl px-[var(--margin)] pt-8 pb-16 lg:pt-12 lg:pb-24">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-12">
        <div className="nb-card p-5 sm:p-8 md:col-span-2 lg:col-span-8 lg:row-span-2 lg:p-12">
          <p className="hero-slap nb-sticker inline-block rotate-[-2deg] bg-pop-blue">
            {profile.role}
          </p>
          <h1 id="hero-titulo" className="type-display mt-5">
            <span className="block">{words[0]}</span>
            <span className="block">{words[1]}</span>
            <span className="block">{words.slice(2).join(" ")}</span>
          </h1>
          <ul className="mt-6 flex flex-wrap gap-2">
            {profile.specialty.split(" · ").map((item) => (
              <li key={item} className="nb-chip">
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-[34ch] text-[length:var(--step-lead)] font-medium">
            {profile.tagline}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={`mailto:${profile.email}`} className={PRIMARY}>
              <Mail aria-hidden="true" strokeWidth={2.5} className="size-4" />
              {site.links.email}
            </a>
            <External href={profile.github} icon={<BrandIcon path={GITHUB_PATH} />}>
              {site.links.github}
            </External>
            <External href={profile.linkedin} icon={<BrandIcon path={LINKEDIN_PATH} />}>
              {site.links.linkedin}
            </External>
            {hasResume && (
              <a href={profile.resumePath} download className={SECONDARY}>
                <Download aria-hidden="true" strokeWidth={2.5} className="size-4" />
                {site.links.resume}
              </a>
            )}
          </div>
        </div>
        <div
          data-parallax="hero"
          className="flex items-start justify-center px-2 pt-2 md:justify-start lg:col-span-4 lg:col-start-9 lg:row-start-1"
        >
          <SecurityStamp />
        </div>
        <div className="nb-card p-5 sm:p-6 lg:col-span-4 lg:col-start-9 lg:row-start-2">
          <dl className="divide-y-2 divide-line">
            {profile.facts.map(({ label, value }) => (
              <div key={label} className="grid gap-1 py-3 first:pt-0 last:pb-0">
                <dt className="font-mono text-[0.875rem] font-bold text-muted">{label}</dt>
                <dd className="font-bold">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <Section
          id="sobre"
          title={site.about.title}
          className="nb-card on-fill bg-pop-blue p-5 sm:p-8 md:col-span-2 lg:col-span-12 lg:grid lg:grid-cols-12 lg:gap-6 lg:p-10"
          titleClassName="type-title lg:col-span-3"
        >
          <p className="mt-3 max-w-[65ch] lg:col-span-9 lg:mt-0">{profile.about}</p>
        </Section>
      </div>
    </div>
  );
}
