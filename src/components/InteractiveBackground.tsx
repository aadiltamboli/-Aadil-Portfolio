"use client";

import { useEffect, useRef } from "react";

export default function InteractiveBackground() {
  const interactiveRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      // Use requestAnimationFrame to detach from raw mouse events to ensure silky 60fps
      animationFrameId = requestAnimationFrame(() => {
        if (interactiveRef.current) {
          interactiveRef.current.style.setProperty("--x", `${e.clientX}px`);
          interactiveRef.current.style.setProperty("--y", `${e.clientY}px`);
        }
      });
    };

    // Initialize to center
    if (interactiveRef.current) {
      interactiveRef.current.style.setProperty("--x", `${window.innerWidth / 2}px`);
      interactiveRef.current.style.setProperty("--y", `${window.innerHeight / 2}px`);
    }

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-[#050505]">
      
      {/* 20s GPU Breathing Keyframe Injection */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes liquidFlow {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(4vw, -4vh) scale(1.05); }
          66% { transform: translate(-3vw, 3vh) scale(0.95); }
          100% { transform: translate(0, 0) scale(1); }
        }
        .animate-liquid {
          animation: liquidFlow 20s ease-in-out infinite;
          will-change: transform;
        }
      `}} />

      {/* Deep Fluid Breathing Blobs container mapped to Blur engine */}
      <div className="absolute inset-x-[-20%] inset-y-[-20%] w-[140%] h-[140%] blur-[100px] animate-liquid origin-center">
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 20% 30%, rgba(59,130,246,0.25), transparent 50%),
              radial-gradient(circle at 50% 60%, rgba(0,255,255,0.2), transparent 55%),
              radial-gradient(circle at 80% 80%, rgba(168,85,247,0.15), transparent 60%)
            `
          }}
        />
      </div>

      {/* GPU Accelerated Interactive Mouse Tracking Node using full screen gradient so the clipping mask covers everything properly */}
      <div 
        ref={interactiveRef}
        className="absolute inset-0 mix-blend-screen pointer-events-none transition-opacity duration-300"
        style={{
          background: "radial-gradient(600px circle at var(--x, 50vw) var(--y, 50vh), rgba(59,130,246,0.15), transparent 40%)",
        }}
      />
      
    </div>
  );
}
