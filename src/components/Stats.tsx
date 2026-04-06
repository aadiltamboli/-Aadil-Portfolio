"use client";

import { motion } from "framer-motion";
import { TiltCard } from "./TiltCard";

const STATS = [
  { value: "3", label: "Months Experience" },
  { value: "1", label: "Projects" },
  { value: "2+", label: "Clients" },
];

export default function Stats() {
  return (
    <section className="relative w-full pb-16 md:pb-32 lg:pb-48 px-6 md:px-12 lg:px-24 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STATS.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="h-full"
            >
              <TiltCard className="flex flex-col items-center justify-center p-12 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-blue-500/30 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] transition-all duration-500 group h-full w-full">
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-cyan-400 transition-colors duration-300">
                  {stat.value}
                </h3>
                <p className="text-zinc-400 font-mono text-sm tracking-widest uppercase text-center group-hover:text-zinc-300 transition-colors duration-300">
                  {stat.label}
                </p>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
