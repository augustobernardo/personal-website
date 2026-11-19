import { profile } from "@/content/profile";
import { site } from "@/content/site";
import { hasResume } from "@/lib/resume";
import { Section } from "./Section";

const LINK = "nb-btn nb-btn--secondary";

export function Contact() {
  const [local, domain] = profile.email.split("@");

  return (
    <div className="fill-band bg-pop-yellow border-t-3 border-line">
      <Section
        id="contato"
        title="Contato"
        className="mx-auto w-full max-w-7xl px-[var(--margin)] py-16 lg:py-24"
        titleClassName="type-head"
      >
        <p className="mt-4 max-w-[34ch] text-[length:var(--step-lead)] font-medium">
          {site.contact.lead}
        </p>
        <a
          href={`mailto:${profile.email}`}
          className="nb-btn nb-btn--secondary mt-8 w-full justify-start px-5 py-5 text-[length:var(--step-email)] font-extrabold leading-[1.05] tracking-[-0.02em] [overflow-wrap:anywhere] sm:w-auto sm:px-8"
        >
          <span>
            {local}@<br className="md:hidden" />
            {domain}
          </span>
        </a>
        <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="font-bold">{profile.location}</p>
          <ul className="flex flex-wrap gap-3">
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
    </div>
  );
}
