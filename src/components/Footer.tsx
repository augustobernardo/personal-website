import { profile } from "@/content/profile";
import { site } from "@/content/site";
import { SecuritySeal } from "./SecurityHeaders";

export function Footer() {
  const words = profile.name.split(" ");
  const year = new Date().getFullYear();

  return (
    <footer
      id="rodape"
      className="bg-bg px-[var(--margin)] pt-24 pb-8 lg:grid lg:grid-cols-12 lg:gap-x-6"
    >
      <div className="lg:col-span-10 lg:col-start-2">
        <svg
          aria-hidden="true"
          className="block h-6 w-full text-surface md:hidden"
          preserveAspectRatio="none"
          viewBox="0 0 600 24"
        >
          <path
            fill="currentColor"
            d="M0 24 A50 50 0 0 1 100 24 A50 50 0 0 1 200 24 A50 50 0 0 1 300 24 A50 50 0 0 1 400 24 A50 50 0 0 1 500 24 A50 50 0 0 1 600 24 L600 24 Z"
          />
        </svg>
        <svg
          aria-hidden="true"
          className="hidden h-6 w-full text-surface md:block"
          preserveAspectRatio="none"
          viewBox="0 0 1200 24"
        >
          <path
            fill="currentColor"
            d="M0 24 A50 50 0 0 1 100 24 A50 50 0 0 1 200 24 A50 50 0 0 1 300 24 A50 50 0 0 1 400 24 A50 50 0 0 1 500 24 A50 50 0 0 1 600 24 A50 50 0 0 1 700 24 A50 50 0 0 1 800 24 A50 50 0 0 1 900 24 A50 50 0 0 1 1000 24 A50 50 0 0 1 1100 24 A50 50 0 0 1 1200 24 L1200 24 Z"
          />
        </svg>
        <div className="grid gap-12 bg-surface p-6 md:grid-cols-2 md:p-12">
          <p className="text-[length:var(--step-head)] font-extrabold leading-[0.92] tracking-[-0.05em]">
            <span className="block">{words.slice(0, 2).join(" ")}</span>
            <span className="block">{words.slice(2).join(" ")}</span>
          </p>
          <div className="flex flex-col items-start gap-2">
            <SecuritySeal />
            <a
              href="#conteudo"
              className="inline-flex min-h-11 items-center text-[length:var(--step-body)] font-semibold underline underline-offset-4"
            >
              {site.footer.top}
            </a>
          </div>
          <p className="text-center text-[length:var(--step-small)] text-muted md:col-span-2">
            © {year} {profile.name} · {site.footer.imprint}
          </p>
        </div>
      </div>
    </footer>
  );
}
