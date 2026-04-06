"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Loader2 } from "lucide-react";
import emailjs from '@emailjs/browser';
import { z } from "zod";
import DOMPurify from "isomorphic-dompurify";

export const ANIMATION_CONFIG = {
  duration: 0.5,
  ease: "easeOut" as const,
};

export const SPRING_CONFIG = {
  type: "spring" as const,
  stiffness: 300,
  damping: 30,
};

// Zod Schema Setup
const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(50, "Name cannot exceed 50 characters"),
  email: z.string().trim().email("Please enter a valid email address"),
  message: z.string().trim().min(5, "Message must be at least 5 characters").max(500, "Message cannot exceed 500 characters"),
});

type FormErrors = {
  name?: string;
  email?: string;
  message?: string;
};

// CAPTCHA Placeholder
async function verifyCaptcha() {
  // Can be implemented later with Google reCAPTCHA or Cloudflare Turnstile
  return true;
}

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [cooldownTime, setCooldownTime] = useState(0);

  // Check LocalStorage Cooldown on Mount
  useEffect(() => {
    const lastSent = localStorage.getItem("lastContactSent");
    if (lastSent) {
      const timeSince = Date.now() - parseInt(lastSent);
      if (timeSince < 15000) {
        setCooldownTime(Math.ceil((15000 - timeSince) / 1000));
      }
    }
  }, [isOpen]);

  // Handle Cooldown Timer ticking
  useEffect(() => {
    if (cooldownTime > 0) {
      const timer = setTimeout(() => setCooldownTime(c => c - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldownTime]);

  // Scroll Lock & Esc Key Listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
      // Clean up cleanly on exit (keeping success state active purposely if sent)
      setFormData({ name: "", email: "", message: "" });
      setErrors({});
      if (status !== "success") setStatus("idle");
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setStatus("idle");

    if (cooldownTime > 0) return;

    // 1. Zod Validation
    const validationResult = contactSchema.safeParse(formData);
    if (!validationResult.success) {
      const fieldErrors: FormErrors = {};
      validationResult.error.issues.forEach((err: any) => {
        if (err.path[0]) fieldErrors[err.path[0] as keyof FormErrors] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSending(true);

    try {
      // 2. CAPTCHA Check
      const isHuman = await verifyCaptcha();
      if (!isHuman) throw new Error("Captcha failed");

      // 3. Sanitization
      const cleanName = DOMPurify.sanitize(validationResult.data.name);
      const cleanEmail = validationResult.data.email; // Already valid email format
      const cleanMessage = DOMPurify.sanitize(validationResult.data.message);

      console.log("Public Key:", process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);

      const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
      const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_CT_TEMPLATE_ID;

      console.log("ENV CHECK:", { PUBLIC_KEY, SERVICE_ID, TEMPLATE_ID });

      if (!PUBLIC_KEY || !SERVICE_ID || !TEMPLATE_ID) {
        console.error("Missing EmailJS env variables");
        setStatus("error");
        return;
      }

      // 4. API Request
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          user_name: cleanName,
          user_email: cleanEmail,
          message: cleanMessage,
        },
        PUBLIC_KEY
      );

      // 5. Success State & Cooldown lock
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      localStorage.setItem("lastContactSent", Date.now().toString());
      setCooldownTime(15);
      
    } catch (err: any) {
      console.error("Failed to send message:", err);
      setStatus("error");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={ANIMATION_CONFIG}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={SPRING_CONFIG}
            className="relative w-[95%] sm:w-full sm:max-w-md max-h-[90vh] overflow-y-auto bg-[#0a0a0e] border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl"
          >
            {/* Subtle Inner Glow */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
            <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />

            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors p-1 z-20"
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="text-2xl font-bold text-white mb-2 pr-8 relative z-10">Let's Work Together</h3>
            <p className="text-zinc-400 font-light mb-6 relative z-10">
              Send me a message and I'll get back to you soon.
            </p>

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-sm text-blue-300 font-medium relative z-10 mb-6 text-center drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]"
            >
              arre yaar kamaal aadmi ho yaar aap🥹
            </motion.div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5 relative z-10">
              {/* Name Field */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider ml-1">Name</label>
                <input
                  type="text"
                  maxLength={50}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your Name"
                  className={`w-full bg-white/5 border ${errors.name ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all font-sans`}
                />
                {errors.name && <p className="text-red-400 text-xs ml-1">{errors.name}</p>}
              </div>

              {/* Email Field */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider ml-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                  className={`w-full bg-white/5 border ${errors.email ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all font-sans`}
                />
                {errors.email && <p className="text-red-400 text-xs ml-1">{errors.email}</p>}
              </div>

              {/* Message Field */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider ml-1">Message</label>
                <textarea
                  rows={4}
                  maxLength={500}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can I help you?"
                  className={`w-full bg-white/5 border ${errors.message ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all resize-none font-sans`}
                />
                {errors.message && <p className="text-red-400 text-xs ml-1">{errors.message}</p>}
              </div>

              {/* UI States */}
              {status === "error" && (
                <p className="text-red-400 text-sm mt-1 text-center">Failed to send ❌ Try again</p>
              )}

              {status === "success" && (
                <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-emerald-400 text-sm flex items-center justify-center gap-2 mt-1">
                  <CheckCircle2 className="w-4 h-4" /> Message sent successfully ✅
                </motion.div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSending || cooldownTime > 0}
                className="w-full mt-2 py-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-colors shadow-[0_0_15px_rgba(59,130,246,0.2)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-h-[56px]"
              >
                {cooldownTime > 0 ? (
                  `Please wait ${cooldownTime}s...`
                ) : isSending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
