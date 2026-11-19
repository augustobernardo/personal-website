import { profile } from "@/content/profile";
import { site } from "@/content/site";
import { hasResume } from "@/lib/resume";
import { Section } from "./Section";

const LINK =
  "inline-flex min-h-11 items-center px-3 text-[length:var(--step-body)] font-semibold underline underline-offset-4";

export function Contact() {
  const [local, domain] = profile.email.split("@");

  return (
    <Section
      id="contato"
      title="Contato"
      className="on-stamp mt-24 flex min-h-[86svh] flex-col justify-between bg-stamp p-[var(--margin)] text-on-stamp lg:mt-40 lg:min-h-[90svh]"
      titleClassName="sr-only"
    >
      <p className="max-w-[24ch] text-[length:var(--step-lead)] font-semibold">
        {site.contact.lead}
      </p>
      <div className="mt-auto overflow-hidden pb-[0.12em] text-[length:var(--step-display)] md:mb-[12vh]">
        <a
          href={`mailto:${profile.email}`}
          className="in-mask block min-h-11 font-normal leading-[0.92] tracking-[-0.05em] underline decoration-[3px] underline-offset-[0.12em] hover:decoration-[6px]"
        >
          {local}@<br className="md:hidden" />
          {domain}
        </a>
      </div>
      <div className="flex flex-col items-start justify-between gap-3 md:flex-row md:flex-wrap md:items-end md:gap-4">
        <p className="text-[length:var(--step-body)] font-semibold">{profile.location}</p>
        <ul className="flex flex-wrap gap-2">
          <li>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className={LINK}>
              {site.links.linkedin}
              <span className="sr-only"> {site.links.newTab}</span>
            </a>
          </li>
          <li>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className={LINK}>
              {site.links.github}
              <span className="sr-only"> {site.links.newTab}</span>
            </a>
          </li>
          {hasResume && (
            <li>
              <a href={profile.resumePath} download className={LINK}>
                {site.links.resume}
              </a>
            </li>
          )}
        </ul>
      </div>
    </Section>
  );
}
