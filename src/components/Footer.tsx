import { ArrowUp } from "lucide-react";
import { profile } from "@/content/profile";
import { site } from "@/content/site";
import { SecuritySeal } from "./SecurityHeaders";

export function Footer() {
  const words = profile.name.split(" ");
  const year = new Date().getFullYear();

  return (
    <footer id="rodape" className="inverse">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-[var(--margin)] py-12 md:grid-cols-2 lg:py-16">
        <p className="type-head">
          <span className="block">{words.slice(0, 2).join(" ")}</span>
          <span className="block">{words.slice(2).join(" ")}</span>
        </p>
        <div className="flex flex-col items-start gap-4 md:items-end">
          <SecuritySeal />
          <a href="#conteudo" className="nb-btn nb-btn--primary">
            <ArrowUp aria-hidden="true" className="size-4" />
            {site.footer.top}
          </a>
        </div>
        <p className="border-t-2 border-line pt-6 text-[0.875rem] md:col-span-2">
          © {year} {profile.name} · {site.footer.imprint}
        </p>
      </div>
    </footer>
  );
}
