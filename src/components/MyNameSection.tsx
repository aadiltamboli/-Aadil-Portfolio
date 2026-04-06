"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function MyNameSection() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only apply legacy tilt if it's a fine pointer (desktop) to avoid touch jitter
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return;
    
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rX = ((y / height) - 0.5) * -10; // Slight tilt X
    const rY = ((x / width) - 0.5) * 10;   // Slight tilt Y

    setRotation({ x: rX, y: rY });
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };
  return (
    <section className="relative w-full py-16 md:py-32 lg:py-48 px-6 md:px-12 lg:px-24 mx-auto flex items-center bg-transparent overflow-hidden">
      {/* Background glow blob */}
      <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-blue-600/10 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center w-full max-w-7xl mx-auto z-10">
        {/* Left: Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center md:items-start text-center md:text-left w-full"
        >
          <span className="text-blue-400 font-mono tracking-widest text-xs md:text-sm uppercase mb-4 md:mb-6 block drop-shadow-[0_0_10px_rgba(96,165,250,0.5)]">
            Hi there, I'm Aadil
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 md:mb-8 leading-[1.2] md:leading-[1.1] max-w-full break-words">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 drop-shadow-sm">Digital Marketer</span> <br />
            a Growth Strategist & UI/UX Designer
          </h2>
          <p className="text-sm sm:text-lg md:text-xl text-zinc-400 leading-relaxed font-light mb-8 md:mb-10 max-w-sm md:max-w-lg">
            I help brands scale using performance marketing, SEO, and high-converting digital strategies &  also design UI/UX
          </p>
          <a
            href="/aadil-tamboli-cv.pdf"
            download="Aadil_Tamboli_CV.pdf"
            className="w-full sm:w-auto text-center px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-white font-medium hover:bg-white/10 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:border-blue-500/50 transition-all duration-300 inline-flex items-center justify-center min-h-[48px]"
          >
            Download CV
          </a>
        </motion.div>

        {/* Right: Personal Image Card */}
        <motion.div
          initial={{ opacity: 0, x: 50, rotate: 5 }}
          whileInView={{ opacity: 1, x: 0, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="relative w-[280px] h-[360px] sm:w-[320px] sm:h-[420px] md:w-[320px] md:h-[420px] mx-auto md:ml-auto perspective-[1000px] z-20 mt-8 md:mt-0"
        >
          {/* Native Background Glow (Premium Effect) */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/10 to-pink-500/20 blur-2xl opacity-70 pointer-events-none" />

          {/* Interactive Image Container */}
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
              transformStyle: "preserve-3d",
            }}
            className="rounded-2xl overflow-hidden relative border border-white/10 w-full h-full transition-transform duration-[400ms] ease-out shadow-2xl"
          >
            {/* The standard img implementation securely loading the asset */}
            <div
              style={{
                transform: `scale(${isHovered ? 1.08 : 1.05})`,
              }}
              className="absolute inset-0 transition-transform duration-[400ms] ease-out w-full h-full"
            >
              <img
                src="/my-image.jpg"
                alt="Aadil Tamboli"
                className="w-full h-full object-cover object-top md:object-center relative"
              />
            </div>

            {/* Subtle overlay gradient on image natively overlaying content */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
