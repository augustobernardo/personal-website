import { profile } from "@/content/profile";
import { ThemeToggle } from "./ThemeToggle";

const LINKS = [
  { href: "#sobre", label: "Sobre" },
  { href: "#experiencia", label: "Experiência" },
  { href: "#projetos", label: "Projetos" },
  { href: "#stack", label: "Stack" },
  { href: "#contato", label: "Contato" },
];

export function Header() {
  const shortName = profile.name.split(" ")[0];
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur">
      <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 py-2">
        <a href="#" className="font-semibold">
          {shortName}
        </a>
        <nav aria-label="Principal" className="order-last w-full sm:order-none sm:w-auto">
          <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="inline-block py-2 text-muted hover:text-fg">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
