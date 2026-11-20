import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  title: string;
  className?: string;
  titleClassName?: string;
  children: ReactNode;
};

export function Section({ id, title, className, titleClassName = "", children }: SectionProps) {
  const headingId = `${id}-titulo`;
  return (
    <section id={id} aria-labelledby={headingId} className={className}>
      <h2 id={headingId} className={`scroll-mt-6 ${titleClassName}`}>
        {title}
      </h2>
      {children}
    </section>
  );
}
