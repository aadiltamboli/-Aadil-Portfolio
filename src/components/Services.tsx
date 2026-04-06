"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const SERVICES = [
  { num: "01", title: "Digital Marketing", desc: "Data-driven campaigns to maximize ROI and reach.", slug: "digital-marketing" },
  { num: "02", title: "SEO Optimization", desc: "Organic growth strategies to dominate search results.", slug: "seo-optimization" },
  { num: "03", title: "Social Media Strategy", desc: "Building communities and engaging audiences.", slug: "social-media-strategy" },
  { num: "04", title: "Paid Advertising", desc: "High-converting ad setups across Meta and Google.", slug: "paid-advertising" },
  { num: "05", title: "UI/UX Design", desc: "Crafting intuitive and engaging user experiences.", slug: "ui-ux-design" },
];

export default function Services() {
  return (
    <section className="relative w-full py-12 md:py-32 px-6 lg:px-24 bg-transparent overflow-hidden md:overflow-visible">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-blue-400 font-mono tracking-widest text-sm uppercase mb-4 block">Expertise</span>
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white tracking-tight break-words">Services</h2>
        </motion.div>

        <div className="flex flex-col border-t border-white/5">
          {SERVICES.map((srv, idx) => (
              <motion.div
                key={srv.num}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative flex flex-col md:flex-row md:items-center justify-between py-10 border-b border-white/5 hover:border-white/20 transition-colors cursor-default"
              >
                {/* Blue tracking line on hover */}
                <div className="absolute left-0 bottom-[-1px] h-[2px] w-0 bg-gradient-to-r from-blue-500 to-cyan-400 group-hover:w-full transition-all duration-700 ease-out" />

                <div className="flex items-center gap-6 md:gap-16 transform group-hover:translate-x-6 transition-transform duration-500 ease-out">
                  <span className="text-zinc-600 font-mono text-lg md:text-xl">{srv.num}</span>
                  <h3 className="text-2xl md:text-5xl font-semibold text-zinc-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-cyan-400 transition-colors duration-500 max-w-[80vw] break-words">
                    {srv.title}
                  </h3>
                </div>

                <div className="flex items-center gap-6 md:gap-8 mt-4 md:mt-0 transform group-hover:-translate-x-6 transition-transform duration-500 ease-out">
                  <p className="text-zinc-500 max-w-sm hidden md:block group-hover:text-zinc-300 transition-colors duration-500">{srv.desc}</p>
                </div>
              </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
