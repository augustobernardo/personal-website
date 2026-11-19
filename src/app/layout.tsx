import { Geist, Geist_Mono } from "next/font/google";
import { PersonJsonLd } from "@/components/PersonJsonLd";
import { siteMetadata } from "@/lib/seo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  preload: false,
});

export const metadata = siteMetadata;

// Constant on purpose: the CSP allows this script by hash, so never interpolate into it.
const THEME_SCRIPT = `(function(){var t;try{t=localStorage.getItem("theme")}catch(e){}document.documentElement.dataset.theme=t==="light"?"light":"dark"})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="bg-bg text-fg">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-on-accent"
        >
          Pular para o conteúdo
        </a>
        {children}
        <PersonJsonLd />
      </body>
    </html>
  );
}
