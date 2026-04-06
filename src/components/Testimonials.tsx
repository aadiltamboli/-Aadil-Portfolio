"use client";

import { motion } from "framer-motion";
import { TiltCard } from "./TiltCard";
import { useEffect, useState } from "react";
import { Loader2, Send, CheckCircle2 } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

type Testimonial = {
  id?: string;
  quote: string;
  author: string;
  role: string;
};

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Form State
  const [formData, setFormData] = useState({ author: "", role: "", quote: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetch("/api/testimonials")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setTestimonials(data);
      })
      .catch((err) => console.error("Failed to load testimonials:", err))
      .finally(() => setIsLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.author || !formData.role || !formData.quote) return;

    setIsSubmitting(true);
    setSubmitState("idle");
    setErrorMessage("");

    try {
      const { data, error } = await supabase
        .from("feedbacks")
        .insert([
          {
            name: formData.author,
            role: formData.role,
            feedback: formData.quote,
            created_at: new Date().toISOString(),
          },
        ])
        .select();

      if (error) {
        throw error;
      }
      
      const newTestimonialData = data?.[0];
      
      const newTestimonial: Testimonial = {
        id: newTestimonialData?.id?.toString() || Date.now().toString(),
        author: newTestimonialData?.name || formData.author,
        role: newTestimonialData?.role || formData.role,
        quote: newTestimonialData?.feedback || formData.quote,
      };
      
      // Optimistically inject the new testimonial at the front
      setTestimonials((prev) => [newTestimonial, ...prev]);
      
      // Clear form
      setFormData({ author: "", role: "", quote: "" });
      setSubmitState("success");
      
      // Reset success state after a few seconds
      setTimeout(() => setSubmitState("idle"), 4000);
    } catch (err: any) {
      console.error("Supabase insert error:", err);
      // Show exact error in console and set it to state
      setErrorMessage(err?.message || "An unknown error occurred while submitting.");
      setSubmitState("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative w-full py-16 md:py-32 lg:py-48 px-6 md:px-12 lg:px-24 bg-transparent overflow-hidden">
      {/* Background glow blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 font-sans">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-blue-400 font-mono tracking-widest text-sm uppercase mb-4 block">Feedback</span>
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white tracking-tight">Client Testimonials</h2>
        </motion.div>

        {/* Dynamic Extensible Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
          {isLoading ? (
            <div className="col-span-full py-12 flex justify-center text-zinc-500">
               <Loader2 className="w-8 h-8 animate-spin" />
            </div>
          ) : (
            testimonials.map((t, i) => (
              <motion.div
                key={t.id || i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="h-full"
              >
                <TiltCard className="bg-white/5 backdrop-blur-2xl border border-white/10 p-10 rounded-3xl hover:border-blue-500/30 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all duration-500 h-full w-full flex flex-col justify-between">
                  <p className="text-xl md:text-2xl text-zinc-300 font-light leading-relaxed mb-8 italic">
                    "{t.quote}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 p-[1px] shrink-0">
                      <div className="w-full h-full bg-[#121212] rounded-full flex items-center justify-center text-white font-semibold text-lg uppercase">
                         {t.author.charAt(0)}
                      </div>
                    </div>
                    <div>
                      <div className="text-white font-medium">{t.author}</div>
                      <div className="text-sm text-zinc-500">{t.role}</div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))
          )}
        </div>

        {/* FEEDBACK SUBMISSION FORM */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-8">
             <h3 className="text-2xl md:text-4xl font-bold text-white tracking-tight mb-2">Leave your feedback</h3>
             <p className="text-zinc-400">Your experience helps shape my next projects.</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-8 md:p-10 rounded-3xl w-full">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider ml-1">Name</label>
                  <input 
                    type="text" 
                    required
                    maxLength={50}
                    value={formData.author}
                    onChange={(e) => setFormData({...formData, author: e.target.value})}
                    placeholder="John Doe" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all font-sans"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider ml-1">Role / Company</label>
                  <input 
                    type="text"
                    required
                    maxLength={60}
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                    placeholder="CEO at TechCorp" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all font-sans"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider ml-1">Feedback</label>
                <textarea 
                  required
                  rows={4}
                  maxLength={250}
                  value={formData.quote}
                  onChange={(e) => setFormData({...formData, quote: e.target.value})}
                  placeholder="How was your experience?" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all resize-none font-sans"
                />
                <div className="text-right text-xs text-zinc-600 font-mono">
                  {formData.quote.length} / 250
                </div>
              </div>

              <div className="mt-2 flex items-center justify-between">
                <div className="text-sm font-sans flex items-center">
                  {submitState === "success" && (
                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-emerald-400 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" /> Added successfully!
                    </motion.div>
                  )}
                  {submitState === "error" && (
                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-red-400">
                      {errorMessage || "Failed to submit. Try again."}
                    </motion.div>
                  )}
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting || submitState === "success"}
                  className="group relative inline-flex items-center justify-center gap-2 bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-sans w-full md:w-[140px] min-h-[48px]"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : submitState === "success" ? (
                    "Submitted"
                  ) : (
                    <>Submit <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
                  )}
                </button>
              </div>

            </form>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
