"use client";

import { motion } from "framer-motion";

interface ServiceHeroProps {
  title: string;
  subtitle: string;
  gradientFrom?: string;
  gradientTo?: string;
}

export default function ServiceHero({ 
  title, 
  subtitle, 
  gradientFrom = "from-blue-500", 
  gradientTo = "to-purple-600" 
}: ServiceHeroProps) {
  return (
    <section className="relative w-full pt-28 pb-12 md:pt-48 md:pb-24 px-6 md:px-12 lg:px-24 mx-auto flex items-center overflow-hidden">
      <div className="max-w-4xl mx-auto text-center z-10">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-white mb-4 md:mb-6 leading-[1.1]">
            <span className={`text-transparent bg-clip-text bg-gradient-to-r ${gradientFrom} via-indigo-500 ${gradientTo} drop-shadow-sm pb-2`}>
              {title}
            </span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 leading-relaxed font-light mx-auto max-w-2xl">
            {subtitle}
          </p>
        </motion.div>
      </div>

      {/* Background glow blob */}
      <div className={`absolute top-0 right-1/4 w-[400px] h-[400px] bg-gradient-to-br ${gradientFrom} ${gradientTo} rounded-full blur-[150px] opacity-10 pointer-events-none`} />
      <div className={`absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-gradient-to-br ${gradientFrom} ${gradientTo} rounded-full blur-[120px] opacity-10 pointer-events-none`} />
    </section>
  );
}
