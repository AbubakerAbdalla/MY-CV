import { ScrollyCanvas } from "@/components/ScrollyCanvas";
import { Overlay } from "@/components/Overlay";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Skills } from "@/components/Skills";
import { Certifications } from "@/components/Certifications";
import { Company } from "@/components/Company";
import { Contact } from "@/components/Contact";
import { FloatingContact } from "@/components/FloatingContact";
import { Background } from "@/components/Background";
import { Preloader } from "@/components/Preloader";
import { Footer } from "@/components/Footer";
import Capabilities from "@/components/Capabilities";
import { About } from "@/components/About";

export default function Home() {
  return (
    <main className="relative w-full bg-black min-h-screen text-slate-50 selection:bg-orange-500/30">
      <Preloader />
      
      {/* Dynamic Background */}
      <Background />

      {/* Floating Global Contact UI */}
      <FloatingContact />

      {/* Scrollytelling Section */}
      <section className="relative w-full">
        <ScrollyCanvas />
        <Overlay />
      </section>
      
      {/* Scrollable Content Below */}
      <About />
      <Skills />
      
      <Capabilities />

      <Certifications />
      <Company />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}
