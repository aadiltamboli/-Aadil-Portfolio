"use client";

import React, { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";

export const TiltCard = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const springConfig = { stiffness: 300, damping: 30, mass: 1 };
  
  // Use framer-motion values for smooth spring physics
  const mouseX = useSpring(useMotionValue(0), springConfig);
  const mouseY = useSpring(useMotionValue(0), springConfig);
  const rotateX = useSpring(useMotionValue(0), springConfig);
  const rotateY = useSpring(useMotionValue(0), springConfig);
  
  // Use a motion value for hover state to avoid React re-renders completely
  const hoverValue = useSpring(useMotionValue(0), { stiffness: 300, damping: 20 });
  const scale = useTransform(hoverValue, [0, 1], [1, 1.03]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return;
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate rotation (-20 to +20 degrees as requested)
    const rX = ((y / height) - 0.5) * -20;
    const rY = ((x / width) - 0.5) * 20;

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
      className={`relative overflow-hidden ${className}`}
    >
      {/* Light Reflection layer: subtle bluish white glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px z-50 rounded-[inherit]"
        style={{
          opacity: hoverValue,
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 255, 255, 0.15),
              rgba(59, 130, 246, 0.05) 30%,
              transparent 80%
            )
          `,
        }}
      />
      
      {/* Original Content */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </motion.div>
  );
};

