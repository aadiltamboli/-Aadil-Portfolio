"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Target, TrendingUp } from "lucide-react";

export default function WhyWorkWithMe() {
  const points = [
    {
      title: "Honest Expectations",
      desc: "No fake metrics or \"10x growth\" guarantees overnight. I believe in sustainable, data-driven basics.",
      icon: <ShieldCheck className="w-8 h-8 text-blue-400 mb-4" />
    },
    {
      title: "Direct Communication",
      desc: "No middlemen or agency jargon. You talk directly with the person doing the work.",
      icon: <Target className="w-8 h-8 text-blue-400 mb-4" />
    },
    {
      title: "Practical Focus",
      desc: "I specialize in simple, actionable strategies that actually move the needle for growing brands.",
      icon: <TrendingUp className="w-8 h-8 text-blue-400 mb-4" />
    }
  ];

  return (
    <section className="py-16 md:py-24 px-6 md:px-12 lg:px-24 w-full bg-white/[0.02] relative overflow-hidden mt-8 md:mt-16">
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-purple-400 font-mono tracking-widest text-sm uppercase mb-4 block">My Philosophy</span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Why work with me?</h2>
          <p className="text-lg text-zinc-400 leading-relaxed font-light mx-auto max-w-2xl">
            I don't claim to be a massive agency. I'm a growing digital marketer who relies on tested fundamentals, real work, and absolute transparency. Perfect for small businesses and startups.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {points.map((pt, i) => (
             <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center md:text-left"
             >
                <div className="flex justify-center md:justify-start">
                  {pt.icon}
                </div>
                <h3 className="text-xl font-medium text-white mb-3">{pt.title}</h3>
                <p className="text-zinc-500 font-light leading-relaxed">{pt.desc}</p>
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
}
