"use client";

import dynamic from "next/dynamic";

const Skills = dynamic(() => import("@/components/Skills"), { ssr: false });
const Projects = dynamic(() => import("@/components/Projects"), { ssr: false });
const Testimonials = dynamic(() => import("@/components/Testimonials"), { ssr: false });

export default function DynamicSections() {
  return (
    <>
      <Skills />
      <Projects />
      <Testimonials />
    </>
  );
}
