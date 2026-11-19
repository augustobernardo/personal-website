export type Link = {
  label: string;
  href: string;
};

export type Profile = {
  name: string;
  title: string;
  tagline: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  resumePath: string;
  about: string;
};

export type ExperienceItem = {
  company: string;
  role: string;
  /** ISO month, e.g. "2026-06". */
  start: string;
  /** ISO month, or null when the role is current. */
  end: string | null;
  highlights: string[];
};

export type Project = {
  slug: string;
  name: string;
  result: string;
  stack: string[];
  /** Public repository. Absent for corporate projects. */
  repoUrl?: string;
  liveUrl?: string;
  corporate?: boolean;
  /** Technical decisions. An empty list hides the "Decisões técnicas" block. */
  decisions: string[];
  /** Only published projects are rendered. */
  published: boolean;
  /** Path under /public. Missing files fall back to a placeholder. */
  image?: string;
};

export type StackGroup = {
  name: string;
  items: string[];
};
