"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { id: "sobre", label: "Sobre" },
  { id: "experiencia", label: "Experiência" },
  { id: "projetos", label: "Projetos" },
  { id: "seguranca", label: "Segurança" },
  { id: "contato", label: "Contato" },
] as const;

export function SectionNav() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );
    const footer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive("contato");
        }
      },
      { threshold: 0 },
    );

    for (const { id } of LINKS) {
      const section = document.getElementById(id);
      if (section) sections.observe(section);
    }
    const end = document.getElementById("rodape");
    if (end) footer.observe(end);

    return () => {
      sections.disconnect();
      footer.disconnect();
    };
  }, []);

  return (
    <nav aria-label="Seções" className="mt-12 hidden lg:block">
      <ul>
        {LINKS.map(({ id, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              aria-current={active === id ? "location" : undefined}
              onClick={() => setActive(id)}
              className="group flex min-h-11 items-center gap-3 text-base text-muted transition-colors duration-[var(--dur-fast)] hover:text-fg aria-[current=location]:text-fg"
            >
              <span
                aria-hidden="true"
                className="h-5 w-1 origin-center scale-y-0 rounded-full bg-muted transition-transform duration-[var(--dur-base)] ease-[var(--ease-out)] group-hover:scale-y-50 group-aria-[current=location]:scale-y-100 group-aria-[current=location]:bg-accent"
              />
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
