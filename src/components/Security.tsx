import { security } from "@/content/security";
import { Section } from "./Section";
import { SecurityPanel } from "./SecurityHeaders";

export function Security() {
  return (
    <Section id="seguranca" title={security.title}>
      <p className="mb-8 max-w-[65ch] leading-[1.65]">{security.intro}</p>
      <SecurityPanel />
    </Section>
  );
}
