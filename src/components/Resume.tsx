"use client";

import React, { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";

const RESUME_DATA = [
  {
    title: "About Me",
    desc: "I am a passionate digital marketing enthusiast with a good foundation in SEO, performance marketing, and data-driven strategies. I also have a growing interest in UI/UX design, focusing on creating clean, user-friendly, and visually engaging digital experiences. I enjoy solving real-world problems through creative campaigns and continuously learning new tools and technologies to improve my skills."
  },
  {
    title: "Career Objective",
    desc: "Highly adaptable and quick learner seeking an entry-level position in industry to develop skills and contribute to a team-oriented environment."
  },
  {
    title: "Skills",
    desc: "Power BI, MS Excel, Digital Marketing, SEO, Meta Ads, Google Ads, UI/UX Designing, Communication, Computer Literacy, Time Management, Teamwork, Problem Solving, Adaptability, Quick Learner"
  },
  {
    title: "Education",
    desc: "BBA (CA) - Bachelor of Business Administration & Computer Application\nAbeda Inamdar Senior College\n(2023 – 2026)"
  },
  {
    title: "Achievements",
    desc: "Data Analysis Certification - Lighthouse Communities Foundation, Pune (Feb 2026)"
  },
  {
    title: "Strengths",
    desc: "Punctual, Quick Learner, Responsible, Hardworking, Creative"
  },
];

function ResumeCard({ item, delay }: { item: any; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  
  const springConfig = { stiffness: 300, damping: 30, mass: 1 };
  
  const mouseX = useSpring(useMotionValue(0), springConfig);
  const mouseY = useSpring(useMotionValue(0), springConfig);
  const rotateX = useSpring(useMotionValue(0), springConfig);
  const rotateY = useSpring(useMotionValue(0), springConfig);
  const hoverValue = useSpring(useMotionValue(0), { stiffness: 300, damping: 20 });
  
  // Soft scale increase on hover
  const scale = useTransform(hoverValue, [0, 1], [1, 1.02]);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return;
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Subtle 3D rotation
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
      className="group relative flex flex-col p-8 md:p-10 rounded-3xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-xl transition-shadow duration-500 hover:shadow-[0_30px_60px_-15px_rgba(255,79,216,0.15)] will-change-transform"
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
      <div className="relative z-10" style={{ transform: "translateZ(20px)" }}>
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#ff4fd8] group-hover:to-[#b46cff]">
          {item.title}
        </h3>

        <p className="text-zinc-400 text-base md:text-lg leading-relaxed whitespace-pre-wrap font-light group-hover:text-zinc-300 transition-colors duration-300">
          {item.desc}
        </p>
      </div>
    </motion.div>
  );
}

export default function Resume() {
  return (
    <section id="about" className="relative w-full py-20 lg:py-32 mb-[40px] lg:mb-[60px] bg-transparent">
      
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
        {/* Split Layout: ~35% Left (col-span-4), ~65% Right (col-span-8) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* LEFT SIDE: Sticky Heading & Content */}
          <div className="lg:col-span-4 lg:sticky lg:top-36 flex flex-col relative">
            {/* Subtle glow directly behind the heading */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] bg-fuchsia-500/10 rounded-full blur-[80px] pointer-events-none -z-10" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative z-10"
            >
              <span className="text-zinc-500 font-mono tracking-[0.2em] text-sm uppercase mb-5 block">
                RESUME
              </span>
              {/* Added pb-4 to prevent text or drop-shadow cut off */}
              <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-white tracking-tight leading-[1.2] mb-6 pb-2">
                Career & <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff4fd8] to-[#b46cff] drop-shadow-[0_0_15px_rgba(255,79,216,0.3)]">
                  Experience
                </span>
              </h2>
              <p className="text-zinc-400 text-base md:text-lg leading-relaxed font-light">
                A detailed overview of my professional journey, exploring my education, skills, and the milestones I've achieved so far.
              </p>
            </motion.div>
          </div>

          {/* RIGHT SIDE: Scrolling Resume Cards */}
          <div className="lg:col-span-8 flex flex-col gap-6 md:gap-8 relative z-10">
            {RESUME_DATA.map((item, idx) => (
              <ResumeCard key={item.title} item={item} delay={idx * 0.1} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
