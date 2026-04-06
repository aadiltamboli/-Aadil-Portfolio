import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import Projects from "@/components/Projects";
import MyNameSection from "@/components/MyNameSection";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import Skills from "@/components/Skills";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/sections/CTASection";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-transparent">
      <ScrollyCanvas>
        <Overlay />
      </ScrollyCanvas>
      <MyNameSection />
      <Stats />
      <Services />
      <Skills />
      <Projects />
      <Testimonials />
      <CTASection />
    </main>
  );
}
