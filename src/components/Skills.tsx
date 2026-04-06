"use client";

import { motion } from "framer-motion";
import { TiltCard } from "./TiltCard";

const SKILLS = [
  { name: "SEO", pct: "95%" },
  { name: "Google Ads", pct: "90%" },
  { name: "Meta Ads", pct: "85%" },
  { name: "Content Strategy", pct: "88%" },
];

export default function Skills() {
  return (
    <section className="relative w-full py-12 md:py-32 lg:py-48 px-6 md:px-12 lg:px-24 bg-transparent overflow-hidden md:overflow-visible">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-blue-400 font-mono tracking-widest text-sm uppercase mb-4 block">Proficiency</span>
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white tracking-tight">Technical Skills</h2>
        </motion.div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {SKILLS.map((skill, idx) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="h-full"
            >
              <TiltCard className="relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 md:p-12 flex flex-col hover:border-blue-500/30 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] transition-all duration-300 group h-full w-full">
                {/* Title structurally stays above */}
                <h3 className="text-lg md:text-2xl font-medium text-zinc-300 text-center group-hover:text-white transition-colors duration-300 relative z-10 break-words">
                  {skill.name}
                </h3>
                
                {/* Invisible spacer to maintain exactly the same card height as prior layout without hardcoding */}
                <div className="mt-6 opacity-0 pointer-events-none select-none flex justify-center">
                  <span className="text-3xl md:text-5xl font-black">{skill.pct}</span>
                </div>

                {/* Absolutely centered visible percentage text */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                  <span className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-zinc-500 to-zinc-700 group-hover:from-blue-400 group-hover:to-cyan-400 transition-all duration-500">
                    {skill.pct}
                  </span>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
