import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Header } from "@/components/Header";
import { MotionBoot } from "@/components/motion/MotionBoot";
import { Projects } from "@/components/Projects";
import { Security } from "@/components/Security";
import { Stack } from "@/components/Stack";

export default function Home() {
  return (
    <>
      <Header />
      <main id="conteudo" tabIndex={-1} className="outline-none">
        <Hero />
        <Projects />
        <Experience />
        <Security />
        <Stack />
        <Contact />
      </main>
      <Footer />
      <MotionBoot />
    </>
  );
}
