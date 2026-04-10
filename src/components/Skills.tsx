"use client";

import { motion } from "framer-motion";
import { TiltCard } from "./TiltCard";
import { SiGoogleads, SiMeta } from "react-icons/si";
import { MdOutlineDesignServices } from "react-icons/md";
import { TbTrendingUp } from "react-icons/tb";
import { FaClipboardList } from "react-icons/fa";

const SKILLS = [
  { name: "SEO", Icon: TbTrendingUp },
  { name: "Google Ads", Icon: SiGoogleads },
  { name: "Meta Ads", Icon: SiMeta },
  { name: "Content Strategy", Icon: FaClipboardList },
  { name: "UI/UX", Icon: MdOutlineDesignServices },
];

export default function Skills() {
  return (
    <section className="relative w-full py-12 md:py-20 lg:py-28 mb-[60px] lg:mb-[80px] bg-transparent overflow-x-visible">
      <div className="container-wide">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="mb-10"
        >
          <span className="text-blue-400 font-mono tracking-widest text-sm uppercase mb-4 block">Proficiency</span>
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white tracking-tight">Technical Skills</h2>
        </motion.div>
        
        <div className="flex w-full justify-start xl:justify-center flex-nowrap overflow-x-auto scroll-smooth pb-8 gap-[24px] snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {SKILLS.map((skill, idx) => {
            const Icon = skill.Icon;
            return (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="w-[260px] h-[180px] grow-0 shrink-0 snap-center"
            >
              <TiltCard className="relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl hover:border-blue-500/30 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] transition-all duration-300 group w-full h-full p-4">
                
                <div className="flex flex-col items-center justify-center h-full w-full gap-[12px] m-0 p-0">
                  <Icon className="text-5xl md:text-6xl text-white/50 opacity-80 drop-shadow-[0_0_4px_rgba(255,204,0,0.3)] transition-all duration-500 group-hover:scale-105 group-hover:opacity-100 group-hover:text-[#ffcc00] group-hover:drop-shadow-[0_0_8px_rgba(255,204,0,0.6)] m-0 p-0 border-0 flex-shrink-0" />
                  <h3 className="text-lg md:text-xl font-medium text-zinc-300 group-hover:text-white transition-colors duration-300 relative z-10 m-0 p-0 leading-tight">
                    {skill.name}
                  </h3>
                </div>

              </TiltCard>
            </motion.div>
          )})}
        </div>
      </div>
    </section>
  );
}
