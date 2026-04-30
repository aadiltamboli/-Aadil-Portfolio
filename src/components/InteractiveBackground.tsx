"use client";

import { useEffect, useRef, useState } from "react";

export default function InteractiveBackground() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isIdle, setIsIdle] = useState(true);
  const idleTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let animationFrameId: number;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let hasMoved = false;

    const updatePosition = () => {
      // Very smooth lerp
      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;

      if (cursorRef.current && hasMoved) {
        // Center the 300px element (offset by 150px)
        cursorRef.current.style.transform = `translate(${currentX - 150}px, ${currentY - 150}px)`;
      }

      animationFrameId = requestAnimationFrame(updatePosition);
    };

    updatePosition();

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      
      if (!hasMoved) {
        hasMoved = true;
        currentX = targetX;
        currentY = targetY;
      }
      
      setIsIdle(false);
      
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
      idleTimeoutRef.current = setTimeout(() => {
        setIsIdle(true);
      }, 1500); // Fades out when idle
    };

    const handleMouseLeave = () => {
      setIsIdle(true);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
    };
  }, []);

  return (
    <>
      <div className="fixed inset-0 z-[-1] bg-black pointer-events-none" />

      {/* Dark Pink Neon Glow following cursor */}
      <div 
        ref={cursorRef}
        className={`fixed top-0 left-0 w-[300px] h-[300px] rounded-full pointer-events-none z-[9999] transition-opacity duration-700 ease-out will-change-transform ${
          isIdle ? "opacity-0" : "opacity-100"
        }`}
        style={{
          // Soft radial gradient for the neon glow (NO solid orb, NO backdrop-blur)
          background: "radial-gradient(circle at center, rgba(255, 0, 120, 0.20) 0%, transparent 70%)",
          filter: "blur(24px)", // Very soft and diffused
          mixBlendMode: "screen"
        }}
      />
    </>
  );
}

