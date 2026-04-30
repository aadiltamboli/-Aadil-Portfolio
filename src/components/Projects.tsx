"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { ArrowUpRight } from "lucide-react";

// Array Data
const PROJECTS = [
  {
    id: 1,
    title: "Yet to come",
    category: "Yet to come",
    description: "Yet to come",
    img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
    isMain: false,
  },
  {
    id: 2,
    title: "Coming soon",
    category: "Coming soon",
    description: "Coming soon",
    img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop",
    isMain: false,
  },
  {
    id: 3,
    title: "Portfolio Design",
    category: "UI/UX",
    description: "Designing Portfolios for individuals and businesses",
    img: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2000&auto=format&fit=crop",
    isMain: true,
  },
];

function ProjectCard({ project, idx }: { project: any; idx: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Mobile reduces tilt intensity
    const intensityX = isMobile ? 4 : 8;
    const intensityY = isMobile ? 5 : 10;

    const rX = ((y / height) - 0.5) * -intensityX; // ±8deg
    const rY = ((x / width) - 0.5) * intensityY;   // ±10deg

    setRotation({ x: rX, y: rY });
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: idx * 0.1, ease: "easeOut" }}
      style={{ zIndex: isHovered ? 20 : 10 }}
      className={`group w-full ${project.id === 3 ? "md:col-span-2 md:w-2/3 mx-auto" : ""} perspective-[1000px] relative`}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${isHovered ? 1.04 : 1})`,
          transformStyle: "preserve-3d",
        }}
        className={`relative z-10 overflow-hidden rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl transition-all duration-300 ease-out aspect-[4/5] md:aspect-[4/3] flex flex-col justify-end w-full h-full transform-gpu
        ${isHovered
            ? "border-blue-500/30 shadow-[0_0_60px_rgba(59,130,246,0.25)]"
            : "shadow-[inset_0_0_40px_rgba(168,85,247,0.2)]"
          }`}
      >
        {/* Abstract Image Background */}
        <div
          className={`absolute inset-0 bg-cover bg-center transition-all duration-700 z-0 ${isHovered
            ? "opacity-60 mix-blend-normal scale-105"
            : "opacity-30 mix-blend-luminosity scale-100"
            }`}
          style={{ backgroundImage: `url(${project.img})` }}
        />

        {/* Absolute gradient blur layer inside card (low opacity) request */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 pointer-events-none z-0 blur-[30px]" />

        {/* Cinematic Gradient Overlays */}
        <div
          className={`absolute inset-0 bg-gradient-to-br from-blue-500/30 via-purple-500/20 to-pink-500/30 transition-opacity duration-300 pointer-events-none z-0 ${isHovered ? "opacity-100" : "opacity-0"
            }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/95 via-[#050505]/50 to-transparent z-0" />

        {/* Light Reflection Effect following cursor */}
        <motion.div
          className="absolute inset-0 z-50 pointer-events-none rounded-[inherit] transition-opacity duration-300 mix-blend-overlay"
          animate={{ opacity: isHovered ? 1 : 0 }}
          style={{
            background: useMotionTemplate`
              radial-gradient(
                600px circle at ${mouseX}px ${mouseY}px,
                rgba(255, 255, 255, 0.2),
                rgba(59, 130, 246, 0.1) 20%,
                transparent 80%
              )
            `,
          }}
        />

        {/* Content Typography */}
        <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end z-10 pointer-events-none">
          <div className="flex items-end justify-between">
            <div
              style={{
                transform: `translateZ(${isHovered && !isMobile ? "40px" : "0px"})`,
                transition: "transform 0.3s ease-out",
              }}
            >
              <span className="text-[10px] md:text-xs text-zinc-400 font-mono tracking-widest uppercase mb-2 md:mb-3 block">
                {project.category}
              </span>
              <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-white mb-2">
                {project.title}
              </h3>
              <p className="text-zinc-400 text-xs md:text-sm max-w-[200px] sm:max-w-xs md:max-w-sm">
                {project.description}
              </p>
            </div>

            {/* Links */}
            <div
              className={`transition-all duration-500 flex items-center gap-3 ${isHovered
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 translate-y-4 pointer-events-none"
                }`}
              style={{
                transform: `translateZ(${isHovered ? "50px" : "0px"})`,
              }}
            >
              <button className="p-3 bg-white/10 hover:bg-white text-white hover:text-black rounded-full backdrop-blur-md transition-colors border border-white/20">
                <FaGithub className="w-5 h-5" />
              </button>
              <button className="p-3 bg-white/10 hover:bg-white text-white hover:text-black rounded-full backdrop-blur-md transition-colors border border-white/20">
                <ArrowUpRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="work" className="relative z-20 bg-transparent text-white py-12 md:py-20 lg:py-28 mb-[60px] lg:mb-[80px] font-sans border-t border-zinc-800 overflow-hidden md:overflow-visible">
      <div className="container-wide">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-10"
        >
          <span className="text-zinc-500 uppercase tracking-[0.3em] text-sm">
            Selected Work
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold mt-4 tracking-tight text-zinc-100">
            Recent Projects
          </h2>
        </motion.div>

        {/* Clean Static Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 relative z-10 w-full max-w-[900px] 2xl:max-w-[1000px] mx-auto">
          {PROJECTS.filter((p) => p.isMain).map((project, idx) => (
            <ProjectCard key={project.title} project={project} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
