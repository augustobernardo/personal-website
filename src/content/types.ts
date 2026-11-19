export type Link = {
  label: string;
  href: string;
};

export type Fact = { label: string; value: string };

export type Profile = {
  name: string;
  title: string;
  role: string;
  specialty: string;
  facts: Fact[];
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
  tags: string[];
};

export type ChatMessage = { from: "user" | "bot"; text?: string; audioSeconds?: number };

export type ProjectVisualData =
  | { kind: "chat"; title: string; caption: string; messages: ChatMessage[] }
  | {
      kind: "verdicts";
      intro: string;
      caption: string;
      verdicts: { label: string; tone: "pass" | "fail" | "warn" }[];
      stats: { value: string; label: string }[];
    }
  | {
      kind: "flow";
      caption: string;
      steps: { event: string; results: string[] }[];
      note: string;
    };

export type ProjectStatus = { label: string; tone: "pass" | "warn" | "neutral" };

export type Project = {
  slug: string;
  name: string;
  status: ProjectStatus;
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
  /** Drawn product fragment shown when there is no screenshot. */
  visual?: ProjectVisualData;
  /** Path under /public. Replaces the drawn visual when present. */
  image?: string;
};

export type StackGroup = {
  name: string;
  items: string[];
};
