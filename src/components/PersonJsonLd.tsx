import { personJsonLd } from "@/lib/seo";

export function PersonJsonLd() {
  return (
    <script
      type="application/ld+json"
      // Escape "<" so the payload cannot close the script tag (Next json-ld guide).
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}
