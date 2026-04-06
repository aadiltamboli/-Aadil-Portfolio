"use client";

import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useContext, useState } from "react";
import { ScrollyCanvasContext } from "./ScrollyCanvas";

export default function Overlay({ scrollYProgress: propScroll }: { scrollYProgress?: any }) {
  const contextScroll = useContext(ScrollyCanvasContext);
  const { scrollYProgress: defaultScroll } = useScroll();
  const scrollYProgress = propScroll || contextScroll || defaultScroll;

  /* ---------------- PARALLAX Y-AXIS ---------------- */
  const y1 = useTransform(scrollYProgress, [0, 0.15], [0, -40], { clamp: true });
  const y2 = useTransform(scrollYProgress, [0.20, 0.45], [40, -40], { clamp: true });
  const y3 = useTransform(scrollYProgress, [0.50, 0.75], [40, -40], { clamp: true });

  /* ---------------- HYSTERESIS VISIBILITY STATE ---------------- */
  const [show1, setShow1] = useState(true);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (latest: number) => {
    // Section 1: Hides decisively past 0.13. Needs to scroll all the way back < 0.05 to reappear.
    if (latest > 0.13 && show1) setShow1(false);
    else if (latest < 0.05 && !show1) setShow1(true);

    // Section 2: Safe visible zone 0.22 - 0.40. Hides completely past 0.45 or before 0.15.
    if ((latest > 0.45 || latest < 0.15) && show2) setShow2(false);
    else if (latest >= 0.22 && latest <= 0.40 && !show2) setShow2(true);

    // Section 3: Safe visible zone 0.52 - 0.70. Hides completely past 0.75 or before 0.45.
    if ((latest > 0.75 || latest < 0.45) && show3) setShow3(false);
    else if (latest >= 0.52 && latest <= 0.70 && !show3) setShow3(true);
  });

  return (
    <div className="absolute inset-0 z-[10] pointer-events-none flex flex-col justify-center text-white px-8 md:px-24 font-sans max-w-7xl mx-auto w-full">

      {/* -------- SECTION 1: NAME -------- */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: show1 ? 1 : 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        style={{ y: y1 }}
        className="absolute inset-x-0 top-[45%] flex flex-col items-center text-center"
      >
        <h1 className="text-4xl md:text-7xl font-bold tracking-tight mb-4 drop-shadow-lg">
          AADIL TAMBOLI
        </h1>
        <p className="text-xl md:text-2xl text-zinc-300 font-light drop-shadow-md">
          DIGITAL MARKETER & UI/UX DESIGNER
        </p>
      </motion.div>

      {/* -------- SECTION 2: LEFT -------- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: show2 ? 1 : 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        style={{ y: y2 }}
        className="absolute left-8 md:left-24 top-[45%] flex flex-col items-start"
      >
        <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] max-w-2xl drop-shadow-lg text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">
          I build digital experiences.
        </h2>
      </motion.div>

      {/* -------- SECTION 3: RIGHT -------- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: show3 ? 1 : 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        style={{ y: y3 }}
        className="absolute right-8 md:right-24 top-[45%] flex flex-col items-end text-right"
      >
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight max-w-xl drop-shadow-lg leading-tight">
          Engineering growth at the intersection of{" "}
          <span className="italic text-zinc-400">marketing</span>{" "}
          and <span className="text-white">sales</span>.
        </h2>
      </motion.div>

      {/* -------- SCROLL INDICATOR -------- */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: show1 ? 1 : 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-sm uppercase tracking-widest text-zinc-400">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
      </motion.div>
    </div>
  );
}