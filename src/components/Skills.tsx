"use client";

import React, { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
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

function SkillCard({ skill, delay }: { skill: typeof SKILLS[0]; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const Icon = skill.Icon;
  
  const springConfig = { stiffness: 300, damping: 30, mass: 1 };
  
  const mouseX = useSpring(useMotionValue(0), springConfig);
  const mouseY = useSpring(useMotionValue(0), springConfig);
  const rotateX = useSpring(useMotionValue(0), springConfig);
  const rotateY = useSpring(useMotionValue(0), springConfig);
  const hoverValue = useSpring(useMotionValue(0), { stiffness: 300, damping: 20 });
  
  const scale = useTransform(hoverValue, [0, 1], [1, 1.02]);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return;
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rX = ((y / height) - 0.5) * -12; 
    const rY = ((x / width) - 0.5) * 12;

    rotateX.set(rX);
    rotateY.set(rY);
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => {
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return;
    hoverValue.set(1);
  };

  const handleMouseLeave = () => {
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return;
    hoverValue.set(0);
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        scale,
        rotateX,
        rotateY,
        transformPerspective: 1000,
        transformStyle: "preserve-3d",
      }}
      className="group relative flex flex-col items-center justify-center p-8 w-full sm:w-[280px] h-[200px] md:w-[320px] md:h-[220px] rounded-3xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-xl transition-shadow duration-500 hover:shadow-[0_30px_60px_-15px_rgba(255,79,216,0.15)] will-change-transform"
    >
      {/* Interactive hover glow following mouse */}
      <motion.div
        className="pointer-events-none absolute -inset-px z-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 79, 216, 0.08),
              transparent 40%
            )
          `,
        }}
      />

      {/* Content wrapper with translateZ for depth effect */}
      <div className="flex flex-col items-center justify-center gap-5 relative z-10 w-full h-full pointer-events-none" style={{ transform: "translateZ(20px)" }}>
        
        {/* Overlapping Base & Hover Icons */}
        <div className="relative flex items-center justify-center flex-shrink-0">
          <Icon className="text-5xl md:text-6xl text-white/50 opacity-80 transition-all duration-500 group-hover:scale-110 group-hover:opacity-0" />
          <Icon 
            style={{ fill: "url(#skill-neon-gradient)" }} 
            className="absolute text-5xl md:text-6xl opacity-0 scale-100 transition-all duration-500 group-hover:scale-110 group-hover:opacity-100 drop-shadow-[0_0_15px_rgba(255,79,216,0.4)]" 
          />
        </div>

        <h3 className="text-xl md:text-2xl font-bold text-zinc-300 transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#ff4fd8] group-hover:to-[#b46cff] text-center leading-tight">
          {skill.name}
        </h3>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section className="relative w-full py-20 lg:py-32 mb-[40px] lg:mb-[60px] bg-transparent">
      
      {/* SVG Gradient Definition for Icons */}
      <svg width="0" height="0" className="absolute">
        <linearGradient id="skill-neon-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop stopColor="#ff4fd8" offset="0%" />
          <stop stopColor="#b46cff" offset="100%" />
        </linearGradient>
      </svg>

      {/* Background Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
        <div 
          className="absolute top-[20%] left-[-10%] w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-pink-500/5 rounded-full blur-[120px] md:blur-[150px]" 
        />
        <div 
          className="absolute bottom-[20%] right-[-10%] w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-purple-500/5 rounded-full blur-[120px] md:blur-[150px]" 
        />
      </div>

      <div className="container-wide relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-50px" }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="mb-12 md:mb-16 text-center flex flex-col items-center relative z-10"
        >
          {/* Subtle glow directly behind the section heading */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-fuchsia-500/10 rounded-full blur-[80px] pointer-events-none -z-10" />

          <span className="text-zinc-500 font-mono tracking-[0.2em] text-sm uppercase mb-4 block">Proficiency</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">Technical Skills</h2>
        </motion.div>
        
        {/* Wrap layout to force 3 on top, 2 on bottom on large screens */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 max-w-[1050px] mx-auto relative z-10">
          {SKILLS.map((skill, idx) => (
            <SkillCard key={skill.name} skill={skill} delay={idx * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
