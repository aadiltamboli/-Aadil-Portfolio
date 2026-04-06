"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ContactModal from "@/components/ui/ContactModal";
import emailjs from "@emailjs/browser";
import { z } from "zod";
import DOMPurify from "isomorphic-dompurify";

const NO_TEXTS = [
  "NO",
  "Soch lo",
  "Are you sure?",
  "Are yaar...",
  "Nahi karna hire?"
];

// Zod Schema Setup
const feedbackSchema = z.object({
  message: z.string().trim().min(2, "Feedback must be at least 2 characters").max(300, "Feedback cannot exceed 300 characters"),
});

// CAPTCHA Placeholder
async function verifyCaptcha() {
  return true;
}

export default function CTASection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [noPosition, setNoPosition] = useState({ top: "50%", left: "50%" });
  const [feedback, setFeedback] = useState("");
  const [feedbackStatus, setFeedbackStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [cooldownTime, setCooldownTime] = useState(0);

  // Check LocalStorage Cooldown on Mount
  useEffect(() => {
    const lastSent = localStorage.getItem("lastFeedbackSent");
    if (lastSent) {
      const timeSince = Date.now() - parseInt(lastSent);
      if (timeSince < 15000) {
        setCooldownTime(Math.ceil((15000 - timeSince) / 1000));
      }
    }
  }, []);

  // Handle Cooldown Timer ticking
  useEffect(() => {
    if (cooldownTime > 0) {
      const timer = setTimeout(() => setCooldownTime(c => c - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldownTime]);

  const handleFeedbackSend = async () => {
    setErrorMessage("");

    if (cooldownTime > 0) return;

    // 1. Zod Validation
    const validationResult = feedbackSchema.safeParse({ message: feedback });
    if (!validationResult.success) {
      setErrorMessage(validationResult.error.issues[0].message);
      return;
    }

    setFeedbackStatus("sending");

    try {
      // 2. CAPTCHA Check
      const isHuman = await verifyCaptcha();
      if (!isHuman) throw new Error("Captcha failed");

      // 3. Sanitization
      const cleanMessage = DOMPurify.sanitize(validationResult.data.message);

      console.log("Public Key:", process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);

      const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
      const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_FB_TEMPLATE_ID;

      console.log("ENV CHECK:", { PUBLIC_KEY, SERVICE_ID, TEMPLATE_ID });

      if (!PUBLIC_KEY || !SERVICE_ID || !TEMPLATE_ID) {
        console.error("Missing EmailJS env variables");
        setFeedbackStatus("error");
        return;
      }

      // 4. API Request
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          message: cleanMessage,
          type: "rejection_feedback",
          time: new Date().toLocaleString(),
        },
        PUBLIC_KEY
      );

      // 5. Success State & Cooldown lock
      setFeedbackStatus("success");
      setFeedback("");
      localStorage.setItem("lastFeedbackSent", Date.now().toString());
      setCooldownTime(15);
      
    } catch (error) {
      console.error("Failed to send feedback:", error);
      setFeedbackStatus("error");
    }
  };

  const handleNoClick = () => {
    if (noCount < 4) {
      setNoCount((prev) => prev + 1);
      const newTop = Math.floor(Math.random() * 70) + 15;
      const newLeft = Math.floor(Math.random() * 70) + 15;
      setNoPosition({ top: `${newTop}%`, left: `${newLeft}%` });
    } else {
      setNoCount(5);
    }
  };

  return (
    <>
      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-24 w-full mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/10 p-8 md:p-16 text-center relative overflow-hidden backdrop-blur-sm"
        >
          <div className="relative z-10 w-full min-h-[350px] flex flex-col items-center justify-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Want to hire me?
            </h2>
            <p className="text-xl text-zinc-400 font-light max-w-xl mx-auto mb-12">
              Make a decision 😉
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full min-h-[64px]">
              <AnimatePresence mode="wait">
                {noCount >= 5 ? (
                  <motion.div
                    key="textarea-container"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="w-full sm:w-80 relative z-20 flex flex-col gap-2"
                  >
                    <textarea
                      placeholder="Okay tell me why?🥀💔"
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      className={`w-full bg-white/5 border ${errorMessage ? 'border-red-500' : 'border-white/20'} rounded-2xl p-4 text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 resize-none h-28 backdrop-blur-md transition-all shadow-inner`}
                      autoFocus
                    />
                    {errorMessage && <p className="text-red-400 text-xs">{errorMessage}</p>}
                    
                    <button
                      onClick={handleFeedbackSend}
                      disabled={feedbackStatus === "sending" || cooldownTime > 0}
                      className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed border border-white/10 text-white font-medium rounded-xl transition-colors shadow-sm"
                    >
                      {cooldownTime > 0 
                        ? `Please wait ${cooldownTime}s...`
                        : feedbackStatus === "sending" 
                          ? "Sending..." 
                          : "Send Feedback"
                      }
                    </button>
                    
                    {feedbackStatus === "success" && (
                      <p className="text-emerald-400 text-sm mt-1 text-center">
                        Feedback sent successfully ✅
                      </p>
                    )}
                    {feedbackStatus === "error" && (
                      <p className="text-red-400 text-sm mt-1 text-center">
                        Failed to send feedback ❌
                      </p>
                    )}
                  </motion.div>
                ) : (
                  <motion.button
                    key="no-button"
                    onClick={handleNoClick}
                    animate={
                      noCount > 0
                        ? {
                          top: noPosition.top,
                          left: noPosition.left,
                          x: "-50%",
                          y: "-50%",
                        }
                        : {
                          x: 0,
                          y: 0,
                        }
                    }
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    style={{
                      position: noCount > 0 ? "absolute" : "relative",
                    }}
                    whileHover={{
                      scale: 1.05,
                      rotate: noCount > 0 ? 5 : 0,
                    }}
                    whileTap={{ scale: 0.95 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className={`inline-flex items-center justify-center px-10 py-4 border border-zinc-700 bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 font-semibold rounded-full backdrop-blur-sm transition-colors min-h-[56px] text-lg z-30 shadow-lg ${noCount > 0 ? "whitespace-nowrap" : "w-full sm:w-auto"
                      }`}
                  >
                    {NO_TEXTS[noCount]}
                  </motion.button>
                )}
              </AnimatePresence>

              <motion.button
                onClick={() => setIsModalOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center px-10 py-4 w-full sm:w-auto bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold rounded-full shadow-[0_0_20px_rgba(59,130,246,0.3)] min-h-[56px] text-lg z-20"
              >
                YES
              </motion.button>
            </div>
          </div>
        </motion.div>
      </section>

      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
