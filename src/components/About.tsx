"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { TiltCard } from "./TiltCard";

export default function About() {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Shift the gradient horizontally and vertically based on scroll
  const x = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const y = useTransform(scrollYProgress, [0, 1], ["-30%", "30%"]);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full py-32 md:py-48 flex items-center justify-center overflow-hidden bg-transparent"
    >
      {/* Animated Gradient Background */}
      <motion.div 
        style={{ x, y }}
        className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] pointer-events-none"
      >
        <div className="absolute top-1/2 left-1/2 w-[70%] h-[70%] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-tr from-purple-600/40 via-pink-500/30 to-blue-600/40 blur-[120px] rounded-full mix-blend-screen" />
      </motion.div>

      {/* Glassmorphism Card */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6">
        <TiltCard className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl p-10 md:p-16 text-center shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight drop-shadow-sm">
            About Me
          </h2>
          <p className="text-lg md:text-xl text-white/80 leading-relaxed font-light max-w-2xl mx-auto">
            I am a creative developer and digital marketer focused on crafting premium, interactive web experiences. 
            Merging technical execution with strategic storytelling, I build digital products that captivate users 
            and elevate brands. My work thrives at the intersection of design, motion, and performance.
          </p>
        </TiltCard>
      </div>
    </section>
  );
}
