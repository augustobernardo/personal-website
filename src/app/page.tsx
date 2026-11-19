import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Security } from "@/components/Security";

export default function Home() {
  return (
    <div className="px-4 sm:px-6 md:mx-auto md:max-w-[44rem] md:px-8 lg:grid lg:max-w-[80rem] lg:grid-cols-[minmax(0,4fr)_minmax(0,5fr)] lg:gap-16 lg:px-12 xl:gap-24 xl:px-16">
      <Hero />
      <main id="conteudo" tabIndex={-1} className="outline-none lg:py-24">
        <About />
        <Experience />
        <Projects />
        <Security />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}
