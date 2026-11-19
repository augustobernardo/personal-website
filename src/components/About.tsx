import { profile } from "@/content/profile";
import { Section } from "./Section";

export function About() {
  return (
    <Section id="sobre" title="Sobre">
      <p className="max-w-2xl leading-relaxed">{profile.about}</p>
    </Section>
  );
}
