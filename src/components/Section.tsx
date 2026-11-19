import type { ReactNode } from "react";

type SectionProps = { id: string; title: string; children: ReactNode };

export function Section({ id, title, children }: SectionProps) {
  const headingId = `${id}-titulo`;
  return (
    <section id={id} aria-labelledby={headingId} className="py-16 lg:scroll-mt-24 lg:pb-24 lg:pt-0">
      <h2
        id={headingId}
        className="sticky top-0 z-10 -mx-4 mb-8 bg-bg px-4 py-3 text-2xl font-semibold tracking-tight text-balance sm:-mx-6 sm:px-6 md:-mx-8 md:px-8 lg:static lg:mx-0 lg:bg-transparent lg:px-0 lg:py-0"
      >
        {title}
      </h2>
      {children}
    </section>
  );
}
