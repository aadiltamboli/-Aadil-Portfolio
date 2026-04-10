"use client";

import { motion } from "framer-motion";

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

export default function Resume() {
  return (
    <section id="about" className="relative w-full py-12 md:py-20 lg:py-28 mb-[60px] lg:mb-[80px] bg-transparent overflow-hidden md:overflow-visible">
      {/* Container max-width restricted and horizontally centered */}
      <div className="container-wide">

        {/* Main Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-10"
        >
          <span className="text-blue-400 font-mono tracking-widest text-sm uppercase mb-3 block"></span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight break-words text-left">
            Resume
          </h2>
        </motion.div>

        {/* Content Flow */}
        <div className="flex flex-col">
          {RESUME_DATA.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
              className="flex flex-col group pb-6 md:pb-8 mb-6 md:mb-8 last:mb-0 relative cursor-default"
            >
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-zinc-100 mb-4 md:mb-5 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-300 group-hover:to-cyan-300 transition-all duration-500 ease-in-out">
                {item.title}
              </h3>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
                className="text-zinc-400 md:text-zinc-300 text-base md:text-lg leading-relaxed whitespace-pre-wrap font-light group-hover:text-zinc-200 transition-colors duration-500 ease-in-out"
              >
                {item.desc}
              </motion.p>

              {/* Animated Gradient Line Expanding from Left to Right on Hover */}
              <div
                className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500 ease-in-out group-hover:shadow-[0_0_12px_rgba(56,189,248,0.8)]"
              />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
