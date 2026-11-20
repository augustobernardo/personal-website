import { Download, Mail } from "lucide-react";
import { profile } from "@/content/profile";
import { site } from "@/content/site";
import { hasResume } from "@/lib/resume";
import { HeaderNav } from "./HeaderNav";

const PRIMARY = "nb-btn nb-btn--primary";

export function Header() {
  const brand = (
    <a
      href="#conteudo"
      aria-label={site.header.home}
      className="wide inline-flex size-11 items-center justify-center rounded-nb border-3 border-line bg-fg text-[1rem] font-black text-bg shadow-hard-sm"
    >
      {site.header.monogram}
    </a>
  );

  const cta = hasResume ? (
    <a href={profile.resumePath} download className={PRIMARY}>
      <Download aria-hidden="true" strokeWidth={2.5} className="size-4" />
      {site.links.downloadResume}
    </a>
  ) : (
    <a href={`mailto:${profile.email}`} className={PRIMARY}>
      <Mail aria-hidden="true" strokeWidth={2.5} className="size-4" />
      {site.links.email}
    </a>
  );

  return <HeaderNav brand={brand} cta={cta} />;
}
