import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import MyNameSection from "@/components/MyNameSection";
import Stats from "@/components/Stats";
import Resume from "@/components/Resume";
import DynamicSections from "@/components/DynamicSections";
import AmbientGlows from "@/components/AmbientGlows";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-transparent">
      <ScrollyCanvas>
        <Overlay />
      </ScrollyCanvas>
      
      {/* Sections Below Hero */}
      <div className="relative w-full">
        <AmbientGlows />
        <MyNameSection />
        <Stats />
        <Resume />
        <DynamicSections />
      </div>
    </main>
  );
}
