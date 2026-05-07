"use client";

import React, { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";

const STATS = [
  { value: "3", label: "Months Experience" },
  { value: "1", label: "Project" },
  { value: "2+", label: "Clients" },
];

function StatCard({ stat, delay }: { stat: typeof STATS[0]; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);

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
      className="group relative flex flex-col items-center justify-center p-12 h-full w-full rounded-3xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-xl transition-shadow duration-500 hover:shadow-[0_30px_60px_-15px_rgba(255,79,216,0.15)] will-change-transform"
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
      <div className="flex flex-col items-center justify-center relative z-10 w-full h-full pointer-events-none" style={{ transform: "translateZ(20px)" }}>
        <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-2 transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#ff4fd8] group-hover:to-[#b46cff]">
          {stat.value}
        </h3>
        <p className="text-zinc-400 font-mono text-sm tracking-widest uppercase text-center transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#ff4fd8] group-hover:to-[#b46cff]">
          {stat.label}
        </p>
      </div>
    </motion.div>
  );
}

export default function Stats() {
  return (
    <section className="relative w-full pb-16 md:pb-32 lg:pb-48 px-6 md:px-12 lg:px-24 bg-transparent z-10">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {STATS.map((stat, idx) => (
            <StatCard key={stat.label} stat={stat} delay={idx * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
