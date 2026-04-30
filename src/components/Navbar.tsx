"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "work", "contact"];
      let current = "";

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Check if section is currently active in viewport
          if (rect.top <= 300 && rect.bottom >= 300) {
            current = section;
          }
        }
      }

      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial check
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "About", href: "#about" },
    { name: "Work", href: "#work" },
    { name: "Testimonials", href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
      className="fixed top-0 right-0 z-[1000] p-8 md:p-12"
    >
      <div className="flex items-center gap-6 md:gap-8">
        {navItems.map((item) => {
          const isActive = activeSection === item.href.replace("#", "");
          return (
            <a
              key={item.name}
              href={item.href}
              className={`relative text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-medium transition-colors duration-300 group ${isActive ? "text-white" : "text-white/70 hover:text-white"
                }`}
            >
              {item.name}
              <span
                className={`absolute -bottom-1.5 left-0 h-[1px] bg-white/80 transition-all duration-300 ease-out ${isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
              />
            </a>
          );
        })}
      </div>
    </motion.nav>
  );
}
