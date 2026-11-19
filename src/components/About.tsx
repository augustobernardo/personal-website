import { profile } from "@/content/profile";
import { Section } from "./Section";
import { Stack } from "./Stack";

export function About() {
  return (
    <Section id="sobre" title="Sobre">
      <p className="max-w-[65ch] text-lg leading-relaxed text-pretty">{profile.about}</p>
      <Stack />
    </Section>
  );
}
