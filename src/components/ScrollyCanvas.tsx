"use client";

import React, { useEffect, useRef, useState, createContext } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

export const ScrollyCanvasContext = createContext<any>(null);

const FRAME_COUNT = 94; // 0 to 93

export default function ScrollyCanvas({ children }: { children?: React.ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const requestRef = useRef<number | null>(null);

  // Preload Images
  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    const onFrameLoad = () => {
      loadedCount++;
      // Bypass React state for progress bar to prevent 94 re-renders
      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${(loadedCount / FRAME_COUNT) * 100}%`;
      }
      // Only fire a state update once rendering is fully prepared
      if (loadedCount === FRAME_COUNT) {
        imagesRef.current = loadedImages;
        setIsLoaded(true);
      }
    };

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      
      // User specified format (1-indexed webp)
      const primaryIdx = (i + 1).toString().padStart(4, "0");
      img.src = `/sequence/frame_${primaryIdx}.webp`;

      img.onload = onFrameLoad;
      
      img.onerror = () => {
        // Fallback gracefully to existing .png assets if .webp request fails
        const fallbackIdx = i.toString().padStart(3, "0");
        const fallbackSrc = `/sequence/frame_${fallbackIdx}_delay-0.066s.png`;
        
        // Prevent infinite loop if both fail
        if (img.src.includes(fallbackSrc)) {
           console.error(`Failed to load frame ${i}`);
           onFrameLoad(); // Proceed anyway to avoid halting the page
           return;
        }
        img.src = fallbackSrc;
      };

      loadedImages.push(img);
    }
  }, []);

  const drawFrame = (frameIndex: number) => {
    const images = imagesRef.current;
    if (images.length === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = images[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    // Fast resize check
    if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;

    let drawWidth = canvas.width;
    let drawHeight = canvas.height;
    let drawX = 0;
    let drawY = 0;

    if (imgRatio > canvasRatio) {
      drawWidth = canvas.height * imgRatio;
      drawX = (canvas.width - drawWidth) / 2;
    } else {
      drawHeight = canvas.width / imgRatio;
      drawY = (canvas.height - drawHeight) / 2;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
  };

  // Draw initial frame once loaded
  useEffect(() => {
    if (isLoaded) {
      drawFrame(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  // Handle window resize via rAF
  useEffect(() => {
    if (!isLoaded) return;
    const handleResize = () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      requestRef.current = requestAnimationFrame(() => {
        const currentProgress = scrollYProgress.get();
        const frameIndex = Math.min(FRAME_COUNT - 1, Math.floor(currentProgress * FRAME_COUNT));
        drawFrame(frameIndex);
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, scrollYProgress]);

  // Map scroll progress to frame index natively at 60fps
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!isLoaded) return;
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }
    requestRef.current = requestAnimationFrame(() => {
      const frameIndex = Math.min(FRAME_COUNT - 1, Math.floor(latest * FRAME_COUNT));
      drawFrame(frameIndex);
    });
  });

  return (
    <ScrollyCanvasContext.Provider value={scrollYProgress}>
      <div ref={containerRef} className="h-[400vh] relative bg-[#121212] w-full">
      {/* Sticky Container for Canvas */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Loading State Overlay */}
        {!isLoaded && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#121212] flex-col gap-4 text-white font-sans">
            <div className="text-sm uppercase tracking-widest text-zinc-500">
              Loading Portfolio
            </div>
            <div className="h-[1px] w-48 bg-zinc-800 relative overflow-hidden">
              <div
                ref={progressBarRef}
                className="absolute top-0 left-0 h-full bg-white transition-all duration-75"
                style={{ width: "0%" }}
              />
            </div>
          </div>
        )}

        <canvas ref={canvasRef} className="w-full h-full block" />

        {/* Parallax Overlay children mounts fully readied */}
        {isLoaded && children}
      </div>
    </div>
    </ScrollyCanvasContext.Provider>
  );
}
