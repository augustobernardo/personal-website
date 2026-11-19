import { Archivo, Space_Mono } from "next/font/google";
import { PersonJsonLd } from "@/components/PersonJsonLd";
import { site } from "@/content/site";
import { siteMetadata } from "@/lib/seo";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  preload: false,
});

export const metadata = siteMetadata;

// Constant on purpose: the CSP allows this script by hash, so never interpolate into it.
const THEME_SCRIPT = `(function(){var t;try{t=localStorage.getItem("theme")}catch(e){}document.documentElement.dataset.theme=t==="dark"?"dark":"light"})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${archivo.variable} ${spaceMono.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="bg-bg text-fg">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 nb-btn nb-btn--primary"
        >
          {site.skipLink}
        </a>
        {children}
        <PersonJsonLd />
      </body>
    </html>
  );
}
