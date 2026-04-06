"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { TiltCard } from "@/components/TiltCard";

interface ServiceSectionProps {
  title: string;
  items: { title: string; description?: string }[];
  icon?: React.ReactNode;
}

export default function ServiceSection({ title, items, icon }: ServiceSectionProps) {
  return (
    <section className="py-8 md:py-16 px-6 md:px-12 lg:px-24 w-full max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        className="mb-10"
      >
        <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight flex items-center gap-4">
          {icon && <span className="text-blue-400">{icon}</span>}
          {title}
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="h-full"
          >
            <TiltCard className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md transition-colors h-full">
              <h3 className="text-xl font-medium text-zinc-200 flex items-start gap-3 mb-2">
                <CheckCircle2 className="w-5 h-5 text-blue-400 mt-1 shrink-0" />
                {item.title}
              </h3>
              {item.description && (
                <p className="text-zinc-400 font-light ml-8 leading-relaxed">
                  {item.description}
                </p>
              )}
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
