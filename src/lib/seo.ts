import type { Metadata } from "next";
import { profile, siteUrl } from "@/content/profile";

const jobTitle = "Desenvolvedor Full Stack";

export const siteMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} — ${jobTitle}`,
    template: `%s | ${profile.name}`,
  },
  description: profile.tagline,
  alternates: { canonical: "/" },
  // The image comes from the opengraph-image file convention.
  openGraph: {
    type: "profile",
    locale: "pt_BR",
    url: "/",
    siteName: profile.name,
    title: `${profile.name} — ${jobTitle}`,
    description: profile.tagline,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
};

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle,
  url: siteUrl,
  email: `mailto:${profile.email}`,
  sameAs: [profile.github, profile.linkedin],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Vila Velha",
    addressRegion: "ES",
    addressCountry: "BR",
  },
  alumniOf: { "@type": "CollegeOrUniversity", name: "UniSales" },
  knowsLanguage: ["pt-BR", "en"],
};
