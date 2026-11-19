import { Download, Mail } from "lucide-react";
import type { ReactNode } from "react";
import { profile } from "@/content/profile";
import { site } from "@/content/site";
import { hasResume } from "@/lib/resume";
import { Section } from "./Section";

const SECONDARY =
  "inline-flex min-h-11 items-center gap-2 bg-surface-2 px-4 text-[length:var(--step-small)] font-semibold text-fg transition-colors duration-[var(--dur-fast)] hover:bg-surface-3 active:scale-[0.97]";

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
  const line1 = words.slice(0, 2).join(" ");
  const line2 = words.slice(2).join(" ");

  return (
    <div className="mt-4 px-3 md:px-[var(--margin)] lg:mt-10 lg:grid lg:grid-cols-12 lg:gap-x-6">
      <div className="bg-surface px-5 pb-6 pt-5 md:p-10 lg:col-span-8 lg:col-start-3 lg:p-14">
        <h1
          id="hero-titulo"
          className="text-[length:var(--step-display)] font-extrabold leading-[0.92] tracking-[-0.05em]"
        >
          <span className="block">{line1}</span>
          <span className="block">{line2}</span>
        </h1>
        <div className="mt-10 grid gap-6 md:grid-cols-[minmax(0,1fr)_17rem] md:items-start md:gap-8">
          <div>
            <p className="text-[length:var(--step-lead)] font-semibold">{profile.role}</p>
            <p className="text-[length:var(--step-lead)] text-muted">{profile.specialty}</p>
            <p className="mt-4 max-w-[44ch] text-[length:var(--step-body)]">{profile.tagline}</p>
          </div>
          {/* SecurityStamp slot: a separate worker owns the live header-check integration. */}
          <div data-security-stamp-slot="" />
        </div>
        <dl className="mt-12 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {profile.facts.map(({ label, value }) => (
            <div key={label}>
              <dt className="text-[length:var(--step-small)] font-semibold text-muted">{label}</dt>
              <dd className="mt-1 text-[length:var(--step-body)] font-semibold text-fg">{value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-10 flex flex-wrap gap-2">
          <a href={`mailto:${profile.email}`} className={SECONDARY}>
            <Mail aria-hidden="true" className="size-4" />
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
              <Download aria-hidden="true" className="size-4" />
              {site.links.resume}
            </a>
          )}
        </div>
        <Section
          id="sobre"
          title={site.about.title}
          className="mt-16"
          titleClassName="text-[length:var(--step-lead)] font-extrabold"
        >
          <p className="mt-3 max-w-[65ch] text-[length:var(--step-body)]">{profile.about}</p>
        </Section>
      </div>
    </div>
  );
}
